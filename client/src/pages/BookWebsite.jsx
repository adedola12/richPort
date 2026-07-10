// src/pages/BookWebsite.jsx — website design & build booking
import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageMeta from "../components/common/PageMeta";
import GlowButton from "../components/common/GlowButton";
import { fetchJson } from "../api/http";

/* Display fallback for server/config/websitePlans.js — live values come
   from /api/website-requests/plans and the server recomputes on submit. */
const DEFAULT_PLANS = {
  starter: {
    label: "Starter", pages: "Up to 5 pages", priceNGN: 200000, from: false,
    timeline: "2–3 weeks",
    deliverables: ["Up to 5 custom-designed pages", "Mobile-first responsive build", "Contact form + WhatsApp link", "Basic on-page SEO", "2 revision rounds"],
  },
  business: {
    label: "Business", pages: "Up to 10 pages", priceNGN: 380000, from: false,
    timeline: "3–5 weeks",
    deliverables: ["Up to 10 custom-designed pages", "Everything in Starter", "Blog / CMS — edit your own content", "Analytics + SEO for every page", "3 revision rounds"],
  },
  premium: {
    label: "Premium", pages: "15+ pages / custom", priceNGN: 650000, from: true,
    timeline: "Scoped per project",
    deliverables: ["15+ pages or a custom web app", "Everything in Business", "Store, booking, payments, or member area", "Source files + handover docs", "Revisions until launch-ready"],
  },
};
const PLAN_ORDER = ["starter", "business", "premium"];
const N = (v) => `₦${Number(v).toLocaleString("en-NG")}`;

const PURPOSES = ["Showcase my business", "Sell products", "Get bookings / enquiries", "Portfolio", "Blog / publication", "Community / member area"];
const FEATURES = ["Blog / CMS", "Online store", "Booking / scheduling", "Payments", "Gallery", "Newsletter", "Member login", "Live chat / WhatsApp"];
const CONTENT_STATUS = ["Content is ready", "Partially ready", "I need help with content"];
const DOMAIN_STATUS = ["I have domain & hosting", "I have the domain only", "I need both"];

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

const Chips = ({ options, value, onChange, multi }) => {
  const isOn = (v) => (multi ? value.includes(v) : value === v);
  const toggle = (v) =>
    multi
      ? onChange(isOn(v) ? value.filter((x) => x !== v) : [...value, v])
      : onChange(isOn(v) ? "" : v);
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((v) => (
        <button key={v} type="button" onClick={() => toggle(v)}
          className={`rounded-[10px] border px-4 py-2 text-[13px] transition ${
            isOn(v)
              ? "border-lime-400 bg-lime-400/10 font-medium text-lime-300"
              : "border-white/10 bg-white/[0.03] font-light text-neutral-400 hover:border-lime-400/40"
          }`}>
          {v}
        </button>
      ))}
    </div>
  );
};

