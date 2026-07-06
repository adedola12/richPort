// src/pages/BookPlan.jsx — multi-step "Book a Plan" questionnaire
// Ported from book-a-plan.html (source of truth for content, flow and copy).
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageMeta from "../components/common/PageMeta";
import { fetchJson } from "../api/http";
import {
  OWNER, PLANS, DEPOSIT_PCT,
  initialFx, fetchLiveRate, planPrice, planUSD, planKeyFromName, pct, formatNGN as N,
} from "../config/plans";
import goldBadge from "../assets/Gold.png";
import silverBadge from "../assets/Silver.png";
import platinumBadge from "../assets/Platinum.png";

const BADGES = { silver: silverBadge, gold: goldBadge, platinum: platinumBadge };

const STORE_KEY = "requestionnaire_v2";

/* ---------------- field labels / review sections (verbatim from HTML) ---------------- */
const LABELS = {
  first_name: "First name", last_name: "Last name", email: "Email", phone: "Phone / WhatsApp",
  brand_name: "Brand / business name", business_about: "About the business", focus: "Business focus",
  service_areas: "Service areas", trust_signals: "Certifications / trust signals",
  peculiarity: "What makes the firm different", goals_short: "Short-term goals", goals_long: "Long-term goals",
  audience: "Target audience", values: "Brand values & mission", perception: "Desired perception",
  aesthetic: "Design aesthetic", colors: "Colour preferences", existing_logo: "Existing logo",
  inspiration: "Brands admired", avoid: "Things to avoid", competitors: "Competitors", tagline: "Tagline",
  name_story: "Idea behind the name", brand_vision: "Vision for the brand & logo", personality: "Brand personality",
  site_purpose: "Website purpose", site_actions: "Visitor actions", specialty_page: "Specialty page focus",
  content_status: "Content readiness", photos: "Project photos", site_refs: "Reference websites",
  features: "Website features", domain_1: "Domain — 1st choice", domain_2: "Domain — 2nd choice",
  domain_3: "Domain — 3rd choice", social_active: "Active social platforms",
  social_platforms: "Audience platforms", social_content: "Social designs should promote",
  social_tone: "Tone of voice", social_refs: "Admired accounts", duration: "Preferred project duration",
  comm: "Communication channels", updates: "Update frequency", approver: "Reviewer / approver",
  anything_else: "Anything else",
};

const SECTIONS = [
  ["About You & Your Business", "about", ["first_name", "last_name", "email", "phone", "brand_name", "business_about", "focus", "service_areas", "trust_signals", "peculiarity", "goals_short", "goals_long"]],
  ["Brand Identity", "brand", ["name_story", "audience", "values", "brand_vision", "perception", "personality", "aesthetic", "colors", "existing_logo", "inspiration", "avoid", "competitors", "tagline"]],
  ["Your Website", "website", ["site_purpose", "site_actions", "specialty_page", "content_status", "photos", "site_refs", "features", "domain_1", "domain_2", "domain_3"]],
  ["Social Media", "social", ["social_active", "social_platforms", "social_content", "social_tone", "social_refs"]],
  ["Working Together", "working", ["duration", "comm", "updates", "approver", "anything_else"]],
];

const MULTI_FIELDS = ["focus", "site_purpose", "features", "social_platforms", "comm"];

const STEP_NAMES = {
  plan: "Choose Your Plan", about: "About You & Your Business", brand: "Brand Identity",
  website: "Your Website", social: "Social Media", working: "Working Together", review: "Review & Submit",
};

/* ---------------- shared styles ---------------- */
const inputCls = (invalid) =>
  `w-full rounded-[10px] border bg-[#0c0e12] px-4 py-3 text-sm font-light text-white placeholder:text-zinc-500 outline-none transition-colors duration-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/15 ${
    invalid ? "border-orange-400" : "border-white/10"
  }`;
const cardCls = "rounded-2xl border border-white/10 bg-[#111318] px-5 py-8 sm:px-10";
const btnPrimary =
  "rounded-[10px] bg-gradient-to-b from-lime-500 to-lime-700 px-7 py-3 text-sm font-bold text-white shadow-[0_12px_40px_rgba(132,204,22,0.35)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-50";
const btnBack =
  "rounded-[10px] border border-white/15 bg-transparent px-7 py-3 text-sm font-semibold text-neutral-400 transition hover:border-lime-400/40 hover:text-white";
