// src/pages/BookFlyer.jsx — flyer / social-media design booking
import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageMeta from "../components/common/PageMeta";
import { fetchJson } from "../api/http";

/* Fallback mirror of server/config/flyerPlans.js — the live values are
   fetched from /api/flyer-requests/plans; the server always recomputes
   price on submit, so these are display-only. */
const DEFAULT_PLANS = {
  single: { label: "Single Design", designs: 1, priceNGN: 15000, perDesign: 15000, sourceFiles: false },
  triple: { label: "3-Design Pack", designs: 3, priceNGN: 39000, perDesign: 13000, sourceFiles: false },
  five:   { label: "5-Design Pack", designs: 5, priceNGN: 55000, perDesign: 11000, sourceFiles: true },
  event:  { label: "Event Campaign (6+ designs)", designs: null, priceNGN: null, perDesign: 9000, sourceFiles: true },
};
const PLAN_ORDER = ["single", "triple", "five", "event"];

const N = (v) => `₦${Number(v).toLocaleString("en-NG")}`;

const inputCls =
  "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition focus:border-lime-400/60 focus:bg-white/[0.06]";
const labelCls = "mb-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50";

const F = ({ label, optional, children }) => (
  <div>
    <label className={labelCls}>
      {label} {optional && <span className="normal-case text-white/30">(optional)</span>}
    </label>
    {children}
  </div>
);

