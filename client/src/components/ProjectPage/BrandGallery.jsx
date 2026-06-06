import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ─── single bento cell ─── */
function BentoCell({ src, alt = "", label = "", style, color = "#a3e635", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  return (
    <motion.div
      ref={ref}
      style={style}
      className="relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] group cursor-default"
      initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 0 1.5px ${color}60, 0 0 0 3px ${color}12, 0 16px 48px ${color}18`,
      }}
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

      {/* Label reveal on hover — slides up from bottom */}
      {src && (label || alt) && (
        <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <p
            className="text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{ color }}
          >
            {label || alt}
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BrandGallery — 16-slot dynamic bento grid
   Columns AND rows both vary for true bento feel.
   Reusable for any brand identity page.

   Props:
     n           — section number string e.g. "07"
     label       — eyebrow label
     white       — heading first part
     accent      — heading accent part
     description — body text under heading
     images      — array of 16 { src, alt, label } objects
     color       — accent color hex
     cta         — optional { label, to } for a CTA button
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

  /* stagger delay: cap at 0.35s so late cells don't feel disconnected */
  const d = (i) => Math.min(i * 0.04, 0.35);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">

        {/* ── Header ── */}
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

        {/* ── Desktop bento — 16 cells, 6 rows, columns AND rows vary ── */}
        <div
          className="hidden sm:grid gap-3"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "220px 220px 180px 220px 180px 200px",
          }}
        >
          {/* Row 1-2 left anchor — portrait tall */}
          <BentoCell src={img(0).src}  alt={img(0).alt}  label={img(0).label}  color={color} delay={d(0)}  style={{ gridColumn: "1 / 5",  gridRow: "1 / 3" }} />
          {/* Row 1 center + right */}
          <BentoCell src={img(1).src}  alt={img(1).alt}  label={img(1).label}  color={color} delay={d(1)}  style={{ gridColumn: "5 / 9",  gridRow: "1 / 2" }} />
          <BentoCell src={img(2).src}  alt={img(2).alt}  label={img(2).label}  color={color} delay={d(2)}  style={{ gridColumn: "9 / 13", gridRow: "1 / 2" }} />
          {/* Row 2 center */}
          <BentoCell src={img(3).src}  alt={img(3).alt}  label={img(3).label}  color={color} delay={d(3)}  style={{ gridColumn: "5 / 9",  gridRow: "2 / 3" }} />
          {/* Row 2-4 right anchor — portrait tall */}
          <BentoCell src={img(4).src}  alt={img(4).alt}  label={img(4).label}  color={color} delay={d(4)}  style={{ gridColumn: "9 / 13", gridRow: "2 / 4" }} />
          {/* Row 3 — narrower, punchy */}
          <BentoCell src={img(5).src}  alt={img(5).alt}  label={img(5).label}  color={color} delay={d(5)}  style={{ gridColumn: "1 / 4",  gridRow: "3 / 4" }} />
          <BentoCell src={img(6).src}  alt={img(6).alt}  label={img(6).label}  color={color} delay={d(6)}  style={{ gridColumn: "4 / 9",  gridRow: "3 / 4" }} />
          {/* Row 4 left wide + center */}
          <BentoCell src={img(7).src}  alt={img(7).alt}  label={img(7).label}  color={color} delay={d(7)}  style={{ gridColumn: "1 / 6",  gridRow: "4 / 5" }} />
          <BentoCell src={img(8).src}  alt={img(8).alt}  label={img(8).label}  color={color} delay={d(8)}  style={{ gridColumn: "6 / 9",  gridRow: "4 / 5" }} />
          {/* Row 4-6 right anchor — portrait tall */}
          <BentoCell src={img(9).src}  alt={img(9).alt}  label={img(9).label}  color={color} delay={d(9)}  style={{ gridColumn: "9 / 13", gridRow: "4 / 6" }} />
          {/* Row 5 — three cells */}
          <BentoCell src={img(10).src} alt={img(10).alt} label={img(10).label} color={color} delay={d(10)} style={{ gridColumn: "1 / 4",  gridRow: "5 / 6" }} />
          <BentoCell src={img(11).src} alt={img(11).alt} label={img(11).label} color={color} delay={d(11)} style={{ gridColumn: "4 / 7",  gridRow: "5 / 6" }} />
          <BentoCell src={img(12).src} alt={img(12).alt} label={img(12).label} color={color} delay={d(12)} style={{ gridColumn: "7 / 9",  gridRow: "5 / 6" }} />
          {/* Row 6 — three even cells (9/13 free since cell 9 spans 4-6) */}
          <BentoCell src={img(13).src} alt={img(13).alt} label={img(13).label} color={color} delay={d(13)} style={{ gridColumn: "1 / 5",  gridRow: "6 / 7" }} />
          <BentoCell src={img(14).src} alt={img(14).alt} label={img(14).label} color={color} delay={d(14)} style={{ gridColumn: "5 / 9",  gridRow: "6 / 7" }} />
          <BentoCell src={img(15).src} alt={img(15).alt} label={img(15).label} color={color} delay={d(15)} style={{ gridColumn: "9 / 13", gridRow: "6 / 7" }} />
        </div>

        {/* ── Mobile: 2-col, first cell spans full width ── */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {Array.from({ length: 16 }, (_, i) => (
            <BentoCell
              key={i}
              src={img(i).src}
              alt={img(i).alt}
              label={img(i).label}
              color={color}
              delay={d(i)}
              style={{
                aspectRatio: i === 0 ? "16/9" : i === 4 || i === 9 ? "1/1" : "4/3",
                gridColumn: i === 0 ? "1 / 3" : undefined,
              }}
            />
          ))}
        </div>

        {/* ── Optional CTA ── */}
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
    </section>
  );
}
