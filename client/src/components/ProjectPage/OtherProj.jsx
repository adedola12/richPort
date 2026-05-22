// src/components/ProjectPage/OtherProj.jsx
import React from "react";
import ProjectGrid from "../Home/ProjectGrid";

const OtherProj = ({ currentSlug, currentKind = "default" }) => {
  return (
    <section className="relative w-full bg-[#050505] py-16 lg:py-24">
      {/* soft green glow behind */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-0 h-64 w-64 rounded-full bg-lime-500/18 blur-[190px]" />
        <div className="absolute right-[-60px] bottom-[-60px] h-72 w-72 rounded-full bg-lime-500/14 blur-[220px]" />
      </div>

      <div className="relative mx-auto max-w-[1300px] px-4 lg:px-6">
        {/* Outer container matching Figma: border-[#262626] rounded-[24px] */}
        <div
          className="
            rounded-2xl sm:rounded-[24px]
            border border-[#262626]
            py-10 sm:py-16 lg:py-20
          "
        >
          {/* Header */}
          <header className="flex flex-col items-center gap-2.5 text-center px-4 sm:px-6">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] font-semibold text-white">
              Other Projects
            </h2>
            <p className="max-w-[578px] text-[16px] sm:text-[18px] leading-[1.5] tracking-[-0.096px] text-[#e6e6e6]">
              We have had the privilege of working with a diverse range of
              clients and delivering exceptional digital products that drive
              success.
            </p>
          </header>

          {/* Grid with tabs + cards */}
          <div className="mt-8 px-3 sm:px-6 lg:px-[53px] overflow-x-hidden">
            <ProjectGrid
              contained={false}
              excludeSlug={currentSlug}
              excludeKind={currentKind}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherProj;
