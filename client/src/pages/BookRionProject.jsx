// src/pages/BookRionProject.jsx
// BookRion — Brand Identity + Product Design Case Study
// Built on the brand case study template: outcome first, then the client,
// the problem, the idea, the system, the proof.

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BrandGallery from "../components/ProjectPage/BrandGallery";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";
import { buttonClasses } from "../components/ui";

/* ── artwork (existing project images + the newly added product shot) ── */
import imgSign from "../assets/Bookrion/mainSign.jpg";
import imgScreens from "../assets/Bookrion/midImg.webp";
import imgPhonesBlue from "../assets/Bookrion/g1.jpg";
import imgCards from "../assets/Bookrion/g2.jpg";
import imgTote from "../assets/Bookrion/g3.jpg";
import imgNotebook from "../assets/Bookrion/g4.jpg";
import imgCardsAlt from "../assets/Bookrion/g5.jpg";
import imgAppIcon from "../assets/Bookrion/img1.jpg";
import imgLetterhead from "../assets/Bookrion/concImg.jpg";
import imgBMark from "../assets/Bookrion/bmark.webp";

/* Portfolio accent (lime) drives the page's labels, headings and CTAs. */
const G = "#a3e635";

/* BookRion's own colours, sampled from the shipped applications. */
const SWATCHES = [
  { hex: "#2983fe", name: "Rion Blue", role: "The platform blue. Screens, stories, the digital home.", dark: false },
  { hex: "#3a5a93", name: "Book Blue", role: "The deeper shelf blue that carries print and stationery.", dark: false },
  { hex: "#fbbb26", name: "Crown Yellow", role: "The royalty in the name, used like a highlighter.", dark: true },
  { hex: "#dccdb0", name: "Page Cream", role: "Paper warmth, so the digital brand still smells like books.", dark: true },
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

const BookRionProject = () => (
  <div className="relative min-h-screen bg-[#07090C] text-white font-['Outfit']">
    <PageMeta
      title="BookRion — Brand Identity & Product Design"
      description="Brand identity and product design case study for BookRion, a platform connecting Nigeria's whole book world. A crowned B built from stacked books with eyes folded into the letters, and a research-backed move from brown to blue."
      url="/projects/book-rion"
    />

    {/* ambient glows */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ background: "#2983fe30" }} />
      <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ background: `${G}10` }} />
    </div>

    <div className="relative z-10">

      {/* ══ HERO ══ */}
      <section className="relative w-full min-h-[78vh] flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img src={imgSign} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
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
                Brand Identity + Product Design Case Study
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-semibold leading-none tracking-[-0.03em] mb-5"
                style={{ background: "linear-gradient(180deg, #ffffff 0%, #9a9a9a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                BookRion
              </h1>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p className="text-[16px] sm:text-[18px] leading-[1.65] text-white/65 max-w-[600px]">
                One platform for Nigeria's whole book world, and a mark to match:
                a crown for the name, two stacked books curving into a B,
                and <span style={{ color: G }}>a face you almost miss</span> watching you back.
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
                { label: "CLIENT", value: "BookRion" },
                { label: "INDUSTRY", value: "Books & Reading", accent: true },
                { label: "ROLE", value: "Brand + Product Designer" },
                { label: "SCOPE", value: "Identity & App Design" },
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
                BookRion set out to connect Nigeria's readers, authors, publishers, sellers and bookstores
                in one place, with dreams of making reading feel as habit-forming as Duolingo. They walked
                in wanting brown. The research said the category lives in blue and yellow, so I held that
                line with data instead of taste. Then I retired my own first logo, a fun mascot, and rebuilt
                it into a crowned B made of stacked books with eyes hidden in the letters. I designed the
                product too, so the brand and the app grew up as one thing. Here is how it happened.
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
              <H2 white="The whole book world," accent="one front door" />
              <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: G }} />
              <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
                <p>BookRion is a platform for everyone the book world touches in Nigeria. Readers, authors, publishers, sellers, bookstores, all connected in one place, so it is easy to find a book, buy it, read it online, or reach any of the people behind it. Not a store. A destination.</p>
                <p>And they were thinking past launch. The long game was a gamified reading habit, closer to how Duolingo makes practice feel like play. So the brand had to be friendly and playful, but still solid enough to sit under a proper product. I handled both sides on this one, the identity and the product design, which is exactly how it should be when the brand IS the product.</p>
              </div>
            </Reveal>
            <Reveal className="h-full">
              <Frame src={imgAppIcon} alt="The BookRion app icon, the crowned B, on a phone home screen" ratio="4/5" className="h-full" />
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
              <span className="text-white">They walked in with brown.</span><br />
              <span style={{ color: "#E05252" }}>The category lives in blue.</span>
            </h2>
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full bg-[#E05252]" />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
              <p>Two problems sat between the brief and the brand. The first was colour. Their starting instinct was a brown palette, warm and bookish on paper. But my research kept pointing somewhere else: the book and reading space leans blue and yellow with a touch of orange, vibrant without screaming. There was a real gap between the direction they walked in with and what the market actually rewards.</p>
              <p>The second problem was mine. My first logo leaned hard into the gamified brief, a little mascot with eyes, and it genuinely hit the fun note. What it did not have was staying power. A mascot can front a feature. A platform that wants readers, authors and publishers to trust it with money and work needs a mark that can grow up with it.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 03 — THE IDEA ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="03" t="THE IDEA" />
            <H2 white="Read the name literally," accent="then draw it" />
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: G }} />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-10">
              <p>The rebuild started with the name itself. Rion sounds like royalty, so a crown went on top. Books stack, so two rounded book forms sit together underneath, and their shared curve builds a lowercase b, for Book. That is the whole logic: the name read literally, then drawn.</p>
              <p>And the eyes survived. Reading and discovery happen through the eyes, and that was the truest part of the mascot, so I folded them back in as the double letters, with a small bookmark ribbon tucked inside the shape for purpose and focused reading. Look once and you see a crowned b. Look again and the mark is quietly watching you back. Crown on top, books underneath, a face you almost miss.</p>
              <p>It landed warm and a little cheeky, which is exactly what a habit product wants, without tipping into childish. The playfulness the brief asked for is still there. It just wears a crown now. The BMark, as the look book names it, shows what BookRion is all about: reading, learning, and leading.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-white/8">
              <img src={imgBMark} alt="The BMark rationale from the look book: the book forms, the bookmark ribbon, and the crown for Rion, annotated" loading="lazy" className="w-full h-auto" />
            </div>
            <p className="mt-4 text-[14px] text-white/40 leading-relaxed max-w-[640px]">
              The BMark rationale from the look book. The book is the central motif, the ribbon is the bookmark, and the crown carries the Rion.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-14 text-center py-8">
              <p className="text-[13px] tracking-[0.25em] uppercase text-white/30 mb-4">The mark, in one line</p>
              <p className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-[-0.02em] leading-tight">
                <span className="text-white">"Crown on top, books underneath,</span>{" "}
                <span style={{ color: G }}>a face you almost miss."</span>
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
            <H2 white="Research picked the palette," accent="not preference" />
            <div className="mt-6 max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-12">
              <p>Moving a client off the colour they arrived with takes more than opinion, so I did not offer one. I showed them where the reading category actually lives: blue for trust and depth, yellow for energy and reward, the combination every serious player in the space keeps landing on for a reason. This is what the market shows, not what I prefer. That framing is what carried them.</p>
              <p>The final palette keeps a little of what they loved anyway. The cream carries the warmth their brown instinct was reaching for, just translated into the colour of an actual page.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
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

          {/* Brand into product */}
          <Reveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-3">BRAND INTO PRODUCT</p>
            <p className="text-[20px] sm:text-[22px] font-semibold text-white mb-5">One system, from the logo to the last screen</p>
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-10">
              <p>Because I designed the product too, the identity never had to be translated by someone else. The crowned B became the app icon. Rion Blue became the interface. Crown Yellow became the reward moments, the streaks and the highlights where a habit product earns its keep. Library, activity, discovery, every screen speaks the same language the logo does.</p>
              <p>That is the quiet advantage of doing brand and product as one job. There is no seam where the logo ends and the app begins.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/8">
              <img src={imgScreens} alt="BookRion app screens: home, library and activity, all carrying the brand system" loading="lazy" className="w-full h-auto" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 05 — IN THE WILD ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="05" t="IN THE WILD" />
            <H2 white="A digital brand that still" accent="works on paper" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[620px] mb-14">
              A platform lives on screens, but a brand earns belief in the physical world. The system had to hold in both.
            </p>
          </Reveal>

          <div className="space-y-16">
            {[
              {
                img: imgSign,
                ratio: "16/9",
                title: "On the street",
                body: "The crowned B in white on the monument sign, calm and structural. This is the mascot argument settled in metal: a mark that started out playful, standing outside an office looking like it always belonged there.",
              },
              {
                img: imgTote,
                ratio: "4/5",
                title: "In the tote",
                body: "Fuel your mind. One page at a time. The habit promise, printed where readers carry their books. Rion Blue does the talking and the crowned B signs it quietly at the corner.",
              },
              {
                img: imgCards,
                ratio: "16/9",
                title: "In the hand",
                body: "Business cards in the deep shelf blue with cream reverse. The people running a book platform hand these to authors and publishers, so they carry the trust half of the brand, not the playful half.",
              },
            ].map(({ img, ratio, title, body }) => (
              <Reveal key={title}>
                <div className="flex flex-col gap-5">
                  <div className="max-w-[560px]">
                    <p className="text-[17px] font-semibold text-white mb-2">{title}</p>
                    <p className="text-[15px] sm:text-[16px] leading-[1.7] text-white/50">{body}</p>
                  </div>
                  <Frame src={img} alt={`${title}. BookRion brand application`} ratio={ratio} className={ratio === "4/5" ? "max-w-[720px]" : ""} />
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
              This project produced one of my favourite designer memories, a real, healthy argument on a call. These are the calls that came out of it.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                q: "Defending the work, then outgrowing it",
                a: "When they pushed back on my first direction, I did not just fold. I explained the reasoning, that the gamified feel they asked for was landing, and the early feedback backed it. Then I made the harder call myself and rebuilt the whole concept into the crowned B, because the mascot was fun but the crown gave it maturity. Defending your work and outgrowing it are not opposites.",
              },
              {
                q: "Research over taste",
                a: "Moving them off brown could have sounded like a preference, so I never framed it as one. I brought what the reading category actually shows, blue and yellow, vibrant without screaming, and let the market make the argument. When a client hears data instead of taste, the conversation changes completely.",
              },
              {
                q: "Brand and product as one job",
                a: "I designed the identity and the app together, so every decision paid twice. The crown became the icon, the palette became the interface, the playfulness became the reward moments. Nothing was bolted on, because nothing was handed off.",
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
        description="The BookRion identity across signage, screens, stationery and merch, in one place. Tap any piece to view it full size."
        color={G}
        images={[
          { src: imgSign, alt: "BookRion monument signage", label: "SIGNAGE" },
          { src: imgScreens, alt: "The app screens carrying the brand system", label: "APP SCREENS" },
          { src: imgPhonesBlue, alt: "Marketing screens on Rion Blue", label: "MARKETING" },
          { src: imgAppIcon, alt: "The crowned B as the app icon", label: "APP ICON" },
          { src: imgNotebook, alt: "The mark at full size on a notebook", label: "NOTEBOOK" },
          { src: imgTote, alt: "Fuel your mind tote bag", label: "TOTE BAG" },
          { src: imgCards, alt: "Business cards in shelf blue and cream", label: "BUSINESS CARDS" },
          { src: imgCardsAlt, alt: "Business cards, alternate angle", label: "CARDS II" },
          { src: imgLetterhead, alt: "Branded letterhead", label: "LETTERHEAD" },
        ]}
      />

      {/* ══ 08 — WHAT IT DID ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <SLabel n="08" t="WHAT IT DID" />
            <H2 white="Pushback," accent="proven right" />
            <div className="mt-8 space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-white/60">
              <p>They were thrilled. The brand and the product came together as one considered thing instead of a logo bolted onto an app, the crowned B running from the sign outside to the reward screens inside, on a palette the category itself argued for.</p>
              <p>This is the project I point to when someone asks what it looks like when a designer pushes back and the work comes out better for it. The disagreement was real, the argument was healthy, and the mark that came out the other side wears a crown it earned.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 rounded-2xl border p-7 sm:p-9 text-center" style={{ borderColor: `${G}30`, background: `${G}07` }}>
              <p className="text-[17px] sm:text-[19px] font-semibold text-white mb-2">Your brand could be the next case study here.</p>
              <p className="text-[14px] text-white/50 mb-6">Every project like this starts the same way: pick a plan, answer a short questionnaire, and we begin.</p>
              <Link
                to="/rate-details"
                className={buttonClasses("primary", "md")}
              >
                See the plans
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <OtherProj currentSlug="book-rion" currentKind="default" />
      <BuildSection />
    </div>
  </div>
);

export default BookRionProject;
