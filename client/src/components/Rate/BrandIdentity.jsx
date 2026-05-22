// src/components/Rate/BrandIdentity.jsx
import React, { useEffect, useState, useMemo } from "react";
import PlanSelection from "./PlanSelection";
import PlanDetails from "./PlanDetails";

const PUBLIC_RATES_API = import.meta.env.VITE_AUTH_ENDPOINT || "";

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

const BrandIdentity = () => {
  const [rateCategories, setRateCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`${PUBLIC_RATES_API}/api/rates`);
        if (!res.ok) throw new Error("Failed to fetch rate categories");
        const data = await res.json();
        const array = Array.isArray(data) ? data : [];
        // Merge: backend data takes priority, fallbacks fill in missing categories
        const merged = FALLBACK_CATEGORIES.map((fallback) => {
          const fromBackend = array.find(
            (c) => c.label === fallback.label || fallback.altLabels.includes(c.label)
          );
          return fromBackend ? { ...fromBackend, label: fallback.label } : fallback;
        });
        setRateCategories(merged);
        if (merged.length > 0 && !activeCategoryId) {
          setActiveCategoryId(merged[0].id);
        }
      } catch (err) {
        console.error(err);
        setError("Could not load rate categories. Please try again later.");
        setRateCategories(FALLBACK_CATEGORIES);
        setActiveCategoryId(FALLBACK_CATEGORIES[0].id);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

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
      </div>
    </section>
  );
};

export default BrandIdentity;
