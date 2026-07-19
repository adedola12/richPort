import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Fire02Icon } from "hugeicons-react";
import { planKeyFromName } from "../../config/plans";
import { Button } from "../ui";
import goldBadge    from "../../assets/Gold.png";
import silverBadge  from "../../assets/Silver.png";
import platinumBadge from "../../assets/Platinum.png";

const getFeaturedIndex = (plans = []) => {
  if (!plans || plans.length === 0) return -1;
  const explicit = plans.findIndex((p) => p.isFeatured);
  if (explicit !== -1) return explicit;
  if (plans.length === 3) return 1;
  return 0;
};

const BADGES = [
  { src: goldBadge,     h: "h-20" },
  { src: silverBadge,   h: "h-20" },
  { src: platinumBadge, h: "h-20" },
];

const getBadge = (index) => BADGES[index] ?? BADGES[1];

const truncateDescription = (text, maxChars = 90) => {
  if (!text) return "";
  const t = String(text).trim();
  return t.length <= maxChars ? t : `${t.slice(0, maxChars).trim()}…`;
};

const nameSx = {
  background: "linear-gradient(180deg, #ffffff 0%, #9ca3af 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// Tilt directions: Gold tilts left, Silver straight up, Platinum tilts right
const TILT = [-2, 0, 2];

const PlanSelection = ({
  plans = [],
  detailsOpen,
  onToggleDetails,
}) => {
  const featuredIndex = getFeaturedIndex(plans);
  const navigate = useNavigate();

  const bookPlan = (plan) => {
    const key = planKeyFromName(plan?.name);
    navigate(key ? `/book?plan=${key}` : "/book");
  };

  const handleViewDeliverables = () => {
    onToggleDetails?.();
    if (!detailsOpen) {
      setTimeout(() => {
        const el = document.getElementById("compare-plans");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  if (!plans || plans.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center gap-5 text-center py-16">
        {/* Animated illustration */}
        <div className="relative flex items-center justify-center w-32 h-32">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border border-lime-500/30 animate-spin" style={{ animationDuration: "8s" }} />
          {/* Middle pulsing ring */}
          <div className="absolute inset-3 rounded-full border border-lime-500/20 animate-ping" style={{ animationDuration: "2.5s" }} />
          {/* Inner glow circle */}
          <div className="absolute inset-6 rounded-full bg-lime-500/10 blur-sm" />
          {/* Center icon */}
          <svg className="relative z-10 w-10 h-10 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          {/* Orbiting dot */}
          <div
            className="absolute w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(132,204,22,0.9)]"
            style={{
              top: "6px",
              left: "50%",
              transformOrigin: "0 58px",
              animation: "spin 4s linear infinite",
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-white">Pricing coming soon</p>
          <p className="text-sm font-normal text-neutral-400 max-w-[420px]">
            We&apos;re finalising the packages for this service. Reach out directly for a custom quote in the meantime.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      {/* ── PRICING CARDS ── */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => {
          const isFeatured = index === featuredIndex;
          const isRightMost = index === plans.length - 1;
          const badge = getBadge(index);
          const desc = truncateDescription(plan.description || plan.tagline, 95);
          const tiltDeg = TILT[index] ?? 0;

          let badgeType = plan.badgeType || null;
          let badgeLabel = plan.badgeLabel || "";
          if (!badgeType && isFeatured) { badgeType = "recommended"; badgeLabel = "Recommended"; }
          else if (!badgeType && isRightMost) { badgeType = "premium"; badgeLabel = "Full system"; }

          /* ── FEATURED CARD ── */
          if (isFeatured) {
            return (
              <motion.div
                key={plan.id}
                className="
                  relative flex flex-col
                  rounded-[32px]
                  bg-gradient-to-b from-lime-500 to-lime-600
                  p-[3px]
                  md:-mt-6 md:mb-6 md:z-20
                "
                style={{ transformPerspective: 800 }}
                whileHover={{ y: -14, rotateZ: tiltDeg }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="flex h-full flex-col rounded-[28px] bg-[#111318] overflow-hidden">
                  {/* green header */}
                  <div className="flex items-center justify-center bg-lime-500 py-3">
                    <span className="text-sm font-bold text-white">Best value</span>
                  </div>

                  <div className="flex flex-1 flex-col px-7 pt-6 pb-8">
                    {/* badge + pill */}
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <img src={badge.src} alt={plan.name} className={`${badge.h} w-auto object-contain`} />
                      {badgeType === "recommended" && (
                        <div className="inline-flex items-center rounded-full bg-gradient-to-b from-lime-500 to-lime-700 px-3 py-1 text-[11px] font-semibold text-white">
                          <Fire02Icon size={12} className="mr-1" />
                          {badgeLabel}
                        </div>
                      )}
                    </div>

                    {/* name */}
                    <h3 className="text-[2rem] font-light leading-none" style={nameSx}>
                      {plan.name}
                    </h3>

                    {/* subtitle */}
                    <p className="mt-2 text-sm leading-snug text-white/45">{desc}</p>

                    {/* price */}
                    <div className="mt-5 text-4xl sm:text-5xl font-extrabold text-white">
                      {plan.currency === "USD" ? "$" : ""}{plan.price}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-6">
                      <Button
                        type="button"
                        onClick={() => bookPlan(plan)}
                        variant="primary"
                        size="md"
                        className="w-full"
                      >
                        Book this plan
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }

          /* ── SIDE CARDS ── */
          return (
            <motion.div
              key={plan.id}
              className="
                relative flex flex-col
                rounded-[32px]
                border border-lime-500/35
                bg-[radial-gradient(circle_at_top,_rgba(132,204,22,0.22),transparent_55%),_#050505]
                shadow-[0_20px_80px_rgba(0,0,0,0.85)]
                md:mt-2 md:z-10
              "
              style={{ transformPerspective: 800 }}
              whileHover={{ y: -10, rotateZ: tiltDeg }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex h-full flex-col px-7 py-8">
                {/* badge + optional pill */}
                <div className="mb-5 flex items-start justify-between gap-3">
                  <img src={badge.src} alt={plan.name} className={`${badge.h} w-auto object-contain`} />
                  {badgeType === "premium" && (
                    <div className="inline-flex items-center rounded-full bg-gradient-to-b from-indigo-500 to-indigo-700 px-3 py-1 text-[11px] font-semibold text-white">
                      {badgeLabel}
                    </div>
                  )}
                </div>

                {/* name */}
                <h3 className="text-[2rem] font-light leading-none" style={nameSx}>
                  {plan.name}
                </h3>

                {/* subtitle */}
                <p className="mt-2 text-sm leading-snug text-white/45">{desc}</p>

                {/* price */}
                <div className="mt-5 text-4xl sm:text-5xl font-extrabold text-white">
                  {plan.currency === "USD" ? "$" : ""}{plan.price}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-6">
                  <Button
                    type="button"
                    onClick={() => bookPlan(plan)}
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    Book this plan
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── VIEW DELIVERABLES CTA ── */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <Button
          type="button"
          onClick={handleViewDeliverables}
          variant="primary"
          size="md"
          className="gap-2"
        >
          {detailsOpen ? "Hide Deliverables" : "View Deliverables"}
          <span className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`}>
            ↓
          </span>
        </Button>

        <Link
          to="/projects"
          className="text-xs sm:text-sm text-neutral-300 underline underline-offset-4 decoration-neutral-500 hover:text-white hover:decoration-lime-400 transition-colors"
        >
          View samples
        </Link>
      </div>
    </div>
  );
};

export default PlanSelection;
