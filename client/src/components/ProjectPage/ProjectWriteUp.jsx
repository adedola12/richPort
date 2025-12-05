// src/components/ProjectPage/ProjectWriteUp.jsx
import React from "react";
import { LuSearch, LuLightbulb, LuPenTool, LuCheckCheck } from "react-icons/lu";
import writeImg from "../../assets/Bookrion/img1.jpg";

// ------- DEFAULT CONTENT (fallback until MongoDB is connected) -------
const defaultSteps = [
  {
    id: "discover",
    pillLabel: "Discover",
    title: "Understanding the Problem",
    body: `When I joined the team, it became clear that while the product concept was strong, its visual identity wasn’t reflecting its mission.

I began by studying the brand’s purpose, target audience, and industry landscape to identify what was missing and define a direction that could express BookRion’s personality and vision.`,
  },
  {
    id: "ideate",
    pillLabel: "Ideate",
    title: "Exploring Concepts",
    body: `I started sketching and exploring multiple logo ideas and visual systems. I collaborated closely with the team, sharing concepts and collecting feedback through iterative discussions.

These sessions helped refine our direction and emphasized that constructive critique is key to building stronger creative outcomes.`,
  },
  {
    id: "design",
    pillLabel: "Design",
    title: "Bringing the Concept to Life",
    body: `With the approved concept in place, I developed the full visual system — logo, color palette, typography, and brand applications.

The design aimed to balance modernity and accessibility while representing trust and innovation. I also built scalable brand guidelines to maintain visual consistency across print and digital environments.`,
  },
  {
    id: "test",
    pillLabel: "Test & Refine",
    title: "Perfecting the Details",
    body: `After rendering the final idea, I refined the design across various touchpoints. Applying the new identity to the digital product and marketing materials brought everything together — improving usability, user appeal, and brand recognition.

Each iteration made the visual experience more coherent and engaging.`,
  },
];

// One icon per step
const stepIcons = [LuSearch, LuLightbulb, LuPenTool, LuCheckCheck];

// ------- SMALL REUSABLE BLOCK FOR EACH STEP -------
const StepBlock = ({ pillLabel, Icon, title, body }) => (
  <div className="w-full lg:max-w-[574px] flex flex-col gap-4">
    {/* Pill + heading */}
    <div className="flex flex-col gap-1">
      {/* Pill */}
      <div
        className="
          inline-flex max-w-max items-center gap-2
          rounded-[10.63px] border border-white/60 bg-zinc-900
          px-2 py-1
        "
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-lime-500 text-lime-400">
          <Icon className="h-3 w-3" />
        </span>
        <span className="font-['Lexend'] text-[11px] sm:text-xs text-white leading-6 whitespace-nowrap">
          {pillLabel}
        </span>
      </div>

      {/* Title – tuned to stay on a single line in a 574px column */}
      <h3
        className="
          font-['Lexend']
          text-[22px] sm:text-[24px] lg:text-[26px]
          font-semibold
          leading-[1.5]
          text-white
        "
      >
        {title}
      </h3>
    </div>

    {/* Body copy */}
    <p
      className="
        font-['Lexend']
        text-[13px] sm:text-[14px] lg:text-[15px]
        leading-7
        text-white/60
        text-justify
        whitespace-pre-line
      "
    >
      {body}
    </p>
  </div>
);

// ------- MAIN COMPONENT -------
const ProjectWriteUp = ({ project }) => {
  // When MongoDB is wired up, structure your document like:
  // project.caseStudySteps = [{ pillLabel, title, body }, ...]
  // project.caseStudyImage = 'https://...'
  const rawSteps = project?.caseStudySteps || defaultSteps;

  // Merge project data over defaults while keeping icons aligned by index
  const steps = defaultSteps.map((fallback, idx) => ({
    ...fallback,
    ...(rawSteps[idx] || {}),
    Icon: stepIcons[idx] || LuSearch,
  }));

  const caseStudyImage = project?.caseStudyImage || writeImg;

  return (
    <section className="relative w-full bg-[#050505] py-20">
      {/* soft green glow behind the whole section */}
      <div className="pointer-events-none absolute left-1/2 top-[10%] h-72 w-72 -translate-x-1/2 rounded-full bg-lime-500/12 blur-[180px]" />

      <div className="relative mx-auto max-w-[1224px] px-4 lg:px-6">
        {/* TOP ROW: Discover + Ideate (left), Phone image (right) */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Left text column */}
          <div className="w-full lg:w-[574px] flex flex-col gap-24">
            <StepBlock
              pillLabel={steps[0].pillLabel}
              Icon={steps[0].Icon}
              title={steps[0].title}
              body={steps[0].body}
            />
            <StepBlock
              pillLabel={steps[1].pillLabel}
              Icon={steps[1].Icon}
              title={steps[1].title}
              body={steps[1].body}
            />
          </div>

          {/* Right image card */}
          <div className="w-full lg:w-[574px] mt-4 lg:mt-0">
            <div
              className="
                w-full
                bg-gradient-to-br
                from-neutral-600/30 via-stone-500/20 to-stone-400/5
                rounded-[20px]
                border-4 border-white/40
                px-3.5 pt-3.5 pb-4
                shadow-[0_0_40px_rgba(0,0,0,0.85)]
              "
            >
              <div className="relative h-[588px] w-full overflow-hidden rounded-2xl border-2 border-lime-500">
                <img
                  src={caseStudyImage}
                  alt={
                    project?.name
                      ? `${project.name} process visual`
                      : "Project process visual"
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Design + Test & Refine */}
        <div className="mt-20 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          <div className="w-full lg:w-[574px]">
            <StepBlock
              pillLabel={steps[2].pillLabel}
              Icon={steps[2].Icon}
              title={steps[2].title}
              body={steps[2].body}
            />
          </div>
          <div className="w-full lg:w-[574px]">
            <StepBlock
              pillLabel={steps[3].pillLabel}
              Icon={steps[3].Icon}
              title={steps[3].title}
              body={steps[3].body}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectWriteUp;
