// src/components/ui/Input.jsx
// The one text input. Spacious by design — never cramped.
import React from "react";

export const fieldClasses = (className = "") =>
  [
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5",
    "text-[15px] text-white placeholder:text-white/35",
    "outline-none transition",
    "focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/15",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  ]
    .filter(Boolean)
    .join(" ");

const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input ref={ref} className={fieldClasses(className)} {...props} />
));
Input.displayName = "Input";

export default Input;
