// src/components/Home/FaqSection.jsx — accordion FAQ. Content is DEFAULT_FAQS below.
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* Shown until FAQs are managed from the admin panel — the API list,
   when non-empty, replaces these. */
const DEFAULT_FAQS = [
  {
    q: "What services do you offer?",
    a: "My core services are brand identity design and product (UI/UX) design. Around those I also deliver website design, presentation and pitch-deck design, publication design, and flyer/social media design — usually in support of a bigger brand or product engagement.",
  },
  {
    q: "How does booking work?",
    a: "Pick a service and plan from the rate card, hit Book Service, and fill the short project questionnaire. The moment you submit, we both receive an email with a copy of your answers, an invoice, and the terms that govern the project — everything documented from minute one.",
  },
  {
    q: "How is payment structured?",
    a: "Projects run on a 70% deposit with the 30% balance due on completion. The invoice email contains the account details; once the deposit lands and you send proof, your slot is locked in and work begins.",
  },
  {
    q: "How many revision rounds do I get?",
    a: "It depends on the plan — standard plans include set revision rounds per deliverable, while the top package includes unlimited revisions. The exact counts are stated in your terms email before any payment is made.",
  },
  {
    q: "How long will my project take?",
    a: "It depends on scope. As a guide, a full brand identity typically runs two to six weeks. You set your preferred duration in the intake form, so we align on the timeline before kickoff.",
  },
  {
    q: "What do I need to prepare before we start?",
    a: "Just the questionnaire, answered honestly: what your business does, your goals, your audience, and anything you already have — an existing logo, content, references. The better the brief, the sharper the first concepts.",
  },
  {
    q: "How do we communicate during the project?",
    a: "Email is the system of record — every decision and deliverable is documented there. Day to day we can also work over WhatsApp or scheduled calls, whichever you prefer.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — the process is fully remote and pricing is quoted in USD (with NGN equivalents), so working across time zones and currencies is standard.",
  },
];

const FaqItem = ({ q, a, open, onToggle }) => (
  <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden transition-colors hover:border-white/15">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
    >
      <span className="text-[15px] sm:text-[16px] font-medium text-white/90">{q}</span>
      <motion.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.25 }}
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-lime-400"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="px-6 pb-6 text-[14px] sm:text-[15px] leading-[1.7] text-white/50">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FaqSection = () => {
  /* Edit the questions in DEFAULT_FAQS above and redeploy. */
  const faqs = DEFAULT_FAQS;
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="bg-[#050505] py-20 sm:py-28 px-4 sm:px-8">
      <div className="mx-auto max-w-[860px]">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-5">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-50/80">FAQ</span>
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-['Outfit'] font-semibold leading-[1.0] tracking-[-0.03em]"
            style={{ background: "linear-gradient(180deg,#ffffff 0%,#7a7a7a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Questions, answered
          </h2>
          <p className="mt-3 text-[15px] text-neutral-400 max-w-md mx-auto">
            The things clients usually ask before we start — answered upfront.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>

        <p className="mt-10 text-center text-[14px] text-white/40">
          Still curious?{" "}
          <Link to="/contact" className="text-lime-400 hover:underline">Reach out directly →</Link>
        </p>
      </div>
    </section>
  );
};

export default FaqSection;
