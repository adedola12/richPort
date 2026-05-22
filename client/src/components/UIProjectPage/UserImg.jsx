import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SafeImage from "../common/SafeImage";
import { sanitizeRichHtml, isProbablyHtml } from "../../utils/richTextClean";

const safeArr = (v) => (Array.isArray(v) ? v : []);
const safeStr = (v) => (v == null ? "" : String(v));
const getId = (u, i) => u?.id || u?._id || `${u?.name || "user"}-${i}`;

function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(!!mq.matches);
    update();

    try {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } catch {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);

  return canHover;
}

const spring = { type: "spring", stiffness: 520, damping: 46, mass: 0.9 };

/** Rich text styles for persona descriptions (bullets + spacing) */
const RTE_CSS = `
  .case-rte { white-space: normal; }
  .case-rte p { margin: .35rem 0; }
  .case-rte ul {
    list-style-type: disc !important;
    list-style-position: outside !important;
    padding-left: 1.25rem !important;
    margin: .45rem 0 !important;
  }
  .case-rte ol {
    list-style-type: decimal !important;
    list-style-position: outside !important;
    padding-left: 1.25rem !important;
    margin: .45rem 0 !important;
  }
  .case-rte li { display: list-item !important; margin: .2rem 0 !important; }
  .case-rte a { text-decoration: underline; }
`;

/** idle: bottom depth like figma */
const idleDepth =
  "absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.30)_55%,rgba(0,0,0,0.10)_100%)]";

/** idle: stronger vignette for text readability */
const idleInset =
  "absolute inset-0 shadow-[inset_0_-190px_240px_rgba(0,0,0,0.88)]";

/** active: overall dim + left panel fade */
const activeDim = "absolute inset-0 bg-black/40";
const activeLeftPanel =
  "absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.84)_44%,rgba(0,0,0,0.40)_72%,rgba(0,0,0,0.00)_100%)]";

/** thin right edge vignette (that “dark strip” feel) */
const activeRightEdge =
  "absolute inset-y-0 right-0 w-[36%] bg-[linear-gradient(to_left,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.20)_45%,rgba(0,0,0,0.00)_85%)]";

