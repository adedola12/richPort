// src/pages/About.jsx
import React from "react";
import AboutHero from "../components/About/AboutHero";
import BriefInfo from "../components/About/BriefInfo";
import Journey from "../components/About/Journey";
import Tools from "../components/About/Tools";
import DesignProcess from "../components/Home/DesignProcess";
import BuildSection from "../components/Home/BuildSection";
import SectionReveal from "../components/common/SectionReveal";

const About = () => {
  return (
    <div className="text-white bg-[#050505]">
      <SectionReveal delay={0}>
        <AboutHero />
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <BriefInfo />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <Journey />
      </SectionReveal>

      <SectionReveal delay={0.25}>
        <Tools />
      </SectionReveal>

      <SectionReveal delay={0.3}>
        <DesignProcess />
      </SectionReveal>

      <SectionReveal delay={0.35}>
        <BuildSection />
      </SectionReveal>
    </div>
  );
};

export default About;
