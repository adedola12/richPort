// src/components/ProjectPage/ProjectDetailsHero.jsx
import React from "react";
import { Link } from "react-router-dom";
import signImg from "../../assets/Bookrion/mainSign.jpg";

const HERO_BG_POSITION = "center 60%";
const HERO_BG_ZOOM = 1.2;
const CONTENT_TOP_OFFSET = 200;

const teamPlaceholders = [
  "https://placehold.co/32x33",
  "https://placehold.co/32x33",
  "https://placehold.co/32x33",
  "https://placehold.co/32x33",
  "https://placehold.co/32x33",
];

const defaultCategories = [
  "Brand Identity Design",
  "UI/UX Design",
  "Graphic Design",
  "Website Design",
];

const defaultDeliverables =
  "Art Direction, User Interface, Branding Strategy, Print Design, 3D Render";

const defaultTimeline = "4 weeks";

const ProjectDetailsHero = ({ project }) => {
  const projectName = project?.name || "Book Rion";
  const clientName = project?.clientName || projectName;

  const heroMeta = project?.heroMeta || {};
  const heroCategories =
    (Array.isArray(heroMeta.categories) && heroMeta.categories.length
      ? heroMeta.categories
      : Array.isArray(project?.categories) && project.categories.length
      ? project.categories
      : defaultCategories) || defaultCategories;

  const deliverablesText =
    heroMeta.deliverables && heroMeta.deliverables.trim().length
      ? heroMeta.deliverables
      : defaultDeliverables;

  const timelineText =
    heroMeta.timeline && heroMeta.timeline.trim().length
      ? heroMeta.timeline
      : defaultTimeline;

  const teamInitials =
    (Array.isArray(heroMeta.teamInitials)
      ? heroMeta.teamInitials.filter(Boolean)
      : []) || [];

  const hasInitials = teamInitials.length > 0;

  return (
    <section
      className="
        relative w-full bg-[#050505]
        pt-4 pb-16
        overflow-hidden
        -mt-4 sm:-mt-6
      "
    >
      {/* BG */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={signImg}
          alt={`${projectName} sign`}
          className="h-full w-full object-cover opacity-50"
          style={{
            objectPosition: HERO_BG_POSITION,
            transform: `scale(${HERO_BG_ZOOM})`,
            transformOrigin: "center center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/80 to-[#050505]" />
        <div className="absolute -left-40 bottom-[-40px] h-72 w-72 rounded-full bg-lime-500/18 blur-[140px]" />
        <div className="absolute -right-40 bottom-[-40px] h-72 w-72 rounded-full bg-lime-500/14 blur-[140px]" />
      </div>

      {/* CONTENT */}
      <div
        className="relative z-10 mx-auto max-w-[1200px] px-4 lg:px-16"
        style={{ paddingTop: CONTENT_TOP_OFFSET }}
      >
        <div className="mx-auto max-w-[760px] flex flex-col gap-10">
          {/* top block */}
          <div className="flex flex-col gap-6">
            <div className="w-full flex flex-col gap-3">
              <Link
                to="/projects"
                className="
                  inline-flex items-center justify-center
                  rounded-[127px] border border-white/10 bg-white/5
                  px-5 py-2
                  font-['Lexend'] text-sm text-white
                  backdrop-blur-lg
                  hover:bg-white/10 transition
                  w-[210px]
                "
              >
                Back to Portfolio
              </Link>

              <h1
                className="
                  text-white
                  font-['Outfit'] font-medium
                  text-4xl sm:text-5xl lg:text-[52px]
                  leading-[1.1]
                "
              >
                {projectName}
              </h1>
            </div>

            {/* intro text – still placeholder until you decide to make these dynamic */}
            <div className="flex flex-col gap-6 text-justify">
              <p className="font-['Lexend'] text-[13px] sm:text-sm md:text-[15px] leading-7 md:leading-8 text-white/60">
                BookRion is redefining how books reach readers. The platform
                connects readers directly with verified bookstores and
                publishers, ensuring that quality literature remains accessible,
                affordable, and sustainable. Our vision is to build a world
                where getting the books you love is effortless — by creating a
                reliable, innovative, and inclusive book distribution network
                that sets a new standard in the publishing industry.
              </p>

              <p className="font-['Lexend'] text-[13px] sm:text-sm md:text-[15px] leading-7 md:leading-8 text-white/60">
                I joined the project as a{" "}
                <span className="text-lime-500 font-medium">
                  Creative Designer
                </span>{" "}
                while the platform was already in development. At the time,
                BookRion lacked a cohesive visual direction and clear brand
                identity. My primary responsibility was to establish these
                foundations — setting visual guidelines, designing the logo,
                choosing colors and typography, and crafting a consistent
                identity system that would unify all design touchpoints.
              </p>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="mt-1 w-full max-w-[580px] flex flex-col gap-4">
            {/* CLIENT */}
            <div className="flex items-start justify-between gap-8">
              <span className="font-['Lexend'] text-xs tracking-[0.3em] uppercase text-white">
                Client
              </span>
              <span className="w-72 md:w-96 font-['Lexend'] text-sm md:text-base text-white leading-6">
                {clientName}
              </span>
            </div>

            {/* CATEGORY */}
            <div className="flex items-start justify-between gap-8">
              <span className="font-['Lexend'] text-xs tracking-[0.3em] uppercase text-white">
                Category
              </span>
              <div className="w-72 md:w-96 flex flex-wrap items-center gap-1.5">
                {heroCategories.map((cat) => (
                  <span
                    key={cat}
                    className="
                      rounded-md border border-lime-500 px-2 py-1.5
                      font-['Mont'] text-[10px] font-bold leading-[10px]
                      uppercase tracking-tight text-lime-500
                    "
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* DELIVERABLES */}
            <div className="flex items-start justify-between gap-8">
              <span className="font-['Lexend'] text-xs tracking-[0.3em] uppercase text-white">
                Deliverables
              </span>
              <span className="w-72 md:w-96 font-['Lexend'] text-sm md:text-base text-white leading-6">
                {deliverablesText}
              </span>
            </div>

            {/* TIMELINE */}
            <div className="flex items-start justify-between gap-8">
              <span className="font-['Lexend'] text-xs tracking-[0.3em] uppercase text-white">
                Timeline
              </span>
              <span className="w-72 md:w-96 font-['Lexend'] text-sm md:text-base text-white leading-6">
                {timelineText}
              </span>
            </div>

            {/* TEAM */}
            <div className="flex items-center justify-start gap-20">
              <span className="font-['Lexend'] text-xs tracking-[0.3em] uppercase text-white">
                Team
              </span>
              <div className="flex items-center">
                {hasInitials
                  ? teamInitials.map((initials, idx) => (
                      <div
                        key={`${initials}-${idx}`}
                        className={`w-8 h-8 rounded-2xl border-2 border-white bg-zinc-900 flex items-center justify-center text-[11px] font-['Mont'] font-semibold text-white ${
                          idx === 0 ? "" : "-ml-3"
                        }`}
                      >
                        {initials}
                      </div>
                    ))
                  : teamPlaceholders.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt="Team member"
                        className={`w-8 h-8 rounded-2xl border-2 border-white ${
                          idx === 0 ? "" : "-ml-3"
                        }`}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsHero;
