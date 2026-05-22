import express from "express";
import { signup, signin, signout, me } from "../controllers/authController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", requireAuth, requireAdmin, signup);
router.post("/signin", signin);
router.post("/signout", signout);

// ✅ IMPORTANT: protected endpoint for refresh rehydrate
router.get("/me", requireAuth, me);

export default router;
