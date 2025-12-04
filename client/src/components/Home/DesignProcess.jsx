import React from "react";
import {
  FaSearch,
  FaRegLightbulb,
  FaPencilRuler,
  FaFlask,
} from "react-icons/fa";

const steps = [
  {
    title: "Discover",
    desc: "Understanding the problem and defining the goal.",
    icon: FaSearch,
  },
  {
    title: "Ideate",
    desc: "Brainstorm ideas and explore multiple design directions.",
    icon: FaRegLightbulb,
  },
  {
    title: "Design",
    desc: "Develop high-fidelity designs, focusing on usability and aesthetics.",
    icon: FaPencilRuler,
  },
  {
    title: "Test & Refine",
    desc: "Conduct usability testing to identify potential pain points.",
    icon: FaFlask,
  },
];

const DesignProcess = () => {
  return (
    <section className="relative w-full bg-[#050505] py-20 lg:py-24">
      {/* soft glow behind section */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-lime-500/12 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
        {/* main panel */}
        <div className="flex flex-col items-center gap-10 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-black/95 px-4 py-10 shadow-[0_0_40px_rgba(0,0,0,0.85)] sm:px-8 sm:py-12 lg:px-16 lg:py-16">
          {/* header */}
          <div className="flex flex-col items-center gap-5 text-center">
            {/* pill */}
            <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 backdrop-blur">
              <span className="font-['Mont'] text-xs font-semibold tracking-tight text-white">
                Process
              </span>
            </div>

            {/* title + subtitle */}
            <div className="flex flex-col items-center gap-4">
              <h2
                className="
                  max-w-[880px]
                  text-3xl sm:text-4xl md:text-[44px] lg:text-[52px]
                  font-['Outfit'] font-semibold
                  leading-tight lg:leading-[1.15]
                  bg-gradient-to-b from-white via-white to-neutral-300
                  bg-clip-text text-transparent
                "
              >
                My Design Process:
                <br className="hidden sm:block" />
                From Concept to Completion
              </h2>

              <p className="max-w-[520px] font-['Lexend'] text-sm font-normal leading-6 text-neutral-200 sm:text-base">
                Every project is unique, but the path to great design is built
                on a clear and thoughtful approach.
              </p>
            </div>
          </div>

          {/* steps grid */}
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="
                    group flex flex-col justify-start
                    rounded-[22px]
                    border border-[#202020]
                    bg-[#0b0b0b]
                    px-6 py-6
                    min-h-[170px]
                    transition
                    hover:-translate-y-[3px]
                    hover:border-lime-400
                    hover:shadow-[0_0_24px_rgba(190,242,100,0.18)]
                  "
                >
                  {/* icon box – matches Figma alignment */}
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-lime-500 bg-black/60">
                    <Icon className="text-[14px] text-lime-400" />
                  </div>

                  {/* text block */}
                  <div className="flex flex-col gap-1.5">
                    {/* gradient title inside card */}
                    <h3
                      className="
                        font-['Outfit']
                        text-base sm:text-[17px]
                        font-semibold
                        leading-[1.4]
                        bg-gradient-to-b from-white via-white to-neutral-300
                        bg-clip-text text-transparent
                      "
                    >
                      {step.title}
                    </h3>

                    <p className="font-['Lexend'] text-[13px] sm:text-sm leading-[1.6] text-neutral-200">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
