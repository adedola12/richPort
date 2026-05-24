// src/pages/VerdeLuxeProject.jsx
// Hardcoded Verde Luxe brand identity project page.
// Data sourced from: GET /api/projects/slug/verde-luxe (2026-05-24)
// No API calls — all content is inlined below as constants.

import ProjectDetailsHero from "../components/ProjectPage/ProjectDetailsHero";
import MainImg from "../components/ProjectPage/MainImg";
import ProjectWriteUp from "../components/ProjectPage/ProjectWriteUp";
import ProjectImg from "../components/ProjectPage/ProjectImg";
import ProjectConc from "../components/ProjectPage/ProjectConc";
import DiscoverImg from "../components/ProjectPage/DiscoverImg";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";

/* ─────────────────────────────────────────
   ALL VERDE LUXE DATA — hardcoded from DB
   ───────────────────────────────────────── */
const PROJECT = {
  name: "Verde Luxe",
  slug: "verde-luxe",
  clientName: "Verde Luxe",

  description:
    "Verde Luxe is a premier interior design brand dedicated to transforming spaces into timeless works of art. Specializing in high-quality décor pieces—from chandeliers to furniture and frames — the brand embodies sophistication, elegance, and craftsmanship.",

  tags: ["Brand Identity", "Brand Guideline", "Logo Design"],
  categories: ["Brand Identity Design", "Graphic Design"],

  heroMeta: {
    categories: ["Brand Identity", "Brand Guideline", "Logo Design"],
    deliverables:
      "Brand Guideline, Logo Design, Brand Identity, Social Media Designs, Logo Files",
    timeline: "2 Weeks",
    teamInitials: ["RE"],
  },

  caseStudySteps: [
    {
      id: "discover",
      pillLabel: "Discover",
      title: "Understanding the Problem",
      body: "The project began with an in-depth exploration of Verde Luxe's purpose — to redefine interior spaces through artistry and innovation. I analyzed competitors in the interior design and luxury décor industry to identify visual gaps and tone opportunities.\n\nThe research highlighted a shared visual language of minimal luxury, which informed our decision to build a brand rooted in structure, warmth, and timeless appeal.",
      showOnMain: true,
    },
    {
      id: "ideate",
      pillLabel: "Ideate",
      title: "Exploring Concepts",
      body: "Guided by the meaning of “Verde” (green — symbolizing growth, balance, and renewal), I explored several logo directions that captured the relationship between space and transformation.\n\nThrough iterative sketching and exploration, the concept evolved around a structured “V” form — symbolizing stability, sophistication, and creative precision — enclosed within a geometric block representing interior space.",
      showOnMain: true,
    },
    {
      id: "design",
      pillLabel: "Design",
      title: "Bringing Concepts to Life",
      body: "The finalized logo embodies the essence of refined transformation:\n\n1. The bold “V” represents Verde Luxe’s strong presence and quality craftsmanship.\n2. The diamond-like sparkle symbolizes brilliance and elevation.\n3. The open frame around the logo suggests a doorway — an invitation to a world of aesthetic possibilities.\n\nA harmonious color palette of deep greens, warm neutrals, and beige tones communicates natural elegance and timeless luxury, while Avenir was chosen as the primary typeface for its clean geometry and modern sophistication. The system was extended into vertical and horizontal logo variants, secondary marks, and adaptable color applications for diverse contexts.",
      showOnMain: true,
    },
    {
      id: "test",
      pillLabel: "Test & Refine",
      title: "Perfecting the Details",
      body: "The identity was tested across mockups, digital platforms, and printed materials to ensure legibility, scalability, and balance. Subtle refinements were made to improve contrast, spacing, and logo adaptability. The result was a visual system that maintained its integrity across all brand assets — from digital headers to merchandise.",
      showOnMain: true,
    },
  ],

  conclusionTitle: "Conclusion",
  conclusionBody:
    "The outcome was a cohesive and flexible brand identity that elevates Verde Luxe’s presence in the luxury interior market.\nThe new identity:\n\n1. Reinforces the brand’s position as a modern luxury design house.\n2. Creates a consistent and elegant visual experience across all mediums.\n3. Provides a scalable design system to support future growth and brand extensions.\n\nVerde Luxe now stands as a symbol of refined artistry — transforming ordinary spaces into statements of beauty and sophistication.",
  conclusionCtaLabel: "",
  conclusionCtaUrl: "",

  images: {
    main: "https://res.cloudinary.com/dirgfivvb/image/upload/v1765189093/richard_portfolio/projects/g3oflwwou15dggnbdjy7.jpg",
    mid: "https://res.cloudinary.com/dirgfivvb/image/upload/v1765189155/richard_portfolio/projects/urskxtdjuw1jknd0d3ya.jpg",
    conclusion:
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1765189191/richard_portfolio/projects/ddbkurx5hwjfrpf3rnel.jpg",
    inline:
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1765189205/richard_portfolio/projects/f65gd5hxwtp2lrfqdbkd.jpg",
    gallery: [
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766609736/richard_portfolio/projects/t5vgwftveeaustvmtqou.jpg",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1765189253/richard_portfolio/projects/ezwtqmq5tvtemjqrdwoe.jpg",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766609794/richard_portfolio/projects/wzc2ehhlqsyyoeksgapl.jpg",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1765189242/richard_portfolio/projects/gzs6clfrloysrouxjvaa.jpg",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766609794/richard_portfolio/projects/pgh9xajdjehq8ttb6i4x.jpg",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766609793/richard_portfolio/projects/huhqjmksqfyhjijfzcwc.jpg",
    ],
  },

  galleryImages: [
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766609736/richard_portfolio/projects/t5vgwftveeaustvmtqou.jpg",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1765189253/richard_portfolio/projects/ezwtqmq5tvtemjqrdwoe.jpg",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766609794/richard_portfolio/projects/wzc2ehhlqsyyoeksgapl.jpg",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1765189242/richard_portfolio/projects/gzs6clfrloysrouxjvaa.jpg",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766609794/richard_portfolio/projects/pgh9xajdjehq8ttb6i4x.jpg",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766609793/richard_portfolio/projects/huhqjmksqfyhjijfzcwc.jpg",
  ],

  caseStudyImage:
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1765189205/richard_portfolio/projects/f65gd5hxwtp2lrfqdbkd.jpg",

  showOnProjectsPage: true,
  showInWorkExperience: false,
};

/* ─────────────────────────────────────────
   PAGE COMPONENT
   ───────────────────────────────────────── */
const VerdeLuxeProject = () => (
  <div className="text-white bg-[#050505]">
    <ProjectDetailsHero project={PROJECT} />
    <MainImg project={PROJECT} />
    <ProjectWriteUp project={PROJECT} />
    <ProjectImg project={PROJECT} />
    <ProjectConc project={PROJECT} />
    <DiscoverImg project={PROJECT} />
    <OtherProj currentSlug={PROJECT.slug} currentKind="default" />
    <BuildSection />
  </div>
);

export default VerdeLuxeProject;
