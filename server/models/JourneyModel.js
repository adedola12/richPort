// models/JourneyModel.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

const JourneySchema = new Schema(
  {
    // e.g. "2024"
    year: {
      type: String,
      required: true,
      trim: true,
    },

    // Short title for the timeline entry
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Frontend sends description as an array of paragraphs (one per line)
    description: {
      type: [String],
      default: [],
    },

    // Optional image for the entry
    imageUrl: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Make JSON shape nicer: use "id" instead of "_id"
JourneySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const JourneyModel = mongoose.model("Journey", JourneySchema);

module.exports = JourneyModel;
