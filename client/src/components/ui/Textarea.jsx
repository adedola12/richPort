// src/components/ui/Textarea.jsx
// Roomy multiline field — tall enough to write in comfortably.
import React from "react";
import { fieldClasses } from "./Input";

const Textarea = React.forwardRef(({ className = "", rows = 5, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={fieldClasses(`min-h-[140px] resize-y leading-relaxed ${className}`)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export default Textarea;
