// src/pages/RateDetails.jsx
import React from "react";
import RateHero from "../components/Rate/RateHero";
import BrandIdentity from "../components/Rate/BrandIdentity";
import BuildSection from "../components/Home/BuildSection";
import SectionReveal from "../components/common/SectionReveal";

const RateDetails = () => {
  return (
    <div className="text-white bg-black">
      <SectionReveal delay={0}>
        <RateHero />
      </SectionReveal>

      <div className="-mt-24 relative z-10">
        <BrandIdentity />
      </div>

      <SectionReveal delay={0.2}>
        <BuildSection />
      </SectionReveal>
    </div>
  );
};

export default RateDetails;
