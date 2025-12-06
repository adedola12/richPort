// src/components/Rate/BrandIdentity.jsx
import React, { useEffect, useState, useMemo } from "react";
import PlanSelection from "./PlanSelection";
import PlanDetails from "./PlanDetails";

const PUBLIC_RATES_API = import.meta.env.VITE_AUTH_ENDPOINT || "";

const BrandIdentity = () => {
  const [rateCategories, setRateCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  // Fetch categories from backend
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`${PUBLIC_RATES_API}/api/rates`);
        if (!res.ok) throw new Error("Failed to fetch rate categories");
        const data = await res.json();

        const array = Array.isArray(data) ? data : [];
        setRateCategories(array);

        // Default active tab = first category
        if (array.length > 0 && !activeCategoryId) {
          setActiveCategoryId(array[0].id);
        }
      } catch (err) {
        console.error(err);
        setError("Could not load rate categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [activeCategoryId]);

  const hasCategories =
    Array.isArray(rateCategories) && rateCategories.length > 0;

  const activeCategory = useMemo(() => {
    if (!hasCategories || !activeCategoryId) return null;
    return (
      rateCategories.find((cat) => cat.id === activeCategoryId) ||
      rateCategories[0]
    );
  }, [activeCategoryId, hasCategories, rateCategories]);

  // 🔹 Loading state
  if (loading) {
    return (
      <section className="relative w-full bg-[#050505] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-80px] top-0 h-72 w-72 rounded-full bg-lime-500/14 blur-[190px]" />
          <div className="absolute right-[-60px] bottom-[-60px] h-72 w-72 rounded-full bg-lime-500/10 blur-[200px]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6 text-center">
          <h2 className="font-['Mont'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Brand identity packages
          </h2>
          <p className="mt-3 max-w-[700px] mx-auto font-['Mont'] text-sm sm:text-base font-semibold leading-6 text-neutral-200">
            Loading our latest rate categories...
          </p>
        </div>
      </section>
    );
  }

  // 🔹 Error or empty state
  if (!hasCategories || !activeCategory) {
    return (
      <section className="relative w-full bg-[#050505] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-80px] top-0 h-72 w-72 rounded-full bg-lime-500/14 blur-[190px]" />
          <div className="absolute right-[-60px] bottom-[-60px] h-72 w-72 rounded-full bg-lime-500/10 blur-[200px]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6 text-center">
          <h2 className="font-['Mont'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Nothing to see here
          </h2>
          <p className="mt-3 max-w-[700px] mx-auto font-['Mont'] text-sm sm:text-base font-semibold leading-6 text-neutral-200">
            {error ||
              "Our rate categories are currently unavailable. Please check back soon or contact Richard directly for a custom quote."}
          </p>
        </div>
      </section>
    );
  }

  // 🔹 Normal UI when data is present
  return (
    <section className="relative w-full bg-[#050505] py-16 lg:py-20">
      {/* subtle green glow behind section */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-0 h-72 w-72 rounded-full bg-lime-500/14 blur-[190px]" />
        <div className="absolute right-[-60px] bottom-[-60px] h-72 w-72 rounded-full bg-lime-500/10 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
        {/* heading + description that react to tab selection */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-['Mont'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {activeCategory.heading}
          </h2>
          <p className="max-w-[848px] font-['Mont'] text-sm sm:text-base font-semibold leading-6 text-neutral-200">
            {activeCategory.description}
          </p>
        </div>

        {/* Top cards & tab bar */}
        <PlanSelection
          categories={rateCategories.map(({ id, label }) => ({ id, label }))}
          activeCategoryId={activeCategoryId}
          onChangeCategory={setActiveCategoryId}
          plans={activeCategory.plans}
        />

        {/* Compare table – auto-updated when tab changes */}
        <PlanDetails
          plans={activeCategory.plans}
          deliverables={activeCategory.deliverables}
        />
      </div>
    </section>
  );
};

export default BrandIdentity;
