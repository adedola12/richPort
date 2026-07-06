// server/controllers/faqController.js
import Faq from "../models/Faq.js";

/* Public: published FAQs in display order */
export const listPublicFaqs = async (_req, res) => {
  try {
    const items = await Faq.find({ published: true }).sort({ order: 1, createdAt: 1 });
    return res.json(items);
  } catch (err) {
    console.error("listPublicFaqs error:", err);
    return res.status(500).json({ message: "Failed to fetch FAQs." });
  }
};

/* Admin: all FAQs */
export const listAllFaqs = async (_req, res) => {
  try {
    const items = await Faq.find().sort({ order: 1, createdAt: 1 });
    return res.json(items);
  } catch (err) {
    console.error("listAllFaqs error:", err);
    return res.status(500).json({ message: "Failed to fetch FAQs." });
  }
};

export const createFaq = async (req, res) => {
  try {
    const { question = "", answer = "", order = 0, published = true } = req.body || {};
    if (!String(question).trim()) return res.status(400).json({ message: "Question is required." });
    if (!String(answer).trim()) return res.status(400).json({ message: "Answer is required." });
    const created = await Faq.create({
      question: String(question).trim(),
      answer: String(answer).trim(),
      order: Number(order) || 0,
      published: Boolean(published),
    });
    return res.status(201).json(created);
  } catch (err) {
    console.error("createFaq error:", err);
    return res.status(500).json({ message: "Failed to create FAQ." });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const patch = {};
    if (req.body?.question !== undefined) patch.question = String(req.body.question).trim();
    if (req.body?.answer !== undefined) patch.answer = String(req.body.answer).trim();
    if (req.body?.order !== undefined) patch.order = Number(req.body.order) || 0;
    if (req.body?.published !== undefined) patch.published = Boolean(req.body.published);
    const updated = await Faq.findByIdAndUpdate(req.params.id, patch, { new: true });
    if (!updated) return res.status(404).json({ message: "FAQ not found." });
    return res.json(updated);
  } catch (err) {
    console.error("updateFaq error:", err);
    return res.status(500).json({ message: "Failed to update FAQ." });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    const deleted = await Faq.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "FAQ not found." });
    return res.json({ ok: true });
  } catch (err) {
    console.error("deleteFaq error:", err);
    return res.status(500).json({ message: "Failed to delete FAQ." });
  }
};
