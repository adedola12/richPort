// src/components/ProjectPage/DiscoverImg.jsx
import React from "react";
import gimg1 from "../../assets/Bookrion/g1.jpg";
import gimg2 from "../../assets/Bookrion/g2.jpg";
import gimg3 from "../../assets/Bookrion/g3.jpg";
import gimg4 from "../../assets/Bookrion/g4.jpg";
import gimg5 from "../../assets/Bookrion/g5.jpg";

const DiscoverImg = ({ project }) => {
  // Later, from MongoDB: project.galleryImages = [url1, url2, url3, url4, url5]
  const gallery = project?.galleryImages || [gimg1, gimg2, gimg3, gimg4, gimg5];
  const [img1, img2, img3, img4, img5] = gallery;

  const tileBase =
    "relative overflow-hidden rounded-2xl border border-white/70 " +
    "bg-black/40 shadow-[0_0_35px_rgba(0,0,0,0.9)] " +
    "transition-all duration-300 ease-out " +
    "hover:border-lime-400 hover:shadow-[0_0_45px_rgba(190,242,100,0.45)] " +
    "hover:-translate-y-[3px]";

  return (
    <section className="relative w-full bg-[#050505] pt-10 pb-24">
      {/* soft lime glows around edges */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-lime-500/18 blur-[180px]" />
        <div className="absolute right-[-40px] bottom-[-40px] h-64 w-64 rounded-full bg-lime-500/14 blur-[190px]" />
      </div>

      <div className="relative mx-auto max-w-[1224px] px-4 lg:px-6">
        {/* Desktop: 3-column grid positioned like Figma.
            Mobile: each tile becomes full-width stacked. */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          {/* PHONE – top left */}
          <div
            className={`${tileBase} col-span-3 md:col-span-1 md:col-start-1 md:row-start-1 aspect-[4/3]`}
          >
            <img
              src={img1}
              alt="Project visual 1"
              className="h-full w-full object-cover"
            />
          </div>

          {/* BIG STRIPE CARD – top right spanning two columns */}
          <div
            className={`${tileBase} col-span-3 md:col-span-2 md:col-start-2 md:row-start-1 aspect-[8/3]`}
          >
            <img
              src={img3}
              alt="Project visual 3"
              className="h-full w-full object-cover"
            />
          </div>

          {/* TOTE – bottom left */}
          <div
            className={`${tileBase} col-span-3 md:col-span-1 md:col-start-1 md:row-start-2 aspect-square`}
          >
            <img
              src={img2}
              alt="Project visual 2"
              className="h-full w-full object-cover"
            />
          </div>

          {/* BOOK – bottom middle */}
          <div
            className={`${tileBase} col-span-3 md:col-span-1 md:col-start-2 md:row-start-2 aspect-square`}
          >
            <img
              src={img4}
              alt="Project visual 4"
              className="h-full w-full object-cover"
            />
          </div>

          {/* SMALL CARD – bottom right */}
          <div
            className={`${tileBase} col-span-3 md:col-span-1 md:col-start-3 md:row-start-2 aspect-square`}
          >
            <img
              src={img5}
              alt="Project visual 5"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverImg;
