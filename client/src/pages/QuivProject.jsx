// src/pages/QuivProject.jsx
// Quiv — BIM-Based Quantity Take-Off Desktop App
// Creative Lead: Richard Enoch | ADLM Studio
// Image placeholders are marked with SCREENSHOT comments — see notes at bottom.

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

const QB = "#3B8EF0"; // Quiv Blue accent

/* ─── animation primitives ─── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(6px)" }}
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
      initial={{ opacity: 0, x: direction === "left" ? -36 : 36, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: direction === "left" ? -36 : 36, filter: "blur(4px)" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

/* ─── image placeholder ─── */
const ImgPlaceholder = ({ label, note, aspect = "16/9", dim = false }) => (
  <div
    className="w-full rounded-2xl border border-dashed border-white/15 flex flex-col items-center justify-center gap-3 px-6"
    style={{ aspectRatio: aspect, background: dim ? "rgba(59,142,240,0.04)" : "rgba(255,255,255,0.03)" }}
  >
    <div className="w-8 h-8 rounded-full flex items-center justify-center border border-dashed"
      style={{ borderColor: `${QB}55` }}>
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={QB} strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 16l5-5 4 4 3-3 6 6" />
      </svg>
    </div>
    <p className="text-[12px] font-semibold text-center" style={{ color: QB }}>{label}</p>
    {note && <p className="text-[11px] text-white/30 text-center max-w-[360px] leading-[1.55]">{note}</p>}
  </div>
);

/* ─── section eyebrow ─── */
const SLabel = ({ n, t }) => (
  <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: QB }}>
    {n} — {t}
  </p>
);

/* ─── pain point row ─── */
const PainRow = ({ issue, impact }) => (
  <div className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0">
    <span className="mt-[3px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: QB }} />
    <div>
      <p className="text-[14px] font-semibold text-white mb-0.5">{issue}</p>
      <p className="text-[14px] text-white/50 leading-[1.55]">{impact}</p>
    </div>
  </div>
);

/* ─── fragment card ─── */
const Fragment = ({ num, name, desc, tag }) => (
  <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">Fragment {num}</span>
      {tag && (
        <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
          style={{ background: `${QB}15`, color: QB, border: `1px solid ${QB}33` }}>
          {tag}
        </span>
      )}
    </div>
    <p className="text-[15px] font-semibold text-white mb-2">{name}</p>
    <p className="text-[14px] text-white/50 leading-[1.6]">{desc}</p>
  </div>
);

