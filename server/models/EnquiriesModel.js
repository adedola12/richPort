// models/EnquiresModel.js
const mongoose = require("mongoose");

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

    // Array of selected services
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

    // Frontend sends ISO string; we store as Date
    submittedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

// Nice JSON shape
EnquirySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const EnquiresModel = mongoose.model("Enquiry", EnquirySchema);

module.exports = EnquiresModel;
