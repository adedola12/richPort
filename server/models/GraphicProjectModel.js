import mongoose from "mongoose";

const CloudImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, required: true, trim: true },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
  },
  { _id: false },
);

const GraphicProjectSchema = new mongoose.Schema(
  {
    projectType: { type: String, default: "graphic" },

    projectName: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "", trim: true },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },

    headline: {
      enabled: { type: Boolean, default: true },
      text: { type: String, default: "", trim: true },
      image: { type: CloudImageSchema, default: null }, // Cloudinary
    },

    body: {
      enabled: { type: Boolean, default: true },
      text: { type: String, default: "", trim: true },
    },

    // Cloudinary images (MIN 16, MAX 50)
    otherImages: {
      type: [CloudImageSchema],
      required: true,
      validate: {
        validator(arr) {
          return Array.isArray(arr) && arr.length >= 16 && arr.length <= 50;
        },
        message: "Other images must be between 16 and 50.",
      },
    },

    // convenience for listing cards (optional)
    mainImage: { type: String, default: null },
  },
  { timestamps: true },
);

GraphicProjectSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("GraphicProject", GraphicProjectSchema);
