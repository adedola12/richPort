import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";

import ydpayThumb    from "../../assets/YDpay/iphone15pro.png";
import bookrionThumb from "../../assets/Bookrion/mainSign.jpg";
import wi1           from "../../assets/workImg/WI1.png";
import wi2           from "../../assets/workImg/WI2.jpg";
import wi3           from "../../assets/workImg/WI3.jpg";

const CARDS = [
  {
    id: "uiux",
    tag: "UI / UX Design",
    title: "YDPay Mobile Redesign",
    subtitle: "App Design",
    href: "/ui-projects/ydpay-mobile-redesign",
    accent: "#01BA4B",
    img: ydpayThumb,
    imgPos: "center top",
  },
  {
    id: "brand",
    tag: "Brand Design",
    title: "Tab Studio",
    subtitle: "Identity System",
    href: "/projects/tab-studio",
    accent: "#818cf8",
    img: bookrionThumb,
    imgPos: "center center",
  },
  {
    id: "niqs",
    tag: "Brand & Digital",
    title: "NIQS",
    subtitle: "Institutional Redesign",
    href: "/ui-projects/niqs",
    accent: "#D9B650",
    img: "/NIQSEmblemDark.png",
    imgPos: "center center",
  },
  {
    id: "publication",
    tag: "Publication Design",
    title: "Editorial Works",
    subtitle: "Digital Illustrations & Editorial",
    href: "/projects",
    accent: "#e879f9",
    img: wi2,
    imgPos: "center center",
  },
  {
    id: "website",
    tag: "Website Design",
    title: "Web Projects",
    subtitle: "Live & Interactive",
    href: "/website-design",
    accent: "#22d3ee",
    img: wi1,
    imgPos: "center center",
  },
  {
    id: "presentation",
    tag: "Presentation Design",
    title: "Deck Design",
    subtitle: "Pitch Decks · Slide Design",
    href: "/presentation-design",
    accent: "#f97316",
    img: wi3,
    imgPos: "center center",
  },
];

// Final fan state
const FAN = [
  { rotate: -38, x: -430, y: 168 },
  { rotate: -22, x: -255, y:  72 },
  { rotate:  -7, x:  -88, y:  12 },
  { rotate:   7, x:   88, y:  17 },
  { rotate:  22, x:  255, y:  76 },
  { rotate:  38, x:  430, y: 172 },
];

// Card dimensions
const W = 320;
const H = 450;

