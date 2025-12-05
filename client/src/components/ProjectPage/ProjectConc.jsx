import React from "react";
import { LuCheckCheck } from "react-icons/lu";
import concImg from "../../assets/Bookrion/concImg.jpg";

const ProjectConc = ({ project }) => {
  // === When backend is ready, these will come from MongoDB ===
  const conclusionTitle = project?.conclusionTitle || "Conclusion";
  const conclusionBody =
    project?.conclusionBody ||
    `The new identity gave BookRion a clear voice and visual presence, setting the tone for future product design and communication. It transformed internal alignment, simplified creative decisions, and laid the groundwork for a consistent user experience.

The system now serves as a visual foundation for the team’s ongoing development of BookRion’s digital platform and marketing assets.`;

  const conclusionImage = project?.conclusionImage || concImg;

  const ctaLabel = project?.conclusionCtaLabel || "View product case study";
  const ctaUrl = project?.conclusionCtaUrl || project?.caseStudyUrl || "#";

  return (
    <section className="relative w-full bg-[#050505] pt-20 pb-24">
      {/* soft lime glow behind this section */}
      <div className="pointer-events-none absolute left-1/2 top-[15%] h-72 w-72 -translate-x-1/2 rounded-full bg-lime-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-[1224px] px-4 lg:px-6">
        {/* ROW: text left, image right */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
          {/* LEFT: text */}
          <div className="w-full lg:w-[574px] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              {/* pill */}
              <div className="inline-flex max-w-max items-center gap-2 rounded-[20.63px] border border-white/60 bg-zinc-900 px-4 py-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-lime-500 text-lime-400">
                  <LuCheckCheck className="h-3 w-3" />
                </span>
                <span className="font-['Lexend'] text-[11px] sm:text-xs text-white leading-6 whitespace-nowrap">
                  Results
                </span>
              </div>

              {/* heading */}
              <h2 className="font-['Lexend'] text-[24px] sm:text-[26px] font-semibold leading-[1.5] text-white">
                {conclusionTitle}
              </h2>
            </div>

            {/* body */}
            <p className="font-['Lexend'] text-[13px] sm:text-[14px] lg:text-[15px] leading-7 text-white/60 text-justify whitespace-pre-line">
              {conclusionBody}
            </p>
          </div>

          {/* RIGHT: image card */}
          <div className="w-full lg:w-[574px]">
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
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="mt-16 flex justify-center">
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
        </div>
      </div>
    </section>
  );
};

export default ProjectConc;
