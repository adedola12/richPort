// src/components/Rate/BrandIdentity.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PlanSelection from "./PlanSelection";
import PlanDetails from "./PlanDetails";
import { Button } from "../ui";


// Temporary design overrides — remove once admin is updated to match
const DESCRIPTION_OVERRIDES = {
  "Brand Identity Designs": "Your brand is the first impression. Let's make it the right one.",
  "Websites Designs": "A website that works as hard as you do — built to convert, crafted to impress.",
  "Product UI/UX Designs": "Interfaces that feel intuitive from the first tap — designed around your users, not assumptions.",
  "Graphic Designs": "Visual assets that stop the scroll and communicate your message without a single word.",
  "Publication Design": "Layouts that make your content impossible to put down — from reports to editorial spreads.",
  "Presentation Design": "Slides that do the talking for you — clear, compelling, and impossible to ignore.",
};

const FALLBACK_CATEGORIES = [
  { id: "brand-identity",       label: "Brand Identity Designs",   altLabels: ["Brand Identity"],         heading: "Brand Identity Designs",   description: "", plans: [], deliverables: [] },
  { id: "websites",             label: "Websites Designs",          altLabels: ["Website Designs"],        heading: "Websites Designs",          description: "", plans: [], deliverables: [] },
  { id: "ui-ux",                label: "Product UI/UX Designs",     altLabels: ["Product UI/UX"],          heading: "Product UI/UX Designs",     description: "", plans: [], deliverables: [] },
  { id: "graphic-design",       label: "Graphic Designs",           altLabels: ["Graphic Design"],         heading: "Graphic Designs",           description: "", plans: [], deliverables: [] },
  { id: "publication-design",   label: "Publication Design",        altLabels: [],                         heading: "Publication Design",        description: "", plans: [], deliverables: [] },
  { id: "presentation-design",  label: "Presentation Design",       altLabels: [],                         heading: "Presentation Design",       description: "", plans: [], deliverables: [] },
];

/* ── Flyer packages — shown under the Graphic Designs tab ──
   Graphic design bookings are flyer/social designs, priced in NGN via
   /api/flyer-requests/plans (server-owned), not the RateCategory plans. */
const FLYER_FALLBACK = {
  single: { label: "Single Design", designs: 1, priceNGN: 15000, perDesign: 15000, sourceFiles: false },
  triple: { label: "3-Design Pack", designs: 3, priceNGN: 39000, perDesign: 13000, sourceFiles: false },
  five:   { label: "5-Design Pack", designs: 5, priceNGN: 55000, perDesign: 11000, sourceFiles: true },
  event:  { label: "Event Campaign (6+ designs)", designs: null, priceNGN: null, perDesign: 9000, sourceFiles: true },
};
const FLYER_ORDER = ["single", "triple", "five", "event"];
const NGN = (v) => `₦${Number(v).toLocaleString("en-NG")}`;

/* Delivery timelines — resolved client-side so they always display even when
   the server plan payload omits a timeline. These take priority over any
   server-provided value. */
const FLYER_DURATION = { single: "2 days", triple: "8 days", five: "15 days", event: "Scoped" };
const WEBSITE_DURATION = { starter: "7 days", business: "14 days", premium: "21 days" };

