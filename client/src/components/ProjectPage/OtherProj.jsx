// src/components/ProjectPage/OtherProj.jsx
import React from "react";
import ProjectGrid from "../Home/ProjectGrid";

const OtherProj = ({ currentSlug }) => {
  return (
    <section className="relative w-full bg-[#050505] py-16 lg:py-24">
      {/* soft green glow behind the card */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-0 h-64 w-64 rounded-full bg-lime-500/18 blur-[190px]" />
        <div className="absolute right-[-60px] bottom-[-60px] h-72 w-72 rounded-full bg-lime-500/14 blur-[220px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
        {/* main card wrapper like Figma */}
        <div
          className="
            rounded-[32px]
            border border-neutral-800
            bg-gradient-to-b from-[#15171c]/95 via-[#050607]/98 to-black
            px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14
            shadow-[0_0_40px_rgba(0,0,0,0.9)]
          "
        >
          {/* heading + subtext */}
          <header className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl lg:text-[32px] font-semibold text-white">
              Other Projects
            </h2>
            <p className="max-w-[580px] font-['Lexend'] text-sm sm:text-[15px] leading-6 text-neutral-200">
              We have had the privilege of working with a diverse range of
              clients and delivering exceptional digital products that drive
              success.
            </p>
          </header>

          {/* project grid (tabs + cards + CTA) */}
          <ProjectGrid contained={false} excludeSlug={currentSlug} />
        </div>
      </div>
    </section>
  );
};

export default OtherProj;
