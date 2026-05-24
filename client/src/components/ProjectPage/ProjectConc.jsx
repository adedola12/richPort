// src/components/ProjectPage/ProjectConc.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import TypingText from "../common/TypingText";
import { LuCheckCheck } from "react-icons/lu";
import concImg from "../../assets/Bookrion/concImg.jpg";

const SILVER_WORD = {
  background: "linear-gradient(180deg, #ffffff 0%, #b8b8b8 45%, #e0e0e0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  WebkitTextStroke: "0.3px rgba(210,210,210,0.4)",
};

const fadeLeft = {
  hidden: { opacity: 0, x: -44 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const imgReveal = {
  hidden: {
    opacity: 0,
    scale: 1.06,
    x: 40,
    clipPath: "inset(6% 4% 6% 4% round 20px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    clipPath: "inset(0% 0% 0% 0% round 20px)",
    transition: { duration: 1.0, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const ProjectConc = ({ project }) => {
  const [concBodyReady, setConcBodyReady] = useState(false);
  const conclusionTitle = project?.conclusionTitle || "Conclusion";
  const conclusionBody = project?.conclusionBody;

  const conclusionImage =
    project?.conclusionImage || project?.images?.conclusion || concImg;

  return (
    <section className="relative w-full pt-20 pb-24">
      <div className="relative mx-auto max-w-[1224px] px-4 lg:px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          {/* LEFT: text slides from left */}
          <motion.div
            className="w-full lg:w-[574px] flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div className="flex flex-col gap-1" variants={fadeLeft}>
              <div className="inline-flex max-w-max items-center gap-2 rounded-full bg-lime-500/10 border border-lime-500/25 px-3 py-1.5">
                <LuCheckCheck className="h-3 w-3 text-lime-400 shrink-0" />
                <span className="text-[10px] font-bold text-lime-400 leading-none uppercase tracking-widest whitespace-nowrap">
                  Results
                </span>
              </div>

              <TypingText
                as="h2"
                text={conclusionTitle}
                className="text-[24px] sm:text-[28px] font-semibold leading-[1.2] tracking-[-0.02em]"
                delay={0.1}
                wordStyle={SILVER_WORD}
                onComplete={() => setConcBodyReady(true)}
              />
            </motion.div>

            <TypingText
              as="p"
              text={conclusionBody || ""}
              className="text-[15px] sm:text-[16px] leading-[1.65] tracking-[-0.01em] text-white/65 whitespace-pre-line text-justify"
              startWhen={concBodyReady}
              delay={0}
              wordStep={0.03}
            />
          </motion.div>

          {/* RIGHT: image reveals from right with clip-path + scale */}
          <motion.div
            className="w-full lg:w-[574px]"
            variants={imgReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="w-full rounded-xl sm:rounded-2xl border-2 border-lime-500 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.85)]">
              <img
                src={conclusionImage}
                alt={
                  project?.name
                    ? `${project.name} conclusion visual`
                    : "Project conclusion visual"
                }
                className="h-[260px] sm:h-[280px] lg:h-[300px] w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectConc;
