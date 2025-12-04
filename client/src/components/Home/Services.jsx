import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    name: "Book Rion",
    url: "https://bookrion.example",
    tags: [
      "Brand Guidelines",
      "Visual Identity",
      "Website Design",
      "Landing Page",
    ],
    categories: ["Brand Identity", "Website Designs", "Graphic Designs"],
    description:
      "We developed a visually stunning and user-friendly platform for a boutique, conversion-focused brand.",
  },
  {
    name: "ADLM Studio",
    url: "https://adlmstudio.example",
    tags: [
      "Brand Identity",
      "Design System",
      "Product UI/UX",
      "Marketing Assets",
    ],
    categories: ["Brand Identity", "Product UI/UX Designs"],
    description:
      "A cohesive brand and product experience for a digital studio, crafted to feel modern and intuitive.",
  },
  {
    name: "L’eta Global Resources",
    url: "https://letaglobal.example",
    tags: [
      "Brand Strategy",
      "Web Experience",
      "Design System",
      "Visual Identity",
    ],
    categories: ["Website Designs", "Brand Identity"],
    description:
      "A polished B2B experience that communicates trust, clarity, and premium service for a global brand.",
  },
  {
    name: "Verde Luxe",
    url: "https://verdeluxe.example",
    tags: ["Brand Guidelines", "Packaging", "UI Concepts", "Campaign Assets"],
    categories: ["Graphic Designs", "Product UI/UX Designs"],
    description:
      "A warm, luxurious look and feel for a lifestyle brand, translating their values into visuals.",
  },
];

const tabs = [
  "Brand Identity",
  "Website Designs",
  "Product UI/UX Designs",
  "Graphic Designs",
];

const Services = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const filteredProjects = projects.filter((p) =>
    p.categories?.includes(activeTab)
  );

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate("/projects");
  };

  return (
    <section className="relative w-full bg-[#050505] py-20 lg:py-24">
      {/* subtle glow behind the whole block */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[25%] h-80 w-80 -translate-x-1/2 rounded-full bg-lime-500/15 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
        {/* MAIN CONTAINER */}
        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-black/95 px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 shadow-[0_0_40px_rgba(0,0,0,0.85)]">
          {/* HEADER */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 backdrop-blur">
              <span className="text-xs font-semibold tracking-tight text-white font-['Mont']">
                Services / Work
              </span>
            </div>

            <div className="flex flex-col items-center gap-4">
              {/* GRADIENT HEADING */}
              <h2
                className="
                  max-w-[880px]
                  text-2xl sm:text-3xl md:text-4xl lg:text-[40px]
                  font-medium font-['Outfit']
                  leading-snug lg:leading-[1.2]
                  bg-gradient-to-b from-white via-white to-neutral-300
                  bg-clip-text text-transparent
                "
              >
                Custom design solutions for
                <br className="hidden sm:block" />
                your requirements.
              </h2>

              <p className="max-w-[600px] text-sm sm:text-base font-normal leading-6 text-neutral-200 font-['Lexend']">
                I specialize in crafting user-centered solutions for businesses
                and individuals. Let&apos;s create something extraordinary
                together.
              </p>
            </div>
          </div>

          {/* FILTER TABS (functional) */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-white/30 bg-gradient-to-br from-neutral-700/30 via-neutral-800/30 to-neutral-900/60 p-2 backdrop-blur">
              {tabs.map((tab) => {
                const isActive = tab === activeTab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      rounded-xl px-4 py-2 text-xs font-medium font-['Lexend']
                      transition
                      ${
                        isActive
                          ? "bg-white/10 text-white shadow border border-white/40"
                          : "text-stone-300 hover:bg-white/5"
                      }
                    `}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PROJECT GRID */}
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <article
                key={project.name + index}
                className="
                  group flex flex-col justify-between
                  rounded-2xl border border-lime-500/40
                  bg-gradient-to-br from-neutral-700/35 via-neutral-800/60 to-neutral-900/90
                  px-5 py-6 sm:px-8 sm:py-8
                  shadow-[0_0_25px_rgba(0,0,0,0.7)]
                  transition
                  hover:-translate-y-1 hover:border-lime-400
                  hover:shadow-[0_0_35px_rgba(190,242,100,0.2)]
                "
              >
                {/* TOP TEXT CONTENT */}
                <div className="flex flex-col gap-4">
                  {/* Title + Button */}
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-medium leading-7 text-white font-['Outfit']">
                      {project.name}
                    </h3>
                    <button
                      className="
                        whitespace-nowrap rounded-md border border-white/70
                        bg-white/10 px-4 py-2
                        text-xs font-medium text-white font-['Lexend']
                        hover:bg-white/20
                      "
                    >
                      View Project
                    </button>
                  </div>

                  {/* URL */}
                  <div className="inline-flex items-center rounded-md bg-neutral-900 px-3 py-1.5">
                    <span className="text-[11px] font-semibold text-neutral-400 font-['Mont'] truncate">
                      {project.url}
                    </span>
                  </div>

                  {/* TAGS */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-md border border-lime-500/70 px-2 py-1
                          text-[10px] font-bold uppercase tracking-tight text-lime-400 font-['Mont']
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-1 text-sm font-light leading-6 text-neutral-300 font-['Lexend']">
                    {project.description}
                  </p>
                </div>

                {/* IMAGE PREVIEW */}
                <div className="mt-6 overflow-hidden rounded-xl border border-neutral-700 bg-black">
                  <img
                    src="https://placehold.co/800x450"
                    alt={`${project.name} preview`}
                    className="
                      h-44 w-full object-cover
                      transition duration-500
                      group-hover:scale-[1.03]
                    "
                  />
                </div>
              </article>
            ))}
          </div>

          {/* VIEW ALL BUTTON */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleViewClick}
              className="
                inline-flex h-12 items-center justify-center
                rounded-xl border border-white/80
                px-8
                text-sm sm:text-base font-normal text-white font-['Lexend']
                hover:bg-white hover:text-black
                transition
              "
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
