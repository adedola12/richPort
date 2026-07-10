// server/utils/discounts.js
// One resolver used by every booking flow. Given what the client supplied
// (a discount code and/or a custom-offer token) and the base package price,
// it answers: what is the FINAL price, and how do we describe the reduction
// on the invoice? Offers win over codes — an offer IS the negotiated price.

import { DiscountCode, CustomOffer } from "../models/Discount.js";

const notExpired = (doc) => !doc.expiresAt || new Date(doc.expiresAt) >= new Date();

/* Returns { finalPrice, discount, offer } or { error } (error = the client
   supplied something invalid and should be told, not silently full-priced). */
export async function resolveDiscount({ code, offerToken, service, planKey, basePrice }) {
  const base = Number(basePrice) || 0;

  if (offerToken) {
    const offer = await CustomOffer.findOne({ token: String(offerToken).trim() });
    if (!offer || !offer.active) return { error: "This offer link is no longer valid." };
    if (!notExpired(offer)) return { error: "This offer has expired." };
    if ((offer.usedServices || []).includes(service)) return { error: "This offer has already been used for this service." };
    const item = (offer.items || []).find(
      (i) => i.service === service && (!planKey || String(i.planKey).toLowerCase() === String(planKey).toLowerCase())
    );
    if (!item) return { error: "This offer doesn't cover the selected package." };
    const amount = Math.max(0, base - Number(item.price));
    return {
      finalPrice: Number(item.price),
      discount: amount > 0 ? { label: `Agreed offer${offer.clientName ? ` for ${offer.clientName}` : ""}`, amount, code: offer.token } : null,
      offer,
    };
  }

  if (code) {
    const dc = await DiscountCode.findOne({ code: String(code).trim().toUpperCase() });
    if (!dc || !dc.active) return { error: "That discount code isn't valid." };
    if (!notExpired(dc)) return { error: "That discount code has expired." };
    if (dc.maxUses != null && dc.uses >= dc.maxUses) return { error: "That discount code has been fully used." };
    if (dc.service !== "any" && dc.service !== service) return { error: "That code doesn't apply to this service." };
    const amount = dc.type === "percent"
      ? Math.round((base * dc.value) / 100)
      : Math.min(Number(dc.value), base);
    return {
      finalPrice: Math.max(0, base - amount),
      discount: { label: dc.type === "percent" ? `${dc.value}% discount (${dc.code})` : `Discount (${dc.code})`, amount, code: dc.code },
      offer: null,
    };
  }

  return { finalPrice: base, discount: null, offer: null };
}

/* Stamp usage AFTER the booking saved successfully, so a failed booking
   never burns a single-use code or an offer. */
export async function consumeDiscount({ discount, offer, service }) {
  try {
    if (offer) {
      offer.usedServices = [...new Set([...(offer.usedServices || []), service])];
      // an offer is spent when every item's service has been booked
      if ((offer.items || []).every((i) => offer.usedServices.includes(i.service))) offer.active = false;
      await offer.save();
    } else if (discount?.code) {
      await DiscountCode.updateOne({ code: discount.code }, { $inc: { uses: 1 } });
    }
  } catch (e) {
    console.error("consumeDiscount failed (booking unaffected):", e.message);
  }
}
