// src/pages/About.jsx
import React from "react";
import AboutHero from "../components/About/AboutHero";
import Tools from "../components/About/Tools";
import DesignProcess from "../components/Home/DesignProcess";
import BuildSection from "../components/Home/BuildSection";
import ShortIntro from "../components/About/ShortIntro";
import WorkExp from "../components/About/WorkExp";
import PageMeta from "../components/common/PageMeta";

const About = () => {
  return (
    <div className="text-white bg-[#050505]">
      <PageMeta
        title="About"
        description="Richard Enoch — visual designer and product thinker with 6 years across brand identity, UI/UX, and construction technology. Trained Quantity Surveyor."
        url="/about"
      />
      <AboutHero />
      <ShortIntro />
      <WorkExp />
      <Tools />
      <DesignProcess />
      <BuildSection />
    </div>
  );
};

export default About;
