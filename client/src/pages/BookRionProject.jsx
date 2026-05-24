// src/pages/BookRionProject.jsx
// Hardcoded Book Rion brand identity project page.
// Data sourced from: GET /api/projects/slug/book-rion (2026-05-24)
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
   ALL BOOK RION DATA — hardcoded from DB
   ───────────────────────────────────────── */
const PROJECT = {
  name: "Book Rion",
  slug: "book-rion",
  clientName: "Book Rion",

  description:
    "BookRion is redefining how books reach readers. The platform connects readers directly with verified bookstores and publishers, ensuring that quality literature remains accessible, affordable, and sustainable. Our vision is to build a world where getting the books you love is effortless — by creating a reliable, innovative, and inclusive book distribution network that sets a new standard in the publishing industry.\n\nI joined the project as a Creative Designer while the platform was already in development. At the time, BookRion lacked a cohesive visual direction and clear brand identity. My primary responsibility was to establish these foundations — setting visual guidelines, designing the logo, choosing colors and typography, and crafting a consistent identity system that would unify all design touchpoints.",

  tags: ["Brand Guidelines", "Design"],
  categories: ["Brand Identity", "UI/UX Design", "Graphic Design", "Website Design"],

  heroMeta: {
    categories: ["Brand Identity", "UI/UX Design", "Graphic Design", "Website Design"],
    deliverables:
      "Art Direction, User Interface, Branding Strategy, Print Design, 3D Render",
    timeline: "4 weeks",
    teamInitials: ["AD", "DA", "RE"],
  },

  caseStudySteps: [
    {
      id: "discover",
      pillLabel: "Discover",
      title: "Understanding the Problem",
      body: "When I joined the team, it became clear that while the product concept was strong, its visual identity wasn't reflecting its mission.\n\nI began by studying the brand's purpose, target audience, and industry landscape to identify what was missing and define a direction that could express BookRion's personality and vision.",
      showOnMain: true,
    },
    {
      id: "ideate",
      pillLabel: "Ideate",
      title: "Exploring Concepts",
      body: "I started sketching and exploring multiple logo ideas and visual systems. I collaborated closely with the team, sharing concepts and collecting feedback through iterative discussions.\n\nThese sessions helped refine our direction and emphasized that constructive critique is key to building stronger creative outcomes.",
      showOnMain: true,
    },
    {
      id: "design",
      pillLabel: "Design",
      title: "Bringing the Concept to Life",
      body: "With the approved concept in place, I developed the full visual system — logo, color palette, typography, and brand applications.\n\nThe design aimed to balance modernity and accessibility while representing trust and innovation. I also built scalable brand guidelines to maintain visual consistency across print and digital environments.",
      showOnMain: true,
    },
    {
      id: "test",
      pillLabel: "Test & Refine",
      title: "Perfecting the Details",
      body: "After rendering the final idea, I refined the design across various touchpoints. Applying the new identity to the digital product and marketing materials brought everything together — improving usability, user appeal, and brand recognition.\n\nEach iteration made the visual experience more coherent and engaging.",
      showOnMain: true,
    },
  ],

  conclusionTitle: "Conclusion",
  conclusionBody:
    "The new identity gave BookRion a clear voice and visual presence, setting the tone for future product design and communication. It transformed internal alignment, simplified creative decisions, and laid the groundwork for a consistent user experience.\n\nThe system now serves as a visual foundation for the team's ongoing development of BookRion's digital platform and marketing assets.",
  conclusionCtaLabel: "",
  conclusionCtaUrl: "",

  images: {
    main: "https://res.cloudinary.com/dirgfivvb/image/upload/v1765013977/richard_portfolio/projects/luvpzo1majgrdmmnogpt.jpg",
    mid: "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014005/richard_portfolio/projects/bz1hyughkemv4fzf7q43.png",
    conclusion:
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014019/richard_portfolio/projects/l3e1tkfroozvewb8spus.jpg",
    inline:
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014022/richard_portfolio/projects/ff4d6knp7tlxqbbndzyo.jpg",
    gallery: [
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014057/richard_portfolio/projects/g2nqujm7fkslrqnxgi65.jpg",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014060/richard_portfolio/projects/cmwaeuntblbueqbyealk.jpg",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014082/richard_portfolio/projects/xowqpmkz1o8dcjkzlngw.jpg",
      "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014072/richard_portfolio/projects/smbwgfwvdovpcvbaobva.jpg",
    ],
  },

  galleryImages: [
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014057/richard_portfolio/projects/g2nqujm7fkslrqnxgi65.jpg",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014060/richard_portfolio/projects/cmwaeuntblbueqbyealk.jpg",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014082/richard_portfolio/projects/xowqpmkz1o8dcjkzlngw.jpg",
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014072/richard_portfolio/projects/smbwgfwvdovpcvbaobva.jpg",
  ],

  caseStudyImage:
    "https://res.cloudinary.com/dirgfivvb/image/upload/v1765014022/richard_portfolio/projects/ff4d6knp7tlxqbbndzyo.jpg",

  showOnProjectsPage: true,
  showInWorkExperience: true,
};

/* ─────────────────────────────────────────
   PAGE COMPONENT
   ───────────────────────────────────────── */
const BookRionProject = () => (
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

export default BookRionProject;
