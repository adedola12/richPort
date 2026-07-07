// server/controllers/websiteController.js
import WebsiteRequest from "../models/WebsiteRequest.js";
import { nextSequence } from "../models/Counter.js";
import { WEBSITE_PLANS } from "../config/websitePlans.js";
import { OWNER, DEPOSIT_PCT, formatNGN as N } from "../config/plans.js";
import { sendMail, mailConfigured } from "../utils/mailer.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const FIELD_LABELS = [
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone / WhatsApp"],
  ["brand", "Brand / organisation"],
  ["about", "About the business"],
  ["purpose", "Website purpose"],
  ["pages", "Pages needed"],
  ["features", "Features"],
  ["contentStatus", "Content readiness"],
  ["references", "Reference websites"],
  ["domainStatus", "Domain & hosting"],
  ["duration", "Preferred timeline"],
  ["notes", "Anything else"],
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

const invoiceHTML = (doc, plan) => `
  <div style="border:1px solid #e4e8d8;border-radius:8px;padding:16px;margin:16px 0;">
    <div style="font-size:13px;font-weight:700;color:#1a1f12;margin-bottom:10px;">INVOICE ${esc(doc.invoiceNo)}</div>
    <table width="100%" style="border-collapse:collapse;font-size:13px;color:#333;">
      <tr><td style="padding:5px 0;">Package</td><td style="text-align:right;font-weight:700;">${esc(plan.label)} — ${esc(plan.pages)}</td></tr>
      <tr><td style="padding:5px 0;">Total${plan.from ? " (from)" : ""}</td><td style="text-align:right;font-weight:700;">${N(doc.priceNGN)}</td></tr>
      <tr><td style="padding:5px 0;">Deposit due now (${DEPOSIT_PCT}%)</td><td style="text-align:right;font-weight:700;color:#3f5c00;">${N(doc.deposit)}</td></tr>
      <tr><td style="padding:5px 0;">Balance on completion</td><td style="text-align:right;">${N(doc.balance)}</td></tr>
    </table>
    ${plan.from ? `<div style="font-size:11.5px;color:#999;margin-top:8px;">Premium builds are scoped per project — this invoice reflects the base package; any additional scope is quoted before work begins.</div>` : ""}
  </div>`;

