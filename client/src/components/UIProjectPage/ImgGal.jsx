// src/components/UIProjectPage/ImgGal.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft01Icon, ArrowRight01Icon, Cancel01Icon } from "hugeicons-react";

/* ----------------- styles / constants ----------------- */
const tileBase =
  "relative overflow-hidden rounded-2xl border border-white/70 " +
  "bg-black/40 shadow-[0_0_35px_rgba(0,0,0,0.9)] " +
  "transition-all duration-300 ease-out " +
  "hover:border-lime-400 hover:shadow-[0_0_45px_rgba(190,242,100,0.45)] " +
  "hover:-translate-y-[3px] cursor-pointer select-none";

const CLEANSTEAD_COL_WIDTHS = {
  left: "0.55fr",
  center: "1.3fr",
  right: "0.55fr",
};

const CLEANSTEAD_MIDDLE_ROWS = {
  top: 160,
  middle: 420,
  bottom: 160,
};

const TABSTUDIO_COL_WIDTHS = {
  left: "0.85fr",
  right: "1.05fr",
};

const TABSTUDIO_LEFT_ROWS = {
  top: 350,
  bottom: 290,
};

const TABSTUDIO_RIGHT_ROWS = {
  top: 160,
  middle: 300,
  bottom: 160,
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const safeArr = (v) => (Array.isArray(v) ? v : []);
const safeStr = (v) => (v == null ? "" : String(v));

const joinUrl = (base, path) => {
  const b = safeStr(base).trim();
  if (!b) return path;
  return b.replace(/\/+$/, "") + path;
};

const isAbsUrl = (s) =>
  /^https?:\/\//i.test(s) || s.startsWith("data:") || s.startsWith("blob:");

const toSrc = (apiBase, raw) => {
  const v = safeStr(raw).trim();
  if (!v) return "";
  if (isAbsUrl(v)) return v;
  if (!apiBase) return v;
  const path = v.startsWith("/") ? v : `/${v}`;
  return joinUrl(apiBase, path);
};

const normalizeGalleryFromProject = (project, apiBase) => {
  const rawGallery =
    (safeArr(project?.images?.gallery).length
      ? project.images.gallery
      : safeArr(project?.galleryImages).length
        ? project.galleryImages
        : []) || [];

  let images = rawGallery
    .filter(Boolean)
    .map((s) => toSrc(apiBase, s))
    .filter(Boolean);

  if (images.length > 7) images = images.slice(0, 7);
  return images; // ✅ no fallbacks, no placeholders
};

/* ----------------- small “no broken img icon” fallback tile ----------------- */
function ImgOrFallback({ src, alt, className = "" }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(70%_70%_at_40%_35%,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.92)_72%)]">
        <span className="text-xs text-white/45">
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setBroken(true)}
      loading="lazy"
    />
  );
}

/* ================== LAYOUTS ================== */