/* ─── stat block ─── */
const Stat = ({ value, label }) => (
  <div>
    <p className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-white" style={{ color: QB }}>{value}</p>
    <p className="text-[12px] text-white/40 mt-1">{label}</p>
  </div>
);

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
const QuivProject = () => (
  <div className="relative min-h-screen bg-[#07090C] text-white overflow-x-hidden font-['Outfit']">
    <PageMeta
      title="Quiv — Quantity Take-Off Software"
      description="Designing Quiv: a standalone desktop app that replaces manual quantity surveying with PDF-based BIM measurement for Nigerian QS professionals. Creative Lead at ADLM Studio."
      url="/ui-projects/quiv"
    />

    {/* ambient glows */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]"
        style={{ background: `${QB}09` }} />
      <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: `${QB}07` }} />
    </div>

    <div className="relative z-10">

      {/* ══ HERO ══ */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-4">

        {/* back pill */}
        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <Link to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2 text-[12px] text-white/70 hover:bg-white/10 transition backdrop-blur-md">
            ← Back to Portfolio
          </Link>
        </motion.div>

        {/* studio badge */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[11px] font-semibold border"
          style={{ borderColor: `${QB}44`, color: QB, background: `${QB}0D` }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: QB }} />
          ADLM Studio · Creative Lead
        </motion.div>

        {/* headline */}
        <motion.h1
          className="text-center text-6xl sm:text-7xl lg:text-[88px] font-bold leading-[0.92] tracking-[-0.04em] mb-6"
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay: 0.28 }}
        >
          <span style={{
            background: "linear-gradient(180deg, #ffffff 0%, #6b6b6b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Quiv
          </span>
        </motion.h1>

        {/* subheading */}
        <motion.p
          className="text-center text-[16px] sm:text-[18px] text-white/55 max-w-[520px] leading-[1.65] mb-12"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          A standalone desktop app replacing manual quantity take-off for Nigerian construction professionals — PDF-based measurement, BESMM-aligned, offline-first.
        </motion.p>

        {/* stats row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52 }}
        >
          {[
            { value: "6", label: "Product Fragments" },
            { value: "v2", label: "Architecture Pivot" },
            { value: "BESMM", label: "Standard" },
            { value: "10k+", label: "NIQS Members (TAM)" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: QB }}>{value}</p>
              <p className="text-[11px] text-white/35 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* SCREENSHOT AREA — HERO ══════════════════════════════
            SCREENSHOT 1: Full-page of Quiv_Measure_v4.html
            → Take a full-page screenshot of the entire app
              with a project loaded and the PDF visible.
              This is the "hero shot" — the dashboard or main
              PDF viewer showing a measurement in progress.
            Suggested: open the file in Chrome, zoom to 80%,
            full-page screenshot via DevTools (Ctrl+Shift+P →
            "Capture full size screenshot").
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          className="mt-14 w-full max-w-[1000px]"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 0.61, 0.36, 1], delay: 0.55 }}
        >
          <ImgPlaceholder
            label="SCREENSHOT 1 — Hero / Main App View"
            note="Full-page screenshot of Quiv_Measure_v4.html with a project open and PDF visible. This is the 'money shot' that leads the page."
            aspect="16/9"
          />
        </motion.div>

      </section>

      {/* ══ THE BRIEF ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">

          <FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/8 mb-14">
              {[
                { label: "CLIENT", value: "ADLM Studio" },
                { label: "MY ROLE", value: "Creative Lead" },
                { label: "PRODUCT TYPE", value: "Desktop App" },
                { label: "STANDARD", value: "BESMM" },
              ].map(({ label, value }) => (
                <div key={label} className="sm:px-8 first:pl-0">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1">{label}</p>
                  <p className="text-lg sm:text-xl font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <FadeUp>
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">DELIVERABLES</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {["Product UI Design", "Design System", "UX Architecture", "App Prototype", "Brand Identity"].map(t => (
                  <span key={t} className="rounded-md border px-2.5 py-1 text-[11px] font-semibold"
                    style={{ borderColor: `${QB}44`, color: QB, background: `${QB}0D` }}>{t}</span>
                ))}
              </div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">MY ROLE</p>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55">
                As Creative Lead at ADLM Studio, I designed the full product experience for Quiv — the UI system, user flows, information architecture, and visual language. I worked alongside the product strategy and engineering direction, translating the product vision into a desktop interface built for quantity surveyors.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              {/* SCREENSHOT AREA ══════════════════════════════
                  SCREENSHOT 2: Dashboard / Project List
                  → The screen that shows the list of saved
                    projects (before opening one). Should show
                    the project cards, "New Project" button,
                    and any sidebar navigation.
                  Look for: Flow 3 — Dashboard in the HTML.
              ═══════════════════════════════════════════════ */}
              <ImgPlaceholder
                label="SCREENSHOT 2 — Dashboard / Project List"
                note="The project dashboard — list of saved take-off projects. Look for 'Flow 3: Dashboard' in the prototype."
                aspect="4/3"
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ 01 — THE PROBLEM ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-start">
            <FadeUp delay={0.1}>
              <SLabel n="01" t="THE PROBLEM" />
              <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-6">
                Manual take-off is<br />
                <span style={{ color: QB }}>costing QS professionals</span><br />
                weeks of billable time
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-8">
                Quantity Surveyors in Nigeria follow a 10-step manual process: receive drawings, prepare taking-off sheets, physically measure with a scale rule, record numbers by hand, collate across sheets, then transfer into Excel. A single complex project can take weeks before a single line of pricing begins.
              </p>

              <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-5 pt-2">
                <PainRow issue="Time-Intensive" impact="Complex projects take days to weeks for take-off alone" />
                <PainRow issue="Human Error" impact="Manual scaling and transcription introduce inaccuracies at every step" />
                <PainRow issue="Revision Hell" impact="A single drawing change triggers complete remeasurement" />
                <PainRow issue="Tool Lock-In" impact="Existing BIM tools (Revit, CostX) cost NGN 4.5M+/year — out of reach" />
                <PainRow issue="Format Mismatch" impact="Nigerian QS work from PDFs, not BIM files — no tool served them" />
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="lg:sticky lg:top-8">
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 mb-4">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: QB }}>Market Context</p>
                  <div className="flex flex-col gap-5">
                    <Stat value="NGN 23.8T" label="Nigerian construction industry (2024)" />
                    <Stat value="10,000+" label="NIQS registered quantity surveyors" />
                    <Stat value="NGN 4.6M" label="Revit annual cost — the barrier" />
                    <Stat value="NGN 15K/mo" label="Quiv Solo plan pricing" />
                  </div>
                </div>
                <p className="text-[12px] text-white/25 italic leading-[1.55] px-1">
                  "If I could cut my takeoff time in half, I could double my project load without sacrificing quality." — Target user persona, ADLM Studio research
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ 02 — THE PIVOT ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="02" t="THE PIVOT" />
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-3">
              v1 was a Revit plugin.<br />
              <span style={{ color: QB }}>v2 threw Revit away entirely.</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50 mt-5 max-w-[640px]">
              Quiv v1 was designed as an Autodesk Revit plugin — a technically solid solution that required an active Revit installation. Then the numbers became clear.
            </p>
          </FadeUp>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <SlideIn direction="left" delay={0.1}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">Version 1</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/10">Deprecated</span>
                </div>
                <h3 className="text-[18px] font-semibold text-white mb-3">Revit Plugin</h3>
                <p className="text-[13px] text-white/45 leading-[1.65] mb-5">
                  A plugin within Autodesk Revit that read BIM element data directly. Clean architecture, strong BIM integration. The constraint: every user needed Revit installed.
                </p>
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                  <p className="text-[12px] text-red-300/70 leading-[1.55]">
                    <strong className="text-red-300/90">The blocker:</strong> Autodesk Revit costs NGN 4.5M+/year. Less than 2% of Nigerian QS firms could afford it. The addressable market was negligible.
                  </p>
                </div>

                {/* SCREENSHOT AREA ════════════════════════════
                    SCREENSHOT 3: v1 Plugin Screen (optional)
                    → If you have any early v1 prototype screens
                      of the Revit plugin UI, add one here.
                      If not, this placeholder can be removed
                      or replaced with the v1 flow diagram.
                    This "pivot" narrative is strong — showing
                    the old version makes v2 more compelling.
                ════════════════════════════════════════════ */}
                <div className="mt-4">
                  <ImgPlaceholder
                    label="SCREENSHOT 3 — v1 Revit Plugin (optional)"
                    note="Any early screen from the Revit plugin prototype. If none available, this section can be removed."
                    aspect="16/9"
                  />
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={0.15}>
              <div className="h-full rounded-2xl p-[1px]"
                style={{ background: `linear-gradient(135deg, ${QB}44, transparent 60%)` }}>
                <div className="rounded-2xl bg-[#07090C] p-6 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: QB }}>Version 2</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${QB}15`, color: QB, border: `1px solid ${QB}33` }}>Current</span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-white mb-3">Standalone Desktop App</h3>
                  <p className="text-[13px] text-white/55 leading-[1.65] mb-5">
                    Rebuilt from scratch as an Electron.js + React app. Instead of BIM models, it works with the tool every Nigerian QS already uses: <strong className="text-white">PDF drawings</strong>. Built-in PDF renderer, Fabric.js canvas for measurement overlay, SQLite for offline storage, Supabase for cloud sync.
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      "PDF.js — render construction drawings natively",
                      "Fabric.js — draw measurements on canvas",
                      "SQLite + AES-256 — offline-first, encrypted",
                      "Supabase — cross-device cloud sync",
                      "BESMM — Nigeria's primary QS standard",
                    ].map(t => (
                      <div key={t} className="flex items-center gap-2 text-[13px] text-white/45">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: QB }} />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ══ 03 — THE PRODUCT ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="03" t="THE PRODUCT" />
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-4">
              A full suite of tools.<br />
              <span style={{ color: QB }}>One coherent system.</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[600px] mb-10">
              Quiv isn't one product — it's a pipeline. Each Fragment handles a distinct stage of the QS workflow, and data flows cleanly from one to the next.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <Fragment num="1" name="Quiv Measure" desc="PDF-based quantity take-off. The core tool. Draw measurements on imported construction drawings and auto-generate structured take-off lists." tag="MVP" />
            <Fragment num="2" name="Quiv Cost" desc="Pricing and rate generation. Reads .quiv files from Measure directly — no re-entry. Maps quantities to rate database and generates Bills of Quantities." />
            <Fragment num="3" name="Quiv Tender" desc="Tender documentation assembly. Compiles BOQs, specifications, and contract documents into a single submission-ready package." />
            <Fragment num="4" name="Quiv Site" desc="On-site quantity verification. Compare designed quantities against as-built measurements during construction." />
            <Fragment num="5" name="Quiv Final" desc="Final account settlement. Handles post-construction variations, claims, and final cost reconciliation." />
            <Fragment num="6" name="Quiv Hub" desc="Central dashboard for all fragments. Project overview, team access, document history, and subscription management." />
          </div>

          {/* SCREENSHOT AREA ══════════════════════════════
              SCREENSHOT 4 — Product Suite Overview / Onboarding
              → The screen in the prototype that shows the
                overall pipeline or fragment selection. May be
                an onboarding screen or a "what's in Quiv"
                overview screen.
              If no such screen exists, use a screenshot of the
              new project creation flow (Flow 4 in the spec).
          ═══════════════════════════════════════════════ */}
          <FadeUp>
            <ImgPlaceholder
              label="SCREENSHOT 4 — Product Suite / New Project Flow"
              note="Either a product overview/onboarding screen showing the suite, or the 'Create New Project' screen (Flow 4 in the prototype). Shows how the system is introduced to new users."
              aspect="16/7"
            />
          </FadeUp>
        </div>
      </section>

      {/* ══ 04 — KEY SCREENS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="04" t="KEY SCREENS" />
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-12">
              The core<br />
              <span style={{ color: QB }}>user flows</span>
            </h2>
          </FadeUp>

          {/* Screen 1: PDF Viewer with Measurement Overlay */}
          <div className="py-14 border-t border-white/5">
            <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
              <SlideIn direction="left">
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase border mb-5"
                  style={{ borderColor: `${QB}44`, color: QB, background: `${QB}0D` }}>
                  Core Experience
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-[-0.02em] mb-3">
                  PDF Viewer + Measurement Overlay
                </h3>
                <p className="text-[14px] text-white/50 leading-[1.65]">
                  The central screen. A construction drawing rendered via PDF.js with a Fabric.js canvas layered on top. The surveyor clicks to place measurement points directly on the drawing — no scaling, no manual entry. Dimensions are extracted automatically.
                </p>
              </SlideIn>
              <SlideIn direction="right" delay={0.1}>
                {/* SCREENSHOT AREA ══════════════════════════════
                    SCREENSHOT 5 — PDF Viewer with Measurement Overlay
                    → The most important screenshot in the case study.
                      Shows a PDF drawing loaded with measurement
                      lines drawn on top. Should be visible:
                      - The PDF (floor plan or elevation)
                      - Measurement lines on the canvas
                      - Dimension labels auto-populated
                      - The take-off panel on the right sidebar
                    Look for: Flow 7 in the prototype.
                ═══════════════════════════════════════════════ */}
                <ImgPlaceholder
                  label="SCREENSHOT 5 — PDF Viewer + Measurement Canvas"
                  note="The core experience: a floor plan PDF with measurement lines drawn on it. Flow 7 in the prototype — Element Selection & Quantity Extraction. This is the most important screenshot."
                  aspect="16/10"
                />
              </SlideIn>
            </div>
          </div>

          {/* Screen 2: Take-Off List */}
          <div className="py-14 border-t border-white/5">
            <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
              <SlideIn direction="left">
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase border mb-5"
                  style={{ borderColor: `${QB}44`, color: QB, background: `${QB}0D` }}>
                  Structure
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-[-0.02em] mb-3">
                  Auto-Generated Take-Off List
                </h3>
                <p className="text-[14px] text-white/50 leading-[1.65]">
                  When a project is created, Quiv generates a structured checklist of every item the surveyor needs to measure — ordered by construction sequence (Substructure → Superstructure) and aligned with BESMM. No manual list-building. The structure exists before a single measurement is taken.
                </p>
              </SlideIn>
              <SlideIn direction="right" delay={0.1}>
                {/* SCREENSHOT AREA ══════════════════════════════
                    SCREENSHOT 6 — Take-Off List
                    → The structured checklist screen.
                      Shows items grouped by construction stage
                      (e.g., Substructure / Superstructure),
                      with progress indicators and status tags.
                    Look for: Flow 6 in the prototype —
                    "Take-Off List Generation".
                ═══════════════════════════════════════════════ */}
                <ImgPlaceholder
                  label="SCREENSHOT 6 — Auto-Generated Take-Off List"
                  note="The structured checklist — items grouped by construction stage with BESMM categories. Flow 6 in the prototype. Shows progress tracking and item statuses."
                  aspect="16/10"
                />
              </SlideIn>
            </div>
          </div>

          {/* Screen 3: Calculation Panel */}
          <div className="py-14 border-t border-white/5">
            <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
              <SlideIn direction="left">
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase border mb-5"
                  style={{ borderColor: `${QB}44`, color: QB, background: `${QB}0D` }}>
                  Calculation
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-[-0.02em] mb-3">
                  Data Input & Quantity Calculation
                </h3>
                <p className="text-[14px] text-white/50 leading-[1.65]">
                  After measurements are placed, the surveyor inputs additional parameters (waste factor, depth, count). Calculations are performed server-side and rendered in real time. The interface preserves professional judgement — the system guides but never overrides.
                </p>
              </SlideIn>
              <SlideIn direction="right" delay={0.1}>
                {/* SCREENSHOT AREA ══════════════════════════════
                    SCREENSHOT 7 — Calculation Panel
                    → The data input and calculation screen.
                      Shows extracted dimension values,
                      editable input fields (waste %, depth,
                      count), and the auto-calculated output.
                    Look for: Flow 8 in the prototype —
                    "Data Input & Calculation".
                ═══════════════════════════════════════════════ */}
                <ImgPlaceholder
                  label="SCREENSHOT 7 — Calculation Panel"
                  note="Data input form with extracted measurements, waste factor fields, and the auto-calculated quantity output. Flow 8 in the prototype."
                  aspect="16/10"
                />
              </SlideIn>
            </div>
          </div>

          {/* Screen 4: Export */}
          <div className="py-14 border-t border-white/5">
            <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
              <SlideIn direction="left">
                <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase border mb-5"
                  style={{ borderColor: `${QB}44`, color: QB, background: `${QB}0D` }}>
                  Output
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-[-0.02em] mb-3">
                  Export to Excel & .quiv Format
                </h3>
                <p className="text-[14px] text-white/50 leading-[1.65]">
                  Completed take-offs export to Excel (.xlsx) in traditional Taking-Off Sheet format — compatible with every existing QS workflow. The .quiv format feeds directly into Quiv Cost (Fragment 2) for pricing, with no re-entry. Data flows forward, not sideways.
                </p>
              </SlideIn>
              <SlideIn direction="right" delay={0.1}>
                {/* SCREENSHOT AREA ══════════════════════════════
                    SCREENSHOT 8 — Export Screen
                    → The export panel or confirmation screen.
                      Shows format options (Excel / .quiv),
                      export progress, or the "ready to export"
                      state.
                    Look for: Flow 11 or 12 in the prototype —
                    "Export to Excel" / "Export to Quiv Format".
                ═══════════════════════════════════════════════ */}
                <ImgPlaceholder
                  label="SCREENSHOT 8 — Export Panel"
                  note="Export options screen showing Excel (.xlsx) and .quiv format choices. Flow 11/12 in the prototype. Can also show the generated Excel preview if the prototype has one."
                  aspect="16/10"
                />
              </SlideIn>
            </div>
          </div>

        </div>
      </section>

      {/* ══ 05 — WHAT I DESIGNED ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="05" t="WHAT I DESIGNED" />
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-10">
              Design decisions<br />
              <span style={{ color: QB }}>that mattered</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {[
              {
                title: "No Override Policy",
                body: "Extracted measurements cannot be manually edited — changes must be made at the source (the PDF). This enforces data integrity across the pipeline. The design communicates this clearly without blocking the user."
              },
              {
                title: "BESMM Alignment",
                body: "Every take-off list category maps to the Building and Engineering Standard Method of Measurement — Nigeria's primary QS standard. No other tool in market does this. It's the core competitive moat and it's baked into the structure of the UI."
              },
              {
                title: "Offline-First Architecture",
                body: "Auto-save every 30 seconds locally, sync when connected. The design had to communicate sync state, conflict resolution, and offline mode without creating anxiety. Clean status indicators, no blocking dialogs."
              },
              {
                title: "Progress as Motivation",
                body: "The take-off list needed to feel like forward progress, not a to-do list. Visual completion tracking, per-category progress, and the ability to skip items without losing context — all designed to keep the surveyor moving."
              },
              {
                title: "Desktop-First, Not Web-Forced",
                body: "Quiv is an Electron app — not a web app squeezed into a window. The UI uses native desktop patterns: sidebars, keyboard shortcuts, multi-panel layouts, and a canvas that behaves like a drawing tool."
              },
              {
                title: "The .quiv Format",
                body: "The handoff between Fragments needed a visual representation. The export screen is designed to communicate that this isn't just saving a file — it's passing structured data into the next stage of the workflow."
              },
            ].map(({ title, body }) => (
              <FadeUp key={title}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 h-full">
                  <p className="text-[15px] font-semibold text-white mb-2">{title}</p>
                  <p className="text-[14px] text-white/50 leading-[1.65]">{body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* SCREENSHOT AREA ══════════════════════════════
              SCREENSHOT 9 — UI System / Component Overview
              → Any screen that best shows the overall visual
                language of the app — a screen with a mix of
                components: sidebar, data table, buttons, form
                fields. Alternatively, if you have a components
                page in the prototype, screenshot that.
              This is the "design system" showcase shot.
          ═══════════════════════════════════════════════ */}
          <FadeUp>
            <ImgPlaceholder
              label="SCREENSHOT 9 — UI System / Visual Language"
              note="A screen that shows the overall visual language and component variety. Ideally a complex screen like the Take-Off List with sidebar, progress indicators, and data table all visible at once."
              aspect="16/8"
            />
          </FadeUp>

        </div>
      </section>

      {/* ══ OUTCOME ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <FadeUp>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-5" style={{ color: QB }}>
                Outcome
              </p>
              <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-6">
                A product built<br />for a market<br />
                <span style={{ color: QB }}>no one else is serving</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-5">
                Quiv targets 10,000+ NIQS-registered quantity surveyors operating in a market with NGN 23.8 trillion in annual construction activity — with no software purpose-built for their workflow, their standards, or their budget.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55">
                The product design had to do more than look good. It had to earn the trust of professionals who have done this work manually for decades — by being precise where they expect precision, and invisible where it doesn't matter.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="flex flex-col gap-4">
                {[
                  { metric: "50%+", desc: "Target time reduction vs. manual take-off (measured in pilot)" },
                  { metric: "95%+", desc: "Calculation accuracy target vs. manual methods" },
                  { metric: "NGN 1.14B", desc: "Addressable annual revenue at conservative market penetration" },
                  { metric: "3 months", desc: "Target: 100 active users post-launch" },
                ].map(({ metric, desc }) => (
                  <div key={metric} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.025] px-5 py-4">
                    <p className="text-2xl font-bold shrink-0 w-[90px]" style={{ color: QB }}>{metric}</p>
                    <p className="text-[14px] text-white/50 leading-[1.6] mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ CLOSING ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[860px] mx-auto">
          <FadeUp>
            <blockquote className="border-l-[3px] pl-8" style={{ borderColor: QB }}>
              <p className="text-[20px] sm:text-[24px] font-medium leading-[1.55] tracking-[-0.02em] text-white/75 mb-4">
                "I'm a trained Quantity Surveyor who became a designer. Quiv is what happened when I turned that training on itself — building the tool my profession has always needed but couldn't afford."
              </p>
              <cite className="not-italic text-[13px] text-white/35">Richard Enoch · Creative Lead, ADLM Studio</cite>
            </blockquote>
          </FadeUp>
        </div>
      </section>
      <OtherProj currentSlug="quiv" currentKind="ui" />

      {/* ══ BUILD SECTION ══ */}
      <BuildSection />

    </div>
  </div>
);

