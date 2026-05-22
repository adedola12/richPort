import React from "react";
import SafeImage from "../common/SafeImage";
import FeatureMock from "../../assets/UIPage/FeatureMock.png";

const FeatureImg = ({ src, alt = "Features mock" }) => {
  return (
    <div className="relative mx-auto w-full max-w-[980px]">
      <div className="pointer-events-none absolute -inset-x-6 -inset-y-8 rounded-[28px] bg-lime-400/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.02] shadow-[0_18px_60px_rgba(0,0,0,0.7)]">
        <div className="h-[210px] sm:h-[260px] md:h-[320px] w-full">
          <SafeImage
            src={src}
            fallbackSrc={FeatureMock}
            alt={alt}
            loading="lazy"
            imgClassName="
              h-full w-full
              object-cover
              object-[50%_72%] sm:object-[50%_74%] md:object-[50%_76%]
            "
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureImg;
