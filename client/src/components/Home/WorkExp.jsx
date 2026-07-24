// src/components/Home/WorkExp.jsx
// Work Experience → a moving "bento" grid: 4 auto-scrolling rows of real project
// mockups in a 4:5 / 3:4 portrait mix. Scroll is JS-driven (framer useAnimationFrame)
// so hovering a row eases its speed right down (no jump). Each whole TILE gets the
// cursor-driven 3D tilt + pop used on the project pages, lifting above its
// neighbours and revealing colour. Click → the project's page. Tiles are tripled
// so the loop never gaps; the block fades on all four edges into the page.
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

import tsSweat  from "../../assets/bento/ts-sweat.webp";
import tsTees   from "../../assets/bento/ts-tees.webp";
import tsId     from "../../assets/bento/ts-id.webp";
import tsNote   from "../../assets/bento/ts-note.webp";
import ydApp    from "../../assets/bento/yd-app.webp";
import ydMerch  from "../../assets/bento/yd-merch.webp";
import ydTshirt from "../../assets/bento/yd-tshirt.webp";
import ydBottle from "../../assets/bento/yd-bottle.webp";
import ydCard1  from "../../assets/bento/yd-card1.webp";
import ydCard2  from "../../assets/bento/yd-card2.webp";
import ydCard3  from "../../assets/bento/yd-card3.webp";
import ydCard4  from "../../assets/bento/yd-card4.webp";
import nqHoodie from "../../assets/bento/nq-hoodie.webp";
import nqShirt  from "../../assets/bento/nq-shirt.webp";
import nqAbout  from "../../assets/bento/nq-about.webp";
import nqExams  from "../../assets/bento/nq-exams.webp";
import nqJournal from "../../assets/bento/nq-journal.webp";
import pres1    from "../../assets/bento/pres1.webp";
import pres2    from "../../assets/bento/pres2.webp";
import pres3    from "../../assets/bento/pres3.webp";
import vlTee    from "../../assets/bento/vl-tee.webp";
import vlBottle from "../../assets/bento/vl-bottle.webp";
import clShirt  from "../../assets/bento/cl-shirt.webp";
import clId     from "../../assets/bento/cl-id.webp";
import brG1     from "../../assets/bento/br-g1.webp";
import brG3     from "../../assets/bento/br-g3.webp";
import brG4     from "../../assets/bento/br-g4.webp";
import socTech  from "../../assets/bento/soc-tech.webp";
import adlmEid  from "../../assets/bento/adlm-eid.webp";
import adlmNm   from "../../assets/bento/adlm-nm.webp";
import wsAi     from "../../assets/bento/ws-ai.webp";

const YD_APP = "/ui-projects/ydpay-mobile-redesign";
const YD_BRAND = "/projects/ydpay-brand";
const YD_GFX = "/ydpay-designs";
const TABSTUDIO = "/projects/tabstudio";
const NIQS = "/ui-projects/niqs";
const PRES = "/presentation-design";
const GFX = "/graphic-design";
const ADLM = "/adlm-studio-designs";
const WHITESPACE = "/whitespace-designs";

const BG = "#050505";
const HOVER_SPEED = 4; // px/s — near-frozen so a tile stays under the pointer

