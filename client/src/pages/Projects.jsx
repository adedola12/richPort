// src/pages/Projects.jsx
import React from "react";
import ProjectHero from "../components/Project/ProjectHero";
import WorkImg from "../components/Home/WorkImg";
import ProjectGrid from "../components/Home/ProjectGrid";
import BuildSection from "../components/Home/BuildSection";
import SectionReveal from "../components/common/SectionReveal";

const Projects = () => {
  return (
    <div className="text-white bg-[#050505]">
      <SectionReveal delay={0}>
        <ProjectHero />
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <WorkImg />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <ProjectGrid />
      </SectionReveal>

      <SectionReveal delay={0.25}>
        <BuildSection />
      </SectionReveal>
    </div>
  );
};

export default Projects;
