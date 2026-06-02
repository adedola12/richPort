import React, { useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

const GR = "#a3e635"; // portfolio lime
const RED = "#E05252";

/* ─── animation primitives ─── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 32, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

const SlideIn = ({ children, direction = "left", delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: direction === "left" ? -40 : 40, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: direction === "left" ? -40 : 40, filter: "blur(6px)" }}
      transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

const StaggerGrid = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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

/* ─── section heading ─── */
const H2 = ({ white, accent, accentColor = GR }) => (
  <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em]">
    <span className="text-white">{white} </span>
    <span style={{ color: accentColor }}>{accent}</span>
  </h2>
);

/* ─── 3-D tilt image frame ─── */
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
        className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 relative h-full"
        style={{ ...style, rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={onEnter}
        whileHover={{ boxShadow: "0 0 48px 10px rgba(163,230,53,0.18), 0 24px 60px rgba(0,0,0,0.55)" }}
        transition={{ boxShadow: { duration: 0.35 } }}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.02] px-8 py-10 min-h-[180px]">
            <div className="w-10 h-10 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-3">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M3 16l5-5 4 4 3-3 6 6" />
              </svg>
            </div>
            <p className="text-[11px] text-white/25 text-center leading-relaxed max-w-[300px]">{alt}</p>
          </div>
        )}
        {onClick && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/25">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/50 backdrop-blur-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════
   PAGE
═══════════════════════════════ */
export default function YDpayBrandPage() {
  const ph = useCallback(() => console.log("Image placeholder — replace src when Figma assets are ready"), []);
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/projects");
  };

  return (
    <div className="bg-[#07090C] text-white min-h-screen">
      <PageMeta
        title="YDPay Brand Identity — Richard Enoch"
        description="The brand foundation behind the product — the typography, voice, guideline, and touchpoints that turned a fixed mark and palette into a working brand system for YDPay fintech."
      />

      <div className="relative z-10">

        {/* ══ 00 — HERO ══ */}
        <section className="relative pt-28 pb-20 px-4 sm:px-8 flex flex-col items-center text-center overflow-hidden">
          {/* ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
            style={{ background: `${GR}07` }} />

          <FadeUp>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-sm px-3 py-1.5 text-[11px] text-white/60 hover:text-white/90 transition-colors mb-8"
            >
              ← Back
            </button>
          </FadeUp>

          <FadeUp delay={0.05}>
            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold mb-8"
              style={{ borderColor: `${GR}44`, color: GR, background: `${GR}0D` }}
            >
              Brand Identity Case Study · Fintech
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className="text-5xl sm:text-6xl lg:text-[80px] font-bold leading-none tracking-[-0.04em] mb-6"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #9a9a9a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              YDPay — Brand Identity
            </h1>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="text-[15px] sm:text-[17px] leading-[1.65] text-white/55 max-w-[560px] mb-14">
              The brand foundation behind the product — the typography, voice, guideline, and touchpoints that turned a fixed mark and palette into a working brand system, built before the product UI it would shape.
            </p>
          </FadeUp>

          <FadeUp delay={0.2} className="w-full max-w-[960px]">
            <TiltFrame
              src={null}
              alt="YDPay — Brand hero composition (Figma TBD). YDPay brandmark presented on a clean branded background with Onest type and brand colors."
              style={{ aspectRatio: "16/9" }}
              onClick={ph}
            />
          </FadeUp>
        </section>

        {/* ══ 01 — OVERVIEW ══ */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/8 mb-14">
                {[
                  { label: "CLIENT",  value: "YDPay (fintech app)" },
                  { label: "SCOPE",   value: "Brand System", accent: true },
                  { label: "ROLE",    value: "Brand Design Lead" },
                  { label: "PHASE",   value: "Foundation (pre-product)" },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="sm:px-8 first:pl-0">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1">{label}</p>
                    <p
                      className={`text-xl sm:text-2xl font-bold ${accent ? "" : "text-white"}`}
                      style={accent ? { color: GR } : {}}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <FadeUp>
                <SLabel n="01" t="OVERVIEW" />
                <H2 white="The foundation" accent="built first" />
                <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: GR }} />
                <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55">
                  <p>YDPay is a fintech app. Before its product interface could be designed coherently — and before it could go to market with a credible face — it needed a working brand system. The logo and core color palette were already fixed. What didn't yet exist was everything that turns a mark into a brand: a typographic voice, a defined tone, an application system, a guideline to hold it together, and the real-world touchpoints a growing fintech needs.</p>
                  <p>That's the work I led. I took the established mark and palette and built the brand system around them — setting the typography, defining the social and marketing design direction, shaping the communications and tone of voice, developing the full brand guideline, and designing the touchpoints (posters, merch, stationery, and more). This was the foundation phase: get the brand right first, so the product design that followed had a coherent visual language to inherit.</p>
                  <p>A brand and a product are the two roots every company is built on. At YDPay, I worked both — starting here, with the brand foundation, then carrying that system into the product itself.</p>
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">MY ROLE</p>
                  <p className="text-[15px] font-semibold text-white mb-1">Brand Design Lead · YDPay</p>
                  <p className="text-[14px] leading-[1.65] text-white/55 mb-5">
                    Built the working brand system around a fixed mark and palette:
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Typography system (set to Onest)",
                      "Social & marketing design direction",
                      "Communications & tone of voice",
                      "Full brand guideline",
                      "Brand touchpoints — posters, merch, stationery",
                      "Application system across channels",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-[1.6] text-white/50">
                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GR }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[12px] leading-[1.65] text-white/35 border-t border-white/8 pt-4 italic">
                    Logo and core palette were pre-existing; my role was to systematize and extend them into a complete brand.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ 02 — THE CHALLENGE ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <FadeUp>
                <SLabel n="02" t="THE CHALLENGE" />
                <H2 white="A mark is not" accent="a brand" accentColor={RED} />
                <div className="mt-5 mb-8 h-[2px] w-16 rounded-full bg-[#E05252]" />
                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                  YDPay had a logo and a color palette. What it didn't have was a brand — the system that makes those elements add up to something a market recognizes, trusts, and remembers. Three gaps defined the work:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      n: "01",
                      title: "No typographic voice",
                      body: "A logo and two colors can't carry a brand across an app, a deck, a billboard, and an Instagram post. Without a defined type system, every new piece of YDPay communication would look slightly different — and a fintech asking people to trust it with money cannot afford to look inconsistent.",
                    },
                    {
                      n: "02",
                      title: "No application system or tone",
                      body: "The brand existed as raw ingredients, not as a usable system. There were no rules for how it shows up, no defined voice for how it speaks, and no templates for the social and marketing work a growing fintech produces constantly.",
                    },
                    {
                      n: "03",
                      title: "No foundation for the product",
                      body: "The product UI still had to be designed — and without a coherent brand system feeding it, the app risked looking disconnected from the brand that marketed it. The brand had to be built first, deliberately, so the product could inherit a real visual language.",
                    },
                  ].map(({ n, title, body }) => (
                    <div key={n} className="rounded-2xl border border-[#E0525222] bg-[#1A0A0A] p-5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-[15px] font-semibold text-white leading-snug">{title}</h3>
                        <span className="shrink-0 w-6 h-6 rounded-full border border-[#E0525244] flex items-center justify-center text-[10px] font-bold text-[#E05252]">
                          {n}
                        </span>
                      </div>
                      <p className="text-[13px] sm:text-[14px] leading-[1.65] text-white/50">{body}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <SlideIn direction="right" delay={0.1}>
                <TiltFrame
                  src={null}
                  alt="'Raw ingredients vs. working system' — left: just the logo and color swatches floating alone; right: the full system applied across touchpoints. From a mark and a palette → to a working brand."
                  className="w-full"
                  style={{ aspectRatio: "4/5" }}
                  onClick={ph}
                />
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ══ 03 — PROCESS ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="03" t="PROCESS" />
              <H2 white="How the system" accent="came together" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[620px] mb-12">
                Four beats — Discover, Ideate, Design, Test & Refine — each one building on the last.
              </p>
            </FadeUp>

            <StaggerGrid className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  beat: "01",
                  label: "Discover",
                  color: "#60A5FA",
                  body: "Studied the fixed assets — the mark, the palette — and the fintech landscape YDPay was entering. Identified what the brand needed to project (trust, modernity, accessibility) and audited every place the brand would have to live: app, social, marketing, print, merch. The goal of discovery was to understand the constraints (what's fixed) and the gaps (what's missing).",
                },
                {
                  beat: "02",
                  label: "Ideate",
                  color: "#A78BFA",
                  body: "Explored typographic directions that would sit correctly with the existing mark and signal the right qualities for a fintech. Developed the social and marketing design direction — the layouts, the rhythm, the visual devices. Defined the tone of voice: how YDPay speaks to its users.",
                },
                {
                  beat: "03",
                  label: "Design",
                  color: GR,
                  body: "Set the typography system to Onest — a clean, modern, highly legible typeface that carries both UI and marketing contexts without strain. Built the application system, designed the social/marketing templates, developed the full brand guideline, and designed the touchpoints: posters, merch, stationery. Every element was built to work as a system, not as one-offs.",
                },
                {
                  beat: "04",
                  label: "Test & Refine",
                  color: "#F59E0B",
                  body: "Applied the system across real pieces to pressure-test it — does it hold up on a small social post and a large poster? Refined the rules, the spacing, the voice, and the templates based on how they performed in application. The end state: a brand guideline and asset system anyone on the team could use without breaking the brand.",
                },
              ].map(({ beat, label, color, body }) => (
                <StaggerItem key={beat}>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 h-full flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                        style={{ background: `${color}20`, color }}
                      >
                        {beat}
                      </span>
                      <p className="text-[16px] font-semibold text-white">{label}</p>
                    </div>
                    <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 flex-1">{body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* ══ 04 — THE BRAND SYSTEM ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="04" t="THE BRAND SYSTEM" />
              <H2 white="The working" accent="system" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[620px] mb-14">
                The brand system is everything that turns the fixed mark and palette into a brand people recognize. Here's what was built around them.
              </p>
            </FadeUp>

            {/* 4.1 Mark & Palette */}
            <FadeUp delay={0.05} className="mb-16">
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-2">4.1 — THE MARK & PALETTE</p>
              <p className="text-[18px] font-semibold text-white mb-3">The starting point</p>
              <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 max-w-[660px] mb-6">
                The logo and core palette were established before I came on. My role began here — not by changing them, but by building the system that lets them work everywhere.
              </p>
              <TiltFrame
                src={null}
                alt="The fixed mark and palette — the foundation I built around. YDPay logo + official color palette shown cleanly."
                className="w-full"
                style={{ aspectRatio: "16/9" }}
                onClick={ph}
              />
            </FadeUp>

            {/* 4.2 Typography */}
            <FadeUp delay={0.08} className="mb-16">
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-2">4.2 — TYPOGRAPHY</p>
              <p className="text-[18px] font-semibold text-white mb-3">Setting the voice in type</p>
              <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
                <div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 mb-5">
                    I set the type system to <strong className="text-white">Onest</strong> — a clean, modern, geometric-leaning typeface with the legibility a fintech needs across both dense UI and bold marketing. Onest gives YDPay one consistent typographic voice from a button label to a billboard headline.
                  </p>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase"
                        style={{ background: `${GR}15`, color: GR }}>DISPLAY & BODY</span>
                      <span className="text-[10px] text-white/30">Google Fonts</span>
                    </div>
                    <p className="text-[28px] font-bold text-white mb-3">Onest</p>
                    <div className="space-y-1 mb-4">
                      <p className="text-[11px] text-white/35"><span className="text-white/50">Weights:</span> 800 / 700 / 600 / 400 / 300</p>
                      <p className="text-[11px] text-white/35"><span className="text-white/50">Used for:</span> All headings, body copy, UI labels, marketing headlines, captions</p>
                    </div>
                    <p className="text-[12px] leading-[1.65] text-white/45 border-t border-white/6 pt-4">
                      Onest's geometric clarity makes it equally at home in a transaction confirmation screen and a campaign headline — the single typeface that unifies the YDPay brand across all surfaces.
                    </p>
                  </div>
                </div>
                <TiltFrame
                  src={null}
                  alt="Typography system — Onest. Type specimen applied to YDPay: weights, scale, sample lockups across UI and marketing contexts."
                  style={{ aspectRatio: "16/9", minHeight: "200px" }}
                  onClick={ph}
                />
              </div>
            </FadeUp>

            {/* 4.3 Tone of Voice */}
            <FadeUp delay={0.08} className="mb-16">
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-2">4.3 — TONE OF VOICE</p>
              <p className="text-[18px] font-semibold text-white mb-3">How the brand speaks</p>
              <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">
                <TiltFrame
                  src={null}
                  alt="Communications & tone of voice. Messaging/voice spread — do's and don'ts for copy, sample headlines, and tone descriptors."
                  style={{ aspectRatio: "16/9", minHeight: "200px" }}
                  onClick={ph}
                />
                <div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 mb-6">
                    Beyond how it looks, I defined how YDPay sounds — the tone, the language, the way it talks to users about money (a sensitive, trust-dependent subject). Clear, confident, human — never cold or jargon-heavy.
                  </p>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden">
                    {[
                      { rule: "Clear", spec: "Use plain language. No fintech jargon where plain words exist.", positive: true },
                      { rule: "Confident", spec: "Assertions, not hedges. YDPay doesn't 'try to' — it does.", positive: true },
                      { rule: "Human", spec: "Money is personal. Speak to the person, not the transaction.", positive: true },
                      { rule: "Never cold", spec: "Avoid purely transactional language. Trust is emotional, not functional.", positive: false },
                    ].map(({ rule, spec, positive }, i) => (
                      <div key={rule} className={`flex gap-4 px-5 py-3.5 ${i > 0 ? "border-t border-white/5" : ""}`}>
                        <span
                          className="shrink-0 mt-0.5 text-[11px] font-bold"
                          style={{ color: positive ? GR : RED }}
                        >
                          {positive ? "✓" : "✕"}
                        </span>
                        <div>
                          <p className="text-[12px] font-semibold text-white">{rule}</p>
                          <p className="text-[12px] text-white/40 mt-0.5">{spec}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* 4.4 Application System */}
            <FadeUp delay={0.08}>
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-2">4.4 — THE APPLICATION SYSTEM</p>
              <p className="text-[18px] font-semibold text-white mb-3">One brand, every surface</p>
              <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 max-w-[660px] mb-6">
                The system defines how the brand shows up consistently — spacing, layout rhythm, the visual devices that make a YDPay piece recognizable at a glance, whether it's a story, a post, or a print piece.
              </p>
              <TiltFrame
                src={null}
                alt="The application system — grid showing the YDPay brand applied consistently across multiple surface types: social, print, digital, and print marketing."
                className="w-full"
                style={{ aspectRatio: "16/9" }}
                onClick={ph}
              />
            </FadeUp>
          </div>
        </section>

        {/* ══ 05 — BRAND IN APPLICATION ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="05" t="BRAND IN APPLICATION" />
              <H2 white="Not a guideline" accent="on a shelf" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[620px] mb-14">
                A brand system only matters if it produces real work. Here's the brand applied across the pieces YDPay actually needed — the social and marketing designs, and the physical touchpoints.
              </p>
            </FadeUp>

            <div className="space-y-20">
              {[
                {
                  n: "SOCIAL & MARKETING",
                  title: "Social & Marketing Designs",
                  body: "The social media design direction in action — templates and posts built within the system. Consistent layout rhythm, the Onest type set at the right scale, the brand palette used with discipline. Every post is recognizably YDPay without being templated into sameness.",
                  alt: "Social & marketing designs — grid or carousel of YDPay social media posts and marketing assets.",
                  flip: false,
                },
                {
                  n: "POSTERS",
                  title: "Poster & Campaign Designs",
                  body: "The brand at larger format — poster designs carrying the YDPay identity into campaign and event communications. Proves the system holds up when it gets bigger: the typography, the palette, the layout rules all scale.",
                  alt: "Poster / campaign designs — YDPay brand applied to large-format poster compositions.",
                  flip: true,
                },
                {
                  n: "MERCH",
                  title: "Branded Merchandise",
                  body: "Branded merchandise — the brand made physical. Merch is where brand systems either fail or prove their depth. When the mark, palette, and type translate onto a tote, a t-shirt, or a cap without a designer making decisions in real time, the system is working.",
                  alt: "Branded merchandise — YDPay merch mockups. T-shirts, caps, or tote bags showing the brand applied to physical products.",
                  flip: false,
                },
                {
                  n: "STATIONERY",
                  title: "Stationery System",
                  body: "Business cards, letterhead, and the institutional touchpoints a fintech needs when it meets partners, investors, and clients in the physical world. The brand that operates in an app has to hold up on paper.",
                  alt: "Stationery system — YDPay business cards, letterhead, and stationery suite in correct brand application.",
                  flip: true,
                },
              ].map(({ n, title, body, alt, flip }) => (
                <FadeUp key={n}>
                  <div className="flex flex-col gap-6">
                    <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 ${flip ? "sm:flex-row-reverse" : ""}`}>
                      <div className="max-w-[420px]">
                        <span
                          className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase mb-3 inline-block"
                          style={{ background: `${GR}15`, color: GR }}
                        >
                          {n}
                        </span>
                        <h3 className="text-[22px] sm:text-[26px] font-semibold text-white mb-4">{title}</h3>
                        <p className="text-[14px] sm:text-[15px] leading-[1.7] text-white/55">{body}</p>
                      </div>
                    </div>
                    <TiltFrame
                      src={null}
                      alt={alt}
                      className="w-full"
                      style={{ aspectRatio: "16/9" }}
                      onClick={ph}
                    />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 06 — THE GUIDELINE ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="06" t="THE GUIDELINE" />
              <H2 white="The system," accent="documented" />
              <p className="mt-5 text-[14px] sm:text-[15px] leading-[1.65] text-white/50 max-w-[620px] mb-10">
                Everything was captured in a brand guideline — the single source of truth that lets the whole team use the brand correctly without a designer in the room for every piece.
              </p>
            </FadeUp>

            {/* Desktop: 3-col portrait grid */}
            <div className="hidden sm:grid grid-cols-3 gap-4">
              {[
                "Cover — YDPay brand guideline cover page",
                "Logo usage — the fixed mark, usage rules and clear space",
                "Color palette — the fixed palette with HEX/RGB values documented",
                "Typography — Onest specimen spread with weights and usage rules",
                "Tone of voice — do's/don'ts, sample copy, tone descriptors",
                "Application examples — the brand across social, print, and digital",
                "Touchpoints — merch and stationery applications",
              ].map((cap, i) => (
                <TiltFrame
                  key={i}
                  src={null}
                  alt={cap}
                  className="w-full"
                  style={{ aspectRatio: "3/4" }}
                  onClick={ph}
                />
              ))}
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="flex sm:hidden gap-3 overflow-x-auto pb-3 -mx-4 px-4">
              {[
                "Cover", "Logo usage", "Color palette",
                "Typography", "Tone of voice", "Application examples", "Touchpoints",
              ].map((cap, i) => (
                <div key={i} className="shrink-0 w-[160px]">
                  <TiltFrame
                    src={null}
                    alt={`Spread ${i + 1} — ${cap}`}
                    style={{ aspectRatio: "3/4" }}
                    onClick={ph}
                  />
                </div>
              ))}
            </div>

            <FadeUp delay={0.1}>
              <p className="mt-5 text-[12px] text-white/35 leading-relaxed">
                Tap any spread to view it full-size. The guideline is what makes the brand usable by everyone, not just the designer who built it.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ══ 07 — BRIDGE TO PRODUCT ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="07" t="FROM BRAND TO PRODUCT" />
              <H2 white="The foundation" accent="the product was built on" />
              <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: GR }} />
              <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[680px] mb-10">
                <p>This brand system wasn't the end of the YDPay work — it was the foundation for it. The typography, the palette, the voice, and the application rules I defined here became the visual language of the YDPay app itself. When the product was designed, it didn't start from a blank canvas — it inherited a brand that was already coherent, already tested, already documented.</p>
                <p>That's the whole point of building the foundation first: the product and the brand speak with one voice, because the brand was there before the first screen was designed.</p>
              </div>
              <Link
                to="/ui-projects/ydpay-mobile-redesign"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-black transition-opacity hover:opacity-85"
                style={{ background: GR }}
              >
                See the product this foundation built →
              </Link>
            </FadeUp>

            <FadeUp delay={0.12} className="mt-12">
              <TiltFrame
                src={null}
                alt="From brand system → to product UI. A visual showing the brand system (colors, type, voice) flowing into the YDPay app screens — brand on the left, product on the right."
                className="w-full"
                style={{ aspectRatio: "16/9" }}
                onClick={ph}
              />
            </FadeUp>
          </div>
        </section>

        {/* ══ 08 — RESULTS & REFLECTION ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="08" t="RESULTS & REFLECTION" />
              <H2 white="What the" accent="foundation achieved" />
            </FadeUp>

            <div className="grid lg:grid-cols-2 gap-12 mt-10">
              <FadeUp delay={0.05}>
                <StaggerGrid className="space-y-3">
                  {[
                    { metric: "A usable brand system",           color: GR,        desc: "The team can produce on-brand work without rebuilding the wheel each time — the system is the asset." },
                    { metric: "One voice across surfaces",        color: "#60A5FA", desc: "App, social, marketing, and print all read as one YDPay, because the rules that govern all of them came from the same source." },
                    { metric: "The product's visual language",    color: "#A78BFA", desc: "The brand became the foundation the app UI was designed on — coherent visual language before the first screen was drawn." },
                    { metric: "A documented source of truth",     color: "#F59E0B", desc: "The guideline keeps the brand consistent as the team grows — new contributors design from the same system, not from scratch." },
                  ].map(({ metric, color, desc }) => (
                    <StaggerItem key={metric}>
                      <div className="rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 flex items-start gap-4">
                        <span className="mt-1.5 w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                        <div>
                          <p className="text-[14px] font-semibold text-white mb-1">{metric}</p>
                          <p className="text-[13px] leading-[1.65] text-white/50">{desc}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-8 sm:p-10 h-full flex flex-col justify-between gap-8">
                  <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-white/60">
                    <p>YDPay reinforced a belief that now sits at the center of how I work: the most valuable brand work isn't always inventing the mark — it's building the system that makes a brand actually function. A logo and two colors are raw material. Typography, voice, application rules, a guideline, and real touchpoints are what turn that material into something a market recognizes and trusts.</p>
                    <p>It was also the clearest example of working foundation-first. Building the brand before the product meant the two never fought each other — the app inherited a coherent visual language instead of inventing one. That's the approach I bring to every engagement: get the foundation right, and everything built on top of it holds together.</p>
                  </div>
                  <div className="border-t border-white/8 pt-6">
                    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-black"
                        style={{ background: GR }}
                      >
                        R
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Richard Enoch</p>
                        <p className="text-[11px]" style={{ color: GR }}>Brand Design Lead · YDPay Brand System</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ 09 — FOOTER ══ */}
        <OtherProj currentSlug="ydpay-brand" currentKind="brand" />
        <BuildSection />

      </div>
    </div>
  );
}
