// src/components/ProjectPage/DiscoverImg.jsx
import React from "react";
import gimg1 from "../../assets/Bookrion/g1.jpg";
import gimg2 from "../../assets/Bookrion/g2.jpg";
import gimg3 from "../../assets/Bookrion/g3.jpg";
import gimg4 from "../../assets/Bookrion/g4.jpg";
import gimg5 from "../../assets/Bookrion/g5.jpg";

const tileBase =
  "relative overflow-hidden rounded-2xl border border-white/70 " +
  "bg-black/40 shadow-[0_0_35px_rgba(0,0,0,0.9)] " +
  "transition-all duration-300 ease-out " +
  "hover:border-lime-400 hover:shadow-[0_0_45px_rgba(190,242,100,0.45)] " +
  "hover:-translate-y-[3px]";

// ----- LAYOUTS -----

const Bento5 = ({ images }) => {
  const [img1, img2, img3, img4, img5] = images;
  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-3">
      {/* 1 – top left */}
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:row-start-1 aspect-[4/3]`}
      >
        <img
          src={img1}
          alt="Gallery 1"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 2 – big hero spanning two columns */}
      <div
        className={`${tileBase} col-span-3 md:col-span-2 md:row-start-1 aspect-[8/3]`}
      >
        <img
          src={img2}
          alt="Gallery 2"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 3,4,5 – bottom row */}
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:row-start-2 aspect-square`}
      >
        <img
          src={img3}
          alt="Gallery 3"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:row-start-2 aspect-square`}
      >
        <img
          src={img4}
          alt="Gallery 4"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:row-start-2 aspect-square`}
      >
        <img
          src={img5}
          alt="Gallery 5"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

const Bento6 = ({ images }) => {
  const [img1, img2, img3, img4, img5, img6] = images;
  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-3 md:[grid-auto-rows:170px]">
      {/* 1 – wide hero, top-left spanning two columns */}
      <div
        className={`${tileBase} col-span-3 md:col-span-2 md:col-start-1 md:row-start-1 md:row-span-1 aspect-[4/3] md:aspect-[16/9]`}
      >
        <img
          src={img1}
          alt="Gallery 1"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 2 – tall tile on the right spanning 2 rows */}
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-3 md:row-start-1 md:row-span-2 aspect-[3/4]`}
      >
        <img
          src={img2}
          alt="Gallery 2"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 3,4 – middle row */}
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-1 md:row-start-2 aspect-square`}
      >
        <img
          src={img3}
          alt="Gallery 3"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-2 md:row-start-2 aspect-square`}
      >
        <img
          src={img4}
          alt="Gallery 4"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 5,6 – bottom left & middle */}
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-1 md:row-start-3 aspect-square`}
      >
        <img
          src={img5}
          alt="Gallery 5"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-2 md:row-start-3 aspect-square`}
      >
        <img
          src={img6}
          alt="Gallery 6"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

const Bento7 = ({ images }) => {
  const [img1, img2, img3, img4, img5, img6, img7] = images;
  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-3 md:[grid-auto-rows:160px]">
      {/* Row 1 */}
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-1 md:row-start-1 md:row-span-1`}
      >
        <img
          src={img1}
          alt="Gallery 1"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-2 md:row-start-1 md:row-span-3`}
      >
        <img
          src={img2}
          alt="Gallery 2"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-3 md:row-start-1 md:row-span-1`}
      >
        <img
          src={img3}
          alt="Gallery 3"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Row 2 */}
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-1 md:row-start-2 md:row-span-1`}
      >
        <img
          src={img4}
          alt="Gallery 4"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-3 md:row-start-2 md:row-span-1`}
      >
        <img
          src={img5}
          alt="Gallery 5"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Row 3 */}
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-1 md:row-start-3 md:row-span-1`}
      >
        <img
          src={img6}
          alt="Gallery 6"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`${tileBase} col-span-3 md:col-span-1 md:col-start-3 md:row-start-3 md:row-span-1`}
      >
        <img
          src={img7}
          alt="Gallery 7"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

const SimpleGrid = ({ images }) => (
  <div className="grid gap-4 md:gap-6 md:grid-cols-3">
    {images.map((src, i) => (
      <div
        key={i}
        className={`${tileBase} aspect-square col-span-3 md:col-span-1`}
      >
        <img
          src={src}
          alt={`Gallery ${i + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
    ))}
  </div>
);

const DiscoverImg = ({ project }) => {
  // Prefer new schema, fall back to old + local images
  const rawGallery =
    (project?.images?.gallery && project.images.gallery.length
      ? project.images.gallery
      : project?.galleryImages && project.galleryImages.length
      ? project.galleryImages
      : []) || [];

  let images = rawGallery.filter(Boolean);

  // Fallback demo images if nothing in DB yet
  if (!images.length) {
    images = [gimg1, gimg2, gimg3, gimg4, gimg5, gimg2, gimg3];
  }

  if (images.length > 7) images = images.slice(0, 7);

  const count = images.length;

  return (
    <section className="relative w-full bg-[#050505] pt-10 pb-24">
      {/* glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-lime-500/18 blur-[180px]" />
        <div className="absolute right-[-40px] bottom-[-40px] h-64 w-64 rounded-full bg-lime-500/14 blur-[190px]" />
      </div>

      <div className="relative mx-auto max-w-[1224px] px-4 lg:px-6">
        {count === 5 && <Bento5 images={images} />}
        {count === 6 && <Bento6 images={images} />}
        {count >= 7 && <Bento7 images={images} />}
        {count < 5 && <SimpleGrid images={images} />}
      </div>
    </section>
  );
};

export default DiscoverImg;
