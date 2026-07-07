// src/components/common/GlowButton.jsx
// Primary CTA — matches the nav Contact button (lime gradient, black text)
// with a springy hover lift and press squash.
import React from "react";
import { motion } from "framer-motion";

const GlowButton = ({ children, className = "", ...props }) => (
  <motion.button
    whileHover={{ y: -2, scale: 1.02 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 420, damping: 20 }}
    className={`rounded-xl bg-gradient-to-b from-lime-400 to-lime-600 font-bold text-black shadow-[0_0_18px_rgba(132,204,22,0.5)] hover:from-lime-300 hover:to-lime-500 hover:shadow-[0_0_28px_rgba(132,204,22,0.65)] disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export default GlowButton;
