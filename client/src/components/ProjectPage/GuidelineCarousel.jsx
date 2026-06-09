import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/* detect the Tailwind `sm` breakpoint (640px) so the carousel can switch from
   horizontal scrolling on desktop to vertical scrolling on mobile */
function useIsMobile() {
  const query = "(max-width: 639px)";
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(query).matches
      : false
  );
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    try {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } catch {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);
  return isMobile;
}

/* ─── single slide card — separate component so it can call hooks ─── */
function SlideCard({ slide, index, rawIndex, isMobile }) {
  // desktop: cards fan out horizontally (translateX, 55vw apart)
  // mobile:  cards stack vertically (translateY, 50vw apart) → scroll up/down
  // scale 0.72 + blur 14px = strong depth-behind effect; revolves smoothly into center
  const x = useTransform(rawIndex, v => (isMobile ? 0 : `${(index - v) * 55}vw`));
  const y = useTransform(rawIndex, v => (isMobile ? `${(index - v) * 50}vw` : 0));
  const scale = useTransform(rawIndex, v => Math.max(0.72, 1 - Math.min(Math.abs(index - v), 1) * 0.28));
  const opacity = useTransform(rawIndex, v => {
    const d = Math.abs(index - v);
    if (d > 1.6) return 0;
    return Math.max(0.60, 1 - d * 0.40);
  });
  const blur = useTransform(rawIndex, v => {
    const d = Math.min(Math.abs(index - v), 1);
    return `blur(${d * 14}px)`;
  });
  const zIndex = useTransform(rawIndex, v =>
    Math.round(20 - Math.abs(index - v) * 10)
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        margin: "0 auto",
        width: isMobile ? "88%" : "65%",
        maxWidth: isMobile ? "560px" : "900px",
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        x,
        y,
        scale,
        opacity,
        filter: blur,
        zIndex,
      }}
    >
      <div className="w-full aspect-video rounded-lg sm:rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.75)] border border-white/10">
        {slide.src ? (
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-white/[0.03] flex flex-col items-center justify-center gap-3 px-10">
            <div className="w-10 h-10 rounded-full border border-dashed border-white/15 flex items-center justify-center">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M3 16l5-5 4 4 3-3 6 6" />
              </svg>
            </div>
            <p className="text-[11px] text-white/20 text-center leading-relaxed max-w-[300px]">{slide.alt}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── main carousel ─── */
export default function GuidelineCarousel({
  slides = [],
  n = "06",
  label = "THE GUIDELINE",
  white = "The system,",
  accent = "documented",
  description = "Everything captured in a brand guideline — the single source of truth.",
  color = "#a3e635",
}) {
  /* only use slides that have an actual image */
  const filledSlides = slides.filter((s) => s.src);
  const hasContent = filledSlides.length > 0;
  const activeSlides = hasContent ? filledSlides : slides;

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  /* scroll drives the carousel */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(1, activeSlides.length - 1)]);

  useMotionValueEvent(rawIndex, "change", v => {
    setActiveIndex(Math.round(v));
  });

  /* gentle fade-in as section enters viewport */
  const { scrollYProgress: entryProg } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.25"],
  });
  const entryOpacity = useTransform(entryProg, [0, 1], [0, 1]);

  /* jump to slide by scrolling */
  const goTo = (i) => {
    const el = containerRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + (i / Math.max(1, activeSlides.length - 1)) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative border-t border-white/5"
      style={{ height: `${activeSlides.length * 100}vh` }}
    >
      <motion.div
        className="sticky top-0 h-screen overflow-hidden flex flex-col"
        style={{ opacity: entryOpacity }}
      >

        {/* ── header ── */}
        <div className="px-4 sm:px-8 lg:px-16 pt-12 pb-3 shrink-0 max-w-[1100px] mx-auto w-full">
          <p
            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color }}
          >
            {n} — {label}
          </p>
          <h2 className="text-3xl sm:text-[44px] font-semibold leading-tight tracking-[-0.03em] mb-3">
            <span className="text-white">{white} </span>
            <span style={{ color }}>{accent}</span>
          </h2>
          <p className="text-[15px] leading-[1.65] text-white/50 max-w-[560px]">{description}</p>
        </div>

        {/* ── slide track ── */}
        <div className="relative flex-1 w-full overflow-hidden">
          {activeSlides.map((slide, i) => (
            <SlideCard
              key={`${i}-${isMobile ? "m" : "d"}`}
              slide={slide}
              index={i}
              rawIndex={rawIndex}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* ── footer: counter + dots + mobile arrows ── */}
        <div className="shrink-0 pb-6 pt-2">
          {/* slide counter */}
          <p className="text-center text-[11px] font-mono text-white/25 mb-3 tracking-widest">
            {String(activeIndex + 1).padStart(2, "0")} / {String(activeSlides.length).padStart(2, "0")}
          </p>

          {/* progress dots */}
          <div className="flex items-center justify-center gap-2">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: i === activeIndex ? "20px" : "6px",
                  height: "6px",
                  background: i === activeIndex ? color : "rgba(255,255,255,0.18)",
                  opacity: i === activeIndex ? 1 : 0.7,
                }}
              />
            ))}
          </div>

          {/* mobile prev/next arrows */}
          <div className="sm:hidden flex items-center justify-center gap-4 mt-5">
            <button
              onClick={() => goTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-white/5 text-white/60 disabled:opacity-25 transition-opacity"
            >
              ←
            </button>
            <span className="text-[11px] text-white/30 font-mono tabular-nums">
              {activeIndex + 1} of {slides.length}
            </span>
            <button
              onClick={() => goTo(Math.min(activeSlides.length - 1, activeIndex + 1))}
              disabled={activeIndex === activeSlides.length - 1}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-white/5 text-white/60 disabled:opacity-25 transition-opacity"
            >
              →
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
