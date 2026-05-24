// src/components/GraphicDesignPage/GraphicOverview.jsx
import React, { useRef, useCallback, useMemo } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";

/* ─── Starfield (same pattern as Testimonials) ─────────── */
const mkLCG = (s) => { s = s>>>0; return () => { s=(Math.imul(s,1664525)+1013904223)>>>0; return s/0x100000000; }; };
const rng = mkLCG(0xf00dc0de);
const STARS = Array.from({length: 55}, () => ({
  x: rng()*100, y: rng()*100, r: 0.5+rng()*1.4,
  op: 0.06+rng()*0.18, dur: 2.5+rng()*5, delay: rng()*4,
}));

const Starfield = () => (
  <svg aria-hidden="true" className="pointer-events-none absolute inset-0"
    style={{width:"100%",height:"100%",zIndex:0}}>
    {STARS.map((s,i) => (
      <motion.circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white"
        animate={{opacity:[s.op, s.op*3.5, s.op]}}
        transition={{duration:s.dur, delay:s.delay, repeat:Infinity, ease:"easeInOut"}} />
    ))}
  </svg>
);

/* ─── Fan positions (back → front) ────────────────────── */
const FAN = [
  { rotate: -16, x: -54, y: 22,  scale: 0.86, zIndex: 1 },
  { rotate:  -4, x: -12, y:  8,  scale: 0.93, zIndex: 2 },
  { rotate:   9, x:  28, y:  0,  scale: 1.00, zIndex: 3 },
];
const STACKED = { rotate: 0, x: 0, y: 0, scale: 0.92 };

/* ─── Single design card ───────────────────────────────── */
const DesignCard = ({ src, idx, inView }) => {
  const innerRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 260, damping: 32 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 260, damping: 32 });

  const handleMove = useCallback((e) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  }, [mx, my]);

  const handleLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      animate={inView ? FAN[idx] : STACKED}
      transition={{
        duration: 0.80,
        ease: [0.22, 0.61, 0.36, 1],
        delay: inView ? idx * 0.08 : (2 - idx) * 0.05,
      }}
      style={{ position: "absolute", inset: 0, zIndex: FAN[idx].zIndex }}
    >
      <motion.div
        ref={innerRef}
        style={{
          width: "100%", height: "100%",
          rotateX: rotX, rotateY: rotY,
          transformStyle: "preserve-3d",
          perspective: 900,
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div style={{
          width: "100%", height: "100%",
          borderRadius: "14px 14px 6px 6px",
          overflow: "hidden",
          boxShadow: [
            "0 28px 72px rgba(0,0,0,0.78)",
            "0 0 0 1px rgba(255,255,255,0.07) inset",
            "0 0 40px rgba(132,204,22,0.12)",
            "0 2px 8px rgba(132,204,22,0.06)",
          ].join(", "),
        }}>
          <img
            src={src} alt="" draggable="false"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── GraphicOverview ──────────────────────────────────── */
export default function GraphicOverview({ data, items = [] }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.25 });

  // Pick 3 images spaced across the gallery for visual variety
  const cardImages = useMemo(() => {
    if (!items.length) return [];
    const len = items.length;
    return [
      items[0],
      items[Math.floor(len / 3)],
      items[Math.floor((2 * len) / 3)],
    ].map((item) => item?.src).filter(Boolean);
  }, [items]);

  return (
    <section ref={sectionRef} className="relative bg-[#070707] overflow-hidden">
      <Starfield />

      {/* ambient lime glow — right side near cards */}
      <div
        className="pointer-events-none absolute right-[-80px] top-1/2 -translate-y-1/2"
        style={{
          width: 480, height: 480,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(132,204,22,0.055) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[980px] px-4 sm:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-[920px]">
          <div className="grid items-center gap-12 md:gap-16 md:grid-cols-[1fr_300px]">

            {/* ── Text ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <h2 className="font-['Outfit'] text-[28px] sm:text-[32px] font-semibold text-white">
                {data?.overviewTitle || "Overview"}
              </h2>

              <div className="mt-5 space-y-5">
                {(data?.overviewText || []).map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 0.61, 0.36, 1],
                      delay: 0.1 + idx * 0.1,
                    }}
                    className="text-[15px] sm:text-[16px] leading-[1.7] text-white/65 max-w-[540px]"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* ── Card fan ── */}
            <div className="flex justify-center md:justify-end">
              {/* Extra padding so fanned cards aren't clipped */}
              <div className="relative" style={{ width: 240, height: 300, padding: "0 40px 20px 60px" }}>
                <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
                  {cardImages.slice(0, 3).map((src, i) => (
                    <DesignCard key={i} src={src} idx={i} inView={inView} />
                  ))}

                  {/* fallback placeholder when no gallery items passed */}
                  {cardImages.length === 0 && (
                    <div className="absolute inset-0 rounded-[14px_14px_6px_6px] bg-white/5 border border-white/10" />
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
