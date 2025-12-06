// src/components/Rate/BrandIdentity.jsx
import React, { useState } from "react";
import { rateCategories } from "../../data/ratePlansData";
import PlanSelection from "./PlanSelection";
import PlanDetails from "./PlanDetails";

const BrandIdentity = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(
    rateCategories[0].id
  );

  const activeCategory =
    rateCategories.find((cat) => cat.id === activeCategoryId) ||
    rateCategories[0];

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

        {/* Top cards */}
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
