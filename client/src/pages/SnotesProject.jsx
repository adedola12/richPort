// src/pages/SnotesProject.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";

const GR = "#a3e635";

/* ─── animation primitives ─── */
const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0, margin: "0px 0px -40px 0px" }}
    transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

const SlideIn = ({ children, direction = "left", delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: direction === "left" ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0, margin: "0px 0px -40px 0px" }}
    transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

const StaggerGrid = ({ children, className = "" }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0, margin: "0px 0px -40px 0px" }}
    variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
  >
    {children}
  </motion.div>
);

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
  <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em]">
    <span className="text-white">{white} </span>
    <span style={{ color: accentColor }}>{accent}</span>
  </h2>
);

/* ─── TiltFrame — handles null src as a placeholder ─── */
const TiltFrame = ({ src, alt = "", caption = "", className = "", style = {}, onClick }) => {
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
        className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] relative h-full"
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
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-8"
            style={{ background: "repeating-linear-gradient(45deg, #0f1318 0px, #0f1318 10px, #111820 10px, #111820 20px)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(163,230,53,0.3)" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className="text-center text-[11px] font-semibold leading-[1.5] text-white/40 max-w-[220px]"
              style={{ color: "rgba(163,230,53,0.5)" }}>{caption}</p>
          </div>
        )}
        {onClick && src && (
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
const PERSONAS = [
  {
    name: "Richard",
    subtitle: "The Pentecostal Note-Taker",
    img: null,
    caption: "Stylised portrait: young Nigerian man with Bible/phone, thoughtful",
    about:
      "Richard is a 26-year-old Christian designer in Lagos, Nigeria. A graduate of the School of Ministry at the Segun Obadje Teaching Ministry, he attends Sunday Service, Bible Study, and occasional conferences. He takes notes on his phone every Sunday but can never find them again. His action points die in untitled notes. He wants a tool that respects his rhythm — quiet during service, gently attentive after.",
  },
  {
    name: "Tosin",
    subtitle: "The Reflective Believer",
    img: null,
    caption: "Stylised portrait: young Nigerian woman journaling",
    about:
      "Tosin is a 24-year-old young professional in Lagos who attends church weekly with her partner. She values revisiting what she's heard and journaling reflections on it, but the existing Notes app makes that hopeless. She wants a private space to capture sermons and a way to share thoughtfully with her partner — without it becoming social media.",
  },
  {
    name: "Pastor Daniel",
    subtitle: "The Teaching Minister (V4 Candidate)",
    img: null,
    caption: "Stylised portrait: Nigerian pastor in a small church setting",
    about:
      "Pastor Daniel is a 38-year-old minister leading a small Pentecostal church in Ibadan. He'd love for his congregation to have a structured way to capture his teachings — and eventually, a way for him to publish sermon notes branded for his church that members can subscribe to. He represents the V4 horizon, not the V1 user, but his needs shape long-term architecture.",
  },
];

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
            style={{ minWidth: 0, background: "repeating-linear-gradient(45deg, #0f1318 0px, #0f1318 10px, #111820 10px, #111820 20px)" }}
            onHoverStart={() => setActive(i)}
          >
            {/* placeholder background */}
            {!p.img && (
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <p className="text-[10px] font-semibold text-center leading-[1.5]" style={{ color: "rgba(163,230,53,0.35)" }}>{p.caption}</p>
              </div>
            )}
            {p.img && (
              <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover object-top select-none" draggable={false} />
            )}

            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, #07090C 0%, rgba(7,9,12,0.82) 35%, rgba(7,9,12,0.3) 65%, rgba(7,9,12,0.05) 100%)" }} />

            {isActive && (
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(163,230,53,0.3), 0 0 40px 8px rgba(163,230,53,0.12)" }} />
            )}

            <AnimatePresence>
              {!isActive && (
                <motion.div key="label" className="absolute bottom-0 left-0 right-0 px-5 py-5 pointer-events-none"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.28 }}>
                  <p className="text-[19px] font-bold text-white leading-tight">{p.name}</p>
                  <p className="text-[13px] mt-1 font-medium" style={{ color: GR }}>{p.subtitle}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isActive && (
                <motion.div key="panel" className="absolute bottom-0 left-0 right-0 px-6 py-6 pointer-events-none"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}>
                  <p className="text-[10px] tracking-[0.28em] uppercase mb-2" style={{ color: GR }}>User Persona</p>
                  <p className="text-[26px] font-bold text-white leading-tight tracking-[-0.02em] mb-1">{p.name}</p>
                  <p className="text-[13px] font-medium mb-4" style={{ color: GR }}>{p.subtitle}</p>
                  <p className="text-[14px] leading-[1.7] text-white/70">{p.about}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
const SnotesProject = () => {
  return (
    <div className="relative min-h-screen bg-[#07090C] text-white overflow-x-hidden font-['Outfit']">

      {/* ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]"
          style={{ background: `${GR}0D` }} />
        <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]"
          style={{ background: `${GR}09` }} />
      </div>

      <div className="relative z-10">

        {/* ══ 00 — HERO ══ */}
        <section className="relative pt-28 pb-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(163,230,53,0.08)_0%,transparent_70%)]" />
          </div>

          <div className="relative max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="flex items-center gap-4 mb-8">
                <Link to="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-[12px] text-white/60 hover:bg-white/10 transition backdrop-blur-md">
                  ← Back
                </Link>
                <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                  style={{ borderColor: `${GR}44`, color: GR, background: `${GR}0D` }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: GR }} />
                  UI / UX Case Study · Concept
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1
                className="text-5xl sm:text-6xl lg:text-[72px] font-semibold leading-[0.95] tracking-[-0.03em] mb-5"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #7a7a7a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                Snotes
              </h1>
              <p className="text-[16px] sm:text-[18px] leading-[1.65] text-white/55 max-w-[580px] mb-10">
                A focused mobile sermon note-taking app — built quietly, for people who want to actually live what they hear.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(163,230,53,0.08)]"
                style={{ minHeight: 320 }}>
                <div className="pointer-events-none absolute inset-[-1px] rounded-[inherit] bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(163,230,53,0.12)_0%,transparent_70%)]" />
                <div className="w-full flex items-center justify-center" style={{ minHeight: 320, maxHeight: "60vh", background: "repeating-linear-gradient(45deg, #0f1318 0px, #0f1318 10px, #111820 10px, #111820 20px)" }}>
                  <div className="flex flex-col items-center gap-3 p-10">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(163,230,53,0.3)" strokeWidth="1.5" strokeLinecap="round">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <p className="text-[12px] font-semibold text-center max-w-[300px] leading-[1.5]" style={{ color: "rgba(163,230,53,0.5)" }}>
                      Hero composition — Figma TBD
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══ 01 — THE BRIEF ══ */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">

            {/* stats row */}
            <FadeUp>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
                {[
                  { label: "TIMELINE", value: "V1 in 4 weeks" },
                  { label: "DATE", value: "Concept · 2026" },
                  { label: "PLATFORM", value: "Android (V1)" },
                  { label: "STATUS", value: "In Pre-Build", accent: true },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-4">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1">{label}</p>
                    <p className="text-[14px] font-semibold" style={{ color: accent ? GR : "white" }}>{value}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-start">
              <SlideIn direction="left" delay={0.1}>
                <SLabel n="01" t="THE BRIEF" />
                <H2 white="Overview of" accent="the concept" />
                <div className="mt-5 mb-6 h-[2px] w-16 rounded-full" style={{ background: GR }} />

                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-5">
                  Snotes is a mobile sermon note-taking app conceived as a personal product first, with a structured path to broader release. Most churchgoers use the default Notes app on their phone to capture sermon notes — a tool built for grocery lists, not for the rhythm of a teaching that weaves scripture, exhortation, and personal conviction. Snotes treats scripture as structured data, action points as first-class commitments, and AI as an ambient companion — not a productivity tool, not a Bible study app, not a social network.
                </p>
                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                  I'm building Snotes the same way I built my personal Life & Work OS — first for me, then for the people who pray for me, then (eventually) for the people I've never met who carry the same Bible to church on Sunday. This case study captures the strategy and conceptual phase before design and build.
                </p>

                <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">DELIVERABLES</p>
                <div className="flex flex-wrap gap-2">
                  {["Product Strategy", "Three-Phase Rollout Plan", "UX Principles", "Information Architecture", "Technical Architecture", "Concept Documentation", "Design & Build — Upcoming"].map((d) => (
                    <span key={d} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/60">{d}</span>
                  ))}
                </div>
              </SlideIn>

              <SlideIn direction="right" delay={0.15}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: GR }}>MY ROLE</p>
                  <p className="text-[15px] font-semibold text-white mb-3">Founder · Product Strategy · UX Architect</p>
                  <p className="text-[14px] leading-[1.65] text-white/55 mb-4">
                    I led Snotes from problem identification to product strategy and concept architecture, owning:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Problem framing & user research (myself as primary subject)",
                      "Three-phase product strategy (V1 / V2 / V3)",
                      "UX principles & design posture",
                      "Information architecture",
                      "Technical architecture & API stack decisions",
                      "Concept documentation (~10,000 words across three docs)",
                      "Brand & visual direction (in progress)",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: GR }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ══ 02 — THE PROBLEM ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">
              <FadeUp>
                <SLabel n="02" t="THE PROBLEM" />
                <H2 white="What's the" accent="problem?" accentColor="#E05252" />
                <div className="mt-5 mb-6 h-[2px] w-16 rounded-full" style={{ background: "#E05252" }} />
                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                  Sermon notes are taken in the wrong place. The result is predictable — notes get lost, scripture references stay as plain text, action points die in untitled lists, and reflection rarely happens. Four core problems, mapped from personal use:
                </p>
                <ul className="space-y-3">
                  {[
                    { n: "01", title: "Notes are unstructured", desc: "Default Notes apps don't understand the anatomy of a sermon — service type, minister, anchor scriptures, body, action points. Everything is plain text, lost among grocery lists and reminders." },
                    { n: "02", title: "Scripture is treated as text", desc: "Bible references like \"John 3:16\" sit as plain characters. No autocomplete, no inline expansion, no aggregation. The most important content in a sermon note is the least functional." },
                    { n: "03", title: "Action points die in the list", desc: "The whole point of a sermon is application — but action points get buried inside the note where they were written, with no cross-note view, no state tracking, no follow-up." },
                    { n: "04", title: "Reflection never happens", desc: "Notes get saved and forgotten. No nudge to revisit, no prompt to reflect, no way to know if last month's conviction is still active." },
                  ].map(({ n, title, desc }) => (
                    <li key={n} className="flex items-start gap-4 rounded-2xl border border-[#E0525222] bg-[#1A0A0A] p-5">
                      <span className="shrink-0 w-7 h-7 rounded-full border border-[#E0525244] flex items-center justify-center text-[10px] font-bold text-[#E05252]">{n}</span>
                      <div>
                        <p className="text-[14px] font-semibold text-white mb-1">{title}</p>
                        <p className="text-[14px] leading-[1.65] text-white/50">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </FadeUp>

              <SlideIn direction="right" delay={0.15}>
                <TiltFrame
                  src={null}
                  caption="Split visual: chaotic phone Notes app vs. structured Snotes note with metadata, scripture chips, and action points"
                  className="w-full"
                  style={{ aspectRatio: "4/5" }}
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
              <H2 white="What the" accent="landscape showed" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[600px]">
                Research combined personal use, market scanning of existing tools, and structural analysis of the sermon note-taking experience. The conclusion was clear: nothing on the market solves this specific use case well.
              </p>
            </FadeUp>

            <div className="mt-12 grid lg:grid-cols-[1fr_340px] gap-6 items-stretch">

              {/* competitive table */}
              <SlideIn direction="left" delay={0.1} className="h-full">
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden h-full flex flex-col">
                  <div className="px-5 py-4 border-b border-white/8">
                    <p className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: GR }}>Competitive Advantage</p>
                  </div>
                  <div className="overflow-x-auto flex-1">
                    <table className="w-full h-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/8">
                          <th className="px-5 py-3 text-[11px] font-semibold text-white/40 w-[44%]">Feature</th>
                          <th className="px-3 py-3 text-[11px] font-semibold text-center" style={{ color: GR }}>Snotes</th>
                          <th className="px-3 py-3 text-[11px] font-semibold text-white/40 text-center">YouVersion</th>
                          <th className="px-3 py-3 text-[11px] font-semibold text-white/40 text-center">Logos</th>
                          <th className="px-3 py-3 text-[11px] font-semibold text-white/40 text-center">Evernote</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { f: "Built for sermon note-taking",        s:true,  y:false, l:false, e:false },
                          { f: "Inline scripture autocomplete",       s:true,  y:false, l:false, e:false },
                          { f: "Auto-populated anchor scriptures",    s:true,  y:false, l:false, e:false },
                          { f: "Action points as first-class entity", s:true,  y:false, l:false, e:false },
                          { f: "Service-aware reminders & focus",     s:true,  y:false, l:false, e:false },
                          { f: "AI-driven reflection prompts",        s:true,  y:false, l:false, e:false },
                          { f: "Offline scripture handling",          s:true,  y:true,  l:true,  e:false },
                          { f: "Multi-translation support",           s:true,  y:true,  l:true,  e:false },
                          { f: "Designed for the pew (not study)",    s:true,  y:false, l:false, e:false },
                        ].map(({ f, s, y, l, e }, i) => (
                          <tr key={f} className={i % 2 === 0 ? "bg-white/[0.015]" : ""}>
                            <td className="px-5 py-3 text-[13px] text-white/70">{f}</td>
                            <td className="px-3 py-3 text-center text-[14px]">{s ? "✅" : "❌"}</td>
                            <td className="px-3 py-3 text-center text-[14px]">{y ? "✅" : "❌"}</td>
                            <td className="px-3 py-3 text-center text-[14px]">{l ? "✅" : "❌"}</td>
                            <td className="px-3 py-3 text-center text-[14px]">{e ? "✅" : "❌"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </SlideIn>

              {/* insights panels */}
              <SlideIn direction="right" delay={0.2} className="h-full">
                <div className="flex flex-col gap-4 h-full">

                  {/* donut — 100% */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 flex-1 flex flex-col justify-center">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">PROBLEM VALIDATION</p>
                    <div className="flex items-center gap-5">
                      <div className="relative shrink-0 w-[90px] h-[90px]">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                          <motion.circle cx="50" cy="50" r="38" fill="none" stroke={GR} strokeWidth="10" strokeLinecap="round"
                            strokeDasharray="238.76"
                            initial={{ strokeDashoffset: 238.76 }}
                            whileInView={{ strokeDashoffset: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[15px] font-black" style={{ color: GR }}>100%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-white leading-tight mb-1">of personal sermon notes</p>
                        <p className="text-[13px] leading-[1.6] text-white/50">over six months of services — captured on the default Notes app. Not one was reopened after the week it was written.</p>
                      </div>
                    </div>
                  </div>

                  {/* feature coverage bars */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 flex-1 flex flex-col justify-center">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">FEATURE COVERAGE</p>
                    <div className="space-y-3">
                      {[
                        { label: "Snotes",     pct: 100, color: GR },
                        { label: "YouVersion", pct: 25,  color: "#60A5FA" },
                        { label: "Logos",      pct: 15,  color: "#A78BFA" },
                        { label: "Evernote",   pct: 10,  color: "#6B7280" },
                      ].map(({ label, pct, color }) => (
                        <div key={label}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[12px] text-white/60">{label}</span>
                            <span className="text-[11px] font-bold" style={{ color }}>{pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <motion.div className="h-full rounded-full" style={{ background: color }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: false, amount: 0.5 }}
                              transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] leading-[1.5] text-white/30 mt-3">Feature coverage across the nine pillars defined for sermon note-taking.</p>
                  </div>

                </div>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ══ 04 — VISUAL BAND ══ */}
        <section className="py-10 sm:py-16 px-3 sm:px-6">
          <FadeUp className="max-w-[1100px] mx-auto">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 flex items-center justify-center aspect-[4/5] sm:aspect-[16/9]"
              style={{ borderColor: `${GR}55`, background: "repeating-linear-gradient(45deg, #0f1318 0px, #0f1318 10px, #111820 10px, #111820 20px)" }}>
              <div className="flex flex-col items-center gap-3">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(163,230,53,0.3)" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <p className="text-[12px] font-semibold text-center max-w-[300px] leading-[1.5]" style={{ color: "rgba(163,230,53,0.5)" }}>Visual band — Figma TBD</p>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ══ 05 — CORE FEATURES ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="05" t="CORE FEATURES" />
              <H2 white="Four wedges, one" accent="quiet companion" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[560px]">
                Snotes is built around four wedges that, together, no existing tool combines. Each one resolves a specific problem the default Notes app can't solve.
              </p>
            </FadeUp>

            <div className="mt-12 space-y-10">
              {[
                {
                  n: "01", name: "Inline Scripture Autocomplete",
                  desc: "Type \"John 3:16\" and a suggestion chip appears just above the cursor. Accept it, and the reference becomes a styled, tappable scripture chip. Tap the chip later to open the full verse — switch translations, render inline, or insert a snippet. Scripture is no longer plain text. It's structured data, recognised even offline.",
                  caption: "Phone mockup: scripture autocomplete chip rising above cursor with annotated callouts",
                  flip: false,
                },
                {
                  n: "02", name: "Anchor Scriptures Auto-Populate",
                  desc: "Every accepted scripture chip auto-appends to the note's Anchor Scriptures list, deduplicated, with zero manual maintenance. The user gets a clean reference index for every sermon, automatically.",
                  caption: "Phone mockup: note header with auto-populated anchor scriptures listing five references",
                  flip: true,
                },
                {
                  n: "03", name: "Action Points as a First-Class Entity",
                  desc: "Highlight any line in a note → mark it as an Action. Action points live in their own cross-note collection with three states: Open, In Progress, Completed. The sermon's purpose — application — finally has a place to live. AI gently follows up on long-open items.",
                  caption: "Phone mockup: action points tab with items grouped by state and parent-sermon context",
                  flip: false,
                },
                {
                  n: "04", name: "Service-Aware Ambient AI",
                  desc: "Snotes knows your weekly service rhythm. It gently reminds before service, protects attention during (via Focus Mode and Do Not Disturb), and walks alongside afterward with a thoughtful cadence: three hours, next morning, three days, seven days. Never speaks during the service. Always dismissable.",
                  caption: "Phone mockup sequence: pre-service reminder, in-service focus indicator, post-service reflection prompt",
                  flip: true,
                },
                {
                  n: "05", name: "Degrade Gracefully, Restore Intelligently",
                  desc: "Network drops mid-service? Snotes keeps going. Reference-shape detection works against a local KJV cache. When the network returns, the app retroactively scans the note and converts recognised references into formatted chips. Inspired by how Grammarly behaves when Wi-Fi drops in Google Docs.",
                  caption: "Visual diagram: offline note-taking on one side, online retroactive tagging on the other",
                  flip: false,
                },
              ].map(({ n, name, desc, caption, flip }) => (
                <div key={n} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <SlideIn direction={flip ? "right" : "left"} delay={0.1}>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 sm:p-8">
                      <span className="inline-block rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase mb-4"
                        style={{ background: `${GR}15`, color: GR }}>FEATURE {n}</span>
                      <h3 className="text-[20px] sm:text-[22px] font-bold text-white mb-3">{name}</h3>
                      <p className="text-[14px] sm:text-[15px] leading-[1.7] text-white/55">{desc}</p>
                    </div>
                  </SlideIn>
                  <SlideIn direction={flip ? "left" : "right"} delay={0.15}>
                    <div className="w-full aspect-[4/5] sm:aspect-[16/9]">
                      <TiltFrame src={null} caption={caption} className="w-full h-full" />
                    </div>
                  </SlideIn>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 06 — USER PERSONAS ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="06" t="USER PERSONAS" />
              <H2 white="Who this was" accent="designed for" />
              <p className="mt-5 mb-10 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[540px]">
                Three distinct believer archetypes shaped every product decision — from feature priority to the AI's tone of voice.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <PersonaSection />
            </FadeUp>
          </div>
        </section>

        {/* ══ 07 — WHO IT'S FOR ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="07" t="TARGET USERS" />
              <H2 white="Who uses" accent="Snotes?" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[520px]">
                Snotes is built for African Pentecostal and charismatic believers — Nigeria first, then West Africa, then the broader English-speaking Christian world.
              </p>
            </FadeUp>

            <StaggerGrid className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { title: "Young Adult Believers", color: GR, desc: "Smartphone-first churchgoers, 22–35, attending at least one weekly service. The V1 and V2 primary audience." },
                { title: "Married Couples", color: "#60A5FA", desc: "Spouses who attend church together and want shared visibility into each other's notes — the V2 spouse-mode audience." },
                { title: "Small Groups & Ministry Teams", color: "#A78BFA", desc: "Bible study groups, ministry teams, and church leadership circles who want to share what they've heard with people who already pray for them." },
              ].map(({ title, color, desc }) => (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 h-full flex flex-col gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    <p className="text-[16px] font-bold text-white">{title}</p>
                    <p className="text-[14px] leading-[1.65] text-white/50 flex-1">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <FadeUp delay={0.15} className="mt-6">
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">SHARED CHALLENGES</p>
                <div className="flex flex-wrap gap-2">
                  {["Notes lost in default app", "No structure for sermon context", "Action points never revisited", "Difficulty staying engaged across weeks", "Sermon reflection rarely happens"].map((c) => (
                    <span key={c} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/55">{c}</span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══ 08 — PRODUCT PHASES ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <FadeUp delay={0.1}>
                <SLabel n="08" t="PRODUCT STRATEGY" />
                <H2 white="Three phases." accent="One product." />
                <div className="mt-5 mb-6 h-[2px] w-16 rounded-full" style={{ background: GR }} />

                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-6">
                  Snotes is structured to earn the right to scale. Each version answers a distinct question. V1 doesn't try to be V3. The product matures alongside the people using it.
                </p>

                {/* pull quote */}
                <blockquote className="border-l-2 pl-5 mb-8" style={{ borderColor: GR }}>
                  <p className="text-[15px] sm:text-[16px] leading-[1.7] italic text-white/70">
                    "V1 is for you. V2 is for the people who pray for you. V3 is for the people you've never met but who carry the same Bible to church on Sunday."
                  </p>
                </blockquote>

                <ul className="space-y-5">
                  {[
                    { v: "V1", label: "Snotes for One", meta: "Android · ~1 month build · personal use", desc: "A personal journal. One user, one device, no accounts, local-first. The minimum useful product to replace the default Notes app for sermon note-taking. Tests one question: Does this work for me?" },
                    { v: "V2", label: "Snotes for the Close Circle", meta: "Android · 1.5-month closed beta · 3–4 invited users", desc: "Adds identity, sync, and small trusted Circles — spouse, small group, ministry team. \"Connective, not social\" is the governing principle: no feed, no public counts, no streaks. Tests: Does this work for us?" },
                    { v: "V3", label: "Snotes for the Church", meta: "Android + iOS + Web · public release · Naira-first pricing", desc: "Open release on Play Store and App Store. Freemium model: public-domain translations and core features free; licensed translations, multi-device sync, and Circles paid. Tests: Does this work for the Church?" },
                  ].map(({ v, label, meta, desc }) => (
                    <li key={v} className="flex gap-4">
                      <span className="shrink-0 mt-0.5 rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase h-fit"
                        style={{ background: `${GR}15`, color: GR }}>{v}</span>
                      <div>
                        <p className="text-[14px] font-bold text-white mb-0.5">{label}</p>
                        <p className="text-[11px] text-white/35 mb-1.5">{meta}</p>
                        <p className="text-[13px] leading-[1.65] text-white/55">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </FadeUp>

              <SlideIn direction="right" delay={0.15}>
                <TiltFrame
                  src={null}
                  caption="Vertical infographic: V1/V2/V3 stacked panels with feature progression — solo → small group → public"
                  className="w-full"
                  style={{ aspectRatio: "4/5" }}
                />
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ══ 09 — SCRIPTURE ARCHITECTURE ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="09" t="SCRIPTURE ARCHITECTURE" />
              <H2 white="How scripture" accent="actually works" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[560px]">
                A three-tier layered approach to Bible content. Ensures every user has a translation that matches their context, the network never breaks the experience, and the architecture is already structured for a future commercial transition.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="mt-10">
              <StaggerGrid className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    layer: "Layer 1 · Offline Cache",
                    color: GR,
                    fields: [
                      { label: "Translation", value: "KJV (King James Version)" },
                      { label: "Source", value: "Local SQLite cache, ~5MB" },
                      { label: "Offline", value: "Yes" },
                      { label: "Usage", value: "Autocomplete baseline, always-available fallback, retroactive tagging" },
                    ],
                  },
                  {
                    layer: "Layer 2 · Primary API",
                    color: "#3B82F6",
                    fields: [
                      { label: "Translations", value: "NKJV, NIV, AMP" },
                      { label: "Source", value: "API.Bible (Starter — non-commercial, V1/V2)" },
                      { label: "Offline", value: "No" },
                      { label: "Usage", value: "Default translations for V1, used in scripture popups" },
                    ],
                  },
                  {
                    layer: "Layer 3 · Public-Domain Fallback",
                    color: "#F59E0B",
                    fields: [
                      { label: "Translations", value: "BSB, WEB" },
                      { label: "Source", value: "HelloAO Free Use Bible API (MIT licensed)" },
                      { label: "Offline", value: "No (cacheable)" },
                      { label: "Usage", value: "Redundancy when Layer 2 unavailable" },
                    ],
                  },
                ].map(({ layer, color, fields }) => (
                  <StaggerItem key={layer}>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden h-full flex flex-col">
                      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/8">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                        <p className="text-[12px] font-bold text-white">{layer}</p>
                      </div>
                      <div className="p-5 flex flex-col gap-3 flex-1">
                        {fields.map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-[9px] tracking-[0.2em] uppercase text-white/30 mb-0.5">{label}</p>
                            <p className="text-[13px] leading-[1.5] text-white/65">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>

              <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 flex items-start gap-3">
                <span className="text-[16px] shrink-0">ℹ️</span>
                <p className="text-[13px] leading-[1.65] italic text-white/45">
                  V3 transitions to API.Bible Pro (commercial license) for NKJV/NIV/AMP/MSG with FUMS reporting integrated. V1 architecture is already structured for this transition — no rewrite needed.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══ 10 — INFORMATION ARCHITECTURE ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="10" t="INFORMATION ARCHITECTURE" />
              <H2 white="The V1" accent="data model" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[520px]">
                A snapshot of the V1 information model. V2 adds Accounts, Circles, and Shares. V3 adds Subscriptions and Localisation.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="mt-10">
              <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  {
                    name: "Note",
                    color: GR,
                    fields: ["id", "service_id", "minister", "date", "body", "anchor_scriptures[]"],
                    note: "The core artifact",
                  },
                  {
                    name: "Service",
                    color: "#3B82F6",
                    fields: ["id", "name", "day_of_week", "start_time", "end_time", "location"],
                    note: "Powers reminders & focus mode",
                  },
                  {
                    name: "Scripture Chip",
                    color: "#A78BFA",
                    fields: ["reference", "translation", "expanded_state"],
                    note: "Inline element inside Note.body",
                  },
                  {
                    name: "Action Point",
                    color: "#F59E0B",
                    fields: ["id", "note_id", "text", "state (Open/In-Progress/Done)"],
                    note: "Cross-note queryable; never auto-shared",
                  },
                  {
                    name: "Reflection",
                    color: "#EC4899",
                    fields: ["id", "note_id", "prompt", "response", "timestamp"],
                    note: "AI-initiated; appended to note",
                  },
                  {
                    name: "Settings",
                    color: "#6B7280",
                    fields: ["user_name", "church", "translation_default", "dnd_permission"],
                    note: "One-time onboarding + editable",
                  },
                ].map(({ name, color, fields, note }) => (
                  <StaggerItem key={name}>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden h-full flex flex-col">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                        <p className="text-[13px] font-bold text-white">{name}</p>
                      </div>
                      <div className="p-4 flex flex-col gap-2 flex-1">
                        <div className="flex flex-wrap gap-1.5">
                          {fields.map((f) => (
                            <span key={f} className="rounded-md px-2 py-0.5 text-[10px] font-mono text-white/45 border border-white/8 bg-white/[0.02]">{f}</span>
                          ))}
                        </div>
                        <p className="text-[11px] text-white/30 mt-auto pt-2">{note}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </FadeUp>
          </div>
        </section>

        {/* ══ 11 — KEY DESIGN DECISIONS ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="11" t="KEY DESIGN DECISIONS" />
              <H2 white="The principled" accent="calls behind Snotes" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[480px]">
                Every product is a series of "why this, not that?" choices. These are the principled calls behind Snotes — and the anti-patterns deliberately excluded.
              </p>
            </FadeUp>

            <StaggerGrid className="mt-10 grid sm:grid-cols-2 gap-4">
              {[
                {
                  n: "DECISION 01",
                  q: "Why a dedicated app, not a feature inside YouVersion or Notion?",
                  a: "Sermon note-taking is a peculiar use case — constant interleaving of scripture with personal reflection, action points as first-class commitments, weekly service rhythm. YouVersion treats notes as an afterthought inside a Bible app. Notion treats them as generic documents. Neither understands the anatomy of a sermon. A dedicated app earns the right to make every choice in service of one experience.",
                },
                {
                  n: "DECISION 02",
                  q: "Why Android-only for V1 and V2?",
                  a: "My primary device is Android. Halving build effort by skipping iOS in early phases is intentional — V1 and V2 exist to validate the experience, not to maximise distribution. iOS comes in V3 when the product earns the platform expansion.",
                },
                {
                  n: "DECISION 03",
                  q: "Why \"ambient, not assertive\" for AI?",
                  a: "The phone is the enemy of presence. AI that speaks during a service is hostile to the moment it's meant to deepen. So Claude is silent during the service window, gentle around it, and never demands attention. Reverence by design, not by accident.",
                },
                {
                  n: "DECISION 04",
                  q: "Why \"connective, not social\" for V2 sharing?",
                  a: "Sharing sermon notes with people who already pray for you is good. A public feed of who's the most spiritual is not. V2 closes off five drift paths: opt-in sharing per artifact, action points always private, no metrics, no algorithmic surfacing, no public reaction counts. Snotes can quietly lose its soul at any version transition — V2's job is to hold the line.",
                },
                {
                  n: "DECISION 05",
                  q: "Why hardcode the bright lines (no ads, no data sales, no gamification)?",
                  a: "Engagement-driven monetisation models eventually push products toward dark patterns. By writing \"no ads, no data sales, no gamification\" into the product's DNA before launch, we remove the option to drift later under revenue pressure. The bright lines hold even at 100,000 users.",
                },
                {
                  n: "DECISION 06",
                  q: "Why a three-layer Bible API stack?",
                  a: "A single API source means a single point of failure. The three-layer stack (offline KJV cache → API.Bible licensed → HelloAO public-domain fallback) gives users the translations they actually want without legal exposure for personal use, while keeping the architecture structured for commercial transition in V3 without a rewrite.",
                },
              ].map(({ n, q, a }) => (
                <StaggerItem key={n}>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 h-full flex flex-col gap-3">
                    <span className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase w-fit"
                      style={{ background: `${GR}15`, color: GR }}>{n}</span>
                    <p className="text-[15px] font-semibold text-white leading-snug">{q}</p>
                    <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 flex-1">{a}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* ══ 12 — BUSINESS MODEL ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="12" t="BUSINESS MODEL" />
              <H2 white="Freemium, with" accent="bright lines" />
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[520px]">
                Snotes' V3 business model is freemium, naira-first, with a small set of paid features that respect the product's soul.
              </p>
            </FadeUp>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {/* free tier */}
              <FadeUp delay={0.1}>
                <div className="rounded-2xl border border-white/12 bg-white/[0.025] p-6 h-full flex flex-col gap-4">
                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-1">FREE</p>
                    <p className="text-[20px] font-bold text-white">Always</p>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {["Unlimited notes", "Public-domain translations (KJV, BSB, WEB)", "Scripture autocomplete", "Action points (no limit)", "Service-aware reminders", "Focus mode", "Single-device cloud backup", "Limited AI reflection prompts (3 per note)"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-white/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              {/* snotes plus */}
              <FadeUp delay={0.15}>
                <div className="rounded-2xl border p-6 h-full flex flex-col gap-4"
                  style={{ borderColor: `${GR}40`, background: `${GR}08` }}>
                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: GR }}>SNOTES PLUS</p>
                    <p className="text-[20px] font-bold text-white">Paid</p>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {["Licensed translations (NKJV, NIV, AMP, MSG, ESV)", "Multi-device sync", "Circles & selective sharing", "Spouse mode", "Unlimited AI reflections", "Priority support"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: GR }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>

            {/* bright lines */}
            <FadeUp delay={0.2} className="mt-4">
              <div className="rounded-2xl border border-[#E0525220] bg-[#1A0A0A] p-5">
                <p className="text-[9px] font-bold tracking-widest uppercase text-[#E05252] mb-2">PERMANENT NON-GOALS — NO EXCEPTIONS, AT ANY USER COUNT</p>
                <p className="text-[14px] leading-[1.65] text-white/50">
                  No ads &nbsp;·&nbsp; No data sales (including aggregated) &nbsp;·&nbsp; No gamification &nbsp;·&nbsp; No public feed &nbsp;·&nbsp; No AI sermon generation
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══ 13 — WHAT'S NEXT ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <FadeUp delay={0.1}>
                <SLabel n="13" t="WHAT'S NEXT" />
                <H2 white="From concept" accent="to first build" />
                <div className="mt-5 mb-6 h-[2px] w-16 rounded-full" style={{ background: GR }} />
                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-5">
                  The concept phase is complete. Three concept documents (V1, V2, V3) totalling ~10,000 words of structured product thinking sit behind this page. The next deliverables are already in motion.
                </p>
                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                  V1 build begins next quarter. Design first — visual identity, UI system, key flow mockups — then engineering. Snotes ships when it's quietly excellent. Not before.
                </p>
                <ul className="space-y-3">
                  {[
                    { title: "Marketing strategy", desc: "channels, positioning, go-to-market for Nigerian Pentecostal/charismatic communities" },
                    { title: "Project timeline", desc: "V1 → V2 → V3 calendar with milestones" },
                    { title: "Financial projection", desc: "running costs, monetisation model, naira/USD scenarios, break-even analysis" },
                    { title: "Product architecture", desc: "data model, sync strategy, AI prompt design" },
                    { title: "V1 PRDs", desc: "technical requirements and engineering specs" },
                  ].map(({ title, desc }) => (
                    <li key={title} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: GR }} />
                      <p className="text-[14px] text-white/60">
                        <strong className="text-white">{title}</strong> — {desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </FadeUp>

              <SlideIn direction="right" delay={0.15}>
                <TiltFrame
                  src={null}
                  caption="Roadmap visualisation: Concept → Architecture → V1 Build → V1 Testing → V2 → V3 with current position marked"
                  className="w-full"
                  style={{ aspectRatio: "4/5" }}
                />
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ══ 14 — REFLECTION & LEARNINGS ══ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <SLabel n="14" t="LEARNINGS" />
              <H2 white="Reflection &" accent="learnings" />
            </FadeUp>

            <FadeUp delay={0.1} className="mt-10">
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-8 sm:p-10">
                <div className="space-y-6 max-w-[720px]">
                  <p className="text-[15px] sm:text-[16px] leading-[1.75] text-white/65">
                    Snotes reinforced something I'd been circling for a while: the best products are built quietly, for one user, before they're built for everyone. The temptation in product strategy is to design for the public release first — to imagine the V3 audience and reverse-engineer the V1 from there. That path produces a product trying to be everything to everyone, and pleasing no one.
                  </p>
                  <p className="text-[15px] sm:text-[16px] leading-[1.75] text-white/65">
                    Building Snotes "the same way I built Opus — first for me, perhaps later for others" is the philosophical anchor. It forces honest decisions. If V1 doesn't actually work for me, V2 has no reason to exist. If V2 doesn't deepen relationships in my closest circle, V3 has no soul to scale. The phased rollout isn't a feature list — it's an integrity check.
                  </p>
                  <p className="text-[15px] sm:text-[16px] leading-[1.75] text-white/65">
                    This case study also reinforced that <strong className="text-white">product strategy is design</strong>. Choosing what <em>not</em> to build is craft. Drawing the bright lines (no ads, no data sales, no gamification) before launch is the most consequential design decision Snotes will ever make — because it removes the option to drift under future pressure. Visual design comes next; the strategy makes the visuals possible.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black"
                    style={{ background: `${GR}25`, color: GR }}>R</div>
                  <div>
                    <p className="text-[13px] font-semibold text-white">Richard Enoch</p>
                    <p className="text-[11px] text-white/35">Founder & Product Designer · Snotes Case Study · 2026</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══ 15 — FOOTER ══ */}
        <OtherProj currentSlug="snotes" currentKind="ui" />
        <BuildSection />

      </div>
    </div>
  );
};

export default SnotesProject;
