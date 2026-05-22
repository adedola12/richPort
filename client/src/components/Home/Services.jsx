import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectGrid from "./ProjectGrid";

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-[#050505] py-20 lg:py-24">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[25%] h-80 w-80 -translate-x-1/2 rounded-full bg-lime-500/15 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-[1377px] px-4 lg:px-6">
        {/* HEADER — no outer card, just centered content */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 backdrop-blur">
            <span className="text-xs font-semibold tracking-tight text-white">
              Services / Work
            </span>
          </div>

          <h2
            className="
              max-w-[878px]
              font-['Outfit'] font-semibold
              text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px]
              leading-tight lg:leading-[1.15]
              tracking-[-0.05em]
              bg-gradient-to-b from-white via-white to-neutral-300
              bg-clip-text text-transparent
            "
          >
            Custom design solutions for your requirements.
          </h2>

          <p className="max-w-[592px] text-[17px] sm:text-[19px] font-normal leading-[1.55] text-neutral-200 mt-1">
            I specialize in crafting user-centered solutions for businesses and
            individuals. Let&apos;s create something extraordinary together.
          </p>
        </div>

        {/* Tab bar + project grid */}
        <div className="mt-10">
          <ProjectGrid contained={false} />
        </div>

        {/* View All Projects button */}
        {/* <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="
              inline-flex h-[60px] items-center justify-center
              rounded-xl border border-white/80
              px-12
              text-sm sm:text-base font-normal text-white
              hover:bg-white hover:text-black transition
            "
          >
            View All Projects
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Services;
