// src/pages/ADLMStudioPage.jsx
// ADLM Studio Social Media Designs — local assets, no API calls.

import React from "react";
import GraphicHero from "../components/GraphicDesignPage/GraphicHero";
import GraphicOverview from "../components/GraphicDesignPage/GraphicOverview";
import GraphicGallery from "../components/GraphicDesignPage/GraphicGallery";
import BuildSection from "../components/Home/BuildSection";
import OtherProj from "../components/ProjectPage/OtherProj";
import PageMeta from "../components/common/PageMeta";

const GRAPHICS_ASSETS = import.meta.glob(
  "../assets/Graphics/**/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" },
);
function findAsset(name) {
  const hit = Object.entries(GRAPHICS_ASSETS).find(([p]) =>
    p.toLowerCase().endsWith(`/${name}`),
  );
  return hit ? hit[1] : "";
}
const HeroBg = findAsset("heroimg.png");
const OverviewImg = findAsset("overviewimg.png");

const HERO_BG_TWEAK = {
  fit: "cover", scale: 1.0, posX: 58, posY: 22,
  translateX: 0, translateY: 0, opacity: 0.99,
};

const ADLM_ASSETS = import.meta.glob(
  "../assets/ADLMStudio/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);

const GALLERY = Object.entries(ADLM_ASSETS).map(([path, src], idx) => ({
  id: `adlm-${idx}`,
  src,
}));

const DATA = {
  backLabel: "Back to Portfolio",
  titleTop: "ADLM Studio Social Media",
  titleBottom: "Designs",
  subtitle:
    "Strategic social media and promotional designs crafted for ADLM Studio — driving course enrolments, brand awareness, and community engagement.",
  heroBg: HeroBg || "",
  heroBgTweak: HERO_BG_TWEAK,
  overviewTitle: "Overview",
  overviewText: [
    "ADLM Studio is an architecture and design training company offering hands-on courses in BIM, 3D visualisation, and related disciplines. This collection spans the full range of their social media and promotional design needs — from course launch announcements and enrolment deadlines to festive greetings and partnership campaigns.",
    "Each piece was built around ADLM Studio's brand language: structured, professional, and direct. The designs prioritise clear calls to action while maintaining visual consistency across every post, ensuring the brand is instantly recognisable whether on Instagram, WhatsApp, or print.",
  ],
  overviewImage: OverviewImg || "",
  gallery: GALLERY,
  slug: "adlm-studio-designs",
  _id: "adlm-studio-designs",
};

export default function ADLMStudioPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-white overflow-x-hidden">
      <PageMeta
        title="ADLM Studio Designs"
        description="Brand identity and design work by Richard Enoch for ADLM Studio — visual systems built for clarity and creative impact."
        url="/adlm-studio-designs"
      />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,#4ade80_0,transparent_65%)] opacity-[0.16] blur-3xl" />
      <div className="pointer-events-none absolute -right-44 top-[18%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,#22c55e_0,transparent_70%)] opacity-[0.12] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_55%)]" />
      <main className="relative z-10">
        <GraphicHero data={DATA} />
        <GraphicOverview data={DATA} items={DATA.gallery} />
        <GraphicGallery items={DATA.gallery} />
        <OtherProj currentSlug={DATA.slug} currentKind="gallary" />
        <BuildSection />
      </main>
    </div>
  );
}
