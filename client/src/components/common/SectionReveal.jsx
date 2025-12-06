// src/components/common/SectionReveal.jsx
import React from "react";
import { motion } from "framer-motion";

const baseVariants = {
  hidden: {
    opacity: 0,
    y: 80, // slide up from below
    rotateX: 20, // slight wheel / tilt
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const SectionReveal = ({ children, delay = 0 }) => {
  return (
    <div
      className="relative"
      style={{
        perspective: "1200px", // 3D wheel feel
      }}
    >
      <motion.section
        className="will-change-transform origin-center"
        variants={baseVariants}
        initial="hidden"
        whileInView="visible"
        // 👇 Re-animate every time it comes into view, up or down
        viewport={{
          once: false,
          amount: 0.25, // ~25% of section must be visible to trigger
        }}
        transition={{
          ...baseVariants.visible.transition,
          delay,
        }}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default SectionReveal;
