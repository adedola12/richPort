// src/data/workExperience.js
//
// The About-page work history. Source of truth is Richard's CV
// (Richard_Enoch_Resume.md) — edit here and redeploy.
//
// Order in this array is the order rendered. Shape:
//   { id, name, role, durationLabel, workExperience: string[] }

const workExperience = [
  {
    id: "ydpay",
    name: "YDPay",
    role: "Creative Designer (Multidisciplinary)",
    durationLabel: "Feb 2026 – Jun 2026",
    workExperience: [
      "Lead end-to-end creative output across UI/UX, product design, social media, motion, print, and publication design — owning the visual language across all customer-facing touchpoints.",
      "Delivered a full UI/UX redesign covering 96 screens across 14 user flows, including new onboarding, wallet, and game surfaces.",
      "Designed SpinPop — a gamification feature with a dedicated wallet and Games Lobby — and shipped the referral dashboard system using a custom typographic and color framework.",
      "Produced motion design assets and the full marketing campaign for the YDPay × AFC Free Fire Tournament, expanding brand reach into gaming communities.",
      "Used AI-assisted workflows (Claude Code, Figma MCPs, Magic UI) to accelerate prototyping and component generation across the design-to-build pipeline.",
    ],
  },
  {
    id: "whitespace",
    name: "Whitespace Creatorverse",
    role: "Creative Designer",
    durationLabel: "Feb 2026 – Jun 2026",
    workExperience: [
      "Delivered multidisciplinary design across brand identity, UI/UX, web, and content design for agency clients spanning fintech, wellness, and creator-economy sectors.",
      "Translated client briefs and brand strategy into distinctive visual identities — logo systems, typography, colour frameworks, and full brand guideline documents.",
      "Designed responsive websites and digital platforms in collaboration with developers and strategists, holding craft consistency from concept through handoff.",
      "Contributed to agency-wide design quality through a shared design language, layout systems, and storytelling frameworks across client campaigns.",
    ],
  },
  {
    id: "bookrion",
    name: "Book Rion",
    role: "UI/UX & Brand Designer",
    durationLabel: "Jul 2025 – Mar 2026",
    workExperience: [
      "Designed and maintained the interface system across BookRion's web and mobile platforms — Rion Prime, Young Rion, and the Listing Portal — ensuring consistency and usability across all surfaces.",
      "Translated business goals and user research into wireframes, prototypes, and high-fidelity designs, including the Community and Book Clubs experience.",
      "Developed and managed BookRion's brand identity system — typography, colour palette, and visual assets — to strengthen brand coherence and recognition.",
      "Conducted usability testing and iterated on feedback, ensuring accessible, inclusive experiences aligned with WCAG standards.",
      "Collaborated cross-functionally with product managers, developers, and content teams to balance aesthetics, functionality, and business objectives.",
    ],
  },
  {
    id: "adlm",
    name: "ADLM Studio",
    role: "Creative Lead",
    durationLabel: "Feb 2022 – Present",
    workExperience: [
      "Lead creative direction for the studio — owning brand identity, product UI, marketing collateral, and client deliverables across multi-disciplinary projects.",
      "Define and maintain studio design standards, brand guidelines, and component libraries used across every client engagement.",
      "Lead product design for Quiv — a BIM-powered quantity take-off tool — from concept through prototype iterations (v3 to v4), informed by deep market research into BIM tool adoption in Lagos.",
      "Built an AI-integrated design workflow on Windows from scratch — Claude Code, Figma and Magic UI MCPs, and a Figma to HTML and back loop deployed to Vercel — to compress design and build cycles for studio projects.",
      "Collaborate with engineers and developers to align design intent with technical implementation, accelerating handoff and reducing rework.",
    ],
  },
];

export default workExperience;
