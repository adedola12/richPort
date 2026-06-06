// src/pages/NIQSProject.jsx
// NIQS — Nigerian Institute of Quantity Surveyors
// Brand Identity & Guidelines System
// Creative Lead: Richard Enoch | ADLM Studio

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";
import GuidelineCarousel from "../components/ProjectPage/GuidelineCarousel";
import BrandGallery from "../components/ProjectPage/BrandGallery";

const NAVY = "#000066";
const GOLD = "#D9B650";

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

const SLabel = ({ n, t }) => (
  <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: GOLD }}>
    {n && `${n} — `}{t}
  </p>
);

const NIQSProject = () => (
  <div className="relative min-h-screen bg-[#07090C] text-white overflow-x-hidden font-['Outfit']">
    <PageMeta
      title="NIQS — Brand Identity & Guidelines"
      description="Brand identity and guidelines system for the Nigerian Institute of Quantity Surveyors — a 55-year institution representing 10,000+ construction professionals. Navy, gold, and a heraldic identity built to last."
      url="/projects/niqs"
    />

    {/* ambient glows */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]"
        style={{ background: `${NAVY}18` }} />
      <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: `${GOLD}08` }} />
    </div>

    <div className="relative z-10">

      {/* ══ HERO ══ */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-4">

        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <Link to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2 text-[12px] text-white/70 hover:bg-white/10 transition backdrop-blur-md">
            ← Back to Portfolio
          </Link>
        </motion.div>

        <motion.div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[11px] font-semibold border"
          style={{ borderColor: `${GOLD}55`, color: GOLD, background: `${GOLD}0D` }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
          ADLM Studio · Brand Identity
        </motion.div>

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
            NIQS
          </span>
        </motion.h1>

        <motion.p
          className="text-center text-[16px] sm:text-[18px] text-white/55 max-w-[560px] leading-[1.65] mb-12"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Brand identity and guidelines system for the Nigerian Institute of Quantity Surveyors — a 55-year institution, 10,000+ professionals, one cohesive visual language.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52 }}
        >
          {[
            { value: "1969", label: "Founded" },
            { value: "10K+", label: "NIQS Members" },
            { value: "37", label: "Chapters" },
            { value: "12", label: "Guideline Chapters" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: GOLD }}>{value}</p>
              <p className="text-[11px] text-white/35 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Logo hero */}
        <motion.div
          className="mt-14 w-full max-w-[700px]"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 0.61, 0.36, 1], delay: 0.55 }}
        >
          <div className="rounded-2xl border border-white/8 flex items-center justify-center py-14 px-8"
            style={{ background: `${NAVY}CC` }}>
            <img src="/NIQSColor.svg" alt="NIQS Logo — Colour" className="w-full max-w-[420px]" />
          </div>
        </motion.div>

      </section>

      {/* ══ THE BRIEF ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">

          <FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/8 mb-14">
              {[
                { label: "CLIENT", value: "NIQS" },
                { label: "MY ROLE", value: "Creative Lead" },
                { label: "PROJECT TYPE", value: "Brand Identity" },
                { label: "SCOPE", value: "~60 Pages" },
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
                {["Brand Guidelines (~60 pages)", "Logo System", "Colour Palette", "Typography", "Stationery Suite", "Social Media Templates", "Digital Applications"].map(t => (
                  <span key={t} className="rounded-md border px-2.5 py-1 text-[11px] font-semibold"
                    style={{ borderColor: `${GOLD}44`, color: GOLD, background: `${GOLD}0D` }}>{t}</span>
                ))}
              </div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">MY ROLE</p>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55">
                As Creative Lead at ADLM Studio, I led the full brand identity system for NIQS — auditing the existing mark, establishing the visual language, and building a comprehensive guidelines document that would serve the institution across print, digital, and ceremonial touchpoints for years to come.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="rounded-2xl border border-white/8 p-6" style={{ background: `${NAVY}22` }}>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: GOLD }}>About NIQS</p>
                <p className="text-[14px] text-white/55 leading-[1.7] mb-4">
                  The Nigerian Institute of Quantity Surveyors is the professional body for Quantity Surveyors in Nigeria, established in 1969. With over 10,000 registered members, 4,000+ corporate members, and 37 chapters across Nigeria, NIQS is a cornerstone institution in the Nigerian built environment.
                </p>
                <p className="text-[14px] text-white/55 leading-[1.7]">
                  The Institute holds 15+ international agreements and operates under the tagline: <em className="not-italic font-semibold text-white/75">"The Professional Construction Cost Managers."</em> — a declarative statement that is not a question.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ THE CHALLENGE ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-start">
            <FadeUp delay={0.1}>
              <SLabel n="01" t="THE CHALLENGE" />
              <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-6">
                A 55-year institution.<br />
                <span style={{ color: GOLD }}>No unified visual language.</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-6">
                NIQS carried decades of institutional authority but lacked the visual cohesion to project it. Communications across chapters varied widely — inconsistent colour use, mismatched typography, and logo applications that had drifted from any standard. The institution needed a single source of truth for its visual identity.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55">
                The brief was to honour what already existed — the heraldic eagle mark is institutional heritage, not to be redesigned — while building a modern, comprehensive system around it. Every decision had to balance tradition with clarity.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="lg:sticky lg:top-8">
                <div className="rounded-2xl border p-6 mb-4" style={{ borderColor: `${GOLD}33`, background: `${GOLD}08` }}>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>Key Constraints</p>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: "Preserve the mark", note: "The heraldic eagle is institutional heritage — not up for redesign" },
                      { label: "Serve 37 chapters", note: "Guidelines must work for local chapters, not just HQ" },
                      { label: "Print + digital parity", note: "Stationery, event materials, and digital platforms in one system" },
                      { label: "Long shelf life", note: "This document needs to hold up for a decade" },
                    ].map(({ label, note }) => (
                      <div key={label} className="flex items-start gap-3">
                        <span className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD }} />
                        <div>
                          <p className="text-[13px] font-semibold text-white/80">{label}</p>
                          <p className="text-[12px] text-white/40 leading-[1.55]">{note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ BRAND SYSTEM ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="02" t="THE BRAND SYSTEM" />
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-4">
              Authoritative.<br />
              <span style={{ color: GOLD }}>Heraldic. Precise.</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[600px] mb-10">
              The brand personality centres on six pillars: Authoritative, Heraldic, Precise, Progressive, Trustworthy, and Civic. Every visual decision maps back to at least one of them.
            </p>
          </FadeUp>

          {/* Colour + Logo */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <SlideIn direction="left" delay={0.1}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 h-full">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: GOLD }}>Colour Palette</p>
                <div className="flex gap-4 mb-5">
                  <div className="flex flex-col items-start gap-2">
                    <div className="w-16 h-16 rounded-xl border border-white/10" style={{ background: NAVY }} />
                    <p className="text-[11px] font-semibold text-white/70">Navy</p>
                    <p className="text-[10px] text-white/30 font-mono">{NAVY}</p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <div className="w-16 h-16 rounded-xl border border-white/10" style={{ background: GOLD }} />
                    <p className="text-[11px] font-semibold text-white/70">Gold</p>
                    <p className="text-[10px] text-white/30 font-mono">{GOLD}</p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <div className="w-16 h-16 rounded-xl border border-white/10 bg-white" />
                    <p className="text-[11px] font-semibold text-white/70">White</p>
                    <p className="text-[10px] text-white/30 font-mono">#FFFFFF</p>
                  </div>
                </div>
                <p className="text-[13px] text-white/45 leading-[1.65]">
                  Navy conveys authority and institutional depth. Gold signals prestige, heraldic heritage, and precision. White provides the breath between them — clean, confident space.
                </p>
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={0.15}>
              <div className="rounded-2xl border p-6 h-full" style={{ borderColor: `${GOLD}33`, background: `${NAVY}22` }}>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: GOLD }}>Logo System</p>
                <div className="rounded-xl overflow-hidden mb-5 flex items-center justify-center py-8 px-6"
                  style={{ background: NAVY }}>
                  <img src="/NIQSColor.svg" alt="NIQS Colour Logo" className="w-full max-w-[280px]" />
                </div>
                <div className="rounded-xl overflow-hidden flex items-center justify-center py-6 px-6 bg-white/5 border border-white/8">
                  <img src="/NIQSGrey.svg" alt="NIQS Grey Logo" className="w-full max-w-[280px] opacity-60" />
                </div>
                <p className="text-[12px] text-white/35 mt-3 leading-[1.55]">
                  The heraldic eagle mark is preserved as institutional heritage. The system defines clear usage rules, exclusion zones, and approved colour variants.
                </p>
              </div>
            </SlideIn>
          </div>

          {/* Brand personality pills */}
          <FadeUp>
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>Brand Personality</p>
              <div className="flex flex-wrap gap-2">
                {["Authoritative", "Heraldic", "Precise", "Progressive", "Trustworthy", "Civic"].map(t => (
                  <span key={t} className="rounded-full border px-4 py-1.5 text-[12px] font-semibold"
                    style={{ borderColor: `${GOLD}44`, color: GOLD, background: `${GOLD}0D` }}>{t}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ GUIDELINE CHAPTERS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="03" t="WHAT'S IN THE GUIDELINES" />
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-4">
              12 chapters.<br />
              <span style={{ color: GOLD }}>One complete system.</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[600px] mb-10">
              The guidelines document covers every touchpoint where the NIQS brand appears — from the letterhead to digital product UI.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: "01", title: "Brand Story", desc: "Founding mission, institutional history, and the values that define NIQS." },
              { n: "02", title: "Personality & Voice", desc: "Brand tone, communication principles, and the six personality pillars." },
              { n: "03", title: "Logo & Brand Mark", desc: "Usage rules, exclusion zones, colour variants, and misuse examples." },
              { n: "04", title: "Colour Palette", desc: "Primary navy and gold, secondary neutrals, and accessibility ratios." },
              { n: "05", title: "Typography", desc: "Display and body typefaces, hierarchy scale, and usage guidance." },
              { n: "06", title: "Imagery", desc: "Photography direction, art direction principles, and mood guidance." },
              { n: "07", title: "Iconography", desc: "Icon style, grid system, and approved usage across contexts." },
              { n: "08", title: "Design Foundations", desc: "Grid systems, spacing, layout principles, and compositional rules." },
              { n: "09", title: "Components & UI Patterns", desc: "Digital UI components built on the NIQS visual language." },
              { n: "10", title: "Stationery & Applications", desc: "Letterhead, business cards, envelopes, and official document templates." },
              { n: "11", title: "Digital Applications", desc: "Email signatures, social banners, and digital platform guidelines." },
              { n: "12", title: "Brand Voice & Copy", desc: "Writing guidelines, tone examples, and editorial standards." },
            ].map(({ n, title, desc }) => (
              <FadeUp key={n}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: GOLD }}>{n}</span>
                    <p className="text-[14px] font-semibold text-white">{title}</p>
                  </div>
                  <p className="text-[13px] text-white/45 leading-[1.6]">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="04" t="THE PROCESS" />
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-10">
              Building around<br />
              <span style={{ color: GOLD }}>what already stood.</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Audit & Research",
                body: "I began by cataloguing every existing NIQS communications material — letterheads, event banners, chapter publications. The audit revealed inconsistency at nearly every level, but also a consistent emotional gravity in the existing mark that was worth preserving.",
              },
              {
                title: "Anchoring the Mark",
                body: "Rather than redesign the heraldic eagle, I codified it: defined the exclusion zone, established approved colour applications, documented the proportions. The mark became the anchor point from which everything else was derived.",
              },
              {
                title: "Building the System",
                body: "With the anchor set, I developed the full visual language — colour relationships, typography hierarchy, spacing grid, and component patterns — all traced back to the institutional values of authority, precision, and trust.",
              },
              {
                title: "Application & Documentation",
                body: "The final phase brought the system into context: stationery suites, digital templates, and chapter-level applications. Each was documented with clear do/don't examples so any team member — designer or not — could apply the brand correctly.",
              },
            ].map(({ title, body }) => (
              <FadeUp key={title}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 h-full">
                  <p className="text-[15px] font-semibold text-white mb-3">{title}</p>
                  <p className="text-[14px] text-white/50 leading-[1.65]">{body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 05 — THE GUIDELINE (scroll carousel) ══ */}
      <GuidelineCarousel
        n="05"
        label="THE GUIDELINE"
        white="The system,"
        accent="documented"
        description="60 pages. Every rule, every exception, every approved variant — a single source of truth for how NIQS shows up across every surface."
        color={GOLD}
        slides={[
          { src: null, alt: "Cover — NIQS brand guideline document cover" },
          { src: null, alt: "Brand story — 55-year institutional history and mission" },
          { src: null, alt: "Personality & voice — six brand pillars and tone of voice" },
          { src: null, alt: "Logo & brand mark — the heraldic eagle, codified" },
          { src: null, alt: "Logo clear space — exclusion zones and minimum sizes" },
          { src: null, alt: "Logo colour variants — approved applications across backgrounds" },
          { src: null, alt: "Logo don'ts — misuse rules and examples" },
          { src: null, alt: "Colour palette — Navy #000066, Gold #D9B650, and neutrals" },
          { src: null, alt: "Typography — display and body typeface hierarchy" },
          { src: null, alt: "Imagery — photography direction and art direction principles" },
          { src: null, alt: "Design foundations — grid, spacing, and layout system" },
          { src: null, alt: "Stationery — letterhead, business cards, and envelopes" },
          { src: null, alt: "Digital applications — email signatures and social banners" },
          { src: null, alt: "Components — UI patterns built on the NIQS visual language" },
          { src: null, alt: "Brand voice & copy — writing guidelines and editorial standards" },
        ]}
      />

      {/* ══ 06 — TOUCHPOINTS GALLERY ══ */}
      <BrandGallery
        n="06"
        label="TOUCHPOINTS GALLERY"
        white="The brand,"
        accent="applied"
        description="Selected touchpoint designs — the NIQS visual system at work across stationery, digital, and ceremonial applications."
        color={GOLD}
        images={[
          { src: null, alt: "App UI",           label: "APP UI" },
          { src: null, alt: "Website UI",        label: "WEBSITE UI" },
          { src: null, alt: "Letterhead",        label: "LETTERHEAD" },
          { src: null, alt: "Business Card",     label: "BUSINESS CARD" },
          { src: null, alt: "Email Signature",   label: "EMAIL SIGNATURE" },
          { src: null, alt: "Hoodie",            label: "HOODIE" },
          { src: null, alt: "Event Backdrop",    label: "SIGNAGE" },
          { src: null, alt: "Certificate",       label: "CERTIFICATE" },
          { src: null, alt: "Social Banner",     label: "SOCIAL MEDIA" },
          { src: null, alt: "Tote Bag",          label: "TOTE BAG" },
          { src: null, alt: "Folder Design",     label: "FOLDER DESIGN" },
          { src: null, alt: "Notebook",          label: "NOTEBOOK" },
          { src: null, alt: "Poster Design",     label: "POSTER DESIGN" },
          { src: null, alt: "T-Shirt",           label: "T-SHIRT" },
          { src: null, alt: "Cup",               label: "CUP" },
          { src: null, alt: "Bottle",            label: "BOTTLE" },
        ]}
      />

      {/* ══ STATUS NOTE ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[860px] mx-auto">
          <FadeUp>
            <div className="rounded-2xl border p-8" style={{ borderColor: `${GOLD}33`, background: `${GOLD}06` }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Project Status</p>
              </div>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/65 mb-4">
                The NIQS brand guidelines are approximately 60% complete. Chapters 01–11 are finalised and delivered. Chapter 12 (Social Media Templates) is currently in production — template design for 37 chapters at scale is underway.
              </p>
              <p className="text-[14px] text-white/40 leading-[1.65]">
                This page reflects work completed as of May 2026. The full document will be published here once the social media templates section is finalised and client-approved.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ CLOSING ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[860px] mx-auto">
          <FadeUp>
            <blockquote className="border-l-[3px] pl-8" style={{ borderColor: GOLD }}>
              <p className="text-[20px] sm:text-[24px] font-medium leading-[1.55] tracking-[-0.02em] text-white/75 mb-4">
                "NIQS is one of the most demanding briefs I've taken on — not because it was complex, but because it mattered. When an institution has stood for 55 years, you don't redesign it. You find the language that makes it legible again."
              </p>
              <cite className="not-italic text-[13px] text-white/35">Richard Enoch · Creative Lead, ADLM Studio</cite>
            </blockquote>
          </FadeUp>
        </div>
      </section>
      <OtherProj currentSlug="niqs" currentKind="default" />

      {/* ══ BUILD SECTION ══ */}
      <BuildSection />

    </div>
  </div>
);

export default NIQSProject;
