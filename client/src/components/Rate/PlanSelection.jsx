// src/components/Rate/PlanSelection.jsx
import React from "react";
import { Link } from "react-router-dom";
import diaImg from "../../assets/PlanDia.png";

const PlanSelection = ({
  categories,
  activeCategoryId,
  onChangeCategory,
  plans,
}) => {
  const handleCompareClick = () => {
    const section = document.getElementById("compare-plans");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="mt-10">
      {/* TAB BAR */}
      <div className="flex justify-center">
        <div
          className="
            inline-flex max-w-full overflow-x-auto
            rounded-xl border border-white/10
            bg-[#181820]/95 px-2 py-2
            backdrop-blur-md
            gap-2
          "
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChangeCategory(cat.id)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs sm:text-sm font-['Mont'] transition
                  ${
                    isActive
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

      {/* PRICING CARDS */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isFeatured = plan.isFeatured;
          const badgeType = plan.badgeType;

          /* =========================
           * FEATURED (CENTER) CARD
           * ======================= */
          if (isFeatured) {
            return (
              <div
                key={plan.id}
                className="
                  group relative flex flex-col
                  rounded-[32px]
                  bg-gradient-to-b from-lime-500 to-lime-600
                  p-[3px]
                  shadow-[0_22px_90px_rgba(132,204,22,0.5)]
                  transition-transform duration-300
                  hover:-translate-y-3
                  hover:shadow-[0_26px_110px_rgba(132,204,22,0.7)]
                "
              >
                <div className="flex h-full flex-col rounded-[28px] bg-[#111318] overflow-hidden">
                  {/* neon header bar */}
                  <div className="flex items-center justify-center bg-lime-500 py-3">
                    <span className="font-['Mont'] text-sm font-bold text-white">
                      Most popular
                    </span>
                  </div>

                  {/* inner content */}
                  <div className="flex h-full flex-col px-8 pt-8 pb-9 sm:px-9 sm:pt-9 sm:pb-10">
                    {/* medal + badge */}
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={diaImg}
                          alt={`${plan.name} plan`}
                          className="h-14 w-auto object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.7)]"
                        />
                        <div>
                          <h3 className="font-['Mont'] text-lg font-extrabold text-white">
                            {plan.name}
                          </h3>
                          <p className="font-['Mont'] text-xs text-neutral-300">
                            {plan.currency === "USD" ? "$" : ""}
                            {plan.price} • one-time
                          </p>
                        </div>
                      </div>

                      {badgeType === "recommended" && (
                        <div className="inline-flex items-center rounded-full bg-gradient-to-b from-lime-500 to-lime-700 px-3 py-1 text-[11px] font-semibold text-white font-['Mont']">
                          {plan.badgeLabel}
                        </div>
                      )}
                    </div>

                    {/* description */}
                    <p className="mb-8 font-['Mont'] text-sm font-semibold leading-6 text-neutral-200">
                      {plan.description}
                    </p>

                    {/* price */}
                    <div className="mb-8 text-4xl sm:text-5xl font-extrabold text-white font-['Mont']">
                      {plan.currency === "USD" ? "$" : ""}
                      {plan.price}
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      className="
                        mt-auto inline-flex w-full items-center justify-center
                        rounded-xl bg-gradient-to-b from-lime-500 to-lime-700
                        px-4 py-3
                        text-sm font-bold text-white font-['Mont']
                        shadow-[0_12px_40px_rgba(132,204,22,0.7)]
                        transition hover:brightness-110
                      "
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          /* =========================
           * SIDE CARDS (GOLD / PLATINUM)
           * ======================= */
          return (
            <div
              key={plan.id}
              className="
                group relative flex flex-col
                rounded-[32px]
                border border-lime-500/35
                bg-[radial-gradient(circle_at_top,_rgba(132,204,22,0.22),transparent_55%),_#050505]
                shadow-[0_20px_80px_rgba(0,0,0,0.85)]
                transition-transform duration-300
                hover:-translate-y-2
                hover:shadow-[0_26px_100px_rgba(0,0,0,1)]
              "
            >
              <div className="flex h-full flex-col px-8 py-9 sm:px-9 sm:py-10">
                {/* medal + title + optional badge */}
                <div className="flex items-start gap-3">
                  <img
                    src={diaImg}
                    alt={`${plan.name} plan`}
                    className="h-14 w-auto object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.7)]"
                  />

                  <div className="flex-1">
                    <h3 className="font-['Mont'] text-lg font-extrabold text-white">
                      {plan.name}
                    </h3>
                    {badgeType === "premium" && (
                      <div className="mt-2 inline-flex items-center rounded-full bg-gradient-to-b from-indigo-500 to-indigo-700 px-3 py-1 text-[11px] font-semibold text-white font-['Mont']">
                        {plan.badgeLabel}
                      </div>
                    )}
                  </div>
                </div>

                {/* description */}
                <p className="mt-7 mb-8 font-['Mont'] text-sm font-semibold leading-6 text-neutral-200">
                  {plan.description}
                </p>

                {/* price */}
                <div className="mb-7 text-4xl sm:text-5xl font-extrabold text-white font-['Mont']">
                  {plan.currency === "USD" ? "$" : ""}
                  {plan.price}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  className="
                    mt-auto inline-flex w-full items-center justify-center
                    rounded-xl bg-gradient-to-b from-slate-500 to-slate-800
                    px-4 py-3
                    text-sm font-bold text-white font-['Mont']
                    shadow-[0_10px_35px_rgba(0,0,0,0.8)]
                    transition
                    hover:bg-gradient-to-b hover:from-slate-400 hover:to-slate-700
                  "
                >
                  Get Started
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMPARE CTA */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleCompareClick}
          className="
            inline-flex items-center justify-center
            rounded-2xl bg-gradient-to-b from-[#343747] to-[#1d1f27]
            px-10 py-3
            text-sm sm:text-base font-semibold text-white font-['Mont']
            shadow-[0_18px_70px_rgba(0,0,0,0.9)]
            transition
            hover:-translate-y-[1px]
            hover:shadow-[0_22px_90px_rgba(0,0,0,1)]
          "
        >
          Compare Plans
        </button>

        {/* 🔗 Click to view samples -> /projects */}
        <Link
          to="/projects"
          className="
            text-xs sm:text-sm text-neutral-300 font-['Mont']
            underline underline-offset-4 decoration-neutral-500
            hover:text-white hover:decoration-lime-400
            transition-colors
          "
        >
          Click to view samples
        </Link>
      </div>
    </div>
  );
};

export default PlanSelection;
