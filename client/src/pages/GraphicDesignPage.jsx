// src/pages/GraphicDesignPage.jsx
// Flyers & Social Media Designs — local assets, no API calls.

import React from "react";
import GraphicHero from "../components/GraphicDesignPage/GraphicHero";
import GraphicOverview from "../components/GraphicDesignPage/GraphicOverview";
import GraphicGallery from "../components/GraphicDesignPage/GraphicGallery";
import BuildSection from "../components/Home/BuildSection";
import OtherProj from "../components/ProjectPage/OtherProj";
import PageMeta from "../components/common/PageMeta";

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

/* ── gallery: a randomised mix of graphic work — flyers, social campaigns,
   carousels and product/card mockups — pulled from every graphic collection so
   the page reads as a varied body of work, not one folder in a fixed order. ── */
const GALLERY_ASSETS = {
  ...import.meta.glob("../assets/FlyerSamples/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  ...import.meta.glob("../assets/ADLMStudio/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  ...import.meta.glob("../assets/Whitespace/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  ...import.meta.glob("../assets/YDpayDesigns/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
};

// Fisher–Yates shuffle (runs once at load → random per visit, stable per session)
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildGallery() {
  const all = Object.entries(GALLERY_ASSETS).map(([path, src], idx) => ({
    id: `gfx-${idx}`,
    src,
  }));
  return shuffle(all).slice(0, 48);
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
      <PageMeta
        title="Graphic Design"
        description="Graphic design work by Richard Enoch — flyers, social media designs, and visual campaigns crafted for brands that want to be seen."
        url="/graphic-design"
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
