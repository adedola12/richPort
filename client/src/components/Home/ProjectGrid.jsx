// src/components/Home/ProjectGrid.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchJson } from "../../api/http";

import GraphicHeroImg from "../../assets/Graphics/HeroImg.png";
import ydpayThumb from "../../assets/YDpay/iphone15pro.png";
import webHeroImg from "../../assets/workImg/WI1.png";

const STATIC_UI_PROJECTS = [
  {
    kind: "ui",
    slug: "ydpay-mobile-redesign",
    name: "YDpay Mobile Redesign",
    description: "Full redesign of the YDpay crypto trading and wallet app — sharper hierarchy, bolder visual language, and simplified flows.",
    url: "",
    tags: ["UI/UX Design", "Mobile App", "Fintech"],
    images: { main: ydpayThumb },
    pageImg: ydpayThumb,
    categories: ["Product UI/UX Designs"],
    id: "static-ydpay",
  },
];

const TAB_CONFIG = [
  { label: "All", matches: null },
  {
    label: "Brand Identity Designs",
    matches: ["Brand Identity Designs", "Brand Identity"],
  },
  {
    label: "Websites Designs",
    matches: ["Websites Designs", "Website Designs"],
  },
  {
    label: "Product UI/UX Designs",
    matches: ["Product UI/UX Designs", "Product UI/UX"],
  },
  {
    label: "Graphic Designs",
    matches: ["Graphic Designs", "Graphic Design"],
  },
];

const tabs = TAB_CONFIG.map((t) => t.label);

const GRAPHIC_GALLERY_ROUTE = "/graphic-design";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
      delay: 0.05 + i * 0.08,
    },
  }),
};

/* ---- Figma-style gradient for cards ---- */
const CARD_BG =
  "linear-gradient(112.73deg, rgba(72,73,77,0.28) 5.73%, rgba(128,97,96,0.224) 50.57%, rgba(166,133,131,0.07) 100.09%)";

/* ---- Figma Graphic Hero Card ---- */
function GraphicDesignHeroCard({ project, onView }) {
  const bgSrc = GraphicHeroImg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onView?.()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onView?.();
        }}
        className="relative overflow-hidden rounded-[14px] border border-lime-500/25 bg-black/60 shadow-[0_0_40px_rgba(0,0,0,0.85)] cursor-pointer select-none transition hover:border-lime-400/35 hover:shadow-[0_0_55px_rgba(190,242,100,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/35"
        style={{ minHeight: 380 }}
      >
        <img
          src={bgSrc}
          alt="Graphic design project"
          className="absolute inset-0 h-full w-full object-cover"
          draggable="false"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.90)_0%,rgba(0,0,0,0.78)_36%,rgba(0,0,0,0.30)_72%,rgba(0,0,0,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_140%_at_18%_48%,rgba(0,0,0,0.62)_0%,transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-lime-500/12" />
        <div className="pointer-events-none absolute -left-12 top-[45%] h-72 w-72 -translate-y-1/2 rounded-full bg-lime-500/10 blur-[130px]" />

        <div className="relative z-10 flex h-full w-full items-start px-6 pt-10 pb-12 sm:px-10 sm:pt-12 sm:pb-14">
          <div className="max-w-[640px]">
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full border border-white/18 bg-white/5 px-3 py-1 text-[10px] font-semibold text-white/75">
                {project?.pill || "Graphic Design"}
              </span>
            </div>
            <h3 className="font-['Outfit'] text-[36px] leading-[1.03] sm:text-[48px] font-semibold text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.65)]">
              {project?.titleTop || "Flyers & Social Media"}
              <br />
              <span className="text-white/55">
                {project?.titleBottom || "Designs"}
              </span>
            </h3>
            <p className="mt-3 max-w-[520px] text-[12px] sm:text-[13px] leading-5 text-white/55">
              {project?.subtitle ||
                "Designing a student-focused savings and budgeting platform for life after school"}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onView?.();
              }}
              className="mt-5 inline-flex items-center justify-center h-9 rounded-md px-4 border border-white/40 bg-white/10 text-[11px] font-semibold text-white/85 hover:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/35"
            >
              View Project
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---- Website Design Hero Card ---- */
function WebsiteDesignHeroCard({ onView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onView}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onView(); }}
        className="relative overflow-hidden rounded-[14px] border border-sky-500/25 bg-black/60 shadow-[0_0_40px_rgba(0,0,0,0.85)] cursor-pointer select-none transition hover:border-sky-400/40 hover:shadow-[0_0_55px_rgba(56,189,248,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/35"
        style={{ minHeight: 380 }}
      >
        <img
          src={webHeroImg}
          alt="Website design projects"
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable="false"
        />
        {/* Dark gradient scrim — left-heavy so text is readable */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_38%,rgba(0,0,0,0.28)_74%,rgba(0,0,0,0.10)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_140%_at_18%_48%,rgba(0,0,0,0.55)_0%,transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-sky-500/10" />
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-10 top-[45%] h-72 w-72 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />

        <div className="relative z-10 flex h-full w-full items-start px-6 pt-10 pb-12 sm:px-10 sm:pt-12 sm:pb-14">
          <div className="max-w-[640px]">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-white/5 px-3 py-1 text-[10px] font-semibold text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Website Design
              </span>
            </div>
            <h3 className="font-['Outfit'] text-[36px] leading-[1.03] sm:text-[48px] font-semibold text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.65)]">
              Built for the
              <br />
              <span className="text-white/55">real web.</span>
            </h3>
            <p className="mt-3 max-w-[520px] text-[12px] sm:text-[13px] leading-5 text-white/55">
              Five live website projects — interactive browser previews, client comments, and full case details.
            </p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onView(); }}
              className="mt-5 inline-flex items-center justify-center h-9 rounded-md px-4 border border-white/40 bg-white/10 text-[11px] font-semibold text-white/85 hover:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/35"
            >
              View Projects
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   ProjectGrid
   ================================================================ */
