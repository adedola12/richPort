// src/data/testimonialOptions.js
// Service options for the public testimonial form + tag colors used
// wherever testimonials render. Keep labels in sync with the site's
// service categories.

export const TESTIMONIAL_SERVICES = [
  "Brand Identity",
  "UI / UX Design",
  "Website Design",
  "Flyer / Social Media Design",
  "Presentation Design",
  "Publication Design",
  "Other",
];

const SERVICE_COLORS = {
  "Brand Identity": "#818cf8",
  "UI / UX Design": "#01BA4B",
  "Website Design": "#38bdf8",
  "Flyer / Social Media Design": "#f59e0b",
  "Presentation Design": "#e879f9",
  "Publication Design": "#fb7185",
};

export const serviceColor = (service) => SERVICE_COLORS[service] || "#84cc16";
