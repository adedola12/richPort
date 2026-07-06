// server/controllers/testimonialController.js
import Testimonial from "../models/Testimonial.js";

/* Public: submit a testimonial */
export const createTestimonial = async (req, res) => {
  try {
    // Honeypot — pretend success so bots learn nothing.
    if (req.body?._hp) return res.status(201).json({ ok: true });

    const { name = "", initials = "", service = "", rating, feedback = "" } = req.body || {};

    const cleanInitials = String(initials).trim().toUpperCase().slice(0, 4);
    if (!cleanInitials) return res.status(400).json({ message: "Initials are required." });

    if (!String(service).trim()) return res.status(400).json({ message: "Service is required." });

    const numRating = Number(rating);
    if (!Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    if (!String(feedback).trim()) return res.status(400).json({ message: "Feedback is required." });

    const created = await Testimonial.create({
      name: String(name).trim(),
      initials: cleanInitials,
      service: String(service).trim(),
      rating: numRating,
      feedback: String(feedback).trim(),
    });

    return res.status(201).json({ ok: true, testimonial: created });
  } catch (err) {
    console.error("createTestimonial error:", err);
    return res.status(500).json({ message: "Failed to submit testimonial." });
  }
};

/* Public: testimonials shown on the site — 4★+ and not hidden by admin */
export const listPublicTestimonials = async (_req, res) => {
  try {
    // Capped at 7 — the home section is scroll-driven, so more cards means
    // a longer pinned scroll, which gets frustrating.
    const items = await Testimonial.find({ rating: { $gte: 4 }, hidden: false })
      .sort({ createdAt: -1 })
      .limit(7);
    return res.json(items);
  } catch (err) {
    console.error("listPublicTestimonials error:", err);
    return res.status(500).json({ message: "Failed to fetch testimonials." });
  }
};

/* Admin: everything, newest first */
export const listAllTestimonials = async (_req, res) => {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (err) {
    console.error("listAllTestimonials error:", err);
    return res.status(500).json({ message: "Failed to fetch testimonials." });
  }
};

/* Admin: toggle visibility / edit */
export const updateTestimonial = async (req, res) => {
  try {
    const patch = {};
    if (typeof req.body?.hidden === "boolean") patch.hidden = req.body.hidden;
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, patch, { new: true });
    if (!updated) return res.status(404).json({ message: "Testimonial not found." });
    return res.json(updated);
  } catch (err) {
    console.error("updateTestimonial error:", err);
    return res.status(500).json({ message: "Failed to update testimonial." });
  }
};

/* Admin: delete */
export const deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Testimonial not found." });
    return res.json({ ok: true });
  } catch (err) {
    console.error("deleteTestimonial error:", err);
    return res.status(500).json({ message: "Failed to delete testimonial." });
  }
};
