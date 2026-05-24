// src/components/TransImg.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// adjust this path to your actual fallback image
import signImg from "../../assets/Bookrion/mainSign.jpg";

const API_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";

// Scroll-in animation for the whole block
const containerVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
  },
};

// Fade between images
const slideVariants = {
  initial: { opacity: 0, scale: 1.02 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const TransImg = () => {
  const [images, setImages] = useState([]); // [{id, name, mainImage}]
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch only main images from backend
  useEffect(() => {
    const fetchMainImages = async () => {
      if (!API_BASE) {
        setImages([]);
        setCurrentIndex(0);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/projects/main-images`);
        if (!res.ok) throw new Error("Failed to fetch project images");
        const data = await res.json();
        const cleaned = (Array.isArray(data) ? data : []).filter(
          (p) => p.mainImage
        );
        setImages(cleaned);
        setCurrentIndex(0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMainImages();
  }, []);

  // 10-second auto-slide
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000); // 10 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const current = images[currentIndex] || null;
  const mainImageUrl = current?.mainImage || signImg;
  const altText = current?.name
    ? `${current.name} main visual`
    : "Project main visual";

  return (
    <section className="relative w-full bg-[#050505] py-4">
      <motion.div
        className="relative mx-auto max-w-[1200px] px-4 lg:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <div className="relative mx-auto max-w-[1222px] aspect-[4/5] sm:aspect-[1222/631]">
          {/* Glow */}
          <div
            className="
              pointer-events-none
              absolute inset-[-28px]
              rounded-[46px]
              bg-lime-400/18
              blur-3xl
            "
          />
          {/* Frame */}
          <div
            className="
              relative
              h-full w-full
              rounded-[32px]
              border-2 border-lime-500
              bg-black/20
              shadow-[0_0_40px_rgba(0,0,0,0.85)]
              overflow-hidden
            "
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current ? current.id : "placeholder"}
                src={mainImageUrl}
                alt={altText}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TransImg;
