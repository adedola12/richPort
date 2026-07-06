// server/routes/testimonialRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import {
  createTestimonial,
  listPublicTestimonials,
  listAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many submissions — please try again later." },
});

// PUBLIC
router.post("/", submitLimiter, createTestimonial);
router.get("/public", listPublicTestimonials);

// ADMIN
router.get("/admin", requireAuth, requireAdmin, listAllTestimonials);
router.patch("/admin/:id", requireAuth, requireAdmin, updateTestimonial);
router.delete("/admin/:id", requireAuth, requireAdmin, deleteTestimonial);

export default router;
