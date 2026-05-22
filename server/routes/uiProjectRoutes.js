// routes/uiProjectRoutes.js
import express from "express";
import multer from "multer";
import {
  getAllUIProjects,
  getDefaultUIProject,
  getUIProjectBySlug,
  getAllUIProjectsAdmin,
  createUIProject,
  updateUIProject,
  deleteUIProject,
  uploadUIProjectImage,
  deleteUIProjectImage,
  getUIProjectMainImages,
  getWorkExperienceUIProjects,
} from "../controllers/uiProjectController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ server-side upload guard (set UI_IMAGE_MAX_MB to match client MAX_IMAGE_MB)
const MAX_UI_IMAGE_MB = Number(process.env.UI_IMAGE_MAX_MB || 10);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UI_IMAGE_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file?.mimetype?.startsWith("image/")) return cb(null, true);
    return cb(new Error("Only image files are allowed."));
  },
});

/* PUBLIC */
router.get("/", getAllUIProjects);
router.get("/default", getDefaultUIProject);
router.get("/slug/:slug", getUIProjectBySlug);
router.get("/main-images", getUIProjectMainImages);
router.get("/work-experience", getWorkExperienceUIProjects);

/* ADMIN */
router.get("/admin", requireAuth, requireAdmin, getAllUIProjectsAdmin);
router.post("/admin", requireAuth, requireAdmin, createUIProject);
router.put("/admin/:id", requireAuth, requireAdmin, updateUIProject);
router.delete("/admin/:id", requireAuth, requireAdmin, deleteUIProject);

router.post(
  "/admin/upload",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  uploadUIProjectImage,
);

router.post(
  "/admin/delete-image",
  requireAuth,
  requireAdmin,
  deleteUIProjectImage,
);

export default router;
