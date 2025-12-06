// server/routes/journeyRoutes.js
import express from "express";
import multer from "multer";
import {
  getAllJourneyEntries,
  createJourneyEntry,
  updateJourneyEntry,
  deleteJourneyEntry,
  uploadJourneyImage,
  deleteJourneyImage
} from "../controllers/journeyController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer in-memory storage (stream directly to Cloudinary)
const upload = multer({ storage: multer.memoryStorage() });

/* ---------- PUBLIC ROUTES ---------- */

// GET /api/journey
router.get("/", getAllJourneyEntries);

/* ---------- ADMIN ROUTES ---------- */
// All under /api/journey/admin...

// GET /api/journey/admin → same list but behind auth
router.get("/admin", requireAuth, requireAdmin, getAllJourneyEntries);

// POST /api/journey/admin → create entry
router.post("/admin", requireAuth, requireAdmin, createJourneyEntry);

// PUT /api/journey/admin/:id → update entry
router.put("/admin/:id", requireAuth, requireAdmin, updateJourneyEntry);

// DELETE /api/journey/admin/:id → delete entry
router.delete("/admin/:id", requireAuth, requireAdmin, deleteJourneyEntry);

// POST /api/journey/admin/upload → upload image
router.post(
  "/admin/upload",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  uploadJourneyImage
);

// POST /api/journey/admin/delete-image → delete image from Cloudinary
router.post(
  "/admin/delete-image",
  requireAuth,
  requireAdmin,
  deleteJourneyImage
);

export default router;
