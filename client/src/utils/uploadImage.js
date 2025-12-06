// src/utils/uploadImage.js
const API_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";

export function uploadImage(file, onProgress) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file selected"));
    if (!API_BASE) return reject(new Error("VITE_AUTH_ENDPOINT is not set"));

    const xhr = new XMLHttpRequest();
    // ✅ correct path
    xhr.open("POST", `${API_BASE}/api/projects/admin/upload`);
    xhr.withCredentials = true;

    const token = localStorage.getItem("adminToken");
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

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
          resolve(res.url); // the Cloudinary URL
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
