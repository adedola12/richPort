// src/components/GraphicDesignPage/GraphicGallery.jsx
import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

/**
 * ✅ CARD LOOK (keeps your “flat-bottom frame”)
 */
const CARD_TWEAK = {
  outerRTop: 22,
  outerRBottom: 10,
  innerRTop: 16,
  innerRBottom: 0,
  padX: 10,
  padTop: 10,
  padBottom: 0,
  innerRingInset: 6,
};

/**
 * ✅ STRONGER 3D HOVER POP + TILT (more “bend” obvious)
 */
const TILT = {
  perspective: 760, // lower = more dramatic
  maxRotate: 22, // stronger tilt “bend”
  maxZRotate: 4, // subtle extra roll
  popScale: 1.13,
  popLift: 26,
  popZ: 92,
};

/**
 * ✅ When ONE card is hovered, other cards subtly “recede”
 * + “narrow” effect (scaleX)
 */
const AMBIENT = {
  recedeScale: 0.985,
  recedeScaleX: 0.965, // <- makes others a bit narrower
  recedeY: 8,
  recedeZ: -34,
};

const MODAL_ANIM = {
  durationMs: 220,
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function useBodyScrollLock(locked) {
  React.useEffect(() => {
    if (!locked) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0)
      document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [locked]);
}

/**
 * Presence helper so we can animate OUT before unmounting
 */
function usePresence(open, durationMs = 200) {
  const [mounted, setMounted] = React.useState(open);
  const [visible, setVisible] = React.useState(open);

  React.useEffect(() => {
    let t;

    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      t = setTimeout(() => setMounted(false), durationMs);
    }

    return () => clearTimeout(t);
  }, [open, durationMs]);

  return { mounted, visible };
}

