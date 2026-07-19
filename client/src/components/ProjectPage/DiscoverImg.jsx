// src/components/ProjectPage/DiscoverImg.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const headerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 0.61, 0.36, 1] } },
};
import { ArrowLeft01Icon, ArrowRight01Icon, Cancel01Icon } from "hugeicons-react";

import gimg1 from "../../assets/Bookrion/g1.jpg";
import gimg2 from "../../assets/Bookrion/g2.jpg";
import gimg3 from "../../assets/Bookrion/g3.jpg";
import gimg4 from "../../assets/Bookrion/g4.jpg";
import gimg5 from "../../assets/Bookrion/g5.jpg";

/* ─── Single stacking card ─── */
const StackedCard = ({ src, alt, index, total, scrollYProgress, onClick }) => {
  const targetScale = 1 - (total - 1 - index) * 0.04;

  const scale = useTransform(
    scrollYProgress,
    [index / total, (index + 1) / total],
    [1, targetScale]
  );

  return (
    <div
      className="h-screen sticky flex items-center justify-center px-3 sm:px-5"
      style={{ top: `${index * 28}px` }}
    >
      <motion.div
        className="
          relative w-full max-w-[1160px] overflow-hidden
          rounded-xl sm:rounded-2xl
          border border-white/70
          bg-black/40
          shadow-[0_0_35px_rgba(0,0,0,0.9)]
          cursor-pointer select-none
          aspect-[4/5] sm:aspect-video
          hover:border-lime-400 hover:shadow-[0_0_45px_rgba(190,242,100,0.45)]
          transition-[border-color,box-shadow] duration-300
        "
        style={{ scale, transformOrigin: "top center" }}
        onClick={onClick}
      >
        {/* counter badge */}
        <div className="absolute top-3 left-4 z-10 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/60">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
};

/* ─── Stacking gallery wrapper ─── */
const StackedGallery = ({ images, onImageClick }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} style={{ height: `${images.length * 100}vh` }}>
      {images.map((src, i) => (
        <StackedCard
          key={i}
          src={src}
          alt={`Gallery ${i + 1}`}
          index={i}
          total={images.length}
          scrollYProgress={scrollYProgress}
          onClick={() => onImageClick(i)}
        />
      ))}
    </div>
  );
};

/* ─── Lightbox variants ─── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

/* ─── Main component ─── */
const DiscoverImg = ({ project }) => {
  const rawGallery =
    (project?.images?.gallery && project.images.gallery.length
      ? project.images.gallery
      : project?.galleryImages && project.galleryImages.length
      ? project.galleryImages
      : []) || [];

  let images = rawGallery.filter(Boolean);
  if (!images.length) {
    images = [gimg1, gimg2, gimg3, gimg4, gimg5];
  }
  if (images.length > 7) images = images.slice(0, 7);

  const count = images.length;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setLightboxIndex((prev) =>
        prev === null ? prev : prev === 0 ? count - 1 : prev - 1
      );
    },
    [count]
  );

  const showNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setLightboxIndex((prev) =>
        prev === null ? prev : prev === count - 1 ? 0 : prev + 1
      );
    },
    [count]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev(e);
      if (e.key === "ArrowRight") showNext(e);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <section className="relative w-full">
      {/* section header */}
      <motion.div
        className="relative mx-auto max-w-[1160px] px-3 sm:px-5 pt-16 pb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
      >
        <motion.p
          className="text-xs font-bold tracking-[0.3em] uppercase text-lime-400 mb-3"
          variants={headerItem}
        >
          Visual Overview
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.1] tracking-[-0.02em]"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #b8b8b8 45%, #e0e0e0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            WebkitTextStroke: "0.3px rgba(210,210,210,0.4)",
          }}
          variants={headerItem}
        >
          Project Images
        </motion.h2>
        <motion.p
          className="mt-3 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[520px]"
          variants={headerItem}
        >
          Scroll through the full gallery — click any image to expand it.
        </motion.p>
      </motion.div>

      <div className="relative">
        <StackedGallery images={images} onImageClick={openLightbox} />
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-5 right-5 inline-flex items-center justify-center rounded-full border border-white/30 bg-black/60 p-2 text-white hover:bg-white/10"
            >
              <Cancel01Icon size={20} />
            </button>

            <button
              type="button"
              onClick={showPrev}
              className="absolute left-5 md:left-10 inline-flex items-center justify-center rounded-full border border-white/40 bg-black/70 p-2 md:p-3 text-white hover:bg-white/10"
            >
              <ArrowLeft01Icon size={24} />
            </button>

            <button
              type="button"
              onClick={showNext}
              className="absolute right-5 md:right-10 inline-flex items-center justify-center rounded-full border border-white/40 bg-black/70 p-2 md:p-3 text-white hover:bg-white/10"
            >
              <ArrowRight01Icon size={24} />
            </button>

            <motion.img
              key={images[lightboxIndex]}
              src={images[lightboxIndex]}
              alt={`Full image ${lightboxIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl border border-white/20 object-contain shadow-[0_0_40px_rgba(0,0,0,0.9)]"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DiscoverImg;
