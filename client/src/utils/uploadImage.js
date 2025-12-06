// src/utils/uploadImage.js
// Generic image upload helper with progress support.
// Uses VITE_ADMIN_UPLOAD_ENDPOINT if set; otherwise simulates an upload
// and returns a local object URL so your previews still work.

const UPLOAD_API = import.meta.env.VITE_ADMIN_UPLOAD_ENDPOINT || "";

export function uploadImage(file, onProgress) {
  if (!file) {
    return Promise.reject(new Error("No file provided"));
  }

  // If no real upload endpoint yet, simulate upload and return local preview URL
  if (!UPLOAD_API) {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      let progress = 0;

      const interval = setInterval(() => {
        progress += 20;
        if (typeof onProgress === "function") {
          onProgress(Math.min(progress, 100));
        }
        if (progress >= 100) {
          clearInterval(interval);
          resolve(url); // local blob URL
        }
      }, 120);
    });
  }

  // Real upload with XMLHttpRequest so we can track progress
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    xhr.open("POST", UPLOAD_API);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && typeof onProgress === "function") {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText || "{}");
          const url = res.url || res.location || res.fileUrl;
          if (!url) {
            reject(new Error("Upload succeeded but no URL returned"));
          } else {
            if (typeof onProgress === "function") onProgress(100);
            resolve(url);
          }
        } catch (err) {
          reject(err);
        }
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));

    xhr.send(formData);
  });
}
