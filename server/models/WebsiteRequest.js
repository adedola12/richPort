// server/models/WebsiteRequest.js
import mongoose from "mongoose";

const WebsiteRequestSchema = new mongoose.Schema(
  {
    plan: { type: String, required: true, enum: ["starter", "business", "premium"] },
    invoiceNo: { type: String, default: "" },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    brand: { type: String, trim: true, maxlength: 120, default: "" },
    about: { type: String, trim: true, maxlength: 2000, default: "" },
    purpose: { type: String, trim: true, maxlength: 500, default: "" },
    pages: { type: String, trim: true, maxlength: 2000, default: "" },
    features: { type: String, trim: true, maxlength: 500, default: "" },
    contentStatus: { type: String, trim: true, maxlength: 120, default: "" },
    references: { type: String, trim: true, maxlength: 1000, default: "" },
    domainStatus: { type: String, trim: true, maxlength: 120, default: "" },
    duration: { type: String, trim: true, maxlength: 120, default: "" },
    notes: { type: String, trim: true, maxlength: 2000, default: "" },
    priceNGN: { type: Number, default: 0 },
    deposit: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);

WebsiteRequestSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.mongoId = ret._id;
    delete ret._id;
    return ret;
  },
});

export default mongoose.model("WebsiteRequest", WebsiteRequestSchema);
