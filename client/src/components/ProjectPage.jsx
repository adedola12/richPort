// src/components/ProjectPage.jsx (or src/pages/ProjectPage.jsx)
import React from "react";
import { useParams } from "react-router-dom";
import projects from "../data/projectsData";

import ProjectDetailsHero from "./ProjectPage/ProjectDetailsHero";
import MainImg from "./ProjectPage/MainImg";
import ProjectWriteUp from "./ProjectPage/ProjectWriteUp";
import ProjectImg from "./ProjectPage/ProjectImg";
import OtherProj from "./ProjectPage/OtherProj";
import BuildSection from "./Home/BuildSection";
import ProjectConc from "./ProjectPage/ProjectConc";
import DiscoverImg from "./ProjectPage/DiscoverImg";

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] pt-32 text-center text-white">
        <p className="text-lg font-['Lexend']">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="text-white bg-[#050505]">
      {/* As we build these components, just pass the project object in */}
      <ProjectDetailsHero project={project} />
      <MainImg project={project} />
      <ProjectWriteUp project={project} />
      <ProjectImg project={project} />
      <ProjectConc project={project} />
      <DiscoverImg project={project} />
      <OtherProj currentSlug={project.slug} />
      <BuildSection />
    </div>
  );
};

export default ProjectPage;
