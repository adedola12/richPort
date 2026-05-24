// src/components/ProjectPage/ProjectDetailsHero.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TypingText from "../common/TypingText";
import signImg from "../../assets/Bookrion/mainSign.jpg";

const SILVER_WORD = {
  background: "linear-gradient(180deg, #ffffff 0%, #b8b8b8 45%, #e0e0e0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  WebkitTextStroke: "0.3px rgba(210,210,210,0.4)",
};

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
  const [parasReady, setParasReady] = useState(false);
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
        relative w-full
        pt-4 pb-16
        -mt-4 sm:-mt-6
      "
    >
      {/* BG: image + gradient clipped so scaled image never bleeds */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={heroImageUrl}
          alt={`${projectName} sign`}
          className="h-full w-full object-cover opacity-60"
          style={{
            objectPosition: HERO_BG_POSITION,
            transform: `scale(${HERO_BG_ZOOM})`,
            transformOrigin: "center center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,1) 70%)",
          }}
        />
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
                  text-sm text-white
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
                className="font-semibold text-5xl sm:text-6xl lg:text-[72px] leading-[1.05] tracking-[-0.03em]"
                delay={0.15}
                wordStyle={SILVER_WORD}
                onComplete={() => setParasReady(true)}
              />
            </div>

            {/* intro text from server, split into paragraphs */}
            <div className="flex flex-col gap-4">
              {introParagraphs.map((para, idx) => (
                <TypingText
                  key={idx}
                  as="p"
                  text={para}
                  className="text-[16px] sm:text-[17px] leading-[1.65] tracking-[-0.01em] text-white/65 text-justify"
                  startWhen={parasReady}
                  delay={idx * 0.15}
                  wordStep={0.03}
                />
              ))}
            </div>
          </motion.div>

          {/* DETAILS GRID */}
          <motion.div
            className="mt-1 w-full max-w-full sm:max-w-[580px] flex flex-col gap-4"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {/* CLIENT */}
            <motion.div className="flex items-start gap-8" variants={fadeItem}>
              <span className="w-28 shrink-0 text-xs tracking-[0.3em] uppercase text-white">
                Client
              </span>
              <span className="text-sm md:text-base text-white leading-6">
                {clientName}
              </span>
            </motion.div>

            {/* CATEGORY */}
            <motion.div className="flex items-start gap-8" variants={fadeItem}>
              <span className="w-28 shrink-0 text-xs tracking-[0.3em] uppercase text-white">
                Category
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {heroCategories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-md border border-lime-500 px-2 py-1.5 text-[10px] font-bold leading-[10px] uppercase tracking-tight text-lime-500"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* DELIVERABLES */}
            <motion.div className="flex items-start gap-8" variants={fadeItem}>
              <span className="w-28 shrink-0 text-xs tracking-[0.3em] uppercase text-white">
                Deliverables
              </span>
              <span className="text-sm md:text-base text-white leading-6">
                {deliverablesText}
              </span>
            </motion.div>

            {/* TIMELINE */}
            <motion.div className="flex items-start gap-8" variants={fadeItem}>
              <span className="w-28 shrink-0 text-xs tracking-[0.3em] uppercase text-white">
                Timeline
              </span>
              <span className="text-sm md:text-base text-white leading-6">
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
