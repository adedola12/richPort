// models/UIProjectModel.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const ImageSetSchema = new Schema(
  {
    hero: { type: String, default: null },
    strategy: { type: String, default: null },
    feature: { type: String, default: null },
    flow: { type: String, default: null },
    main: { type: String, default: null },
    gallery: { type: [String], default: [] },
  },
  { _id: false },
);

const PersonaCardSchema = new Schema(
  {
    id: { type: String, default: "" },
    enabled: { type: Boolean, default: true },
    name: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    about: { type: String, default: "" },
    img: { type: String, default: "" },
    pos: { type: String, default: "" },
  },
  { _id: false },
);

const UIWriteUpVisibilitySchema = new Schema(
  {
    overview: { type: Boolean, default: true },
    problem: { type: Boolean, default: true },
    idealUsers: { type: Boolean, default: true },
    research: { type: Boolean, default: true },
    strategy: { type: Boolean, default: true },
    features: { type: Boolean, default: true },
    userFlows: { type: Boolean, default: true },
    testing: { type: Boolean, default: true },
    impact: { type: Boolean, default: true },
    learnings: { type: Boolean, default: true },
  },
  { _id: false },
);

const UIWriteUpBlockSchema = new Schema(
  {
    id: { type: String, default: "" },
    enabled: { type: Boolean, default: true },

    // ✅ NEW: independent sub-toggles
    headlineEnabled: { type: Boolean, default: true },
    bodyEnabled: { type: Boolean, default: true },
    imagesEnabled: { type: Boolean, default: true },

    // ✅ NEW: where this block should render relative to Personas
    placement: {
      type: String,
      enum: ["beforePersonas", "afterPersonas"],
      default: "beforePersonas",
    },

    headline: { type: String, default: "" },
    body: { type: String, default: "" },

    images: { type: [String], default: [] },

    layout: {
      type: String,
      enum: ["wide", "half", "grid"],
      default: "wide",
    },

    textSide: {
      type: String,
      enum: ["left", "right"],
      default: "left",
    },

    wideVariant: {
      type: String,
      enum: ["full", "narrow"],
      default: "full",
    },
  },
  { _id: false },
);

const UIWriteUpSchema = new Schema(
  {
    blocks: { type: [UIWriteUpBlockSchema], default: [] },

    visibility: { type: UIWriteUpVisibilitySchema, default: () => ({}) },

    idealUsers: {
      cards: { type: [PersonaCardSchema], default: [] },

      intro: { type: [String], default: [] },
      primaryUserTypesIntro: { type: String, default: "" },
      primaryUserTypes: { type: [String], default: [] },
      challengesIntro: { type: String, default: "" },
      challenges: { type: [String], default: [] },
    },

    overview: { type: [String], default: [] },
    problem: {
      intro: { type: [String], default: [] },
      bullets: { type: [String], default: [] },
      outro: { type: [String], default: [] },
    },
    research: {
      intro: { type: [String], default: [] },
      bullets: { type: [String], default: [] },
    },
    strategy: {
      intro: { type: [String], default: [] },
      decisions: { type: [String], default: [] },
    },
    features: {
      title: { type: String, default: "Key Features & Design Decisions" },
      items: {
        type: [
          new Schema(
            {
              title: { type: String, required: true },
              bullets: { type: [String], default: [] },
              designDecision: { type: String, default: "" },
            },
            { _id: false },
          ),
        ],
        default: [],
      },
    },
    userFlows: {
      intro: { type: String, default: "" },
      bullets: { type: [String], default: [] },
      outro: { type: String, default: "" },
    },
    testing: {
      focusedOnIntro: { type: String, default: "" },
      focusedOn: { type: [String], default: [] },
      improvedIntro: { type: String, default: "" },
      improved: { type: [String], default: [] },
    },
    impact: {
      intro: { type: String, default: "" },
      metrics: { type: [String], default: [] },
    },
    learnings: {
      intro: { type: String, default: "" },
      bullets: { type: [String], default: [] },
      outro: { type: String, default: "" },
    },
  },
  { _id: false },
);

const UIHeroSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    dateLabel: { type: String, default: "" },

    roleTitle: { type: String, default: "" },
    roleDescription: { type: String, default: "" },
    roleBullets: { type: [String], default: [] },

    timelineLabel: { type: String, default: "" },
  },
  { _id: false },
);

const WorkExperienceMetaSchema = new Schema(
  {
    clientName: { type: String, default: "" },
    myRole: { type: String, default: "" },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
  },
  { _id: false },
);

const UIProjectSchema = new Schema(
  {
    projectType: { type: String, default: "uiux", enum: ["uiux"] },

    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    isDefault: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true,
    },

    hero: { type: UIHeroSchema, required: true },
    writeUp: { type: UIWriteUpSchema, default: () => ({}) },

    images: { type: ImageSetSchema, default: () => ({}) },

    mainImage: { type: String, default: null },

    showInWorkExperience: { type: Boolean, default: false },
    workExperience: { type: [String], default: [] },
    workExperienceMeta: { type: WorkExperienceMetaSchema, default: () => ({}) },
  },
  { timestamps: true },
);

UIProjectSchema.index({ createdAt: -1 });
UIProjectSchema.index({ status: 1, createdAt: -1 });
UIProjectSchema.index({ isDefault: 1 });

export default mongoose.model("UIProject", UIProjectSchema);
