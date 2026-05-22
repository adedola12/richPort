const brandIdentityDeliverables = [
  {
    id: "logo-design",
    label: "Logo Design",
    perPlan: {
      gold: "check",
      silver: "check",
      platinum: "check",
    },
  },
  {
    id: "colour-palette",
    label: "Colour Palette",
    perPlan: {
      gold: "check",
      silver: "check",
      platinum: "check",
    },
  },
  {
    id: "typography",
    label: "Typography",
    perPlan: {
      gold: "check",
      silver: "check",
      platinum: "check",
    },
  },
  {
    id: "brand-patterns",
    label: "Brand Pattern/Textures",
    perPlan: {
      gold: "-",
      silver: "check",
      platinum: "check",
    },
  },
  {
    id: "business-card",
    label: "Business Card",
    perPlan: {
      gold: "check",
      silver: "check",
      platinum: "check",
    },
  },
  {
    id: "email-signature",
    label: "Email Signature",
    perPlan: {
      gold: "-",
      silver: "check",
      platinum: "check",
    },
  },
  {
    id: "mockup-images",
    label: "Mockup Images",
    perPlan: {
      gold: "2",
      silver: "7",
      platinum: "One for each design",
    },
  },
  {
    id: "presentation-template",
    label: "Presentation/Deck Template",
    perPlan: {
      gold: "-",
      silver: "check",
      platinum: "check",
    },
  },
  {
    id: "letterhead",
    label: "Letterhead",
    perPlan: {
      gold: "-",
      silver: "check",
      platinum: "check",
    },
  },
  {
    id: "brand-guideline",
    label: "Brand Guideline",
    perPlan: {
      gold: "-",
      silver: "15 - 30 pages",
      platinum: "Complete Guideline (30+ pages)",
    },
  },
  {
    id: "social-media-design",
    label: "Social Media Design",
    perPlan: {
      gold: "2",
      silver: "2",
      platinum: "5",
    },
  },
  {
    id: "social-media-banner",
    label: "Social Media Banner",
    perPlan: {
      gold: "1",
      silver: "3",
      platinum: "All Social Media Platforms",
    },
  },
  {
    id: "marketing-design",
    label: "Marketing Design",
    perPlan: {
      gold: "-",
      silver: "2",
      platinum: "5",
    },
  },
  {
    id: "merch-design",
    label: "Merch Designs",
    perPlan: {
      gold: "1",
      silver: "4",
      platinum: "10",
    },
  },
  {
    id: "revisions",
    label: "Revisions",
    perPlan: {
      gold: "2",
      silver: "3",
      platinum: "Unlimited",
    },
  },
  {
    id: "source-files",
    label: "Source File",
    perPlan: {
      gold: "JPEG, PNG",
      silver: "JPEG, PNG, SVG",
      platinum: "All Files",
    },
  },
  {
    id: "website",
    label: "Website",
    perPlan: {
      gold: "-",
      silver: "-",
      platinum: "4 pages",
    },
  },
];

