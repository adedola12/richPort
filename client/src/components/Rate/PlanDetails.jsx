import React from "react";
import diaImg from "../../assets/PlanDia.png";
import { BsCheckCircle } from "react-icons/bs";

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

// Fallback rows if no deliverables are defined in DB
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

// Normalize DB value → how to render in cell
const normalizeCell = (raw) => {
  let displayMode = "dash"; // "check" | "dash" | "text"
  let displayText = "";

  if (raw === true) {
    displayMode = "check";
  } else if (
    raw === false ||
    raw === undefined ||
    raw === null ||
    raw === "" ||
    raw === "-"
  ) {
    displayMode = "dash";
  } else if (typeof raw === "string" && raw.toLowerCase() === "check") {
    displayMode = "check";
  } else {
    displayMode = "text";
    displayText = String(raw);
  }

  return { displayMode, displayText };
};

// Still used for mobile where space is tighter
const truncateDescription = (text, maxChars = 100) => {
  if (!text) return "";
  const trimmed = String(text).trim();
  if (trimmed.length <= maxChars) return trimmed;
  return `${trimmed.slice(0, maxChars).trim()}…`;
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
      className="mt-16 sm:mt-20 lg:mt-24 flex justify-center px-4 scroll-mt-24"
    >
      <div
        className="
          w-full max-w-6xl rounded-[32px]
          border border-lime-400/60
          bg-[radial-gradient(circle_at_top,_rgba(190,242,100,0.18),transparent_55%),_#050505]
          pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10
          shadow-[0_0_26px_rgba(190,242,100,0.18)]
          transition duration-300
          hover:border-lime-300
          hover:shadow-[0_0_40px_rgba(190,242,100,0.32)]
          hover:-translate-y-[2px]
        "
      >
        {/* ============ DESKTOP (lg+) ============ */}
        <div className="hidden lg:block">
          {/* HEADER ROW: plan cards inside table */}
          <div className="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] gap-x-0 px-8 pb-6">
            <div className="flex items-end">
              <h3 className="font-['Mont'] text-2xl font-semibold text-white">
                Deliverables
              </h3>
            </div>

            {plans.map((plan, index) => {
              const isFeatured =
                plan.isFeatured || (plans.length === 3 && index === 1);
              const nameColorClass = plan.accentColorClass || "text-lime-400";
              const rawDesc = plan.tagline || plan.description;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col items-center border-l border-lime-400/25 px-6 py-3
                    ${
                      isFeatured
                        ? "rounded-[24px] bg-gradient-to-b from-lime-500/12 to-lime-500/0 shadow-[0_0_40px_rgba(190,242,100,0.45)]"
                        : ""
                    }`}
                >
                  {/* icon */}
                  <img
                    src={diaImg}
                    alt={`${plan.name} plan icon`}
                    className="mb-2 h-12 w-auto object-contain drop-shadow-[0_0_28px_rgba(96,165,250,0.9)]"
                  />

                  {/* name */}
                  <p
                    className={`font-['Mont'] text-base font-semibold ${nameColorClass}`}
                  >
                    {plan.name}
                  </p>

                  {/* price */}
                  <p className="mt-1 font-['Mont'] text-3xl font-extrabold text-white">
                    {plan.currency === "USD" ? "$" : ""}
                    {plan.price}
                  </p>

                  {/* short description – CLAMPED TO EXACTLY 2 LINES */}
                  <p
                    className="mt-1 mx-auto max-w-[13rem] text-center text-[11px] font-semibold text-neutral-400"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {rawDesc}
                  </p>

                  {/* CTA with hover + scroll */}
                  <button
                    type="button"
                    onClick={scrollToRateForm}
                    className={`
                      mt-4 w-full rounded-xl border px-4 py-2
                      text-xs font-bold font-['Mont']
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
                  items-center px-8 py-5 text-sm
                  transition-colors duration-200
                  hover:bg-white/5
                "
              >
                <div className="pr-4 font-['Mont'] text-sm font-semibold text-neutral-400 group-hover:text-neutral-100">
                  {row.label}
                </div>

                {plans.map((plan) => {
                  const raw = row.perPlan ? row.perPlan[plan.id] : undefined;
                  const { displayMode, displayText } = normalizeCell(raw);

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
                      {displayMode === "check" ? (
                        <PlanCheck />
                      ) : displayMode === "dash" ? (
                        <span className="font-['Mont'] text-sm font-semibold text-neutral-500">
                          -
                        </span>
                      ) : (
                        <span className="font-['Mont'] text-sm font-semibold text-[#c7b6ff]">
                          {displayText}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ============ MOBILE & TABLET (< lg) ============ */}
        <div className="block lg:hidden px-4 space-y-6">
          {/* mobile part unchanged except using truncateDescription */}
          <div className="mb-2">
            <h3 className="font-['Mont'] text-lg sm:text-xl font-semibold text-white">
              Compare plan deliverables
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-300 font-['Lexend']">
              Scroll through each plan to see what’s included.
            </p>
          </div>

          {plans.map((plan, index) => {
            const isFeatured =
              plan.isFeatured || (plans.length === 3 && index === 1);
            const nameColorClass = plan.accentColorClass || "text-lime-400";
            const desc = truncateDescription(
              plan.tagline || plan.description,
              100
            );

            return (
              <div
                key={plan.id}
                className={`
                  rounded-2xl border
                  ${isFeatured ? "border-lime-400/80" : "border-white/10"}
                  bg-black/40
                  px-4 py-4 sm:px-5 sm:py-5
                  shadow-[0_16px_45px_rgba(0,0,0,0.7)]
                `}
              >
                {/* icon */}
                <div className="flex items-center gap-3">
                  <img
                    src={diaImg}
                    alt={`${plan.name} plan icon`}
                    className="h-9 w-auto sm:h-10 object-contain drop-shadow-[0_0_24px_rgba(96,165,250,0.9)]"
                  />
                </div>

                {/* name + price + desc */}
                <div className="mt-2">
                  <p
                    className={`font-['Mont'] text-sm sm:text-base font-semibold ${nameColorClass}`}
                  >
                    {plan.name}
                  </p>
                  <p className="font-['Mont'] text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {plan.currency === "USD" ? "$" : ""}
                    {plan.price}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-neutral-400 max-w-xs">
                    {desc}
                  </p>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={scrollToRateForm}
                  className={`
                    mt-4 w-full rounded-xl border px-4 py-2
                    text-xs sm:text-sm font-bold font-['Mont']
                    transition-all duration-300
                    hover:-translate-y-[1px] hover:brightness-110
                    ${
                      isFeatured
                        ? "border-lime-500 bg-gradient-to-b from-lime-500 to-lime-700 text-white shadow-[0_10px_35px_rgba(132,204,22,0.65)]"
                        : "border-lime-500 bg-gradient-to-b from-lime-500/10 to-lime-700/10 text-white/90"
                    }
                  `}
                >
                  Get started
                </button>

                {/* Deliverables list for this plan */}
                <div className="mt-4 space-y-2">
                  {rows.map((row) => {
                    const raw = row.perPlan ? row.perPlan[plan.id] : undefined;
                    const { displayMode, displayText } = normalizeCell(raw);

                    return (
                      <div
                        key={row.id}
                        className="flex items-start justify-between gap-3 rounded-lg bg-white/5 px-3 py-2"
                      >
                        <span className="flex-1 text-[11px] sm:text-xs font-['Mont'] font-medium text-neutral-200">
                          {row.label}
                        </span>
                        <span className="flex-shrink-0 min-w-[60px] text-right">
                          {displayMode === "check" ? (
                            <PlanCheck />
                          ) : displayMode === "dash" ? (
                            <span className="text-[11px] sm:text-xs font-['Mont'] text-neutral-500">
                              -
                            </span>
                          ) : (
                            <span className="text-[11px] sm:text-xs font-['Mont'] font-semibold text-[#c7b6ff]">
                              {displayText}
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlanDetails;
