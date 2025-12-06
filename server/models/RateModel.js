// models/RateModel.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

// --- Sub-schemas ---

const PlanSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, default: 0 },
    currency: { type: String, default: "USD", trim: true },
    description: { type: String, default: "", trim: true },
    isFeatured: { type: Boolean, default: false },
  },
  { _id: false }
);

const DeliverableSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },

    // NEW: how the admin wants to input per-plan values
    // "boolean" => checkboxes, "text" => free text per plan
    mode: {
      type: String,
      enum: ["boolean", "text"],
      default: "boolean",
    },

    // Map of planId -> boolean | string | number
    perPlan: {
      type: Map,
      of: Schema.Types.Mixed, // 👈 was Boolean
      default: {},
    },
  },
  { _id: false }
);

// --- Main Rate Category schema ---
const RateCategorySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    label: { type: String, required: true, trim: true },
    heading: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    tags: { type: [String], default: [] },
    plans: { type: [PlanSchema], default: [] },
    deliverables: { type: [DeliverableSchema], default: [] },
  },
  { timestamps: true }
);

RateCategorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.mongoId = ret._id;
    delete ret._id;
    return ret;
  },
});

const RateModel = mongoose.model("RateCategory", RateCategorySchema);
module.exports = RateModel;
