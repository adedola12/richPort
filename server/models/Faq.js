// server/models/Faq.js
import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true, maxlength: 200 },
    answer: { type: String, required: true, trim: true, maxlength: 2000 },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

FaqSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.mongoId = ret._id;
    delete ret._id;
    return ret;
  },
});

export default mongoose.model("Faq", FaqSchema);
