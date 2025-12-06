// src/components/Rate/PlanDetails.jsx
import React from "react";
import diaImg from "../../assets/PlanDia.png";
import { BsCheckCircle } from "react-icons/bs"; // outline icon

// Outline circular check with subtle glow
const PlanCheck = () => (
  <BsCheckCircle className="h-5 w-5 text-lime-400 drop-shadow-[0_0_10px_rgba(190,242,100,0.6)]" />
);

// Smooth scroll to RateForm
const scrollToRateForm = () => {
  const formSection = document.getElementById("rate-form");
  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Fallback rows …
const createFallbackDeliverables = (plans = []) => {
  if (!plans || plans.length === 0) return [];
  const ids = plans.map((p) => p.id);
  const per = (vals) => {
    const result = {};
    ids.forEach((id, index) => {
      result[id] = vals[index] ?? vals[vals.length - 1];
    });
    return result;
  };

  return [
    {
      id: "core-features",
      label: "Core feature set",
      perPlan: per(["check", "check", "check"]),
    },
    {
      id: "priority-support",
      label: "Priority support",
      perPlan: per(["-", "check", "check"]),
    },
    {
      id: "revisions",
      label: "Revisions per project",
      perPlan: per(["2", "4", "Unlimited"]),
    },
    {
      id: "custom-assets",
      label: "Custom assets & layouts",
      perPlan: per(["Basic", "Standard", "Advanced"]),
    },
    {
      id: "delivery-time",
      label: "Estimated delivery time",
      perPlan: per(["10 days", "7 days", "5 days"]),
    },
  ];
};

const PlanDetails = ({ plans = [], deliverables = [] }) => {
  if (!plans || plans.length === 0) return null;

  const rows =
    deliverables && deliverables.length > 0
      ? deliverables
      : createFallbackDeliverables(plans);

  return (
    <section
      id="compare-plans"
      className="mt-24 flex justify-center px-4 scroll-mt-24"
    >
      <div
        className="
          w-full max-w-6xl rounded-[32px]
          border border-lime-400/60
          bg-[radial-gradient(circle_at_top,_rgba(190,242,100,0.18),transparent_55%),_#050505]
          pt-10 pb-10
          shadow-[0_0_26px_rgba(190,242,100,0.18)]
          transition duration-300
          hover:border-lime-300
          hover:shadow-[0_0_40px_rgba(190,242,100,0.32)]
          hover:-translate-y-[2px]
        "
      >
        {/* HEADER ROW: plan cards inside table */}
        <div className="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] gap-x-0 px-8 pb-6">
          <div className="flex items-end">
            <h3 className="font-['Mont'] text-2xl font-semibold text-white">
              Deliverables
            </h3>
          </div>

          {plans.map((plan) => {
            const nameColorClass = plan.accentColorClass || "text-lime-400";
            const isFeatured = plan.isFeatured;

            return (
              <div
                key={plan.id}
                className={`flex flex-col items-center border-l border-lime-400/25 px-6 ${
                  isFeatured
                    ? "rounded-[28px] -mx-2 bg-gradient-to-b from-lime-500/10 to-lime-500/0 pb-4"
                    : ""
                }`}
              >
                {/* raw icon only */}
                <img
                  src={diaImg}
                  alt={`${plan.name} plan icon`}
                  className="mb-2 h-14 w-auto object-contain drop-shadow-[0_0_32px_rgba(96,165,250,0.9)]"
                />

                <p
                  className={`font-['Mont'] text-xl font-semibold ${nameColorClass}`}
                >
                  {plan.name}
                </p>
                <p className="mt-1 font-['Mont'] text-3xl sm:text-4xl font-extrabold text-white">
                  {plan.currency === "USD" ? "$" : ""}
                  {plan.price}
                </p>
                <p className="mt-1 text-center text-xs font-semibold text-neutral-400">
                  {plan.tagline || plan.description}
                </p>

                {/* CTA with hover + scroll */}
                <button
                  type="button"
                  onClick={scrollToRateForm}
                  className={`
                    mt-4 w-full rounded-xl border px-4 py-2
                    text-sm font-bold font-['Mont']
                    transition-all duration-300 transform
                    hover:-translate-y-[2px] hover:brightness-110
                    ${
                      isFeatured
                        ? "border-lime-500 bg-gradient-to-b from-lime-500 to-lime-700 text-white shadow-[0_10px_35px_rgba(132,204,22,0.65)] hover:shadow-[0_16px_55px_rgba(132,204,22,0.9)]"
                        : "border-lime-500 bg-gradient-to-b from-lime-500/10 to-lime-700/10 text-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.7)] hover:shadow-[0_14px_45px_rgba(0,0,0,0.9)]"
                    }
                  `}
                >
                  Get started
                </button>
              </div>
            );
          })}
        </div>

        <div className="h-px w-full bg-white/5" />

        {/* BODY ROWS */}
        <div className="divide-y divide-white/5">
          {rows.map((row) => (
            <div
              key={row.id}
              className="
                group
                grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]
                items-center px-8 py-5 text-sm sm:text-base
                transition-colors duration-200
                hover:bg-white/5
              "
            >
              <div className="pr-4 font-['Mont'] text-sm font-semibold text-neutral-400 group-hover:text-neutral-100">
                {row.label}
              </div>

              {plans.map((plan) => {
                const raw = row.perPlan ? row.perPlan[plan.id] : undefined;
                const value = raw === undefined ? "-" : raw;

                return (
                  <div
                    key={plan.id}
                    className="
                      flex justify-center
                      border-l border-lime-400/20
                      transition-colors duration-200
                      group-hover:border-lime-300/40
                    "
                  >
                    {value === "check" ? (
                      <PlanCheck />
                    ) : value === "-" || value === "" ? (
                      <span className="font-['Mont'] text-sm font-semibold text-neutral-500">
                        -
                      </span>
                    ) : (
                      <span className="font-['Mont'] text-sm font-semibold text-[#c7b6ff]">
                        {value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanDetails;
