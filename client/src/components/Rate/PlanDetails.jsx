import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckmarkCircle04Icon } from "hugeicons-react";
import { planKeyFromName } from "../../config/plans";
import { Button } from "../ui";
import goldBadge    from "../../assets/Gold.png";
import silverBadge  from "../../assets/Silver.png";
import platinumBadge from "../../assets/Platinum.png";

const BADGES = [
  { src: goldBadge,     h: "h-18" },
  { src: silverBadge,   h: "h-18" },
  { src: platinumBadge, h: "h-18" },
];
const getBadge = (index) => BADGES[index] ?? BADGES[1];

const nameSx = {
  background: "linear-gradient(180deg, #ffffff 0%, #9ca3af 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// Outline circular check with subtle glow
const PlanCheck = () => (
  <CheckmarkCircle04Icon size={20} className="text-lime-400 drop-shadow-[0_0_10px_rgba(190,242,100,0.6)]" />
);

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

const PlanDetails = ({ plans = [], deliverables = [], isOpen = false }) => {
  const navigate = useNavigate();

  const bookPlan = (plan) => {
    const key = planKeyFromName(plan?.name);
    navigate(key ? `/book?plan=${key}` : "/book");
  };

  if (!plans || plans.length === 0) return null;

  const rows =
    deliverables && deliverables.length > 0
      ? deliverables
      : createFallbackDeliverables(plans);

  return (
    <section
      id="compare-plans"
      className="scroll-mt-24"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
      <div
        className="
          mt-10 w-full rounded-[32px]
          border border-lime-400/60
          bg-[radial-gradient(circle_at_top,_rgba(190,242,100,0.18),transparent_55%),_#050505]
          pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10
          shadow-[0_0_26px_rgba(190,242,100,0.18)]
        "
      >
        {/* ============ DESKTOP (lg+) ============ */}
        <div className="hidden lg:block">
          {/* HEADER ROW: plan cards inside table */}
          <div className="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] gap-x-0 items-stretch px-8 pb-6">
            <div className="flex items-end pb-3">
              <h3 className="text-2xl font-light text-white/70">
                Deliverables
              </h3>
            </div>

            {plans.map((plan, index) => {
              const badge = getBadge(index);
              const rawDesc = plan.tagline || plan.description;

              return (
                <div
                  key={plan.id}
                  className="relative flex flex-col items-center text-center border-l border-lime-400/25 px-6 py-3"
                >
                  {/* badge */}
                  <img
                    src={badge.src}
                    alt={`${plan.name} plan badge`}
                    className={`mb-3 ${badge.h} w-auto object-contain`}
                  />

                  {/* name */}
                  <h3 className="text-[1.75rem] font-light leading-none" style={nameSx}>
                    {plan.name}
                  </h3>

                  {/* price */}
                  <p className="mt-2 text-3xl font-extrabold text-white">
                    {plan.currency === "USD" ? "$" : ""}
                    {plan.price}
                  </p>

                  {/* short description */}
                  <p
                    className="mt-1 text-[11px] leading-snug text-white/45 max-w-[12rem]"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {rawDesc}
                  </p>

                  {/* CTA */}
                  <div className="mt-auto pt-4 w-full">
                    <Button
                      type="button"
                      onClick={() => bookPlan(plan)}
                      variant="primary"
                      size="sm"
                      className="w-full"
                    >
                      Book this plan
                    </Button>
                  </div>
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
                <div className="pr-4 text-sm font-semibold text-neutral-400 group-hover:text-neutral-100">
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
                        <span className="text-sm font-semibold text-neutral-500">
                          -
                        </span>
                      ) : (
                        <span className="text-sm font-semibold text-[#c7b6ff]">
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
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Compare plan deliverables
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-300">
              Scroll through each plan to see what’s included.
            </p>
          </div>

          {plans.map((plan, index) => {
            const badge = getBadge(index);
            const desc = truncateDescription(
              plan.tagline || plan.description,
              100
            );

            return (
              <div
                key={plan.id}
                className="
                  rounded-2xl border border-white/10
                  bg-black/40
                  px-4 py-4 sm:px-5 sm:py-5
                  shadow-[0_16px_45px_rgba(0,0,0,0.7)]
                "
              >
                {/* badge */}
                <img
                  src={badge.src}
                  alt={`${plan.name} plan badge`}
                  className={`${badge.h} w-auto object-contain`}
                />

                {/* name + price + desc */}
                <div className="mt-3">
                  <h3 className="text-[1.6rem] font-light leading-none" style={nameSx}>
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {plan.currency === "USD" ? "$" : ""}
                    {plan.price}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs leading-snug text-white/45 max-w-xs">
                    {desc}
                  </p>
                </div>

                {/* CTA */}
                <Button
                  type="button"
                  onClick={() => bookPlan(plan)}
                  variant="primary"
                  size="sm"
                  className="mt-4 w-full"
                >
                  Book this plan
                </Button>

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
                        <span className="flex-1 text-[11px] sm:text-xs font-medium text-neutral-200">
                          {row.label}
                        </span>
                        <span className="flex-shrink-0 min-w-[60px] text-right">
                          {displayMode === "check" ? (
                            <PlanCheck />
                          ) : displayMode === "dash" ? (
                            <span className="text-[11px] sm:text-xs text-neutral-500">
                              -
                            </span>
                          ) : (
                            <span className="text-[11px] sm:text-xs font-semibold text-[#c7b6ff]">
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PlanDetails;
