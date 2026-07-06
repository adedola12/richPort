// src/pages/PresentationDesignPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

// ── ADLM images
import adlm1 from "../assets/PresentationDesigns/1.webp";
import adlm2 from "../assets/PresentationDesigns/2.webp";
import adlm3 from "../assets/PresentationDesigns/3.webp";
import adlm4 from "../assets/PresentationDesigns/4.webp";
import adlm6 from "../assets/PresentationDesigns/6.webp";

// ── Tradeflow images
import tf01 from "../assets/PresentationDesigns/Tradeflow 01.webp";
import tf03 from "../assets/PresentationDesigns/Tradeflow 03.webp";
import tf05 from "../assets/PresentationDesigns/Tradeflow 05.webp";
import tf06 from "../assets/PresentationDesigns/Tradeflow 06.webp";

// ── AI2BC images
import ai200 from "../assets/PresentationDesigns/200.webp";
import ai202 from "../assets/PresentationDesigns/202.webp";

// ── LinkedIn images
import li196 from "../assets/PresentationDesigns/196.webp";
import li198 from "../assets/PresentationDesigns/198.webp";

const GR = "#a3e635";

/* ── animation primitives ─────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

const SlideIn = ({ children, direction = "left", delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: direction === "left" ? -32 : 32 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

/* ── shared label component ───────────────────────────────────── */
const SectionLabel = ({ n, t }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: GR }}>
      {n}
    </span>
    <div className="h-px flex-1 max-w-[48px]" style={{ background: `${GR}55` }} />
    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35">{t}</span>
  </div>
);

/* ── image card ───────────────────────────────────────────────── */
const Img = ({ src, alt, className = "" }) => (
  <div className={`overflow-hidden rounded-2xl border border-white/8 ${className}`}>
    <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
  </div>
);

/* ── divider ──────────────────────────────────────────────────── */
const Divider = () => (
  <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
    <div className="h-px w-full bg-white/5" />
  </div>
);

/* ================================================================
   PAGE
   ================================================================ */
