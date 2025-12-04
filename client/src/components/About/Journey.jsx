// src/components/About/Journey.jsx
import React, { useEffect, useRef, useState } from "react";
import JImg from "../../assets/journey/JImg.jpg"; // placeholder img for now

// Max number of items to show in the tree
const MAX_JOURNEY_ITEMS = 5;

// This will eventually come from your server / Cloudinary.
const JOURNEY_ITEMS = [
  {
    id: 1,
    year: "2020",
    title: "Matte – Webflow HTML website",
    description: [
      "I’ve also worked across different teams, building my soft skills and doing my best to make sure my designs solve real problems—because at the end of the day, isn’t that what design is all about?",
      "And since I find the construction industry super fascinating (I studied Quantity Surveying, by the way), I like to think I’m discovering my purpose in connecting design and construction…",
      "…or maybe it’s the other way around.",
    ],
    imageUrl: JImg,
  },
  {
    id: 2,
    year: "2021",
    title: "Brand identity for a digital studio",
    description: [
      "From concept to launch, I’ve helped brands shape a consistent identity across digital and print touchpoints.",
      "Focusing on clarity and usability, I aim to build visuals that actually work for real users, not just look pretty.",
    ],
    imageUrl: JImg,
  },
  {
    id: 3,
    year: "2022",
    title: "Product UI for SaaS platforms",
    description: [
      "I collaborate closely with product teams to design dashboards, workflows, and interfaces that feel intuitive.",
      "My process blends wireframes, prototypes, and visual systems into one coherent experience.",
    ],
    imageUrl: JImg,
  },
  {
    id: 4,
    year: "2023",
    title: "Campaign & social media visuals",
    description: [
      "For fast-paced digital campaigns, I design graphics that stay on-brand while being bold enough to stand out.",
    ],
    imageUrl: JImg,
  },
  {
    id: 5,
    year: "2024",
    title: "Design systems & documentation",
    description: [
      "I love creating reusable components and guidelines that make it easier for teams to scale design consistently.",
    ],
    imageUrl: JImg,
  },
];

// ===== Single timeline item =====
const JourneyItem = ({ item, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // alternate layout: even index => image left, text right; odd => swap
  const imageLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        relative
        md:grid md:grid-cols-2 md:items-center
        md:gap-10 lg:gap-16
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
      `}
    >
      {/* CENTER YEAR OVER TIMELINE (desktop / tablet) */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          hidden md:flex
          -translate-x-1/2 -translate-y-1/2
          flex-col items-center z-30
        "
      >
        {/* 'Year' pill on top of the number */}
        <span className="mb-2 rounded-full border border-white/18 bg-white/6 px-4 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/85">
          Year
        </span>

        {/* Big gradient year number */}
        <span
          className="
            font-['Outfit']
            text-6xl lg:text-7xl xl:text-[80px]
            font-semibold leading-none
            bg-gradient-to-b from-white via-white to-neutral-400
            bg-clip-text text-transparent
            drop-shadow-[0_0_18px_rgba(0,0,0,0.8)]
          "
        >
          {item.year}
        </span>
      </div>

      {/* TIMELINE DOT (under the year) */}
      <div className="pointer-events-none hidden md:block absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-400 bg-[#050505] shadow-[0_0_12px_rgba(190,242,100,0.6)]" />

      {/* IMAGE CARD */}
      <div
        className={`
          order-1 mb-6 max-w-[380px] mx-auto md:mb-0
          ${
            imageLeft
              ? "md:order-1 md:ml-auto md:mr-4"
              : "md:order-2 md:mr-auto md:ml-4"
          }
        `}
      >
        <div
          className="
            relative overflow-hidden rounded-[12px]
            border border-white/25
            bg-gradient-to-br from-neutral-600/30 via-stone-500/20 to-stone-400/5
            shadow-[0_0_28px_rgba(0,0,0,0.75)]
            z-10
          "
        >
          {/* Title pill inside card */}
          <div className="absolute left-3 top-3 z-20 inline-flex items-center rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] font-medium text-white/85">
            {item.title}
          </div>

          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-[230px] w-full object-cover grayscale"
          />
        </div>
      </div>

      {/* TEXT BLOCK + MOBILE YEAR */}
      <div
        className={`
          ${
            imageLeft
              ? "md:order-2 md:pl-24 md:pr-4 md:text-left" // more padding from center
              : "md:order-1 md:pr-24 md:pl-4 md:text-right" // more padding from center
          }
        `}
      >
        <div className="flex flex-col gap-4 max-w-[520px]">
          {/* Mobile year (stacked) */}
          <div className="mb-1 flex items-center gap-3 md:hidden">
            <span className="rounded-full border border-white/18 bg-white/6 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/85">
              Year
            </span>
            <span
              className="
                font-['Outfit']
                text-3xl sm:text-4xl
                font-semibold leading-none
                bg-gradient-to-b from-white via-white to-neutral-400
                bg-clip-text text-transparent
              "
            >
              {item.year}
            </span>
          </div>

          {/* Description paragraphs */}
          <div className="space-y-3 font-['Lexend'] text-sm leading-6 text-neutral-200 sm:text-[15px]">
            {item.description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== Wrapper =====
const Journey = () => {
  const itemsToRender = JOURNEY_ITEMS.slice(0, MAX_JOURNEY_ITEMS);

  return (
    <section className="relative w-full bg-[#050505] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        {/* Section heading */}
        <p className="text-center text-xs font-medium text-white/75 sm:text-sm">
          Here are a few things I can do...
        </p>

        <div className="relative mt-12">
          {/* Central vertical timeline (desktop / tablet) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/40 via-white/15 to-transparent md:block" />

          {/* Tree items */}
          <div className="space-y-16 lg:space-y-20">
            {itemsToRender.map((item, index) => (
              <JourneyItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
