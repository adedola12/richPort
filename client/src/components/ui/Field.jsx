// src/components/ui/Field.jsx
// Label + control + optional hint/error, so every form lays out the same.
import React from "react";
import Label from "./Label";

const Field = ({ label, hint, error, required, className = "", children }) => (
  <div className={className}>
    {label ? (
      <Label>
        {label}
        {required ? <span className="ml-1 text-[#7BF003]">*</span> : null}
      </Label>
    ) : null}
    {children}
    {error ? (
      <p className="mt-1.5 text-[12.5px] text-rose-300">{error}</p>
    ) : hint ? (
      <p className="mt-1.5 text-[12.5px] text-white/40">{hint}</p>
    ) : null}
  </div>
);

export default Field;
