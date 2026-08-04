// src/data/journey.js
//
// The About-page timeline. Content is drawn from Richard's CV — edit it here
// and redeploy; there is no CMS behind this any more.
//
// Shape: { id, year, title, description: string[], imageUrl }
//   imageUrl — a real image is optional. Leave it null and the component falls
//   back to assets/journey/JImg.jpg. Swap in a real photo per entry when you
//   have one; five identical placeholders read as unfinished.

export const MAX_JOURNEY_ITEMS = 5;

const journey = [
  {
    id: "journey-adlm",
    year: 2022,
    title: "Creative Lead at ADLM Studio",
    description: [
      "Took creative direction for a ConTech studio building tools for quantity surveyors — brand identity, product UI, marketing collateral, and client deliverables across every engagement.",
      "This is where the studio's design standards, brand guidelines and shared component libraries came from, and where I started leading product design rather than only visual design.",
    ],
    imageUrl: null,
  },
  {
    id: "journey-oau",
    year: 2024,
    title: "BSc Quantity Surveying, Obafemi Awolowo University",
    description: [
      "Finished a quantity surveying degree while already working as a designer, which turned out to be the reason construction-technology clients trust the work.",
      "Knowing how a bill of quantities is actually built is why designing takeoff tools like Quiv came naturally.",
    ],
    imageUrl: null,
  },
  {
    id: "journey-bookrion",
    year: 2025,
    title: "Designing BookRion end to end",
    description: [
      "Took an Africa-focused book platform across web and mobile — Rion Prime, Young Rion and the Listing Portal — from research through to a maintained interface system.",
      "Ran usability testing, iterated against WCAG accessibility standards, and built the brand identity system alongside the product.",
    ],
    imageUrl: null,
  },
  {
    id: "journey-ydpay",
    year: 2026,
    title: "96 screens for YDPay",
    description: [
      "A full UI/UX redesign for a crypto fintech: 96 screens across 14 user flows, including new onboarding, wallet and game surfaces.",
      "Designed SpinPop — a gamification feature with its own wallet and Games Lobby — and led the marketing campaign for the YDPay × AFC Free Fire Tournament.",
    ],
    imageUrl: null,
  },
  {
    id: "journey-ai-workflow",
    year: 2026,
    title: "Building an AI-integrated design practice",
    description: [
      "Built a design-to-build workflow on Windows from scratch — Claude Code, Figma and Magic UI MCP servers, and a Figma to HTML and back loop deployed on Vercel.",
      "It compresses the distance between a design decision and a shipped interface, which is how a one-person studio delivers at the pace of a team.",
    ],
    imageUrl: null,
  },
];

export default journey;
