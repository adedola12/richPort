// src/pages/RateDetails.jsx
import React from "react";
import RateHero from "../components/Rate/RateHero";
import BrandIdentity from "../components/Rate/BrandIdentity";
import BuildSection from "../components/Home/BuildSection";
import SectionReveal from "../components/common/SectionReveal";
import PageMeta from "../components/common/PageMeta";

const RateDetails = () => {
  return (
    <div className="text-white bg-black">
      <PageMeta
        title="Rate Details"
        description="View Richard Enoch's design packages and pricing — brand identity, UI/UX, graphic design, and more. Choose the plan that fits your project."
        url="/rate-details"
      />
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
