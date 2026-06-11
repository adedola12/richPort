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
   i.e. invoice 000-004 continues the existing manual sequence).
   Two classic operations instead of a pipeline update so it works on
   any MongoDB version: ensure the doc exists with the seed, then $inc. */
export async function nextSequence(name, seed = 0) {
  await Counter.updateOne(
    { _id: name },
    { $setOnInsert: { seq: seed } },
    { upsert: true }
  );
  const doc = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true }
  );
  return doc.seq;
}

export default Counter;
