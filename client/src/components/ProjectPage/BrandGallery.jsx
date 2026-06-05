import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ─── animation ─── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

/* ─── single bento cell ─── */
function BentoCell({ src, alt = "", style }) {
  return (
    <div
      style={style}
      className="relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] group"
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
            <div className="w-8 h-8 rounded-full border border-dashed border-white/15 flex items-center justify-center">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M3 16l5-5 4 4 3-3 6 6" />
              </svg>
            </div>
            {alt && (
              <p className="text-[10px] text-white/20 text-center leading-relaxed max-w-[160px]">{alt}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   BrandGallery — 12-slot bento grid (5 rows)
   Reusable for any brand identity page.

   Props:
     n          — section number string e.g. "07"
     label      — eyebrow label
     white      — heading first part
     accent     — heading accent part
     description — body text under heading
     images     — array of 12 { src, alt } objects (placeholders ok)
     color      — accent color hex
═══════════════════════════════════════════════════ */
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

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">

        <FadeUp>
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
        </FadeUp>

        {/* ── Desktop bento grid — 12 slots, 5 rows ── */}
        <FadeUp delay={0.08}>
          <div
            className="hidden sm:grid gap-3"
            style={{
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "300px 300px 200px 240px 240px",
            }}
          >
            {/* Row 1 — 5 : 4 : 3 */}
            <BentoCell src={img(0).src} alt={img(0).alt} style={{ gridColumn: "1 / 6",  gridRow: "1 / 2" }} />
            <BentoCell src={img(1).src} alt={img(1).alt} style={{ gridColumn: "6 / 10", gridRow: "1 / 2" }} />
            <BentoCell src={img(2).src} alt={img(2).alt} style={{ gridColumn: "10 / 13",gridRow: "1 / 2" }} />
            {/* Row 2 — 4 : 8 */}
            <BentoCell src={img(3).src} alt={img(3).alt} style={{ gridColumn: "1 / 5",  gridRow: "2 / 3" }} />
            <BentoCell src={img(4).src} alt={img(4).alt} style={{ gridColumn: "5 / 13", gridRow: "2 / 3" }} />
            {/* Row 3 — 6 : 6 */}
            <BentoCell src={img(5).src} alt={img(5).alt} style={{ gridColumn: "1 / 7",  gridRow: "3 / 4" }} />
            <BentoCell src={img(6).src} alt={img(6).alt} style={{ gridColumn: "7 / 13", gridRow: "3 / 4" }} />
            {/* Row 4 — 4 : 4 : 4 */}
            <BentoCell src={img(7).src} alt={img(7).alt} style={{ gridColumn: "1 / 5",  gridRow: "4 / 5" }} />
            <BentoCell src={img(8).src} alt={img(8).alt} style={{ gridColumn: "5 / 9",  gridRow: "4 / 5" }} />
            <BentoCell src={img(9).src} alt={img(9).alt} style={{ gridColumn: "9 / 13", gridRow: "4 / 5" }} />
            {/* Row 5 — 8 : 4 */}
            <BentoCell src={img(10).src} alt={img(10).alt} style={{ gridColumn: "1 / 9",  gridRow: "5 / 6" }} />
            <BentoCell src={img(11).src} alt={img(11).alt} style={{ gridColumn: "9 / 13", gridRow: "5 / 6" }} />
          </div>
        </FadeUp>

        {/* ── Mobile: 2-col grid, 4:3 aspect ratio ── */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {Array.from({ length: 12 }, (_, i) => (
            <BentoCell
              key={i}
              src={img(i).src}
              alt={img(i).alt}
              style={{ aspectRatio: "4/3" }}
            />
          ))}
        </div>

        {/* ── Optional CTA ── */}
        {cta && (
          <FadeUp delay={0.12}>
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
          </FadeUp>
        )}

      </div>
    </section>
  );
}
