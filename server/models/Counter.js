import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // counter name, e.g. "invoice"
    seq: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema, "counters");

/* Atomically issue the next sequence number. `seed` is the value the
   counter starts from when it doesn't exist yet, so the first number
   issued is seed + 1 (invoice counter seeds at 3 → first issued is 4,
   i.e. invoice 000-004 continues the existing manual sequence). */
export async function nextSequence(name, seed = 0) {
  const doc = await Counter.findOneAndUpdate(
    { _id: name },
    [{ $set: { seq: { $add: [{ $ifNull: ["$seq", seed] }, 1] } } }],
    { upsert: true, new: true }
  );
  return doc.seq;
}

export default Counter;