const BookWebsite = () => {
  const hpRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [plans, setPlans] = useState(DEFAULT_PLANS);
  const [plan, setPlan] = useState(() => {
    const p = (searchParams.get("plan") || "").toLowerCase();
    return DEFAULT_PLANS[p] ? p : "";
  });
  const [form, setForm] = useState({
    name: "", email: "", phone: "", brand: "", about: "", pages: "",
    references: "", duration: "", notes: "",
  });
  const [purpose, setPurpose] = useState([]);
  const [features, setFeatures] = useState([]);
  const [contentStatus, setContentStatus] = useState("");
  const [domainStatus, setDomainStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null); // { invoiceNo }

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJson("/api/website-requests/plans");
        if (data && data.starter) setPlans(data);
      } catch { /* keep defaults */ }
    })();
  }, []);

  /* Discount code / private offer (?offer=token) — server re-resolves on
     submit, so what's shown is what the invoice says. */
  const [discountCode, setDiscountCode] = useState("");
  const [discountInfo, setDiscountInfo] = useState(null);
  const [offer, setOffer] = useState(null);
  useEffect(() => {
    const token = searchParams.get("offer");
    if (!token) return;
    let on = true;
    fetchJson(`/api/discounts/offer/${token}`)
      .then((o) => {
        if (!on || !o?.ok) return;
        const item = (o.items || []).find((i) => i.service === "website" && !i.booked);
        if (!item) return;
        setOffer({ token, price: item.price, planKey: item.planKey, clientName: o.clientName || "" });
        setPlan(item.planKey);
      })
      .catch(() => {});
    return () => { on = false; };
  }, [searchParams]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const selected = plan ? plans[plan] : null;
  const effectivePrice = selected
    ? (offer && offer.planKey === plan ? offer.price : discountInfo?.ok ? discountInfo.finalPrice : selected.priceNGN)
    : 0;
  const applyCode = async () => {
    const code = discountCode.trim();
    if (!code || !selected) return;
    try {
      const r = await fetchJson(`/api/discounts/validate?code=${encodeURIComponent(code)}&service=website&price=${selected.priceNGN}`);
      setDiscountInfo(r);
    } catch {
      setDiscountInfo({ ok: false, error: "Couldn't check that code — try again." });
    }
  };
  // A validated discount is priced against ONE plan — switching plans voids it
  useEffect(() => { setDiscountInfo(null); }, [plan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!plan) return setError("Pick a package first.");
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError("Please enter a valid email.");
    if (!form.pages.trim()) return setError("List the pages your website needs — a rough list is fine.");

    setSubmitting(true);
    try {
      const res = await fetchJson("/api/website-requests", {
        method: "POST",
        body: JSON.stringify({
          plan,
          ...form,
          purpose: purpose.join(", "),
          features: features.join(", "),
          contentStatus,
          domainStatus,
          discount_code: !offer && discountInfo?.ok ? discountCode.trim() : "",
          offer_token: offer?.token || "",
          _hp: hpRef.current?.value || "",
        }),
      });
      setDone({ invoiceNo: res?.invoice_no || "" });
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    } catch {
      setError("Something went wrong — please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white px-4 pt-28 pb-24">
      <PageMeta
        title="Book a Website"
        description="Website design & build packages tiered by page count — from a 5-page business site to a full custom build."
        url="/book-website"
      />

      <div className="mx-auto max-w-[860px]">
        {done ? (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-lime-400/30 bg-[#0d0f12] px-8 py-14 text-center">
            <div className="mx-auto mb-6 flex h-[74px] w-[74px] items-center justify-center rounded-full border-2 border-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 stroke-lime-400">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">Booking received!</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-white/55 max-w-[460px] mx-auto">
              Check your email{done.invoiceNo ? <> — invoice <span className="text-lime-400 font-semibold">{done.invoiceNo}</span></> : ""} with your next steps, the terms, and a copy of your answers. The project starts once the deposit is confirmed.
            </p>
            <Link to="/" className="mt-8 inline-block rounded-xl bg-gradient-to-b from-lime-400 to-lime-600 px-6 py-3 text-[14px] font-bold text-black shadow-[0_0_18px_rgba(132,204,22,0.5)] transition hover:from-lime-300 hover:to-lime-500 hover:-translate-y-0.5 active:scale-95">
              Back to home →
            </Link>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-lime-400 mb-4">Website Design & Build</p>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-[-0.02em]">
              A website that <span className="text-lime-400">works as hard as you do.</span>
            </h1>
            <p className="mt-3 mb-10 text-[15px] leading-[1.65] text-white/50 max-w-[560px]">
              Packages are tiered by page count. Pick the size that fits, tell me about the site, and you'll get an invoice and terms by email — design starts once the deposit lands.
            </p>

            {/* plan cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {PLAN_ORDER.map((key) => {
                const p = plans[key];
                const active = plan === key;
                return (
                  <button key={key} type="button" onClick={() => setPlan(key)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      active
                        ? "border-lime-400 bg-lime-400/10 shadow-[0_0_30px_rgba(163,230,53,0.15)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25"
                    }`}>
                    <p className="text-[12px] font-bold uppercase tracking-[0.16em] mb-1"
                      style={{ color: active ? "#a3e635" : "rgba(255,255,255,0.45)" }}>
                      {p.label}
                    </p>
                    <p className="text-[12px] text-white/40 mb-2">{p.pages}</p>
                    <p className="text-[24px] font-semibold">{p.from ? "From " : ""}{N(p.priceNGN)}</p>
                    <p className="text-[11px] text-white/35 mt-0.5">{p.timeline}</p>
                    <ul className="mt-4 space-y-1.5 text-[12.5px] text-white/55">
                      {(p.deliverables || []).slice(0, 5).map((d) => <li key={d}>• {d}</li>)}
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
                <F label="Brand / organisation" optional><input className={inputCls} value={form.brand} maxLength={120} onChange={set("brand")} placeholder="Who is the site for?" /></F>
              </div>

              <F label="What does the business do?" optional>
                <textarea className={`${inputCls} min-h-[80px] resize-y`} value={form.about} maxLength={2000} onChange={set("about")}
                  placeholder="A few sentences about the business and what the site should achieve." />
              </F>

              <F label="What is the website for?" optional>
                <Chips options={PURPOSES} value={purpose} onChange={setPurpose} multi />
              </F>

              <F label="Which pages does the site need? *">
                <textarea className={`${inputCls} min-h-[90px] resize-y`} value={form.pages} maxLength={2000} onChange={set("pages")}
                  placeholder="e.g. Home, About, Services, Portfolio, Blog, Contact… a rough list is fine." />
              </F>

              <F label="Features you'll need" optional>
                <Chips options={FEATURES} value={features} onChange={setFeatures} multi />
              </F>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F label="Content readiness" optional>
                  <Chips options={CONTENT_STATUS} value={contentStatus} onChange={setContentStatus} />
                </F>
                <F label="Domain & hosting" optional>
                  <Chips options={DOMAIN_STATUS} value={domainStatus} onChange={setDomainStatus} />
                </F>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F label="Reference websites" optional>
                  <input className={inputCls} value={form.references} maxLength={1000} onChange={set("references")} placeholder="Links to sites you like" />
                </F>
                <F label="Preferred timeline" optional>
                  <input className={inputCls} value={form.duration} maxLength={120} onChange={set("duration")} placeholder="e.g. within a month" />
                </F>
              </div>

              <F label="Anything else?" optional>
                <textarea className={`${inputCls} min-h-[70px] resize-y`} value={form.notes} maxLength={2000} onChange={set("notes")}
                  placeholder="Anything that helps me understand the project better." />
              </F>

              {selected && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] text-white/55">
                  <p>
                    Selected: <span className="text-white font-semibold">{selected.label} — {selected.pages}</span> at{" "}
                    <span className="text-lime-400 font-semibold">{selected.from ? "from " : ""}{N(effectivePrice)}</span>
                    {effectivePrice !== selected.priceNGN && (
                      <span className="ml-1.5 text-xs text-white/35 line-through">{N(selected.priceNGN)}</span>
                    )}.
                    Your invoice (70% deposit) and terms arrive by email after you submit.
                  </p>
                  {offer ? (
                    <p className="mt-2 rounded-lg border border-lime-400/30 bg-lime-400/5 px-3 py-2 text-xs text-lime-300">
                      ✓ Private offer applied{offer.clientName ? ` for ${offer.clientName}` : ""} — your agreed price is {N(offer.price)}.
                    </p>
                  ) : (
                    <div className="mt-2.5 border-t border-dashed border-white/10 pt-2.5">
                      <div className="mb-1.5 text-xs text-white/45">Have a discount code?</div>
                      <div className="flex gap-2">
                        <input
                          value={discountCode}
                          onChange={(e) => { setDiscountCode(e.target.value.toUpperCase()); setDiscountInfo(null); }}
                          placeholder="e.g. GRACE10"
                          className="w-40 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs uppercase tracking-wide text-white outline-none focus:border-lime-400/60"
                        />
                        <button type="button" onClick={applyCode} disabled={!discountCode.trim()}
                          className="rounded-lg border border-lime-400/40 px-3.5 py-2 text-xs text-lime-400 hover:bg-lime-400/10 disabled:opacity-40">
                          Apply
                        </button>
                      </div>
                      {discountInfo?.ok && (
                        <p className="mt-2 text-xs text-lime-300">✓ {discountInfo.label} — you save {N(discountInfo.amount)}. New total: {N(discountInfo.finalPrice)}.</p>
                      )}
                      {discountInfo && !discountInfo.ok && (
                        <p className="mt-2 text-xs text-red-400">{discountInfo.error}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {error && (
                <p className="rounded-xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 text-[13px] text-orange-300">{error}</p>
              )}

              <GlowButton type="submit" disabled={submitting} className="w-full py-3.5 text-[15px]">
                {submitting ? "Sending…" : "Book this website"}
              </GlowButton>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookWebsite;