const btnGhost =
  "rounded-[10px] border border-lime-400/40 bg-transparent px-7 py-3 text-sm font-semibold text-lime-400 transition hover:bg-lime-400/10";

/* ---------------- small render helpers ---------------- */
const Label = ({ text, required, hint }) => (
  <label className="mb-2 block text-sm font-medium text-white">
    {text} {required && <span className="text-lime-400">*</span>}
    {hint && <span className="mt-1 block text-xs font-light leading-relaxed text-zinc-500">{hint}</span>}
  </label>
);

const fmt = (v) => (Array.isArray(v) ? v.join(", ") : v || "");

/* Field primitives live at module level so their identity is stable across
   renders — defining them inside the page component would remount the DOM
   nodes on every keystroke and drop input focus. */
const Field = ({ children }) => <div className="mb-6">{children}</div>;

const SectionHead = ({ no, title, sub }) => (
  <>
    <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{no}</div>
    <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
    {sub && <p className="mb-7 mt-2 text-sm font-light leading-relaxed text-neutral-400">{sub}</p>}
  </>
);

const Input = ({ name, type = "text", placeholder, answers, setField, invalid }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={answers[name] ?? ""}
    onChange={(e) => setField(name, e.target.value)}
    className={inputCls(invalid.includes(name))}
  />
);

const Area = ({ name, placeholder, answers, setField, invalid }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    value={answers[name] ?? ""}
    onChange={(e) => setField(name, e.target.value)}
    className={`${inputCls(invalid.includes(name))} min-h-24 resize-y leading-relaxed`}
  />
);

