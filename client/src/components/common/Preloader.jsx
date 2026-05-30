// src/components/common/Preloader.jsx
import React from "react";
import { motion } from "framer-motion";

const Preloader = () => (
  <motion.div
    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505]"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
  >
    {/* Monogram */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
      className="mb-7"
    >
      <span
        className="text-[52px] font-bold tracking-[-0.04em]"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #6b6b6b 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        RE
      </span>
    </motion.div>

    {/* Progress track */}
    <motion.div
      className="w-[100px] h-[2px] rounded-full overflow-hidden bg-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <motion.div
        className="h-full rounded-full bg-lime-400"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
      />
    </motion.div>

    {/* Name label */}
    <motion.p
      className="mt-5 text-[10px] font-semibold tracking-[0.3em] uppercase text-white/25"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.4 }}
    >
      Richard Enoch
    </motion.p>
  </motion.div>
);

export default Preloader;
