// server/routes/studioRoutes.js
// The website ⇄ Reni Studio bridge.
//
//   GET  /api/studio/templates  (public)  — the single source of truth for
//        service packages: live prices (admin rate-card overrides included)
//        and deliverables per tier. Reni's intake pulls this so the studio
//        always mirrors what the website is selling.
//
//   POST /api/studio/receipt    (secret)  — Reni calls this when Richard
//        marks a milestone received; the client gets the branded
//        acknowledgment + receipt email without Richard writing it.
//        Guarded by the STUDIO_WEBHOOK_SECRET env var (x-studio-secret
//        header must match).

import { Router } from "express";
import RateCategory from "../models/RateModel.js";
import { PLANS, getFxRate, computeMoney, formatNGN, OWNER } from "../config/plans.js";
import { WEBSITE_PLANS } from "../config/websitePlans.js";
import { FLYER_PLANS } from "../config/flyerPlans.js";
import { mailConfigured, sendMail } from "../utils/mailer.js";

const router = Router();

/* ── Templates ── */
router.get("/templates", async (_req, res) => {
  try {
    const fx = await getFxRate();
    // Admin-set rate-card prices win over config, exactly like bookings.
    let overrides = {};
    try {
      const cat = await RateCategory.findOne({ id: "brand-identity" }).lean();
      (cat?.plans || []).forEach((p) => {
        if (Number(p.price) > 0) overrides[String(p.name).toLowerCase()] = { price: Number(p.price), currency: p.currency };
      });
    } catch { /* rate card unavailable → config prices */ }

    const brand = {};
    for (const [key, plan] of Object.entries(PLANS)) {
      const money = computeMoney(key, fx.rate, overrides[key] || null);
      brand[plan.label] = { price: money.price, deliverables: plan.deliverables, blurb: plan.blurb };
    }
    const website = {};
    for (const plan of Object.values(WEBSITE_PLANS)) {
      website[plan.label] = { price: plan.priceNGN, from: !!plan.from, days: plan.timeline, pages: plan.pages, deliverables: plan.deliverables };
    }
    const flyer = {};
    for (const [key, plan] of Object.entries(FLYER_PLANS)) {
      flyer[plan.label || key] = { ...plan };
    }
    res.json({ ok: true, updatedAt: new Date().toISOString(), fxSource: fx.source, brand, website, flyer });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

/* ── Receipt / acknowledgment email ── */
const receiptHTML = ({ kind, clientName, projectTitle, amount, invoiceNo, milestoneName }) => {
  const isDeposit = kind !== "balance";
  const heading = isDeposit ? "Payment received — thank you!" : "Final payment received — thank you!";
  const nextLine = isDeposit
    ? "Your project is now moving into production. Next you'll receive a consolidated brief laying out my understanding of the project and the structure we'll follow."
    : "It has been a pleasure building this with you. Your final files and handover package complete the project — I'll check in shortly to make sure everything is serving you well.";
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#111">
    <h2 style="margin:0 0 4px">${heading}</h2>
    <p style="margin:0 0 18px;color:#555">Official receipt from ${OWNER.name} — ${OWNER.title}</p>
    <p>Hi ${clientName || "there"},</p>
    <p>This confirms your payment has been received. ${nextLine}</p>
    <table style="border-collapse:collapse;width:100%;margin:18px 0" cellpadding="8">
      <tr style="background:#f5f5f5"><td><b>Receipt for</b></td><td>${projectTitle || "Design project"}</td></tr>
      ${invoiceNo ? `<tr><td><b>Invoice No.</b></td><td>${invoiceNo}</td></tr>` : ""}
      ${milestoneName ? `<tr style="background:#f5f5f5"><td><b>Payment</b></td><td>${milestoneName}</td></tr>` : ""}
      <tr><td><b>Amount received</b></td><td><b>${formatNGN(amount)}</b></td></tr>
      <tr style="background:#f5f5f5"><td><b>Date</b></td><td>${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</td></tr>
    </table>
    <p style="color:#555">Questions? Just reply to this email or reach me on WhatsApp: ${OWNER.whatsapp}.</p>
    <p>— ${OWNER.name}<br/><span style="color:#888">${OWNER.site}</span></p>
  </div>`;
};

router.post("/receipt", async (req, res) => {
  const secret = process.env.STUDIO_WEBHOOK_SECRET;
  if (!secret) return res.status(503).json({ ok: false, error: "not configured" });
  if (req.get("x-studio-secret") !== secret) return res.status(401).json({ ok: false, error: "unauthorized" });
  if (!mailConfigured()) return res.status(503).json({ ok: false, error: "mail not configured" });

  const { kind, clientName, clientEmail, projectTitle, amount, invoiceNo, milestoneName } = req.body || {};
  if (!clientEmail || !amount) return res.status(400).json({ ok: false, error: "clientEmail and amount are required" });

  try {
    const html = receiptHTML({ kind, clientName, projectTitle, amount, invoiceNo, milestoneName });
    await sendMail({
      to: clientEmail,
      subject: `Receipt — ${projectTitle || "your project"} (${formatNGN(amount)})`,
      html,
      replyTo: OWNER.email,
    });
    // Owner copy, fire-and-forget
    sendMail({
      to: OWNER.notifyEmail,
      subject: `Receipt sent → ${clientName || clientEmail} — ${formatNGN(amount)}`,
      html: `<p>Receipt emailed to <b>${clientName || ""} &lt;${clientEmail}&gt;</b> for <b>${projectTitle || "—"}</b>: ${formatNGN(amount)} (${milestoneName || kind || "payment"}).</p>`,
    }).catch(() => {});
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
