// src/pages/CleansteadProject.jsx
// Hardcoded Cleanstead brand identity project page.
// Data sourced from: GET /api/projects/slug/cleanstead (2026-05-24)
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
   ALL CLEANSTEAD DATA — hardcoded from DB
   ───────────────────────────────────────── */
const PROJECT = {
  name: "Cleanstead",
  slug: "cleanstead",
  clientName: "Cleanstead",

  description:
    "Cleanstead is a professional cleaning and janitorial service dedicated to helping people reclaim their time and peace of mind. With a mission to simplify life through excellence, integrity, and respect, Cleanstead provides spotless results for homes, offices, and events. The brand stands as a reflection of trust, professionalism, and care — built for people who value both cleanliness and the calm that comes with it.\n\nThe project's goal was to establish a strong and consistent brand identity that communicates the company's values across every touchpoint — from digital platforms to physical materials. Cleanstead's commitment to "not cutting corners, but cleaning them" became the guiding principle behind its visual and verbal design language.",

  tags: ["Brand Identity", "Brand Guideline", "Logo Design"],
  categories: ["Brand Identity Design", "Graphic Design"],

  heroMeta: {
    categories: ["Brand Identity Design", "Graphic Design"],
    deliverables: "Art Direction, Brand Assets Design, Detailed Brand Guideline",
    timeline: "4 Weeks",
    teamInitials: ["RE"],
  },

  caseStudySteps: [
    {
      id: "discover",
      pillLabel: "Discover",
      title: "Understanding the Problem",
      body: "We began with deep conversations around the company's vision and the heart behind Cleanstead. The client wanted a brand that would stand out in the cleaning industry — one that represents trust, professionalism, and care, while also feeling approachable.\n\nI studied competitors within and beyond the region to understand what worked and where Cleanstead could differentiate itself. The research revealed that most cleaning brands either looked overly corporate or too casual, leaving space for a brand that felt both refined and relatable.",
      showOnMain: true,
    },
    {
      id: "ideate",
      pillLabel: "Ideate",
      title: "Exploring Concepts",
      body: "From the findings, we defined the brand personality: confident, courteous, and sincere. These became the foundation for exploring visual ideas.\n\nI started with sketches and concepts centered on cleanliness, clarity, and simplicity, experimenting with how subtle visual cues — like sparkles or water droplets — could symbolize purity without being cliché.\n\nWe developed several concepts and refined them together until one stood out: a customized wordmark with rounded corners, paired with sparkle and droplet icons that subtly depict cleanliness and care.",
      showOnMain: true,
    },
    {
      id: "design",
      pillLabel: "Design",
      title: "Bringing the Concept to Life",
      body: "The final identity came together with careful attention to balance and emotion.\n\n1. Logo: A bold yet friendly wordmark created using Mont Bold with slight customizations, representing confidence and warmth.\n2. Color Palette: A deep royal blue for trust and stability, paired with a vibrant carrot orange for energy and optimism, and balanced with white and black neutrals for clarity.\n3. Typography: Mont was chosen as the primary typeface for its geometric precision and contemporary feel, perfectly suited for both print and digital touchpoints.\n4. Patterns: Two visual patterns were developed — one featuring cleaning icons in rhythmic arrangements and another composed of sparkle outlines, adding flexibility and cohesion across materials.\n\nTogether, these elements created a consistent and scalable system, easy to apply to stationery, uniforms, van branding, marketing materials, and the forthcoming website.",
      showOnMain: true,
    },
    {
      id: "test",
      pillLabel: "Test & Refine",
      title: "Perfecting the Details",
      body: "As the identity rolled out across mockups and collateral, we revisited a few applications to ensure readability and visual balance, especially on uniforms and signage.\n\nClient feedback was instrumental — adjustments were made to maintain visibility and color contrast in different contexts, ensuring the brand looked just as strong in print as it did on digital platforms.",
      showOnMain: true,
    },
  ],

  conclusionTitle: "Conclusion",
  conclusionBody:
    "The outcome was a clean, confident, and modern identity that perfectly reflects Cleanstead's promise — excellence, trust, and care in every detail. From the logo and tone of voice to the uniforms and van wraps, every touchpoint now speaks with one consistent voice: "We don't cut corners in your stead — we clean them."\n\nThe new brand identity positioned Cleanstead as a credible, professional, and approachable service provider ready to scale its presence both within Lagos and beyond.",
  conclusionCtaLabel: "",
  conclusionCtaUrl: "",

  images: {
    main: "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782549/richard_portfolio/projects/jnlfujlx4nrdz4jvhlip.png",
    mid: "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782563/richard_portfolio/projects/v2cludu6scj49kg6e76k.png",
    conclusion:
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782530/richard_portfolio/projects/mktj3h6dnzf27ankppno.png",
    inline:
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782542/richard_portfolio/projects/t75tcinaohh7kouy5v6y.png",
    gallery: [
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782545/richard_portfolio/projects/wwabrtofvw98qsaqooep.png",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782559/richard_portfolio/projects/iznwna8njzu5mnmftfep.png",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782563/richard_portfolio/projects/vmbrrnptxqvgqhsizqa3.png",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782642/richard_portfolio/projects/vzorx9yrn35rtkvvgb3h.png",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782606/richard_portfolio/projects/rc1czdpk3q2hp9iciqcu.png",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782693/richard_portfolio/projects/dudkewyvsmlaky8ijhfa.png",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782651/richard_portfolio/projects/aya9hppwggv3pirrhn0p.png",
    ],
  },

  galleryImages: [
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782545/richard_portfolio/projects/wwabrtofvw98qsaqooep.png",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782559/richard_portfolio/projects/iznwna8njzu5mnmftfep.png",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782563/richard_portfolio/projects/vmbrrnptxqvgqhsizqa3.png",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782642/richard_portfolio/projects/vzorx9yrn35rtkvvgb3h.png",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782606/richard_portfolio/projects/rc1czdpk3q2hp9iciqcu.png",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782693/richard_portfolio/projects/dudkewyvsmlaky8ijhfa.png",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782651/richard_portfolio/projects/aya9hppwggv3pirrhn0p.png",
  ],

  caseStudyImage:
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766782542/richard_portfolio/projects/t75tcinaohh7kouy5v6y.png",

  showOnProjectsPage: true,
  showInWorkExperience: true,
};

/* ─────────────────────────────────────────
   PAGE COMPONENT
   ───────────────────────────────────────── */
const CleansteadProject = () => (
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

export default CleansteadProject;
