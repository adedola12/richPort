import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link02Icon, ArrowDown01Icon } from "hugeicons-react";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

import niqsLogo  from "../assets/partner/NiqsColor.svg";
import adlmLogo  from "../assets/partner/ADLMLogo.png";
import bookLogo  from "../assets/partner/BookLogo.png";

const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4";

// ─── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "oluwatosin",
    number: "01",
    name: "Oluwatosin",
    category: "Personal Brand · Portfolio",
    description:
      "A personal brand website built to position a seasoned professional in front of the right audience. Clean, confident, and structured to convert visitors into clients.",
    url: "https://oluwatosin-website.vercel.app/",
    liveUrl: "https://oluwatosin-website.vercel.app/",
    logo: null,
    logoText: "OT",
    comment: {
      text: "Richard understood exactly what I needed — a site that felt like me but spoke directly to my ideal client. I've had more enquiries in two months than the whole of last year.",
      author: "Oluwatosin A.",
      role: "Brand Consultant",
    },
  },
  {
    id: "niqs",
    number: "02",
    name: "NIQS",
    category: "Professional Body · Government",
    description:
      "Digital presence redesign for the Nigerian Institute of Quantity Surveyors — bringing a legacy institution's online identity into the modern web while honouring its heritage.",
    url: "https://niqs-website.vercel.app/",
    liveUrl: "https://niqs-website.vercel.app/",
    logo: niqsLogo,
    comment: {
      text: "The institute finally has a website that reflects our standing in the profession. Members and stakeholders have responded overwhelmingly well to the new look.",
      author: "Engr. Bello M.",
      role: "President, NIQS",
    },
  },
  {
    id: "adlm",
    number: "03",
    name: "ADLM Studio",
    category: "Creative Agency · Design",
    description:
      "Website for a creative studio that needed to speak the language of high-value clients. Bold visual storytelling, seamless navigation, and a portfolio layout that sells itself.",
    url: "https://www.adlmstudio.net/",
    liveUrl: "https://www.adlmstudio.net/",
    logo: adlmLogo,
    comment: {
      text: "Our conversion rate tripled within the first month. The site doesn't just look good — it works. Richard delivered exactly what a creative business like ours needed.",
      author: "Adaeze L.",
      role: "Creative Director, ADLM Studio",
    },
  },
  {
    id: "bookrion",
    number: "04",
    name: "Book Rion",
    category: "EdTech · Reading Platform",
    description:
      "An online reading and community platform for book lovers. The design balances warmth with function — inviting users to explore without overwhelming them.",
    url: "https://www.bookrion.com/",
    liveUrl: "https://www.bookrion.com/",
    logo: bookLogo,
    comment: {
      text: "Our users felt at home immediately. Richard understood the product deeply and translated that into a beautiful, intuitive experience.",
      author: "Amara T.",
      role: "Product Lead, Book Rion",
    },
  },
];

// ─── Scaled iframe ────────────────────────────────────────────────────────────
// Desktop (≥768px container): renders site at 1440px wide and scales down
//   → shows desktop layout of the site
// Mobile (<768px container): renders site at the container's actual width
//   → site responds and shows its own mobile layout, no scaling needed
const DESKTOP_W = 1440;
const DESKTOP_H = 900;
const MOBILE_BREAKPOINT = 768;