const FlyerPlans = () => {
  const navigate = useNavigate();
  const [plans] = useState(FLYER_FALLBACK);

  /* Plans ship with the build — edit FLYER_FALLBACK above. */

  return (
    <div className="mt-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FLYER_ORDER.map((key) => {
          const p = plans[key];
          const featured = key === "five";
          return (
            <div
              key={key}
              className={`flex flex-col rounded-[24px] border p-6 ${
                featured
                  ? "border-lime-500/70 bg-[radial-gradient(circle_at_top,_rgba(132,204,22,0.22),transparent_55%),_#050505] shadow-[0_0_40px_rgba(132,204,22,0.18)]"
                  : "border-lime-500/25 bg-[#0b0b0e]"
              }`}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400 mb-3">{p.label}</p>
              <p className="text-3xl font-extrabold text-white">
                {p.priceNGN != null ? NGN(p.priceNGN) : "Custom"}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                {p.priceNGN != null ? `${NGN(p.perDesign)} per design` : `from ${NGN(p.perDesign)} per design`}
              </p>
              <p className="mt-1 text-xs font-medium text-lime-300/85">
                <span className="text-neutral-500">Delivery</span> · {FLYER_DURATION[key]}
              </p>
              <ul className="mt-5 mb-6 space-y-1.5 text-[13px] text-neutral-300 flex-1">
                <li>• {p.designs ? `${p.designs} flyer / social design${p.designs > 1 ? "s" : ""}` : "6+ designs — full event set"}</li>
                <li>• Print + social-ready exports</li>
                <li>• {p.sourceFiles ? "Source files included" : "No source files"}</li>
              </ul>
              <Button
                type="button"
                onClick={() => navigate(`/book-flyer?plan=${key}`)}
                variant="primary"
                size="md"
                className="w-full"
              >
                {p.priceNGN != null ? "Book this pack" : "Request a quote"}
              </Button>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-center text-xs text-neutral-500">
        The more designs you book, the less each one costs. Event campaigns cover anticipate, countdown, speaker, and thank-you designs.
      </p>
    </div>
  );
};

/* ── Website packages — shown under the Websites tab ──
   Tiered by page count, NGN-priced via /api/website-requests/plans. */
const WEBSITE_FALLBACK = {
  starter:  { label: "Starter",  pages: "Up to 5 pages",     priceNGN: 200000, from: false, timeline: "2–3 weeks",          deliverables: ["Up to 5 custom-designed pages", "Mobile-first responsive build", "Contact form + WhatsApp link", "Basic on-page SEO", "2 revision rounds"] },
  business: { label: "Business", pages: "Up to 10 pages",    priceNGN: 380000, from: false, timeline: "3–5 weeks",          deliverables: ["Up to 10 custom-designed pages", "Everything in Starter", "Blog / CMS — edit your own content", "Analytics + SEO for every page", "3 revision rounds"] },
  premium:  { label: "Premium",  pages: "15+ pages / custom", priceNGN: 650000, from: true,  timeline: "Scoped per project", deliverables: ["15+ pages or a custom web app", "Everything in Business", "Store, booking, payments, or member area", "Source files + handover docs", "Revisions until launch-ready"] },
};
const WEBSITE_ORDER = ["starter", "business", "premium"];

const WebsitePlans = () => {
  const navigate = useNavigate();
  const [plans] = useState(WEBSITE_FALLBACK);

  /* Plans ship with the build — edit WEBSITE_FALLBACK above. */

  return (
    <div className="mt-16">
      <div className="grid gap-5 sm:grid-cols-3">
        {WEBSITE_ORDER.map((key) => {
          const p = plans[key];
          const featured = key === "business";
          return (
            <div
              key={key}
              className={`flex flex-col rounded-[24px] border p-6 ${
                featured
                  ? "border-lime-500/70 bg-[radial-gradient(circle_at_top,_rgba(132,204,22,0.22),transparent_55%),_#050505] shadow-[0_0_40px_rgba(132,204,22,0.18)]"
                  : "border-lime-500/25 bg-[#0b0b0e]"
              }`}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">{p.label}</p>
              <p className="text-xs text-neutral-500 mb-3">{p.pages}</p>
              <p className="text-3xl font-extrabold text-white">{p.from ? "From " : ""}{NGN(p.priceNGN)}</p>
              <p className="mt-1 text-xs font-medium text-lime-300/85">
                <span className="text-neutral-500">Delivery</span> · {WEBSITE_DURATION[key] || p.timeline}
              </p>
              <ul className="mt-5 mb-6 space-y-1.5 text-[13px] text-neutral-300 flex-1">
                {(p.deliverables || []).slice(0, 5).map((d) => <li key={d}>• {d}</li>)}
              </ul>
              <Button
                type="button"
                onClick={() => navigate(`/book-website?plan=${key}`)}
                variant="primary"
                size="md"
                className="w-full"
              >
                Book this package
              </Button>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-center text-xs text-neutral-500">
        Every package covers design and build. Hosting & domain are billed separately — I can set both up on your behalf.
      </p>
    </div>
  );
};

const BrandIdentity = () => {
  const [rateCategories] = useState(FALLBACK_CATEGORIES);
  const [loading] = useState(false);
  const [error] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(FALLBACK_CATEGORIES[0].id);
  const [showDetails, setShowDetails] = useState(false);

  /* Rate cards ship with the build — edit FALLBACK_CATEGORIES above. */

  const hasCategories = Array.isArray(rateCategories) && rateCategories.length > 0;

  const activeCategory = useMemo(() => {
    if (!hasCategories || !activeCategoryId) return null;
    return rateCategories.find((cat) => cat.id === activeCategoryId) || rateCategories[0];
  }, [activeCategoryId, hasCategories, rateCategories]);

  const TabBar = () => (
    <div className="flex justify-center">
      <div className="inline-flex max-w-full overflow-x-auto rounded-xl border border-white/10 bg-[#181820]/95 px-2 py-2 backdrop-blur-md gap-2">
        {rateCategories.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategoryId(cat.id);
                setShowDetails(false);
              }}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs sm:text-sm transition
                ${isActive
                  ? "bg-[#2c2d34] text-white shadow-inner shadow-black/40"
                  : "text-stone-300 hover:bg-white/5"
                }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="relative w-full bg-black py-16 lg:py-20">
        <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
            Loading packages…
          </h2>
          <p className="mt-3 max-w-[600px] mx-auto text-sm sm:text-base font-normal leading-6 text-neutral-400">
            Fetching the latest rates — won&apos;t be a moment.
          </p>
        </div>
      </section>
    );
  }

  if (!hasCategories || !activeCategory) {
    return (
      <section className="relative w-full bg-black py-16 lg:py-20">
        <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
            Rates coming soon
          </h2>
          <p className="mt-3 max-w-[600px] mx-auto text-sm sm:text-base font-normal leading-6 text-neutral-400">
            {error || "Packages are being updated. Check back shortly or reach out directly for a custom quote."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-black py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-0 h-72 w-72 rounded-full bg-lime-500/14 blur-[190px]" />
        <div className="absolute right-[-60px] bottom-[-60px] h-72 w-72 rounded-full bg-lime-500/10 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">

        {/* ── TABS — above heading ── */}
        <TabBar />

        {/* ── HEADING + DESCRIPTION ── */}
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
            {activeCategory.heading}
          </h2>
          <p className="max-w-[580px] text-sm sm:text-base font-normal leading-relaxed text-neutral-400">
            {DESCRIPTION_OVERRIDES[activeCategory.label] ?? activeCategory.description}
          </p>
        </div>

        {/* ── CARDS ── */}
        {activeCategory.id === "graphic-design" ? (
          /* Graphic design bookings are flyer designs — server-priced packs */
          <FlyerPlans />
        ) : activeCategory.id === "websites" ? (
          /* Website packages tiered by page count — server-priced */
          <WebsitePlans />
        ) : (
          <>
            <PlanSelection
              plans={activeCategory.plans}
              detailsOpen={showDetails}
              onToggleDetails={() => setShowDetails((v) => !v)}
            />

            {/* ── DELIVERABLES TABLE ── */}
            <PlanDetails
              plans={activeCategory.plans}
              deliverables={activeCategory.deliverables}
              isOpen={showDetails}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default BrandIdentity;
