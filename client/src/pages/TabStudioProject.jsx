// src/pages/TabStudioProject.jsx
// Hardcoded Tab Studio brand identity project page.
// Data sourced from: GET /api/projects/slug/tabstudio (2025-12-31)
// No API calls — all content is inlined below as constants.

import ProjectDetailsHero from "../components/ProjectPage/ProjectDetailsHero";
import MainImg from "../components/ProjectPage/MainImg";
import ProjectWriteUp from "../components/ProjectPage/ProjectWriteUp";
import ProjectImg from "../components/ProjectPage/ProjectImg";
import ProjectConc from "../components/ProjectPage/ProjectConc";
import DiscoverImg from "../components/ProjectPage/DiscoverImg";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

import TS3 from "../assets/TabStudio/TS_3.jpg";
import TS5 from "../assets/TabStudio/TS_5.jpg";
import TS6 from "../assets/TabStudio/TS_6.jpg";
import TS7 from "../assets/TabStudio/TS_7.jpg";

/* ─────────────────────────────────────────
   ALL TAB STUDIO DATA — hardcoded from DB
   ───────────────────────────────────────── */
const PROJECT = {
  name: "Tabstudio",
  slug: "tabstudio",
  clientName: "Tabstudio",

  // Description is used as intro text in the hero
  description:
    "Tabstudio is a creative-forward company serving startups, creators, media teams, and tech brands. The goal was to establish a modern, scalable identity system that communicated clarity, creative versatility, and a strong digital presence. My responsibility was to design the brand identity, develop the logo system, and produce a concise guideline that outlined its usage.",

  tags: ["Brand Identity", "Brand Guideline", "Logo Design"],
  categories: ["Brand Identity Design", "Graphic Design"],

  heroMeta: {
    categories: ["Brand Identity Design", "Graphic Design"],
    deliverables: "Brand Guideline, Logo design, Typography, Colour Palette",
    timeline: "2 Weeks",
    teamInitials: [],
  },

  caseStudySteps: [
    {
      id: "discover",
      pillLabel: "Discover",
      title: "Understanding the Problem",
      body: "Tabstudio needed a visual identity that not only looked modern but also reflected the core of what they do — bringing clarity, structure, and creativity to their clients' work. The previous design direction lacked cohesion and visual meaning, so my first task was to define the brand's essence and identify visual territories that aligned with their industry and audience.",
      showOnMain: true,
    },
    {
      id: "ideate",
      pillLabel: "Ideate",
      title: "Exploring Concepts",
      body: "The logo design stage was the most demanding part of the project. I explored multiple directions — geometric, fluid, symbol-based, typographic — pushing through numerous iterations to find a mark that felt intuitive and distinct. The challenge was striking a balance between simplicity, symbolism, and recognizability. After refining several rounds, we arrived at a mark that captured the brand's identity with precision.",
      showOnMain: true,
    },
    {
      id: "design",
      pillLabel: "Design",
      title: "Bringing the Concept to Life",
      body: "With the final mark selected, I expanded the identity into a visual system:\n\n1. A color palette that blends digital vibrance with professional depth\n2. Typography choices that are modern, readable, and expressive\n3. Layout and spacing rules that create a balanced visual rhythm\n4. Practical mockups to show real-world usage across startup, creative, and tech environments\n\nThis stage ensured consistency and adaptability across different touchpoints.",
      showOnMain: true,
    },
    {
      id: "test",
      pillLabel: "Test & Refine",
      title: "Perfecting the Details",
      body: "I proceeded to build a concise brand guideline, outlining logo construction, spacing rules, color applications, text pairing, and usage examples. Though intentionally minimal, the document provides a clear blueprint for consistent brand expression across media.",
      showOnMain: true,
    },
  ],

  conclusionTitle: "Conclusion",
  conclusionBody:
    "Tabstudio now has a distinctive and scalable identity system that communicates clarity, creativity, and digital readiness. The project strengthened my belief in iterative exploration — especially during logo development — and reinforced the value of creating visual systems that remain flexible, timeless, and easy for teams to adopt.",
  conclusionCtaLabel: "",
  conclusionCtaUrl: "",

  images: {
    main: "https://res.cloudinary.com/dirgfivvb/image/upload/v1766781727/richard_portfolio/projects/rxcqzs0yzmbrgmgrltry.jpg",
    mid: "https://res.cloudinary.com/dirgfivvb/image/upload/v1766611940/richard_portfolio/projects/lgjx0g6se5udagmf9tfg.jpg",
    conclusion:
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766611992/richard_portfolio/projects/hngltwoazydjyddi5hfd.jpg",
    inline:
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766611971/richard_portfolio/projects/tjxot9n9ztverrzqeqyf.jpg",
    gallery: [
      TS3, // ID lanyards
      TS5, // wristbands stacked
      TS6, // wristbands spread
      TS7, // window poster
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766612075/richard_portfolio/projects/cwx8feyuqhcnyddheor9.jpg", // notepad
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766611989/richard_portfolio/projects/itkfel4pxdumg9zk9fko.jpg", // stationery
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1766612029/richard_portfolio/projects/hzoucamsukiizjwprhnj.jpg", // business card (top of stack)
    ],
  },

  galleryImages: [
    TS3,
    TS5,
    TS6,
    TS7,
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766612075/richard_portfolio/projects/cwx8feyuqhcnyddheor9.jpg", // notepad
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766611989/richard_portfolio/projects/itkfel4pxdumg9zk9fko.jpg", // stationery
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766612029/richard_portfolio/projects/hzoucamsukiizjwprhnj.jpg", // business card (top of stack)
  ],

  // Used by ProjectWriteUp as the case-study sidebar image
  caseStudyImage:
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1766611971/richard_portfolio/projects/tjxot9n9ztverrzqeqyf.jpg",

  showOnProjectsPage: true,
  showInWorkExperience: true,
};

/* ─────────────────────────────────────────
   PAGE COMPONENT
   ───────────────────────────────────────── */
const TabStudioProject = () => (
  <div className="text-white bg-[#050505]">
    <PageMeta
      title="Tabstudio — Brand Identity"
      description="Brand identity case study for Tabstudio — a modern, scalable identity system designed for a creative-forward company serving startups, creators, and tech brands."
      url="/projects/tabstudio"
    />
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

export default TabStudioProject;