const BookFlyer = () => {
  const hpRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [plans, setPlans] = useState(DEFAULT_PLANS);
  const [plan, setPlan] = useState(() => {
    const p = (searchParams.get("plan") || "").toLowerCase();
    return DEFAULT_PLANS[p] ? p : "";
  });
  const [form, setForm] = useState({
    name: "", email: "", phone: "", brand: "", purpose: "", deadline: "",
    headline: "", subtitle: "", bodyText: "", eventDetails: "", references: "", breakdown: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJson("/api/flyer-requests/plans");
        if (data && data.single) setPlans(data);
      } catch { /* keep defaults */ }
    })();
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isEvent = plan === "event";
  const selected = plan ? plans[plan] : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!plan) return setError("Pick a package first.");
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError("Please enter a valid email.");
    if (!form.purpose.trim()) return setError("Tell me what the flyer is for.");
    if (isEvent && !form.breakdown.trim()) return setError("List the designs your event needs — a rough list is fine.");

    setSubmitting(true);
    try {
      await fetchJson("/api/flyer-requests", {
        method: "POST",
        body: JSON.stringify({ plan, ...form, _hp: hpRef.current?.value || "" }),
      });
      setDone(true);
      window.scrollTo(0, 0);
    } catch {
      setError("Something went wrong — please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white px-4 pt-28 pb-24">
      <PageMeta
        title="Book a Flyer Design"
        description="Flyer and social media design packages — single designs, packs, and full event campaigns."
        url="/book-flyer"
      />

      <div className="mx-auto max-w-[760px]">
        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-lime-400/30 bg-[#0d0f12] px-8 py-14 text-center"
          >
            <div className="mx-auto mb-6 flex h-[74px] w-[74px] items-center justify-center rounded-full border-2 border-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 stroke-lime-400">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">Request received!</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-white/55 max-w-[440px] mx-auto">
              {isEvent
                ? "Check your email for a copy of your request. I'll review your design list and reach out within 24 hours with a full quote."
                : "Check your email — it contains a copy of your request, the amount due, and the payment details. Design begins once payment is confirmed."}
            </p>
            <Link to="/" className="mt-8 inline-block rounded-xl bg-lime-400 px-6 py-3 text-[14px] font-semibold text-black transition hover:bg-lime-300">
              Back to home →
            </Link>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-lime-400 mb-4">Flyer & Social Media Design</p>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-[-0.02em]">
              A flyer that <span className="text-lime-400">does its job.</span>
            </h1>
            <p className="mt-3 mb-10 text-[15px] leading-[1.65] text-white/50 max-w-[520px]">
              Pick a package, drop the details, and get print-and-social-ready designs. The more designs you book, the less each one costs.
            </p>

            {/* plan cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {PLAN_ORDER.map((key) => {
                const p = plans[key];
                const active = plan === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPlan(key)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      active
                        ? "border-lime-400 bg-lime-400/10 shadow-[0_0_30px_rgba(163,230,53,0.15)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25"
                    }`}
                  >
                    <p className="text-[12px] font-bold uppercase tracking-[0.16em] mb-2"
                      style={{ color: active ? "#a3e635" : "rgba(255,255,255,0.45)" }}>
                      {p.label}
                    </p>
                    <p className="text-[26px] font-semibold">
                      {p.priceNGN != null ? N(p.priceNGN) : "Custom quote"}
                    </p>
                    <p className="text-[12px] text-white/40 mt-1">
                      {p.priceNGN != null
                        ? `${N(p.perDesign)} per design`
                        : `from ${N(p.perDesign)} per design`}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-[13px] text-white/55">
                      <li>• {p.designs ? `${p.designs} design${p.designs > 1 ? "s" : ""}` : "6+ designs — anticipate, countdown, speakers, thank-you & more"}</li>
                      <li>• Print + social-ready exports</li>
                      <li>• {p.sourceFiles ? "Source files included" : "No source files"}</li>
                    </ul>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input ref={hpRef} type="text" name="_hp" tabIndex={-1} autoComplete="off"
                className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F label="Your name *"><input className={inputCls} value={form.name} maxLength={120} onChange={set("name")} placeholder="Full name" /></F>
                <F label="Email *"><input className={inputCls} type="email" value={form.email} maxLength={160} onChange={set("email")} placeholder="you@example.com" /></F>
                <F label="Phone / WhatsApp" optional><input className={inputCls} value={form.phone} maxLength={40} onChange={set("phone")} placeholder="+234…" /></F>
                <F label="Brand / organisation" optional><input className={inputCls} value={form.brand} maxLength={120} onChange={set("brand")} placeholder="Who is this for?" /></F>
              </div>

              <F label="What is the flyer for? *">
                <textarea className={`${inputCls} min-h-[90px] resize-y`} value={form.purpose} maxLength={1000} onChange={set("purpose")}
                  placeholder="e.g. church program announcement, product promo, birthday, webinar…" />
              </F>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F label="When do you need it?" optional><input className={inputCls} type="date" value={form.deadline} onChange={set("deadline")} /></F>
                <F label="Headline text" optional><input className={inputCls} value={form.headline} maxLength={300} onChange={set("headline")} placeholder="The big text on the flyer" /></F>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F label="Subtitle text" optional><input className={inputCls} value={form.subtitle} maxLength={300} onChange={set("subtitle")} placeholder="Supporting line" /></F>
                <F label="Date / time / venue" optional><input className={inputCls} value={form.eventDetails} maxLength={1000} onChange={set("eventDetails")} placeholder="If the flyer needs them" /></F>
              </div>

              <F label="Additional text" optional>
                <textarea className={`${inputCls} min-h-[90px] resize-y`} value={form.bodyText} maxLength={2000} onChange={set("bodyText")}
                  placeholder="Any other text that must appear — contact lines, prices, speakers, dress code…" />
              </F>

              {isEvent && (
                <F label="List the designs your event needs *">
                  <textarea className={`${inputCls} min-h-[110px] resize-y`} value={form.breakdown} maxLength={2000} onChange={set("breakdown")}
                    placeholder={"e.g. main event flyer (2 versions), anticipate design, countdown set, speaker lineup, individual speaker flyers, thank-you design…"} />
                </F>
              )}

              <F label="References / inspiration" optional>
                <textarea className={`${inputCls} min-h-[70px] resize-y`} value={form.references} maxLength={1000} onChange={set("references")}
                  placeholder="Links or descriptions of styles you like" />
              </F>

              {selected && (
                <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] text-white/55">
                  {selected.priceNGN != null
                    ? <>Selected: <span className="text-white font-semibold">{selected.label}</span> — <span className="text-lime-400 font-semibold">{N(selected.priceNGN)}</span>. Payment details arrive by email after you submit.</>
                    : <>Selected: <span className="text-white font-semibold">{selected.label}</span> — quoted per project from {N(selected.perDesign)}/design. I'll reach out within 24 hours with a full quote.</>}
                </p>
              )}

              {error && (
                <p className="rounded-xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 text-[13px] text-orange-300">{error}</p>
              )}

              <button type="submit" disabled={submitting}
                className="w-full rounded-xl bg-lime-400 py-3.5 text-[15px] font-semibold text-black transition hover:bg-lime-300 disabled:opacity-50">
                {submitting ? "Sending…" : "Submit request"}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookFlyer;
