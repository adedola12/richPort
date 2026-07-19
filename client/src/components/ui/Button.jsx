// src/components/ui/Button.jsx
// The one button for the whole site. variant="primary" is the signature
// lime-gradient CTA (same look as the nav Contact button); secondary/ghost
// cover everything else so no page hand-rolls its own button again.
import React from "react";
import { motion } from "framer-motion";

const VARIANTS = {
  // Brand gradient from the Figma spec: #7BF003 (top) → #3E7B00 (bottom).
  primary:
    "bg-gradient-to-b from-[#7BF003] to-[#3E7B00] font-bold text-black " +
    "shadow-[0_0_18px_rgba(123,240,3,0.4)] " +
    "hover:from-[#8DFF1F] hover:to-[#4A9400] hover:shadow-[0_0_28px_rgba(123,240,3,0.55)]",
  // Outline partner to primary (the "Rate Card" style): green border, green text.
  secondary:
    "border-2 border-[#5DB402] bg-transparent font-bold text-[#7BF003] " +
    "hover:bg-[#7BF003]/10 hover:border-[#7BF003]",
  ghost:
    "font-semibold text-white/65 hover:bg-white/[0.06] hover:text-white",
  danger:
    "border border-rose-400/30 bg-rose-500/10 font-semibold text-rose-300 " +
    "hover:border-rose-400/50 hover:bg-rose-500/20",
};

const SIZES = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-[15px]",
  none: "", // caller supplies its own padding via className
};

// For <a> / <Link> elements that need to look like a button.
export const buttonClasses = (variant = "primary", size = "md", className = "") =>
  [
    "inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-lg transition",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

const Button = React.forwardRef(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 20 }}
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {children}
    </motion.button>
  )
);
Button.displayName = "Button";

export default Button;