const ScaledIframe = ({ url, name }) => {
  const wrapRef = useRef(null);
  const [cfg, setCfg] = useState({ renderW: DESKTOP_W, renderH: DESKTOP_H, scale: 1 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (w >= MOBILE_BREAKPOINT) {
        // Desktop: scale 1440px layout down to container width
        setCfg({ renderW: DESKTOP_W, renderH: DESKTOP_H, scale: w / DESKTOP_W });
      } else {
        // Mobile: give the iframe the exact container width so it renders mobile layout
        setCfg({ renderW: w, renderH: Math.round(w * 2.8), scale: 1 });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden"
      style={{ height: cfg.renderH * cfg.scale }}
    >
      <iframe
        src={url}
        title={name}
        loading="lazy"
        style={{
          width: cfg.renderW,
          height: cfg.renderH,
          transform: `scale(${cfg.scale})`,
          transformOrigin: "top left",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
};

// ─── Browser chrome wrapper ───────────────────────────────────────────────────
const BrowserFrame = ({ url, name }) => {
  const domain = (() => {
    try { return new URL(url).hostname; }
    catch { return url; }
  })();

  return (
    <div
      className="mx-auto w-full max-w-[1222px] overflow-hidden rounded-2xl"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "#0d0d0d",
        boxShadow: "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-3 border-b px-4 py-3"
        style={{ background: "#111111", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex shrink-0 gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1.5">
          <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3 shrink-0 text-white/20">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
            <path d="M7 1a8 8 0 0 1 0 12M7 1a8 8 0 0 0 0 12M1 7h12" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="truncate font-mono text-[11px] text-white/28">{domain}</span>
        </div>
        <svg viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5 shrink-0 text-white/15">
          <path d="M11.5 2.5A6 6 0 1 0 13 7v-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M10 1l1.5 1.5L10 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <ScaledIframe url={url} name={name} />
    </div>
  );
};

// ─── Comment card ─────────────────────────────────────────────────────────────
const CommentCard = ({ comment, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 flex flex-col justify-between"
  >
    <div
      className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full"
      style={{ background: "radial-gradient(circle, rgba(132,204,22,0.07) 0%, transparent 70%)" }}
    />
    <svg viewBox="0 0 32 24" fill="currentColor" className="mb-4 h-5 w-5 text-lime-400/30">
      <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l2.4 3.2C11.2 4.8 8.8 8 8.8 12H14.4V24H0zm17.6 0V14.4C17.6 6.4 22.4 1.6 32 0l2.4 3.2C28.8 4.8 26.4 8 26.4 12H32V24H17.6z" />
    </svg>
    <p className="flex-1 text-[13px] leading-[1.7] italic text-white/50">
      &ldquo;{comment.text}&rdquo;
    </p>
    <div className="mt-5 flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime-400/10 text-sm font-bold text-lime-400">
        {comment.author[0]}
      </span>
      <div>
        <p className="text-xs font-semibold text-white/65">{comment.author}</p>
        <p className="text-[10px] text-white/30">{comment.role}</p>
      </div>
    </div>
  </motion.div>
);

// ─── Project section ──────────────────────────────────────────────────────────
const ProjectSection = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      ref={ref}
      className="relative px-6 py-16 lg:px-16 lg:py-24"
      style={index > 0 ? { borderTop: "1px solid rgba(255,255,255,0.04)" } : {}}
    >
      {/* ── Top row: info left + comment right ── */}
      <div className="mx-auto mb-6 w-full max-w-[1222px] flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">

        {/* Left: counter, logo, name, description, button */}
        <motion.div
          className="flex flex-col gap-3 lg:w-[58%]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Counter */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/18">
              {project.number} &mdash; 04
            </span>
            <span className="h-px w-10 bg-white/10" />
          </div>

          {/* Logo + category */}
          <div className="flex items-center gap-3">
            {project.logo ? (
              <img src={project.logo} alt={project.name} className="h-6 w-auto object-contain opacity-80" />
            ) : (
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold text-white/60">
                {project.logoText}
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest text-lime-400">
              {project.category}
            </span>
          </div>

          {/* Name */}
          <h2
            className="font-['Outfit'] text-[clamp(2rem,3.5vw,2.8rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #7a7a7a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {project.name}
          </h2>

          {/* Description */}
          <p className="max-w-[500px] text-[14px] leading-[1.65] text-white/45">
            {project.description}
          </p>

          {/* CTA */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Visit live site
            <Link02Icon size={13} />
          </a>
        </motion.div>

        {/* Right: testimonial */}
        <motion.div
          className="lg:flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <CommentCard comment={project.comment} isInView={isInView} />
        </motion.div>
      </div>

      {/* ── Browser frame below ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <BrowserFrame url={project.url} name={project.name} />
      </motion.div>
    </section>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 0.61, 0.36, 1] } },
  };

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background video */}
      <video
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]" />
      <div className="absolute inset-0 bg-[#050505]/15" />

      <motion.div
        className="relative flex flex-col items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tag */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/40 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            Web Design
          </span>
        </motion.div>

        {/* Headline — matches other pages */}
        <motion.h1
          variants={item}
          className="max-w-[820px] font-['Outfit'] text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #7a7a7a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Websites that
          <br />
          <span
            style={{
              background: "linear-gradient(180deg, #bef264 0%, #65a30d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            actually work.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="max-w-[460px] text-[17px] leading-[1.65] text-white/38"
        >
          Three projects. Real businesses. Each designed to convert and built to endure.
        </motion.p>

        {/* Scroll hint */}
        <motion.div variants={item} className="mt-4 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/22">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown01Icon size={14} className="text-white/22" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const WebsiteDesignPage = () => (
  <div className="min-h-screen bg-[#050505] text-white" style={{ paddingTop: "56px" }}>
    <PageMeta
      title="Website Design"
      description="Website design projects by Richard Enoch — live, interactive sites built for national organisations and growing brands."
      url="/website-design"
    />
    <Hero />

    <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      {PROJECTS.map((project, i) => (
        <ProjectSection key={project.id} project={project} index={i} />
      ))}
    </div>

    <BuildSection />
  </div>
);

export default WebsiteDesignPage;
