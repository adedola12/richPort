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

/* ── Public ── */
router.get("/validate", async (req, res) => {
  const { code, service = "brand", price } = req.query;
  if (!code) return res.status(400).json({ ok: false, error: "code is required" });
  const r = await resolveDiscount({ code, service, basePrice: Number(price) || 0 });
  if (r.error) return res.json({ ok: false, error: r.error });
  res.json({ ok: true, label: r.discount?.label || "", amount: r.discount?.amount || 0, finalPrice: r.finalPrice });
});

router.get("/offer/:token", async (req, res) => {
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
});

/* ── Admin ── */
router.use("/admin", requireAuth, requireAdmin);

router.get("/admin", async (_req, res) => {
  const [codes, offers] = await Promise.all([
    DiscountCode.find().sort({ createdAt: -1 }).lean(),
    CustomOffer.find().sort({ createdAt: -1 }).lean(),
  ]);
  res.json({ codes, offers });
});

router.post("/admin/codes", async (req, res) => {
  try {
    const { code, type, value, service, note, expiresAt, maxUses } = req.body || {};
    if (!code || !type || !(Number(value) > 0)) return res.status(400).json({ error: "code, type and value are required" });
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
});

router.put("/admin/codes/:id", async (req, res) => {
  const doc = await DiscountCode.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ error: "not found" });
  res.json(doc);
});

router.delete("/admin/codes/:id", async (req, res) => {
  await DiscountCode.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

router.post("/admin/offers", async (req, res) => {
  try {
    const { clientName, clientEmail, note, items, expiresAt } = req.body || {};
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: "at least one item is required" });
    for (const i of items) {
      if (!i.service || !i.planKey || !(Number(i.price) >= 0)) return res.status(400).json({ error: "each item needs service, planKey and price" });
    }
    const total = items.reduce((s, i) => s + Number(i.price), 0);
    const token = crypto.randomBytes(8).toString("hex");
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
});

router.put("/admin/offers/:id", async (req, res) => {
  const doc = await CustomOffer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ error: "not found" });
  res.json(doc);
});

router.delete("/admin/offers/:id", async (req, res) => {
  await CustomOffer.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
