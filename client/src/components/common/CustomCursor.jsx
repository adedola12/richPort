import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Dot tracks cursor with slight smoothing
  const dotX = useSpring(mx, { stiffness: 700, damping: 38 });
  const dotY = useSpring(my, { stiffness: 700, damping: 38 });

  // Glow orb lags behind for a trailing light effect
  const glowX = useSpring(mx, { stiffness: 160, damping: 20 });
  const glowY = useSpring(my, { stiffness: 160, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e) => {
      const el = e.target;
      const clickable =
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[role='button']") ||
        el.closest("input") ||
        el.closest("textarea") ||
        el.closest("select") ||
        (el.style && el.style.cursor === "pointer");
      setIsPointer(!!clickable);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isVisible]);

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      {/* Outer trailing glow — soft, lagging */}
      <motion.div
        style={{
          position: "fixed",
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
          borderRadius: "50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isPointer ? 72 : 52,
          height: isPointer ? 72 : 52,
        }}
        transition={{ opacity: { duration: 0.2 }, width: { duration: 0.2 }, height: { duration: 0.2 } }}
        className="bg-transparent"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(132,204,22,0.22) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Inner glowing dot */}
      <motion.div
        style={{
          position: "fixed",
          left: dotX,
          top: dotY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          borderRadius: "50%",
          background: "#84cc16",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isPointer ? 14 : 9,
          height: isPointer ? 14 : 9,
          boxShadow: isPointer
            ? "0 0 10px #84cc16, 0 0 22px rgba(132,204,22,0.85), 0 0 44px rgba(132,204,22,0.35)"
            : "0 0 7px #84cc16, 0 0 14px rgba(132,204,22,0.65)",
        }}
        transition={{ opacity: { duration: 0.15 }, width: { duration: 0.18 }, height: { duration: 0.18 }, boxShadow: { duration: 0.18 } }}
      />
    </>
  );
};

export default CustomCursor;
