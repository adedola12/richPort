import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FiClock, FiGlobe, FiZap } from "react-icons/fi";
import confetti from "canvas-confetti";

const SERVICE_OPTIONS = [
  "UI / UX Design",
  "Brand Identity",
  "Logo Design",
  "Website Design",
  "Presentation Design",
  "Pitch Deck Design",
  "Publication Design",
  "Enquiries",
];

// Package data sourced from ratePlansData.js / backend
const SERVICE_PLANS = {
  "UI / UX Design": {
    label: "Product UI / UX",
    plans: [
      {
        name: "Essentials", price: "$500",
        desc: "UI refresh for key screens.",
        deliverables: ["UX audit report", "5 key screen designs", "Mobile-first layouts", "Design handoff files"],
      },
      {
        name: "Standard", price: "$1,200", featured: true,
        desc: "Complete UI kit for your MVP.",
        deliverables: ["Up to 15 screen designs", "Component library", "Interactive prototype", "Design system basics", "Developer handoff pack"],
      },
      {
        name: "Full Suite", price: "$2,500",
        desc: "End-to-end UX + full UI.",
        deliverables: ["UX research & user flows", "Wireframes", "30+ screen designs", "Full design system", "Clickable prototype", "QA design support"],
      },
    ],
  },
  "Brand Identity": {
    label: "Brand Identity",
    plans: [
      {
        name: "Gold", price: "$100",
        desc: "Core brand for startups.",
        deliverables: ["Primary logo (SVG, PNG, PDF)", "Brand colour palette", "Typography selection", "Basic style guide"],
      },
      {
        name: "Silver", price: "$299", featured: true,
        desc: "Everything you need to launch.",
        deliverables: ["Everything in Gold", "Business card design", "Letterhead design", "Social media kit", "Brand guidelines (20 pages)"],
      },
      {
        name: "Platinum", price: "$650",
        desc: "Full brand system.",
        deliverables: ["Everything in Silver", "Brand strategy doc", "Brand voice guide", "Mockup library", "Stationery set", "Brand presentation deck"],
      },
    ],
  },
  "Logo Design": {
    label: "Logo Design",
    plans: [
      {
        name: "Gold", price: "$100",
        desc: "Core logo for new businesses.",
        deliverables: ["Primary logo (SVG, PNG, PDF)", "2 logo variations", "Light & dark versions"],
      },
      {
        name: "Silver", price: "$299", featured: true,
        desc: "Logo + brand essentials.",
        deliverables: ["Everything in Gold", "Secondary logo mark", "Colour palette", "Typography pairing", "Social media avatar versions"],
      },
      {
        name: "Platinum", price: "$650",
        desc: "Full logo system.",
        deliverables: ["Everything in Silver", "Full logo system", "Brand guidelines", "Icon set (10 icons)", "Mascot concept"],
      },
    ],
  },
  "Website Design": {
    label: "Website Design",
    plans: [
      {
        name: "Starter", price: "$400",
        desc: "Landing page for early-stage.",
        deliverables: ["1 responsive landing page", "3 content sections", "Contact form", "Domain setup guide"],
      },
      {
        name: "Growth", price: "$850", featured: true,
        desc: "Multi-page site with blog.",
        deliverables: ["Up to 5 pages", "Blog setup", "Basic SEO", "Analytics integration", "CMS integration", "Mobile responsive"],
      },
      {
        name: "Premium", price: "$1,500",
        desc: "Custom site with integrations.",
        deliverables: ["Up to 10 pages", "Custom animations", "E-commerce ready", "Advanced SEO", "Performance optimisation", "1 month support"],
      },
    ],
  },
  "Presentation Design": {
    label: "Presentation",
    plans: [
      {
        name: "Starter", price: "$120",
        desc: "Up to 10 custom slides.",
        deliverables: ["10 custom slides", "1 style direction", "Icon set", "Editable PPTX / Keynote"],
      },
      {
        name: "Pro", price: "$250", featured: true,
        desc: "Up to 25 slides + charts.",
        deliverables: ["25 slides", "2 style options", "Custom charts & graphs", "Icon library", "Slide master template", "Print-ready PDF"],
      },
      {
        name: "Enterprise", price: "$500",
        desc: "Large decks for teams.",
        deliverables: ["Unlimited slides", "Multiple templates", "Brand integration", "Data visualisation", "Animation effects", "Editable master file"],
      },
    ],
  },
  "Pitch Deck Design": {
    label: "Pitch Deck",
    plans: [
      {
        name: "Starter", price: "$120",
        desc: "Up to 10 investor-ready slides.",
        deliverables: ["10 slides", "Problem/solution/market layout", "Custom graphics", "Editable PPTX / Keynote"],
      },
      {
        name: "Pro", price: "$250", featured: true,
        desc: "Full narrative + financials.",
        deliverables: ["25 slides", "Full pitch narrative", "Financial slide template", "Investor-ready design", "2 revision rounds"],
      },
      {
        name: "Enterprise", price: "$500",
        desc: "Full deck + data room.",
        deliverables: ["Unlimited slides", "Full pitch narrative", "Data room design", "Leave-behind print version", "Priority support"],
      },
    ],
  },
  "Publication Design": {
    label: "Publication",
    plans: [
      {
        name: "Basic", price: "$150",
        desc: "Up to 10 pages of layout.",
        deliverables: ["10-page layout design", "Custom typography", "Print-ready PDF"],
      },
      {
        name: "Standard", price: "$300", featured: true,
        desc: "Up to 30 pages + graphics.",
        deliverables: ["30-page editorial design", "Custom illustrations", "Photo editing", "Print + digital PDF"],
      },
      {
        name: "Extended", price: "$550",
        desc: "Large reports & publications.",
        deliverables: ["Unlimited pages", "Full editorial system", "Interactive PDF", "Distribution file prep", "Index & TOC design"],
      },
    ],
  },
};

