// src/components/common/GlowButton.jsx
// Primary CTA — now a thin alias over the shared Button primitive so the
// lime gradient is defined in exactly one place (components/ui/Button.jsx).
// size="none": existing call sites keep supplying their own padding.
import React from "react";
import Button from "../ui/Button";

const GlowButton = ({ children, className = "", ...props }) => (
  <Button variant="primary" size="none" className={className} {...props}>
    {children}
  </Button>
);

export default GlowButton;
