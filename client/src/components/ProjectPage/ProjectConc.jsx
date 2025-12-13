// src/components/ProjectPage/ProjectConc.jsx
import React from "react";
import { motion } from "framer-motion";
import TypingText from "../common/TypingText";
import { LuCheckCheck } from "react-icons/lu";
import concImg from "../../assets/Bookrion/concImg.jpg";

const fadeItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const ProjectConc = ({ project }) => {
  const conclusionTitle = project?.conclusionTitle || "Conclusion";
  const conclusionBody = project?.conclusionBody;

  const conclusionImage =
    project?.conclusionImage || project?.images?.conclusion || concImg;

  const ctaLabel = project?.conclusionCtaLabel || "View product case study";
  const ctaUrl = project?.conclusionCtaUrl || project?.caseStudyUrl || "#";

  return (
    <section className="relative w-full bg-[#050505] pt-20 pb-24">
      <div className="pointer-events-none absolute left-1/2 top-[15%] h-72 w-72 -translate-x-1/2 rounded-full bg-lime-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-[1224px] px-4 lg:px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          {/* LEFT: text */}
          <motion.div
            className="w-full lg:w-[574px] flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div className="flex flex-col gap-1" variants={fadeItem}>
              <div className="inline-flex max-w-max items-center gap-2 rounded-[20.63px] border border-white/60 bg-zinc-900 px-4 py-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-lime-500 text-lime-400">
                  <LuCheckCheck className="h-3 w-3" />
                </span>
                <span className="font-['Lexend'] text-[11px] sm:text-xs text-white leading-6 whitespace-nowrap">
                  Results
                </span>
              </div>

              <TypingText
                as="h2"
                text={conclusionTitle}
                className="font-['Lexend'] text-[24px] sm:text-[26px] font-semibold leading-[1.5] text-white"
                delay={0.1}
              />
            </motion.div>

            <TypingText
              as="p"
              text={conclusionBody || ""}
              className="font-['Lexend'] text-[13px] sm:text-[14px] lg:text-[15px] leading-7 text-white/60 text-justify whitespace-pre-line"
              delay={0.25}
            />
          </motion.div>

          {/* RIGHT: image card */}
          <motion.div
            className="w-full lg:w-[574px]"
            variants={fadeItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="w-full rounded-2xl border-2 border-lime-500 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.85)]">
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

        {/* CTA BUTTON */}
        <motion.div
          className="mt-16 flex justify-center"
          variants={fadeItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {ctaUrl && ctaUrl !== "#" ? (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center justify-center
                rounded-md
                bg-gradient-to-b from-lime-500 to-lime-700
                px-10 py-3.5
                font-['Mont'] text-sm font-extrabold
                text-zinc-900
                shadow-[0_0_40px_rgba(0,0,0,0.6)]
                hover:brightness-110
                transition
              "
            >
              {ctaLabel}
            </a>
          ) : (
            <button
              type="button"
              className="
                inline-flex items-center justify-center
                rounded-md
                bg-gradient-to-b from-lime-500 to-lime-700
                px-10 py-3.5
                font-['Mont'] text-sm font-extrabold
                text-zinc-900
                shadow-[0_0_40px_rgba(0,0,0,0.6)]
              "
            >
              {ctaLabel}
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectConc;
