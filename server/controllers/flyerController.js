// server/controllers/flyerController.js
import FlyerRequest from "../models/FlyerRequest.js";
import { FLYER_PLANS } from "../config/flyerPlans.js";
import { OWNER, formatNGN as N } from "../config/plans.js";
import { sendMail, mailConfigured } from "../utils/mailer.js";
import { feedReniFlyer } from "../utils/reniFeed.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const FIELD_LABELS = [
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone / WhatsApp"],
  ["brand", "Brand / organisation"],
  ["purpose", "What the flyer is for"],
  ["deadline", "Needed by"],
  ["headline", "Headline text"],
  ["subtitle", "Subtitle text"],
  ["bodyText", "Additional text"],
  ["eventDetails", "Date / time / venue"],
  ["references", "References / inspiration"],
  ["breakdown", "Designs needed (event)"],
];

const detailsTable = (doc) => `
  <table width="100%" style="border-collapse:collapse;border:1px solid #eef1e6;border-radius:8px;">
    ${FIELD_LABELS.filter(([k]) => doc[k])
      .map(
        ([k, label]) => `
      <tr><td style="padding:7px 16px;font-size:12px;color:#888;width:38%;vertical-align:top;border-top:1px solid #eef1e6;">${label}</td>
      <td style="padding:7px 16px;font-size:12.5px;color:#333;border-top:1px solid #eef1e6;white-space:pre-wrap;">${esc(doc[k])}</td></tr>`
      )
      .join("")}
  </table>`;

const banksHTML = () =>
  (OWNER.banks || [])
    .map(
      (b) =>
        `<div style="font-size:12.5px;color:#333;margin-bottom:6px;"><b>${esc(b.bank)}</b> — ${esc(b.number)} (${esc(b.name)})</div>`
    )
    .join("");

function clientEmailHTML(doc, plan) {
  const fixed = doc.priceNGN != null;
  return `
  <div style="max-width:640px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;color:#333;padding:24px;">
    <h2 style="color:#1a1f12;margin-bottom:4px;">Flyer design request received 🎉</h2>
    <p style="font-size:14px;line-height:1.8;">Hi ${esc(doc.name)},<br>
    Thanks for booking the <b>${esc(plan.label)}</b> package. Here's a copy of everything you sent, plus what happens next.</p>
    <div style="background:#f2f6e8;border-radius:8px;padding:14px 16px;margin:16px 0;">
      <div style="font-size:13px;font-weight:700;color:#3f5c00;margin-bottom:6px;">PACKAGE</div>
      <div style="font-size:13.5px;line-height:1.8;color:#333;">
        ${plan.designs ? `${plan.designs} design${plan.designs > 1 ? "s" : ""}` : "6+ designs (event campaign)"} •
        ${fixed ? `<b>${N(doc.priceNGN)}</b>` : `custom quote — from <b>${N(plan.perDesign)}</b> per design`} •
        ${plan.sourceFiles ? "source files included" : "final exports only (no source files)"}
      </div>
    </div>
    ${
      fixed
        ? `<div style="border:1px solid #e4e8d8;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
            <div style="font-size:13px;font-weight:700;color:#1a1f12;margin-bottom:8px;">NEXT STEPS</div>
            <div style="font-size:13px;line-height:1.9;color:#444;">
              1. Make payment of <b>${N(doc.priceNGN)}</b> to any of the accounts below.<br>
              2. Send your proof of payment to WhatsApp <b>${esc(OWNER.whatsapp)}</b>.<br>
              3. Design begins once payment is confirmed${doc.deadline ? ` — noted deadline: <b>${esc(doc.deadline)}</b>` : ""}.
            </div>
            <div style="margin-top:12px;">${banksHTML()}</div>
          </div>`
        : `<div style="border:1px solid #e4e8d8;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
            <div style="font-size:13px;font-weight:700;color:#1a1f12;margin-bottom:8px;">NEXT STEPS</div>
            <div style="font-size:13px;line-height:1.9;color:#444;">
              Event campaigns are quoted per project. I'll review your design list and reach out within 24 hours with a full quote — from ${N(plan.perDesign)} per design depending on volume and complexity. You can also reach me directly on WhatsApp <b>${esc(OWNER.whatsapp)}</b>.
            </div>
          </div>`
    }
    <div style="font-size:15px;font-weight:700;color:#1a1f12;margin:18px 0 8px;">Your Request</div>
    ${detailsTable(doc)}
    <p style="font-size:12px;color:#999;text-align:center;margin-top:24px;">${esc(OWNER.site || "")} • ${esc(OWNER.email)} • WhatsApp ${esc(OWNER.whatsapp)}</p>
  </div>`;
}

