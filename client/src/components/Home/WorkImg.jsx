// src/components/home/WorkImg.jsx
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";

import wi1 from "../../assets/workImg/WI1.png";
import wi2 from "../../assets/workImg/WI2.jpg";
import wi3 from "../../assets/workImg/WI3.jpg";
import wi4 from "../../assets/workImg/WI4.jpg";
import wi5 from "../../assets/workImg/WI5.png";

const cards = [wi1, wi2, wi3, wi4, wi5];

/* ------- carousel config ------- */
const ROTATION_INTERVAL = 3500;

/* layout config for desktop carousel */
const CARD_WIDTH = 320;
const CARD_GAP = 40;
const SLOT_OFFSET = CARD_WIDTH + CARD_GAP;

// pixels per ms
const SPEED = SLOT_OFFSET / ROTATION_INTERVAL;

const WorkImg = () => {
  const [isHovered, setIsHovered] = useState(false);

  const positionRef = useRef(0);
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  const n = cards.length;
  const setWidth = n * SLOT_OFFSET; // width of one logical set

  // Repeat cards enough times to fill even ultra-wide screens (4 copies = 20 cards ≈ 7200px)
  const repeatedCards = useMemo(() => [...cards, ...cards, ...cards, ...cards], []);

  const [activeIndexFloat, setActiveIndexFloat] = useState(0);

  const animate = useCallback((timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    positionRef.current += SPEED * dt;

    const offsetX = -(positionRef.current % setWidth);
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetX}px, 0, 0)`;
    }

    setActiveIndexFloat((positionRef.current / SLOT_OFFSET) % n);

    rafRef.current = requestAnimationFrame(animate);
  }, [setWidth, n]);

  useEffect(() => {
    if (isHovered) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
      return;
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [isHovered, animate]);

  return (
    <section className="relative z-20 w-full overflow-hidden bg-[#050505] py-16">
      {/* Green glow behind cards */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-lime-500/18 blur-[180px]" />
        <div className="absolute right-[-80px] bottom-[-40px] h-96 w-96 rounded-full bg-lime-500/25 blur-[220px]" />
      </div>

      {/* ---------- MOBILE / TABLET: horizontal scroll ---------- */}
      <div className="relative flex gap-6 overflow-x-auto px-4 py-2 lg:hidden">
        {cards.map((src, index) => (
          <div
            key={index}
            className="
              group flex-none
              w-[260px] sm:w-[290px]
              h-[260px] sm:h-[300px]
              rounded-2xl px-3.5 pt-3.5
              bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-800
              border border-neutral-700
              shadow-[0_0_22px_rgba(0,0,0,0.75)]
              transition-transform duration-500
              hover:-translate-y-3 hover:scale-[1.04]
              hover:border-lime-400 hover:shadow-[0_0_30px_rgba(190,242,100,0.45)]
            "
          >
            <div className="h-full w-full overflow-hidden rounded-xl border border-lime-400/70">
              <img
                src={src}
                alt={`Selected work ${index + 1}`}
                className="
                  h-full w-full object-cover grayscale
                  transition duration-500 ease-out
                  group-hover:grayscale-0 group-hover:scale-[1.05]
                "
              />
            </div>
          </div>
        ))}
      </div>

      {/* ---------- DESKTOP: full-width infinite looping carousel ---------- */}
      <div
        className="relative hidden h-[430px] items-center overflow-hidden lg:flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Track — NO max-width, stretches edge to edge */}
        <div
          ref={trackRef}
          className="flex h-full items-center"
          style={{ willChange: "transform" }}
        >
          {repeatedCards.map((src, index) => {
            const originalIndex = index % n;

            let diff = Math.abs(originalIndex - activeIndexFloat);
            diff = Math.min(diff, n - diff);

            let scale = 0.9;
            let opacity = 0.75;
            let y = -4;
            let zIndex = 30;

            if (diff < 0.5) {
              scale = 1.06;
              opacity = 1;
              y = -22;
              zIndex = 50;
            } else if (diff < 1.5) {
              scale = 0.96;
              opacity = 0.88;
              y = -12;
              zIndex = 40;
            }

            return (
              <div
                key={index}
                style={{ marginRight: CARD_GAP }}
                className="relative flex-none"
              >
                <div
                  className="
                    group relative
                    w-[280px] h-[360px]
                    rounded-2xl px-3.5 pt-3.5
                    bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-800
                    border border-neutral-700
                    shadow-[0_0_22px_rgba(0,0,0,0.75)]
                    transition-transform duration-500
                    hover:-translate-y-3 hover:scale-[1.06]
                    hover:border-lime-400 hover:shadow-[0_0_34px_rgba(190,242,100,0.55)]
                  "
                  style={{
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition:
                      "transform 900ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 900ms ease-out",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="h-full w-full overflow-hidden rounded-xl border border-lime-400/70">
                    <img
                      src={src}
                      alt={`Selected work ${originalIndex + 1}`}
                      className="
                        h-full w-full object-cover grayscale
                        transition duration-500 ease-out
                        group-hover:grayscale-0 group-hover:scale-[1.05]
                      "
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkImg;
