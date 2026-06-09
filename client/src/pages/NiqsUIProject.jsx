import React, { useRef, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

const GR = "#a3e635";
const NIQS_NAVY = "#000066";
const NIQS_GOLD = "#D9B650";
const NIQS_OFFWHITE = "#F6F7FB";
const NIQS_DEEP = "#1A1A2E";
const NIQS_WHITE = "#FAFAFA";

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
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
      initial={{ opacity: 0, x: direction === "left" ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === "left" ? -40 : 40 }}
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

const SLabel = ({ n, t }) => (
  <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: GR }}>
    {n} — {t}
  </p>
);

const H2 = ({ white, accent, accentColor = GR }) => (
  <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em] break-words">
    <span className="text-white">{white} </span>
    <span style={{ color: accentColor }}>{accent}</span>
  </h2>
);

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
          <div className="w-full h-full flex items-center justify-center bg-white/[0.02] px-8 py-10 min-h-[180px]">
            <p className="text-[11px] text-white/20 text-center leading-relaxed">{alt}</p>
          </div>
        )}
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

const BentoCell = ({ n, src = null, cap = "", style = {}, className = "" }) => (
  <div
    className={`relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.025] group cursor-pointer ${className}`}
    style={style}
  >
    {src ? (
      <img src={src} alt={cap} className="w-full h-full object-cover" loading="lazy" />
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
        <span className="text-[10px] font-mono text-white/10">{String(n).padStart(2, "0")}</span>
        {cap && <p className="text-[10px] text-white/20 text-center leading-relaxed max-w-[200px]">{cap}</p>}
      </div>
    )}
    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
      </div>
    </div>
  </div>
);

