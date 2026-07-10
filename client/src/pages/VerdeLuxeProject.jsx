// src/pages/VerdeLuxeProject.jsx
// Verde Luxe — Brand Identity Case Study
// Built on the brand case study template: outcome first, then the client,
// the problem, the idea, the system, the proof.

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BrandGallery from "../components/ProjectPage/BrandGallery";
import GuidelineCarousel from "../components/ProjectPage/GuidelineCarousel";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

/* ── artwork ── */
import imgHero from "../assets/VerdeLuxe/hero.webp";
import imgRationale from "../assets/VerdeLuxe/rationale.webp";
import gInterior from "../assets/VerdeLuxe/gallery/g04.webp";
import gLogo from "../assets/VerdeLuxe/gallery/g05.webp";
import gLetterhead from "../assets/VerdeLuxe/gallery/g09.webp";
import gCards from "../assets/VerdeLuxe/gallery/g15.webp";
/* the original application mockups — banners, signage, merch, the book */
import aBanners from "../assets/VerdeLuxe/apps/a01.webp";
import aWindowPosters from "../assets/VerdeLuxe/apps/a02.webp";
import aOpenBook from "../assets/VerdeLuxe/apps/a03.webp";
import aHangingBanner from "../assets/VerdeLuxe/apps/a04.webp";
import aBottle from "../assets/VerdeLuxe/apps/a05.webp";
import aEntrance from "../assets/VerdeLuxe/apps/a06.webp";
import aTee from "../assets/VerdeLuxe/apps/a07.webp";
import aMug from "../assets/VerdeLuxe/apps/a08.webp";
import aBookCover from "../assets/VerdeLuxe/apps/a09.webp";
import aSignage from "../assets/VerdeLuxe/apps/a10.webp";

/* ── look book pages (from the 30-page document) ── */
import gp01 from "../assets/VerdeLuxe/guideline/p01.webp";
import gp03 from "../assets/VerdeLuxe/guideline/p03.webp";
import gp06 from "../assets/VerdeLuxe/guideline/p06.webp";
import gp07 from "../assets/VerdeLuxe/guideline/p07.webp";
import gp08 from "../assets/VerdeLuxe/guideline/p08.webp";
import gp10 from "../assets/VerdeLuxe/guideline/p10.webp";
import gp12 from "../assets/VerdeLuxe/guideline/p12.webp";
import gp14 from "../assets/VerdeLuxe/guideline/p14.webp";
import gp16 from "../assets/VerdeLuxe/guideline/p16.webp";
import gp22 from "../assets/VerdeLuxe/guideline/p22.webp";
import gp23 from "../assets/VerdeLuxe/guideline/p23.webp";
import gp29 from "../assets/VerdeLuxe/guideline/p29.webp";
import gp11 from "../assets/VerdeLuxe/guideline/p11.webp";

/* Portfolio accent (lime) drives the page's labels, headings and CTAs. */
const G = "#a3e635";

/* Verde Luxe's own palette, from the look book, shown as swatches only. */
const SWATCHES = [
  { hex: "#052620", name: "Dark Green", role: "The deep end. Rooms after dark, backgrounds with weight.", dark: false },
  { hex: "#003d38", name: "Brunswick Green", role: "The core brand green. Where luxury and calm meet.", dark: false },
  { hex: "#015756", name: "Dark Slate Green", role: "The layer in between. Depth without heaviness.", dark: false },
  { hex: "#b28357", name: "Chamoisee", role: "Warm wood and leather. The comfort in the room.", dark: true },
  { hex: "#f8d496", name: "Sunset", role: "Gold light. Elegance and exclusivity, used sparingly.", dark: true },
  { hex: "#fff1e5", name: "Linen", role: "Breathing space. Keeps the richness from closing in.", dark: true },
];

/* ─── hero intro animation (plays once on load) ─── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

/* ─── bidirectional scroll reveal ─── */
const Reveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [46, 0, 0, -46]);
  const filter = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"]);
  return (
    <motion.div ref={ref} className={className} style={{ opacity, y, filter }}>
      {children}
    </motion.div>
  );
};

const SLabel = ({ n, t }) => (
  <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: G }}>
    {n} — {t}
  </p>
);