const INFO_ITEMS = [
  { icon: FiClock, text: "Usually responds within 24 hours" },
  { icon: FiZap,   text: "Available for new projects" },
  { icon: FiGlobe, text: "Open to remote collaboration" },
];

// ─── Background Video ─────────────────────────────────────────────────────────
const BgVideo = ({ className }) => (
  <video
    className={className}
    src="/background-loop.mp4"
    autoPlay
    muted
    loop
    playsInline
  />
);

// ─── Info item ────────────────────────────────────────────────────────────────
const InfoItem = ({ icon: Icon, text }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
    className="flex items-center gap-3"
  >
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/10">
      <Icon size={13} className="text-lime-400" />
    </span>
    <span className="text-sm text-white/65">{text}</span>
  </motion.div>
);

// ─── Default left-panel content (video state) ─────────────────────────────────
const DefaultContent = () => {
  const containerVariants = {
    hidden:   {},
    visible:  { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

  return (
    <motion.div
      key="default"
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
    >
      <motion.div variants={item}>
        <h1 className="font-['Outfit'] text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.04em] text-white whitespace-nowrap">
          Let&apos;s <span className="text-lime-400">Talk.</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/50">
          Have a project in mind? Reach out and<br />let&apos;s explore what we can build together.
        </p>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-3">
        {INFO_ITEMS.map((item) => (
          <InfoItem key={item.text} {...item} />
        ))}
      </motion.div>
    </motion.div>
  );
};

// ─── Package summary (service selected state) ─────────────────────────────────
const PackageSummary = ({ service, data }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => { setSelectedPlan(null); }, [service]);

  return (
    <motion.div
      key={service}
      className="space-y-3"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.22 } }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {/* Service label */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-lime-400">
          {data.label}
        </span>
        <p className="mt-0.5 text-[11px] text-white/35">Tap a plan to see what's included</p>
      </div>

      {/* Plan cards */}
      <div className="space-y-1.5">
        {data.plans.map((plan) => {
          const isOpen = selectedPlan === plan.name;
          return (
            <div key={plan.name}>
              <button
                type="button"
                onClick={() => setSelectedPlan(isOpen ? null : plan.name)}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-left transition ${
                  isOpen
                    ? "border-lime-400/40 bg-lime-400/[0.09]"
                    : plan.featured
                    ? "border-lime-400/20 bg-lime-400/[0.05] hover:border-lime-400/35"
                    : "border-white/[0.07] bg-white/[0.03] hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {plan.featured && !isOpen && (
                      <span className="rounded-full bg-lime-400/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-lime-400">
                        Best
                      </span>
                    )}
                    <span className={`text-xs font-semibold ${isOpen ? "text-lime-300" : plan.featured ? "text-white/85" : "text-white/70"}`}>
                      {plan.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold tabular-nums ${isOpen ? "text-lime-400" : plan.featured ? "text-white/70" : "text-white/45"}`}>
                      {plan.price}
                    </span>
                    <svg
                      viewBox="0 0 12 12" fill="none"
                      className={`h-3 w-3 shrink-0 transition-transform ${isOpen ? "rotate-90 text-lime-400" : "text-white/25"}`}
                    >
                      <path d="M4.5 2.5l3 3.5-3 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {!isOpen && (
                  <p className="mt-0.5 text-[10px] leading-snug text-white/30">{plan.desc}</p>
                )}
              </button>

              {/* Deliverables — read-only list */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-b-xl border-x border-b border-lime-400/20 bg-lime-400/[0.04] px-3.5 pb-3.5 pt-3">
                      <p className="mb-2.5 text-[9px] font-bold uppercase tracking-widest text-white/25">
                        What&apos;s included
                      </p>
                      <ul className="space-y-2">
                        {plan.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5">
                            <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lime-400/20">
                              <svg viewBox="0 0 8 8" fill="none" className="h-2 w-2">
                                <path d="M1.5 4l2 2 3-3" stroke="#84cc16" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span className="text-[13px] leading-snug text-white/65">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Rate card link */}
      <Link
        to="/rate-details"
        className="flex items-center gap-1 text-[11px] text-white/30 transition hover:text-white/60"
      >
        Full details on the rate card
        <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
          <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.div>
  );
};

// ─── Animated checkmark ───────────────────────────────────────────────────────
const CheckmarkCircle = () => (
  <div className="relative flex items-center justify-center">
    <motion.div
      className="absolute rounded-full bg-lime-400/10"
      initial={{ width: 80, height: 80, opacity: 0 }}
      animate={{ width: 140, height: 140, opacity: [0, 0.5, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
    />
    <motion.div
      className="relative flex h-20 w-20 items-center justify-center rounded-full bg-lime-400"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9"
      >
        <motion.path
          d="M5 13l4 4L19 7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
        />
      </motion.svg>
    </motion.div>
  </div>
);

// ─── Success screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ onDiveBack }) => {
  useEffect(() => {
    const fire = (ratio, opts) =>
      confetti({ origin: { y: 0.5, x: 0.72 }, particleCount: Math.floor(180 * ratio), ...opts });
    fire(0.35, { spread: 60,  startVelocity: 55, colors: ["#84cc16", "#bef264", "#ffffff"] });
    fire(0.25, { spread: 80,  startVelocity: 45, colors: ["#84cc16", "#d9f99d", "#e5e5e5"] });
    fire(0.20, { spread: 100, startVelocity: 35, decay: 0.91, scalar: 0.8, colors: ["#ffffff", "#84cc16"] });
    fire(0.10, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ["#bef264", "#a3e635"] });
    fire(0.10, { spread: 140, startVelocity: 45, colors: ["#84cc16", "#ffffff", "#d4d4d4"] });
  }, []);

  return (
    <motion.div
      key="success"
      className="flex w-full max-w-lg flex-col items-center justify-center gap-7 text-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <CheckmarkCircle />
      <div className="space-y-2">
        <h2 className="font-['Outfit'] text-[2.2rem] font-semibold leading-tight tracking-[-0.03em] text-white">
          Message Received
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-white/45">
          I&apos;ll review your message and get back to you within 24 hours. Good things are coming.
        </p>
      </div>
      <motion.button
        onClick={onDiveBack}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-lime-400 to-lime-500 px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_24px_rgba(132,204,22,0.45)] transition hover:brightness-110 active:scale-[0.97]"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
      >
        Dive back in
        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold uppercase tracking-widest text-white/40">
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full rounded-xl bg-white/5 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-lime-400/35 transition";

// ─── Contact Page ─────────────────────────────────────────────────────────────
const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm]               = useState({ fullName: "", email: "", service: "", message: "" });
  const [status, setStatus]           = useState("idle");
  const [activePreview, setActivePreview] = useState(null);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const selectService = (s) => {
    // Radio — selecting again deselects
    const next = form.service === s ? "" : s;
    setForm((p) => ({ ...p, service: next }));
    setActivePreview(next && SERVICE_PLANS[next] ? next : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  };

  const handleDiveBack = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("pick-a-card")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <main
      className="flex flex-col w-full bg-[#050505]"
      style={{ paddingTop: "56px", minHeight: "calc(100vh - 56px)", marginBottom: "-32px" }}
    >
      {/* ── MOBILE VIDEO HEADER (hidden on desktop) ── */}
      <div className="relative lg:hidden h-52 shrink-0 overflow-hidden">
        <BgVideo className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-[#050505]/60" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)" }}
        />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400">
              <span className="text-xs font-black text-black">R</span>
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">Richard Enoch</span>
          </div>
          <h1 className="font-['Outfit'] text-[2rem] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
            Let&apos;s <span className="text-lime-400">Talk.</span>
          </h1>
          <p className="mt-1.5 text-xs leading-relaxed text-white/50">
            Have a project in mind? Reach out and let&apos;s explore what we can build together.
          </p>
        </div>
      </div>

      <div className="flex w-full gap-4 px-4 sm:px-8 pb-8 pt-4 lg:pt-12 lg:h-[calc(100vh-56px)] lg:overflow-hidden">

        {/* ── LEFT — 50% video panel ─────────────────────────────────────── */}
        <div
          className="relative hidden w-[50%] shrink-0 rounded-3xl lg:block"
          style={{
            padding: "1.5px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(180,180,180,0.06) 45%, rgba(255,255,255,0.16) 100%)",
            boxShadow: "0 0 48px rgba(220,220,220,0.07), 0 0 90px rgba(200,200,200,0.04)",
          }}
        >
          <div className="relative flex h-full w-full flex-col items-start justify-end overflow-hidden rounded-3xl pb-18 px-20">

            {/* Background video — dimmed so it doesn't compete with text */}
            <BgVideo className="absolute inset-0 h-full w-full object-cover opacity-30" />

            {/* Base dark fill + animated gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[#050505]/60" />
            <motion.div
              className="pointer-events-none absolute inset-0"
              animate={{ background: activePreview
                ? "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 40%, rgba(0,0,0,0.50) 100%)"
                : "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 100%)"
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Content area */}
            <div className="relative z-10 w-full max-w-sm space-y-5">

              {/* Brand mark — always visible */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400">
                  <span className="text-xs font-black text-black">R</span>
                </span>
                <span className="text-sm font-semibold tracking-tight text-white">Richard Enoch</span>
              </motion.div>

              {/* Animated panel — default or package summary */}
              <AnimatePresence mode="wait">
                {activePreview && SERVICE_PLANS[activePreview] ? (
                  <PackageSummary
                    key={activePreview}
                    service={activePreview}
                    data={SERVICE_PLANS[activePreview]}
                  />
                ) : (
                  <DefaultContent key="default" />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── RIGHT — 50% form panel ─────────────────────────────────────── */}
        <div className="flex flex-1 flex-col items-center justify-start lg:justify-center overflow-y-auto px-0 py-6 sm:px-4 lg:py-12 lg:overflow-hidden lg:px-16 xl:px-20">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <SuccessScreen key="success" onDiveBack={handleDiveBack} />
            ) : (
              <motion.div
                key="form"
                className="w-full max-w-lg space-y-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div>
                  <h2 className="font-['Outfit'] text-3xl font-semibold tracking-[-0.03em] text-white">
                    Send a Message
                  </h2>
                  <p className="mt-1.5 text-sm text-white/35">
                    Fill in the details below and I&apos;ll get back to you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Full Name">
                      <input name="fullName" value={form.fullName} onChange={handleChange}
                        placeholder="ex. Alex Johnson" required className={inputCls} />
                    </Field>
                    <Field label="Email">
                      <input name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="ex. alex@email.com" required className={inputCls} />
                    </Field>
                  </div>

                  <Field label="What can I help you with?">
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 pt-1">
                      {SERVICE_OPTIONS.map((s) => {
                        const active = form.service === s;
                        return (
                          <button
                            type="button"
                            key={s}
                            onClick={() => selectService(s)}
                            className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition ${
                              active
                                ? "border-lime-400/60 bg-lime-400/15 text-lime-200 shadow-[0_0_12px_rgba(132,204,22,0.2)]"
                                : "border-white/[0.08] bg-white/5 text-white/45 hover:border-white/15 hover:text-white/65"
                            }`}
                          >
                            {/* Radio dot */}
                            <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                              active ? "border-lime-400 bg-lime-400" : "border-white/20 bg-transparent"
                            }`}>
                              {active && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
                            </span>
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  {/* Mobile-only package summary — shown inline when service selected */}
                  {activePreview && SERVICE_PLANS[activePreview] && (
                    <div className="block lg:hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <AnimatePresence mode="wait">
                        <PackageSummary
                          key={activePreview}
                          service={activePreview}
                          data={SERVICE_PLANS[activePreview]}
                        />
                      </AnimatePresence>
                    </div>
                  )}

                  <Field label="Message">
                    <textarea name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell me about your project..." rows={4} required
                      className={`${inputCls} resize-none`} />
                  </Field>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-xl bg-gradient-to-b from-lime-400 to-lime-500 py-3.5 text-sm font-bold text-black shadow-[0_0_24px_rgba(132,204,22,0.45)] transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : "Send Message"}
                  </button>
                </form>

                <p className="text-center text-xs text-white/25">
                  Prefer email?{" "}
                  <a href="mailto:enochrichard6@gmail.com"
                    className="text-white/45 underline underline-offset-2 transition hover:text-white/75">
                    enochrichard6@gmail.com
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
};

export default Contact;