const Card = ({ card, fan, scrollProgress, stackIndex }) => {
  const [hovered, setHovered] = useState(false);
  const tiltRef = useRef(null);

  // Scroll-driven fan
  // 150vh wrapper: entry 0→0.40, hold 0.40→0.60, exit 0.60→1.0
  const rotate  = useTransform(scrollProgress, [0, 0.36, 0.60, 0.74, 1.0], [0, fan.rotate, fan.rotate, 0, 0]);
  const x       = useTransform(scrollProgress, [0, 0.36, 0.60, 0.74, 1.0], [0, fan.x, fan.x, 0, 0]);
  const y       = useTransform(scrollProgress, [0, 0.36, 0.60, 0.74, 1.0], [0, fan.y, fan.y, 0, 0]);
  const opacity = useTransform(scrollProgress, [0, 0.06, 0.82, 1.0], [0, 1, 1, 0]);

  // Cursor-driven 3-D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 280, damping: 26 });
  const springTiltY = useSpring(tiltY, { stiffness: 280, damping: 26 });

  const handleMouseMove = (e) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const ny = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    tiltY.set(nx * 11);
    tiltX.set(-ny * 9);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        width: W,
        height: H,
        rotate,
        x,
        y,
        opacity,
        zIndex: stackIndex,
        transformOrigin: "center center",
      }}
    >
      {/* perspective parent so tilt looks 3-D */}
      <div style={{ perspective: "900px", width: "100%", height: "100%" }}>
        <motion.div
          ref={tiltRef}
          animate={{ y: hovered ? -26 : 0 }}
          style={{
            width: "100%",
            height: "100%",
            rotateX: springTiltX,
            rotateY: springTiltY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
        <Link to={card.href} style={{ display: "block", width: "100%", height: "100%" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 18,
              overflow: "hidden",
              position: "relative",
              border: hovered
                ? `1px solid ${card.accent}60`
                : "1px solid rgba(255,255,255,0.09)",
              boxShadow: hovered
                ? `0 0 0 1px ${card.accent}30, 0 0 28px ${card.accent}45, 0 28px 60px rgba(0,0,0,0.85)`
                : "0 6px 40px rgba(0,0,0,0.75)",
              transition: "box-shadow 0.25s ease, border-color 0.25s ease",
            }}
          >
            {/* project image — greyscale, darkened */}
            <img
              src={card.img}
              alt={card.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: card.imgPos,
                filter: hovered ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.65)",
                transition: "filter 0.3s ease",
              }}
            />

            {/* bottom gradient scrim */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 28%, rgba(0,0,0,0.2) 52%, transparent 100%)",
              }}
            />

            {/* accent glow on hover */}
            {hovered && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  height: 80,
                  background: `radial-gradient(ellipse, ${card.accent}35 0%, transparent 70%)`,
                  filter: "blur(8px)",
                }}
              />
            )}

            {/* card text */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* tag */}
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: card.accent,
                  fontWeight: 600,
                }}
              >
                {card.tag}
              </span>

              {/* bottom text */}
              <div>
                <div
                  style={{
                    width: 28,
                    height: 2,
                    borderRadius: 2,
                    background: card.accent,
                    opacity: 0.7,
                    marginBottom: 10,
                  }}
                />
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>
                  {card.subtitle}
                </p>
                <h3
                  style={{
                    fontSize: 26,
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 600,
                    color: "white",
                    lineHeight: 1.1,
                  }}
                >
                  {card.title}
                </h3>
              </div>
            </div>
          </div>
        </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const PickACard = () => {
  const wrapperRef = useRef(null);

  // ["start end","end start"] → progress=0 the moment section enters viewport bottom
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  // Raw progress drives the fan — no spring lag, stays 1:1 with scroll
  // Light spring only on heading so it doesn't feel jarring
  const headingProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  const headingOpacity = useTransform(headingProgress, [0, 0.12, 0.84, 1], [0, 1, 1, 0]);
  const headingY = useTransform(headingProgress, [0, 0.12], [18, 0]);

  return (
    <>
      {/* ── MOBILE: snap-scroll horizontal carousel (hidden on md+) ── */}
      <section className="md:hidden bg-[#050505] py-14 px-4">
        <div className="mb-8 text-center">
          <h2
            className="text-[36px] font-['Outfit'] font-semibold leading-none tracking-[-0.04em]"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #7a7a7a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Pick a Card
          </h2>
          <p className="mt-2 text-[13px] text-neutral-400">
            Selected projects across brand, product, and design.
          </p>
        </div>

        {/* snap-scroll track */}
        <div
          className="flex gap-4 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`.snap-track::-webkit-scrollbar { display: none; }`}</style>
          {CARDS.map((card) => (
            <Link
              key={card.id}
              to={card.href}
              style={{
                scrollSnapAlign: "center",
                flexShrink: 0,
                width: "72vw",
                maxWidth: 280,
                height: 380,
                borderRadius: 18,
                overflow: "hidden",
                position: "relative",
                border: `1px solid rgba(255,255,255,0.09)`,
                display: "block",
              }}
            >
              <img
                src={card.img}
                alt={card.title}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: card.imgPos,
                  filter: "grayscale(1) brightness(0.65)",
                }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 28%, rgba(0,0,0,0.2) 52%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: card.accent, fontWeight: 600 }}>{card.tag}</span>
                <div>
                  <div style={{ width: 24, height: 2, borderRadius: 2, background: card.accent, opacity: 0.7, marginBottom: 8 }} />
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 3 }}>{card.subtitle}</p>
                  <h3 style={{ fontSize: 22, fontFamily: "Outfit, sans-serif", fontWeight: 600, color: "white", lineHeight: 1.1 }}>{card.title}</h3>
                </div>
              </div>
            </Link>
          ))}
          {/* trailing spacer so last card centres */}
          <div style={{ flexShrink: 0, width: "14vw" }} />
        </div>

        <p className="mt-4 text-center text-[10px] tracking-widest uppercase text-neutral-600">
          Swipe to explore · Tap to open
        </p>
      </section>

      {/* ── DESKTOP: sticky fan animation (hidden below md) ── */}
      <section id="pick-a-card" ref={wrapperRef} className="relative bg-[#050505] hidden md:block" style={{ height: "150vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

          {/* ambient glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 600, height: 400, background: "radial-gradient(ellipse, rgba(132,204,22,0.05) 0%, transparent 70%)", filter: "blur(30px)" }}
          />

          {/* card stack */}
          <div style={{ position: "relative", width: W, height: H, marginTop: -60 }}>
            {CARDS.map((card, i) => (
              <Card key={card.id} card={card} fan={FAN[i]} scrollProgress={scrollYProgress} stackIndex={i} />
            ))}
          </div>

          {/* heading */}
          <motion.div className="text-center pointer-events-none mt-20" style={{ opacity: headingOpacity, y: headingY }}>
            <h2
              className="text-[44px] sm:text-[58px] lg:text-[72px] font-['Outfit'] font-semibold leading-none tracking-[-0.04em]"
              style={{ background: "linear-gradient(180deg, #ffffff 0%, #7a7a7a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Pick a Card
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-neutral-400">
              Selected projects across brand, product, and design.
            </p>
          </motion.div>

          {/* hint */}
          <motion.p
            className="absolute text-[11px] tracking-widest uppercase text-neutral-600 pointer-events-none"
            style={{ bottom: "8%", opacity: useTransform(scrollYProgress, [0.34, 0.42, 0.58, 0.66], [0, 1, 1, 0]) }}
          >
            Hover to preview · Click to explore
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default PickACard;
