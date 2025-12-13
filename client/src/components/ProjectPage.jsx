// src/components/ProjectPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localProjects from "../data/projectsData";

import ProjectDetailsHero from "./ProjectPage/ProjectDetailsHero";
import MainImg from "./ProjectPage/MainImg";
import ProjectWriteUp from "./ProjectPage/ProjectWriteUp";
import ProjectImg from "./ProjectPage/ProjectImg";
import OtherProj from "./ProjectPage/OtherProj";
import BuildSection from "./Home/BuildSection";
import ProjectConc from "./ProjectPage/ProjectConc";
import DiscoverImg from "./ProjectPage/DiscoverImg";
// ❌ remove SectionReveal import
// import SectionReveal from "./common/SectionReveal";

const API_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";

const ProjectPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    const loadProject = async () => {
      if (!API_BASE) {
        const local = localProjects.find((p) => p.slug === slug);
        if (local) {
          setProject(local);
          setStatus({ loading: false, error: "" });
        } else {
          setStatus({ loading: false, error: "Project not found." });
        }
        return;
      }

      try {
        setStatus({ loading: true, error: "" });
        const res = await fetch(`${API_BASE}/api/projects/slug/${slug}`);
        if (res.status === 404) {
          setStatus({ loading: false, error: "Project not found." });
          setProject(null);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        setProject(data);
        setStatus({ loading: false, error: "" });
      } catch (err) {
        console.error("ProjectPage fetch error:", err);
        setStatus({
          loading: false,
          error: "Failed to load project. Please try again.",
        });
      }
    };

    loadProject();
  }, [slug]);

  if (status.loading) {
    return (
      <div className="min-h-screen bg-[#050505] pt-32 text-center text-white">
        <p className="text-sm font-['Lexend']">Loading project…</p>
      </div>
    );
  }

  if (status.error || !project) {
    return (
      <div className="min-h-screen bg-[#050505] pt-32 text-center text-white">
        <p className="text-lg font-['Lexend']">
          {status.error || "Project not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="text-white bg-[#050505]" key={project.slug}>
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
