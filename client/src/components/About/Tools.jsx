// src/components/About/Tools.jsx
import React from "react";
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
  "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.35)]";
const ICON_HOVER =
  "transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.07] hover:drop-shadow-[0_0_18px_rgba(132,204,22,0.45)]";

const Tools = () => {
  return (
    <section className="w-full bg-[#050505] py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Small title */}
        <p className="mb-8 text-center text-xs sm:text-sm text-white/80">
          Here are a few things I can do...
        </p>

        {/* Capability pills */}
        <div className="mx-auto mb-12 flex max-w-[1100px] flex-wrap justify-center gap-3 sm:gap-4">
          {CAPABILITIES.map((label) => (
            <span
              key={label}
              className="
                select-none rounded-full border border-white/70
                bg-black/40 px-4 py-1.5
                text-[11px] sm:text-xs text-white/95 tracking-tight
                shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
                transition
                hover:border-white hover:bg-white/5
              "
            >
              {label}
            </span>
          ))}
        </div>

        {/* Sub-title */}
        <p className="mb-8 text-center text-xs sm:text-sm text-white/80">
          ...and for tools...
        </p>

        {/* Icon rows */}
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-8">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-8 md:gap-10">
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
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-9">
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
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-8 md:gap-10">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
