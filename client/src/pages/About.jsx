import React from "react";
import AboutHero from "../components/About/AboutHero";
import BriefInfo from "../components/About/BriefInfo";
import Journey from "../components/About/Journey";
import Tools from "../components/About/Tools";
import DesignProcess from "../components/Home/DesignProcess";
import BuildSection from "../components/Home/BuildSection";

const About = () => {
  return (
    <div className="text-white bg-[#050505]">
      <AboutHero />
      <BriefInfo />
      <Journey />
      <Tools />
      <DesignProcess />
      <BuildSection />
    </div>
  );
};

export default About;
