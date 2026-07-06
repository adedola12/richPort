import React from "react";
import SafeImage from "../common/SafeImage";
import HeroImgMock from "../../assets/UIPage/HeroImgMock.webp";

const HeroImg = ({ src, alt = "Hero image" }) => {
  return (
    <div className="flex justify-center">
      <div className="relative mx-auto max-w-[1222px] aspect-[4/5] sm:aspect-[1222/631]">
        <div className="pointer-events-none absolute inset-[-28px] rounded-[46px] bg-lime-400/18 blur-3xl" />

        <div className="relative h-full w-full rounded-[32px] border-1 border-lime-500 bg-black/20 shadow-[0_0_40px_rgba(0,0,0,0.85)] overflow-hidden">
          <SafeImage
            src={src}
            fallbackSrc={HeroImgMock}
            alt={alt}
            loading="eager"
            draggable={false}
            imgClassName="w-full h-full object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroImg;
