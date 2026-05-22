// client/src/api/graphicProjectsApi.js
import { fetchJson } from "./http";

export const graphicProjectsApi = {
  // PUBLIC
  listPublished: () => fetchJson("/api/graphic-projects"),
  getByIdPublished: (id) => fetchJson(`/api/graphic-projects/${id}`),

  // ADMIN
  adminAll: () => fetchJson("/api/graphic-projects/admin/all"),
  adminCreate: (payload) =>
    fetchJson("/api/graphic-projects/admin", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  adminUpdate: (id, payload) =>
    fetchJson(`/api/graphic-projects/admin/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  adminDelete: (id) =>
    fetchJson(`/api/graphic-projects/admin/${id}`, { method: "DELETE" }),

  // IMAGES (Cloudinary)
  uploadImage: (file) => {

    
    const fd = new FormData();
    fd.append("image", file);
    return fetchJson("/api/graphic-projects/admin/upload", {
      method: "POST",
      body: fd,
    });
  },

  deleteImage: ({ url, publicId }) =>
    fetchJson("/api/graphic-projects/admin/delete-image", {
      method: "POST",
      body: JSON.stringify({ url, publicId }),
    }),
};
