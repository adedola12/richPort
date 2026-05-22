import React from "react";
import SafeImage from "../common/SafeImage";

const StrategyImg = ({ src, alt = "Strategy visual" }) => {
  return (
    <div className="relative mx-auto w-full max-w-[980px]">
      {/* soft glow */}
      <div className="pointer-events-none absolute -inset-x-6 -inset-y-8 rounded-[28px] bg-emerald-500/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
        <div className="h-[220px] sm:h-[280px] md:h-[340px] w-full">
          <SafeImage
            src={src}
            fallbackSrc=""
            alt={alt}
            loading="lazy"
            imgClassName="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default StrategyImg;
