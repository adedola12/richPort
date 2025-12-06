// src/components/admin/ProjectsTab.jsx
import React, { useEffect, useState } from "react";
import { uploadImage } from "../../utils/uploadImage";

const PROJECTS_API = import.meta.env.VITE_ADMIN_PROJECTS_ENDPOINT || "";

// simple slug helper
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

const emptyGallery = ["", "", "", "", ""];

const ProjectsTab = () => {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [existingProjects, setExistingProjects] = useState([]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    url: "",
    shortDescription: "",
    tags: "",
    categories: "",
    caseStudyNotes: "",
    mainImageUrl: "",
    midImageUrl: "",
    conclusionImageUrl: "",
    inlineImageUrl: "",
    galleryImageUrls: emptyGallery,
  });

  // upload progress keyed by field name, e.g. "mainImage", "gallery-0"
  const [uploadProgress, setUploadProgress] = useState({});

  // ---- Load existing projects ----
  useEffect(() => {
    const fetchProjects = async () => {
      if (!PROJECTS_API) {
        // demo data while backend not ready
        setExistingProjects([]);
        return;
      }

      try {
        const res = await fetch(PROJECTS_API);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setExistingProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "name" && !prev.slug) {
        return { ...prev, name: value, slug: slugify(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  // Generic image upload handler
  const handleImageSelect = (fieldKey, file, galleryIndex = null) => {
    if (!file) return;

    const progressKey =
      galleryIndex !== null ? `${fieldKey}-${galleryIndex}` : fieldKey;

    setUploadProgress((prev) => ({ ...prev, [progressKey]: 0 }));

    uploadImage(file, (p) =>
      setUploadProgress((prev) => ({ ...prev, [progressKey]: p }))
    )
      .then((url) => {
        setForm((prev) => {
          const next = { ...prev };

          if (fieldKey === "mainImage") next.mainImageUrl = url;
          if (fieldKey === "midImage") next.midImageUrl = url;
          if (fieldKey === "conclusionImage") next.conclusionImageUrl = url;
          if (fieldKey === "inlineImage") next.inlineImageUrl = url;
          if (fieldKey === "gallery") {
            const gallery = [...(prev.galleryImageUrls || emptyGallery)];
            gallery[galleryIndex] = url;
            next.galleryImageUrls = gallery;
          }

          return next;
        });
      })
      .catch((err) => {
        console.error(err);
        setStatus({
          type: "error",
          message: "Image upload failed. Please try again.",
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Saving project..." });

    const payload = {
      slug: form.slug || slugify(form.name),
      name: form.name.trim(),
      url: form.url.trim() || null,
      description: form.shortDescription.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      categories: form.categories
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      images: {
        main: form.mainImageUrl || null,
        mid: form.midImageUrl || null,
        conclusion: form.conclusionImageUrl || null,
        inline: form.inlineImageUrl || null,
        gallery: (form.galleryImageUrls || []).filter(Boolean),
      },
      // for compatibility with previous front-end
      pageImg: form.mainImageUrl || null,
      galleryImages: (form.galleryImageUrls || []).filter(Boolean),
      caseStudyNotes: form.caseStudyNotes.trim(),
    };

    try {
      if (!PROJECTS_API) {
        console.log("Admin project payload:", payload);
        await new Promise((res) => setTimeout(res, 700));
        setStatus({
          type: "success",
          message:
            "Project saved locally (no PROJECTS_API set). Check console payload.",
        });
        return;
      }

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${PROJECTS_API}/${editingId}` : PROJECTS_API;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus({
        type: "success",
        message: "Project saved successfully ✅",
      });

      // reload list
      const listRes = await fetch(PROJECTS_API);
      const listData = await listRes.json();
      setExistingProjects(Array.isArray(listData) ? listData : []);

      // reset form only if it was a "create"
      if (!editingId) {
        setForm({
          name: "",
          slug: "",
          url: "",
          shortDescription: "",
          tags: "",
          categories: "",
          caseStudyNotes: "",
          mainImageUrl: "",
          midImageUrl: "",
          conclusionImageUrl: "",
          inlineImageUrl: "",
          galleryImageUrls: emptyGallery,
        });
      }
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to save project. Please try again.",
      });
    }
  };

  const startEditing = (project) => {
    const gallery = project.images?.gallery || project.galleryImages || [];

    const paddedGallery =
      gallery.length >= 5
        ? gallery.slice(0, 5)
        : [...gallery, ...Array(5 - gallery.length).fill("")];

    setEditingId(project._id || project.id || null);

    setForm({
      name: project.name || "",
      slug: project.slug || "",
      url: project.url || "",
      shortDescription: project.description || "",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      categories: Array.isArray(project.categories)
        ? project.categories.join(", ")
        : "",
      caseStudyNotes: project.caseStudyNotes || "",
      mainImageUrl:
        project.images?.main || project.pageImg || project.heroImageUrl || "",
      midImageUrl: project.images?.mid || "",
      conclusionImageUrl: project.images?.conclusion || "",
      inlineImageUrl: project.images?.inline || "",
      galleryImageUrls: paddedGallery,
    });

    setStatus({ type: "idle", message: "" });
    setUploadProgress({});
  };

  const renderProgressBar = (progressKey) => {
    const value = uploadProgress[progressKey] || 0;
    if (value <= 0 || value >= 100) return null;

    return (
      <div className="mt-1 w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
        <div
          className="h-1.5 rounded-full bg-lime-400 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold font-['Mont']">
          Add / Edit Projects
        </h2>
        <p className="text-sm text-neutral-300 font-['Lexend'] max-w-2xl">
          Use this form to add projects that feed into the Projects page and
          individual case study pages. Images are uploaded and previewed here;
          you don’t need to paste URLs manually.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic meta */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Project Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleTextChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Book Rion"
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Slug
            </label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleTextChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="book-rion"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1 font-semibold font-['Mont']">
            Project URL
          </label>
          <input
            name="url"
            value={form.url}
            onChange={handleTextChange}
            className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
            placeholder="https://project-site.com"
          />
        </div>

        <div>
          <label className="block text-xs mb-1 font-semibold font-['Mont']">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleTextChange}
            rows={3}
            className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
            placeholder="One or two sentences describing the project..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Tags (comma separated)
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleTextChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Brand Identity, UX, Website"
            />
          </div>
          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Categories (comma separated)
            </label>
            <input
              name="categories"
              value={form.categories}
              onChange={handleTextChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Brand Identity, Website Designs"
            />
          </div>
        </div>

        {/* IMAGES SECTION */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold font-['Mont']">Images</h3>

          {/* Main / mid / conclusion / inline */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Main image */}
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Main Image (Hero)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageSelect("mainImage", e.target.files?.[0] || null)
                }
                className="block w-full text-xs text-neutral-200 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
              />
              {renderProgressBar("mainImage")}
              {form.mainImageUrl && (
                <div className="mt-2">
                  <img
                    src={form.mainImageUrl}
                    alt="Main"
                    className="h-32 w-full max-w-xs rounded-md object-cover border border-white/10"
                  />
                </div>
              )}
            </div>

            {/* Mid image */}
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Mid Section Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageSelect("midImage", e.target.files?.[0] || null)
                }
                className="block w-full text-xs text-neutral-200 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
              />
              {renderProgressBar("midImage")}
              {form.midImageUrl && (
                <div className="mt-2">
                  <img
                    src={form.midImageUrl}
                    alt="Mid"
                    className="h-32 w-full max-w-xs rounded-md object-cover border border-white/10"
                  />
                </div>
              )}
            </div>

            {/* Conclusion image */}
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Conclusion Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageSelect(
                    "conclusionImage",
                    e.target.files?.[0] || null
                  )
                }
                className="block w-full text-xs text-neutral-200 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
              />
              {renderProgressBar("conclusionImage")}
              {form.conclusionImageUrl && (
                <div className="mt-2">
                  <img
                    src={form.conclusionImageUrl}
                    alt="Conclusion"
                    className="h-32 w-full max-w-xs rounded-md object-cover border border-white/10"
                  />
                </div>
              )}
            </div>

            {/* Inline image */}
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                In-text Image (for case study content)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageSelect("inlineImage", e.target.files?.[0] || null)
                }
                className="block w-full text-xs text-neutral-200 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
              />
              {renderProgressBar("inlineImage")}
              {form.inlineImageUrl && (
                <div className="mt-2">
                  <img
                    src={form.inlineImageUrl}
                    alt="Inline"
                    className="h-32 w-full max-w-xs rounded-md object-cover border border-white/10"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 5 gallery images */}
          <div className="space-y-2">
            <p className="text-xs font-semibold font-['Mont']">
              Gallery Images (up to 5)
            </p>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {form.galleryImageUrls.map((url, index) => {
                const key = `gallery-${index}`;
                return (
                  <div key={key} className="space-y-1">
                    <label className="block text-[10px] mb-0.5 font-semibold font-['Mont']">
                      Gallery #{index + 1}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageSelect(
                          "gallery",
                          e.target.files?.[0] || null,
                          index
                        )
                      }
                      className="block w-full text-[10px] text-neutral-200 file:mr-1.5 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
                    />
                    {renderProgressBar(key)}
                    {url && (
                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="mt-1 h-20 w-full rounded-md object-cover border border-white/10"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Case study notes */}
        <div>
          <label className="block text-xs mb-1 font-semibold font-['Mont']">
            Case Study Notes (optional)
          </label>
          <textarea
            name="caseStudyNotes"
            value={form.caseStudyNotes}
            onChange={handleTextChange}
            rows={4}
            className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
            placeholder="Notes about steps, process, etc. You can later map this into caseStudySteps."
          />
        </div>

        {/* Submit button + status */}
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="
            mt-2 inline-flex items-center justify-center rounded-md
            bg-gradient-to-b from-lime-400 to-lime-600
            px-6 py-2.5 text-sm font-semibold text-black font-['Mont']
            shadow-[0_18px_60px_rgba(132,204,22,0.7)]
            hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {status.type === "loading"
            ? "Saving..."
            : editingId
            ? "Update Project"
            : "Save Project"}
        </button>

        {status.type !== "idle" && (
          <p
            className={`text-xs mt-2 font-['Mont'] ${
              status.type === "error"
                ? "text-red-400"
                : status.type === "success"
                ? "text-lime-400"
                : "text-neutral-300"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>

      {/* EXISTING PROJECTS LIST */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-semibold font-['Mont'] mb-3">
          Existing Projects
        </h3>
        {existingProjects.length === 0 ? (
          <p className="text-xs text-neutral-400 font-['Lexend']">
            No projects found yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
            <table className="min-w-full text-left text-xs font-['Lexend']">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Name
                  </th>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Slug
                  </th>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Main Image
                  </th>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {existingProjects.map((p) => (
                  <tr
                    key={p._id || p.id || p.slug}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2">{p.slug}</td>
                    <td className="px-3 py-2">
                      {(p.images?.main || p.pageImg) && (
                        <img
                          src={p.images?.main || p.pageImg}
                          alt={p.name}
                          className="h-10 w-16 object-cover rounded border border-white/10"
                        />
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => startEditing(p)}
                        className="text-[11px] px-3 py-1 rounded-md bg-white/10 border border-white/20 hover:bg-white/20"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsTab;
