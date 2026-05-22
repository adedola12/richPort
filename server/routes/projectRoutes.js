// server/routes/projectRoutes.js
import express from "express";
import multer from "multer";
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  uploadProjectImage,
  deleteProjectImage,
  getProjectMainImages,
} from "../controllers/projectController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer in-memory storage (buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
  },
});

/* ---------- PUBLIC ROUTES ---------- */
router.get("/", getAllProjects);
router.get("/main-images", getProjectMainImages); // ⬅️ new route
router.get("/slug/:slug", getProjectBySlug);

/* ---------- ADMIN ROUTES ---------- */
router.get("/admin", requireAuth, requireAdmin, getAllProjects);

router.post("/admin", requireAuth, requireAdmin, createProject);

router.put("/admin/:id", requireAuth, requireAdmin, updateProject);

// ⚠️ important: field name must match "image" in FormData
router.post(
  "/admin/upload",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  uploadProjectImage
);

// image delete  👇 this matches `${PROJECTS_API}/api/projects/admin/delete-image`
router.post(
  "/admin/delete-image",
  requireAuth,
  requireAdmin,
  deleteProjectImage
);

export default router;