function ImgCard({
  src,
  hiddenOnMobile,
  isFeatured,
  onOpen,
  dimmed,
  onHoverChange,
}) {
  const t = CARD_TWEAK;

  const outerRadius = `${t.outerRTop}px ${t.outerRTop}px ${t.outerRBottom}px ${t.outerRBottom}px`;
  const innerRadius = `${t.innerRTop}px ${t.innerRTop}px ${t.innerRBottom}px ${t.innerRBottom}px`;

  const rootRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const hoveredRef = React.useRef(false);

  const baseTransform = `perspective(${TILT.perspective}px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0px) translateZ(0px) scale(1) scaleX(1)`;
  const dimTransform = `perspective(${TILT.perspective}px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(${AMBIENT.recedeY}px) translateZ(${AMBIENT.recedeZ}px) scale(${AMBIENT.recedeScale}) scaleX(${AMBIENT.recedeScaleX})`;

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // light position for shine
    el.style.setProperty("--hx", "50%");
    el.style.setProperty("--hy", "35%");

    // parallax values for inner layers
    el.style.setProperty("--imgZ", "12px");
    el.style.setProperty("--imgScale", "1");
    el.style.setProperty("--ringZ", "52px");
    el.style.setProperty("--hintZ", "78px");

    el.style.transform = baseTransform;
  }, []);

  // ✅ when another card is hovered, this card recedes + gets slightly narrower
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (hoveredRef.current) return;

    el.style.transition =
      "transform 260ms cubic-bezier(.2,.8,.2,1), opacity 240ms ease, filter 240ms ease";
    el.style.transform = dimmed ? dimTransform : baseTransform;

    // also soften inner depth when dimmed
    if (dimmed) {
      el.style.setProperty("--imgZ", "10px");
      el.style.setProperty("--imgScale", "0.995");
    } else {
      el.style.setProperty("--imgZ", "12px");
      el.style.setProperty("--imgScale", "1");
    }
  }, [dimmed, dimTransform, baseTransform]);

  const applyTilt = React.useCallback((clientX, clientY) => {
    const el = rootRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = clamp((clientX - r.left) / r.width, 0, 1);
    const py = clamp((clientY - r.top) / r.height, 0, 1);

    // more obvious bend
    const rotY = (px - 0.5) * 2 * TILT.maxRotate;
    const rotX = (0.5 - py) * 2 * TILT.maxRotate;

    // subtle roll adds “3D bend” feeling
    const roll = (px - 0.5) * 2 * TILT.maxZRotate;

    el.style.setProperty("--hx", `${px * 100}%`);
    el.style.setProperty("--hy", `${py * 100}%`);

    // push inner image more forward on hover
    el.style.setProperty("--imgZ", "34px");
    el.style.setProperty("--imgScale", "1.05");

    el.style.transform = `perspective(${TILT.perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${roll}deg) translateY(-${TILT.popLift}px) translateZ(${TILT.popZ}px) scale(${TILT.popScale}) scaleX(1)`;
  }, []);

  const onPointerEnter = (e) => {
    if (e.pointerType === "touch") return;

    hoveredRef.current = true;
    onHoverChange?.(true);

    const el = rootRef.current;
    if (!el) return;

    el.style.zIndex = "60";
    el.style.transition =
      "transform 120ms ease-out, box-shadow 180ms ease-out, border-color 180ms ease-out, filter 180ms ease-out";

    applyTilt(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    if (e.pointerType === "touch") return;
    if (!hoveredRef.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = rootRef.current;
      if (!el) return;
      el.style.transition = "transform 0ms";
      applyTilt(e.clientX, e.clientY);
    });
  };

  const onPointerLeave = () => {
    hoveredRef.current = false;
    onHoverChange?.(false);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const el = rootRef.current;
    if (!el) return;

    el.style.transition =
      "transform 380ms cubic-bezier(.2,.8,.2,1), box-shadow 280ms ease-out, border-color 280ms ease-out, filter 280ms ease-out";
    el.style.transform = dimmed ? dimTransform : baseTransform;

    el.style.setProperty("--hx", "50%");
    el.style.setProperty("--hy", "35%");
    el.style.setProperty("--imgZ", dimmed ? "10px" : "12px");
    el.style.setProperty("--imgScale", dimmed ? "0.995" : "1");

    el.style.zIndex = "0";
  };

  // keyboard focus should behave like hover
  const onFocus = () => onHoverChange?.(true);
  const onBlur = () => onHoverChange?.(false);

  return (
    <div
      ref={rootRef}
      className={[
        hiddenOnMobile ? "hidden sm:block" : "",
        "group relative isolate h-full w-full",
        "border border-white/10 bg-white/[0.02]",
        "shadow-[0_22px_70px_rgba(0,0,0,0.70)]",
        "will-change-transform",
        "cursor-pointer select-none",
        "hover:border-lime-400/30",
        "hover:shadow-[0_50px_150px_rgba(0,0,0,0.86),0_26px_130px_rgba(34,197,94,0.20)]",
        dimmed ? "opacity-[0.82] saturate-[0.92]" : "opacity-100",
      ].join(" ")}
      style={{ borderRadius: outerRadius, transformStyle: "preserve-3d" }}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onOpen}
      onFocus={onFocus}
      onBlur={onBlur}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen?.();
      }}
    >
      {/* ground shadow */}
      <div
        className={[
          "pointer-events-none absolute inset-x-3 -bottom-3 h-11 rounded-full",
          "bg-black/70 blur-2xl opacity-35",
          "transition duration-300 ease-out",
          "group-hover:opacity-80 group-hover:scale-110",
        ].join(" ")}
        style={{ transform: "translateZ(-50px)" }}
      />

      {/* outer highlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: outerRadius,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.085)",
          transform: "translateZ(10px)",
        }}
      />

      {/* stronger shine overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          borderRadius: outerRadius,
          backgroundImage:
            "radial-gradient(360px circle at var(--hx) var(--hy), rgba(255,255,255,0.24), transparent 64%)",
          mixBlendMode: "screen",
          transform: "translateZ(68px)",
        }}
      />

      {/* frame padding */}
      <div
        className="relative h-full w-full"
        style={{
          paddingLeft: t.padX,
          paddingRight: t.padX,
          paddingTop: t.padTop,
          paddingBottom: t.padBottom,
          transform: "translateZ(26px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={[
            "relative h-full w-full overflow-hidden",
            "border border-white/10 bg-black/35",
            "shadow-[0_18px_62px_rgba(0,0,0,0.62)]",
            "transition-colors duration-200",
            "group-hover:border-lime-400/25",
          ].join(" ")}
          style={{ borderRadius: innerRadius, transformStyle: "preserve-3d" }}
        >
          {/* top edge glow */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-lime-400/35 opacity-85"
            style={{ transform: "translateZ(44px)" }}
          />

          <img
            src={src}
            alt=""
            loading="lazy"
            draggable="false"
            className={[
              "h-full w-full object-cover",
              "transition duration-500 ease-out",
              isFeatured ? "grayscale-0" : "grayscale",
              "group-hover:grayscale-0",
              "group-hover:saturate-[1.34] group-hover:contrast-[1.12] group-hover:brightness-[1.07]",
            ].join(" ")}
            style={{
              transform: "translateZ(var(--imgZ)) scale(var(--imgScale))",
              transformStyle: "preserve-3d",
            }}
          />

          {/* vignette */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_28%,transparent_0%,rgba(0,0,0,0.42)_70%,rgba(0,0,0,0.78)_100%)]"
            style={{ transform: "translateZ(26px)" }}
          />

          {/* inner ring */}
          <div
            className="pointer-events-none absolute border border-white/10 transition-colors duration-200 group-hover:border-white/15"
            style={{
              left: t.innerRingInset,
              right: t.innerRingInset,
              top: t.innerRingInset,
              bottom: t.innerRingInset,
              borderRadius: innerRadius,
              transform: "translateZ(var(--ringZ))",
            }}
          />

          {/* hover hint (bigger + more obvious) */}
          <div
            className={[
              "pointer-events-none absolute bottom-3 left-3",
              "rounded-full border border-white/16 bg-white/[0.12] px-3.5 py-1.5",
              "text-[10px] text-white/85",
              "opacity-0 translate-y-2 scale-[0.98] transition duration-200",
              "group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100",
            ].join(" ")}
            style={{ transform: "translateZ(var(--hintZ))" }}
          >
            Click to view
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewerModal({ open, index, total, src, onClose, onPrev, onNext }) {
  const { mounted, visible } = usePresence(open, MODAL_ANIM.durationMs);

  React.useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onNext, onPrev]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close image viewer"
        onClick={onClose}
        className="absolute inset-0 z-0 cursor-zoom-out"
        style={{
          opacity: visible ? 1 : 0,
          transitionProperty: "opacity",
          transitionDuration: `${MODAL_ANIM.durationMs}ms`,
          transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <span className="absolute inset-0 bg-black/55 backdrop-blur-xl" />
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_0%,rgba(255,255,255,0.16)_0%,transparent_60%)] opacity-90" />
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08)_0%,transparent_22%,transparent_78%,rgba(255,255,255,0.06)_100%)] opacity-70" />
      </button>

      {/* CONTENT */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-6 pointer-events-none">
        <div
          className="relative pointer-events-auto"
          style={{
            transform: visible
              ? "scale(1) translateY(0px)"
              : "scale(0.985) translateY(10px)",
            opacity: visible ? 1 : 0,
            transitionProperty: "transform, opacity",
            transitionDuration: `${MODAL_ANIM.durationMs}ms`,
            transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs text-white/70">
              {total ? `${index + 1} / ${total}` : ""}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/12 bg-white/[0.10] px-3 py-2 text-xs text-white/85 hover:bg-white/[0.14]"
            >
              Close
            </button>
          </div>

          {/* ✅ bigger modal frame */}
          <div className="relative rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-md shadow-[0_36px_150px_rgba(0,0,0,0.68)]">
            <div className="p-2 sm:p-3">
              <img
                src={src}
                alt=""
                draggable="false"
                loading="eager"
                decoding="async"
                className="block max-h-[88dvh] sm:max-h-[90dvh] max-w-[96vw] object-contain select-none"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]" />

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/14 bg-white/[0.10] px-4 py-3 text-white/90 hover:bg-white/[0.16]"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/14 bg-white/[0.10] px-4 py-3 text-white/90 hover:bg-white/[0.16]"
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="mt-3 flex justify-center">
            <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] text-white/60">
              Click outside to close • ← → to navigate • Esc to close
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function GraphicGallery({ items = [] }) {
  const safe = Array.isArray(items) ? items : [];
  const galleryItems = React.useMemo(() => safe.slice(0, 50), [safe]);
  const total = galleryItems.length;

  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // ✅ “others react” state (narrow + recede)
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  useBodyScrollLock(viewerOpen);

  const openViewer = (i) => {
    setActiveIndex(i);
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  const next = React.useCallback(() => {
    if (!total) return;
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = React.useCallback(() => {
    if (!total) return;
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const activeSrc = galleryItems?.[activeIndex]?.src;

  return (
    <section className="relative bg-[#070707] pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_0%,rgba(0,0,0,0.78)_82%)]" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-8 pt-10">
        {/* Gallery heading */}
        <motion.h2
          className="mb-8 font-['Outfit'] text-[24px] sm:text-[28px] font-semibold text-white"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Gallery
        </motion.h2>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 sm:gap-5 overflow-visible">
          {galleryItems.map((item, i) => {
            const hiddenOnMobile = i >= 16;
            const isFeatured = i === 0;

            const anyHovered = hoveredIndex !== null;
            const dimmed = anyHovered && hoveredIndex !== i;

            return (
              <motion.div
                key={item.id || i}
                className="relative aspect-[3/4] overflow-visible"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 0.61, 0.36, 1],
                  delay: Math.min(i * 0.04, 0.6),
                }}
              >
                <ImgCard
                  src={item.src}
                  hiddenOnMobile={hiddenOnMobile}
                  isFeatured={isFeatured}
                  dimmed={dimmed}
                  onHoverChange={(isHovering) => {
                    setHoveredIndex(isHovering ? i : null);
                  }}
                  onOpen={() => openViewer(i)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <ViewerModal
        open={viewerOpen}
        index={activeIndex}
        total={total}
        src={activeSrc}
        onClose={closeViewer}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}
