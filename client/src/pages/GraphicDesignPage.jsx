// src/pages/GraphicDesignPage.jsx
// Flyers & Social Media Designs — local assets, no API calls.

import React from "react";
import GraphicHero from "../components/GraphicDesignPage/GraphicHero";
import GraphicOverview from "../components/GraphicDesignPage/GraphicOverview";
import GraphicGallery from "../components/GraphicDesignPage/GraphicGallery";
import BuildSection from "../components/Home/BuildSection";
import OtherProj from "../components/ProjectPage/OtherProj";

/* ── hero / overview background ── */
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

/* ── flyer samples gallery ── */
const FLYER_ASSETS = import.meta.glob(
  "../assets/FlyerSamples/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);

// These two always appear first, in this order
const PRIORITY = [
  "happy birthday minister olabisi obayomi",
  "happy birthday pastor tito 1",
];

function buildGallery() {
  return Object.entries(FLYER_ASSETS)
    .map(([path, src], idx) => {
      const name = path.split("/").pop().toLowerCase().replace(/\.[^.]+$/, "");
      const pi = PRIORITY.findIndex((p) => name.includes(p));
      return { id: `flyer-${idx}`, src, pi };
    })
    .sort((a, b) => {
      const ai = a.pi >= 0 ? a.pi : 999;
      const bi = b.pi >= 0 ? b.pi : 999;
      return ai - bi;
    })
    .map(({ id, src }) => ({ id, src }));
}

const DATA = {
  backLabel: "Back to Portfolio",
  titleTop: "Flyers & Social Media",
  titleBottom: "Designs",
  subtitle:
    "Designing high-impact visual systems that drive engagement, clarity, and brand consistency across digital platforms.",
  heroBg: HeroBg || "",
  heroBgTweak: HERO_BG_TWEAK,
  overviewTitle: "Overview",
  overviewText: [
    "This project showcases a collection of flyer and social media designs created for brands seeking strong visual presence and meaningful audience engagement. Each design was crafted with a clear strategic intent — balancing aesthetics with communication goals to ensure the message is not just seen, but understood and acted upon.",
    "Rather than focusing solely on visual appeal, the approach emphasized hierarchy, readability, brand alignment, and conversion-driven layouts. From event promotions to educational campaigns and community activations, every asset was designed to capture attention quickly while maintaining clarity across multiple screen sizes and platforms.",
    "The result is a cohesive body of work that demonstrates versatility, brand sensitivity, and the ability to translate ideas into compelling visual narratives that perform effectively in real-world contexts.",
  ],
  overviewImage: OverviewImg || "",
  gallery: buildGallery(),
  slug: "graphic-design",
  _id: "graphic-design",
};

export default function GraphicDesignPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-white overflow-x-hidden">
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
