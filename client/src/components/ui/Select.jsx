// src/components/ui/Select.jsx
// Native select styled to match Input, with a custom chevron so it doesn't
// look like a raw browser control. Options render on a dark sheet.
import React from "react";
import { ArrowDown01Icon } from "hugeicons-react";
import { fieldClasses } from "./Input";

const Select = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <div className={`relative ${className}`}>
    <select
      ref={ref}
      className={fieldClasses(
        "appearance-none pr-10 [&>option]:bg-[#101216] [&>option]:text-white"
      )}
      {...props}
    >
      {children}
    </select>
    <ArrowDown01Icon
      size={18}
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/45"
    />
  </div>
));
Select.displayName = "Select";

export default Select;
