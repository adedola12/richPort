// src/pages/GraphicDesignPage.jsx
import React from "react";
import GraphicHero from "../components/GraphicDesignPage/GraphicHero";
import GraphicOverview from "../components/GraphicDesignPage/GraphicOverview";
import GraphicGallery from "../components/GraphicDesignPage/GraphicGallery";
import BuildSection from "../components/Home/BuildSection";
import OtherProj from "../components/ProjectPage/OtherProj";

import { graphicProjectsApi } from "../api/graphicProjectsApi";

/**
 * ✅ Vercel is case-sensitive. Avoid hard imports that can fail build.
 * This will eagerly load whatever images exist in /assets/Graphics
 */
const GRAPHICS_ASSETS = import.meta.glob(
  "../assets/Graphics/**/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" },
);

function findGraphicAsset(fileNameLower) {
  const target = `/${fileNameLower}`; // e.g. "/img1.png"
  const hit = Object.entries(GRAPHICS_ASSETS).find(([path]) =>
    path.toLowerCase().endsWith(target),
  );
  return hit ? hit[1] : "";
}

// ✅ local fallback assets (safe across case differences)
const HeroBg = findGraphicAsset("heroimg.png");
const OverviewImg = findGraphicAsset("overviewimg.png");

// if Img1 doesn't exist (or name differs), fallback to OverviewImg then HeroBg
const Img1 = findGraphicAsset("img1.png") || OverviewImg || HeroBg;

const HERO_BG_TWEAK = {
  fit: "cover",
  scale: 1.0,
  posX: 58,
  posY: 22,
  translateX: 0,
  translateY: 0,
  opacity: 0.99,
};

const makeLocalRepeats = (src, count = 50) =>
  Array.from({ length: count }, (_, i) => ({
    id: `gfx-${i + 1}`,
    src,
  }));

function splitToParagraphs(text) {
  const s = (text || "").trim();
  if (!s) return [];
  return s
    .split(/\n\s*\n|\r\n\r\n|\r\r/g)
    .map((x) => x.trim())
    .filter(Boolean);
}

function mapGallery(project) {
  const headlineImg = project?.headline?.image?.url
    ? [
        {
          id: project.headline.image.publicId || "headline",
          src: project.headline.image.url,
        },
      ]
    : [];

  const others = Array.isArray(project?.otherImages)
    ? project.otherImages
        .filter((x) => x?.url)
        .map((x, idx) => ({
          id: x.publicId || x.url || `img-${idx}`,
          src: x.url,
        }))
    : [];

  return [...headlineImg, ...others].slice(0, 50);
}

export default function GraphicDesignPage() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [project, setProject] = React.useState(null);

  React.useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const items = await graphicProjectsApi.listPublished();
        const first = Array.isArray(items) && items.length ? items[0] : null;

        if (!alive) return;
        setProject(first);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Failed to load graphic projects.");
        setProject(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const data = React.useMemo(() => {
    const fallback = {
      backLabel: "Back to Portfolio",
      titleTop: "Flyers & Social Media",
      titleBottom: "Designs",
      subtitle:
        "Designing a student-focused savings and budgeting platform for life after school",
      heroBg: HeroBg || "", // safe
      heroBgTweak: HERO_BG_TWEAK,
      overviewTitle: "Overview",
      overviewText: [
        "SavedUp is a mobile savings and budgeting platform designed to help university students and recent graduates prepare financially for life after school.",
      ],
      overviewImage: OverviewImg || "",
      gallery: makeLocalRepeats(Img1 || HeroBg || "", 50),
      slug: null,
      _id: null,
    };

    if (!project) return fallback;

    const overviewParagraphs = splitToParagraphs(project?.body?.text);
    const galleryItems = mapGallery(project);

    return {
      backLabel: "Back to Portfolio",

      titleTop: project.projectName || "Flyers & Social Media",
      titleBottom: "Designs",
      subtitle: project.subtitle || "",

      heroBg: HeroBg || "",
      heroBgTweak: HERO_BG_TWEAK,

      overviewTitle: "Overview",
      overviewText: overviewParagraphs.length > 0 ? overviewParagraphs : ["—"],
      overviewImage: OverviewImg || "",

      gallery: galleryItems.length
        ? galleryItems
        : makeLocalRepeats(Img1 || HeroBg || "", 50),

      slug: project.slug || project._id,
      _id: project._id,
    };
  }, [project]);

  return (
    <div className="relative min-h-screen bg-[#070707] text-white overflow-x-hidden">
      {/* page glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,#4ade80_0,transparent_65%)] opacity-[0.16] blur-3xl" />
      <div className="pointer-events-none absolute -right-44 top-[18%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,#22c55e_0,transparent_70%)] opacity-[0.12] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_55%)]" />

      <main className="relative z-10">
        <GraphicHero data={data} />
        <GraphicOverview data={data} />

        {loading && (
          <div className="mx-auto max-w-[1180px] px-4 sm:px-8 pt-4 text-white/60 text-sm">
            Loading gallery…
          </div>
        )}
        {error && (
          <div className="mx-auto max-w-[1180px] px-4 sm:px-8 pt-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        <GraphicGallery items={data.gallery} />
        <OtherProj currentSlug={data?.slug} currentKind="gallary" />
        <BuildSection />
      </main>
    </div>
  );
}