/** 5 images – BookRion layout */
const Bento5 = ({ images, onImageClick }) => {
  const [img1, img2, img3, img4, img5] = images;
  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-3 md:[grid-auto-rows:210px]">
      <div
        className={`${tileBase}
          col-span-3
          md:col-span-2 md:col-start-1 md:row-start-1 md:row-span-1
          aspect-[4/5] md:aspect-auto
        `}
        onClick={() => onImageClick(0)}
      >
        <ImgOrFallback
          src={img1}
          alt="Gallery 1"
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className={`${tileBase}
          col-span-3
          md:col-span-1 md:col-start-3 md:row-start-1 md:row-span-1
          aspect-[4/5] md:aspect-[3/4]
        `}
        onClick={() => onImageClick(1)}
      >
        <ImgOrFallback
          src={img2}
          alt="Gallery 2"
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className={`${tileBase}
          col-span-3
          md:col-span-2 md:col-start-1 md:row-start-2 md:row-span-2
          aspect-[3/4] md:aspect-auto
        `}
        onClick={() => onImageClick(2)}
      >
        <ImgOrFallback
          src={img3}
          alt="Gallery 3"
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className={`${tileBase}
          col-span-3
          md:col-span-1 md:col-start-3 md:row-start-2 md:row-span-1
          aspect-square
        `}
        onClick={() => onImageClick(3)}
      >
        <ImgOrFallback
          src={img4}
          alt="Gallery 4"
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className={`${tileBase}
          col-span-3
          md:col-span-1 md:col-start-3 md:row-start-3 md:row-span-1
          aspect-square
        `}
        onClick={() => onImageClick(4)}
      >
        <ImgOrFallback
          src={img5}
          alt="Gallery 5"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

/** 6 images – TabStudio layout */
const Bento6 = ({ images, onImageClick }) => {
  const [img1, img2, img3, img4, img5, img6] = images;

  return (
    <div
      className="grid gap-4 md:gap-6"
      style={{
        gridTemplateColumns: `
          ${TABSTUDIO_COL_WIDTHS.left}
          ${TABSTUDIO_COL_WIDTHS.right}
        `,
      }}
    >
      <div
        className="grid gap-4"
        style={{
          gridTemplateRows: `
            ${TABSTUDIO_LEFT_ROWS.top}px
            ${TABSTUDIO_LEFT_ROWS.bottom}px
          `,
        }}
      >
        <div className={tileBase} onClick={() => onImageClick(0)}>
          <ImgOrFallback
            src={img1}
            alt="Gallery 1"
            className="h-full w-full object-cover"
          />
        </div>

        <div className={tileBase} onClick={() => onImageClick(3)}>
          <ImgOrFallback
            src={img4}
            alt="Gallery 4"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: `
            ${TABSTUDIO_RIGHT_ROWS.top}px
            ${TABSTUDIO_RIGHT_ROWS.middle}px
            ${TABSTUDIO_RIGHT_ROWS.bottom}px
          `,
        }}
      >
        <div
          className={tileBase}
          style={{ gridColumn: "1 / span 2" }}
          onClick={() => onImageClick(1)}
        >
          <ImgOrFallback
            src={img2}
            alt="Gallery 2"
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className={tileBase}
          style={{ gridColumn: "1 / span 2" }}
          onClick={() => onImageClick(2)}
        >
          <ImgOrFallback
            src={img3}
            alt="Gallery 3"
            className="h-full w-full object-cover"
          />
        </div>

        <div className={tileBase} onClick={() => onImageClick(4)}>
          <ImgOrFallback
            src={img5}
            alt="Gallery 5"
            className="h-full w-full object-cover"
          />
        </div>

        <div className={tileBase} onClick={() => onImageClick(5)}>
          <ImgOrFallback
            src={img6}
            alt="Gallery 6"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

/** 7 images – Cleanstead layout */
const Bento7 = ({ images, onImageClick }) => {
  const [img1, img2, img3, img4, img5, img6, img7] = images;

  return (
    <div
      className="grid gap-4 md:gap-6"
      style={{
        gridTemplateColumns: `
          ${CLEANSTEAD_COL_WIDTHS.left}
          ${CLEANSTEAD_COL_WIDTHS.center}
          ${CLEANSTEAD_COL_WIDTHS.right}
        `,
      }}
    >
      <div className="grid gap-4" style={{ gridTemplateRows: "1fr 1.5fr" }}>
        <div className={tileBase} onClick={() => onImageClick(0)}>
          <ImgOrFallback
            src={img1}
            alt="Gallery 1"
            className="h-full w-full object-cover"
          />
        </div>

        <div className={tileBase} onClick={() => onImageClick(3)}>
          <ImgOrFallback
            src={img4}
            alt="Gallery 4"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateRows: `
            ${CLEANSTEAD_MIDDLE_ROWS.top}px
            ${CLEANSTEAD_MIDDLE_ROWS.middle}px
            ${CLEANSTEAD_MIDDLE_ROWS.bottom}px
          `,
        }}
      >
        <div className={tileBase} onClick={() => onImageClick(1)}>
          <ImgOrFallback
            src={img2}
            alt="Gallery 2"
            className="h-full w-full object-cover"
          />
        </div>

        <div className={tileBase} onClick={() => onImageClick(5)}>
          <ImgOrFallback
            src={img5}
            alt="Gallery 5"
            className="h-full w-full object-cover"
          />
        </div>

        <div className={tileBase} onClick={() => onImageClick(4)}>
          <ImgOrFallback
            src={img6}
            alt="Gallery 6"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateRows: "1.5fr 1fr" }}>
        <div className={tileBase} onClick={() => onImageClick(2)}>
          <ImgOrFallback
            src={img3}
            alt="Gallery 3"
            className="h-full w-full object-cover"
          />
        </div>

        <div className={tileBase} onClick={() => onImageClick(6)}>
          <ImgOrFallback
            src={img7}
            alt="Gallery 7"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const SimpleGrid = ({ images, onImageClick }) => (
  <div className="grid gap-4 md:gap-6 md:grid-cols-3">
    {images.map((src, i) => (
      <div
        key={`${src}-${i}`}
        className={`${tileBase} aspect-square col-span-3 md:col-span-1`}
        onClick={() => onImageClick(i)}
      >
        <ImgOrFallback
          src={src}
          alt={`Gallery ${i + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
    ))}
  </div>
);

/* ----------------- loading skeleton ----------------- */
const SkeletonGrid = () => {
  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-3 md:[grid-auto-rows:210px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`${tileBase} animate-pulse`}
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02), rgba(255,255,255,0.06))",
          }}
        >
          <div className="h-full w-full opacity-0" />
        </div>
      ))}
    </div>
  );
};

/* ================== MAIN ================== */
const ImgGal = ({ project: projectProp, slug, apiBase = "" }) => {
  const [remoteProject, setRemoteProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const project = projectProp || remoteProject;

  // Fetch ONLY if project not provided and slug exists
  useEffect(() => {
    let ignore = false;

    const run = async () => {
      if (projectProp) return;
      if (!slug) return;

      setLoading(true);
      try {
        const url = joinUrl(
          apiBase,
          `/api/ui-projects/slug/${encodeURIComponent(slug)}`,
        );
        const res = await fetch(url, { method: "GET" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!ignore) setRemoteProject(data);
      } catch {
        if (!ignore) setRemoteProject(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    run();
    return () => {
      ignore = true;
    };
  }, [projectProp, slug, apiBase]);

  const images = useMemo(
    () => normalizeGalleryFromProject(project, apiBase),
    [project, apiBase],
  );

  const count = images.length;

  // ✅ If there are no gallery images, do NOT render the section at all
  if (!loading && count === 0) return null;

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setLightboxIndex((prev) =>
        prev === null ? prev : prev === 0 ? count - 1 : prev - 1,
      );
    },
    [count],
  );

  const showNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setLightboxIndex((prev) =>
        prev === null ? prev : prev === count - 1 ? 0 : prev + 1,
      );
    },
    [count],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    if (lightboxIndex > count - 1) setLightboxIndex(count ? count - 1 : null);
  }, [count, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev(e);
      if (e.key === "ArrowRight") showNext(e);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <section className="relative w-full bg-[#050505] pt-10 pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-lime-500/18 blur-[180px]" />
        <div className="absolute right-[-40px] bottom-[-40px] h-64 w-64 rounded-full bg-lime-500/14 blur-[190px]" />
      </div>

      <div className="relative mx-auto max-w-[1224px] px-4 lg:px-6">
        {loading && !projectProp && !remoteProject ? (
          <SkeletonGrid />
        ) : (
          <>
            {count === 5 && (
              <Bento5 images={images} onImageClick={openLightbox} />
            )}
            {count === 6 && (
              <Bento6 images={images} onImageClick={openLightbox} />
            )}
            {count >= 7 && (
              <Bento7 images={images} onImageClick={openLightbox} />
            )}
            {count > 0 && count < 5 && (
              <SimpleGrid images={images} onImageClick={openLightbox} />
            )}
          </>
        )}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-5 right-5 inline-flex items-center justify-center rounded-full border border-white/30 bg-black/60 p-2 text-white hover:bg-white/10"
            >
              <Cancel01Icon size={20} />
            </button>

            <button
              type="button"
              onClick={showPrev}
              className="absolute left-5 md:left-10 inline-flex items-center justify-center rounded-full border border-white/40 bg-black/70 p-2 md:p-3 text-white hover:bg-white/10"
            >
              <ArrowLeft01Icon size={24} />
            </button>

            <button
              type="button"
              onClick={showNext}
              className="absolute right-5 md:right-10 inline-flex items-center justify-center rounded-full border border-white/40 bg-black/70 p-2 md:p-3 text-white hover:bg-white/10"
            >
              <ArrowRight01Icon size={24} />
            </button>

            <motion.img
              key={`${images[lightboxIndex]}-${lightboxIndex}`}
              src={images[lightboxIndex]}
              alt={`Full image ${lightboxIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl border border-white/20 object-contain shadow-[0_0_40px_rgba(0,0,0,0.9)]"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImgGal;
