import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  createQuestionnaire,
  listQuestionnaires,
} from "../controllers/questionnaireController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many submissions — please try again later." },
});

router.post("/", submitLimiter, createQuestionnaire);
router.get("/", requireAuth, requireAdmin, listQuestionnaires);

export default router;
