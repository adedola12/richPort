// src/pages/RateDetails.jsx
import React from "react";
import RateHero from "../components/Rate/RateHero";
import BrandIdentity from "../components/Rate/BrandIdentity";
import RateCTA from "../components/Rate/RateCTA";
import RateForm from "../components/Rate/RateForm";
import SectionReveal from "../components/common/SectionReveal";

const RateDetails = () => {
  return (
    <div className="text-white bg-[#050505]">
      <SectionReveal delay={0}>
        <RateHero />
      </SectionReveal>

      <BrandIdentity />

      <SectionReveal delay={0.2}>
        <RateCTA />
      </SectionReveal>

      <SectionReveal delay={0.25}>
        <RateForm />
      </SectionReveal>
    </div>
  );
};

export default RateDetails;
