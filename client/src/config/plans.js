// Shared plan/pricing config — single source of truth for the booking flow
// (and plan keys used by the Rate Card CTAs). Mirrored on the server in
// server/config/plans.js — keep the two in sync when prices change.

export const OWNER = {
  name: "Richard Enoch",
  fullName: "Adesiyan Richard Enoch",
  title: "Brand Identity & Product Designer",
  email: "des.richardenoch@gmail.com",
  whatsapp: "0903 852 2066",
  whatsappIntl: "2349038522066",
  site: "rich-port.vercel.app",
};

/* PRICING — USD rate-card prices, converted to NGN.
   RATE_OVERRIDE pins the exchange rate (currently pins Gold at exactly
   NGN 450,000 = 350 x 1285.72 as quoted). Set to null to use the live
   market rate from open.er-api.com (FALLBACK_RATE if the fetch fails). */
export const PRICING = {
  USD: { silver: 150, gold: 350, platinum: 450 },
  RATE_OVERRIDE: 1285.72, // null = use live rate
  FALLBACK_RATE: 1450,
  ROUND_TO: 1000,
};

export const DEPOSIT_PCT = 70;

export const PLANS = {
  silver: {
    label: "Silver",
    website: false,
    blurb: "For small businesses starting out that need a subtle identity.",
    deliverables: [
      "Logo Design", "Colour Palette", "Typography", "Business Card",
      "2 Social Media Designs", "1 Social Media Banner", "1 Merch Design",
      "2 Mockup Images", "2 Revision Rounds", "Final files: JPEG, PNG",
    ],
  },
  gold: {
    label: "Gold",
    website: true,
    blurb: "Launch your brand with everything you need to stand out.",
    deliverables: [
      "Logo Design", "Colour Palette", "Typography", "Brand Patterns / Textures",
      "Business Card", "Email Signature", "Letterhead", "Presentation / Deck Template",
      "Brand Guideline (15–30 pages)", "2 Social Media Designs", "3 Social Media Banners",
      "2 Marketing Designs", "4 Merch Designs", "7 Mockup Images", "5-Page Website",
      "3 Revision Rounds", "Final files: JPEG, PNG, SVG + website source code",
    ],
  },
  platinum: {
    label: "Platinum",
    website: true,
    blurb: "Full brand + professional website to position your business at the next level.",
    deliverables: [
      "Logo Design", "Colour Palette", "Typography", "Brand Patterns / Textures",
      "Business Card", "Email Signature", "Letterhead", "Presentation / Deck Template",
      "Complete Brand Guideline (30+ pages)", "5 Social Media Designs",
      "Banners for All Social Platforms", "5 Marketing Designs", "10 Merch Designs",
      "One Mockup per Design", "Website (pages as required)", "Revisions as required",
      "All Files + website source code",
    ],
  },
};

export const PLAN_KEYS = Object.keys(PLANS);

/* ---- pricing helpers ---- */

export const initialFx = () => ({
  rate: PRICING.RATE_OVERRIDE || PRICING.FALLBACK_RATE,
  source: PRICING.RATE_OVERRIDE ? "pinned" : "fallback",
});

export async function fetchLiveRate() {
  if (PRICING.RATE_OVERRIDE) return null; // pinned — skip
  try {
    const r = await fetch("https://open.er-api.com/v6/latest/USD");
    const j = await r.json();
    if (j?.rates?.NGN) return { rate: j.rates.NGN, source: "live" };
  } catch {
    /* keep fallback */
  }
  return null;
}

export const planUSD = (key) => PRICING.USD[key] ?? 0;

export function planPrice(key, fxRate) {
  const usd = planUSD(key);
  const r = PRICING.ROUND_TO || 1;
  return Math.round((usd * fxRate) / r) * r;
}

export const pct = (n, p) => Math.round((n * p) / 100);

export const formatNGN = (n) => "NGN " + Number(n || 0).toLocaleString("en-NG");

/* Map a Rate Card plan object (from /api/rates, e.g. name "Silver") to a
   booking plan key. Returns "" when the plan isn't one of the three tiers. */
export function planKeyFromName(name) {
  const n = String(name || "").toLowerCase();
  return PLAN_KEYS.find((k) => n.includes(k)) || "";
}
