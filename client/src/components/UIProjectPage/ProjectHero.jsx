import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImg from "./HeroImg";
import { richHtmlToText } from "../../utils/richTextClean";

const splitRoleDescription = (value) => {
  const raw = richHtmlToText(value); // ✅ converts HTML (and figmeta junk) into clean text
  const lines = raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (lines.length >= 2) {
    return { roleName: lines[0], roleIntro: lines.slice(1).join(" ") };
  }
  return { roleName: "", roleIntro: raw.trim() };
};

const ProjectHero = ({ project }) => {
  const navigate = useNavigate();

  const title = project?.hero?.title || project?.name || "UI Project";
  const subtitle = project?.hero?.subtitle || "A UI/UX case study project.";
  const dateLabel = project?.hero?.dateLabel || "";

  const roleTitle = project?.hero?.roleTitle || "My Role";

  // ✅ roleDescription may be rich HTML from admin editor
  const { roleName: rdName, roleIntro: rdIntro } = splitRoleDescription(
    project?.hero?.roleDescription,
  );

  const roleName =
    rdName || project?.hero?.roleName || "Product Designer (End-to-End)";

  const roleIntro =
    rdIntro ||
    project?.hero?.roleIntro ||
    "I led the product from research to final UI, owning:";

  const roleBullets =
    Array.isArray(project?.hero?.roleBullets) && project.hero.roleBullets.length
      ? project.hero.roleBullets
      : [
          "UX research & synthesis",
          "User personas",
          "User flows & information architecture",
          "UX writing",
          "Wireframing & high-fidelity UI design",
          "Usability testing and iteration",
        ];

  const timelineTitle = "Timeline";
  const timelineValue = project?.hero?.timelineLabel || "";

  const heroSrc = project?.images?.hero || project?.mainImage || null;

  return (
    <section className="relative w-full overflow-hidden bg-[#070707] pt-24 pb-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[28%] top-[12%] h-[520px] w-[520px] rounded-full bg-lime-500/14 blur-[140px]" />
        <div className="absolute -left-[22%] bottom-[-10%] h-[560px] w-[560px] rounded-full bg-emerald-500/14 blur-[160px]" />
        <div className="absolute -right-[28%] top-[10%] h-[520px] w-[520px] rounded-full bg-lime-500/12 blur-[150px]" />
        <div className="absolute -right-[18%] bottom-[-18%] h-[560px] w-[560px] rounded-full bg-emerald-500/12 blur-[170px]" />
        <div className="absolute left-1/2 top-[-25%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-white/6 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_110%_at_50%_35%,transparent_0%,rgba(0,0,0,0.88)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[980px] px-4 sm:px-8">
        <header className="mx-auto max-w-[760px] text-left">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              mx-auto inline-flex items-center justify-center
              rounded-full
              border border-white/12
              bg-white/[0.05]
              px-4 py-2
              backdrop-blur-md
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              transition
              hover:bg-white/[0.08]
              hover:border-white/20
            "
          >
            <span className="text-xs leading-5 text-white/75">
              Back
            </span>
          </button>

          <h1
            className="
              mt-5
              font-['Outfit'] font-semibold
              tracking-[-0.02em]
              text-transparent bg-clip-text
              bg-[linear-gradient(180deg,#F4F4F4_0%,#CFCFCF_45%,#7B7B7B_100%)]
              drop-shadow-[0_10px_28px_rgba(0,0,0,0.6)]
              text-[clamp(40px,6vw,56px)]
              leading-[1.05]
            "
          >
            {title}
          </h1>

          <p
            className="
              mt-3 max-w-[720px]
             
              text-[rgba(255,255,255,0.44)]
              tracking-[-0.6px] sm:tracking-[-0.8px] lg:tracking-[-1px]
              text-[16px] leading-[22px]
              sm:text-[18px] sm:leading-[24px]
              md:text-[20px] md:leading-[26px]
              lg:text-[24px] lg:leading-[28px]
            "
          >
            {subtitle}
          </p>

          {!!dateLabel && (
            <p
              className="
                mt-4
               
                text-[rgba(255,255,255,0.44)]
                tracking-[-0.6px] sm:tracking-[-0.8px] lg:tracking-[-1px]
                text-[16px] leading-[22px]
                sm:text-[18px] sm:leading-[24px]
                md:text-[20px] md:leading-[26px]
                lg:text-[24px] lg:leading-[28px]
              "
            >
              {dateLabel}
            </p>
          )}
        </header>

        <div className="mt-10 sm:mt-12">
          <HeroImg src={heroSrc} />
        </div>

        <div className="mt-14 sm:mt-16 space-y-12">
          {/* My Role */}
          <section className="mx-auto grid max-w-[860px] gap-6 md:grid-cols-[170px_minmax(0,1fr)] md:gap-10">
            <h2 className="text-[22px] sm:text-[24px] md:text-[26px] font-semibold text-[#F5F5F5]">
              {roleTitle}
            </h2>

            <div className="text-[14px] leading-7 text-white">
              <p className="font-medium">{roleName}</p>
              <p className="mt-1 text-white/85">{roleIntro}</p>

              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-white/90">
                {roleBullets.map((b, i) => (
                  <li key={`${b}-${i}`}>{b}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Timeline */}
          {!!timelineValue && (
            <section className="mx-auto grid max-w-[860px] gap-6 md:grid-cols-[170px_minmax(0,1fr)] md:gap-10">
              <h2 className="text-[22px] sm:text-[24px] md:text-[26px] font-semibold text-[#F5F5F5]">
                {timelineTitle}
              </h2>

              <p className="text-[14px] font-medium leading-7 text-white">
                {timelineValue}
              </p>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
