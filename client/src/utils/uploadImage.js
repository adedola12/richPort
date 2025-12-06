// src/utils/uploadImage.js
const API_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";

// Max size enforced on the client + label
export const MAX_IMAGE_MB = 10;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;

/**
 * Generic image uploader with progress callback
 * @param {File} file
 * @param {(percent:number) => void} onProgress
 * @param {string} endpoint - path or full URL
 *        default: "/api/projects/admin/upload"
 */
export function uploadImage(
  file,
  onProgress,
  endpoint = "/api/projects/admin/upload"
) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file selected"));

    // ✅ Client-side size check to match Cloudinary 10 MB limit
    if (file.size > MAX_IMAGE_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(1);
      return reject(
        new Error(
          `File is too large (${mb} MB). Maximum allowed is ${MAX_IMAGE_MB} MB.`
        )
      );
    }

    if (!API_BASE && !endpoint.startsWith("http")) {
      return reject(new Error("VITE_AUTH_ENDPOINT is not set"));
    }

    const url = endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.withCredentials = true;

    const token = localStorage.getItem("adminToken");
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    // ✅ progress from browser → Node
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && typeof onProgress === "function") {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText || "{}");
        if (xhr.status >= 200 && xhr.status < 300 && res.url) {
          // Ensure 100% on success
          if (typeof onProgress === "function") onProgress(100);
          resolve(res.url);
        } else {
          reject(new Error(res.message || "Image upload failed"));
        }
      } catch {
        reject(new Error("Image upload failed (invalid JSON)"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));

    const formData = new FormData();
    formData.append("image", file);
    xhr.send(formData);
  });
}
