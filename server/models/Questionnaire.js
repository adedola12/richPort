import mongoose from "mongoose";

const { Schema } = mongoose;

const questionnaireSchema = new Schema(
  {
    invoiceNo: { type: String, required: true, unique: true, index: true },

    // quick-scan contact fields (also present inside responses)
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    brandName: { type: String, required: true, trim: true },
    firstName: { type: String, trim: true, default: "" },
    lastName: { type: String, trim: true, default: "" },

    planKey: { type: String, required: true, enum: ["silver", "gold", "platinum"] },

    // snapshot of the plan at booking time, so later price/deliverable
    // changes never alter what this invoice promised
    planSnapshot: {
      label: String,
      website: Boolean,
      deliverables: [String],
    },

    // money — recomputed server-side; rate + USD price stored for audit
    priceUSD: { type: Number, required: true },
    fxRate: { type: Number, required: true },
    fxSource: { type: String, enum: ["pinned", "live", "fallback"], default: "pinned" },
    priceNGN: { type: Number, required: true },
    deposit: { type: Number, required: true },
    balance: { type: Number, required: true },

    // set when a discount code or custom offer changed the price — the
    // invoice shows base → reduction → final, and Reni logs the final
    basePriceNGN: { type: Number, default: null },
    discount: {
      code: { type: String, default: "" },
      label: { type: String, default: "" },
      amount: { type: Number, default: 0 },
    },

    // full questionnaire answers (label-keyed values, strings or arrays)
    responses: { type: Schema.Types.Mixed, default: {} },

    preferredDuration: { type: String, default: "" },

    status: {
      type: String,
      enum: ["submitted", "deposit_received", "in_progress", "delivered"],
      default: "submitted",
    },

    emailsSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Questionnaire ||
  mongoose.model("Questionnaire", questionnaireSchema, "questionnaires");