// r = frame aspect ratio; alternated across each row for the 4:5 / 3:4 mix.
const ROWS = [
  [
    { img: tsSweat,  label: "Tab Studio — Apparel",   route: TABSTUDIO,  r: "4/5" },
    { img: ydApp,    label: "YDPay — App Redesign",   route: YD_APP,     r: "3/4" },
    { img: nqHoodie, label: "NIQS — Merch",           route: NIQS,       r: "4/5" },
    { img: pres1,    label: "Pitch Deck",             route: PRES,       r: "3/4" },
    { img: vlTee,    label: "Verde Luxe — Apparel",   route: "/projects/verde-luxe", r: "4/5" },
    { img: ydCard1,  label: "YDPay — Card Design",    route: YD_GFX,     r: "3/4" },
    { img: brG1,     label: "Book Rion — Product",    route: "/projects/book-rion", r: "4/5" },
    { img: adlmEid,  label: "ADLM — Social",          route: ADLM,       r: "3/4" },
  ],
  [
    { img: tsTees,   label: "Tab Studio — Tees",      route: TABSTUDIO,  r: "3/4" },
    { img: ydMerch,  label: "YDPay — Merch",          route: YD_BRAND,   r: "4/5" },
    { img: nqAbout,  label: "NIQS — App",             route: NIQS,       r: "3/4" },
    { img: pres2,    label: "Slide Design",           route: PRES,       r: "4/5" },
    { img: clShirt,  label: "Cleanstead — Apparel",   route: "/projects/cleanstead", r: "3/4" },
    { img: ydCard2,  label: "YDPay — Card Design",    route: YD_GFX,     r: "4/5" },
    { img: socTech,  label: "Social — Campaign",      route: GFX,        r: "3/4" },
    { img: wsAi,     label: "Whitespace — Social",    route: WHITESPACE, r: "4/5" },
  ],
  [
    { img: tsId,     label: "Tab Studio — Identity",  route: TABSTUDIO,  r: "4/5" },
    { img: ydTshirt, label: "YDPay — Brand Tee",      route: YD_BRAND,   r: "3/4" },
    { img: nqExams,  label: "NIQS — App",             route: NIQS,       r: "4/5" },
    { img: pres3,    label: "Slide Design",           route: PRES,       r: "3/4" },
    { img: vlBottle, label: "Verde Luxe — Product",   route: "/projects/verde-luxe", r: "4/5" },
    { img: ydCard3,  label: "YDPay — Card Design",    route: YD_GFX,     r: "3/4" },
    { img: brG3,     label: "Book Rion — Product",    route: "/projects/book-rion", r: "4/5" },
    { img: adlmNm,   label: "ADLM — Social",          route: ADLM,       r: "3/4" },
  ],
  [
    { img: tsNote,   label: "Tab Studio — Stationery",route: TABSTUDIO,  r: "3/4" },
    { img: ydBottle, label: "YDPay — Brand",          route: YD_BRAND,   r: "4/5" },
    { img: nqShirt,  label: "NIQS — Apparel",         route: NIQS,       r: "3/4" },
    { img: nqJournal,label: "NIQS — Touchpoint",      route: NIQS,       r: "4/5" },
    { img: clId,     label: "Cleanstead — Identity",  route: "/projects/cleanstead", r: "3/4" },
    { img: ydCard4,  label: "YDPay — Card Design",    route: YD_GFX,     r: "4/5" },
    { img: brG4,     label: "Book Rion — Stationery", route: "/projects/book-rion", r: "3/4" },
  ],
];

/* One tile — cursor-driven 3D tilt applied to the WHOLE frame, which lifts
   (translateZ) and scales above its neighbours on hover. Same feel as the
   project / graphic-design tiles. */
