import React from "react";
import SafeImage from "../common/SafeImage";
import MainImgMock from "../../assets/UIPage/MainImgMock.jpg";

const HEIGHTS = {
  full: "aspect-[4/5] sm:aspect-auto sm:h-[300px] md:h-[380px] lg:h-[440px]",
  narrow: "aspect-[4/5] sm:aspect-auto sm:h-[220px] md:h-[260px] lg:h-[300px]",
};

const FRAMES = {
  clean: {
    glow: "hidden",
    card: "rounded-[22px] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.65)]",
    inner: "shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]",
  },
  lime: {
    glow: "block pointer-events-none absolute -inset-8 rounded-[36px] bg-lime-400/16 blur-3xl",
    card: "rounded-[22px] border-2 border-lime-500/70 bg-black/25 shadow-[0_24px_90px_rgba(0,0,0,0.75)]",
    inner: "shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]",
  },
};

const MainImg = ({
  src,
  alt = "Main visual",
  variant = "full",
  frame = "clean",
  className = "",
}) => {
  const h = HEIGHTS[variant] ?? HEIGHTS.full;
  const f = FRAMES[frame] ?? FRAMES.clean;

  return (
    <div className={`w-full ${className}`}>
      <div className={`relative w-full ${h}`}>
        <div className={f.glow} />

        <div className={`relative h-full w-full overflow-hidden ${f.card}`}>
          <div className={`pointer-events-none absolute inset-0 ${f.inner}`} />

          <SafeImage
            src={src}
            fallbackSrc={MainImgMock}
            alt={alt}
            loading="lazy"
            draggable={false}
            imgClassName="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MainImg;
