// models/RateModel.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

// --- Sub-schemas ---

const PlanSchema = new Schema(
  {
    // e.g. "plan-1", "gold", etc.
    id: {
      type: String,
      required: true,
      trim: true,
    },
    // e.g. "Gold", "Starter"
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Numeric price (frontend casts with Number(...))
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    // "USD" by default
    currency: {
      type: String,
      default: "USD",
      trim: true,
    },
    // Short description shown under the plan
    description: {
      type: String,
      default: "",
      trim: true,
    },
    // For highlighting a specific plan (useful on Rate Card)
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const DeliverableSchema = new Schema(
  {
    // e.g. "deliv-1" or slug of the label
    id: {
      type: String,
      required: true,
      trim: true,
    },
    // e.g. "Brand Guideline"
    label: {
      type: String,
      required: true,
      trim: true,
    },
    // Map of planId -> boolean (included or not)
    // Frontend treats as plain object: d.perPlan[planId]
    perPlan: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  { _id: false }
);

// --- Main Rate Category schema ---

const RateCategorySchema = new Schema(
  {
    // Category ID used by frontend (separate from Mongo _id)
    // e.g. "brand-identity"
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },

    // Short label displayed in UI
    // e.g. "Brand Identity"
    label: {
      type: String,
      required: true,
      trim: true,
    },

    // Heading shown in rate cards (can be same as label)
    heading: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    // Plan definitions for this category
    plans: {
      type: [PlanSchema],
      default: [],
    },

    // Deliverables, with per-plan flags
    deliverables: {
      type: [DeliverableSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Clean JSON output (id instead of _id)
RateCategorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.mongoId = ret._id; // if you ever need real Mongo id
    delete ret._id;
    return ret;
  },
});

const RateModel = mongoose.model("RateCategory", RateCategorySchema);

module.exports = RateModel;
