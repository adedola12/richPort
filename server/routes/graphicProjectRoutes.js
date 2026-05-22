// server/routes/graphicProjectRoutes.js
import express from "express";
import multer from "multer";
import {
  getAllGraphicProjects,
  getGraphicProjectById,
  getAllGraphicProjectsAdmin,
  createGraphicProject,
  updateGraphicProject,
  deleteGraphicProject,
  uploadGraphicProjectImage,
  deleteGraphicProjectImage,
} from "../controllers/graphicProjectController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

const MAX_GFX_IMAGE_MB = Number(process.env.GFX_IMAGE_MAX_MB || 10);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_GFX_IMAGE_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file?.mimetype?.startsWith("image/")) return cb(null, true);
    return cb(new Error("Only image files are allowed."));
  },
});

/* ADMIN (put before :id) */
router.get("/admin/all", requireAuth, requireAdmin, getAllGraphicProjectsAdmin);
router.post("/admin", requireAuth, requireAdmin, createGraphicProject);
router.put("/admin/:id", requireAuth, requireAdmin, updateGraphicProject);
router.delete("/admin/:id", requireAuth, requireAdmin, deleteGraphicProject);

router.post(
  "/admin/upload",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  uploadGraphicProjectImage,
);

router.post(
  "/admin/delete-image",
  requireAuth,
  requireAdmin,
  deleteGraphicProjectImage,
);

/* PUBLIC */
router.get("/", getAllGraphicProjects);
router.get("/:id", getGraphicProjectById);

export default router;
