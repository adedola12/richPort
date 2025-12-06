// models/RateEnquiry.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const RateEnquirySchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Array of selected services from the rate form
    services: {
      type: [String],
      default: [],
    },

    // Budget slider value (1000–5000 on frontend)
    budget: {
      type: Number,
      required: true,
    },

    // Optional message
    message: {
      type: String,
      default: "",
      trim: true,
    },

    // Frontend sends ISO string; we store as Date (fallback = now)
    submittedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

// Nice JSON shape for API responses
RateEnquirySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

// guard for hot-reload in dev
const RateEnquiry =
  mongoose.models.RateEnquiry ||
  mongoose.model("RateEnquiry", RateEnquirySchema);

export default RateEnquiry;
