// models/ProjectModel.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

// --- Sub-schemas ---

const HeroMetaSchema = new Schema(
  {
    // Categories shown in the hero details row
    categories: {
      type: [String],
      default: [],
    },
    // "Art Direction, UI, Branding..." (single string as in the payload)
    deliverables: {
      type: String,
      default: "",
      trim: true,
    },
    // e.g. "4 weeks"
    timeline: {
      type: String,
      default: "",
      trim: true,
    },
    // "AQ, JS, MK..." → ["AQ","JS","MK"]
    teamInitials: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const CaseStudyStepSchema = new Schema(
  {
    // e.g. "discover", "ideate", "design", "test"
    id: {
      type: String,
      trim: true,
    },
    // e.g. "Discover", "Ideate"
    pillLabel: {
      type: String,
      trim: true,
    },
    // Heading for the step
    title: {
      type: String,
      trim: true,
    },
    // Body text (can contain line breaks)
    body: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const ImagesSchema = new Schema(
  {
    // Main hero image
    main: {
      type: String,
      default: null,
      trim: true,
    },
    // Mid-section image
    mid: {
      type: String,
      default: null,
      trim: true,
    },
    // Conclusion section image
    conclusion: {
      type: String,
      default: null,
      trim: true,
    },
    // In-text / process image
    inline: {
      type: String,
      default: null,
      trim: true,
    },
    // Gallery images used in DiscoverImg
    gallery: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

// --- Main Project schema ---

const ProjectSchema = new Schema(
  {
    // Basic meta
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    url: {
      type: String,
      default: null,
      trim: true,
    },
    // "shortDescription" in the form
    description: {
      type: String,
      default: "",
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },
    categories: {
      type: [String],
      default: [],
    },

    // Hero / details section
    clientName: {
      type: String,
      default: "",
      trim: true,
    },
    heroMeta: {
      type: HeroMetaSchema,
      default: () => ({}),
    },

    // Process steps (Discover / Ideate / Design / Test)
    caseStudySteps: {
      type: [CaseStudyStepSchema],
      default: [],
    },
    caseStudyNotes: {
      type: String,
      default: "",
      trim: true,
    },

    // Conclusion section
    conclusionTitle: {
      type: String,
      default: "",
      trim: true,
    },
    conclusionBody: {
      type: String,
      default: "",
      trim: true,
    },
    conclusionCtaLabel: {
      type: String,
      default: "",
      trim: true,
    },
    conclusionCtaUrl: {
      type: String,
      default: "",
      trim: true,
    },

    // Images (main/mid/conclusion/inline + gallery)
    images: {
      type: ImagesSchema,
      default: () => ({}),
    },

    // Backward-compatibility fields used by the frontend:
    // - Admin form sets these from the same values in `images` and gallery.
    pageImg: {
      type: String,
      default: null,
      trim: true,
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    // Used as the process/phone image in ProjectWriteUp
    caseStudyImage: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: clean JSON output (id instead of _id, hide __v)
ProjectSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
