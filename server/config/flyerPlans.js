// server/config/flyerPlans.js
// Flyer / social-media design packages. Per-design cost decreases with
// volume; ₦9,000/design is the floor and applies only on the event plan.
export const FLYER_PLANS = {
  single: { label: "Single Design", designs: 1, priceNGN: 15000, perDesign: 15000, sourceFiles: false },
  triple: { label: "3-Design Pack", designs: 3, priceNGN: 39000, perDesign: 13000, sourceFiles: false },
  five:   { label: "5-Design Pack", designs: 5, priceNGN: 55000, perDesign: 11000, sourceFiles: true },
  event:  { label: "Event Campaign (6+ designs)", designs: null, priceNGN: null, perDesign: 9000, sourceFiles: true },
};
