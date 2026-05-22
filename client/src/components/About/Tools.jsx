import React from "react";
import { motion } from "framer-motion";
import { icons } from "../../assets/icons";

/* ===== Capability pills ===== */
const CAPABILITIES = [
  "Brand Guidelines",
  "Campaigns",
  "UI/UX Design",
  "Publication Design",
  "Design Systems",
  "Product Design",
  "Landing Pages",
  "Event Branding",
  "Marketing Design",
  "Book Cover Design",
  "Logo Design",
  "Brand Identity Design",
  "Social Media Design",
  "Presentation Designs",
  "Pitch Deck Designs",
  "Company Profiles",
  "Prototyping",
  "Magazine Design",
];

/* ===== Icon rows ===== */
const ROW1 = [
  { src: icons.slack, label: "Slack" },
  { src: icons.drivelogo, label: "Google Drive" },
  { src: icons.ico, label: "FigJam / Whiteboard" },
  { src: icons.behance, label: "Behance" },
  { src: icons.zoom, label: "Zoom" },
  { src: icons.notion, label: "Notion" },
  { src: icons.teams, label: "Microsoft Teams" },
  { src: icons.ico1, label: "Design Tool" },
  { src: icons.figma, label: "Figma" },
  { src: icons.powerpoint, label: "PowerPoint" },
  { src: icons.word, label: "Word" },
  { src: icons.excel, label: "Excel" },
  { src: icons.note, label: "Notes" },
  { src: icons.outlook, label: "Outlook" },
];

const ROW2 = [
  { src: icons.gmail, label: "Gmail" },
  { src: icons.calender, label: "Google Calendar" },
  { src: icons.chrome, label: "Chrome" },
  { src: icons.docs, label: "Google Docs" },
  { src: icons.drivelogo, label: "Google Drive" },
  { src: icons.meet, label: "Google Meet" },
  { src: icons.notes, label: "Google Keep" },
  { src: icons.sheet, label: "Google Sheets" },
  { src: icons.acrobat, label: "Acrobat" },
  { src: icons.cloud, label: "Creative Cloud" },
  { src: icons.adobeBe, label: "Behance" },
  { src: icons.illustr, label: "Illustrator" },
  { src: icons.photoshop, label: "Photoshop" },
  { src: icons.adobeI, label: "InDesign" },
];

const ROW3 = [
  { src: icons.xd, label: "Adobe XD" },
  { src: icons.adoberead, label: "Reader" },
  { src: icons.adobe, label: "Adobe" },
  { src: icons.openAI, label: "OpenAI" },
  { src: icons.group24, label: "Figma-like" },
];

const ICON_BASE =
  "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.35)]";
const ICON_HOVER =
  "transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.07] hover:drop-shadow-[0_0_18px_rgba(132,204,22,0.45)]";

const Tools = () => {
  return (
    <section className="w-full bg-[#050505] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1457px] px-4">
        {/* "My Competencies" heading — left-aligned per Figma */}
        <motion.h2
          className="
            text-[28px] sm:text-[34px] lg:text-[40px]
            font-['Outfit'] font-medium
            leading-tight
            tracking-[-0.05em]
            bg-gradient-to-b from-white via-white to-neutral-300
            bg-clip-text text-transparent
            mb-10
          "
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          My Competencies
        </motion.h2>

        {/* Capability pills — Figma: rounded rect with white border, ~11px padding */}
        <motion.div
          className="mb-6 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.15,
          }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {CAPABILITIES.map((label) => (
            <span
              key={label}
              className="
                select-none rounded-[10px] border border-white/50
                bg-black/40 px-3 py-1
                text-[14px] sm:text-[15px] text-white/90 tracking-tight
                cursor-default
                transition-all duration-200 ease-out
                hover:border-[#84CC16] hover:text-white
                hover:shadow-[0_0_10px_rgba(132,204,22,0.45)]
                hover:bg-[rgba(132,204,22,0.08)]
              "
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* "...and for tools..." sub-title */}
        <motion.p
          className="mb-4 text-center text-sm sm:text-base text-white/70"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          .... and for tools...
        </motion.p>

        {/* Icon rows — Figma: 48px icons with ~48px gap */}
        <div className="mx-auto flex max-w-[1289px] flex-col items-center gap-7">
          {/* Row 1 */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.61, 0.36, 1],
              delay: 0.2,
            }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {ROW1.map(({ src, label }, i) => (
              <img
                key={`r1-${i}`}
                src={src}
                alt={label}
                title={label}
                loading="lazy"
                className={`${ICON_BASE} ${ICON_HOVER}`}
              />
            ))}
          </motion.div>

          {/* Row 2 */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.61, 0.36, 1],
              delay: 0.35,
            }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {ROW2.map(({ src, label }, i) => (
              <img
                key={`r2-${i}`}
                src={src}
                alt={label}
                title={label}
                loading="lazy"
                className={`${ICON_BASE} ${ICON_HOVER}`}
              />
            ))}
          </motion.div>

          {/* Row 3 */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.61, 0.36, 1],
              delay: 0.5,
            }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {ROW3.map(({ src, label }, i) => (
              <img
                key={`r3-${i}`}
                src={src}
                alt={label}
                title={label}
                loading="lazy"
                className={`${ICON_BASE} ${ICON_HOVER}`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
