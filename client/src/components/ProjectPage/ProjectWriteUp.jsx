// src/components/ProjectPage/ProjectWriteUp.jsx
import React from "react";
import { motion } from "framer-motion";
import TypingText from "../common/TypingText";
import { Search01Icon, BulbIcon, PencilEdit01Icon, CheckmarkCircle02Icon } from "hugeicons-react";
import writeImg from "../../assets/Bookrion/img1.jpg";

const SILVER_WORD = {
  background: "linear-gradient(180deg, #ffffff 0%, #b8b8b8 45%, #e0e0e0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  WebkitTextStroke: "0.3px rgba(210,210,210,0.4)",
};

const fadeLeft = {
  hidden: { opacity: 0, x: -44, y: 12 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 44, y: 12 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const imgReveal = {
  hidden: {
    opacity: 0,
    scale: 1.05,
    clipPath: "inset(8% 4% 8% 4% round 20px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 20px)",
    transition: { duration: 1.0, ease: [0.22, 0.61, 0.36, 1] },
  },
};

// ------- DEFAULT CONTENT (fallback) -------
const defaultSteps = [
  {
    id: "discover",
    pillLabel: "Discover",
    title: "Understanding the Problem",
    body: `When I joined the team, it became clear that while the product concept was strong, its visual identity wasn't reflecting its mission.

I began by studying the brand's purpose, target audience, and industry landscape to identify what was missing and define a direction that could express BookRion's personality and vision.`,
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

const stepIcons = [Search01Icon, BulbIcon, PencilEdit01Icon, CheckmarkCircle02Icon];

// ------- STEP BLOCK -------
const StepBlock = ({ pillLabel, Icon, title, body, slideVariant = fadeLeft }) => (
  <motion.div
    className="w-full lg:max-w-[574px] flex flex-col gap-4"
    variants={slideVariant}
  >
    <div className="flex flex-col gap-2">
      <div className="inline-flex max-w-max items-center gap-2 rounded-full bg-lime-500/10 border border-lime-500/25 px-3 py-1.5">
        <Icon size={12} className="text-lime-400 shrink-0" />
        <span className="text-[10px] font-bold text-lime-400 leading-none uppercase tracking-widest whitespace-nowrap">
          {pillLabel}
        </span>
      </div>

      <TypingText
        as="h3"
        text={title}
        className="text-[22px] sm:text-[26px] font-semibold leading-[1.2] tracking-[-0.02em]"
        delay={0.1}
        wordStyle={SILVER_WORD}
      />
    </div>

    <p className="text-[15px] sm:text-[16px] leading-[1.65] tracking-[-0.01em] text-white/65 whitespace-pre-line text-justify">
      {body}
    </p>
  </motion.div>
);

// ------- MAIN COMPONENT -------
const ProjectWriteUp = ({ project }) => {
  const rawSteps = project?.caseStudySteps || defaultSteps;

  const steps = defaultSteps.map((fallback, idx) => ({
    ...fallback,
    ...(rawSteps[idx] || {}),
    Icon: stepIcons[idx] || Search01Icon,
  }));

  const caseStudyImage = project?.caseStudyImage || writeImg;

  return (
    <section className="relative w-full py-20">
      <div className="relative mx-auto max-w-[1224px] px-4 lg:px-6">
        {/* top row */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-stretch lg:gap-20">
          {/* left: first two steps slide from left */}
          <motion.div
            className="w-full lg:w-[574px] flex flex-col gap-12 sm:gap-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18 } },
            }}
          >
            <StepBlock {...steps[0]} slideVariant={fadeLeft} />
            <StepBlock {...steps[1]} slideVariant={fadeLeft} />
          </motion.div>

          {/* right: case-study image slides from right with clip-path reveal */}
          <motion.div
            className="w-full lg:w-[574px] mt-4 lg:mt-0 flex flex-col"
            variants={imgReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="relative flex-1">
              <div className="relative h-full rounded-xl sm:rounded-2xl border-2 border-lime-500 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.85)] bg-black/20" style={{ minHeight: 260 }}>
                <img
                  src={caseStudyImage}
                  alt="Case study visual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom row: left slides from left, right slides from right */}
        <motion.div
          className="mt-12 sm:mt-14 flex flex-col gap-12 sm:gap-14 lg:flex-row lg:items-start lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
        >
          <StepBlock {...steps[2]} slideVariant={fadeLeft} />
          <StepBlock {...steps[3]} slideVariant={fadeRight} />
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectWriteUp;
