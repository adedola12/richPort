// server/routes/faqRoutes.js
import express from "express";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import {
  listPublicFaqs,
  listAllFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/faqController.js";

const router = express.Router();

// PUBLIC
router.get("/", listPublicFaqs);

// ADMIN
router.get("/admin", requireAuth, requireAdmin, listAllFaqs);
router.post("/admin", requireAuth, requireAdmin, createFaq);
router.put("/admin/:id", requireAuth, requireAdmin, updateFaq);
router.delete("/admin/:id", requireAuth, requireAdmin, deleteFaq);

export default router;
