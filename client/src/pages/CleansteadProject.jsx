// src/pages/CleansteadProject.jsx
// Cleanstead — Brand Identity Case Study
// Built on the brand case study template. This one is the quiet entry:
// the story is restraint, so the page stays tidy too.

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BrandGallery from "../components/ProjectPage/BrandGallery";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

/* ── artwork ── */
import imgSignage from "../assets/Cleanstead/signage.webp";
import imgIdCard from "../assets/Cleanstead/idcard.webp";
import imgStationery from "../assets/Cleanstead/stationery.webp";
import imgReception from "../assets/Cleanstead/reception.webp";
import imgVan from "../assets/Cleanstead/van.webp";
import imgBillboard from "../assets/Cleanstead/billboard.webp";
import imgHanger from "../assets/Cleanstead/hanger.webp";
import imgShirt from "../assets/Cleanstead/shirt.webp";
import imgSocial from "../assets/Cleanstead/social.webp";
import imgFlyers from "../assets/Cleanstead/flyers.webp";

/* Portfolio accent (lime) drives the page's labels, headings and CTAs. */
const G = "#a3e635";

/* Cleanstead's own colours, sampled from the shipped applications. */
const SWATCHES = [
  { hex: "#072561", name: "Deep Navy", role: "The dependable half. Uniforms, print, the steady base.", dark: false },
  { hex: "#01b1ed", name: "Sky Blue", role: "The fresh half. Clean air, clear water, open windows.", dark: true },
  { hex: "#ffffff", name: "White", role: "The point of the whole business.", dark: true },
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

const CleansteadProject = () => (
  <div className="relative min-h-screen bg-[#07090C] text-white font-['Outfit']">
    <PageMeta
      title="Cleanstead — Brand Identity"
      description="Brand identity case study for Cleanstead, a cleaning and property care service in Lagos. A well-made wordmark, two blues and a lot of white — the restraint is the idea."
      url="/projects/cleanstead"
    />

    {/* ambient glows */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ background: "#07256166" }} />
      <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ background: `${G}10` }} />
    </div>

    <div className="relative z-10">

      {/* ══ HERO ══ */}
      <section className="relative w-full min-h-[78vh] flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img src={imgSignage} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
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
                Cleanstead
              </h1>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p className="text-[16px] sm:text-[18px] leading-[1.65] text-white/65 max-w-[600px]">
                A cleaning and property care service in Lagos, and the quietest brand in this portfolio
                on purpose. A well-made wordmark, two blues, a lot of white.
                <span style={{ color: G }}> The restraint is the idea.</span>
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
                { label: "CLIENT", value: "Cleanstead" },
                { label: "INDUSTRY", value: "Cleaning & Property Care", accent: true },
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
                Cleanstead keeps homes clean and properties in order, and they wanted a brand as
                straightforward as that promise: fresh, modern, dependable. So I kept it a wordmark,
                built it well, and grew everything outward from it. No hidden meanings, no battles,
                no war story. Some projects are won by conviction on a call. This one was won by
                getting the fundamentals right and leaving them alone.
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
              <H2 white="The people you trust" accent="with your keys" />
              <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: G }} />
              <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
                <p>Cleanstead is a cleaning and property care service in Lagos. Homes kept clean, spaces kept in order, on a schedule you stop thinking about because it just happens. Their business runs on a particular kind of trust: clients hand these people the keys to their homes.</p>
                <p>What they wanted from the brand matched that exactly. Simple and modern. Fresh and dependable. Nothing flashy, because flashy is not what you want from the person holding your keys.</p>
              </div>
            </Reveal>
            <Reveal className="h-full">
              <Frame src={imgIdCard} alt="A Cleanstead staff ID card on a branded lanyard" ratio="4/5" className="h-full" />
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
              <span className="text-white">The hardest part?</span><br />
              <span style={{ color: "#E05252" }}>Not overbuilding it.</span>
            </h2>
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full bg-[#E05252]" />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
              <p>There was no big tension to untangle here, and that is worth saying plainly. No loaded name to decode, no market to argue with, no first concept to retire. The brief was as clean as the service.</p>
              <p>Which is its own kind of trap. When a project is this open, the temptation is to add cleverness the brand never asked for, a hidden symbol, an over-engineered mark, a concept that needs explaining. A cleaning company does not need any of that. It needs to feel tidy and sure of itself, the visual equivalent of a spotless room. The real discipline was knowing that and holding to it.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 03 — THE IDEA ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="03" t="THE IDEA" />
            <H2 white="A wordmark," accent="left alone" />
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: G }} />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-10">
              <p>I kept it a wordmark. One clean, well-made setting of the name, weighted so Clean and stead read as two thoughts in one word, finished with a small sparkle, the only ornament the identity allows itself. Then everything else grew outward from it: the two blues, the supporting shapes, the way the pieces sit together on a card, a shirt, a van.</p>
              <p>That is the whole idea, and it is supposed to be. The restraint matches what the company actually does. Cleaning is not clever. It is done properly or it is not, and the brand says which side Cleanstead is on before you read a single word of copy.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-white/8">
              <img src={imgStationery} alt="The Cleanstead wordmark across the stationery system: letterhead, cards and envelopes in two blues" loading="lazy" className="w-full h-auto" />
            </div>
            <p className="mt-4 text-[14px] text-white/40 leading-relaxed max-w-[640px]">
              The wordmark carrying the whole system. Same voice on every piece, nothing that needs explaining.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-14 text-center py-8">
              <p className="text-[13px] tracking-[0.25em] uppercase text-white/30 mb-4">The idea, in one line</p>
              <p className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-[-0.02em] leading-tight">
                <span className="text-white">"The restraint</span>{" "}
                <span style={{ color: G }}>is the idea."</span>
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
            <H2 white="Two blues and" accent="a lot of white" />
            <div className="mt-6 max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-12">
              <p>The palette says fresh and dependable the way the brief asked, in colour form. A deep navy carries the dependable half: the uniforms, the print, the base everything stands on. A bright sky blue carries the fresh half: clean air, clear water, the feeling of a room with the windows open. And white does the rest, because white is literally what this company sells.</p>
              <p>Under the wordmark sits the line that does the brand's talking: why clean when we can? Friendly, direct, and exactly as unclever as the rest of the system. It shows up on the reception wall, the door hangers and the vans, and it never needs a footnote.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-3 gap-3 mb-4">
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
            <p className="text-[11px] text-white/25 mb-16">Sampled from the shipped applications.</p>
          </Reveal>

          <Reveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-3">THE SYSTEM AT WORK</p>
            <p className="text-[20px] sm:text-[22px] font-semibold text-white mb-5">Calm at every size</p>
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-10">
              <p>Because the identity is one wordmark and two colours, it behaves everywhere without supervision. On a reception wall it reads corporate and calm. On a social card it reads friendly. On a pattern it dissolves into texture without losing itself. Systems built on restraint travel light.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/8">
              <img src={imgReception} alt="The Cleanstead reception wall with the brand pattern and wordmark" loading="lazy" className="w-full h-auto" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 05 — IN THE WILD ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="05" t="IN THE WILD" />
            <H2 white="Tidy on paper," accent="tidy on the street" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[620px] mb-14">
              A service brand lives on vans, doors and billboards. If it stays calm out there, it was built right.
            </p>
          </Reveal>

          <div className="space-y-16">
            {[
              {
                img: imgVan,
                ratio: "16/9",
                title: "On the road",
                body: "The vans are the brand's biggest canvas and its best behaviour test. Navy body, sky blue field, the wordmark and nothing else. It reads from across the street and still looks washed, which for a cleaning company is the entire assignment.",
              },
              {
                img: imgBillboard,
                ratio: "16/9",
                title: "On the street",
                body: "You should spend time with the kids while we do the cleaning. The billboard sells the real product, time, and the identity stays out of the way and lets the promise do the work.",
              },
              {
                img: imgHanger,
                ratio: "4/5",
                title: "On the door",
                body: "The door hanger is the finish line. One word, Cleaned, in the brand blue on the handle when the team leaves. The quietest piece in the system, and the one clients actually hold.",
              },
            ].map(({ img, ratio, title, body }) => (
              <Reveal key={title}>
                <div className="flex flex-col gap-5">
                  <div className="max-w-[560px]">
                    <p className="text-[17px] font-semibold text-white mb-2">{title}</p>
                    <p className="text-[15px] sm:text-[16px] leading-[1.7] text-white/50">{body}</p>
                  </div>
                  <Frame src={img} alt={`${title}. Cleanstead brand application`} ratio={ratio} className={ratio === "4/5" ? "max-w-[720px]" : ""} />
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
              On this project the decisions were mostly about what not to do. Those count too.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                q: "A wordmark, nothing else",
                a: "No emblem, no mascot, no hidden geometry. A clever mark would have added noise to a brand whose whole promise is the absence of mess. Well-set type says clean better than any symbol could, so the type is the identity.",
              },
              {
                q: "Two blues, full stop",
                a: "Fresh and dependable are the brief's own words, so the palette is exactly that pair: sky blue for fresh, deep navy for dependable, white for the product itself. Adding a third voice would have started an argument the brand does not need.",
              },
              {
                q: "Leaving it alone",
                a: "There was nothing to push back on here, and that is not a weak spot in the story. They trusted the direction, the fundamentals were right, and the discipline was resisting every urge to keep polishing past done. Knowing when to stop is a design skill too.",
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

      {/* ══ 07 — GALLERY ══ */}
      <BrandGallery
        n="07"
        label="THE FULL SET"
        white="Everything the project"
        accent="produced"
        description="The Cleanstead identity across uniforms, vehicles, print and the street, in one place. Tap any piece to view it full size."
        color={G}
        images={[
          { src: imgSignage, alt: "Cleanstead building signage", label: "SIGNAGE" },
          { src: imgVan, alt: "Van livery in the two blues", label: "THE VAN" },
          { src: imgIdCard, alt: "Staff ID card on a lanyard", label: "ID CARD" },
          { src: imgShirt, alt: "Staff uniform shirt", label: "UNIFORM" },
          { src: imgStationery, alt: "Stationery system flat lay", label: "STATIONERY" },
          { src: imgReception, alt: "Reception wall with the brand pattern", label: "RECEPTION" },
          { src: imgBillboard, alt: "Spend time with the kids billboard", label: "BILLBOARD" },
          { src: imgHanger, alt: "Cleaned door hanger", label: "DOOR HANGER" },
          { src: imgSocial, alt: "Social media posts on a phone", label: "SOCIAL" },
          { src: imgFlyers, alt: "Cleaning with Standard flyers", label: "FLYERS" },
        ]}
      />

      {/* ══ 08 — WHAT IT DID ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <SLabel n="08" t="WHAT IT DID" />
            <H2 white="Quiet," accent="like it should be" />
            <div className="mt-8 space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-white/60">
              <p>They were happy, the identity did its job, and Cleanstead goes about its work looking exactly like what it is: fresh, dependable, and sure of itself. The wordmark holds the vans, the doors, the uniforms and the billboards without ever raising its voice.</p>
              <p>It sits in this portfolio as the quiet piece, and it earns the spot. Not every strong project needs a war story. Some just need the fundamentals done properly and the confidence to stop there.</p>
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

      <OtherProj currentSlug="cleanstead" currentKind="default" />
      <BuildSection />
    </div>
  </div>
);

export default CleansteadProject;