const Chips = ({ name, options, multi, answers, setField, toggleMulti }) => {
  const cur = answers[name];
  const isOn = (v) => (multi ? Array.isArray(cur) && cur.includes(v) : cur === v);
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => (multi ? toggleMulti(name, v) : setField(name, v))}
          className={`rounded-[10px] border px-4 py-2 text-[13px] transition-all duration-150 ${
            isOn(v)
              ? "border-lime-400 bg-lime-400/10 font-medium text-lime-300"
              : "border-white/10 bg-[#0c0e12] font-light text-neutral-400 hover:border-lime-400/40"
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
};

const BookPlan = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(() => {
    const p = (searchParams.get("plan") || "").toLowerCase();
    return PLANS[p] ? p : "";
  });
  const [answers, setAnswers] = useState({});
  const [fx, setFx] = useState(initialFx);
  const [stepIdx, setStepIdx] = useState(0);
  const [invalid, setInvalid] = useState([]); // field names / "plan"
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { ok, invoiceNo, mode }
  const hpRef = useRef(null); // honeypot
  const restored = useRef(false);

  const plan = selectedPlan ? PLANS[selectedPlan] : null;
  const hasWeb = plan ? plan.website : true;

  const flow = useMemo(
    () => ["plan", "about", "brand", "website", "social", "working", "review"].filter((s) => s !== "website" || hasWeb),
    [hasWeb]
  );
  const step = flow[Math.min(stepIdx, flow.length - 1)];

  /* ---------------- restore draft ---------------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const savedDraft = JSON.parse(raw);
      if (savedDraft.plan && PLANS[savedDraft.plan] && !selectedPlan) setSelectedPlan(savedDraft.plan);
      const data = {};
      for (const [k, v] of Object.entries(savedDraft.data || {})) {
        if (k === "_meta" || !(k in LABELS)) continue;
        data[k] = MULTI_FIELDS.includes(k) ? (Array.isArray(v) ? v : v ? [v] : []) : Array.isArray(v) ? v[0] : v;
      }
      setAnswers(data);
    } catch {
      /* corrupt draft — start fresh */
    } finally {
      restored.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- autosave ---------------- */
  useEffect(() => {
    if (!restored.current) return;
    localStorage.setItem(STORE_KEY, JSON.stringify({ plan: selectedPlan, data: answers }));
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1400);
    return () => clearTimeout(t);
  }, [answers, selectedPlan]);

  /* ---------------- live FX rate (skipped while RATE_OVERRIDE is pinned) ---------------- */
  useEffect(() => {
    let on = true;
    fetchLiveRate().then((r) => on && r && setFx(r));
    return () => { on = false; };
  }, []);

  /* ---------------- admin-set pricing from the rate card ----------------
     Prices maintained in the admin panel (RateCategory "brand-identity")
     override the hardcoded config; config stays as the offline fallback.
     The server does the same lookup on submit, so displayed == charged. */
  const [dbPrices, setDbPrices] = useState(null);
  useEffect(() => {
    let on = true;
    fetchJson("/api/rates/category/brand-identity")
      .then((cat) => {
        if (!on || !Array.isArray(cat?.plans) || cat.plans.length === 0) return;
        const map = {};
        cat.plans.forEach((p) => {
          const k = planKeyFromName(p.name);
          if (k && Number(p.price) > 0) map[k] = { price: Number(p.price), currency: p.currency || "USD" };
        });
        if (Object.keys(map).length) setDbPrices(map);
      })
      .catch(() => {});
    return () => { on = false; };
  }, []);

  const usdOf = (key) => {
    const d = dbPrices?.[key];
    if (d) return d.currency === "USD" ? d.price : Math.round(d.price / fx.rate);
    return planUSD(key);
  };
  const ngnOf = (key) => {
    const d = dbPrices?.[key];
    if (d && d.currency !== "USD") return d.price;
    if (d) return Math.round((d.price * fx.rate) / 1000) * 1000;
    return planPrice(key, fx.rate);
  };

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [stepIdx]);

  /* ---------------- state helpers ---------------- */
  const setField = (name, value) => setAnswers((a) => ({ ...a, [name]: value }));
  const toggleMulti = (name, value) =>
    setAnswers((a) => {
      const cur = Array.isArray(a[name]) ? a[name] : [];
      return { ...a, [name]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });

  const flash = (names) => {
    setInvalid(names);
    setTimeout(() => setInvalid([]), 1800);
  };

  const validateStep = () => {
    if (step === "plan" && !selectedPlan) {
      flash(["plan"]);
      return false;
    }
    if (step === "about") {
      const missing = ["email", "phone", "brand_name"].filter((n) => !String(answers[n] || "").trim());
      if (missing.length) {
        flash(missing);
        document.querySelector(`[name="${missing[0]}"]`)?.focus();
        return false;
      }
    }
    return true;
  };

  const goToStep = (key) => {
    const idx = flow.indexOf(key);
    if (idx > -1) setStepIdx(idx);
  };

  /* ---------------- payload ---------------- */
  const collectResponses = () => {
    const price = plan ? ngnOf(selectedPlan) : 0;
    const data = {
      _meta: {
        plan_key: selectedPlan,
        plan: plan ? plan.label : "",
        price,
        price_usd: plan ? usdOf(selectedPlan) : 0,
        fx_rate: fx.rate,
        fx_source: fx.source,
        deposit: plan ? pct(price, DEPOSIT_PCT) : 0,
        balance: plan ? price - pct(price, DEPOSIT_PCT) : 0,
        submitted_at: new Date().toISOString(),
      },
    };
    Object.keys(LABELS).forEach((k) => {
      const v = answers[k];
      data[k] = Array.isArray(v) ? v.filter((x) => String(x).trim() !== "") : String(v ?? "").trim();
    });
    return data;
  };

  /* ---------------- submit ---------------- */
  const handleSubmit = async () => {
    setSubmitting(true);
    const data = collectResponses();
    try {
      const res = await fetchJson("/api/questionnaire", {
        method: "POST",
        body: JSON.stringify({ ...data, _hp: hpRef.current?.value || "" }),
      });
      setResult({ ok: true, invoiceNo: res?.invoice_no || "", emailsSent: res?.emails_sent !== false });
      localStorage.removeItem(STORE_KEY); // clear draft only on success
    } catch {
      setResult({ ok: false });
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (!validateStep()) return;
    if (stepIdx < flow.length - 1) setStepIdx(stepIdx + 1);
    else handleSubmit();
  };

  /* ---------------- download (fallback path) ---------------- */
  const downloadResponses = (kind) => {
    const data = collectResponses();
    const brand = (data.brand_name || "brand").replace(/[^a-z0-9]+/gi, "-");
    let blob, fname;
    if (kind === "json") {
      blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      fname = `questionnaire-${brand}.json`;
    } else {
      let txt = `BRAND QUESTIONNAIRE — ${data._meta.plan} Package (${N(data._meta.price)})\nSubmitted: ${new Date().toLocaleString()}\n${"=".repeat(56)}\n\n`;
      for (const [title, key, fields] of SECTIONS) {
        if (key === "website" && !hasWeb) continue;
        txt += `${title.toUpperCase()}\n${"-".repeat(title.length)}\n`;
        for (const f of fields) txt += `${LABELS[f]}:\n  ${fmt(data[f]) || "—"}\n\n`;
        txt += "\n";
      }
      blob = new Blob([txt], { type: "text/plain" });
      fname = `questionnaire-${brand}.txt`;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fname;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  /* ---------------- section numbering (website skip renumbers) ---------------- */
  const secNo = (key) => {
    const order = ["plan", "about", "brand", "website", "social", "working"].filter((s) => s !== "website" || hasWeb);
    return `Section ${String(order.indexOf(key) + 1).padStart(2, "0")}`;
  };

  // props threaded into the module-level field primitives
  const bind = { answers, setField, invalid };
  const cbind = { answers, setField, toggleMulti };

  /* ---------------- review rows ---------------- */
  const data = collectResponses();

  /* ================================================================ */
  return (
    <div className="min-h-screen bg-black text-white">
      <PageMeta
        title="Book a Plan"
        description="Book a brand identity or website design package with Richard Enoch — choose your plan and tell me about your brand."
        url="/book"
      />

      <div className="mx-auto max-w-[880px] px-5 pb-20 pt-28 sm:px-6 sm:pt-32">
        {/* ---------- header ---------- */}
        <div className="mb-9 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-lime-400">Book a Plan</p>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-4xl">
            Book a plan &amp; tell me about <span className="text-lime-400">your brand</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[580px] text-sm font-light leading-relaxed text-neutral-400">
            Choose the package that fits, then answer a short questionnaire so the brand and website we create truly
            fit your business. Every answer is optional except your contact details.
          </p>
          {plan && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-[10px] border border-lime-400/40 bg-lime-400/10 px-4 py-1.5 text-[13px] font-semibold text-lime-400">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.9)]" />
              {plan.label} Package — {N(ngnOf(selectedPlan))}
            </div>
          )}
        </div>

        {/* ---------- sticky progress ---------- */}
        <div className="sticky top-0 z-50 mb-2 bg-gradient-to-b from-black from-75% to-transparent pb-5 pt-4">
          <div className="flex gap-1.5">
            {flow.map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i < stepIdx ? "bg-lime-400" : i === stepIdx ? "bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]" : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-neutral-400">
            <span>
              Step <b className="font-semibold text-lime-400">{stepIdx + 1}</b> of{" "}
              <b className="font-semibold text-lime-400">{flow.length}</b> — {STEP_NAMES[step]}
            </span>
            <span className="text-[11px] text-zinc-600">
              Progress saves automatically{" "}
              <span className={`text-lime-400 transition-opacity duration-300 ${saved ? "opacity-100" : "opacity-0"}`}>✓ saved</span>
            </span>
          </div>
        </div>

        {/* honeypot — humans never see or fill this */}
        <input ref={hpRef} type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        {/* ================= STEP: PLAN ================= */}
        {step === "plan" && (
          <div className={cardCls + (invalid.includes("plan") ? " outline outline-1 outline-orange-400" : "")}>
            <SectionHead no="Section 01" title="Choose your plan" sub="Each plan is a complete package — pick the one that fits where your brand is right now." />
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(PLANS).map(([key, p]) => {
                const sel = selectedPlan === key;
                const price = ngnOf(key);
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={`flex flex-col rounded-2xl border p-5 text-left transition-all duration-200 ${
                      sel
                        ? "border-lime-400 bg-lime-400/10 shadow-[0_0_26px_rgba(163,230,53,0.12)]"
                        : "border-white/10 bg-[#0c0e12] hover:-translate-y-0.5 hover:border-lime-400/40"
                    }`}
                  >
                    <img src={BADGES[key]} alt={`${p.label} plan badge`} className="h-16 w-auto self-start object-contain" />
                    <div className="mt-3 text-lg font-bold">{p.label}</div>
                    <div className="mt-1 min-h-9 text-xs font-light leading-snug text-neutral-400">{p.blurb}</div>
                    <div className="mt-3 text-2xl font-extrabold text-lime-400">
                      <small className="mr-1 align-top text-[11px] font-semibold text-neutral-400">NGN</small>
                      {price.toLocaleString()}
                    </div>
                    <div className="mt-0.5 text-[11px] text-zinc-500">
                      {DEPOSIT_PCT}% deposit: {N(pct(price, DEPOSIT_PCT))} • ${usdOf(key)}
                    </div>
                    <ul className="mt-3.5 border-t border-white/10 pt-3">
                      {p.deliverables.slice(0, 6).map((d) => (
                        <li key={d} className="relative py-0.5 pl-4 text-xs font-light text-neutral-400">
                          <span className="absolute left-0 text-[10px] text-lime-400">✓</span>
                          {d}
                        </li>
                      ))}
                      {p.deliverables.length > 6 && (
                        <li className="relative py-0.5 pl-4 text-xs font-light text-neutral-400">
                          <span className="absolute left-0 text-[10px] text-lime-400">✓</span>+ {p.deliverables.length - 6} more…
                        </li>
                      )}
                    </ul>
                    <div
                      className={`mt-4 rounded-[10px] border py-2 text-center text-[13px] font-semibold transition ${
                        sel ? "border-lime-400 bg-lime-400 text-black" : "border-lime-400/40 text-lime-400"
                      }`}
                    >
                      Select {p.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP: ABOUT ================= */}
        {step === "about" && (
          <div className={cardCls}>
            <SectionHead no={secNo("about")} title="About You & Your Business" sub="The basics — who you are and what your business does." />
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Field><Label text="First name" /><Input {...bind} name="first_name" /></Field>
              <Field><Label text="Last name" /><Input {...bind} name="last_name" /></Field>
            </div>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Field><Label text="Email" required /><Input {...bind} name="email" type="email" placeholder="you@example.com" /></Field>
              <Field><Label text="Phone / WhatsApp" required /><Input {...bind} name="phone" type="tel" placeholder="0800 000 0000" /></Field>
            </div>
            <Field><Label text="Name of your brand / business" required /><Input {...bind} name="brand_name" placeholder="The name your customers will know you by" /></Field>
            <Field><Label text="Tell me about your business and what it offers" hint="What services do you provide, and how? The more detail, the better." /><Area {...bind} name="business_about" /></Field>
            <Field>
              <Label text="What does your business focus on?" hint="Select all that apply." />
              <Chips {...cbind} name="focus" multi options={["Residential", "Commercial / Offices", "Industrial", "Post-construction", "Deep / Specialized", "Other"]} />
            </Field>
            <Field><Label text="Which areas / locations do you serve?" /><Input {...bind} name="service_areas" placeholder="e.g. Okota, Lekki, V.I. — or nationwide" /></Field>
            <Field><Label text="Certifications, training or insurance" hint="Anything that builds customer trust — business registration, trained staff, insurance cover." /><Area {...bind} name="trust_signals" /></Field>
            <Field><Label text="What makes your firm different from every other company in your industry?" hint="Your method, your guarantee, your story, your standards — this can power a dedicated page on your website." /><Area {...bind} name="peculiarity" /></Field>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Field><Label text="Short-term business goals" /><Area {...bind} name="goals_short" placeholder="Next 6–12 months" /></Field>
              <Field><Label text="Long-term business goals" /><Area {...bind} name="goals_long" placeholder="The big picture" /></Field>
            </div>
          </div>
        )}

        {/* ================= STEP: BRAND ================= */}
        {step === "brand" && (
          <div className={cardCls}>
            <SectionHead no={secNo("brand")} title="Brand Identity" sub="How your brand should look, feel and be perceived." />
            <Field><Label text="What's the idea behind your brand's name?" hint="The story, meaning, or inspiration behind the name — where it came from and what it stands for." /><Area {...bind} name="name_story" /></Field>
            <Field><Label text="Who is your ideal target audience?" hint="Be specific — e.g. busy professionals, estate residents, offices, property managers." /><Area {...bind} name="audience" /></Field>
            <Field><Label text="What are your brand values and mission?" /><Area {...bind} name="values" /></Field>
            <Field><Label text="Is there a vision you want the brand to paint?" hint="Describe the picture you see when you imagine the finished brand and logo — scenes, feelings, imagery, symbols." /><Area {...bind} name="brand_vision" /></Field>
            <Field><Label text="How do you want customers to perceive your brand?" hint="e.g. trustworthy, premium, friendly, professional." /><Input {...bind} name="perception" placeholder="3–5 words that should come to mind" /></Field>
            <Field><Label text="If your brand were a person, how would you describe them?" hint="3–5 adjectives — e.g. confident, warm, meticulous, playful." /><Input {...bind} name="personality" /></Field>
            <Field><Label text="Describe your desired design aesthetic" hint="e.g. clean and minimal, bold and modern, premium and elegant." /><Input {...bind} name="aesthetic" /></Field>
            <Field><Label text="Any colour preferences?" hint="Colours you love, colours to avoid, and why." /><Input {...bind} name="colors" /></Field>
            <Field>
              <Label text="Do you have an existing logo or visual identity?" />
              <Chips {...cbind} name="existing_logo" options={["No — starting from scratch", "Yes — wants a revamp", "Yes — open to fresh direction"]} />
            </Field>
            <Field><Label text="Brands or designs you admire" hint="Any industry. Names or links, and what you like about them." /><Area {...bind} name="inspiration" /></Field>
            <Field><Label text="Anything you definitely don't want in your design?" /><Input {...bind} name="avoid" /></Field>
            <Field><Label text="Who are your key competitors?" /><Input {...bind} name="competitors" /></Field>
            <Field><Label text="Do you have a slogan or tagline?" hint="If not, I can help craft one." /><Input {...bind} name="tagline" /></Field>
          </div>
        )}

        {/* ================= STEP: WEBSITE ================= */}
        {step === "website" && (
          <div className={cardCls}>
            <SectionHead
              no={secNo("website")}
              title="Your Website"
              sub={
                selectedPlan === "gold" ? (
                  <>Your package includes a 5-page website: <b className="font-medium text-lime-400">Landing page, About Us, Contact, Portfolio / Previous Projects,</b> and a <b className="font-medium text-lime-400">dedicated specialty page</b> built around what makes your firm unique.</>
                ) : (
                  "Your package includes a professional website with pages scoped to your needs."
                )
              }
            />
            <Field>
              <Label text="What is the primary purpose of your website?" />
              <Chips {...cbind} name="site_purpose" multi options={["Attract new clients", "Showcase services", "Build credibility", "Generate quote requests", "Other"]} />
            </Field>
            <Field><Label text="What actions should visitors take on the site?" /><Input {...bind} name="site_actions" placeholder="e.g. request a quote, call, book a service" /></Field>
            <Field><Label text="The specialty page — what should it showcase?" hint="Building on what makes your firm different: your process, standards, a signature service, your guarantee." /><Area {...bind} name="specialty_page" /></Field>
            <Field>
              <Label text="Do you have website content ready?" hint="Text about your business, service descriptions, team info." />
              <Chips {...cbind} name="content_status" options={["Finalized and ready", "Have some — needs revision", "Needs to be created"]} />
            </Field>
            <Field>
              <Label text="Do you have photos of past projects?" hint="Before/after shots, your team at work — these power the portfolio page." />
              <Chips {...cbind} name="photos" options={["Yes — plenty", "A few", "None yet"]} />
            </Field>
            <Field><Label text="Websites you like" hint="Any industry — links and what you like about them." /><Area {...bind} name="site_refs" /></Field>
            <Field>
              <Label text="Features you'd like on the site" />
              <Chips {...cbind} name="features" multi options={["Contact form", "Quote request form", "WhatsApp chat button", "Image gallery", "Testimonials", "Social media links"]} />
            </Field>
            <Field>
              <Label text="Preferred domain names — in order of preference" hint="e.g. yourbrand.com / yourbrand.ng — I'll check availability and advise." />
              <div className="grid gap-3 sm:grid-cols-3">
                <Input {...bind} name="domain_1" placeholder="1st choice" />
                <Input {...bind} name="domain_2" placeholder="2nd choice" />
                <Input {...bind} name="domain_3" placeholder="3rd choice" />
              </div>
            </Field>
            <div className="rounded-[10px] border border-lime-400/40 bg-lime-400/10 px-4 py-3.5 text-[13px] font-light leading-relaxed">
              <b className="font-semibold text-lime-400">Please note:</b> website hosting and domain name are billed separately and paid by you directly to the providers — all accounts are created with your own credentials, so you fully own them. I handle the setup, design and development.
            </div>
          </div>
        )}

        {/* ================= STEP: SOCIAL ================= */}
        {step === "social" && (
          <div className={cardCls}>
            <SectionHead no={secNo("social")} title="Social Media" sub="Your package includes social media designs — let's make sure they hit the right note." />
            <Field><Label text="Which platforms are you currently active on?" hint="Share handles or links if available." /><Input {...bind} name="social_active" /></Field>
            <Field>
              <Label text="Which platforms does your audience use the most?" />
              <Chips {...cbind} name="social_platforms" multi options={["Instagram", "Facebook", "WhatsApp", "LinkedIn", "TikTok", "X (Twitter)"]} />
            </Field>
            <Field><Label text="What should the social media designs promote or announce?" /><Input {...bind} name="social_content" /></Field>
            <Field><Label text="Preferred tone of voice" hint="e.g. professional, friendly, premium, playful." /><Input {...bind} name="social_tone" /></Field>
            <Field><Label text="Any social media accounts you admire?" /><Input {...bind} name="social_refs" /></Field>
          </div>
        )}

        {/* ================= STEP: WORKING ================= */}
        {step === "working" && (
          <div className={cardCls}>
            <SectionHead no={secNo("working")} title="Working Together" sub="How you'd like the project to run, day to day." />
            <Field>
              <Label text="How long would you like the project to take?" hint="Your preference — the final timeline is confirmed with you after I review your answers and scope." />
              <Chips {...cbind} name="duration" options={["2 weeks", "3 weeks", "4 weeks", "Flexible — advise me"]} />
            </Field>
            <Field>
              <Label text="Preferred communication channels" />
              <Chips {...cbind} name="comm" multi options={["WhatsApp", "Phone calls", "Email", "Video calls"]} />
            </Field>
            <Field>
              <Label text="How often would you like progress updates?" />
              <Chips {...cbind} name="updates" options={["Daily", "Every 2–3 days", "At each milestone"]} />
            </Field>
            <Field><Label text="Who will review work and give approvals on your end?" /><Input {...bind} name="approver" placeholder="e.g. Myself" /></Field>
            <Field><Label text="Anything else I should know before we begin?" /><Area {...bind} name="anything_else" /></Field>
          </div>
        )}

        {/* ================= STEP: REVIEW ================= */}
        {step === "review" && (
          <div className={cardCls}>
            <SectionHead
              no="Final step"
              title="Review your answers"
              sub="Have a quick look through — you can jump back to edit any section. When you submit, you'll receive a copy of your responses with your invoice and terms by email."
            />
            <div className="mb-4 overflow-hidden rounded-xl border border-white/10">
              <h3 className="flex justify-between bg-[#0c0e12] px-5 py-3.5 text-sm font-semibold text-lime-400">
                Selected Plan
                <button type="button" onClick={() => goToStep("plan")} className="text-xs font-normal text-neutral-400 hover:text-lime-400">Edit ✎</button>
              </h3>
              <div className="px-5 py-3 text-[13px]">
                <div className="flex gap-3.5 py-2">
                  <div className="w-[42%] shrink-0 font-light text-neutral-400">Package</div>
                  <div>
                    {data._meta.plan} — {N(data._meta.price)} ({DEPOSIT_PCT}% deposit: <span className="text-[#c7b6ff]">{N(data._meta.deposit)}</span>)
                  </div>
                </div>
              </div>
            </div>
            {SECTIONS.filter(([, key]) => key !== "website" || hasWeb).map(([title, key, fields]) => (
              <div key={key} className="mb-4 overflow-hidden rounded-xl border border-white/10">
                <h3 className="flex justify-between bg-[#0c0e12] px-5 py-3.5 text-sm font-semibold text-lime-400">
                  {title}
                  <button type="button" onClick={() => goToStep(key)} className="text-xs font-normal text-neutral-400 hover:text-lime-400">Edit ✎</button>
                </h3>
                <div className="px-5 pb-3.5 pt-1.5">
                  {fields.map((f) => {
                    const val = fmt(data[f]);
                    return (
                      <div key={f} className="flex gap-3.5 border-b border-dashed border-white/10 py-2 text-[13px] last:border-b-0">
                        <div className="w-[42%] shrink-0 font-light text-neutral-400">{LABELS[f]}</div>
                        <div className={`whitespace-pre-wrap break-words ${val ? "" : "italic text-zinc-600"}`}>{val || "Not answered"}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---------- nav ---------- */}
        <div className="mt-7 flex items-center justify-between">
          <button type="button" onClick={() => stepIdx > 0 && setStepIdx(stepIdx - 1)} className={btnBack} style={{ visibility: stepIdx === 0 ? "hidden" : "visible" }}>
            ← Back
          </button>
          <button type="button" onClick={next} disabled={submitting} className={btnPrimary}>
            {submitting ? "Sending…" : stepIdx === flow.length - 1 ? "Submit ✓" : "Continue →"}
          </button>
        </div>

        <div className="mt-10 text-center text-xs text-zinc-600">
          <a href="https://rich-port.vercel.app" className="text-neutral-400 hover:text-lime-400">rich-port.vercel.app</a>
          &nbsp;•&nbsp; {OWNER.email} &nbsp;•&nbsp; Designed &amp; built by Richard Enoch
        </div>
      </div>

      {/* ================= SUCCESS OVERLAY ================= */}
      {result && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/90 p-6 backdrop-blur-md"
          onClick={() => navigate("/")}
        >
          <div
            className="m-auto w-full max-w-[580px] rounded-2xl border border-lime-400/40 bg-[#111318] px-7 py-10 text-center sm:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedPlan && <img src={BADGES[selectedPlan]} alt={`${plan?.label} plan badge`} className="mx-auto mb-4 h-20 w-auto object-contain" />}
            <div className="mx-auto mb-5 flex h-[74px] w-[74px] items-center justify-center rounded-full border-2 border-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 stroke-lime-400">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Thank you{data.first_name ? `, ${data.first_name}` : ""}!</h2>
            <p className="mt-2 text-sm font-light leading-relaxed text-neutral-400">
              {result.ok
                ? "Your responses have been received — check your email for a copy of your responses, your invoice and the terms of agreement."
                : "Your responses have been captured. Download a copy below and send it to me — then we're ready to begin."}
            </p>
            {result.ok && result.invoiceNo && (
              <p className="mt-2 text-sm text-neutral-400">
                Invoice no: <b className="font-semibold text-[#c7b6ff]">{result.invoiceNo}</b>
              </p>
            )}
            <div className="my-6 rounded-xl border border-white/10 px-5 py-4 text-left">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-lime-400">Next steps</h4>
              <ol className="ml-4 list-decimal space-y-2 text-[13px] font-light leading-relaxed">
                {result.ok ? (
                  <>
                    <li>Check your inbox (<b className="font-semibold text-lime-400">{data.email}</b>) for your <b className="font-semibold text-lime-400">invoice and terms</b>. Check spam/promotions if you don't see it.</li>
                    <li>Make the <b className="font-semibold text-lime-400">{DEPOSIT_PCT}% deposit of {N(data._meta.deposit)}</b> using the payment details on the invoice.</li>
                    <li>Send your <b className="font-semibold text-lime-400">proof of payment</b> to WhatsApp <b className="font-semibold text-lime-400">{OWNER.whatsapp}</b>.</li>
                    <li>Once acknowledged, your project begins and I'll confirm the timeline with you.</li>
                  </>
                ) : (
                  <>
                    <li><b className="font-semibold text-lime-400">Download your responses</b> below and send the file to <b className="font-semibold text-lime-400">{OWNER.email}</b> or WhatsApp <b className="font-semibold text-lime-400">{OWNER.whatsapp}</b>.</li>
                    <li>You'll receive your <b className="font-semibold text-lime-400">invoice and terms of agreement</b> by email.</li>
                    <li>Make the <b className="font-semibold text-lime-400">{DEPOSIT_PCT}% deposit of {N(data._meta.deposit)}</b> and send your <b className="font-semibold text-lime-400">proof of payment</b> to WhatsApp <b className="font-semibold text-lime-400">{OWNER.whatsapp}</b>.</li>
                    <li>Once acknowledged, your project begins.</li>
                  </>
                )}
              </ol>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => navigate("/")} className={btnPrimary}>Back to home →</button>
              <button type="button" onClick={() => downloadResponses("txt")} className={btnGhost}>Download responses (.txt)</button>
              <button type="button" onClick={() => downloadResponses("json")} className={btnGhost}>Download .json</button>
            </div>
            <div className={`mt-3.5 text-xs ${result.ok ? "text-lime-400" : "text-orange-300"}`}>
              {result.ok ? "✓ Submission received" : "Submission hit a snag — please use the download button so nothing is lost."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPlan;
