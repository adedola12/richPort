// server/routes/discountRoutes.js
//   Public:
//     GET /api/discounts/validate?code=&service=&price=   — live check for booking forms
//     GET /api/discounts/offer/:token                     — offer summary for prefill
//   Admin (JWT + admin):
//     GET    /api/discounts/admin            — codes + offers
//     POST   /api/discounts/admin/codes      — create code
//     PUT    /api/discounts/admin/codes/:id  — update code (toggle active, etc.)
//     DELETE /api/discounts/admin/codes/:id
//     POST   /api/discounts/admin/offers     — create offer (returns the share link token)
//     PUT    /api/discounts/admin/offers/:id
//     DELETE /api/discounts/admin/offers/:id

import { Router } from "express";
import crypto from "crypto";
import { DiscountCode, CustomOffer } from "../models/Discount.js";
import { resolveDiscount } from "../utils/discounts.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

/* Express 4 doesn't catch async throws — every handler goes through this
   so a DB hiccup answers 500 instead of hanging the request. */
const safe = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((e) => {
  console.error("discounts route error:", e.message);
  if (!res.headersSent) res.status(500).json({ error: "server error" });
});

const CODE_TYPES = ["percent", "fixed"];
const CODE_SERVICES = ["any", "brand", "website", "flyer"];

/* Tiny in-memory throttle on the public validate endpoint so codes can't
   be brute-forced by a script. 30 checks/minute per IP is generous for a
   human typing a code. */
const _hits = new Map();
const throttled = (ip) => {
  const now = Date.now();
  const rec = _hits.get(ip);
  if (!rec || now - rec.ts > 60_000) { _hits.set(ip, { ts: now, n: 1 }); return false; }
  rec.n += 1;
  return rec.n > 30;
};

/* ── Public ── */
router.get("/validate", safe(async (req, res) => {
  if (throttled(req.ip)) return res.status(429).json({ ok: false, error: "Too many attempts — try again in a minute." });
  const { code, service = "brand", price } = req.query;
  if (!code) return res.status(400).json({ ok: false, error: "code is required" });
  const r = await resolveDiscount({ code, service, basePrice: Number(price) || 0 });
  if (r.error) return res.json({ ok: false, error: r.error });
  res.json({ ok: true, label: r.discount?.label || "", amount: r.discount?.amount || 0, finalPrice: r.finalPrice });
}));

router.get("/offer/:token", safe(async (req, res) => {
  const offer = await CustomOffer.findOne({ token: req.params.token }).lean();
  if (!offer || !offer.active) return res.status(404).json({ ok: false, error: "Offer not found or no longer valid." });
  if (offer.expiresAt && new Date(offer.expiresAt) < new Date()) return res.status(410).json({ ok: false, error: "This offer has expired." });
  res.json({
    ok: true,
    clientName: offer.clientName,
    note: offer.note,
    total: offer.total,
    items: (offer.items || []).map((i) => ({ service: i.service, planKey: i.planKey, price: i.price, booked: (offer.usedServices || []).includes(i.service) })),
  });
}));

/* ── Admin ── */
router.use("/admin", requireAuth, requireAdmin);

router.get("/admin", safe(async (_req, res) => {
  const [codes, offers] = await Promise.all([
    DiscountCode.find().sort({ createdAt: -1 }).lean(),
    CustomOffer.find().sort({ createdAt: -1 }).lean(),
  ]);
  res.json({ codes, offers });
}));

router.post("/admin/codes", safe(async (req, res) => {
  try {
    const { code, type, value, service, note, expiresAt, maxUses } = req.body || {};
    if (!code || !(Number(value) > 0)) return res.status(400).json({ error: "code, type and value are required" });
    if (!CODE_TYPES.includes(type)) return res.status(400).json({ error: "type must be percent or fixed" });
    if (service && !CODE_SERVICES.includes(service)) return res.status(400).json({ error: "unknown service" });
    if (type === "percent" && Number(value) > 100) return res.status(400).json({ error: "a percent discount can't exceed 100" });
    const doc = await DiscountCode.create({
      code: String(code).toUpperCase().trim(),
      type, value: Number(value),
      service: service || "any",
      note: note || "",
      expiresAt: expiresAt || null,
      maxUses: maxUses ? Number(maxUses) : null,
    });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.code === 11000 ? "That code already exists." : e.message });
  }
}));

router.put("/admin/codes/:id", safe(async (req, res) => {
  // Only fields the admin UI edits — a raw body can't rewrite uses/code/etc.
  const allowed = {};
  const b = req.body || {};
  if ("active" in b) allowed.active = !!b.active;
  if ("note" in b) allowed.note = String(b.note || "");
  if ("expiresAt" in b) allowed.expiresAt = b.expiresAt || null;
  if ("maxUses" in b) allowed.maxUses = b.maxUses ? Number(b.maxUses) : null;
  if ("value" in b) {
    if (!(Number(b.value) > 0)) return res.status(400).json({ error: "value must be positive" });
    allowed.value = Number(b.value);
  }
  if ("type" in b) {
    if (!CODE_TYPES.includes(b.type)) return res.status(400).json({ error: "type must be percent or fixed" });
    allowed.type = b.type;
  }
  if ("service" in b) {
    if (!CODE_SERVICES.includes(b.service)) return res.status(400).json({ error: "unknown service" });
    allowed.service = b.service;
  }
  const doc = await DiscountCode.findByIdAndUpdate(req.params.id, allowed, { new: true });
  if (!doc) return res.status(404).json({ error: "not found" });
  res.json(doc);
}));

router.delete("/admin/codes/:id", safe(async (req, res) => {
  await DiscountCode.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

router.post("/admin/offers", safe(async (req, res) => {
  try {
    const { clientName, clientEmail, note, items, expiresAt } = req.body || {};
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: "at least one item is required" });
    for (const i of items) {
      if (!CODE_SERVICES.slice(1).includes(i.service)) return res.status(400).json({ error: "unknown service on an offer item" });
      if (!i.planKey || !(Number(i.price) >= 0) || Number.isNaN(Number(i.price))) return res.status(400).json({ error: "each item needs service, planKey and a valid price" });
    }
    const total = items.reduce((s, i) => s + Number(i.price), 0);
    const token = crypto.randomBytes(16).toString("hex"); // 128-bit — not guessable
    const doc = await CustomOffer.create({
      token,
      clientName: clientName || "",
      clientEmail: clientEmail || "",
      note: note || "",
      items: items.map((i) => ({ service: i.service, planKey: String(i.planKey).toLowerCase(), price: Number(i.price) })),
      total,
      expiresAt: expiresAt || null,
    });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}));

router.put("/admin/offers/:id", safe(async (req, res) => {
  // Only mutable metadata — items/token/usage can't be rewritten after minting
  const allowed = {};
  const b = req.body || {};
  if ("active" in b) allowed.active = !!b.active;
  if ("note" in b) allowed.note = String(b.note || "");
  if ("expiresAt" in b) allowed.expiresAt = b.expiresAt || null;
  if ("clientName" in b) allowed.clientName = String(b.clientName || "");
  if ("clientEmail" in b) allowed.clientEmail = String(b.clientEmail || "");
  const doc = await CustomOffer.findByIdAndUpdate(req.params.id, allowed, { new: true });
  if (!doc) return res.status(404).json({ error: "not found" });
  res.json(doc);
}));

router.delete("/admin/offers/:id", safe(async (req, res) => {
  await CustomOffer.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

export default router;