const termsHTML = (doc, plan) => `
  <div style="border:1px solid #e4e8d8;border-radius:8px;padding:16px;margin:16px 0;">
    <div style="font-size:13px;font-weight:700;color:#1a1f12;margin-bottom:8px;">TERMS OF AGREEMENT</div>
    <div style="font-size:12px;color:#777;margin-bottom:12px;">Between <b>${esc(OWNER.fullName)}</b> (the Designer) and <b>${esc(doc.name)}</b> (the Client) • Invoice ${esc(doc.invoiceNo)}</div>
    <ol style="font-size:12.5px;color:#444;line-height:1.9;padding-left:18px;margin:0;">
      <li><b>Scope.</b> ${plan.deliverables.map(esc).join("; ")}.</li>
      <li><b>Payment.</b> ${DEPOSIT_PCT}% deposit before commencement; ${100 - DEPOSIT_PCT}% balance before final handover/launch. The deposit is non-refundable once work begins.</li>
      <li><b>Timeline.</b> ${esc(plan.timeline)}${doc.duration ? ` — client's preferred timeline: ${esc(doc.duration)}` : ""}. The clock starts when the deposit is confirmed and content is received.</li>
      <li><b>Revisions.</b> ${esc(plan.revisions)}. Revisions beyond the included rounds are quoted separately.</li>
      <li><b>Content.</b> The Client supplies text and imagery unless otherwise agreed; delays in content delivery extend the timeline accordingly.</li>
      <li><b>Hosting & domain.</b> Billed separately and owned by the Client. I can set both up on the Client's behalf at cost.</li>
      <li><b>Ownership.</b> Full rights to the delivered website transfer to the Client upon full payment.</li>
    </ol>
  </div>`;

function clientEmailHTML(doc, plan) {
  return `
  <div style="max-width:640px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;color:#333;padding:24px;">
    <h2 style="color:#1a1f12;margin-bottom:4px;">Website booking received 🎉</h2>
    <p style="font-size:14px;line-height:1.8;">Hi ${esc(doc.name)},<br>
    Thanks for booking the <b>${esc(plan.label)}</b> website package (${esc(plan.pages)}). Here's your invoice, the terms that govern the project, and a copy of everything you sent.</p>
    <div style="border:1px solid #e4e8d8;border-radius:8px;padding:14px 16px;margin-bottom:4px;">
      <div style="font-size:13px;font-weight:700;color:#1a1f12;margin-bottom:8px;">NEXT STEPS</div>
      <div style="font-size:13px;line-height:1.9;color:#444;">
        1. Make the <b>${DEPOSIT_PCT}% deposit of ${N(doc.deposit)}</b> to any of the accounts below.<br>
        2. Send your proof of payment to WhatsApp <b>${esc(OWNER.whatsapp)}</b>.<br>
        3. The project starts once payment is confirmed and your content is in.
      </div>
      <div style="margin-top:12px;">${banksHTML()}</div>
    </div>
    ${invoiceHTML(doc, plan)}
    ${termsHTML(doc, plan)}
    <div style="font-size:15px;font-weight:700;color:#1a1f12;margin:18px 0 8px;">Your Answers</div>
    ${detailsTable(doc)}
    <p style="font-size:12px;color:#999;text-align:center;margin-top:24px;">${esc(OWNER.site || "")} • ${esc(OWNER.email)} • WhatsApp ${esc(OWNER.whatsapp)}</p>
  </div>`;
}

function ownerEmailHTML(doc, plan) {
  return `
  <div style="max-width:640px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;color:#333;padding:24px;">
    <h2 style="color:#1a1f12;">New website booking — ${esc(plan.label)} — ${esc(doc.brand || doc.name)}</h2>
    <p style="font-size:14px;line-height:1.8;"><b>${esc(doc.name)}</b> • ${esc(doc.email)} • ${esc(doc.phone)}<br>
    Total ${N(doc.priceNGN)} — deposit due ${N(doc.deposit)} • Invoice ${esc(doc.invoiceNo)}</p>
    ${detailsTable(doc)}
    ${invoiceHTML(doc, plan)}
    <div style="font-size:12px;font-weight:700;margin-top:18px;">RAW JSON (paste into Claude when starting the project):</div>
    <pre style="background:#f4f4f0;border:1px solid #e0e0d8;border-radius:8px;padding:14px;font-size:10.5px;white-space:pre-wrap;word-break:break-all;">${esc(JSON.stringify(doc, null, 1))}</pre>
  </div>`;
}

/* Public: plans (client renders cards from this — pricing lives server-side) */
export const getWebsitePlans = (_req, res) => res.json(WEBSITE_PLANS);

/* Public: submit a website booking */
export const createWebsiteRequest = async (req, res) => {
  try {
    if (req.body?._hp) return res.status(201).json({ ok: true });

    const { plan, name = "", email = "", pages = "" } = req.body || {};
    const planDef = WEBSITE_PLANS[plan];
    if (!planDef) return res.status(400).json({ message: "Choose a valid package." });
    if (!String(name).trim()) return res.status(400).json({ message: "Name is required." });
    if (!/^\S+@\S+\.\S+$/.test(String(email).trim())) {
      return res.status(400).json({ message: "A valid email is required." });
    }
    if (!String(pages).trim()) return res.status(400).json({ message: "Tell me which pages your site needs." });

    const pick = (k, max = 2000) => String(req.body?.[k] || "").trim().slice(0, max);

    const priceNGN = planDef.priceNGN;
    const deposit = Math.round((priceNGN * DEPOSIT_PCT) / 100);
    const seq = await nextSequence("website-invoice", 0);
    const invoiceNo = `WEB-${String(seq).padStart(3, "0")}`;

    const doc = await WebsiteRequest.create({
      plan,
      invoiceNo,
      name: pick("name", 120),
      email: pick("email", 160),
      phone: pick("phone", 40),
      brand: pick("brand", 120),
      about: pick("about"),
      purpose: pick("purpose", 500),
      pages: pick("pages"),
      features: pick("features", 500),
      contentStatus: pick("contentStatus", 120),
      references: pick("references", 1000),
      domainStatus: pick("domainStatus", 120),
      duration: pick("duration", 120),
      notes: pick("notes"),
      priceNGN,
      deposit,
      balance: priceNGN - deposit,
    });

    if (mailConfigured()) {
      const json = doc.toJSON();
      try {
        await sendMail({
          to: doc.email,
          subject: `Website Booking — ${planDef.label} Package — Invoice ${invoiceNo}`,
          html: clientEmailHTML(json, planDef),
          replyTo: OWNER.email,
        });
        await sendMail({
          to: OWNER.notifyEmail,
          subject: `NEW WEBSITE BOOKING — ${planDef.label} — ${doc.brand || doc.name} — ${invoiceNo}`,
          html: ownerEmailHTML(json, planDef),
          replyTo: doc.email,
        });
      } catch (mailErr) {
        console.error("website booking mail error:", mailErr);
      }
    }

    return res.status(201).json({ ok: true, invoice_no: invoiceNo });
  } catch (err) {
    console.error("createWebsiteRequest error:", err);
    return res.status(500).json({ message: "Failed to submit booking." });
  }
};

/* Admin: list bookings */
export const listWebsiteRequests = async (_req, res) => {
  try {
    const items = await WebsiteRequest.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (err) {
    console.error("listWebsiteRequests error:", err);
    return res.status(500).json({ message: "Failed to fetch website bookings." });
  }
};