const ProjectGrid = ({ contained = true, excludeSlug, excludeKind }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [tabDropdownOpen, setTabDropdownOpen] = useState(false);
  const tabDropdownRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [uiProjects, setUiProjects] = useState([]);
  const [uiStatus, setUiStatus] = useState({ loading: false, error: "" });
  const [gfxProjects, setGfxProjects] = useState([]);
  const [gfxStatus, setGfxStatus] = useState({ loading: false, error: "" });
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();

  const tabCfg = useMemo(
    () => TAB_CONFIG.find((t) => t.label === activeTab) || TAB_CONFIG[0],
    [activeTab],
  );

  const isAllTab = activeTab === "All";
  const isUiTab = activeTab === "Product UI/UX Designs";
  const isGfxTab = activeTab === "Graphic Designs";
  const isWebTab = activeTab === "Websites Designs";
  const needsUi = isAllTab || isUiTab;
  const needsGfx = isAllTab || isGfxTab;

  // Close tab dropdown on outside click
  useEffect(() => {
    if (!tabDropdownOpen) return;
    const handler = (e) => {
      if (tabDropdownRef.current && !tabDropdownRef.current.contains(e.target)) {
        setTabDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [tabDropdownOpen]);

  // Fetch default projects
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setStatus({ loading: true, error: "" });
        const data = await fetchJson("/api/projects");
        if (!mounted) return;
        setProjects(Array.isArray(data) ? data : []);
        setStatus({ loading: false, error: "" });
      } catch (err) {
        console.error("ProjectGrid fetch error:", err);
        if (!mounted) return;
        setProjects([]);
        setStatus({
          loading: false,
          error: "Unable to load projects right now.",
        });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch UI projects
  useEffect(() => {
    if (!needsUi) return;
    let mounted = true;
    (async () => {
      try {
        setUiStatus({ loading: true, error: "" });
        const data = await fetchJson("/api/ui-projects/main-images");
        if (!mounted) return;
        setUiProjects(Array.isArray(data) ? data : []);
        setUiStatus({ loading: false, error: "" });
      } catch (e) {
        console.error("UI projects fetch error:", e);
        if (!mounted) return;
        setUiProjects([]);
        setUiStatus({ loading: false, error: "Unable to load UI projects." });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [needsUi]);

  // Fetch Graphic projects
  useEffect(() => {
    if (!needsGfx) return;
    let mounted = true;
    (async () => {
      try {
        setGfxStatus({ loading: true, error: "" });
        const data = await fetchJson("/api/graphic-projects");
        if (!mounted) return;
        setGfxProjects(Array.isArray(data) ? data : []);
        setGfxStatus({ loading: false, error: "" });
      } catch (e) {
        console.error("Graphic projects fetch error:", e);
        if (!mounted) return;
        setGfxProjects([]);
        setGfxStatus({
          loading: false,
          error: "Unable to load graphic projects.",
        });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [needsGfx]);

  useEffect(() => {
    setVisibleCount(4);
  }, [
    activeTab,
    projects.length,
    uiProjects.length,
    gfxProjects.length,
    excludeSlug,
    excludeKind,
  ]);

  const visibleDefaultProjects = useMemo(() => {
    return (projects || []).filter(
      (p) => p.showOnProjectsPage === undefined || p.showOnProjectsPage,
    );
  }, [projects]);

  const mappedUiProjects = useMemo(() => {
    return (uiProjects || [])
      .filter((p) => p.showOnProjectsPage === undefined || p.showOnProjectsPage)
      .map((p) => ({
        kind: "ui",
        slug: p.slug,
        name: p.name || p.title || "UI Case Study",
        description:
          p.description || p.summary || "A detailed UI/UX case study.",
        url: p.url || p.website || "",
        tags:
          Array.isArray(p.tags) && p.tags.length
            ? p.tags
            : ["UI/UX Case Study"],
        images: { main: p.mainImage || p.main || "" },
        pageImg: p.mainImage || p.main || "",
        categories: ["Product UI/UX Designs"],
        id: p.id || p._id,
      }));
  }, [uiProjects]);

  const mappedGraphicProjects = useMemo(() => {
    return (gfxProjects || []).map((p) => ({
      kind: "gallary",
      slug: p.slug || p._id,
      name: p.projectName || "Graphic Design",
      description: p.subtitle || "",
      url: "",
      tags: ["Graphic Design"],
      images: { main: p.mainImage || GraphicHeroImg },
      pageImg: p.mainImage || GraphicHeroImg,
      categories: ["Graphic Designs"],
      id: p._id,
      _raw: p,
    }));
  }, [gfxProjects]);

  const mappedDefaultProjects = useMemo(() => {
    return visibleDefaultProjects.map((p) => ({ ...p, kind: "default" }));
  }, [visibleDefaultProjects]);

  const combined = useMemo(() => {
    return [
      ...mappedDefaultProjects,
      ...STATIC_UI_PROJECTS,
      ...mappedUiProjects,
      ...mappedGraphicProjects,
    ];
  }, [mappedDefaultProjects, mappedUiProjects, mappedGraphicProjects]);

  const applyExclude = (item) => {
    if (!excludeSlug) return true;
    if (excludeKind)
      return !(item.kind === excludeKind && item.slug === excludeSlug);
    return item.slug !== excludeSlug;
  };

  const filteredItems = useMemo(() => {
    const matches = tabCfg.matches;
    return combined.filter((item) => {
      if (!applyExclude(item)) return false;
      if (item.kind === "ui") return isAllTab || isUiTab;
      if (item.kind === "gallary") return isAllTab || isGfxTab;
      if (isAllTab) return true;
      if (!matches || !matches.length) return false;
      const cats = Array.isArray(item.categories) ? item.categories : [];
      return matches.some((m) => cats.includes(m));
    });
  }, [combined, tabCfg, isAllTab, isUiTab, isGfxTab, excludeSlug, excludeKind]);

  const projectsToShow = filteredItems.slice(0, visibleCount);

  const handleOpenProject = (item) => {
    if (item.kind === "ui") return navigate(`/ui-projects/${item.slug}`);
    if (item.kind === "gallary") return navigate(GRAPHIC_GALLERY_ROUTE);
    navigate(`/projects/${item.slug}`);
  };

  const gridLoading = isGfxTab
    ? gfxStatus.loading
    : status.loading ||
      (needsUi && uiStatus.loading) ||
      (needsGfx && gfxStatus.loading);

  const gfxHero = useMemo(() => {
    const first = mappedGraphicProjects?.[0];
    if (first) {
      const fullTitle = String(first.name || "").trim();
      let titleTop = fullTitle || "Flyers & Social Media";
      let titleBottom = "Designs";
      if (/designs$/i.test(fullTitle)) {
        titleTop = fullTitle.replace(/designs$/i, "").trim() || titleTop;
        titleBottom = "Designs";
      }
      return {
        pill: "Graphic Design",
        titleTop,
        titleBottom,
        subtitle:
          first.description ||
          "Designing a student-focused savings and budgeting platform for life after school",
        slug: first.slug,
        kind: first.kind,
      };
    }
    return {
      pill: "Graphic Design",
      titleTop: "Flyers & Social Media",
      titleBottom: "Designs",
      subtitle:
        "Designing a student-focused savings and budgeting platform for life after school",
      slug: null,
      kind: "gallary",
    };
  }, [mappedGraphicProjects]);

  /* ================================================================
     Render
     ================================================================ */
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {/* ---- FILTER TABS ---- */}
      <div className="flex justify-center">

        {/* Desktop: pill row */}
        <div
          className="hidden sm:inline-flex flex-wrap items-center gap-4 rounded-[12px] border-[0.5px] border-white/40 p-2 backdrop-blur-[12.5px]"
          style={{
            backgroundImage:
              "linear-gradient(168deg, rgba(72,73,77,0.28) 5.7%, rgba(128,97,96,0.224) 50.6%, rgba(166,133,131,0.07) 100%)",
          }}
        >
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  rounded-[12px] px-4 py-3
                  text-[14px] font-medium tracking-[-0.98px]
                  transition whitespace-nowrap
                  ${isActive ? "bg-white/15 text-white" : "text-[#b9bdc7] hover:bg-white/5 hover:text-white/90"}
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Mobile: dropdown */}
        <div ref={tabDropdownRef} className="relative sm:hidden w-full max-w-xs">
          <button
            onClick={() => setTabDropdownOpen((p) => !p)}
            className="w-full flex items-center justify-between gap-3 rounded-[12px] border border-white/30 px-4 py-3 text-[14px] font-medium text-white backdrop-blur-[12.5px]"
            style={{
              backgroundImage:
                "linear-gradient(168deg, rgba(72,73,77,0.28) 5.7%, rgba(128,97,96,0.224) 50.6%, rgba(166,133,131,0.07) 100%)",
            }}
          >
            <span>{activeTab}</span>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: "transform 0.2s", transform: tabDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {tabDropdownOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 rounded-[12px] border border-white/20 overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              style={{ background: "rgba(12,12,16,0.97)" }}
            >
              {tabs.map((tab) => {
                const isActive = tab === activeTab;
                return (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setTabDropdownOpen(false); }}
                    className={`
                      w-full text-left px-4 py-3 text-[14px] font-medium
                      border-b border-white/[0.06] last:border-0
                      transition-colors
                      ${isActive ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"}
                    `}
                  >
                    <span className="flex items-center justify-between">
                      {tab}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-lime-400 flex-shrink-0" />}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* ---- CONTENT ---- */}
      <div className="mt-10">
        {isWebTab ? (
          <WebsiteDesignHeroCard onView={() => navigate("/website-design")} />
        ) : isGfxTab ? (
          <>
            {gridLoading && (
              <div className="mb-3 text-center text-xs text-white/55">
                Loading graphic projects…
              </div>
            )}
            <GraphicDesignHeroCard
              project={gfxHero}
              onView={() => navigate(GRAPHIC_GALLERY_ROUTE)}
            />
            {gfxStatus.error && (
              <p className="mt-4 text-center text-xs text-red-400">
                {gfxStatus.error}
              </p>
            )}
          </>
        ) : gridLoading ? (
          <p className="text-sm text-neutral-300">
            Loading projects…
          </p>
        ) : status.error && filteredItems.length === 0 ? (
          <p className="text-sm text-red-400">{status.error}</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-sm text-neutral-300">
            No projects found in this category yet.
          </p>
        ) : (
          <>
            {/* ---- PROJECT CARDS GRID (Figma: 2-col, 35px gap) ---- */}
            <div className="grid gap-[35px] md:grid-cols-2">
              {projectsToShow.map((project, index) => {
                const previewSrc =
                  project.images?.main ||
                  project.pageImg ||
                  "https://placehold.co/800x450";

                return (
                  <motion.article
                    key={`${project.kind}-${project.id || project._id || project.slug || index}`}
                    onClick={() => handleOpenProject(project)}
                    className="
                      group flex cursor-pointer flex-col
                      rounded-[28px] border border-neutral-700
                      pt-[37px] px-[30px] sm:px-[45px]
                      h-[533px]
                      overflow-hidden
                      transition duration-300
                      hover:-translate-y-1
                      hover:border-[#89ff00]
                      hover:shadow-[0_0_35px_rgba(137,255,0,0.12)]
                    "
                    style={{ backgroundImage: CARD_BG }}
                    variants={cardVariants}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    {/* ---- Card top section ---- */}
                    <div className="flex flex-col gap-[17px] shrink-0">
                      <div className="flex flex-col gap-[11px]">
                        {/* Name + View Project row */}
                        <div className="flex items-center justify-between gap-4 min-w-0 ">
                          <h3
                            className="font-['Outfit'] font-medium text-[24px] sm:text-[35px] leading-[0.9] tracking-[-2.1px] bg-clip-text text-transparent flex-1 min-w-0"
                            style={{
                              backgroundImage:
                                "linear-gradient(179.12deg, rgb(255,255,255) 5.19%, rgb(118,116,116) 102.92%)",
                            }}
                          >
                            {project.name}
                          </h3>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenProject(project);
                            }}
                            className="
                              shrink-0 whitespace-nowrap rounded-[12px]
                              border-[0.5px] border-white
                              bg-white/15
                              px-4 py-2
                              text-[14px] font-medium tracking-[-0.98px] text-white
                              hover:bg-white/25 transition
                            "
                          >
                            View Project
                          </button>
                        </div>

                        {/* URL badge */}
                        {project.url && (
                          <div className="inline-flex self-start items-center rounded-[6px] bg-[#262626] px-3 py-1.5">
                            <span className="text-[14px] leading-[1.5] tracking-[-0.072px] text-[#98989a] truncate-xs">
                              {project.url}
                            </span>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {(project.tags || []).map((tag, tagIdx) => (
                            <span
                              key={`${project.slug}-${tagIdx}`}
                              className="
                                rounded-[9px] border border-[#89ff00]
                                px-1.5 py-1
                                text-[10px] sm:text-[11px] font-semibold text-[#89ff00]
                                whitespace-nowrap
                              "
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      {project.description && (
                        <p
                          className="font-light text-[16px] sm:text-[18px] leading-[1.5] tracking-[-0.64px] text-[#98989a] mb-5"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* ---- Preview image (fills remaining card height) ---- */}
                    <div className="mt-auto flex-1 min-h-0 overflow-hidden rounded-t-[11px] mt-[29px]">
                      <img
                        src={previewSrc}
                        alt={`${project.name} preview`}
                        className="
                          h-full w-full object-cover object-top
                          transition duration-500
                          group-hover:scale-[1.03]
                        "
                      />
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* View More */}
            {filteredItems.length > visibleCount && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  // onClick={() => setVisibleCount((prev) => prev + 4)}
                  onClick={() => navigate("/projects")}
                  className="
                    inline-flex h-12 items-center justify-center
                    rounded-xl border border-white/80
                    px-8
                    text-sm sm:text-base font-normal text-white
                    hover:bg-white hover:text-black transition
                  "
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );

  if (contained) {
    return (
      <section className="relative w-full bg-[#050505] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[18%] h-80 w-80 -translate-x-1/2 rounded-full bg-lime-500/15 blur-[200px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-black/95 px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 shadow-[0_0_40px_rgba(0,0,0,0.85)]">
            {content}
          </div>
        </div>
      </section>
    );
  }

  return <>{content}</>;
};

export default ProjectGrid;
