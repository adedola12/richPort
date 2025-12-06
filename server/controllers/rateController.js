// server/controllers/rateController.js
import RateCategory from "../models/RateModel.js";

/**
 * Normalize incoming body into a clean payload for RateCategory
 * Supports both full create and partial update (partial = true).
 */
const buildRatePayload = (body, { partial = false } = {}) => {
  const payload = {};

  // id (string slug, unique)
  if (!partial || body.id !== undefined) {
    if (body.id != null) {
      payload.id = String(body.id).trim().toLowerCase();
    }
  }

  // label
  if (!partial || body.label !== undefined) {
    if (body.label != null) {
      payload.label = String(body.label).trim();
    }
  }

  // heading
  if (!partial || body.heading !== undefined) {
    if (body.heading != null) {
      payload.heading = String(body.heading).trim();
    }
  }

  // description
  if (!partial || body.description !== undefined) {
    payload.description =
      body.description != null ? String(body.description).trim() : "";
  }

  // tags: can be string ("a,b") or array
  if (!partial || body.tags !== undefined) {
    if (Array.isArray(body.tags)) {
      payload.tags = body.tags.map((t) => String(t).trim()).filter(Boolean);
    } else if (typeof body.tags === "string") {
      payload.tags = body.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else {
      payload.tags = [];
    }
  }

  // plans: array of objects
  if (!partial || body.plans !== undefined) {
    if (Array.isArray(body.plans)) {
      payload.plans = body.plans.map((p) => ({
        id: String(p.id).trim(),
        name: String(p.name).trim(),
        price: p.price === undefined || p.price === null ? 0 : Number(p.price),
        currency: p.currency ? String(p.currency).trim() : "USD",
        description: p.description ? String(p.description).trim() : "",
        isFeatured: Boolean(p.isFeatured),
      }));
    } else if (!partial) {
      payload.plans = [];
    }
  }

  // deliverables: array of objects
  if (!partial || body.deliverables !== undefined) {
    if (Array.isArray(body.deliverables)) {
      payload.deliverables = body.deliverables.map((d) => {
        const perPlanInput =
          d.perPlan && typeof d.perPlan === "object" ? d.perPlan : {};

        const perPlan = Object.entries(perPlanInput).reduce(
          (acc, [planId, val]) => {
            if (val === undefined || val === null) return acc;

            // keep booleans as booleans, numbers as numbers, trim strings
            if (typeof val === "boolean" || typeof val === "number") {
              acc[planId] = val;
            } else if (typeof val === "string") {
              const trimmed = val.trim();
              if (trimmed !== "") {
                acc[planId] = trimmed;
              }
            }
            return acc;
          },
          {}
        );

        return {
          id: String(d.id).trim(),
          label: String(d.label).trim(),
          mode: d.mode === "text" ? "text" : "boolean", // default
          perPlan,
        };
      });
    } else if (!partial) {
      payload.deliverables = [];
    }
  }

  return payload;
};

/**
 * GET /api/rates
 * Public list of all rate categories
 */
export const getAllRateCategories = async (req, res) => {
  try {
    const categories = await RateCategory.find().sort({ createdAt: 1 }); // 👈 no .lean()
    return res.json(categories); // will now use toJSON -> adds mongoId
  } catch (err) {
    console.error("getAllRateCategories error:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch rate categories." });
  }
};


/**
 * GET /api/rates/category/:id
 * Public get by logical category id (e.g. "brand-identity")
 */
export const getRateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await RateCategory.findOne({
      id: id.toLowerCase(),
    }).lean();

    if (!category) {
      return res.status(404).json({ message: "Rate category not found." });
    }

    return res.json(category);
  } catch (err) {
    console.error("getRateCategoryById error:", err);
    return res.status(500).json({ message: "Failed to fetch rate category." });
  }
};

/**
 * POST /api/rates/admin
 * Body:
 *  {
 *    id: "brand-identity",
 *    label: "Brand Identity",
 *    heading: "Brand Identity Rates",
 *    description?: string,
 *    tags?: string[] | "a,b,c",
 *    plans: [
 *      { id, name, price, currency?, description?, isFeatured? }, ...
 *    ],
 *    deliverables: [
 *      { id, label, perPlan: { [planId]: boolean } }, ...
 *    ]
 *  }
 */
export const createRateCategory = async (req, res) => {
  try {
    const { id, label, heading } = req.body;

    if (!id || !String(id).trim()) {
      return res.status(400).json({ message: "id is required." });
    }
    if (!label || !String(label).trim()) {
      return res.status(400).json({ message: "label is required." });
    }
    if (!heading || !String(heading).trim()) {
      return res.status(400).json({ message: "heading is required." });
    }

    const normalizedId = String(id).trim().toLowerCase();

    const existing = await RateCategory.findOne({ id: normalizedId });
    if (existing) {
      return res.status(409).json({
        message: "A rate category with this id already exists.",
      });
    }

    const payload = buildRatePayload({ ...req.body, id: normalizedId });

    const created = await RateCategory.create(payload);
    return res.status(201).json(created);
  } catch (err) {
    console.error("createRateCategory error:", err);
    return res.status(500).json({ message: "Failed to create rate category." });
  }
};

/**
 * PUT /api/rates/admin/:id
 * :id = Mongo ObjectId (use category.mongoId from API response)
 * Body = partial or full fields (same shape as create)
 */
export const updateRateCategory = async (req, res) => {
  try {
    const mongoId = req.params.id;

    const payload = buildRatePayload(req.body, { partial: true });

    // If client is changing the logical id (slug), ensure it's still unique
    if (payload.id) {
      const existing = await RateCategory.findOne({
        id: payload.id,
        _id: { $ne: mongoId },
      });
      if (existing) {
        return res.status(409).json({
          message: "Another rate category with this id already exists.",
        });
      }
    }

    const updated = await RateCategory.findByIdAndUpdate(mongoId, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Rate category not found." });
    }

    return res.json(updated);
  } catch (err) {
    console.error("updateRateCategory error:", err);
    return res.status(500).json({ message: "Failed to update rate category." });
  }
};

/**
 * DELETE /api/rates/admin/:id
 * :id = Mongo ObjectId (category.mongoId)
 */
export const deleteRateCategory = async (req, res) => {
  try {
    const mongoId = req.params.id;
    const deleted = await RateCategory.findByIdAndDelete(mongoId);

    if (!deleted) {
      return res.status(404).json({ message: "Rate category not found." });
    }

    return res.json({ message: "Rate category deleted." });
  } catch (err) {
    console.error("deleteRateCategory error:", err);
    return res.status(500).json({ message: "Failed to delete rate category." });
  }
};
