// server/config/websitePlans.js
// Website design + build packages, tiered by page count. NGN-priced.
// Tiering follows the standard industry structure: brochure site →
// business site with CMS → custom build with advanced features.
export const WEBSITE_PLANS = {
  starter: {
    label: "Starter",
    pages: "Up to 5 pages",
    priceNGN: 200000,
    from: false,
    timeline: "2–3 weeks",
    revisions: "2 revision rounds",
    deliverables: [
      "Up to 5 custom-designed pages",
      "Mobile-first responsive build",
      "Contact form + WhatsApp link",
      "Basic on-page SEO",
      "Social media integration",
      "2 revision rounds",
      "Launch + 2 weeks post-launch support",
    ],
  },
  business: {
    label: "Business",
    pages: "Up to 10 pages",
    priceNGN: 380000,
    from: false,
    timeline: "3–5 weeks",
    revisions: "3 revision rounds",
    deliverables: [
      "Up to 10 custom-designed pages",
      "Everything in Starter",
      "Blog / CMS — edit your own content",
      "Analytics + Search Console setup",
      "On-page SEO for every page",
      "Newsletter / email capture",
      "3 revision rounds",
      "Launch + 1 month post-launch support",
    ],
  },
  premium: {
    label: "Premium",
    pages: "15+ pages / custom",
    priceNGN: 650000,
    from: true, // "from" pricing — final quote depends on scope
    timeline: "Scoped per project",
    revisions: "Revisions until launch-ready",
    deliverables: [
      "15+ pages or a custom web application",
      "Everything in Business",
      "Custom features — store, booking, payments, or member area",
      "Performance optimisation pass",
      "Priority delivery & support",
      "Source files + handover documentation",
      "Revisions until launch-ready",
    ],
  },
};