export default function NiqsUIProject() {
  const ph = useCallback(() => console.log("Image placeholder clicked — replace src in code"), []);
  const [heroHover, setHeroHover] = useState(false);
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/projects");
  };

  return (
    <div className="bg-[#07090C] text-white min-h-screen">
      <PageMeta
        title="NIQS Digital Transformation — Richard Enoch"
        description="Full digital identity rebuild for Nigeria's premier professional body for Quantity Surveyors — brand system, website, member portal, admin dashboard, and a self-serve design engine."
      />

      <div className="relative z-10">

        {/* ══ 00 — HERO ══ */}
        <section
          className="relative w-full min-h-[82vh] sm:min-h-[88vh] flex flex-col overflow-hidden"
          onMouseEnter={() => setHeroHover(true)}
          onMouseLeave={() => setHeroHover(false)}
        >
          {/* Background: dark 3D emblem, subtle zoom on hover */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src="/NIQSEmblemDark.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{
                opacity: 0.85,
                transform: heroHover ? "scale(1.06)" : "scale(1.0)",
                transition: "transform 1.1s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
            {/* gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(7,9,12,0.4) 0%, rgba(7,9,12,0.35) 30%, rgba(7,9,12,0.92) 55%, #07090C 100%)",
              }}
            />
          </div>

          {/* Content — centered, pushes to bottom of section */}
          <div className="relative z-10 mt-auto px-4 sm:px-8 pt-24 pb-14">
            <div className="max-w-[760px] mx-auto flex flex-col items-center text-center">

              <FadeUp>
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-sm px-3 py-1.5 text-[11px] text-white/60 hover:text-white/90 transition-colors mb-7"
                >
                  ← Back
                </button>
              </FadeUp>

              <FadeUp delay={0.05}>
                <span
                  className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold mb-7"
                  style={{ borderColor: `${GR}44`, color: GR, background: `${GR}0D` }}
                >
                  UI / UX Case Study · Institutional Redesign
                </span>
              </FadeUp>

              <FadeUp delay={0.08}>
                <img
                  src="/NIQSColor.svg"
                  alt="NIQS Logo"
                  className="w-[160px] sm:w-[200px] mb-7"
                />
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1
                  className="text-6xl sm:text-7xl lg:text-[88px] font-bold leading-none tracking-[-0.04em] mb-5"
                  style={{
                    background: "linear-gradient(180deg, #ffffff 0%, #9a9a9a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  NIQS
                </h1>
              </FadeUp>

              <FadeUp delay={0.15}>
                <p className="text-[15px] sm:text-[17px] leading-[1.65] text-white/60 max-w-[540px] mb-8">
                  A full digital identity rebuild for Nigeria's premier professional body for Quantity Surveyors — brand system, website, member portal, admin dashboard, and a self-serve design engine.
                </p>
              </FadeUp>


            </div>
          </div>
        </section>

        {/* ══ 01 — THE BRIEF ══ */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/8 mb-14">
                {[
                  { label: "CLIENT", value: "NIQS National Secretariat" },
                  { label: "TIMELINE", value: "Feb – May 2026" },
                  { label: "SCOPE", value: "Design Package", accent: true },
                  { label: "STATUS", value: "In Production" },
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <FadeUp>
                <SLabel n="01" t="THE BRIEF" />
                <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em] break-words">
                  <span className="text-white">A 56-year institution,</span><br />
                  <span style={{ color: GR }}>rebuilt for 2026</span>
                </h2>
                <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: GR }} />
                <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 break-words">
                  <p>The Nigerian Institute of Quantity Surveyors (NIQS) is the foremost professional and regulatory body for quantity surveyors in Nigeria — founded in 1969, granted statutory authority by Decree No. 31 of 1986, and home to over 10,000 members across all 37 states. After more than half a century of growth, its digital presence had fallen behind the institution's stature.</p>
                  <p>ADLM Studio was appointed Official Technical Partner to deliver a full digital transformation: a new brand guideline, a custom-coded MERN website to replace the legacy WordPress/PHP system, a member portal, an admin dashboard, a digital library, and a self-serve flyer design engine for the secretariat. I led the design side of this partnership — owning every pixel from the brand system to the portal interface.</p>
                  <p>The brief was institutional in tone but operational in spirit: respect 56 years of heritage, retain the heraldic logo and navy-gold palette, but rebuild the entire digital experience so that members, regulators, and the public meet NIQS the way they should — as a serious, modern, technology-forward institute.</p>
                </div>
                <div className="mt-8">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">DELIVERABLES</p>
                  <div
                    className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <style>{`.del-track::-webkit-scrollbar{display:none}`}</style>
                    {[
                      "Brand Guideline Redesign",
                      "Public Website UI/UX",
                      "Member Portal UI/UX",
                      "Admin Dashboard UI/UX",
                      "Digital Library UI",
                      "Social Media Templates",
                      "Flyer Design Engine (Admin Tool)",
                    ].map((t) => (
                      <span
                        key={t}
                        className="shrink-0 rounded-md border px-2.5 py-1 text-[11px] font-semibold"
                        style={{ borderColor: `${GR}44`, color: GR, background: `${GR}0D` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.15} className="flex flex-col gap-4">
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">MY ROLE</p>
                  <p className="text-[15px] font-semibold text-white mb-4">Creative Lead · ADLM Studio</p>
                  <p className="text-[15px] leading-[1.65] text-white/55 mb-5">
                    I led the design side of the NIQS Digital Transformation partnership, owning:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Brand guideline redesign (~60 pages)",
                      "Public website design (desktop + mobile, 20+ screens)",
                      "Member portal design",
                      "Admin dashboard design",
                      "Digital library design",
                      "Social media template system",
                      "Flyer Design Engine — a self-serve design tool inside the admin panel",
                      "Design system & component library",
                      "Developer handover",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[15px] leading-[1.6] text-white/50">
                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GR }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* NIQS logo card */}
                <div
                  className="rounded-2xl flex items-center justify-center p-8 min-h-[180px]"
                  style={{ background: `${NIQS_NAVY}` }}
                >
                  <img
                    src="/NIQSColor.svg"
                    alt="NIQS Logo"
                    className="w-full max-w-[280px] opacity-95"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ 02 — THE PROBLEM ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <FadeUp>
                <SLabel n="02" t="THE PROBLEM" />
                <H2 white="What didn't" accent="match the institution" accentColor="#E05252" />
                <div className="mt-5 mb-8 h-[2px] w-16 rounded-full bg-[#E05252]" />
                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                  The 2020 brand work served NIQS for a season, but five years of institutional growth, digital expansion, and member service evolution had outpaced it. Four core problems shaped this redesign:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      n: "01",
                      title: "A brand system stuck in 2020",
                      body: "The 2020 guideline was a static PDF reference rather than a working system. It defined logo usage and colour but lacked typography rules, spacing rules, photography treatment specs, or any modern UI patterns. Every new piece of NIQS communication required redrawing the wheel.",
                    },
                    {
                      n: "02",
                      title: "A legacy website that didn't scale",
                      body: "The old WordPress/PHP site relied on plugin-based scaling and didn't support institutional-grade role-based access. Member portal, admin workflows, and a proper digital library could not be built on it. Performance and security had aged.",
                    },
                    {
                      n: "03",
                      title: "Every flyer needed a designer",
                      body: "The secretariat produced announcements, event notices, and recognitions weekly — but every single one required a designer to open Photoshop or Canva, fight the layout, export, and hand back. No design literacy on the secretariat side. The volume was unsustainable.",
                    },
                    {
                      n: "04",
                      title: "Inconsistent communications",
                      body: "Without a templates system or a content discipline, NIQS chapters across all 37 states produced communications in wildly different styles. The national brand and the chapter brand didn't look like one institution.",
                    },
                  ].map(({ n, title, body }) => (
                    <div key={n} className="rounded-2xl border border-[#E0525222] bg-[#1A0A0A] p-5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-[15px] font-semibold text-white leading-snug">{title}</h3>
                        <span className="shrink-0 w-6 h-6 rounded-full border border-[#E0525244] flex items-center justify-center text-[10px] font-bold text-[#E05252]">
                          {n}
                        </span>
                      </div>
                      <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50">{body}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <SlideIn direction="right" delay={0.1}>
                <TiltFrame
                  src={null}
                  alt="56 years of institutional heritage. A new digital chapter. Before/after split: left side shows 2020 NIQS materials (Annual Report cover, Staff Handbook, old WordPress homepage); right side shows new 2026 materials (brand guideline cover, new website hero, portal dashboard)."
                  className="w-full"
                  style={{ aspectRatio: "4/5" }}
                  onClick={ph}
                />
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ══ 03 — RESEARCH & INSIGHTS ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="03" t="RESEARCH & INSIGHTS" />
              <H2 white="Benchmarking the" accent="institutional standard" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[620px] mb-12">
                Research combined a teardown of the legacy NIQS site, a competitive scan of peer professional bodies (NSE — Nigerian Society of Engineers, NIA — Nigerian Institute of Architects, RICS — Royal Institution of Chartered Surveyors), and structural analysis of how a modern professional institute should serve members, regulators, and the public.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
              <FadeUp delay={0.1}>
                <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-5">COMPETITIVE COMPARISON</p>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
                 <div className="overflow-x-auto no-scrollbar">
                  <div className="min-w-[480px]">
                  <div className="grid grid-cols-[1fr_76px_76px_76px_76px] text-[9px] font-bold tracking-wider uppercase text-white/30 px-4 py-3 border-b border-white/6">
                    <span>Capability</span>
                    <span className="text-center" style={{ color: GR }}>NIQS New</span>
                    <span className="text-center text-white/25">Legacy</span>
                    <span className="text-center text-white/25">NSE/NIA</span>
                    <span className="text-center text-white/25">RICS UK</span>
                  </div>
                  {[
                    ["Modern responsive website", "✅", "❌", "⚠️", "✅"],
                    ["Custom-coded backend", "✅", "❌", "❌", "✅"],
                    ["Member portal with dashboard", "✅", "❌", "⚠️", "✅"],
                    ["Role-based access", "✅", "❌", "❌", "✅"],
                    ["Integrated digital library", "✅", "❌", "❌", "✅"],
                    ["Self-serve design tool for staff", "✅", "❌", "❌", "❌"],
                    ["Modern brand guideline", "✅", "❌", "⚠️", "✅"],
                    ["Editorial typography system", "✅", "❌", "❌", "✅"],
                    ["Mobile-first public site", "✅", "❌", "⚠️", "✅"],
                  ].map(([cap, ...vals], i) => (
                    <div
                      key={cap}
                      className={`grid grid-cols-[1fr_76px_76px_76px_76px] px-4 py-3 text-[15px] ${i > 0 ? "border-t border-white/5" : ""}`}
                    >
                      <span className="text-white/55">{cap}</span>
                      {vals.map((v, j) => (
                        <span key={j} className="text-center text-[14px]">{v}</span>
                      ))}
                    </div>
                  ))}
                  </div>
                 </div>
                </div>
              </FadeUp>

              <div className="space-y-4">
                <FadeUp delay={0.15}>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">INSTITUTION SCALE</p>
                    <p className="text-[42px] font-bold leading-none mb-3" style={{ color: GR }}>10,000+</p>
                    <p className="text-[15px] leading-[1.65] text-white/50">
                      members across 37 state chapters and the FCT. The redesigned digital infrastructure is built to serve every one of them — not just the National Secretariat.
                    </p>
                  </div>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">COMMUNICATIONS VOLUME</p>
                    {[
                      { label: "Weekly announcements/recognitions", val: "~12/week", color: GR, w: "40%" },
                      { label: "Events per year", val: "~40", color: "#60A5FA", w: "60%" },
                      { label: "Chapter comms per month", val: "~150+", color: "#A78BFA", w: "90%" },
                    ].map(({ label, val, color, w }) => (
                      <div key={label} className="mb-3">
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-white/40">{label}</span>
                          <span className="font-bold" style={{ color }}>{val}</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/8">
                          <div className="h-full rounded-full" style={{ background: color, width: w }} />
                        </div>
                      </div>
                    ))}
                    <p className="text-[11px] text-white/35 mt-3 leading-relaxed">
                      Volume that no central design team could sustainably hand-produce. The Flyer Design Engine exists to solve this.
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 04 — HERO IMAGE BAND ══ */}
        <section className="py-10 sm:py-16 px-3 sm:px-6">
          <FadeUp className="max-w-[1100px] mx-auto">
            <div
              className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 flex items-center justify-center"
              style={{ borderColor: `${GR}55`, height: "55vh", background: "#0A0D12" }}
            >
              <p className="text-[11px] text-white/20 text-center px-8 leading-relaxed">
                NIQS — Visual band (Figma TBD)
                <br />
                <span className="text-white/10">New NIQS website home page in desktop browser frame, or brand guideline open across multiple chapters (logo + color + typography)</span>
              </p>
            </div>
          </FadeUp>
        </section>

        {/* ══ 05 — THE NEW BRAND SYSTEM ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="05" t="BRAND SYSTEM" />
              <H2 white="Heritage, made" accent="operational" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[620px] mb-14">
                The 2020 brand established the NIQS heraldic identity — eagle, shield, navy, gold, "The professional construction cost managers." That heritage is non-negotiable. The redesign retained every heraldic element and rebuilt the system around it: typography that didn't exist before, a working colour scale, photography treatment specs, and a logo system with four official lockup configurations.
              </p>
            </FadeUp>

            {/* 5.0 Logo System */}
            <FadeUp delay={0.05} className="mb-16">
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-2">5.0 — LOGO SYSTEM</p>
              <p className="text-[18px] font-semibold text-white mb-6">Four lockups. One heraldic mark. Zero compromise.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/8 p-8 flex flex-col items-center justify-center gap-6" style={{ background: `${NIQS_NAVY}` }}>
                  <img src="/NIQSColor.svg" alt="NIQS Heraldic Emblem — colour" className="w-full max-w-[260px]" />
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">Primary Mark · Light on Dark</p>
                </div>
                <div className="rounded-2xl border border-white/8 p-8 flex flex-col items-center justify-center gap-6" style={{ background: `${NIQS_NAVY}` }}>
                  <img src="/NIQSHorizontal.svg" alt="NIQS Horizontal Logo Lockup" className="w-full max-w-[360px]" />
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">Horizontal Lockup · Light on Dark</p>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-[1.7] text-white/40 max-w-[680px]">
                The heraldic mark — eagle, shield, chain — is the core institutional symbol. It appears alone when authority is the only message needed. The horizontal lockup pairs it with the full institute name for documents, headers, and web surfaces where the name needs to anchor the emblem.
              </p>
            </FadeUp>

            {/* 5.1 Colour Palette */}
            <FadeUp delay={0.1} className="mb-16">
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-2">5.1 — COLOUR PALETTE</p>
              <p className="text-[18px] font-semibold text-white mb-6">Navy & Gold — refined into a working system</p>
              <StaggerGrid className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { hex: NIQS_NAVY,     name: "NIQS Navy",   desc: "Primary institutional voice · headers · navy backplates · official surfaces" },
                  { hex: NIQS_GOLD,     name: "NIQS Gold",   desc: "Accent · eyebrows · em-treated nouns in headings · gold rules · CTA highlights" },
                  { hex: NIQS_OFFWHITE, name: "Off-White",   desc: "Secondary surface · alternating section backgrounds · card backgrounds" },
                  { hex: NIQS_DEEP,     name: "Navy Deep",   desc: "Hero overlays · chapter opener backgrounds · photography darkening" },
                  { hex: NIQS_WHITE,    name: "True White",  desc: "Document/page background · content cards · clean surfaces" },
                ].map(({ hex, name, desc }) => (
                  <StaggerItem key={hex}>
                    <div className="flex flex-col rounded-xl overflow-hidden border border-white/8 bg-white/[0.02]">
                      <div className="h-20 sm:h-24 w-full border-b border-white/10" style={{ background: hex }} />
                      <div className="p-3 flex flex-col gap-1">
                        <p className="text-[11px] font-mono font-semibold" style={{ color: GR }}>{hex}</p>
                        <p className="text-[12px] font-semibold text-white">{name}</p>
                        <p className="text-[10px] leading-[1.5] text-white/35">{desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>
              <p className="mt-5 text-[15px] leading-[1.7] text-white/40 max-w-[680px]">
                The redesign retained the 2020 navy (<code className="text-white/60">#000066</code>) and gold (<code className="text-white/60">#D9B650</code>) as official primaries — non-negotiable. The work added a tonal <strong className="text-white/60">scale</strong> beneath each colour (13% / 34% / 65% opacity surfaces, dividers, hover states) so designers no longer guess at "lighter navy" or "softer gold." The institution finally has a working palette, not just two colours.
              </p>
            </FadeUp>

            {/* 5.2 Typography */}
            <FadeUp delay={0.1} className="mb-16">
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-2">5.2 — TYPOGRAPHY</p>
              <p className="text-[18px] font-semibold text-white mb-6">Two typefaces. One institutional. One editorial.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    role: "DISPLAY",
                    face: "Bricolage Grotesque",
                    weights: "800 / 700 / 600",
                    usage: "Hero · H1 · H2 · Key numerics · em-treated gold accents",
                    source: "Google Fonts",
                    note: 'Bricolage Grotesque is the NIQS display typeface. Its slightly playful "g" and "a" characters soften the institutional formality without undermining it — making NIQS feel modern and editorial while remaining authoritative.',
                  },
                  {
                    role: "BODY",
                    face: "Sora",
                    weights: "700 / 600 / 400 / 300",
                    usage: "All body copy · UI labels · Buttons · Navigation · Forms · Metadata",
                    source: "Google Fonts",
                    note: "Sora carries all body copy. Its generous x-height and uniform stroke width make it highly legible at small sizes — important for the data-dense tables and member notices that characterise NIQS communications.",
                  },
                ].map(({ role, face, weights, usage, source, note }) => (
                  <div key={role} className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase"
                        style={{ background: `${GR}15`, color: GR }}
                      >
                        {role}
                      </span>
                      <span className="text-[10px] text-white/30">{source}</span>
                    </div>
                    <p className="text-[22px] font-bold text-white mb-3">{face}</p>
                    <div className="space-y-1 mb-4">
                      <p className="text-[11px] text-white/35"><span className="text-white/50">Weights:</span> {weights}</p>
                      <p className="text-[11px] text-white/35"><span className="text-white/50">Used for:</span> {usage}</p>
                    </div>
                    <p className="text-[15px] leading-[1.65] text-white/45 border-t border-white/6 pt-4">{note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-[1.7] text-white/40 max-w-[680px]">
                The 2020 guideline did not specify typography. The new system locks two typefaces: one for institutional voice, one for operational clarity. Both are free, web-served, and load across every NIQS touchpoint — print, document, web, portal, flyer engine.
              </p>
            </FadeUp>

            {/* 5.3 Photography Treatment */}
            <FadeUp delay={0.1} className="mb-16">
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-2">5.3 — PHOTOGRAPHY TREATMENT</p>
              <p className="text-[18px] font-semibold text-white mb-6">Three rules. Zero ad-hoc treatment.</p>
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden">
                {[
                  { rule: "Hero — Behind text", spec: "brightness(0.22) saturate(0.8) + navy gradient overlay", note: "Photography is under the type, never competing." },
                  { rule: "Card images", spec: "100% brightness, natural tones. Slow zoom on hover (scale(1.04) over 350ms).", note: "" },
                  { rule: "Portrait crops", spec: "object-fit: cover · object-position: top", note: "Head always in frame." },
                ].map(({ rule, spec, note }, i) => (
                  <div key={rule} className={`flex gap-4 px-6 py-4 ${i > 0 ? "border-t border-white/6" : ""}`}>
                    <div className="w-32 sm:w-44 shrink-0">
                      <p className="text-[11px] font-semibold text-white/60">{rule}</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-white/40 font-mono">{spec}</p>
                      {note && <p className="text-[12px] text-white/30 mt-1">{note}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[15px] leading-[1.7] text-white/40 max-w-[680px]">
                The 2020 system applied photography ad-hoc — sometimes a blue gradient, sometimes a full overlay, sometimes raw. The new spec ensures every photograph across NIQS communications is treated identically.
              </p>
            </FadeUp>

            {/* 5.4 Inside the Guideline */}
            <FadeUp delay={0.1}>
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-2">5.4 — INSIDE THE GUIDELINE</p>
              <p className="text-[18px] font-semibold text-white mb-2">The full system, 60 pages, one source of truth</p>
              <p className="text-[14px] leading-[1.65] text-white/50 max-w-[620px] mb-8">
                The complete brand guideline spans ~60 pages across 12 chapters — Brand Story, Personality & Voice, Logo & Mark, Colour, Typography, Imagery, Stationery, Digital, and Brand Voice & Copy. A selection of spreads below; the full document is the operating manual every NIQS chapter, staff member, and third-party vendor designs from.
              </p>
              <div className="hidden sm:grid grid-cols-3 gap-4">
                {[
                  "Cover — navy cover with NIQS emblem + 'Brand Guideline' title",
                  "Brand Story — 'Who We Are' spread with 1969 founding + stat strip (1969 · 10,000+ · 37 · 15+)",
                  "History Timeline — five decades, 1969 → 2025",
                  "Logo & Mark — heraldic emblem on light + dark backplates",
                  "Logo Lockups — four official configurations (horizontal/vertical × light/dark)",
                  "Colour Palette — navy #000066 + gold #D9B650 with HEX/RGB/CMYK + tonal scales",
                  "Typography — Bricolage Grotesque + Sora specimen spread",
                  "Imagery Direction — photography do's/don'ts + treatment specs",
                  "Stationery — letterhead + business card application spread",
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
              <div className="flex sm:hidden gap-3 overflow-x-auto pb-3 -mx-4 px-4">
                {[
                  "Cover", "Brand Story", "History Timeline",
                  "Logo & Mark", "Logo Lockups", "Colour Palette",
                  "Typography", "Imagery Direction", "Stationery",
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
              <p className="mt-5 text-[14px] text-white/35 leading-relaxed">
                Tap any spread to view it full-size. The 2020 guideline was a static reference; this is a working system — every rule specified, every application shown, every chapter aligned.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ══ 06 — PUBLIC WEBSITE WALKTHROUGH ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1300px] mx-auto">
            <FadeUp>
              <SLabel n="06" t="PUBLIC WEBSITE" />
              <H2 white="From institutional" accent="directory to digital flagship" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[620px] mb-14">
                The public website is the first impression NIQS makes — for prospective members, regulators, corporate partners, journalists, and the public. The redesign moved it from a 2020-era institutional directory into a modern editorial platform that respects the institution's authority and shows up the way it should on every device.
              </p>
            </FadeUp>

            <div className="space-y-20">
              {[
                {
                  n: "SCREEN 01",
                  title: "Home & Hero",
                  body: `The home page leads with "Advancing Nigeria's Built Environment" — gold-accented headline over a deep navy hero, paired with a curated five-image strip of construction, conferences, and professionals. A statistics row below the fold anchors the institution's scale: 10,000+ members, 4,000+ corporate QS, 37 chapters, 56 years, 15+ international agreements. Visitors meet NIQS at full presence before they scroll.`,
                  alt: "Desktop browser mockup of NIQS home page hero section",
                  flip: false,
                },
                {
                  n: "SCREEN 02",
                  title: "About & Heritage",
                  body: "Eight sub-sections under About Us — President's office, National Executive Council, National Policy Committee, Past Presidents, State Chapters, WAQSN, YQSF, and Reciprocity Agreements. Each receives editorial treatment: large portrait, contextual sub-heading, accompanying bio or scope statement. Past Presidents becomes a timeline, not a list. The institution finally tells its own story.",
                  alt: "Desktop mockup showing the About / President page",
                  flip: true,
                },
                {
                  n: "SCREEN 03",
                  title: "Membership & Public Search",
                  body: 'Membership routes split cleanly: Requirements & Registration for the public, Member Portal / Induction Letter / Upgrade Letter behind the lock for authenticated users. A public "Search QS or QS Firm" lookup lets regulators, employers, and clients verify professional standing without needing to log in. Trust by design.',
                  alt: "Mobile mockup of the Membership page with the public QS search interface",
                  flip: false,
                },
                {
                  n: "SCREEN 04",
                  title: "Exams, Events & News",
                  body: "A dedicated Exams section (Examinations · Published Results · Interview / TPC / Logbook results behind login). A live event calendar (Annual QS Conference, TPC/GDE Examinations, Chapter CPD Seminars). A news feed with editorial card treatment. The site no longer 'has' content — it is a living publication.",
                  alt: "Desktop mockup of the Events + News combined view",
                  flip: true,
                },
                {
                  n: "SCREEN 05",
                  title: "Brand Materials, Jobs & Contact",
                  body: "Brand Materials is a public download surface (logos, official assets). Jobs is an aggregated board. Contact provides the secretariat's direct line. Smaller surfaces, but treated with the same editorial polish as the marquee pages — a sign that the institution doesn't have 'minor' pages.",
                  alt: "Three phone mockups side-by-side: Brand Materials, Jobs, Contact",
                  flip: false,
                },
              ].map(({ n, title, body, alt, flip }, i) => (
                <FadeUp key={n} delay={0.04 * i}>
                  <div className={`flex flex-col gap-6`}>
                    <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 ${flip ? "sm:flex-row-reverse" : ""}`}>
                      <div className="max-w-[420px]">
                        <span
                          className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase mb-3 inline-block"
                          style={{ background: `${GR}15`, color: GR }}
                        >
                          {n}
                        </span>
                        <h3 className="text-[22px] sm:text-[26px] font-semibold text-white mb-4">{title}</h3>
                        <p className="text-[15px] sm:text-[16px] leading-[1.7] text-white/55">{body}</p>
                      </div>
                    </div>
                    <TiltFrame
                      src={null}
                      alt={alt}
                      className="w-full"
                      style={{ aspectRatio: "16/9", maxHeight: "70vh" }}
                      onClick={ph}
                    />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 07 — MEMBER PORTAL & ADMIN DASHBOARD ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <FadeUp>
                <SLabel n="07" t="PORTAL & ADMIN" />
                <H2 white="Built for the" accent="people who run NIQS" />
                <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: GR }} />
                <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                  <p>The public website is the front door. The portal and admin dashboard are where the institution actually operates day-to-day — and they are designed to a different bar: clarity over flourish, density over decoration, repeated use over first-impression.</p>
                  <p>A NIQS staff member who logs into the admin dashboard isn't looking for a hero treatment. They're trying to publish an announcement, approve a membership upgrade, upload a CPD recording, or export a chapter list to Excel before a 4pm deadline. The interface respects that.</p>
                </div>
                <ul className="space-y-3">
                  {[
                    { title: "Member portal", desc: "secure login, profile dashboard (membership category, chapter, status, dates), members-only digital library access, CPD records, event registrations" },
                    { title: "Admin dashboard", desc: "member database (search/filter/edit/export), events creation, news/publications publishing, library uploads with access controls, staff accounts with role-based permissions" },
                    { title: "Role-based access", desc: "three tiers (Admin / Staff / Member) governing every screen, every action, every dataset" },
                    { title: "Digital library", desc: "public-facing section (press releases, public publications, newsletters) and members-only section (CPD recordings, NIQS templates, standards, searchable catalogue with tags)" },
                  ].map(({ title, desc }) => (
                    <li key={title} className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/[0.025] px-4 py-3">
                      <span className="mt-[6px] w-2 h-2 rounded-full shrink-0" style={{ background: GR }} />
                      <p className="text-[15px] sm:text-[16px] leading-[1.6] text-white/55">
                        <span className="text-white font-semibold">{title}</span> — {desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </FadeUp>
              <SlideIn direction="right" delay={0.1}>
                <TiltFrame
                  src={null}
                  alt="Vertical composite: admin dashboard on desktop + member portal on mobile. Lime accent glow."
                  style={{ aspectRatio: "4/5" }}
                  onClick={ph}
                />
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ══ 08 — FLYER DESIGN ENGINE (HIGHLIGHT) ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="08" t="FLYER DESIGN ENGINE" />
              <H2 white="The design tool that" accent="replaced the designer" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[660px] mb-12">
                The Flyer Design Engine is the single most-used output of this project. Built into the admin panel, it lets any NIQS staff member produce on-brand announcements, recognitions, event notices, and press updates by editing details on pre-designed templates — no Photoshop, no Canva, no designer required. Every output is wired to the brand system: colours, typography, logo placement, and approved photography treatments are locked. Staff can't break the brand even if they try.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <StaggerGrid className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    n: "01", title: "Template Library", color: GR,
                    body: "Pre-designed templates for the recurring communication types — Announcements, Events, Recognitions, Press Updates. Each template is built from the brand system, so its typography, palette, and logo placement are already correct.",
                  },
                  {
                    n: "02", title: "Detail Editing", color: "#60A5FA",
                    body: "Staff edit only the editable fields — title, body copy, date, image, signatory. Every other element (font, colour, layout, logo) is locked. The brand cannot drift.",
                  },
                  {
                    n: "03", title: "Export", color: NIQS_GOLD,
                    body: "One-click export to print-ready PDF or social-ready PNG. Output lands in the staff member's downloads in seconds. From idea to publishable artifact: under a minute.",
                  },
                ].map(({ n, title, color, body }) => (
                  <StaggerItem key={n}>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 h-full flex flex-col gap-3">
                      <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
                        style={{ background: `${color}20`, color }}>{n}</span>
                      <p className="text-[15px] font-semibold text-white">{title}</p>
                      <p className="text-[15px] leading-[1.65] text-white/50 flex-1">{body}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="rounded-2xl border p-6 sm:p-8 mb-8" style={{ borderColor: `${GR}44`, background: `${GR}0D` }}>
                <p className="text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: GR }}>THE OPERATIONAL IMPACT</p>
                <p className="text-xl sm:text-2xl font-bold text-white mb-5">Before and after the Engine</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#E05252] mb-2">BEFORE</p>
                    <p className="text-[15px] leading-[1.7] text-white/55">Every flyer required a designer. ~12 flyers per week at the National Secretariat alone, plus chapter-level requests. The volume bottlenecked design output and starved the secretariat of timely communications.</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: GR }}>AFTER</p>
                    <p className="text-[15px] leading-[1.7] text-white/55">Staff produce on-brand flyers in under a minute. The design team focuses on higher-order work (new templates, brand evolution, custom campaigns) instead of redrawing the same recognition flyer for the fortieth time.</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <TiltFrame
                src={null}
                alt="Flyer Design Engine in use — select template → edit fields → export PDF. Animated GIF or 3-frame storyboard: empty template · mid-edit · exported flyer. (Figma TBD)"
                className="w-full"
                style={{ aspectRatio: "16/9" }}
                onClick={ph}
              />
            </FadeUp>
          </div>
        </section>

        {/* ══ 09 — INFORMATION ARCHITECTURE ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="09" t="INFORMATION ARCHITECTURE" />
              <H2 white="The full digital" accent="ecosystem" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[560px] mb-10">
                Three surfaces, three audiences, one connected system. Public website serves the world; member portal serves the membership; admin dashboard serves the secretariat. Every screen, every flow, organised below.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: "Home",                    color: GR,         items: ["Hero", "Stats", "Services", "News", "Events", "Quote", "CTA"] },
                  { name: "About NIQS",              color: "#3B82F6",  items: ["About", "President", "Council", "NPC", "Past Presidents", "Chapters", "WAQSN", "YQSF", "Reciprocity", "Brand Materials"] },
                  { name: "Membership",              color: "#F59E0B",  items: ["Requirements", "QS Search", "Portal 🔒", "Induction Letter 🔒", "Upgrade Letter 🔒"] },
                  { name: "Exams",                   color: "#A78BFA",  items: ["Examinations", "Published Results", "Interview 🔒", "TPC/GDE 🔒", "Logbook 🔒"] },
                  { name: "Research & Devt",         color: "#EC4899",  items: ["Workshops", "Webinars", "Publications", "Journal"] },
                  { name: "News",                    color: "#06B6D4",  items: ["Latest News", "Events Calendar", "QS Connect", "Article Template"] },
                  { name: "Jobs / Payment / Contact",color: "#F97316",  items: ["Jobs board", "Payment portal 🔒", "Secretariat contact"] },
                  { name: "Member Portal",           color: "#6B7280",  items: ["Dashboard", "Profile", "Membership Status", "Library Access", "Event Registrations", "CPD Records"] },
                  { name: "Admin Dashboard",         color: NIQS_GOLD,  items: ["Member DB", "Events", "News", "Library Uploads", "Staff Accounts", "Flyer Engine", "Audit Logs"] },
                ].map(({ name, color, items }) => (
                  <StaggerItem key={name}>
                    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                        <p className="text-[13px] font-semibold text-white leading-tight">{name}</p>
                      </div>
                      {items.map((it) => (
                        <p key={it} className="text-[10px] text-white/35 leading-relaxed">{it}</p>
                      ))}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </FadeUp>

            <FadeUp delay={0.15} className="mt-5">
              <div className="rounded-xl border border-white/8 bg-white/[0.02] px-5 py-3 flex items-start gap-3">
                <span
                  className="mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[10px]"
                  style={{ background: `${GR}20`, color: GR }}
                >
                  i
                </span>
                <p className="text-[15px] text-white/45 leading-relaxed">
                  The full IA map covering all 7 public sections, 5 portal screens, and 9 admin modules is available as a separate Figma frame in the design handover.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══ 10 — KEY DESIGN DECISIONS ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="10" t="KEY DESIGN DECISIONS" />
              <H2 white="The principled" accent="calls behind the rebuild" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[520px] mb-10">
                Every redesign is a series of "why this, not that?" choices. These are the principled calls behind the NIQS rebuild — and the inherited elements that were deliberately preserved.
              </p>
            </FadeUp>

            <StaggerGrid className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  n: "DECISION 01",
                  q: "Why retain the 2020 logo and palette?",
                  a: "The heraldic eagle, the shield, the navy, the gold — these carry 56 years of institutional weight. NIQS members recognise the mark on a wall in Abuja from across the room. A redesign that erased that heritage would be vandalism, not stewardship. The work was to rebuild the system around the mark, not replace the mark.",
                },
                {
                  n: "DECISION 02",
                  q: "Why Bricolage Grotesque + Sora instead of traditional serifs?",
                  a: "Institutional bodies default to serifs (Garamond, Caslon, Times) to signal heritage. NIQS already has heritage — it doesn't need to perform it through typography. Bricolage Grotesque carries the modern editorial voice the institution wants to project today, while its slightly playful characters keep the typography from feeling cold. Sora handles dense UI at small sizes without the legibility hit serifs take in tables and forms.",
                },
                {
                  n: "DECISION 03",
                  q: "Why a custom-coded MERN system instead of WordPress?",
                  a: "WordPress with plugins reached its ceiling for NIQS years ago — role-based access, member portal logic, library permissions, CPD records, and admin workflows are not what plugin-based architectures do well. Custom MERN means the institution owns its stack, scales on its terms, and can integrate new modules (payments, certifications, automation) without fighting a CMS designed for blogs.",
                },
                {
                  n: "DECISION 04",
                  q: "Why a separate member portal instead of 'member pages' on the public site?",
                  a: "Members are not visitors. A member is logging in to act — check status, register for events, download CPD certificates, update their profile. A separate portal lets that surface be designed for repeated, focused use without compromising the public site's editorial polish. Role-based access (Admin / Staff / Member) is enforced in the data model, not just the UI.",
                },
                {
                  n: "DECISION 05",
                  q: "Why build the Flyer Design Engine instead of just providing Photoshop templates?",
                  a: "Photoshop templates require a designer (or a comfortable Canva user) to operate. The secretariat is not staffed for that — and shouldn't need to be. The Flyer Engine flips the model: the design system becomes a UI, and any staff member becomes a competent operator. The brand cannot be broken because the brand is encoded into the tool. This is the single highest-leverage decision in the project.",
                },
                {
                  n: "DECISION 06",
                  q: "Why a 60-page brand guideline when a 30-page version would have been faster?",
                  a: "NIQS operates across 37 state chapters, has 10,000+ members, runs annual conferences, produces publications, signs international agreements, and communicates publicly through media. Every one of those touchpoints needs a brand reference — and the 2020 guideline didn't cover most of them. The 60-page guideline isn't decorative; it's the operating manual for an institution at this scale.",
                },
              ].map(({ n, q, a }) => (
                <StaggerItem key={n}>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 h-full flex flex-col gap-3">
                    <span
                      className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase w-fit"
                      style={{ background: `${GR}15`, color: GR }}
                    >
                      {n}
                    </span>
                    <p className="text-[15px] font-semibold text-white leading-snug">{q}</p>
                    <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50 flex-1">{a}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* ══ 11 — TESTING & ITERATION ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <SlideIn direction="left" delay={0.05}>
                <TiltFrame
                  src={null}
                  alt="Before/after comparison of home hero draft vs. final version, with annotation arrows. Or Figma file thumbnail showing version history."
                  style={{ aspectRatio: "4/5" }}
                  onClick={ph}
                />
              </SlideIn>
              <FadeUp delay={0.1}>
                <SLabel n="11" t="TESTING & ITERATION" />
                <H2 white="What the" accent="reviews surfaced" />
                <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: GR }} />
                <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-8">
                  <p>Designs went through formal stakeholder review with the NIQS National Secretariat — primary approver and backup approver, with 48–72 hour design review windows defined in the MoU. Two revision cycles per major deliverable.</p>
                  <p>Three iteration themes shaped the final designs.</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">KEY REVISION AREAS</p>
                  <ul className="space-y-4">
                    {[
                      {
                        title: "Hero treatment for the home page",
                        desc: 'Earlier drafts leaned too "tech startup," not enough "institutional body." The final hero darkens the photography heavily, lets the typography carry the weight, and adds the statistics row to anchor the institution\'s scale immediately.',
                      },
                      {
                        title: "Council & past-presidents layouts",
                        desc: "Initially designed as uniform grids; revised into editorial portrait treatments with proper context, because every name in those lists carries institutional weight that a grid flattens.",
                      },
                      {
                        title: "Flyer Engine field controls",
                        desc: 'Earlier versions exposed too many editable fields (font choice, colour pickers) which broke the "you cannot break the brand" guarantee. Final version locks everything except the content the staff member actually needs to change.',
                      },
                    ].map(({ title, desc }) => (
                      <li key={title} className="flex items-start gap-3">
                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GR }} />
                        <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55">
                          <span className="text-white font-semibold">{title}</span> — {desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ 12 — IMPACT ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="12" t="IMPACT" />
              <H2 white="Measuring the" accent="transformation" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[560px] mb-10">
                The success of this project is measured by what the institution can now do that it couldn't before — and by the operational time the design system gives back to the secretariat.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
              <StaggerGrid className="space-y-3">
                {[
                  { metric: "Self-serve communications",             color: GR,         desc: "Secretariat staff produce on-brand flyers in under a minute. Eliminates the designer-bottleneck for the ~12 weekly recurring outputs." },
                  { metric: "Member-portal access",                  color: "#60A5FA",  desc: "First time NIQS members can log in and self-serve membership status, CPD records, event registrations, and digital library access." },
                  { metric: "Brand consistency across 37 chapters",  color: "#A78BFA",  desc: "Working brand guideline + templates pack gives every state chapter a single source of truth. National and chapter communications now read as one institution." },
                  { metric: "Institutional-grade digital presence",  color: "#F59E0B",  desc: "The first impression NIQS makes on regulators, partners, and the public now matches the institution's stature." },
                  { metric: "A scalable design system",              color: "#EC4899",  desc: "Every future NIQS digital product — new modules, integrations, sub-platforms — inherits a working system rather than starting from scratch." },
                ].map(({ metric, color, desc }) => (
                  <StaggerItem key={metric}>
                    <div className="rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 flex items-start gap-4">
                      <span className="mt-1.5 w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                      <div>
                        <p className="text-[14px] font-semibold text-white mb-1">{metric}</p>
                        <p className="text-[15px] leading-[1.65] text-white/50">{desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>

              <SlideIn direction="right" delay={0.1}>
                <TiltFrame
                  src={null}
                  alt="Product family shot — website + portal + admin + flyer engine + brand guideline arranged as a system diagram or ecosystem"
                  style={{ aspectRatio: "3/4", minHeight: "300px" }}
                  onClick={ph}
                />
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ══ 13 — REFLECTION & LEARNINGS ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="13" t="LEARNINGS" />
              <H2 white="Reflection &" accent="learnings" />
            </FadeUp>
            <FadeUp delay={0.1} className="mt-8">
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-8 sm:p-10">
                <div className="space-y-6 text-[15px] sm:text-[16px] leading-[1.75] text-white/60 mb-8">
                  <p>NIQS reinforced something I'd been circling for a while: a brand redesign for an institution is fundamentally different from a brand redesign for a startup. Institutions have weight that the design must protect — fifty-six years of recognition, of letterhead, of certificate stamps, of conference programmes — and the work is to <em>update without erasing</em>. Every choice on this project was filtered through that lens.</p>
                  <p>The Flyer Design Engine was the clearest reminder that the most useful design work is sometimes invisible. A brand guideline lives on a designer's shelf; a templates pack lives in a designer's folder. A design <em>engine</em> lives inside the workflow of the people the institution actually depends on day-to-day. The leverage on that decision will compound for years.</p>
                  <p>This was also the largest single-client engagement of my career so far — a signed MoU, a six-figure naira budget, an institutional approval workflow, a developer partnership, and a real handover. It reinforced that the design discipline scales when it's paired with the infrastructure to deliver it. ADLM Studio is built around that pairing, and NIQS is the first full institutional expression of what that partnership can produce.</p>
                </div>
                <div className="border-t border-white/8 pt-6">
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
                      style={{ background: GR }}
                    >
                      R
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Richard Enoch</p>
                      <p className="text-[11px]" style={{ color: GR }}>Creative Lead · ADLM Studio</p>
                      <p className="text-[10px] text-white/35">NIQS Digital Transformation · 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══ 14 — GALLERY ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <FadeUp>
              <SLabel n="14" t="GALLERY" />
              <H2 white="The full" accent="system" />
              <p className="mt-4 mb-10 text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[520px]">
                Selected screens, spreads, and mockups from across the NIQS digital ecosystem — brand guideline, website, portal, admin, and flyer engine.
              </p>
            </FadeUp>

            {/* Desktop bento grid — 12 slots, 5 rows */}
            <div
              className="hidden sm:grid gap-3"
              style={{
                gridTemplateColumns: "repeat(12, 1fr)",
                gridTemplateRows: "300px 300px 200px 240px 240px",
              }}
            >
              {/* Row 1 — 3 uneven containers (5:4:3) */}
              <BentoCell n={1}  style={{ gridColumn: "1 / 6",  gridRow: "1 / 2" }} cap="Website home — full desktop hero section" />
              <BentoCell n={2}  style={{ gridColumn: "6 / 10", gridRow: "1 / 2" }} cap="Brand guideline cover spread" />
              <BentoCell n={3}  style={{ gridColumn: "10 / 13",gridRow: "1 / 2" }} cap="Logo system — four lockup configurations" />
              {/* Row 2 — 2 uneven (4:8) */}
              <BentoCell n={4}  style={{ gridColumn: "1 / 5",  gridRow: "2 / 3" }} cap="Member portal — dashboard overview" />
              <BentoCell n={5}  style={{ gridColumn: "5 / 13", gridRow: "2 / 3" }} cap="Admin dashboard — member database view" />
              {/* Row 3 — 2 even halves (was single panoramic) */}
              <BentoCell n={6}  style={{ gridColumn: "1 / 7",  gridRow: "3 / 4" }} cap="Website About page or brand story spread" />
              <BentoCell n={7}  style={{ gridColumn: "7 / 13", gridRow: "3 / 4" }} cap="Colour & typography system spread" />
              {/* Row 4 — 3 equal thirds */}
              <BentoCell n={8}  style={{ gridColumn: "1 / 5",  gridRow: "4 / 5" }} cap="Flyer design engine — template select" />
              <BentoCell n={9}  style={{ gridColumn: "5 / 9",  gridRow: "4 / 5" }} cap="Flyer engine — editing interface" />
              <BentoCell n={10} style={{ gridColumn: "9 / 13", gridRow: "4 / 5" }} cap="Stationery — letterhead & business card" />
              {/* Row 5 — 2 (8:4) */}
              <BentoCell n={11} style={{ gridColumn: "1 / 9",  gridRow: "5 / 6" }} cap="Website news/events section or portal library" />
              <BentoCell n={12} style={{ gridColumn: "9 / 13", gridRow: "5 / 6" }} cap="Mobile screen — membership or portal login" />
            </div>

            {/* Mobile: 2-col grid, all at 4:3 */}
            <div className="sm:hidden grid grid-cols-2 gap-3">
              {Array.from({ length: 12 }, (_, i) => (
                <BentoCell
                  key={i + 1}
                  n={i + 1}
                  style={{ aspectRatio: "4/3" }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══ 15 — FOOTER ══ */}
        <OtherProj currentSlug="niqs" currentKind="ui" />
        <BuildSection />

      </div>
    </div>
  );
}
