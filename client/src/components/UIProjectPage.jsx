// src/pages/UIProjectPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import WriteUp from "../components/UIProjectPage/WriteUp";
import ProjectHero from "../components/UIProjectPage/ProjectHero";
import ImgGal from "../components/UIProjectPage/ImgGal";
import BuildSection from "../components/Home/BuildSection";
import OtherProj from "../components/ProjectPage/OtherProj";

import { uiProjectsApi } from "../api/uiProjects";

/* ----------------- tiny skeleton helpers (keeps layout stable) ----------------- */
const SkeletonBlock = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-2xl border border-white/10 bg-white/[0.04] ${className}`}
  />
);

const HeroSkeleton = () => (
  <section className="mx-auto max-w-[980px] px-4 sm:px-8 pt-24">
    <SkeletonBlock className="h-[220px] sm:h-[260px]" />
    <div className="mt-6 space-y-3">
      <SkeletonBlock className="h-6 w-2/3" />
      <SkeletonBlock className="h-4 w-1/2" />
      <SkeletonBlock className="h-4 w-1/3" />
    </div>
  </section>
);

const WriteupSkeleton = () => (
  <section className="mx-auto max-w-[980px] px-4 sm:px-8 pt-10 pb-8 space-y-6">
    <SkeletonBlock className="h-6 w-56" />
    <SkeletonBlock className="h-4 w-full" />
    <SkeletonBlock className="h-4 w-11/12" />
    <SkeletonBlock className="h-4 w-10/12" />
    <SkeletonBlock className="h-[240px] sm:h-[320px]" />
  </section>
);

const GallerySkeleton = () => (
  <section className="mx-auto max-w-[1224px] px-4 lg:px-6 pt-10 pb-24">
    <div className="grid gap-4 md:gap-6 md:grid-cols-3 md:[grid-auto-rows:210px]">
      <SkeletonBlock className="col-span-3 md:col-span-2" />
      <SkeletonBlock className="col-span-3 md:col-span-1" />
      <SkeletonBlock className="col-span-3 md:col-span-2 md:row-span-2" />
      <SkeletonBlock className="col-span-3 md:col-span-1" />
      <SkeletonBlock className="col-span-3 md:col-span-1" />
    </div>
  </section>
);

/* ----------------- helpers ----------------- */
const safeArr = (v) => (Array.isArray(v) ? v : []);
const hasGalleryImages = (project) => {
  const g1 = safeArr(project?.images?.gallery).filter(Boolean);
  const g2 = safeArr(project?.galleryImages).filter(Boolean);
  return g1.length > 0 || g2.length > 0;
};

const UIProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: "", note: "" });

  const resolvedSlug = useMemo(
    () => (slug ? String(slug).toLowerCase() : ""),
    [slug],
  );

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        setStatus({ loading: true, error: "", note: "" });
        setProject(null);

        // 1) If slug is provided → fetch by slug
        if (resolvedSlug) {
          try {
            const bySlug = await uiProjectsApi.getBySlug(resolvedSlug);
            if (!mounted) return;

            setProject(bySlug);
            setStatus({ loading: false, error: "", note: "" });
            return;
          } catch (err) {
            // If slug not found → fallback to default + show note
            if (err?.status !== 404) throw err;

            const fallback = await uiProjectsApi.getDefault();
            if (!mounted) return;

            setProject(fallback);
            setStatus({
              loading: false,
              error: "",
              note: "That UI project was not found — showing the latest UI case study instead.",
            });
            return;
          }
        }

        // 2) No slug → default UI project
        const def = await uiProjectsApi.getDefault();
        if (!mounted) return;

        setProject(def);
        setStatus({ loading: false, error: "", note: "" });
      } catch (err) {
        console.error("UIProjectPage fetch error:", err);
        if (!mounted) return;

        setStatus({
          loading: false,
          error: err?.message || "Unable to load UI project right now.",
          note: "",
        });
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, [resolvedSlug]);

  const shouldShowGallery = useMemo(
    () => (project ? hasGalleryImages(project) : false),
    [project],
  );

  return (
    <div
      className="
        relative min-h-screen
        bg-[#050505] text-white
        overflow-x-hidden overflow-y-visible
      "
    >
      {/* LEFT TOP GREEN GLOW */}
      <div
        className="
          pointer-events-none
          absolute -left-32 -top-24
          h-[260px] w-[260px]
          sm:-left-40 sm:-top-32
          sm:h-[360px] sm:w-[360px]
          md:h-[420px] md:w-[420px]
          rounded-full
          bg-[radial-gradient(circle_at_center,#4ade80_0,transparent_60%)]
          opacity-[0.27] blur-3xl
        "
      />

      {/* RIGHT MID / BOTTOM GREEN GLOW */}
      <div
        className="
          pointer-events-none
          absolute -right-32 top-1/3
          h-[280px] w-[280px]
          sm:-right-40
          sm:h-[380px] sm:w-[380px]
          md:h-[460px] md:w-[460px]
          rounded-full
          bg-[radial-gradient(circle_at_center,#22c55e_0,transparent_65%)]
          opacity-[0.22] blur-3xl
        "
      />

      {/* SLIGHT SIDE GRADIENT EDGE */}
      <div
        className="
          pointer-events-none
          hidden md:block
          absolute inset-y-0 left-0 w-40
          bg-gradient-to-r from-[#0f172a]/60 via-transparent to-transparent
          opacity-80
        "
      />

      <main className="relative z-10">
        {/* ✅ LOADING: show skeletons */}
        {status.loading ? (
          <>
            <HeroSkeleton />
            <WriteupSkeleton />
            <GallerySkeleton />
          </>
        ) : status.error ? (
          <section className="mx-auto max-w-[980px] px-4 sm:px-8 pt-28 pb-16">
            <p className="text-sm text-red-400">
              {status.error}
            </p>
            <button
              className="mt-4 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs hover:bg-white/10"
              onClick={() => navigate("/ui-projects")}
              type="button"
            >
              Open UI Projects
            </button>
          </section>
        ) : (
          <>
            {status.note && (
              <div className="mx-auto max-w-[980px] px-4 sm:px-8 pt-24">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-xs text-white/70">
                    {status.note}
                  </p>
                </div>
              </div>
            )}

            {project ? (
              <>
                <ProjectHero project={project} />
                <WriteUp project={project} />

                {/* ✅ Only show gallery when the project actually has images */}
                {shouldShowGallery ? (
                  <ImgGal
                    project={project}
                    slug={project?.slug || resolvedSlug}
                  />
                ) : null}

                <OtherProj currentSlug={project?.slug} currentKind="ui" />
                <BuildSection />
              </>
            ) : (
              <section className="mx-auto max-w-[980px] px-4 sm:px-8 pt-28 pb-16">
                <p className="text-sm text-white/70">
                  No UI project data available.
                </p>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UIProjectPage;
