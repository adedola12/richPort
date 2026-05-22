/* RichPort Portfolio UI Kit — project data
   ============================================================
   Mirrors the projects exposed via /api/projects + /api/ui-projects
   from the live backend, but with local images bundled. The
   shape closely follows the ProjectModel from the source repo
   so a future swap to live data is mechanical.
   ============================================================ */

const PROJECTS = [
  {
    slug: "bookrion",
    kind: "default",
    name: "BookRion",
    url: "bookrion.com",
    description:
      "A community-driven book club brand identity exploring African-rooted typography, warm minimal palettes and a confident book mark.",
    tags: ["Brand Identity", "Logo Design"],
    categories: ["Brand Identity Designs"],
    image: window.__resources.imgBookrion,
    detail: {
      role: "Brand Designer",
      timeline: "Apr 2024 — Aug 2024",
      client: "BookRion Reading Club",
      hero: window.__resources.imgBookrion,
      body: [
        "BookRion needed a single, charismatic mark that could anchor everything else — sign-ups, social, merch, the Saturday meet-ups. The brief was: warm, rooted, smart, not loud.",
        "I led with type. We tested four custom letterforms before landing on a single mono-line construction that reads as both 'book' and 'lion'. The shape carried through every other surface — signage, the welcome card, the bookmark we mailed to new members.",
      ],
    },
  },
  {
    slug: "veridian-arc",
    kind: "default",
    name: "Veridian Arc",
    url: "veridianarc.com",
    description:
      "Identity and website system for a sustainability-focused architecture studio working across Lagos and Abuja.",
    tags: ["Brand Identity", "Website"],
    categories: ["Brand Identity Designs", "Websites Designs"],
    image: window.__resources.imgWork2,
    detail: {
      role: "Brand + Web Designer",
      timeline: "Nov 2023 — Mar 2024",
      client: "Veridian Arc",
      hero: window.__resources.imgWork2,
      body: [
        "Veridian wanted to feel like a calm room with one good window. Quiet typographic system, a tight palette of clays and greens, and a website built around projects-as-photographs.",
      ],
    },
  },
  {
    slug: "tradeflow",
    kind: "ui",
    name: "TradeFlow",
    url: "",
    description:
      "Designing a student-focused savings and budgeting platform for life after school.",
    tags: ["UI/UX Case Study"],
    categories: ["Product UI/UX Designs"],
    image: window.__resources.imgUiMain,
    detail: {
      role: "Product Designer",
      timeline: "Jun 2024 — Oct 2024",
      client: "TradeFlow",
      hero: window.__resources.imgUiHero,
      body: [
        "TradeFlow's existing flow asked students for a lot of trust up front — bank details, KYC, the full graduation roadmap — before showing any product value. The redesign reverses that. Students see a personalised plan within 90 seconds of signup, and the heavier verification is deferred to the moment they actually move money.",
        "We tested three onboarding shapes with 12 students. The winning shape — a 'preview your plan' walkthrough — increased completion from 41% to 73%.",
      ],
    },
  },
  {
    slug: "adlm",
    kind: "default",
    name: "ADLM Studio",
    url: "adlm.studio",
    description:
      "Visual identity refresh for a Lagos-based architecture and interiors studio working with hospitality clients.",
    tags: ["Brand Identity", "Print"],
    categories: ["Brand Identity Designs"],
    image: window.__resources.imgWork1,
    detail: {
      role: "Brand Designer",
      timeline: "Feb 2024 — Jun 2024",
      client: "ADLM Studio",
      hero: window.__resources.imgWork1,
      body: [
        "ADLM had outgrown its first logo. The new mark is a confident A-frame monogram set in a custom display cut.",
      ],
    },
  },
  {
    slug: "flyers-social",
    kind: "gallary",
    name: "Flyers & Social Media",
    url: "",
    description:
      "Selected event flyers, social posts and campaign creatives across faith, fintech and education clients.",
    tags: ["Graphic Design"],
    categories: ["Graphic Designs"],
    image: window.__resources.imgGraphics,
    detail: {
      role: "Graphic Designer",
      timeline: "2022 — present",
      client: "Various",
      hero: window.__resources.imgGraphics,
      body: ["A rotating gallery of 40+ flyers, social tiles and campaign creatives."],
    },
  },
  {
    slug: "credi",
    kind: "default",
    name: "Credi",
    url: "credi.app",
    description:
      "Naming and identity for a credit-building micro-loan startup serving early-career professionals.",
    tags: ["Brand Identity", "Logo Design"],
    categories: ["Brand Identity Designs"],
    image: window.__resources.imgWork3,
    detail: {
      role: "Brand Designer",
      timeline: "Aug 2023 — Nov 2023",
      client: "Credi",
      hero: window.__resources.imgWork3,
      body: ["A wordmark that reads as steady and small, never as 'fintech billboard'."],
    },
  },
];

const TABS = [
  { label: "All", matches: null },
  { label: "Brand Identity Designs", matches: ["Brand Identity Designs"] },
  { label: "Websites Designs",       matches: ["Websites Designs"] },
  { label: "Product UI/UX Designs",  matches: ["Product UI/UX Designs"] },
  { label: "Graphic Designs",        matches: ["Graphic Designs"] },
];

const PARTNERS = [
  { src: window.__resources.pAdlm, alt: "ADLM Studio" },
  { src: window.__resources.pVeridian, alt: "Veridian Arc" },
  { src: window.__resources.pTradeflow, alt: "TradeFlow" },
  { src: window.__resources.pBookrion, alt: "BookRion" },
  { src: window.__resources.pNiqsGrey, color: window.__resources.pNiqsColor, alt: "NIQS" },
  { src: window.__resources.pYdpayGrey, color: window.__resources.pYdpayColor, alt: "YDPay" },
];

const PROCESS_STEPS = [
  { title: "Discover", desc: "Understanding the problem and defining the goal.", icon: "search" },
  { title: "Ideate",   desc: "Brainstorm ideas and explore multiple design directions.", icon: "bulb" },
  { title: "Design",   desc: "Develop high-fidelity designs, focusing on usability and aesthetics.", icon: "ruler" },
  { title: "Test & Refine", desc: "Conduct usability testing to identify potential pain points.", icon: "flask" },
];

Object.assign(window, { PROJECTS, TABS, PARTNERS, PROCESS_STEPS });
