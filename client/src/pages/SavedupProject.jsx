// src/pages/SavedupProject.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useInView } from "framer-motion";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

const GR = "#a3e635"; // lime-400 — portfolio accent

/* ─── reveal hook ───
   Reveals content when scrolled into view. Guards against the SPA-navigation
   race (AnimatePresence mode="wait" + Lenis) where the IntersectionObserver
   can miss already-on-screen content on mount, leaving this tall page stuck at
   opacity:0 until a manual refresh. Shortly after mount we re-check the rect
   and reveal anything genuinely in the viewport; below-the-fold content still
   waits for a real scroll, so scroll-triggered animations are preserved. */
const useReveal = (amount = 0) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (isInView || shown) return;
    const t = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) setShown(true);
    }, 250);
    return () => clearTimeout(t);
  }, [isInView, shown]);
  return [ref, isInView || shown];
};

/* ─── animation primitives (same pattern as YDpay) ─── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const [ref, show] = useReveal(0);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

const SlideIn = ({ children, direction = "left", delay = 0, className = "" }) => {
  const [ref, show] = useReveal(0);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: direction === "left" ? -40 : 40 }}
      animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === "left" ? -40 : 40 }}
      transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

const StaggerGrid = ({ children, className = "" }) => {
  const [ref, show] = useReveal(0);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 24, scale: 0.97 },
      visible: { opacity: 1, y: 0, scale: 1 },
    }}
    transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ─── section eyebrow ─── */
const SLabel = ({ n, t }) => (
  <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: GR }}>
    {n} — {t}
  </p>
);

/* ─── two-tone section heading ─── */
const H2 = ({ white, accent, accentColor = GR }) => (
  <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em]">
    <span className="text-white">{white} </span>
    <span style={{ color: accentColor }}>{accent}</span>
  </h2>
);

