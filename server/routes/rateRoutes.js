// server/routes/rateRoutes.js
import express from "express";
import {
  getAllRateCategories,
  getRateCategoryById,
  createRateCategory,
  updateRateCategory,
  deleteRateCategory,
  createRateEnquiry,
  listRateEnquiries,
} from "../controllers/rateController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------- PUBLIC ROUTES ---------- */

// GET /api/rates → all categories
router.get("/", getAllRateCategories);

// GET /api/rates/category/:id → by logical id (e.g. "brand-identity")
router.get("/category/:id", getRateCategoryById);

/* ---------- ADMIN ROUTES ---------- */

// GET /api/rates/admin → same list but protected
router.get("/admin", requireAuth, requireAdmin, getAllRateCategories);

// POST /api/rates/admin → create a rate category with plans + deliverables
router.post("/admin", requireAuth, requireAdmin, createRateCategory);

// PUT /api/rates/admin/:id → update by Mongo ObjectId (category.mongoId)
router.put("/admin/:id", requireAuth, requireAdmin, updateRateCategory);

// DELETE /api/rates/admin/:id → delete by Mongo ObjectId
router.delete("/admin/:id", requireAuth, requireAdmin, deleteRateCategory);

/**
 * POST /api/rates/enquiries
 * Used by the public rate form
 */
router.post("/enquiries", createRateEnquiry);

/**
 * GET /api/rates/enquiries
 * Used by admin CustomersTab
 * If you already have auth cookies working, you can protect it like:
 *
 * router.get(
 *   "/enquiries",
 *   requireAuth,
 *   requireAdmin,
 *   listRateEnquiries
 * );
 */
router.get("/enquiries", listRateEnquiries);


export default router;