export const rateCategories = [
  {
    id: "brand-identity",
    label: "Brand Identity",
    heading: "Brand Identity",
    description:
      "More than just a logo or color scheme; a brand identity is the overall personality and image that defines a brand in the minds of its audience. It includes every visual element—such as typography, colors, and design choices—that a brand uses to communicate its values and create a memorable experience.",
    plans: [
      {
        id: "gold",
        name: "Gold",
        price: 100,
        currency: "USD",
        description:
          "For small businesses starting out and needing a subtle identity.",
        tagline: "Basic essentials only",
        accentColorClass: "text-amber-400",
        isFeatured: false,
        badgeType: null,
        badgeLabel: null,
      },
      {
        id: "silver",
        name: "Silver",
        price: 299,
        currency: "USD",
        description: "Launch your brand with everything you need to stand out.",
        tagline: "Best for Startups",
        accentColorClass: "text-lime-400",
        isFeatured: true, // center card
        badgeType: "recommended",
        badgeLabel: "🔥 Recommended",
      },
      {
        id: "platinum",
        name: "Platinum",
        price: 650,
        currency: "USD",
        description:
          "Full brand + professional website to position your business at the next level.",
        tagline: "Made for Enterprises",
        accentColorClass: "text-indigo-300",
        isFeatured: false,
        badgeType: "premium",
        badgeLabel: "✨ Premium Choice",
      },
    ],
    deliverables: brandIdentityDeliverables,
  },

  {
    id: "websites",
    label: "Websites",
    heading: "Website Design Packages",
    description:
      "Conversion-focused, responsive websites designed to look great on every device and help you convert visitors into paying customers.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: 400,
        currency: "USD",
        description: "Single landing page for early-stage businesses.",
        isFeatured: false,
        badgeType: null,
        badgeLabel: null,
      },
      {
        id: "growth",
        name: "Growth",
        price: 850,
        currency: "USD",
        description: "Multi-page website with blog and basic SEO setup.",
        isFeatured: true,
        badgeType: "recommended",
        badgeLabel: "🔥 Recommended",
      },
      {
        id: "premium",
        name: "Premium",
        price: 1500,
        currency: "USD",
        description:
          "Full custom website with advanced integrations and support.",
        isFeatured: false,
        badgeType: "premium",
        badgeLabel: "✨ Premium Choice",
      },
    ],
  },

  {
    id: "product-uiux",
    label: "Product UI/UX Designs",
    heading: "Product UI/UX Design",
    description:
      "End-to-end product UI/UX design for web and mobile apps – from wireframes to polished user interfaces and design systems.",
    plans: [
      {
        id: "essentials",
        name: "Essentials",
        price: 500,
        currency: "USD",
        description: "UI refresh for key screens of your product.",
        isFeatured: false,
        badgeType: null,
        badgeLabel: null,
      },
      {
        id: "standard",
        name: "Standard",
        price: 1200,
        currency: "USD",
        description: "Complete UI kit for your MVP release.",
        isFeatured: true,
        badgeType: "recommended",
        badgeLabel: "🔥 Recommended",
      },
      {
        id: "full-suite",
        name: "Full Suite",
        price: 2500,
        currency: "USD",
        description:
          "UX research, flows, wireframes and full UI for complex products.",
        isFeatured: false,
        badgeType: "premium",
        badgeLabel: "✨ Premium Choice",
      },
    ],
  },

  {
    id: "publication",
    label: "Publication",
    heading: "Publication Design",
    description:
      "Elegant layouts for reports, proposals, magazines and digital publications that communicate clearly and look premium.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        price: 150,
        currency: "USD",
        description: "Up to 10 pages of layout design.",
        isFeatured: false,
        badgeType: null,
        badgeLabel: null,
      },
      {
        id: "standard",
        name: "Standard",
        price: 300,
        currency: "USD",
        description: "Up to 30 pages with custom graphics.",
        isFeatured: true,
        badgeType: "recommended",
        badgeLabel: "🔥 Recommended",
      },
      {
        id: "extended",
        name: "Extended",
        price: 550,
        currency: "USD",
        description: "Large reports and publications with full design support.",
        isFeatured: false,
        badgeType: "premium",
        badgeLabel: "✨ Premium Choice",
      },
    ],
  },

  {
    id: "presentation",
    label: "Presentation",
    heading: "Presentation Design",
    description:
      "Pitch decks, investor presentations and training slides that tell your story clearly and visually.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: 120,
        currency: "USD",
        description: "Up to 10 custom slides.",
        isFeatured: false,
        badgeType: null,
        badgeLabel: null,
      },
      {
        id: "pro",
        name: "Pro",
        price: 250,
        currency: "USD",
        description: "Up to 25 slides with custom icons and charts.",
        isFeatured: true,
        badgeType: "recommended",
        badgeLabel: "🔥 Recommended",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 500,
        currency: "USD",
        description:
          "Large decks and templates for ongoing internal presentations.",
        isFeatured: false,
        badgeType: "premium",
        badgeLabel: "✨ Premium Choice",
      },
    ],
  },

  {
    id: "event-branding",
    label: "Event Branding",
    heading: "Event Branding",
    description:
      "Coherent event identities – from banners and backdrops to passes and social media graphics.",
    plans: [
      {
        id: "mini-event",
        name: "Mini Event",
        price: 300,
        currency: "USD",
        description: "Core visuals for small events and meet-ups.",
        isFeatured: false,
        badgeType: null,
        badgeLabel: null,
      },
      {
        id: "standard-event",
        name: "Standard Event",
        price: 700,
        currency: "USD",
        description: "Full set of event graphics and signage.",
        isFeatured: true,
        badgeType: "recommended",
        badgeLabel: "🔥 Recommended",
      },
      {
        id: "flagship",
        name: "Flagship",
        price: 1300,
        currency: "USD",
        description: "Premium branding for conferences and large-scale events.",
        isFeatured: false,
        badgeType: "premium",
        badgeLabel: "✨ Premium Choice",
      },
    ],
  },

  {
    id: "marketing-designs",
    label: "Marketing Designs",
    heading: "Marketing Design",
    description:
      "Campaign visuals, ads, social media design and marketing assets to keep your brand consistent everywhere.",
    plans: [
      {
        id: "lite",
        name: "Lite",
        price: 180,
        currency: "USD",
        description: "Design support for a single campaign.",
        isFeatured: false,
        badgeType: null,
        badgeLabel: null,
      },
      {
        id: "growth",
        name: "Growth",
        price: 400,
        currency: "USD",
        description: "Monthly pack of social and ad creatives.",
        isFeatured: true,
        badgeType: "recommended",
        badgeLabel: "🔥 Recommended",
      },
      {
        id: "scale",
        name: "Scale",
        price: 800,
        currency: "USD",
        description:
          "Ongoing design support for multiple campaigns and channels.",
        isFeatured: false,
        badgeType: "premium",
        badgeLabel: "✨ Premium Choice",
      },
    ],
  },
];
