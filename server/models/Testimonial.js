// server/models/Testimonial.js
import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    // Optional display name; initials are always required so anonymous
    // feedback still renders an avatar.
    name: { type: String, trim: true, maxlength: 80, default: "" },
    initials: { type: String, required: true, trim: true, uppercase: true, maxlength: 4 },
    service: { type: String, required: true, trim: true, maxlength: 60 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String, required: true, trim: true, maxlength: 1200 },
    // Admin kill-switch. Ratings >= 4 are publicly visible unless hidden.
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

TestimonialSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.mongoId = ret._id;
    delete ret._id;
    return ret;
  },
});

export default mongoose.model("Testimonial", TestimonialSchema);
