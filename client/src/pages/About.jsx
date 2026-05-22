// src/pages/About.jsx
import React from "react";
import AboutHero from "../components/About/AboutHero";
import Tools from "../components/About/Tools";
import DesignProcess from "../components/Home/DesignProcess";
import BuildSection from "../components/Home/BuildSection";
import ShortIntro from "../components/About/ShortIntro";
import WorkExp from "../components/About/WorkExp";

const About = () => {
  return (
    <div className="text-white bg-[#050505]">
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
