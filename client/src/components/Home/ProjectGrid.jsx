// src/components/Home/ProjectGrid.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
  "All",
  "Brand Identity",
  "Website Designs",
  "Product UI/UX Designs",
  "Graphic Designs",
];

const API_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";
const PUBLIC_PROJECTS_URL = API_BASE ? `${API_BASE}/api/projects` : "";

/**
 * contained = true:
 *   - adds max-width 1200px
 *   - centers the block
 *   - wraps grid in rounded glass card
 */
const ProjectGrid = ({ contained = true, excludeSlug }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]); // "All"
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [visibleCount, setVisibleCount] = useState(4); // show 4 by default
  const navigate = useNavigate();

  useEffect(() => {
    if (!PUBLIC_PROJECTS_URL) {
      setStatus({ loading: false, error: "Projects API not configured." });
      setProjects([]);
      return;
    }

    const fetchProjects = async () => {
      try {
        setStatus({ loading: true, error: "" });
        const res = await fetch(PUBLIC_PROJECTS_URL, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
        setStatus({ loading: false, error: "" });
      } catch (err) {
        console.error("ProjectGrid fetch error:", err);
        setStatus({
          loading: false,
          error: "Unable to load projects right now.",
        });
      }
    };

    fetchProjects();
  }, []);

  // Reset visible cards when tab or dataset changes
  useEffect(() => {
    setVisibleCount(4);
  }, [activeTab, projects.length, excludeSlug]);

  const filteredProjects = projects.filter(
    (p) =>
      (activeTab === "All" || p.categories?.includes(activeTab)) &&
      (!excludeSlug || p.slug !== excludeSlug)
  );

  const projectsToShow = filteredProjects.slice(0, visibleCount);

  const handleOpenProject = (project) => {
    navigate(`/projects/${project.slug}`);
  };

  const content = (
    <>
      {/* FILTER TABS */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-white/30 bg-gradient-to-br from-neutral-700/30 via-neutral-800/30 to-neutral-900/60 p-2 backdrop-blur">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2 text-xs font-medium font-['Lexend'] transition ${
                  isActive
                    ? "bg-white/10 text-white shadow border border-white/40"
                    : "text-stone-300 hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className="mt-10">
        {status.loading ? (
          <p className="text-sm text-neutral-300 font-['Lexend']">
            Loading projects…
          </p>
        ) : status.error ? (
          <p className="text-sm text-red-400 font-['Lexend']">{status.error}</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-sm text-neutral-300 font-['Lexend']">
            No projects found in this category yet.
          </p>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              {projectsToShow.map((project, index) => {
                const previewSrc =
                  project.images?.main ||
                  project.pageImg ||
                  "https://placehold.co/800x450";

                return (
                  <article
                    key={project.id || project._id || project.slug || index}
                    onClick={() => handleOpenProject(project)}
                    className="
                      group flex cursor-pointer flex-col justify-between
                      rounded-2xl border border-lime-500/40
                      bg-gradient-to-br from-neutral-700/35 via-neutral-800/60 to-neutral-900/90
                      px-5 py-6 sm:px-8 sm:py-8
                      shadow-[0_0_25px_rgba(0,0,0,0.7)]
                      transition
                      hover:-translate-y-1 hover:border-lime-400
                      hover:shadow-[0_0_35px_rgba(190,242,100,0.2)]
                    "
                  >
                    {/* TOP TEXT CONTENT */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-4 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-medium leading-7 text-white font-['Outfit']">
                          {project.name}
                        </h3>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenProject(project);
                          }}
                          className="
                            whitespace-nowrap rounded-md border border-white/70
                            bg-white/10 px-4 py-2
                            text-xs font-medium text-white font-['Lexend']
                            hover:bg-white/20
                          "
                        >
                          View Project
                        </button>
                      </div>

                      {/* URL – fitted width & truncation */}
                      {project.url && (
                        <div className="inline-flex max-w-full items-center overflow-hidden rounded-md bg-neutral-900 px-3 py-1.5">
                          <span className="text-[11px] font-semibold text-neutral-400 font-['Mont'] truncate">
                            {project.url}
                          </span>
                        </div>
                      )}

                      {/* TAGS */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {(project.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="
                              rounded-md border border-lime-500/70 px-2 py-1
                              text-[10px] font-bold uppercase tracking-tight text-lime-400 font-['Mont']
                            "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* DESCRIPTION – clamp to 2 lines */}
                      {project.description && (
                        <p
                          className="mt-1 text-sm font-light leading-6 text-neutral-300 font-['Lexend']"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* IMAGE PREVIEW – uses main image from DB */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-neutral-700 bg-black">
                      <img
                        src={previewSrc}
                        alt={`${project.name} preview`}
                        className="
                          h-44 w-full object-cover
                          transition duration-500
                          group-hover:scale-[1.03]
                        "
                      />
                    </div>
                  </article>
                );
              })}
            </div>

            {/* VIEW MORE BUTTON (4 more each click) */}
            {filteredProjects.length > visibleCount && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="
                    inline-flex h-12 items-center justify-center
                    rounded-xl border border-white/80
                    px-8
                    text-sm sm:text-base font-normal text-white font-['Lexend']
                    hover:bg-white hover:text-black
                    transition
                  "
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );

  if (contained) {
    return (
      <section className="relative w-full bg-[#050505] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[18%] h-80 w-80 -translate-x-1/2 rounded-full bg-lime-500/15 blur-[200px]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-black/95 px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 shadow-[0_0_40px_rgba(0,0,0,0.85)]">
            {content}
          </div>
        </div>
      </section>
    );
  }

  return <>{content}</>;
};

export default ProjectGrid;
