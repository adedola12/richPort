// src/data/ratePlans.js
//
// The rate card. Prices are held in USD and converted to naira at the live
// rate, so the card stays current without anyone re-pinning a number.
// Ported from the old server/config/plans.js.

/* Live USD→NGN, with a pinned fallback so the card always renders. The
   endpoint is public, keyless and sends Access-Control-Allow-Origin: *. */
const FX_ENDPOINT = "https://open.er-api.com/v6/latest/USD";
export const FALLBACK_RATE = 1364.77; // captured 2026-08-04
const ROUND_TO = 1000;

export async function getFxRate() {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(FX_ENDPOINT, { signal: ctrl.signal });
    clearTimeout(timer);
    const json = await res.json();
    if (json?.rates?.NGN) return json.rates.NGN;
  } catch {
    /* fall through */
  }
  return FALLBACK_RATE;
}

export const toNGN = (usd, rate) =>
  `₦${(Math.round((usd * rate) / ROUND_TO) * ROUND_TO).toLocaleString("en-NG")}`;

/* Deposit taken to start work. */
export const DEPOSIT_PCT = 70;

/* ── Brand identity tiers ── */
const BRAND_TIERS = [
  {
    id: "silver",
    name: "Silver",
    usd: 150,
    description: "For small businesses starting out that need a subtle identity.",
  },
  {
    id: "gold",
    name: "Gold",
    usd: 350,
    description: "Launch your brand with everything you need to stand out.",
    isFeatured: true,
    badgeLabel: "Most popular",
  },
  {
    id: "platinum",
    name: "Platinum",
    usd: 450,
    description: "Full brand plus a professional website to position your business at the next level.",
  },
];

/* Comparison rows. Values are "check", "-", or literal text. */
const BRAND_DELIVERABLES = [
  ["logo", "Logo design", "check", "check", "check"],
  ["palette", "Colour palette", "check", "check", "check"],
  ["type", "Typography", "check", "check", "check"],
  ["patterns", "Brand patterns / textures", "-", "check", "check"],
  ["card", "Business card", "check", "check", "check"],
  ["signature", "Email signature", "-", "check", "check"],
  ["letterhead", "Letterhead", "-", "check", "check"],
  ["deck", "Presentation / deck template", "-", "check", "check"],
  ["guideline", "Brand guideline", "-", "15–30 pages", "30+ pages"],
  ["social", "Social media designs", "2", "2", "5"],
  ["banners", "Social media banners", "1", "3", "All platforms"],
  ["marketing", "Marketing designs", "-", "2", "5"],
  ["merch", "Merch designs", "1", "4", "10"],
  ["mockups", "Mockup images", "2", "7", "One per design"],
  ["website", "Website", "-", "5 pages", "Pages as required"],
  ["revisions", "Revision rounds", "2", "3", "As required"],
  ["files", "Final files", "JPEG, PNG", "+ SVG and website source", "All files and source"],
];

export const BRAND_DELIVERABLE_ROWS = BRAND_DELIVERABLES.map(
  ([id, label, silver, gold, platinum]) => ({
    id,
    label,
    perPlan: { silver, gold, platinum },
  })
);

/* Build the priced plan objects PlanSelection expects. */
export function buildBrandPlans(rate) {
  return BRAND_TIERS.map((tier) => ({
    id: tier.id,
    name: tier.name,
    price: toNGN(tier.usd, rate),
    currency: "NGN",
    description: tier.description,
    isFeatured: Boolean(tier.isFeatured),
    badgeLabel: tier.badgeLabel || "",
  }));
}

/* Categories whose pricing lived only in the retired admin panel. They show
   an enquiry prompt instead of an empty tab until real numbers exist. */
export const QUOTE_ON_REQUEST = new Set([
  "ui-ux",
  "publication-design",
  "presentation-design",
]);
