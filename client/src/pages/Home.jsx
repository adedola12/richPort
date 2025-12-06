// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Home/Hero";
import WorkImg from "../components/Home/WorkImg";
import AboutMe from "../components/Home/AboutMe";
import Services from "../components/Home/Services";
import Partners from "../components/Home/Partners";
import DesignProcess from "../components/Home/DesignProcess";
import BuildSection from "../components/Home/BuildSection";
import SectionReveal from "../components/common/SectionReveal";

const Home = () => {
  return (
    <div className="text-white bg-[#050505]">
      <SectionReveal delay={0}>
        <Hero />
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <WorkImg />
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <AboutMe />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <Services />
      </SectionReveal>

      <SectionReveal delay={0.25}>
        <Partners />
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

export default Home;