function MeetLabel({ name, subtitle }) {
  return (
    <div className="absolute left-6 bottom-6 right-6 z-[3]">
      <p className="font-['Outfit'] font-semibold text-[clamp(1.35rem,2.2vw,2.05rem)] leading-[1.05] text-white/90 drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)]">
        Meet {name}
      </p>
      {subtitle ? (
        <p className="mt-1 text-[clamp(.78rem,1.0vw,.95rem)] text-lime-300/90">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Expanded overlay:
 * - left dark panel + readable text (vertically centered)
 * - image stays visible on the right
 * - scroll-safe on smaller screens
 */
function ExpandedOverlay({ user }) {
  const title = safeStr(user?.title || user?.subtitle).trim();
  const aboutRaw = safeStr(user?.about || "");
  const cleaned = useMemo(() => sanitizeRichHtml(aboutRaw), [aboutRaw]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[6]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.14 }}
    >
      <div className={activeDim} />
      <div className={activeLeftPanel} />
      <div className={activeRightEdge} />

      {/* content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-6 sm:px-8 md:px-12">
          <div className="max-w-[48ch]">
            <h3 className="font-['Outfit'] font-semibold text-[clamp(1.55rem,2.7vw,2.55rem)] leading-[1.06] text-white/88 drop-shadow-[0_14px_46px_rgba(0,0,0,0.88)]">
              {title || "User Persona"}
            </h3>

            <div className="mt-4 md:mt-5">
              {cleaned ? (
                isProbablyHtml(cleaned) ? (
                  <div
                    className="case-rte text-[clamp(.92rem,1.05vw,1.05rem)] leading-[1.8] text-white/82 max-h-[220px] sm:max-h-[260px] md:max-h-[290px] overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: cleaned }}
                  />
                ) : (
                  <p className="text-[clamp(.92rem,1.05vw,1.05rem)] leading-[1.8] text-white/82 whitespace-pre-wrap max-h-[220px] sm:max-h-[260px] md:max-h-[290px] overflow-hidden">
                    {cleaned}
                  </p>
                )
              ) : (
                <p className="text-[clamp(.92rem,1.05vw,1.05rem)] leading-[1.8] text-white/65">
                  No description added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PersonaCard({
  user,
  index,
  activeId,
  canHover,
  onHoverIn,
  onHoverOut,
  onToggle,
}) {
  const id = getId(user, index);
  const isActive = id === activeId;
  const anyActive = !!activeId;

  const name = safeStr(user?.name || "User").trim();
  const subtitle = safeStr(user?.subtitle || "").trim();
  const img = safeStr(user?.img || "").trim();

  // Desktop layout exactly like figma: 4/4/4 then 3/6/3
  const span = !anyActive
    ? "md:col-span-4"
    : isActive
      ? "md:col-span-6"
      : "md:col-span-3";

  const shell = [
    "group relative overflow-hidden rounded-[26px]",
    "border bg-white/[0.03]",
    "shadow-[0_28px_95px_rgba(0,0,0,0.66)]",
    "transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60",
    isActive
      ? "border-lime-400/80 shadow-[0_40px_140px_rgba(132,204,22,0.18)]"
      : "border-white/12 hover:-translate-y-[2px] hover:border-white/20",
    anyActive && !isActive ? "md:opacity-[0.97]" : "",
  ].join(" ");

  return (
    <motion.button
      type="button"
      layout
      transition={spring}
      aria-pressed={isActive}
      className={`${shell} w-full text-left col-span-1 ${span}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={(e) => {
        e.preventDefault();
        onToggle(id);
      }}
      onMouseEnter={canHover ? () => onHoverIn(id) : undefined}
      onMouseLeave={canHover ? onHoverOut : undefined}
      onFocus={canHover ? () => onHoverIn(id) : undefined}
      onBlur={canHover ? onHoverOut : undefined}
    >
      <motion.div
        layout
        transition={spring}
        className="relative w-full h-[360px] sm:h-[410px] md:h-[460px]"
      >
        {/* Image */}
        {img ? (
          <SafeImage
            src={img}
            fallbackSrc=""
            alt={name}
            imgClassName={[
              "absolute inset-0 h-full w-full object-cover",
              "transition-transform duration-300",
              // idle: centered portrait look
              !isActive ? "object-center scale-[1.02]" : "",
              // active: shift focus to keep subject on the right like figma
              isActive ? "object-[78%_50%] scale-[1.03]" : "",
              !isActive ? "group-hover:scale-[1.05]" : "",
              // subtle film-like grading
              "brightness-[0.96] contrast-[1.06]",
            ].join(" ")}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_40%_35%,rgba(255,255,255,0.07)_0%,rgba(0,0,0,0.88)_72%)] flex items-center justify-center">
            <span className="text-xs text-white/40">
              No image
            </span>
          </div>
        )}

        {/* Depth */}
        <div className={idleDepth} />
        <div className={idleInset} />

        {/* Bottom label (only when NOT active) */}
        <AnimatePresence>
          {!isActive ? (
            <motion.div
              key="label"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.12 }}
            >
              <MeetLabel name={name} subtitle={subtitle} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Expanded overlay */}
        <AnimatePresence>
          {isActive ? <ExpandedOverlay key="expanded" user={user} /> : null}
        </AnimatePresence>

        {/* Inner ring */}
        <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-white/10" />
      </motion.div>
    </motion.button>
  );
}

export default function UserImg({
  users = [],
  title = "User Personas",
  caption = "Who this experience was designed for.",
}) {
  const list = safeArr(users).filter(Boolean).slice(0, 3);
  const canHover = useCanHover();

  const [hoverId, setHoverId] = useState(null);
  const [lockedId, setLockedId] = useState(null);
  const leaveTimer = useRef(null);

  const activeId = lockedId || hoverId;

  const clearLeaveTimer = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const onHoverIn = (id) => {
    if (!canHover) return;
    if (lockedId) return;
    clearLeaveTimer();
    setHoverId(id);
  };

  const onHoverOut = () => {
    if (!canHover) return;
    if (lockedId) return;
    clearLeaveTimer();
    leaveTimer.current = setTimeout(() => setHoverId(null), 80);
  };

  const onToggle = (id) => {
    // tap/click to lock open (mobile + desktop)
    clearLeaveTimer();
    setHoverId(null);
    setLockedId((prev) => (prev === id ? null : id));
  };

  // ESC closes any active state
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setLockedId(null);
        setHoverId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => clearLeaveTimer(), []);

  if (!list.length) return null;

  return (
    <section className="relative w-full">
      <style>{RTE_CSS}</style>

      <div className="mx-auto w-full max-w-6xl px-4 md:px-0">
        {/* Title + caption aligns like your screenshot (left aligned) */}
        <div className="space-y-1">
          <h2 className="font-['Outfit'] text-[clamp(1.6rem,2.4vw,2.2rem)] font-semibold text-white/90">
            {title}
          </h2>
          {caption ? (
            <p className="text-[clamp(.85rem,1.0vw,.98rem)] text-white/60">
              {caption}
            </p>
          ) : null}
        </div>

        <motion.div
          layout
          transition={spring}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5 md:gap-6"
        >
          {list.map((u, i) => (
            <PersonaCard
              key={getId(u, i)}
              user={u}
              index={i}
              activeId={activeId}
              canHover={canHover}
              onHoverIn={onHoverIn}
              onHoverOut={onHoverOut}
              onToggle={onToggle}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
