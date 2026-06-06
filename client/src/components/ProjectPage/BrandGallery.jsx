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

/* ─── single bento cell ─── */
function BentoCell({ src, alt = "", label = "", style, color = "#a3e635", delay = 0, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  return (
    <motion.div
      ref={ref}
      style={style}
      className={`relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] group ${src ? "cursor-pointer" : "cursor-default"}`}
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
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
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
   BrandGallery — 16-slot dynamic bento grid with lightbox
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
  const img = (i) => images[i] || {};
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0 });

  /* lightbox — only navigate through filled slots */
  const [lightboxNav, setLightboxNav] = useState(null); // index into filledImages
  const filledImages = images
    .map((item, i) => ({ ...item, originalIndex: i }))
    .filter((item) => item.src);

  const openLightbox = useCallback((originalIndex) => {
    const navIdx = filledImages.findIndex((item) => item.originalIndex === originalIndex);
    if (navIdx !== -1) setLightboxNav(navIdx);
  }, [filledImages]);

  const closeLightbox = useCallback(() => setLightboxNav(null), []);
  const prevImage = useCallback(() =>
    setLightboxNav((i) => (i - 1 + filledImages.length) % filledImages.length), [filledImages.length]);
  const nextImage = useCallback(() =>
    setLightboxNav((i) => (i + 1) % filledImages.length), [filledImages.length]);

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

        {/* desktop bento — 16 cells, 6 rows, columns AND rows vary */}
        <div
          className="hidden sm:grid gap-3"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "220px 220px 180px 220px 180px 200px",
          }}
        >
          <BentoCell src={img(0).src}  alt={img(0).alt}  label={img(0).label}  color={color} delay={d(0)}  style={{ gridColumn: "1 / 5",  gridRow: "1 / 3" }} onClick={() => openLightbox(0)} />
          <BentoCell src={img(1).src}  alt={img(1).alt}  label={img(1).label}  color={color} delay={d(1)}  style={{ gridColumn: "5 / 9",  gridRow: "1 / 2" }} onClick={() => openLightbox(1)} />
          <BentoCell src={img(2).src}  alt={img(2).alt}  label={img(2).label}  color={color} delay={d(2)}  style={{ gridColumn: "9 / 13", gridRow: "1 / 2" }} onClick={() => openLightbox(2)} />
          <BentoCell src={img(3).src}  alt={img(3).alt}  label={img(3).label}  color={color} delay={d(3)}  style={{ gridColumn: "5 / 9",  gridRow: "2 / 3" }} onClick={() => openLightbox(3)} />
          <BentoCell src={img(4).src}  alt={img(4).alt}  label={img(4).label}  color={color} delay={d(4)}  style={{ gridColumn: "9 / 13", gridRow: "2 / 4" }} onClick={() => openLightbox(4)} />
          <BentoCell src={img(5).src}  alt={img(5).alt}  label={img(5).label}  color={color} delay={d(5)}  style={{ gridColumn: "1 / 4",  gridRow: "3 / 4" }} onClick={() => openLightbox(5)} />
          <BentoCell src={img(6).src}  alt={img(6).alt}  label={img(6).label}  color={color} delay={d(6)}  style={{ gridColumn: "4 / 9",  gridRow: "3 / 4" }} onClick={() => openLightbox(6)} />
          <BentoCell src={img(7).src}  alt={img(7).alt}  label={img(7).label}  color={color} delay={d(7)}  style={{ gridColumn: "1 / 6",  gridRow: "4 / 5" }} onClick={() => openLightbox(7)} />
          <BentoCell src={img(8).src}  alt={img(8).alt}  label={img(8).label}  color={color} delay={d(8)}  style={{ gridColumn: "6 / 9",  gridRow: "4 / 5" }} onClick={() => openLightbox(8)} />
          <BentoCell src={img(9).src}  alt={img(9).alt}  label={img(9).label}  color={color} delay={d(9)}  style={{ gridColumn: "9 / 13", gridRow: "4 / 6" }} onClick={() => openLightbox(9)} />
          <BentoCell src={img(10).src} alt={img(10).alt} label={img(10).label} color={color} delay={d(10)} style={{ gridColumn: "1 / 4",  gridRow: "5 / 6" }} onClick={() => openLightbox(10)} />
          <BentoCell src={img(11).src} alt={img(11).alt} label={img(11).label} color={color} delay={d(11)} style={{ gridColumn: "4 / 7",  gridRow: "5 / 6" }} onClick={() => openLightbox(11)} />
          <BentoCell src={img(12).src} alt={img(12).alt} label={img(12).label} color={color} delay={d(12)} style={{ gridColumn: "7 / 9",  gridRow: "5 / 6" }} onClick={() => openLightbox(12)} />
          <BentoCell src={img(13).src} alt={img(13).alt} label={img(13).label} color={color} delay={d(13)} style={{ gridColumn: "1 / 5",  gridRow: "6 / 7" }} onClick={() => openLightbox(13)} />
          <BentoCell src={img(14).src} alt={img(14).alt} label={img(14).label} color={color} delay={d(14)} style={{ gridColumn: "5 / 9",  gridRow: "6 / 7" }} onClick={() => openLightbox(14)} />
          <BentoCell src={img(15).src} alt={img(15).alt} label={img(15).label} color={color} delay={d(15)} style={{ gridColumn: "9 / 13", gridRow: "6 / 7" }} onClick={() => openLightbox(15)} />
        </div>

        {/* mobile: 2-col, first cell full-width */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {Array.from({ length: 16 }, (_, i) => (
            <BentoCell
              key={i}
              src={img(i).src}
              alt={img(i).alt}
              label={img(i).label}
              color={color}
              delay={d(i)}
              onClick={() => openLightbox(i)}
              style={{
                aspectRatio: i === 0 ? "16/9" : i === 4 || i === 9 ? "1/1" : "4/3",
                gridColumn: i === 0 ? "1 / 3" : undefined,
              }}
            />
          ))}
        </div>

        {/* optional CTA */}
        {cta && (
          <div className="mt-10 flex justify-start">
            <button
              onClick={() => navigate(cta.to)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-[13px] font-medium text-white/75 transition hover:border-white/35 hover:bg-white/10 hover:text-white"
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
      {lightboxNav !== null && filledImages.length > 0 && (
        <Lightbox
          images={filledImages}
          index={lightboxNav}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
