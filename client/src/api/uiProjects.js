// src/api/uiProjects.js
import { fetchJson } from "./http";

export const uiProjectsApi = {
  listPublished: () => fetchJson("/api/ui-projects"),
  getDefault: () => fetchJson("/api/ui-projects/default"),
  getBySlug: (slug) =>
    fetchJson(`/api/ui-projects/slug/${encodeURIComponent(slug)}`),
  getMainImages: () => fetchJson("/api/ui-projects/main-images"),
};