export default QuivProject;

/*
═══════════════════════════════════════════════════════════════════
QUIV CASE STUDY — SCREENSHOT GUIDE
═══════════════════════════════════════════════════════════════════

All screenshots should be taken from: extra/Quiv/Quiv_Measure_v4.html
Open in Chrome. Use DevTools → Ctrl+Shift+P → "Capture full size screenshot"
or zoom to 80% and use a full-page screenshot extension.

SCREENSHOT 1 — Hero / Main App View
  → Full-page screenshot of the app with a project open and PDF visible.
  → The "money shot" — should show the measurement canvas in use.
  → Use as the hero image at the top of the page.

SCREENSHOT 2 — Dashboard / Project List
  → The screen showing saved projects before opening one.
  → Flow 3 in the prototype: Dashboard.

SCREENSHOT 3 — v1 Revit Plugin (optional)
  → Any screen from the v1 prototype (Quiv_Prototype_v2 if it exists).
  → Only needed if you want to show the pivot story visually.
  → If not available, remove this placeholder.

SCREENSHOT 4 — Product Suite / New Project Flow
  → The "Create New Project" screen or any onboarding screen.
  → Flow 4 in the prototype.

SCREENSHOT 5 — PDF Viewer + Measurement Canvas [MOST IMPORTANT]
  → Floor plan PDF loaded, measurement lines drawn on it.
  → Flow 7: Element Selection & Quantity Extraction.

SCREENSHOT 6 — Auto-Generated Take-Off List
  → The structured checklist with BESMM categories and progress.
  → Flow 6: Take-Off List Generation.

SCREENSHOT 7 — Calculation Panel
  → Data input form + calculated quantity output.
  → Flow 8: Data Input & Calculation.

SCREENSHOT 8 — Export Panel
  → Format selection (Excel / .quiv) and export confirmation.
  → Flow 11/12: Export to Excel / Export to Quiv Format.

SCREENSHOT 9 — UI System / Visual Language
  → Most complex screen visible — sidebar + data table + components.
  → Use the Take-Off List or Calculation screen for this.

Upload screenshots to Cloudinary and replace the <ImgPlaceholder />
components with actual <img> or <div> image containers.
═══════════════════════════════════════════════════════════════════
*/