function ownerEmailHTML(doc, plan) {
  return `
  <div style="max-width:640px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;color:#333;padding:24px;">
    <h2 style="color:#1a1f12;">New flyer request — ${esc(plan.label)}</h2>
    <p style="font-size:14px;line-height:1.8;"><b>${esc(doc.name)}</b>${doc.brand ? ` (${esc(doc.brand)})` : ""} • ${esc(doc.email)} • ${esc(doc.phone)}<br>
    ${doc.priceNGN != null ? `Total <b>${N(doc.priceNGN)}</b>` : `<b>Custom quote needed</b> — from ${N(plan.perDesign)}/design`}${doc.deadline ? ` • Needed by <b>${esc(doc.deadline)}</b>` : ""}</p>
    ${detailsTable(doc)}
    <div style="font-size:12px;font-weight:700;margin-top:18px;">RAW JSON:</div>
    <pre style="background:#f4f4f0;border:1px solid #e0e0d8;border-radius:8px;padding:14px;font-size:10.5px;white-space:pre-wrap;word-break:break-all;">${esc(JSON.stringify(doc, null, 1))}</pre>
  </div>`;
}

/* Public: get plans (client renders cards from this so pricing lives server-side) */
export const getFlyerPlans = (_req, res) => res.json(FLYER_PLANS);

/* Public: submit a flyer request */
export const createFlyerRequest = async (req, res) => {
  try {
    if (req.body?._hp) return res.status(201).json({ ok: true });

    const { plan, name = "", email = "", purpose = "" } = req.body || {};
    const planDef = FLYER_PLANS[plan];
    if (!planDef) return res.status(400).json({ message: "Choose a valid package." });
    if (!String(name).trim()) return res.status(400).json({ message: "Name is required." });
    if (!/^\S+@\S+\.\S+$/.test(String(email).trim())) {
      return res.status(400).json({ message: "A valid email is required." });
    }
    if (!String(purpose).trim()) return res.status(400).json({ message: "Tell me what the flyer is for." });

    const pick = (k, max = 2000) => String(req.body?.[k] || "").trim().slice(0, max);

    const doc = await FlyerRequest.create({
      plan,
      name: pick("name", 120),
      email: pick("email", 160),
      phone: pick("phone", 40),
      brand: pick("brand", 120),
      purpose: pick("purpose", 1000),
      deadline: pick("deadline", 60),
      headline: pick("headline", 300),
      subtitle: pick("subtitle", 300),
      bodyText: pick("bodyText"),
      eventDetails: pick("eventDetails", 1000),
      references: pick("references", 1000),
      breakdown: pick("breakdown"),
      priceNGN: planDef.priceNGN, // null on the event plan — quoted manually
    });

    // Reni Design Studio auto-feed — fire-and-forget
    feedReniFlyer({ doc: doc.toJSON(), plan: planDef })
      .then((r) => { if (r.fed) console.log("Reni feed: flyer job created", r.jobId); })
      .catch((err) => console.error("Reni feed (flyer) failed:", err));

    if (mailConfigured()) {
      const json = doc.toJSON();
      try {
        await sendMail({
          to: doc.email,
          subject: `Flyer Design Request — ${planDef.label} — Richard Enoch`,
          html: clientEmailHTML(json, planDef),
          replyTo: OWNER.email,
        });
        await sendMail({
          to: OWNER.notifyEmail,
          subject: `NEW FLYER REQUEST — ${planDef.label} — ${doc.name}`,
          html: ownerEmailHTML(json, planDef),
          replyTo: doc.email,
        });
      } catch (mailErr) {
        console.error("flyer request mail error:", mailErr);
      }
    }

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("createFlyerRequest error:", err);
    return res.status(500).json({ message: "Failed to submit request." });
  }
};

/* Admin: list requests */
export const listFlyerRequests = async (_req, res) => {
  try {
    const items = await FlyerRequest.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (err) {
    console.error("listFlyerRequests error:", err);
    return res.status(500).json({ message: "Failed to fetch flyer requests." });
  }
};
