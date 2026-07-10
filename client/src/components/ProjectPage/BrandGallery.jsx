import React, { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ─── lightbox portal ─── */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];
  const total = images.length;

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(20px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* image container */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ maxWidth: "88vw", maxHeight: "88vh" }}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="rounded-2xl shadow-[0_32px_120px_rgba(0,0,0,0.9)] object-contain"
            style={{ maxWidth: "88vw", maxHeight: "82vh" }}
          />

          {/* label + counter */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 py-4 rounded-b-2xl"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/80">
              {img.label || img.alt}
            </p>
            <p className="text-[11px] font-mono text-white/40">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </div>
        </motion.div>

        {/* prev */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 sm:left-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/70 hover:text-white"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* next */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 sm:right-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/70 hover:text-white"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/60 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/70 hover:text-white"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ─── single masonry cell ───
   The image keeps its natural aspect ratio — a portrait bottle stays tall,
   a square tote stays square, a wide billboard stays wide. Nothing is
   cropped before the click; the shape of the work decides the shape of
   the cell. */
function BentoCell({ src, alt = "", label = "", color = "#a3e635", delay = 0, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-lg sm:rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] group ${src ? "cursor-pointer" : "cursor-default"}`}
      initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay }}
      whileHover={src ? {
        scale: 1.02,
        boxShadow: `0 0 0 1.5px ${color}60, 0 0 0 3px ${color}12, 0 16px 48px ${color}18`,
      } : {}}
      onClick={() => src && onClick && onClick()}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-16">
          <div className="w-8 h-8 rounded-full border border-dashed border-white/15 flex items-center justify-center">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M3 16l5-5 4 4 3-3 6 6" />
            </svg>
          </div>
          {(label || alt) && (
            <p className="text-[10px] text-white/20 text-center leading-relaxed max-w-[140px]">{label || alt}</p>
          )}
        </div>
      )}

      {/* label slides up from bottom on hover */}
      {src && (label || alt) && (
        <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color }}>
            {label || alt}
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BrandGallery — adaptive bento grid with lightbox.
   Renders however many images it's given; empty (src: null)
   entries are dropped and the grid reflows to stay full.
   Reusable for any brand identity page.
═══════════════════════════════════════════════════════════ */
export default function BrandGallery({
  n = "07",
  label = "TOUCHPOINTS",
  white = "The brand,",
  accent = "applied",
  description = "Selected touchpoints and application designs — the brand system in real-world use.",
  images = [],
  color = "#a3e635",
  cta = null,
}) {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0 });

  const filled = images.filter((item) => item.src);

  /* lightbox */
  const [lightboxNav, setLightboxNav] = useState(null); // index into filled
  const openLightbox = useCallback((i) => setLightboxNav(i), []);
  const closeLightbox = useCallback(() => setLightboxNav(null), []);
  const prevImage = useCallback(() =>
    setLightboxNav((i) => (i - 1 + filled.length) % filled.length), [filled.length]);
  const nextImage = useCallback(() =>
    setLightboxNav((i) => (i + 1) % filled.length), [filled.length]);

  /* stagger delay capped so late cells don't feel disconnected */
  const d = (i) => Math.min(i * 0.04, 0.35);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">

        {/* header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color }}>
            {n} — {label}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em]">
            <span className="text-white">{white} </span>
            <span style={{ color }}>{accent}</span>
          </h2>
          <p className="mt-4 mb-10 text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[520px]">
            {description}
          </p>
        </motion.div>

        {/* masonry — columns pack naturally, every image keeps its own shape */}
        <div className="columns-2 lg:columns-3 gap-3">
          {filled.map((item, i) => (
            <div key={i} className="mb-3 break-inside-avoid">
              <BentoCell
                src={item.src}
                alt={item.alt}
                label={item.label}
                color={color}
                delay={d(i)}
                onClick={() => openLightbox(i)}
              />
            </div>
          ))}
        </div>

        {/* optional CTA */}
        {cta && (
          <div className="mt-10 flex justify-start">
            <button
              onClick={() => navigate(cta.to)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-lime-400 to-lime-600 px-6 py-3 text-[13px] font-bold text-black shadow-[0_0_18px_rgba(132,204,22,0.5)] transition hover:from-lime-300 hover:to-lime-500 hover:-translate-y-[1px] active:scale-95"
            >
              {cta.label}
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

      </div>

      {/* lightbox */}
      {lightboxNav !== null && filled.length > 0 && (
        <Lightbox
          images={filled}
          index={lightboxNav}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
