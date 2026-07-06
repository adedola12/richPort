// server/routes/flyerRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import {
  getFlyerPlans,
  createFlyerRequest,
  listFlyerRequests,
} from "../controllers/flyerController.js";

const router = express.Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many submissions — please try again later." },
});

// PUBLIC
router.get("/plans", getFlyerPlans);
router.post("/", submitLimiter, createFlyerRequest);

// ADMIN
router.get("/admin", requireAuth, requireAdmin, listFlyerRequests);

export default router;