const H2 = ({ white, accent }) => (
  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.08] tracking-[-0.02em]">
    <span className="text-white">{white} </span>
    <span style={{ color: G }}>{accent}</span>
  </h2>
);

const Frame = ({ src, alt, ratio = "16/9", className = "" }) => (
  <div className={`w-full rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
    <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover object-center" />
  </div>
);

const VerdeLuxeProject = () => (
  <div className="relative min-h-screen bg-[#07090C] text-white font-['Outfit']">
    <PageMeta
      title="Verde Luxe — Brand Identity"
      description="Brand identity case study for Verde Luxe, an interior design company selling luxury on two fronts. A mark drawn like a floor plan, a doorway you are invited through, and a deep emerald system built on quiet money, not loud money."
      url="/projects/verde-luxe"
    />

    {/* ambient glows */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ background: "#003d3866" }} />
      <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ background: `${G}10` }} />
    </div>

    <div className="relative z-10">

      {/* ══ HERO ══ */}
      <section className="relative w-full min-h-[78vh] flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img src={imgHero} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(7,9,12,0.5) 0%, rgba(7,9,12,0.4) 35%, rgba(7,9,12,0.94) 70%, #07090C 100%)" }}
          />
        </div>

        <div className="relative z-10 mt-auto px-4 sm:px-8 pt-28 pb-16">
          <div className="max-w-[820px] mx-auto flex flex-col items-center text-center">
            <FadeUp>
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold mb-7"
                style={{ borderColor: `${G}44`, color: G, background: `${G}0D` }}>
                Brand Identity Case Study
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-semibold leading-none tracking-[-0.03em] mb-5"
                style={{ background: "linear-gradient(180deg, #ffffff 0%, #9a9a9a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Verde Luxe
              </h1>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p className="text-[16px] sm:text-[18px] leading-[1.65] text-white/65 max-w-[600px]">
                An interior design company that wanted luxury without the shouting.
                The mark I built for them starts where every interior starts, at the floor plan,
                with <span style={{ color: G }}>a doorway you are being invited through</span>.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ SNAPSHOT + THE SHORT VERSION ══ */}
      <section className="py-14 sm:py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/8 mb-12">
              {[
                { label: "CLIENT", value: "Verde Luxe" },
                { label: "INDUSTRY", value: "Interior Design", accent: true },
                { label: "ROLE", value: "Sole Brand Designer" },
                { label: "SCOPE", value: "Full Identity System" },
              ].map(({ label, value, accent }) => (
                <div key={label} className="sm:px-8 first:pl-0">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1">{label}</p>
                  <p className="text-lg sm:text-xl font-bold" style={accent ? { color: G } : {}}>{value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border p-7 sm:p-9" style={{ borderColor: `${G}30`, background: `${G}07` }}>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: G }}>The short version</p>
              <p className="text-[16px] sm:text-[18px] leading-[1.7] text-white/70">
                Verde Luxe designs interiors and sells the pieces that fill them, so the brand had to feel
                high end on both fronts, the service and the shelf. What they asked for was quiet money,
                not loud money. I answered with a mark drawn like a floor plan, walls forming a space with
                an opening, the name set in a serif inside it, and a deep emerald green carrying the whole
                system. The first concept was the one. Here is how it happened.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 01 — THE CLIENT ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <Reveal>
              <SLabel n="01" t="THE CLIENT" />
              <H2 white="Luxury on the service" accent="and the shelf" />
              <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: G }} />
              <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
                <p>Verde Luxe is an interior design company with two lives. They design interiors for clients, and they sell interior pieces of their own, chandeliers, frames, furniture, the objects that finish a room. That means the brand could never lean on one context. It had to feel high end as a service you hire and as a product you pick off a shelf and take home.</p>
                <p>What they wanted was an identity that read as luxury without shouting it. Quiet money, not loud money. The kind of brand that does not announce how expensive it is, because it does not have to.</p>
              </div>
            </Reveal>
            <Reveal className="h-full">
              <Frame src={aBookCover} alt="The Verde Luxe logo look book, printed" ratio="4/5" className="h-full" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 02 — THE CHALLENGE ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="02" t="THE CHALLENGE" />
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.08] tracking-[-0.02em]">
              <span className="text-white">Everyone says luxury.</span><br />
              <span style={{ color: "#E05252" }}>Almost nothing feels like it.</span>
            </h2>
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full bg-[#E05252]" />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
              <p>The word luxury gets thrown around until it means nothing. Every third brand claims it, and most prove the opposite the moment you look closely. So the real job here was never to label Verde Luxe as refined. It was to make something that actually feels refined, in the shapes, the spacing, the restraint.</p>
              <p>And the mark had a second requirement stacked on top. It had to carry the interior world inside it, spatial, calm and considered, and still hold that premium weight when you see it small. On a product tag. As an app icon. Stamped into the corner of a thank you card. Quiet money has to stay quiet at every size.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 03 — THE IDEA ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="03" t="THE IDEA" />
            <H2 white="A floor plan you can" accent="walk into" />
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: G }} />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-10">
              <p>I went to the floor plan. Look at an open architectural drawing and the walls read as clean lines, with gaps where the doors are. That language felt like the most honest place an interior brand could come from, so I built the mark out of it. A thick outline forms a defined, structured space. Then the line breaks, and that slight opening is a door. An invitation through, into what the room could become.</p>
              <p>Inside that space sits the V, with a small diamond sparkle beside it, the shine every finished interior gives off. And the name itself is set in a serif, because serif carries heritage and refinement in a way a sans never quite does. Space, the V, transformation. One mark holding all three.</p>
              <p>Then I made a second mark for tighter spaces. A four point star, the little sparkle you get for shine or excellence. Same message, one breath.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-white/8">
              <img src={imgRationale} alt="The Verde Luxe logo construction grid and the three ideas inside the mark: space, the V, and transformation" loading="lazy" className="w-full h-auto" />
            </div>
            <p className="mt-4 text-[14px] text-white/40 leading-relaxed max-w-[640px]">
              The rationale spread from the look book. The construction grid, then the three reads of one mark: the space, the V, the transformation.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-14 text-center py-8">
              <p className="text-[13px] tracking-[0.25em] uppercase text-white/30 mb-4">The brief, in one line</p>
              <p className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-[-0.02em] leading-tight">
                <span className="text-white">"Quiet money,</span>{" "}
                <span style={{ color: G }}>not loud money."</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 04 — THE SYSTEM ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="04" t="THE SYSTEM" />
            <H2 white="One green decided" accent="everything else" />
            <div className="mt-6 max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-12">
              <p>Verde means green in Spanish and Italian, so colour was never really a question. The question was which green. I pushed for a deep, rich green close to emerald, because that is where luxury and calm meet. It is the green of velvet sofas and old libraries, nature with money in the room. She saw it immediately.</p>
              <p>Everything else in the palette flowed out of that one choice. Layered greens give the depth an interior brand needs. Warm beige and soft gold bring the comfort and exclusivity. Linen keeps the richness from closing in on itself. Every shade is a room Verde Luxe would actually design.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
              {SWATCHES.map(({ hex, name, role, dark }) => (
                <div key={hex} className="rounded-2xl overflow-hidden border border-white/8">
                  <div className="h-20 sm:h-24 flex items-end p-3" style={{ background: hex }}>
                    <span className="text-[10px] font-mono font-bold" style={{ color: dark ? "#0b0b0b" : "#ffffff" }}>{hex}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02]">
                    <p className="text-[12px] font-semibold text-white mb-1">{name}</p>
                    <p className="text-[11px] leading-[1.5] text-white/40">{role}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/25 mb-16">Names and values from the official look book. A burgundy accent, plus black and white, sit in reserve for the rare moments that need extra weight.</p>
          </Reveal>

          {/* Typography */}
          <Reveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-3">TYPOGRAPHY</p>
            <p className="text-[20px] sm:text-[22px] font-semibold text-white mb-5">A serif for the name, Avenir for the work</p>
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-10">
              <p>The logotype is where the serif lives. It gives the name the heritage and refinement the brand is built on, the feeling that Verde Luxe has been setting rooms for longer than it has. That is a job only a serif can do, so it does exactly that one job and nothing else.</p>
              <p>Around it, Avenir runs everything. Its geometric structure and clean lines keep the rest of the brand contemporary and effortless to read, from headlines down to product tags, with a full range of weights from 95 Black to 35 Light. Classic where it counts, clean everywhere else. That contrast is the quiet money tone in type form.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/8" style={{ aspectRatio: "210 / 297" }}>
                <img src={gp14} alt="The Verde Luxe word mark set in serif, from the look book" loading="lazy" className="w-full h-full object-cover object-top" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/8" style={{ aspectRatio: "210 / 297" }}>
                <img src={gp29} alt="Avenir, the working typeface, with its weight range from the look book" loading="lazy" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 05 — IN THE WILD ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="05" t="IN THE WILD" />
            <H2 white="It has to feel expensive" accent="in your hand" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[620px] mb-14">
              Quiet luxury is easy on a slide. The test is whether it holds on a building, on a shelf, and on the small things clients actually touch.
            </p>
          </Reveal>

          <div className="space-y-16">
            {[
              {
                img: aSignage,
                ratio: "16/9",
                title: "On the building",
                body: "The dimensional mark over the entrance closes the loop on the whole idea. A logo built as a doorway, doing its job above one. In brushed metal on dark panelling it reads exactly the way the brand should: present, assured, never loud.",
              },
              {
                img: aEntrance,
                ratio: "16/9",
                title: "On the street",
                body: "Luxury, Redefined, over the entrance of a space the brand would actually design. The campaign line works because the identity underneath it does. Deep green, gold light and a serif holding the promise steady at street scale.",
              },
              {
                img: aBottle,
                ratio: "4/5",
                title: "On the shelf",
                body: "Verde Luxe sells products, so the identity has to work at retail distance. Deep green with the mark sitting quietly in warm gold reads premium from across a room, which is the whole point of a brand that lives on shelves as much as in spaces.",
              },
            ].map(({ img, ratio, title, body }) => (
              <Reveal key={title}>
                <div className="flex flex-col gap-5">
                  <div className="max-w-[560px]">
                    <p className="text-[17px] font-semibold text-white mb-2">{title}</p>
                    <p className="text-[15px] sm:text-[16px] leading-[1.7] text-white/50">{body}</p>
                  </div>
                  <Frame src={img} alt={`${title}. Verde Luxe brand application`} ratio={ratio} className={ratio === "4/5" ? "max-w-[720px]" : ""} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 06 — DECISIONS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="06" t="DECISIONS" />
            <H2 white="Three calls that" accent="shaped it" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[560px] mb-12">
              Every identity is a series of small choices. These are the three that mattered most here.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                q: "A doorway, not decoration",
                a: "The easy move for an interior brand is drawing furniture, a sofa, a lamp, a room in miniature. I went to the floor plan instead, because that is where every interior actually begins. Walls, space, and an opening. The mark stays abstract enough to feel premium and literal enough to mean something.",
              },
              {
                q: "A serif inside a modern system",
                a: "Serif for the name, Avenir for everything around it. The serif carries heritage and refinement, the sans keeps the system clean and current. That contrast, classic where it counts and quiet everywhere else, is the whole quiet money tone translated into type.",
              },
              {
                q: "Liking is not understanding",
                a: "She was into the direction from the first look, which is rare. But liking something and understanding it are two different things, so I still put in the work to sell the why. The floor plan logic, the reason for the serif, the meaning behind the green. A client who understands the brand protects it long after handover.",
              },
            ].map(({ q, a }, i) => (
              <Reveal key={q}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 h-full flex flex-col gap-3">
                  <span className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase w-fit" style={{ background: `${G}15`, color: G }}>
                    Decision 0{i + 1}
                  </span>
                  <p className="text-[15px] font-semibold text-white leading-snug">{q}</p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 flex-1">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 07 — INSIDE THE LOOK BOOK ══ */}
      <GuidelineCarousel
        n="07"
        label="INSIDE THE LOOK BOOK"
        white="30 pages,"
        accent="considered"
        description="The logo rationale, the construction grid, the full mark family, colour and typography, all documented so the brand behaves the same wherever it shows up. Scroll through the pages, or skip ahead to the rest of the project."
        color={G}
        orientation="portrait"
        skipLabel="Skip to gallery"
        slides={[
          { src: gp01, alt: "Cover. The Verde Luxe logo look book" },
          { src: gp03, alt: "Brand overview" },
          { src: gp06, alt: "Logo rationale. Space, the V, and transformation" },
          { src: gp07, alt: "Logo construction grid" },
          { src: gp08, alt: "Primary logo, vertical" },
          { src: gp10, alt: "Primary logo, horizontal" },
          { src: gp12, alt: "The logo mark" },
          { src: gp14, alt: "The word mark in serif" },
          { src: gp16, alt: "Secondary logo" },
          { src: gp22, alt: "Colour rationale and the official palette" },
          { src: gp23, alt: "Accent and neutral colours" },
          { src: gp29, alt: "Typography. Avenir" },
          { src: gp11, alt: "The brand in use. Entrance signage" },
        ]}
      />

      {/* ══ 08 — GALLERY ══ */}
      <BrandGallery
        n="08"
        label="THE FULL SET"
        white="Everything the project"
        accent="produced"
        description="The Verde Luxe identity across spaces, shelves and stationery, in one place. Tap any piece to view it full size."
        color={G}
        images={[
          { src: gInterior, alt: "A deep green interior in the Verde Luxe mood", label: "THE MOOD" },
          { src: gLogo, alt: "The Verde Luxe logo presentation", label: "THE LOGO" },
          { src: aBookCover, alt: "The printed logo look book", label: "LOOK BOOK" },
          { src: aOpenBook, alt: "The look book open on the logo rationale spread", label: "INSIDE THE BOOK" },
          { src: gLetterhead, alt: "Branded letterhead", label: "LETTERHEAD" },
          { src: aSignage, alt: "Entrance signage in brushed metal", label: "SIGNAGE" },
          { src: aEntrance, alt: "Luxury Redefined billboard over the entrance", label: "THE ENTRANCE" },
          { src: aWindowPosters, alt: "Window posters on the storefront", label: "WINDOW POSTERS" },
          { src: aBanners, alt: "Street banners: Illuminate Your World", label: "STREET BANNERS" },
          { src: aHangingBanner, alt: "Curated for Timeless Interiors hanging banner", label: "HANGING BANNER" },
          { src: aBottle, alt: "Branded bottle in deep green and gold", label: "BOTTLE" },
          { src: aMug, alt: "Branded mug in deep green and gold", label: "MUG" },
          { src: aTee, alt: "Team t-shirt with the logo mark", label: "T-SHIRT" },
          { src: gCards, alt: "Thank you cards in green and beige", label: "THANK YOU CARDS" },
        ]}
      />

      {/* ══ 09 — WHAT IT DID ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <SLabel n="09" t="WHAT IT DID" />
            <H2 white="Approved at" accent="first sight" />
            <div className="mt-8 space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-white/60">
              <p>She loved it. No hesitation, no second round of directions. The whole system came together clean off that first concept: the mark family, the emerald palette, the serif and Avenir pairing, and a thirty page look book documenting all of it. Verde Luxe now shows up the way it always intended to, luxury that does not need to raise its voice.</p>
              <p>It ended up being one of the smoother projects I have run, and that is its own kind of win. Smooth is not luck. It is what happens when the thinking is finished before the drawing starts, so approval stops being a negotiation and becomes recognition.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 rounded-2xl border p-7 sm:p-9 text-center" style={{ borderColor: `${G}30`, background: `${G}07` }}>
              <p className="text-[17px] sm:text-[19px] font-semibold text-white mb-2">Your brand could be the next case study here.</p>
              <p className="text-[14px] text-white/50 mb-6">Every project like this starts the same way: pick a plan, answer a short questionnaire, and we begin.</p>
              <Link
                to="/rate-details"
                className="inline-block rounded-xl bg-gradient-to-b from-lime-400 to-lime-600 px-7 py-3 text-[14px] font-bold text-black shadow-[0_0_18px_rgba(132,204,22,0.5)] transition hover:from-lime-300 hover:to-lime-500 hover:-translate-y-0.5 active:scale-95"
              >
                See the plans
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <OtherProj currentSlug="verde-luxe" currentKind="default" />
      <BuildSection />
    </div>
  </div>
);

export default VerdeLuxeProject;
