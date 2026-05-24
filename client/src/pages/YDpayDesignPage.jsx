// src/pages/YDpayDesignPage.jsx
// YDpay Social Media Designs — local assets, no API calls.

import React from "react";
import GraphicHero from "../components/GraphicDesignPage/GraphicHero";
import GraphicOverview from "../components/GraphicDesignPage/GraphicOverview";
import GraphicGallery from "../components/GraphicDesignPage/GraphicGallery";
import BuildSection from "../components/Home/BuildSection";
import OtherProj from "../components/ProjectPage/OtherProj";

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

const YDPAY_ASSETS = import.meta.glob(
  "../assets/YDpayDesigns/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);

const GALLERY = Object.entries(YDPAY_ASSETS).map(([path, src], idx) => ({
  id: `ydpay-${idx}`,
  src,
}));

const DATA = {
  backLabel: "Back to Portfolio",
  titleTop: "YDpay Social Media",
  titleBottom: "Designs",
  subtitle:
    "Brand-consistent social media graphics, card designs, and campaign visuals crafted for YDpay — a modern digital payment platform.",
  heroBg: HeroBg || "",
  heroBgTweak: HERO_BG_TWEAK,
  overviewTitle: "Overview",
  overviewText: [
    "YDpay is a digital payment platform operating at the intersection of fintech and everyday commerce. This collection covers the full breadth of their social media design output — from promotional campaign banners and card design mockups to seasonal greetings and community-building posts.",
    "Every design was created to align with YDpay's brand identity: bold, trustworthy, and forward-looking. The work balances high-energy campaign aesthetics with clear financial messaging, ensuring visual consistency across all digital touchpoints while driving user engagement and product awareness.",
  ],
  overviewImage: OverviewImg || "",
  gallery: GALLERY,
  slug: "ydpay-designs",
  _id: "ydpay-designs",
};

export default function YDpayDesignPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-white overflow-x-hidden">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,#4ade80_0,transparent_65%)] opacity-[0.16] blur-3xl" />
      <div className="pointer-events-none absolute -right-44 top-[18%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,#22c55e_0,transparent_70%)] opacity-[0.12] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_55%)]" />
      <main className="relative z-10">
        <GraphicHero data={DATA} />
        <GraphicOverview data={DATA} />
        <GraphicGallery items={DATA.gallery} />
        <OtherProj currentSlug={DATA.slug} currentKind="gallary" />
        <BuildSection />
      </main>
    </div>
  );
}