export default function PresentationDesignPage() {
  return (
    <div className="relative min-h-screen bg-[#07090C] text-white overflow-x-hidden font-['Outfit']">
      <PageMeta
        title="Presentation Design"
        description="Pitch decks and presentation design by Richard Enoch — investor decks, corporate presentations, and personal brand slide design that communicate with clarity and confidence."
        url="/presentation-design"
      />

      {/* ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]"
          style={{ background: `${GR}09` }} />
        <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]"
          style={{ background: `${GR}06` }} />
      </div>

      <div className="relative z-10">

        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GR }} />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/70">
                Presentation Design · Pitch Decks
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className="font-semibold leading-[0.95] tracking-[-0.04em] text-[3rem] sm:text-[4.5rem] lg:text-[6rem] mb-5"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #6b6b6b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Decks That<br />Move Rooms.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mx-auto max-w-[580px] text-[15px] sm:text-[17px] leading-[1.65] text-white/50">
              From investor pitch decks to brand presentations — every deck is built to communicate your idea with clarity, confidence, and craft that holds the room.
            </p>
          </FadeUp>

          {/* Hero visual — ADLM fan mockup */}
          <FadeUp delay={0.35}>
            <div className="mt-14 mx-auto max-w-[1100px]">
              <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/8 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                <img
                  src={adlm1}
                  alt="Presentation design showcase"
                  className="w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── stats strip ───────────────────────────────────────── */}
        <FadeUp delay={0.1}>
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 mb-20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: "4+", label: "Decks Delivered" },
                { n: "3", label: "Industries Covered" },
                { n: "60+", label: "Slides Designed" },
                { n: "100%", label: "Brand-Aligned" },
              ].map(({ n, label }) => (
                <div key={label} className="rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4 text-center">
                  <p className="text-[2rem] font-semibold leading-none tracking-[-0.04em]" style={{ color: GR }}>{n}</p>
                  <p className="mt-1.5 text-[11px] tracking-[0.1em] uppercase text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <Divider />

        {/* ══ PROJECT 01 — ADLM ═════════════════════════════════════ */}
        <section className="py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-[1100px] mx-auto">
            <SlideIn direction="left">
              <SectionLabel n="01" t="PITCH DECK" />
              <h2
                className="text-[2rem] sm:text-[2.8rem] font-semibold leading-[1.05] tracking-[-0.04em] mb-3"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #888 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ADLM Studio
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[560px] mb-10">
                A full investor pitch deck for ADLM Studio's funding round — covering market opportunity, ecosystem overview, business model, financial projections, and ask. Built to hold attention in a room and convince on a screen.
              </p>
            </SlideIn>

            {/* Large feature image */}
            <FadeUp>
              <Img src={adlm3} alt="ADLM — Brand-infused visuals" className="w-full mb-5" />
            </FadeUp>

            {/* Two-up row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <FadeUp delay={0.05}>
                <Img src={adlm2} alt="ADLM — Crystal-Clear Messaging" className="w-full h-full" />
              </FadeUp>
              <FadeUp delay={0.12}>
                <Img src={adlm6} alt="ADLM — slide spread" className="w-full h-full" />
              </FadeUp>
            </div>

            {/* Full-width closer */}
            <FadeUp delay={0.08}>
              <Img src={adlm4} alt="ADLM — Multi-Format Ready" className="w-full" />
            </FadeUp>
          </div>
        </section>

        <Divider />

        {/* ══ PROJECT 02 — TRADEFLOW ════════════════════════════════ */}
        <section className="py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-[1100px] mx-auto">
            <SlideIn direction="right">
              <SectionLabel n="02" t="CORPORATE PITCH DECK" />
              <h2
                className="text-[2rem] sm:text-[2.8rem] font-semibold leading-[1.05] tracking-[-0.04em] mb-3"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #888 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Tradeflow
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[560px] mb-10">
                A corporate pitch deck for Tradeflow — a technology platform simplifying cross-border trade and business expansion across Africa. Story-driven infographics, competitive comparison tables, and a financial projection narrative built to win trust from the first slide.
              </p>
            </SlideIn>

            {/* Screen mockup hero */}
            <FadeUp>
              <Img src={tf06} alt="Tradeflow — Communicates value at first glance" className="w-full mb-5" />
            </FadeUp>

            {/* Two-up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <FadeUp delay={0.05}>
                <Img src={tf01} alt="Tradeflow — Story-Driven Infographics" className="w-full h-full" />
              </FadeUp>
              <FadeUp delay={0.12}>
                <Img src={tf05} alt="Tradeflow — Brand-infused visuals" className="w-full h-full" />
              </FadeUp>
            </div>

            {/* Diagonal spread */}
            <FadeUp delay={0.08}>
              <Img src={tf03} alt="Tradeflow — slide spread" className="w-full" />
            </FadeUp>
          </div>
        </section>

        <Divider />

        {/* ══ PROJECT 03 — AI2BC (dark section) ════════════════════ */}
        <section className="py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-[1100px] mx-auto">
            <SlideIn direction="left">
              <SectionLabel n="03" t="TECH COMPANY DECK" />
              <h2
                className="text-[2rem] sm:text-[2.8rem] font-semibold leading-[1.05] tracking-[-0.04em] mb-3"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #888 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI2BC
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[560px] mb-10">
                A dark-themed, tech-forward deck for AI2BC — an AI and blockchain company. Purpose-driven layouts, deep data visualisation, and a premium dark aesthetic that signals innovation and authority from the first slide to the last.
              </p>
            </SlideIn>

            {/* Dark slides — two-up first for visual drama */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <FadeUp delay={0.05}>
                <Img src={ai200} alt="AI2BC — deck slides" className="w-full h-full" />
              </FadeUp>
              <FadeUp delay={0.12}>
                <Img src={ai202} alt="AI2BC — Purpose-Driven Layouts" className="w-full h-full" />
              </FadeUp>
            </div>

            {/* Capability callout card */}
            <FadeUp delay={0.1}>
              <div
                className="rounded-2xl sm:rounded-3xl border p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12"
                style={{ borderColor: `${GR}25`, background: `${GR}06` }}
              >
                <div className="flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: GR }}>What this shows</p>
                  <h3 className="text-[1.4rem] sm:text-[1.8rem] font-semibold leading-tight tracking-[-0.03em] text-white mb-2">
                    Any theme. Any industry. Same standard.
                  </h3>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/45">
                    From light corporate blue to a full dark tech aesthetic — the design adapts completely to the brand while keeping the same level of craft, hierarchy, and intentional layout.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col gap-3">
                  {["Corporate", "Fintech", "AI / Tech", "Personal Brand"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-[12px] font-medium text-white/60">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: GR }} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        <Divider />

        {/* ══ PROJECT 04 — LINKEDIN ═════════════════════════════════ */}
        <section className="py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-[1100px] mx-auto">
            <SlideIn direction="right">
              <SectionLabel n="04" t="PERSONAL BRAND DECK" />
              <h2
                className="text-[2rem] sm:text-[2.8rem] font-semibold leading-[1.05] tracking-[-0.04em] mb-3"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #888 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                LinkedIn Presentation
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[560px] mb-10">
                A personal brand presentation deck designed to help professionals stand out on LinkedIn — slide-by-slide narrative transitions that guide viewers from introduction to conversion without losing them on a single screen.
              </p>
            </SlideIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FadeUp delay={0.05}>
                <Img src={li196} alt="LinkedIn — Story-led presentation design" className="w-full h-full" />
              </FadeUp>
              <FadeUp delay={0.12}>
                <Img src={li198} alt="LinkedIn — slide narrative" className="w-full h-full" />
              </FadeUp>
            </div>
          </div>
        </section>

        <Divider />

        {/* ══ WHAT YOU GET STRIP ════════════════════════════════════ */}
        <section className="py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-center mb-2" style={{ color: GR }}>
                Every deck includes
              </p>
              <h2
                className="text-[1.8rem] sm:text-[2.4rem] font-semibold leading-tight tracking-[-0.04em] text-center mb-12"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #777 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Built to last beyond the pitch.
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "◈", title: "Story Architecture", desc: "Every deck is structured as a narrative — beginning, tension, resolution — before a single slide is designed." },
                { icon: "◉", title: "Brand-Infused Design", desc: "Colors, typography, and layout all pulled from your brand so the deck feels like an extension of who you are." },
                { icon: "⬡", title: "Data Visualisation", desc: "Numbers, charts, and metrics turned into visuals that make impact — not walls of text." },
                { icon: "◈", title: "Multi-Format Delivery", desc: "Delivered in PowerPoint, PDF, and Canva-ready formats so you can present from anywhere." },
                { icon: "◉", title: "Slide-by-Slide Logic", desc: "Every slide earns its place. No filler. Each screen has one job and does it well." },
                { icon: "⬡", title: "Revisions Included", desc: "Two rounds of revisions are built into every project so you go into the room with full confidence." },
              ].map(({ icon, title, desc }) => (
                <FadeUp key={title}>
                  <div className="rounded-xl border border-white/8 bg-white/[0.025] p-6 h-full">
                    <span className="text-[20px] mb-3 block" style={{ color: GR }}>{icon}</span>
                    <h3 className="text-[15px] font-semibold text-white mb-2">{title}</h3>
                    <p className="text-[13px] leading-[1.65] text-white/45">{desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <FadeUp>
            <div
              className="max-w-[1100px] mx-auto rounded-2xl sm:rounded-3xl border p-10 sm:p-16 text-center"
              style={{ borderColor: `${GR}30`, background: `linear-gradient(135deg, ${GR}08 0%, transparent 60%)` }}
            >
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: GR }}>
                Ready to present?
              </p>
              <h2
                className="text-[2rem] sm:text-[2.8rem] font-semibold leading-tight tracking-[-0.04em] mb-4"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #aaa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Let's build your deck.
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/45 mb-8 max-w-[480px] mx-auto">
                Got a pitch, a meeting, or a conference coming up? Let's make sure you walk in with something that does the talking.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[14px] font-bold text-black transition hover:brightness-110"
                style={{ background: GR }}
              >
                Start a Project
                <span className="text-[12px]">→</span>
              </Link>
            </div>
          </FadeUp>
        </section>

        <BuildSection />
      </div>
    </div>
  );
}
