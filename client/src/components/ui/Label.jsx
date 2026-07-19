// src/components/ui/Label.jsx
import React from "react";

const Label = ({ className = "", children, ...props }) => (
  <label
    className={`mb-2 block text-[13px] font-semibold tracking-wide text-white/70 ${className}`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
