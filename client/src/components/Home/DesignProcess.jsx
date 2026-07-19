import React from "react";
import { motion } from "framer-motion";
import {
  Search01Icon,
  BulbIcon,
  PencilEdit01Icon,
  TestTubeIcon,
} from "hugeicons-react";

const steps = [
  {
    title: "Discover",
    desc: "Understanding the problem and defining the goal.",
    icon: Search01Icon,
  },
  {
    title: "Ideate",
    desc: "Brainstorm ideas and explore multiple design directions.",
    icon: BulbIcon,
  },
  {
    title: "Design",
    desc: "Develop high-fidelity designs, focusing on usability and aesthetics.",
    icon: PencilEdit01Icon,
  },
  {
    title: "Test & Refine",
    desc: "Conduct usability testing to identify potential pain points.",
    icon: TestTubeIcon,
  },
];

const DesignProcess = () => {
  return (
    <section className="relative w-full bg-[#050505] py-16 lg:py-24">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-lime-500/12 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-[1356px] px-4 lg:px-6">
        {/* Header — centered, no card wrapper */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* pill */}
          <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 backdrop-blur">
            <span className="text-xs font-semibold tracking-tight text-white">
              Process
            </span>
          </div>

          {/* title */}
          <h2
            className="
              max-w-[880px]
              text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px]
              font-['Outfit'] font-semibold
              leading-tight lg:leading-[1.15]
              tracking-[-0.05em]
              bg-gradient-to-b from-white via-white to-neutral-300
              bg-clip-text text-transparent
            "
          >
            My Design Process: From Concept to Completion
          </h2>

          <p className="max-w-[592px] text-[15px] sm:text-[17px] font-normal leading-7 text-neutral-200">
            Every project is unique, but the path to great design is built on a
            clear and thoughtful approach.
          </p>
        </div>

        {/* Steps grid — 4 columns, matching Figma 303px wide cards */}
        <div className="mt-14 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="
                  group flex flex-col justify-start
                  rounded-[22px]
                  border border-[#202020]
                  bg-[#0b0b0b]
                  px-7 py-5
                  min-h-[181px]
                  transition
                  hover:-translate-y-[3px]
                  hover:border-lime-400
                  hover:shadow-[0_0_24px_rgba(190,242,100,0.18)]
                "
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 0.61, 0.36, 1],
                  delay: 0.15 + idx * 0.12,
                }}
                viewport={{ once: true, amount: 0.4 }}
              >
                {/* icon box */}
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-md  bg-black/60">
                  <Icon size={24} className="text-lime-400" />
                </div>

                {/* text */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="
                      font-['Outfit']
                      text-base sm:text-[17px] lg:text-[22px]
                      font-semibold
                      leading-[1.4]
                      bg-gradient-to-b from-white via-white to-neutral-300
                      bg-clip-text text-transparent
                      lg:mb-[-6px]
                    "
                  >
                    {step.title}
                  </h3>

                  <p className="text-[15px] sm:text-[16px] leading-[1.6] text-neutral-300">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
