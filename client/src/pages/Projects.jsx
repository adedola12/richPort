import React from "react";
import ProjectHero from "../components/Project/ProjectHero";
import WorkImg from "../components/Home/WorkImg";
import ProjectGrid from "../components/Home/ProjectGrid";
import BuildSection from "../components/Home/BuildSection";

const Projects = () => {
  return (
    <div className="text-white bg-[#050505]">
      <ProjectHero />
      <WorkImg />
      <ProjectGrid />
      <BuildSection />
    </div>
  );
};

export default Projects;
