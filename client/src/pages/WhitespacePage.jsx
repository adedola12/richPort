// src/pages/WhitespacePage.jsx
// Whitespace Social Media Designs — local assets, no API calls.

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

const WS_ASSETS = import.meta.glob(
  "../assets/Whitespace/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);

const GALLERY = Object.entries(WS_ASSETS).map(([path, src], idx) => ({
  id: `ws-${idx}`,
  src,
}));

const DATA = {
  backLabel: "Back to Portfolio",
  titleTop: "Whitespace Social Media",
  titleBottom: "Designs",
  subtitle:
    "Educational carousels, event graphics, and brand content designed for Whitespace — a creative community built around design thinking and visual storytelling.",
  heroBg: HeroBg || "",
  heroBgTweak: HERO_BG_TWEAK,
  overviewTitle: "Overview",
  overviewText: [
    "Whitespace is a creative platform dedicated to design education and community. This collection brings together the full scope of their visual content — from branded educational carousel slides and colour theory series to event promotion graphics and speaker quote cards.",
    "The design approach for Whitespace leans into clean layouts, structured typography, and purposeful use of negative space — reflecting the brand's own philosophy. Every slide and graphic was crafted to be informative yet visually compelling, encouraging engagement and shareability across social platforms.",
  ],
  overviewImage: OverviewImg || "",
  gallery: GALLERY,
  slug: "whitespace-designs",
  _id: "whitespace-designs",
};

export default function WhitespacePage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-white overflow-x-hidden">
      <PageMeta
        title="Whitespace Designs"
        description="Graphic and visual design work by Richard Enoch for Whitespace — clean, intentional design that lets ideas breathe."
        url="/whitespace-designs"
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