const Tile = ({ t }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 250, damping: 20 });
  const sry = useSpring(ry, { stiffness: 250, damping: 20 });
  const scale = useSpring(1, { stiffness: 300, damping: 22 });
  const lift = useSpring(0, { stiffness: 300, damping: 22 }); // translateZ
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    ry.set(nx * 14);
    rx.set(-ny * 14);
  };
  const onEnter = () => {
    setHovered(true);
    scale.set(1.06);
    lift.set(80);
  };
  const onLeave = () => {
    setHovered(false);
    rx.set(0);
    ry.set(0);
    scale.set(1);
    lift.set(0);
  };

  return (
    <div
      className="relative mr-4 shrink-0"
      style={{ height: "clamp(210px, 24vw, 300px)", aspectRatio: t.r, perspective: 1000, zIndex: hovered ? 30 : 1 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, scale, z: lift, transformStyle: "preserve-3d", height: "100%", width: "100%" }}
        className="group relative"
      >
        <Link
          to={t.route}
          className="block h-full w-full overflow-hidden rounded-2xl border border-white/10"
          style={{
            boxShadow: hovered
              ? "0 0 0 1px rgba(137,255,0,0.30), 0 34px 70px rgba(0,0,0,0.75)"
              : "0 8px 30px rgba(0,0,0,0.6)",
          }}
        >
          <img
            src={t.img}
            alt={t.label}
            loading="lazy"
            draggable="false"
            className="
              h-full w-full object-cover object-top
              transition-[filter] duration-500 ease-out
              [filter:grayscale(1)_brightness(0.62)]
              group-hover:[filter:grayscale(0)_brightness(1)]
            "
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-55" />
          <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-1 text-[12.5px] font-medium leading-tight text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {t.label}
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

/* One marquee row — JS-driven so speed can ease smoothly on hover (no jump). */
const Row = ({ tiles, dir, base }) => {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const copyW = useRef(0);
  const speed = useRef(base);
  const target = useRef(base);
  const started = useRef(false);
  const sign = dir === "l" ? -1 : 1;

  const loop = [...tiles, ...tiles, ...tiles];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.scrollWidth / 3; // exact: each tile carries its own right margin
      if (w > 0) {
        copyW.current = w;
        if (dir === "r" && !started.current) {
          x.set(-w);
          started.current = true;
        }
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [dir, x]);

  useAnimationFrame((_t, delta) => {
    const w = copyW.current;
    if (!w || delta > 100) return; // skip huge frame gaps (tab refocus)
    speed.current += (target.current - speed.current) * Math.min(1, delta / 200);
    let nx = x.get() + sign * speed.current * (delta / 1000);
    if (nx <= -w) nx += w;
    else if (nx >= 0) nx -= w;
    x.set(nx);
  });

  // overflow-visible so a hovered tile can pop above the row without clipping;
  // horizontal overflow is contained by the section, edges faded by overlays.
  return (
    <div
      className="overflow-y-visible"
      onMouseEnter={() => { target.current = HOVER_SPEED; }}
      onMouseLeave={() => { target.current = base; }}
    >
      <motion.div ref={trackRef} className="flex w-max" style={{ x }}>
        {loop.map((t, i) => (
          <Tile key={`${t.route}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
};

const WorkExp = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-16 lg:py-24">
      <div className="relative mx-auto max-w-[1271px] px-4 lg:px-6">
        <motion.h2
          className="
            text-3xl sm:text-4xl md:text-[44px] lg:text-[54px]
            font-['Outfit'] font-semibold
            leading-tight lg:leading-[1.15]
            tracking-[-0.05em]
            bg-gradient-to-b from-white via-white to-neutral-300
            bg-clip-text text-transparent
          "
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Selected Work
        </motion.h2>
        <motion.p
          className="mt-3 max-w-[540px] text-sm sm:text-base leading-relaxed text-neutral-400"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 0.61, 0.36, 1] }}
        >
          A living wall of the brands and products I&apos;ve shaped — identities, apps, campaigns and merch. Hover to slow it down and tilt one to life, click to open its story.
        </motion.p>
      </div>

      {/* moving bento — full-bleed rows, faded on all four edges into the page.
         py gives popped tiles headroom; the fades sit ABOVE the tiles (z-40 >
         tile z-30) so a hovered top/bottom tile emerges from the fade instead of
         escaping the section. */}
      <div className="relative mt-10">
        <motion.div
          className="flex flex-col gap-5 py-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Row tiles={ROWS[0]} dir="l" base={38} />
          <Row tiles={ROWS[1]} dir="r" base={32} />
          <Row tiles={ROWS[2]} dir="l" base={44} />
          <Row tiles={ROWS[3]} dir="r" base={35} />
        </motion.div>

        {/* edge fades — ease the block into the page on every side */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-24" style={{ background: `linear-gradient(to bottom, ${BG} 30%, transparent)` }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-24" style={{ background: `linear-gradient(to top, ${BG} 30%, transparent)` }} />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-40 w-16 sm:w-24" style={{ background: `linear-gradient(to right, ${BG}, transparent)` }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-40 w-16 sm:w-24" style={{ background: `linear-gradient(to left, ${BG}, transparent)` }} />
      </div>

      {/* CTA — primary, centred, jumps to the About page's work-experience section */}
      <motion.div
        className="mt-14 flex justify-center px-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <Button variant="primary" size="md" onClick={() => navigate("/about#work-experience")}>
          View work experience
        </Button>
      </motion.div>
    </section>
  );
};

export default WorkExp;
