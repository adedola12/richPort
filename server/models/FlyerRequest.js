// server/models/FlyerRequest.js
import mongoose from "mongoose";

const FlyerRequestSchema = new mongoose.Schema(
  {
    plan: { type: String, required: true, enum: ["single", "triple", "five", "event"] },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    brand: { type: String, trim: true, maxlength: 120, default: "" },
    purpose: { type: String, required: true, trim: true, maxlength: 1000 },
    deadline: { type: String, trim: true, maxlength: 60, default: "" },
    headline: { type: String, trim: true, maxlength: 300, default: "" },
    subtitle: { type: String, trim: true, maxlength: 300, default: "" },
    bodyText: { type: String, trim: true, maxlength: 2000, default: "" },
    eventDetails: { type: String, trim: true, maxlength: 1000, default: "" },
    references: { type: String, trim: true, maxlength: 1000, default: "" },
    // event plan only — the list of designs the campaign needs
    breakdown: { type: String, trim: true, maxlength: 2000, default: "" },
    // computed server-side; null for the event plan (custom quote)
    priceNGN: { type: Number, default: null },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);

FlyerRequestSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.mongoId = ret._id;
    delete ret._id;
    return ret;
  },
});

export default mongoose.model("FlyerRequest", FlyerRequestSchema);
