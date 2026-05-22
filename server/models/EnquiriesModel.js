// models/EnquiriesModel.js (unused — kept for reference)
import mongoose from "mongoose";

const { Schema } = mongoose;

const EnquirySchema = new Schema(
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

    services: {
      type: [String],
      default: [],
    },

    budget: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    submittedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

EnquirySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

export default mongoose.model("Enquiry", EnquirySchema);
