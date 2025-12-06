// src/pages/RateDetails.jsx
import React from "react";
import RateHero from "../components/Rate/RateHero";
import BrandIdentity from "../components/Rate/BrandIdentity";
import RateCTA from "../components/Rate/RateCTA";
import RateForm from "../components/Rate/RateForm";

const RateDetails = () => {
  return (
    <div className="text-white bg-[#050505]">
      <RateHero />
      <BrandIdentity />
      <RateCTA />

      <RateForm />
    </div>
  );
};

export default RateDetails;
