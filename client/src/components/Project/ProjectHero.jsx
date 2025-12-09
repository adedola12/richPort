// src/components/Project/ProjectHero.jsx
import React from "react";
import { Link } from "react-router-dom";
import ProjHero from "../../assets/ProjectHero.png";

// Adjust this to move the background image up/down/left/right
// e.g. "center top", "center 20%", "center bottom", "50% 40%", etc.
const BG_POSITION = "center top";

const ProjectHero = () => {
  return (
    <section className="relative w-full bg-[#050505] pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* BACKGROUND IMAGE (full width) */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={ProjHero}
          alt="Recent works background"
          className="
            h-full w-full
            object-cover
            brightness-[0.45] contrast-[1.05] saturate-[0.9]
          "
          style={{ objectPosition: BG_POSITION }}
        />

        {/* Dark vignette gradient over image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/82 to-black/95" />

        {/* Soft green glows at bottom corners */}
        <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-lime-500/18 blur-[140px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-lime-500/14 blur-[140px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex h-[460px] sm:h-[520px] lg:h-[560px] max-w-[1200px] items-center justify-center px-4 lg:px-6">
        <div className="flex w-full flex-col items-center gap-9 text-center">
          {/* Pill */}
          <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
            <span className="font-['Mont'] text-xs font-semibold tracking-tight text-white">
              Open for Projects
            </span>
          </div>

          {/* Heading + subtext */}
          <div className="flex max-w-[980px] flex-col items-center gap-5">
            {/* SILVER GRADIENT HEADING */}
            <h1
              className="
                font-['Outfit'] font-semibold
                text-4xl sm:text-5xl md:text-6xl lg:text-[64px]
                leading-tight lg:leading-[1.05]
                bg-gradient-to-b from-[#FCFCFC] via-[#E4E4E4] to-[#8E8E8E]
                bg-clip-text text-transparent
                drop-shadow-[0_0_16px_rgba(0,0,0,0.75)]
              "
            >
              Explore curated designs
              <br className="hidden sm:block" />
              crafted with passion.
            </h1>

            {/* BODY TEXT – larger like Figma */}
            <p
              className="
                max-w-[620px]
                font-['Mont']
                text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px]
                font-medium
                leading-relaxed
                text-white/95
              "
            >
              Here’s a collection of my recent work, showcasing my ability to
              merge creativity with functionality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
