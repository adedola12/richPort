// server/models/Discount.js
// The two ways a negotiated price enters the system BEFORE the invoice is
// generated, so the invoice, the emails and the Reni Studio job all carry
// the same number:
//
//   DiscountCode — minted by Richard in the admin, typed by the client at
//   booking. Percent or fixed amount off the package price.
//
//   CustomOffer — a private booking link for negotiated deals and bundles.
//   Always references real packages; only the price is overridden, so the
//   packages stay the menu and the delivery template.

import mongoose from "mongoose";

const { Schema } = mongoose;

const discountCodeSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    type: { type: String, enum: ["percent", "fixed"], required: true },
    value: { type: Number, required: true, min: 0 },
    // which service the code applies to ("any" = all booking flows)
    service: { type: String, enum: ["any", "brand", "website", "flyer"], default: "any" },
    note: { type: String, default: "" },
    expiresAt: { type: Date, default: null },
    maxUses: { type: Number, default: null },
    uses: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const customOfferSchema = new Schema(
  {
    token: { type: String, required: true, unique: true, index: true },
    clientName: { type: String, default: "" },
    clientEmail: { type: String, default: "" },
    note: { type: String, default: "" },
    // each item pins a real package; price is the negotiated allocation
    items: [
      {
        service: { type: String, enum: ["brand", "website", "flyer"], required: true },
        planKey: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    total: { type: Number, required: true, min: 0 },
    expiresAt: { type: Date, default: null },
    // stamped per service as the client books each item of the bundle
    usedServices: { type: [String], default: [] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const DiscountCode =
  mongoose.models.DiscountCode || mongoose.model("DiscountCode", discountCodeSchema, "discount_codes");
export const CustomOffer =
  mongoose.models.CustomOffer || mongoose.model("CustomOffer", customOfferSchema, "custom_offers");
