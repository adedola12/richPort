// src/components/GraphicDesignPage/GraphicOverview.jsx
import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Starfield ─────────────────────────────────────────── */
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

/* ─── Fan positions (back → front) ──────────────────────── */
const FAN_OPEN = [
  { x: -80, y: 32, rotate: -22, scale: 0.85 },
  { x:  -5, y: 14, rotate:  -4, scale: 0.92 },
  { x:  65, y:  0, rotate:  14, scale: 1.00 },
];
const FAN_CLOSED = { x: 0, y: 0, rotate: 0, scale: 0.94 };

/* ─── Card constants — identical to GraphicGallery ──────── */
const T = {
  outerRTop: 14, outerRBottom: 6,
  innerRTop: 10, innerRBottom: 0,
  padX: 10, padTop: 10, padBottom: 0,
  innerRingInset: 6,
  perspective: 760,
  maxRotate: 18,
  maxZRotate: 3,
  popScale: 1.18,
  popLift: 32,
  popZ: 110,
};

function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

/* ─── Single fan card ────────────────────────────────────── */
const OverviewCard = ({ src, fanIdx, inView }) => {
  const wrapperRef = useRef(null);
  const cardRef    = useRef(null);
  const hoveredRef = useRef(false);
  const rafRef     = useRef(null);

  const outerRadius = `${T.outerRTop}px ${T.outerRTop}px ${T.outerRBottom}px ${T.outerRBottom}px`;
  const innerRadius = `${T.innerRTop}px ${T.innerRTop}px ${T.innerRBottom}px ${T.innerRBottom}px`;
  const baseTransform = `perspective(${T.perspective}px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0px) translateZ(0px) scale(1)`;

  // init CSS custom props on mount
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--hx", "50%");
    el.style.setProperty("--hy", "35%");
    el.style.setProperty("--imgZ", "12px");
    el.style.setProperty("--imgScale", "1");
    el.style.setProperty("--ringZ", "52px");
    el.style.transform = baseTransform;
  }, []);

  const applyTilt = useCallback((clientX, clientY) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = clamp((clientX - r.left) / r.width, 0, 1);
    const py = clamp((clientY - r.top)  / r.height, 0, 1);
    const rotY = (px - 0.5) * 2 * T.maxRotate;
    const rotX = (0.5 - py) * 2 * T.maxRotate;
    const roll = (px - 0.5) * 2 * T.maxZRotate;
    el.style.setProperty("--hx", `${px * 100}%`);
    el.style.setProperty("--hy", `${py * 100}%`);
    el.style.setProperty("--imgZ", "30px");
    el.style.setProperty("--imgScale", "1.05");
    el.style.transform = `perspective(${T.perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${roll}deg) translateY(-${T.popLift}px) translateZ(${T.popZ}px) scale(${T.popScale})`;
  }, []);

  const onPointerEnter = useCallback((e) => {
    if (e.pointerType === "touch") return;
    hoveredRef.current = true;
    if (wrapperRef.current) wrapperRef.current.style.zIndex = "60";
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 120ms ease-out, box-shadow 180ms ease-out, border-color 180ms ease-out";
    applyTilt(e.clientX, e.clientY);
  }, [applyTilt]);

  const onPointerMove = useCallback((e) => {
    if (e.pointerType === "touch" || !hoveredRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      el.style.transition = "transform 0ms";
      applyTilt(e.clientX, e.clientY);
    });
  }, [applyTilt]);

  const onPointerLeave = useCallback(() => {
    hoveredRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (wrapperRef.current) wrapperRef.current.style.zIndex = String(fanIdx + 1);
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 380ms cubic-bezier(.2,.8,.2,1), box-shadow 280ms ease-out, border-color 280ms ease-out";
    el.style.transform = baseTransform;
    el.style.setProperty("--hx", "50%");
    el.style.setProperty("--hy", "35%");
    el.style.setProperty("--imgZ", "12px");
    el.style.setProperty("--imgScale", "1");
  }, [baseTransform, fanIdx]);

  const fan = FAN_OPEN[fanIdx];

  return (
    <motion.div
      ref={wrapperRef}
      animate={inView
        ? { x: fan.x, y: fan.y, rotate: fan.rotate, scale: fan.scale }
        : FAN_CLOSED
      }
      transition={{
        duration: 0.80,
        ease: [0.22, 0.61, 0.36, 1],
        delay: inView ? fanIdx * 0.09 : (2 - fanIdx) * 0.05,
      }}
      style={{
        position: "absolute", inset: 0,
        zIndex: fanIdx + 1,
      }}
    >
      {/* ── Outer card shell (matches ImgCard exactly) ── */}
      <div
        ref={cardRef}
        className={[
          "group relative isolate h-full w-full",
          "border border-white/10 bg-white/[0.02]",
          "shadow-[0_22px_70px_rgba(0,0,0,0.70)]",
          "will-change-transform cursor-pointer select-none",
          "hover:border-lime-400/30",
          "hover:shadow-[0_50px_150px_rgba(0,0,0,0.86),0_26px_130px_rgba(34,197,94,0.20)]",
        ].join(" ")}
        style={{ borderRadius: outerRadius, transformStyle: "preserve-3d" }}
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {/* outer top highlight */}
        <div className="pointer-events-none absolute inset-0"
          style={{ borderRadius: outerRadius, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.085)", transform: "translateZ(10px)" }} />

        {/* shine overlay on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            borderRadius: outerRadius,
            backgroundImage: "radial-gradient(320px circle at var(--hx) var(--hy), rgba(255,255,255,0.22), transparent 64%)",
            mixBlendMode: "screen",
            transform: "translateZ(68px)",
          }} />

        {/* frame padding */}
        <div className="relative h-full w-full"
          style={{
            paddingLeft: T.padX, paddingRight: T.padX,
            paddingTop: T.padTop, paddingBottom: T.padBottom,
            transform: "translateZ(26px)", transformStyle: "preserve-3d",
          }}>

          {/* inner card */}
          <div className={[
            "relative h-full w-full overflow-hidden",
            "border border-white/10 bg-black/35",
            "shadow-[0_18px_62px_rgba(0,0,0,0.62)]",
            "transition-colors duration-200",
            "group-hover:border-lime-400/25",
          ].join(" ")}
            style={{ borderRadius: innerRadius, transformStyle: "preserve-3d" }}>

            {/* top lime edge glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-lime-400/35 opacity-85"
              style={{ transform: "translateZ(44px)" }} />

            {/* image — grayscale by default, full color on hover */}
            <img
              src={src} alt="" draggable="false" loading="lazy"
              className={[
                "h-full w-full object-cover",
                "transition duration-500 ease-out",
                "grayscale",
                "group-hover:grayscale-0",
                "group-hover:saturate-[1.34] group-hover:contrast-[1.12] group-hover:brightness-[1.07]",
              ].join(" ")}
              style={{
                transform: "translateZ(var(--imgZ)) scale(var(--imgScale))",
                transformStyle: "preserve-3d",
              }}
            />

            {/* vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_28%,transparent_0%,rgba(0,0,0,0.42)_70%,rgba(0,0,0,0.78)_100%)]"
              style={{ transform: "translateZ(26px)" }} />

            {/* inner ring */}
            <div className="pointer-events-none absolute border border-white/10 transition-colors duration-200 group-hover:border-white/15"
              style={{
                left: T.innerRingInset, right: T.innerRingInset,
                top: T.innerRingInset, bottom: T.innerRingInset,
                borderRadius: innerRadius,
                transform: "translateZ(var(--ringZ))",
              }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── GraphicOverview ────────────────────────────────────── */
export default function GraphicOverview({ data, items = [] }) {
  const sectionRef = useRef(null);
  // once:false so it re-triggers every time the section enters/leaves viewport
  const inView = useInView(sectionRef, { once: false, amount: 0.25 });

  // pick 3 images spaced evenly across the gallery
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
    // No overflow:hidden — lets fan cards bleed slightly AND keeps whileInView working
    <section ref={sectionRef} className="relative bg-[#070707]">
      <Starfield />

      {/* subtle lime glow behind cards */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
        style={{
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(132,204,22,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }} />

      <div className="relative z-10 mx-auto w-full max-w-[980px] px-4 sm:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-[920px]">
          <div className="grid items-center gap-12 md:gap-16 md:grid-cols-[1fr_320px]">

            {/* ── Text column ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 + idx * 0.1 }}
                    className="text-[15px] sm:text-[16px] leading-[1.7] text-white/65 max-w-[540px]"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* ── Card fan column ── */}
            <div className="flex justify-center md:justify-end">
              {/*
                Container sets the base size of each card.
                Cards use position:absolute inset:0 and fan OUTSIDE this box
                — no overflow:hidden anywhere in this chain.
              */}
              <div className="relative" style={{ width: 240, height: 310 }}>
                {cardImages.slice(0, 3).map((src, i) => (
                  <OverviewCard key={i} src={src} fanIdx={i} inView={inView} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
