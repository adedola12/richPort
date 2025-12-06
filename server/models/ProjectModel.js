// models/Project.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// --- Sub-schemas ---

const HeroMetaSchema = new Schema(
  {
    categories: { type: [String], default: [] },
    deliverables: { type: String, default: "", trim: true },
    timeline: { type: String, default: "", trim: true },
    teamInitials: { type: [String], default: [] },
  },
  { _id: false }
);

const CaseStudyStepSchema = new Schema(
  {
    id: { type: String, trim: true },
    pillLabel: { type: String, trim: true },
    title: { type: String, trim: true },
    body: { type: String, trim: true },
  },
  { _id: false }
);

const ImagesSchema = new Schema(
  {
    main: { type: String, default: null, trim: true },
    mid: { type: String, default: null, trim: true },
    conclusion: { type: String, default: null, trim: true },
    inline: { type: String, default: null, trim: true },
    gallery: { type: [String], default: [] },
  },
  { _id: false }
);

// --- Main Project schema ---

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    url: { type: String, default: null, trim: true },

    description: { type: String, default: "", trim: true },

    tags: { type: [String], default: [] },
    categories: { type: [String], default: [] },

    clientName: { type: String, default: "", trim: true },
    heroMeta: { type: HeroMetaSchema, default: () => ({}) },

    caseStudySteps: { type: [CaseStudyStepSchema], default: [] },
    caseStudyNotes: { type: String, default: "", trim: true },

    conclusionTitle: { type: String, default: "", trim: true },
    conclusionBody: { type: String, default: "", trim: true },
    conclusionCtaLabel: { type: String, default: "", trim: true },
    conclusionCtaUrl: { type: String, default: "", trim: true },

    images: { type: ImagesSchema, default: () => ({}) },

    // Backward-compatibility fields
    pageImg: { type: String, default: null, trim: true },
    galleryImages: { type: [String], default: [] },
    caseStudyImage: { type: String, default: null, trim: true },
  },
  { timestamps: true }
);

// nice JSON output
ProjectSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