/* ─── 3D tilt image frame ─── */
const TiltFrame = ({ src, alt = "", className = "", style = {}, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 280, damping: 28 });
  const scale = useSpring(1, { stiffness: 280, damping: 28 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); scale.set(1); };
  const onEnter = () => scale.set(1.04);

  return (
    <div
      className={`${className} ${onClick ? "cursor-pointer group" : ""}`}
      style={{ perspective: "900px" }}
      onClick={onClick}
    >
      <motion.div
        ref={ref}
        className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 relative h-full mx-auto"
        style={{ ...style, rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={onEnter}
        whileHover={{ boxShadow: "0 0 48px 10px rgba(163,230,53,0.18), 0 24px 60px rgba(0,0,0,0.55)" }}
        transition={{ boxShadow: { duration: 0.35 } }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        {onClick && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/25">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/50 backdrop-blur-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

/* ─── persona accordion ─── */
const PersonaSection = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-3" style={{ height: 540 }}>
      {PERSONAS.map((p, i) => {
        const isActive = i === active;
        return (
          <motion.div
            key={p.name}
            layout
            animate={{ flex: isActive ? 2 : 1 }}
            transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden shrink-0 cursor-pointer border border-white/10"
            style={{ minWidth: 0 }}
            onHoverStart={() => setActive(i)}
          >
            {/* background image */}
            <img
              src={p.img}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-cover object-top select-none"
              draggable={false}
            />

            {/* gradient overlay — strong at bottom for text contrast */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to top, #07090C 0%, rgba(7,9,12,0.82) 35%, rgba(7,9,12,0.3) 65%, rgba(7,9,12,0.05) 100%)",
              }}
            />

            {/* lime glow ring on active */}
            {isActive && (
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(163,230,53,0.3), 0 0 40px 8px rgba(163,230,53,0.12)" }}
              />
            )}

            {/* collapsed label */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  key="label"
                  className="absolute bottom-0 left-0 right-0 px-5 py-5 pointer-events-none"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="text-[19px] font-bold text-white leading-tight">{p.name}</p>
                  <p className="text-[13px] mt-1 font-medium" style={{ color: GR }}>{p.subtitle}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* expanded panel */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="panel"
                  className="absolute bottom-0 left-0 right-0 px-6 py-6 pointer-events-none"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <p className="text-[10px] tracking-[0.28em] uppercase mb-2" style={{ color: GR }}>
                    User Persona
                  </p>
                  <p className="text-[26px] font-bold text-white leading-tight tracking-[-0.02em] mb-1">
                    {p.name}
                  </p>
                  <p className="text-[13px] font-medium mb-4" style={{ color: GR }}>
                    {p.subtitle}
                  </p>
                  <p className="text-[15px] leading-[1.7] text-white/70">
                    {p.about}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ─── gallery images (section 04 onward, in page order) ─── */
const GALLERY = [
  { src: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321010/richard_portfolio/ui-projects/tegxgoipmyvxara0geo6.jpg", alt: "Product Strategy" },
  { src: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321049/richard_portfolio/ui-projects/jigcblx6xhr1gp2lzyn4.jpg", alt: "Goal-Based Savings" },
  { src: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321056/richard_portfolio/ui-projects/pvpc21jwfafqngmkziat.jpg", alt: "AI-Driven Budgeting" },
  { src: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321093/richard_portfolio/ui-projects/v4ya1xzvcnsqdvalhsyf.jpg", alt: "Peer & Group Savings" },
  { src: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321097/richard_portfolio/ui-projects/kti7cjgyvdsuyibiuauh.jpg", alt: "Save in Dollars" },
  { src: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321099/richard_portfolio/ui-projects/iidufeh4dlsgqz2ejnbs.jpg", alt: "Invest" },
  { src: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321101/richard_portfolio/ui-projects/gebzfxi0fzh8vf0zr6zh.jpg", alt: "User Flows" },
  { src: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321127/richard_portfolio/ui-projects/aye1thg8uiy8yqwr6zo2.jpg", alt: "Testing & Iteration" },
  { src: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321160/richard_portfolio/ui-projects/cur36f9nkjqqpdyovmbv.jpg", alt: "Impact & Metrics" },
];

/* ─── content ─── */
const HERO_IMG =
  "https://res.cloudinary.com/dirgfivvb/image/upload/v1769320865/richard_portfolio/ui-projects/nhjprdndluq6dbch0j27.jpg";

const FEATURES = [
  {
    n: "01",
    name: "Goal-Based Savings",
    desc: "Users create savings goals tied to real post-school plans—relocation, education, or business setup. Progress tracking reinforces commitment and clarity. Goals are framed around outcomes, not amounts, to keep motivation high.",
    img: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321049/richard_portfolio/ui-projects/jigcblx6xhr1gp2lzyn4.jpg",
  },
  {
    n: "02",
    name: "AI-Driven Budgeting",
    desc: "Every withdrawal is categorized and analyzed to help users understand spending patterns and reduce reckless behavior. The feedback is informative, not judgmental, to encourage habit change without discouragement.",
    img: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321056/richard_portfolio/ui-projects/pvpc21jwfafqngmkziat.jpg",
  },
  {
    n: "03",
    name: "Peer & Group Savings",
    desc: "Users can save with friends or peers for shared accountability and motivation. Social pressure is positioned as support, not comparison, to prevent unhealthy competition. Users can also connect with financial experts for guidance.",
    img: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321093/richard_portfolio/ui-projects/v4ya1xzvcnsqdvalhsyf.jpg",
  },
  {
    n: "04",
    name: "Save in Dollars",
    desc: "Currency fluctuation is a common challenge in emerging economies. SavedUp allows users to save in dollars, protecting funds from currency depreciation. This feature is surfaced contextually for users with long-term or international goals.",
    img: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321097/richard_portfolio/ui-projects/kti7cjgyvdsuyibiuauh.jpg",
  },
  {
    n: "05",
    name: "Invest",
    desc: "The investment feature helps users not only invest but also become familiar with core concepts like stocks and long-term wealth growth. By making investment accessible early, SavedUp empowers users to develop informed financial habits.",
    img: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321099/richard_portfolio/ui-projects/iidufeh4dlsgqz2ejnbs.jpg",
  },
];

const PERSONAS = [
  {
    name: "Daniel",
    subtitle: "The Transitioning Graduate",
    img: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321181/richard_portfolio/ui-projects/nfspmsolbhjrqgah6dev.jpg",
    enabled: true,
    about:
      "Daniel Adeyemi is a 24-year-old recent graduate preparing for NYSC. She earns an irregular income from freelance work and small side gigs, which makes saving inconsistent. Tolu wants to save enough capital to launch an online thrift business and relocate after service, but she often dips into her savings when cash flow is tight. She needs a structured way to save toward clear post-school goals, gain visibility into her spending habits, and stay motivated despite unpredictable income.",
  },
  {
    name: "Tolu",
    subtitle: "The Long-Term Planner",
    img: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321199/richard_portfolio/ui-projects/jenbh0glhswjxqwscfy7.jpg",
    enabled: true,
    about:
      "Tolu Badejo is a 20-year-old 200-level Computer Science student who receives a monthly allowance and occasionally earns from freelance work. She is intentionally saving over several years to fund a master's degree and eventual relocation abroad. While disciplined at the start, Tolu struggles to stay committed to such long-term goals and worries about the impact of currency depreciation on her savings.",
  },
  {
    name: "Chinedu",
    subtitle: "The Career Starter",
    img: "https://res.cloudinary.com/dirgfivvb/image/upload/v1769321202/richard_portfolio/ui-projects/d0bucasjr8kjiazeybvz.jpg",
    enabled: true,
    about:
      "Chinedu Okafor is a 20-year-old 200-level Computer Science student who receives a monthly allowance and occasionally earns from freelance work. He is intentionally saving over several years to fund a master's degree and eventual relocation abroad. While disciplined at the start, Chinedu struggles to stay committed to such long-term goals and worries about the impact of currency depreciation on his savings.",
  },
];

/* ─── lightbox carousel ─── */
const Lightbox = ({ images, startIndex, onClose }) => {
  const [idx, setIdx] = useState(startIndex);
  const [dir, setDir] = useState(0);

  const go = useCallback((d) => {
    setDir(d);
    setIdx(i => (i + d + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const stop = (e) => e.stopPropagation();

  const btnCls = "flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(5,5,5,0.97)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* centred image box — CSS transform centering, never fails */}
      <div
        onClick={stop}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw", maxWidth: 1100,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={idx}
            src={images[idx].src}
            alt={images[idx].alt}
            draggable={false}
            initial={{ opacity: 0, x: dir >= 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir >= 0 ? -50 : 50 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              display: "block",
              width: "100%",
              maxHeight: "82vh",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "0 32px 80px rgba(0,0,0,0.85)",
            }}
          />
        </AnimatePresence>
      </div>

      {/* prev */}
      <button
        onClick={(e) => { stop(e); go(-1); }}
        style={{ position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)", width: 48, height: 48, fontSize: 28 }}
        className={btnCls}
      >‹</button>

      {/* next */}
      <button
        onClick={(e) => { stop(e); go(1); }}
        style={{ position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)", width: 48, height: 48, fontSize: 28 }}
        className={btnCls}
      >›</button>

      {/* close */}
      <button
        onClick={(e) => { stop(e); onClose(); }}
        style={{ position: "absolute", top: 24, right: 24, width: 40, height: 40 }}
        className={btnCls}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M1 1l11 11M12 1L1 12"/>
        </svg>
      </button>

      {/* counter */}
      <div
        onClick={stop}
        style={{ position: "absolute", top: 28, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "0.18em", fontWeight: 500 }}
      >
        {String(idx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>

      {/* label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          onClick={stop}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.28 }}
          style={{ position: "absolute", bottom: 68, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.05em", whiteSpace: "nowrap" }}
        >
          {images[idx].alt}
        </motion.p>
      </AnimatePresence>

      {/* dots */}
      <div
        onClick={stop}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, alignItems: "center" }}
      >
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={(e) => { stop(e); setIdx(i); }}
            animate={{ width: i === idx ? 20 : 6, opacity: i === idx ? 1 : 0.3, backgroundColor: i === idx ? GR : "#ffffff" }}
            transition={{ duration: 0.3 }}
            style={{ height: 6, borderRadius: 9999, border: "none", cursor: "pointer", padding: 0 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
const SavedupProject = () => {
  const [lightbox, setLightbox] = useState(null);
  const openLightbox = useCallback((i) => setLightbox(i), []);

  return (
  <div className="relative min-h-screen bg-[#07090C] text-white overflow-x-hidden font-['Outfit']">
    <PageMeta
      title="Savedup — UI/UX Case Study"
      description="A detailed UI/UX case study on Savedup — a savings app designed to help users build disciplined saving habits through smart visual feedback."
      url="/ui-projects/savedup"
    />

    {/* ambient glows */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]"
        style={{ background: `${GR}0D` }} />
      <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: `${GR}09` }} />
    </div>

    <div className="relative z-10">

      {/* ══ HERO ══ */}
      <section className="relative pt-28 pb-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(163,230,53,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="relative max-w-[1100px] mx-auto">
          {/* back + eyebrow row */}
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-[12px] text-white/60 hover:bg-white/10 transition backdrop-blur-md"
              >
                ← Back
              </Link>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                style={{ borderColor: `${GR}44`, color: GR, background: `${GR}0D` }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: GR }} />
                UI / UX Case Study · Retrospective
              </span>
            </div>
          </FadeUp>

          {/* headline */}
          <FadeUp delay={0.1}>
            <h1
              className="text-5xl sm:text-6xl lg:text-[72px] font-semibold leading-[0.95] tracking-[-0.03em] mb-5"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #7a7a7a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Savedup
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-[1.65] text-white/55 max-w-[580px] mb-4">
              Designing a student-focused savings and budgeting platform for life after school.
            </p>
            <p className="text-[15px] leading-[1.65] text-white/35 max-w-[560px] mb-10">
              A look back at my first UI/UX project — and what I'd do differently today.
            </p>
          </FadeUp>

          {/* hero image */}
          <FadeUp delay={0.2}>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(163,230,53,0.08)]">
              <div className="pointer-events-none absolute inset-[-1px] rounded-[inherit] bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(163,230,53,0.12)_0%,transparent_70%)]" />
              <img
                src={HERO_IMG}
                alt="Savedup hero"
                className="w-full object-cover"
                style={{ maxHeight: "60vh", objectPosition: "top" }}
                loading="eager"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ 01 — THE BRIEF ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">

          {/* stats row */}
          <FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/8 mb-14">
              {[
                { label: "TIMELINE",  value: "10 weeks" },
                { label: "DATE",      value: "Aug 2023" },
                { label: "PLATFORM",  value: "Mobile", accent: true },
                { label: "MY ROLE",   value: "Product Designer" },
              ].map(({ label, value, accent }) => (
                <div key={label} className="sm:px-8 first:pl-0">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1">{label}</p>
                  <p className={`text-xl sm:text-2xl font-bold ${accent ? "" : "text-white"}`}
                    style={accent ? { color: GR } : {}}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeUp>
              <SLabel n="01" t="THE BRIEF" />
              <H2 white="Overview of" accent="the project" />
              <div className="mt-5 mb-6 h-[2px] w-16 rounded-full" style={{ background: GR }} />
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-5 text-justify">
                SavedUp is a mobile savings and budgeting platform designed to help university students and recent graduates prepare financially for life after school. Unlike traditional savings apps that focus on short-term goals, SavedUp is centred on post-school outcomes—relocation, further education, business setup, and career transition.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8 text-justify">
                The product helps students build disciplined saving habits early, giving them structure, accountability, and visibility into long-term financial goals.
              </p>

              <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">DELIVERABLES</p>
              <div className="flex flex-wrap gap-2">
                {["End-to-End Product Design", "UX Research", "User Personas", "User Flows", "Wireframing", "High-Fidelity UI", "Usability Testing"].map(t => (
                  <span key={t} className="rounded-md border px-2.5 py-1 text-[11px] font-semibold"
                    style={{ borderColor: `${GR}44`, color: GR, background: `${GR}0D` }}>
                    {t}
                  </span>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">MY ROLE</p>
                <p className="text-[17px] font-semibold text-white mb-1">Solo Product Designer</p>
                <p className="text-[15px] leading-[1.65] text-white/50 mb-5">
                  Concept, research, flows, and UI — end to end. This was my first UI/UX project, used to learn product thinking and prototyping from scratch:
                </p>
                <ul className="space-y-2.5">
                  {[
                    "UX research & synthesis",
                    "User personas",
                    "User flows & information architecture",
                    "UX writing",
                    "Wireframing & high-fidelity UI design",
                    "Usability testing and iteration",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-white/60">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GR }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ 02 — THE PROBLEM ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-end">
            <FadeUp delay={0.1}>
              <SLabel n="02" t="THE PROBLEM" />
              <H2 white="What's the" accent="problem?" accentColor="#E05252" />
              <div className="mt-5 mb-6 h-[2px] w-16 rounded-full" style={{ background: "#E05252" }} />
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                Most students graduate without meaningful financial preparation for life after school. From research and real-world observation, three core issues stood out.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    n: "01",
                    title: "No dedicated savings system",
                    desc: "Students lack a system for saving toward long-term, post-school goals. Existing tools are too generic.",
                  },
                  {
                    n: "02",
                    title: "Poor financial habits",
                    desc: "Habits formed during school often lead to mismanaged spending and delayed independence after graduation.",
                  },
                  {
                    n: "03",
                    title: "Overwhelming transitions",
                    desc: "Funding major transitions—relocation, further education, or starting a business—feels unstructured and stressful.",
                  },
                ].map(({ n, title, desc }) => (
                  <li key={n} className="flex items-start gap-4 rounded-2xl border border-[#E0525222] bg-[#1A0A0A] p-5">
                    <span className="shrink-0 w-7 h-7 rounded-full border border-[#E0525244] flex items-center justify-center text-[10px] font-bold text-[#E05252]">{n}</span>
                    <div>
                      <p className="text-[14px] font-semibold text-white mb-1">{title}</p>
                      <p className="text-[15px] leading-[1.65] text-white/50">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <SlideIn direction="right" delay={0.15}>
              <TiltFrame
                src="https://res.cloudinary.com/dirgfivvb/image/upload/v1769321006/richard_portfolio/ui-projects/vgfxar39qrwnkpa4cgoe.jpg"
                alt="Problem illustration"
                className="w-full"
                style={{ aspectRatio: "4/5" }}
              />
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ══ 03 — RESEARCH ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="03" t="RESEARCH & INSIGHTS" />
            <H2 white="What the" accent="data showed" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[600px]">
              Research combined surveys, informal interviews, and usability testing to validate the problem and shape the product strategy.
            </p>
          </FadeUp>

          <div className="mt-12 grid lg:grid-cols-[1fr_340px] gap-6 items-stretch">

            {/* ── Competitive table ── */}
            <SlideIn direction="left" delay={0.1} className="h-full">
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden h-full flex flex-col">
                <div className="px-5 py-4 border-b border-white/8">
                  <p className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: GR }}>
                    Competitive Advantage
                  </p>
                </div>
                <div className="overflow-x-auto flex-1">
                  <table className="w-full h-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/8">
                        <th className="px-5 py-3 text-[11px] font-semibold text-white/40 w-[44%]">Feature</th>
                        <th className="px-3 py-3 text-[11px] font-semibold text-center" style={{ color: GR }}>SavedUp</th>
                        <th className="px-3 py-3 text-[11px] font-semibold text-white/40 text-center">PiggyVest</th>
                        <th className="px-3 py-3 text-[11px] font-semibold text-white/40 text-center">Cowrywise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: "After-School Focused Savings", s: true,  p: false, c: false },
                        { feature: "AI-Driven Budgeting & Insights", s: true, p: false, c: false },
                        { feature: "Target / Goal-Based Savings",   s: true,  p: true,  c: true  },
                        { feature: "Group Savings",                  s: true,  p: false, c: false },
                        { feature: "SafeLock (Locked Savings)",      s: true,  p: true,  c: true  },
                        { feature: "Investments",                    s: true,  p: false, c: false },
                        { feature: "Community & Marketplace",        s: true,  p: false, c: false },
                        { feature: "Gamification (Streaks & Rewards)", s: true, p: true, c: true },
                      ].map(({ feature, s, p, c }, i) => (
                        <tr key={feature} className={i % 2 === 0 ? "bg-white/[0.015]" : ""}>
                          <td className="px-5 py-3 text-[15px] text-white/70">{feature}</td>
                          <td className="px-3 py-3 text-center text-[15px]">{s ? "✅" : "❌"}</td>
                          <td className="px-3 py-3 text-center text-[15px]">{p ? "✅" : "❌"}</td>
                          <td className="px-3 py-3 text-center text-[15px]">{c ? "✅" : "❌"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </SlideIn>

            {/* ── Insights panel ── */}
            <SlideIn direction="right" delay={0.2} className="h-full">
              <div className="flex flex-col gap-4 h-full">

                {/* Donut chart — 78.65% validation */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 flex-1 flex flex-col justify-center">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">PROBLEM VALIDATION</p>
                  <div className="flex items-center gap-5">
                    <div className="relative shrink-0 w-[90px] h-[90px]">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                        <motion.circle
                          cx="50" cy="50" r="38"
                          fill="none"
                          stroke={GR}
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray="238.76"
                          initial={{ strokeDashoffset: 238.76 }}
                          whileInView={{ strokeDashoffset: 238.76 * (1 - 0.7865) }}
                          viewport={{ once: false, amount: 0.5 }}
                          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[15px] font-black" style={{ color: GR }}>78%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-white leading-tight mb-1">of students</p>
                      <p className="text-[15px] leading-[1.6] text-white/50">validated the problem — confirming no student-specific savings solution existed.</p>
                    </div>
                  </div>
                </div>

                {/* Feature coverage bars */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 flex-1 flex flex-col justify-center">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">FEATURE COVERAGE</p>
                  <div className="space-y-3">
                    {[
                      { label: "SavedUp",   pct: 100, color: GR },
                      { label: "PiggyVest", pct: 37.5, color: "#60A5FA" },
                      { label: "Cowrywise", pct: 37.5, color: "#A78BFA" },
                    ].map(({ label, pct, color }) => (
                      <div key={label}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[12px] text-white/60">{label}</span>
                          <span className="text-[11px] font-bold" style={{ color }}>{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key themes */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 flex-1 flex flex-col justify-center">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">KEY THEMES FROM RESEARCH</p>
                  <StaggerGrid className="space-y-2">
                    {[
                      { dot: GR,        text: "Accountability & discipline" },
                      { dot: "#60A5FA", text: "Motivation over restriction" },
                      { dot: "#A78BFA", text: "Visible progress drives commitment" },
                      { dot: "#F59E0B", text: "Long-term goal clarity is critical" },
                    ].map(({ dot, text }) => (
                      <StaggerItem key={text}>
                        <div className="flex items-center gap-2.5 text-[15px] text-white/60">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
                          {text}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerGrid>
                </div>

              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ══ 04 — PRODUCT STRATEGY ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
            <FadeUp delay={0.1}>
              <SLabel n="04" t="PRODUCT STRATEGY" />
              <H2 white="Defining the" accent="strategy" />
              <div className="mt-5 mb-6 h-[2px] w-16 rounded-full" style={{ background: GR }} />
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                SavedUp was designed around one core principle: <strong className="text-white">Help students save with purpose, structure, and accountability for life after school.</strong>
              </p>

              <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">THREE STRATEGIC DECISIONS</p>
              <ul className="space-y-4">
                {[
                  {
                    n: "01",
                    title: "Goal-based savings",
                    desc: "Focus on outcomes tied to real post-school plans, not generic wallets.",
                  },
                  {
                    n: "02",
                    title: "Behavioural design",
                    desc: "Use streaks, progress indicators, and feedback loops to build saving consistency.",
                  },
                  {
                    n: "03",
                    title: "Multi-currency support",
                    desc: "Support both local and dollar savings to address inflation and currency concerns in emerging economies.",
                  },
                ].map(({ n, title, desc }) => (
                  <li key={n} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                    <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: `${GR}20`, color: GR }}>
                      {n}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-white mb-0.5">{title}</p>
                      <p className="text-[15px] leading-[1.65] text-white/50">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <SlideIn direction="right" delay={0.2}>
              <TiltFrame
                src="https://res.cloudinary.com/dirgfivvb/image/upload/v1769321010/richard_portfolio/ui-projects/tegxgoipmyvxara0geo6.jpg"
                alt="Product strategy"
                className="w-full"
                style={{ aspectRatio: "4/5" }}
                onClick={() => openLightbox(0)}
              />
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ══ 05 — KEY FEATURES ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="05" t="KEY FEATURES" />
            <H2 white="Core features &" accent="design decisions" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[560px]">
              Five core features, each built around a specific user behaviour challenge — not just functionality for its own sake.
            </p>
          </FadeUp>

          <div className="mt-12 space-y-6">
            {FEATURES.map(({ n, name, desc, img }, i) => {
              const isEven = i % 2 === 0;
              return (
                <FadeUp key={n} delay={0.05 * i}>
                  <div className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-center ${isEven ? "" : "lg:[&>*:first-child]:order-2"}`}>
                    {/* text */}
                    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 sm:p-8 h-full flex flex-col justify-center">
                      <span className="inline-block rounded-md px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase mb-4 w-fit"
                        style={{ background: `${GR}15`, color: GR }}>
                        FEATURE {n}
                      </span>
                      <h3 className="text-[22px] sm:text-[26px] font-semibold text-white leading-tight tracking-[-0.02em] mb-3">
                        {name}
                      </h3>
                      <p className="text-[15px] leading-[1.7] text-white/55">{desc}</p>
                    </div>
                    {/* image — 4:5 portrait on mobile → 16:9 on sm+ */}
                    <div className="w-full aspect-[4/5] sm:aspect-[16/9]">
                      <TiltFrame
                        src={img}
                        alt={name}
                        className="w-full h-full"
                        onClick={() => openLightbox(i + 1)}
                      />
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ USER PERSONAS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="06" t="USER PERSONAS" />
            <H2 white="Who this was" accent="designed for" />
            <p className="mt-5 mb-12 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[540px]">
              Three distinct user archetypes shaped every product decision — from feature priority to interaction patterns.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <PersonaSection />
          </FadeUp>
        </div>
      </section>

      {/* ══ WHO IT'S FOR ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="07" t="TARGET USERS" />
            <H2 white="Who uses" accent="SavedUp?" />
            <p className="mt-5 mb-10 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[600px]">
              SavedUp is designed for students and recent graduates planning their next chapter.
            </p>
          </FadeUp>

          <StaggerGrid className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                title: "Recent Graduates",
                desc: "Saving toward business capital or relocation with irregular income streams.",
                color: GR,
              },
              {
                title: "Undergraduates",
                desc: "Planning long-term goals like masters tuition, certifications, or study abroad.",
                color: "#60A5FA",
              },
              {
                title: "Final-Year Students",
                desc: "Needing structured savings for tools, devices, or career preparation before graduation.",
                color: "#A78BFA",
              },
            ].map(({ title, desc, color }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 h-full">
                  <div className="w-2 h-2 rounded-full mb-4" style={{ background: color }} />
                  <p className="text-[15px] font-semibold text-white mb-2">{title}</p>
                  <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">SHARED CHALLENGES ACROSS ALL USERS</p>
              <div className="flex flex-wrap gap-2">
                {["Inconsistent income", "Low saving discipline", "Impulse spending", "Lack of accountability", "Difficulty committing to long-term goals"].map(t => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ 08 — USER FLOWS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">
            <FadeUp delay={0.1}>
              <SLabel n="08" t="USER FLOWS" />
              <H2 white="Flows &" accent="experience" />
              <div className="mt-5 mb-6 h-[2px] w-16 rounded-full" style={{ background: GR }} />
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-6">
                The SavedUp experience was designed to feel simple, intentional, and supportive — especially for students who may already feel overwhelmed by money decisions.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                Core flows were structured to reduce friction and cognitive load, with clear separation between saving, budgeting, and spending activities.
              </p>
              <ul className="space-y-3">
                {[
                  { label: "Onboarding", desc: "Users define clear savings goals tied to real post-school plans from day one." },
                  { label: "Saving flows", desc: "Dedicated goal creation with outcome framing — not just amount targets." },
                  { label: "Budgeting flows", desc: "Withdrawal categorization with non-judgmental, informative feedback." },
                  { label: "Social flows", desc: "Peer saving and community features built around support, not comparison." },
                ].map(({ label, desc }) => (
                  <li key={label} className="flex items-start gap-3 text-[15px] text-white/55">
                    <span className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GR }} />
                    <span><strong className="text-white/85">{label}</strong> — {desc}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <SlideIn direction="right" delay={0.2}>
              <TiltFrame
                src="https://res.cloudinary.com/dirgfivvb/image/upload/v1769321101/richard_portfolio/ui-projects/gebzfxi0fzh8vf0zr6zh.jpg"
                alt="User flows"
                className="w-full"
                style={{ aspectRatio: "4/5" }}
                onClick={() => openLightbox(6)}
              />
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ══ 09 — TESTING ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-start">
            <SlideIn direction="left" delay={0.1}>
              <TiltFrame
                src="https://res.cloudinary.com/dirgfivvb/image/upload/v1769321127/richard_portfolio/ui-projects/aye1thg8uiy8yqwr6zo2.jpg"
                alt="Testing & iteration"
                className="w-full"
                style={{ aspectRatio: "4/5" }}
                onClick={() => openLightbox(7)}
              />
            </SlideIn>

            <FadeUp delay={0.15}>
              <SLabel n="09" t="TESTING & ITERATION" />
              <H2 white="Testing the" accent="experience" />
              <div className="mt-5 mb-6 h-[2px] w-16 rounded-full" style={{ background: GR }} />
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-5">
                Usability testing focused on validating whether users could move through critical flows without confusion or hesitation — with particular focus on onboarding, savings goal creation, and withdrawal actions.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                Feedback revealed areas where labels were unclear and transitions between budgeting and savings felt abrupt. These insights directly informed copy, flow sequencing, and feedback messaging.
              </p>
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">KEY ITERATION AREAS</p>
                <ul className="space-y-2">
                  {["Unclear labels in onboarding screens", "Abrupt transitions between budgeting and savings", "Feedback messaging tone and clarity"].map(t => (
                    <li key={t} className="flex items-center gap-2.5 text-[15px] text-white/55">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GR }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ 10 — IMPACT ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="10" t="IMPACT & METRICS" />
            <H2 white="Measuring" accent="success" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[580px]">
              The success of SavedUp is measured by its ability to influence real financial behaviour — not just feature usage.
            </p>
          </FadeUp>

          <div className="mt-12 grid lg:grid-cols-[1fr_500px] gap-10 lg:gap-14 items-stretch">
            <StaggerGrid className="space-y-4">
              {[
                {
                  metric: "Saving consistency",
                  desc: "Improved saving consistency among students — measured by streak completion and goal contribution frequency.",
                  color: GR,
                },
                {
                  metric: "Goal completion rate",
                  desc: "Higher completion rates for long-term savings goals — tracked from creation to target date.",
                  color: "#60A5FA",
                },
                {
                  metric: "Impulse withdrawal reduction",
                  desc: "A noticeable reduction in impulsive withdrawals — measured by the frequency of partial goal depletion.",
                  color: "#A78BFA",
                },
                {
                  metric: "Feature engagement",
                  desc: "Engagement with streaks, peer savings, and budgeting insights would signal growing discipline and commitment.",
                  color: "#F59E0B",
                },
                {
                  metric: "Retention & repeat usage",
                  desc: "Strong retention reflects SavedUp's effectiveness as a trusted financial companion during the school-to-life transition.",
                  color: "#EC4899",
                },
              ].map(({ metric, desc, color }) => (
                <StaggerItem key={metric}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.025] px-5 py-4">
                    <span className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                    <div>
                      <p className="text-[14px] font-semibold text-white mb-1">{metric}</p>
                      <p className="text-[15px] leading-[1.65] text-white/50 line-clamp-2">{desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <SlideIn direction="right" delay={0.1} className="h-full">
              <TiltFrame
                src="https://res.cloudinary.com/dirgfivvb/image/upload/v1769321160/richard_portfolio/ui-projects/cur36f9nkjqqpdyovmbv.jpg"
                alt="Impact metrics"
                className="w-full h-full"
                style={{ minHeight: 300 }}
                onClick={() => openLightbox(8)}
              />
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ══ 11 — LEARNINGS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="11" t="LEARNINGS" />
            <H2 white="Reflection &" accent="learnings" />
          </FadeUp>

          <FadeUp delay={0.1} className="mt-10">
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-8 sm:p-10">
              <p className="text-[15px] sm:text-[16px] leading-[1.8] text-white/60 mb-5">
                This project reinforced the importance of designing beyond surface-level usability and focusing on <strong className="text-white">behaviour change</strong>. I learned that effective financial products must balance structure with encouragement — especially for users navigating uncertainty and limited resources.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.8] text-white/60 mb-5">
                SavedUp challenged me to think deeply about motivation, accountability, and long-term commitment — not just interface design. It also strengthened my belief that student-focused products deserve the same level of rigour and intentionality as enterprise tools.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.8] text-white/60">
                Ultimately, this project reflects my approach to product design: grounding decisions in real user needs, designing with purpose, and building systems that support long-term growth.
              </p>
              <div className="mt-8 pt-6 border-t border-white/8">
                <div className="inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-black shrink-0"
                    style={{ background: GR }}>R</div>
                  <div>
                    <p className="text-sm font-bold text-white">Richard Enoch</p>
                    <p className="text-[11px]" style={{ color: GR }}>Product Designer · Savedup Case Study · Aug 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ WHAT I'D BUILD TODAY ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: GR }}>
              Retrospective
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-3">
              What I&apos;d build<br />
              <span style={{ color: GR }}>differently today</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[560px] mb-10">
              Three years on. Here&apos;s what the experience taught me — and what I&apos;d change if I were starting this from scratch now.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                n: "01",
                title: "Fewer preset saving types",
                body: "The original design offered too many pre-built categories. I'd reduce them to 3–4 anchors and let users define their own goal structure — the flexibility would feel more personal without overwhelming first-time users.",
              },
              {
                n: "02",
                title: "AI-guided savings targets",
                body: "Instead of asking users to set their own targets, I'd build a guided flow: a few questions about goals and timeline, then a suggested saving schedule. Fewer decisions upfront means higher activation. The intelligence should do the work.",
              },
              {
                n: "03",
                title: "The financial buddy concept",
                body: "Accountability is underrated in savings apps. I'd design a core feature around pairing users with a 'financial buddy' — a friend or peer working toward a similar goal. Shared progress creates the social pressure that actually builds habits.",
              },
            ].map(({ n, title, body }) => (
              <FadeUp key={n}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 h-full">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: GR }}>{n}</p>
                  <p className="text-[15px] font-semibold text-white mb-3">{title}</p>
                  <p className="text-[15px] text-white/50 leading-[1.65]">{body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OTHER PROJECTS ══ */}
      <OtherProj currentSlug="savedup" currentKind="ui" />
      <BuildSection />

    </div>

    <AnimatePresence>
      {lightbox !== null && (
        <Lightbox
          images={GALLERY}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </AnimatePresence>
  </div>
  );
};

export default SavedupProject;
