// Server-side plan/pricing source of truth for the booking flow.
// Money is ALWAYS recomputed here — never trusted from the client payload.
// Mirrored on the client in client/src/config/plans.js — keep in sync.

export const OWNER = {
  name: "Richard Enoch",
  fullName: "Adesiyan Richard Enoch",
  title: "Brand Identity & Product Designer",
  // official/displayed contact email (sender is GMAIL_USER — keep them the same)
  email: "des.richardenoch@gmail.com",
  // where "NEW BOOKING" notifications are delivered
  notifyEmail: process.env.OWNER_EMAIL || "des.richardenoch@gmail.com",
  whatsapp: "0903 852 2066",
  whatsappIntl: "2349038522066",
  site: "rich-port.vercel.app",
  banks: [
    { bank: "Access Bank", acc: "0774365963", name: "Adesiyan Richard Enoch" },
    { bank: "Guaranty Trust Bank", acc: "0324882817", name: "Adesiyan Richard Enoch" },
  ],
};

/* USD rate-card prices converted to NGN. RATE_OVERRIDE pins the rate
   (1285.72 pins Gold at exactly NGN 450,000 as quoted). Set to null to
   use the live market rate (FALLBACK_RATE if the fetch fails). */
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

/* ---- pricing helpers ---- */

export async function getFxRate() {
  if (PRICING.RATE_OVERRIDE) return { rate: PRICING.RATE_OVERRIDE, source: "pinned" };
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const r = await fetch("https://open.er-api.com/v6/latest/USD", { signal: ctrl.signal });
    clearTimeout(t);
    const j = await r.json();
    if (j?.rates?.NGN) return { rate: j.rates.NGN, source: "live" };
  } catch {
    /* fall through to fallback */
  }
  return { rate: PRICING.FALLBACK_RATE, source: "fallback" };
}

export function computeMoney(planKey, fxRate) {
  const usd = PRICING.USD[planKey];
  const r = PRICING.ROUND_TO || 1;
  const price = Math.round((usd * fxRate) / r) * r;
  const deposit = Math.round((price * DEPOSIT_PCT) / 100);
  return { price_usd: usd, price, deposit, balance: price - deposit };
}

export const formatNGN = (n) => "NGN " + Number(n || 0).toLocaleString("en-NG");
