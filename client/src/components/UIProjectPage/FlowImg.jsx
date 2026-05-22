import React from "react";
import SafeImage from "../common/SafeImage";
import FlowMock from "../../assets/UIPage/FlowMock.png";

const FlowImg = ({ src, alt = "User flows" }) => {
  return (
    <div className="relative mx-auto w-full max-w-[980px]">
      <div className="pointer-events-none absolute inset-[-18px] rounded-[36px] bg-white/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-[22px] sm:rounded-[26px] md:rounded-[30px] border border-white/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
        <SafeImage
          src={src}
          fallbackSrc={FlowMock}
          alt={alt}
          imgClassName="block w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default FlowImg;
