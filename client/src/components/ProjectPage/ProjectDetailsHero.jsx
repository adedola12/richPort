// src/components/ProjectPage/ProjectDetailsHero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TypingText from "../common/TypingText";
import signImg from "../../assets/Bookrion/mainSign.jpg";

const HERO_BG_POSITION = "center 60%";
const HERO_BG_ZOOM = 1.2;
const CONTENT_TOP_OFFSET = 200;

const fadeItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const defaultCategories = [
  "Brand Identity Design",
  "UI/UX Design",
  "Graphic Design",
  "Website Design",
];

const defaultDeliverables =
  "Art Direction, User Interface, Branding Strategy, Print Design, 3D Render";

const defaultTimeline = "4 weeks";

const ProjectDetailsHero = ({ project }) => {
  const projectName = project?.name || "Book Rion";
  const clientName = project?.clientName || projectName;

  // ⬇️ Use server image first, fallback to old fields then local image
  const heroImageUrl =
    project?.images?.main ||
    project?.pageImg ||
    project?.mainImageUrl ||
    signImg;

  const heroMeta = project?.heroMeta || {};
  const heroCategories =
    (Array.isArray(heroMeta.categories) && heroMeta.categories.length
      ? heroMeta.categories
      : Array.isArray(project?.categories) && project.categories.length
      ? project.categories
      : defaultCategories) || defaultCategories;

  const deliverablesText =
    heroMeta.deliverables && heroMeta.deliverables.trim().length
      ? heroMeta.deliverables
      : defaultDeliverables;

  const timelineText =
    heroMeta.timeline && heroMeta.timeline.trim().length
      ? heroMeta.timeline
      : defaultTimeline;

  const teamInitials =
    (Array.isArray(heroMeta.teamInitials)
      ? heroMeta.teamInitials.filter(Boolean)
      : []) || [];

  const hasInitials = teamInitials.length > 0;

  // ⬇️ Intro text: one string from DB, broken into paragraphs by “Enter”
  const rawIntro =
    (typeof project?.introText === "string" && project.introText.trim().length
      ? project.introText
      : project?.description || "") || "";

  const introParagraphs = rawIntro
    .split(/\r?\n/) // split on line breaks
    .map((p) => p.trim())
    .filter(Boolean); // remove empty lines

  return (
    <section
      className="
        relative w-full bg-[#050505]
        pt-4 pb-16
        overflow-hidden
        -mt-4 sm:-mt-6
      "
    >
      {/* BG */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={heroImageUrl}
          alt={`${projectName} sign`}
          className="h-full w-full object-cover opacity-50"
          style={{
            objectPosition: HERO_BG_POSITION,
            transform: `scale(${HERO_BG_ZOOM})`,
            transformOrigin: "center center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/80 to-[#050505]" />
        <div className="absolute -left-40 bottom-[-40px] h-72 w-72 rounded-full bg-lime-500/18 blur-[140px]" />
        <div className="absolute -right-40 bottom-[-40px] h-72 w-72 rounded-full bg-lime-500/14 blur-[140px]" />
      </div>

      <div
        className="relative z-10 mx-auto max-w-[1200px] px-4 lg:px-16"
        style={{ paddingTop: CONTENT_TOP_OFFSET }}
      >
        <motion.div
          className="mx-auto max-w-[760px] flex flex-col gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.18 },
            },
          }}
        >
          {/* top block */}
          <motion.div className="flex flex-col gap-6" variants={fadeItem}>
            <div className="w-full flex flex-col gap-3">
              <Link
                to="/projects"
                className="
                  inline-flex items-center justify-center
                  rounded-[127px] border border-white/10 bg-white/5
                  px-5 py-2
                  font-['Lexend'] text-sm text-white
                  backdrop-blur-lg
                  hover:bg-white/10 transition
                  w-[210px]
                "
              >
                Back to Portfolio
              </Link>

              <TypingText
                as="h1"
                text={projectName}
                className="
                  text-white
                  font-['Outfit'] font-medium
                  text-4xl sm:text-5xl lg:text-[52px]
                  leading-[1.1]
                "
                delay={0.15}
              />
            </div>

            {/* intro text from server, split into paragraphs */}
            <div className="flex flex-col gap-6 text-justify">
              {introParagraphs.map((para, idx) => (
                <TypingText
                  key={idx}
                  as="p"
                  text={para}
                  className="font-['Lexend'] text-[17px] sm:text-sm md:text-[15px] leading-7 md:leading-8 text-white/60"
                  delay={0.25 + idx * 0.2}
                />
              ))}
            </div>
          </motion.div>

          {/* DETAILS GRID */}
          <motion.div
            className="mt-1 w-full max-w-[580px] flex flex-col gap-4"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {/* CLIENT */}
            <motion.div
              className="flex items-start justify-between gap-8"
              variants={fadeItem}
            >
              <span className="font-['Lexend'] text-xs tracking-[0.3em] uppercase text-white">
                Client
              </span>
              <span className="w-72 md:w-96 font-['Lexend'] text-sm md:text-base text-white leading-6">
                {clientName}
              </span>
            </motion.div>

            {/* CATEGORY */}
            <motion.div
              className="flex items-start justify-between gap-8"
              variants={fadeItem}
            >
              <span className="font-['Lexend'] text-xs tracking-[0.3em] uppercase text-white">
                Category
              </span>
              <div className="w-72 md:w-96 flex flex-wrap items-center gap-1.5">
                {heroCategories.map((cat) => (
                  <span
                    key={cat}
                    className="
                      rounded-md border border-lime-500 px-2 py-1.5
                      font-['Mont'] text-[10px] font-bold leading-[10px]
                      uppercase tracking-tight text-lime-500
                    "
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* DELIVERABLES */}
            <motion.div
              className="flex items-start justify-between gap-8"
              variants={fadeItem}
            >
              <span className="font-['Lexend'] text-xs tracking-[0.3em] uppercase text-white">
                Deliverables
              </span>
              <span className="w-72 md:w-96 font-['Lexend'] text-sm md:text-base text-white leading-6">
                {deliverablesText}
              </span>
            </motion.div>

            {/* TIMELINE */}
            <motion.div
              className="flex items-start justify-between gap-8"
              variants={fadeItem}
            >
              <span className="font-['Lexend'] text-xs tracking-[0.3em] uppercase text-white">
                Timeline
              </span>
              <span className="w-72 md:w-96 font-['Lexend'] text-sm md:text-base text-white leading-6">
                {timelineText}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetailsHero;
