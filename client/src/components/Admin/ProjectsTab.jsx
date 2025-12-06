// src/components/admin/ProjectsTab.jsx
import React, { useState } from "react";

const PROJECTS_API = import.meta.env.VITE_ADMIN_PROJECTS_ENDPOINT || "";

// simple slug helper
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

const ProjectsTab = () => {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [form, setForm] = useState({
    name: "",
    slug: "",
    url: "",
    shortDescription: "",
    tags: "",
    categories: "",
    heroImageUrl: "",
    galleryImageUrls: "",
    caseStudyNotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      // auto-generate slug from name if slug empty
      if (name === "name" && !prev.slug) {
        return { ...prev, name: value, slug: slugify(value) };
      }
      return { ...prev, [name]: value };
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
      pageImg: form.heroImageUrl.trim() || null,
      galleryImages: form.galleryImageUrls
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean),
      caseStudyNotes: form.caseStudyNotes.trim(), // free text for now
    };

    try {
      if (!PROJECTS_API) {
        console.log("Admin project payload:", payload);
        await new Promise((res) => setTimeout(res, 700));
        setStatus({
          type: "success",
          message:
            "Project saved locally. Once PROJECTS_API is set, this will be sent to the backend.",
        });
        return;
      }

      const res = await fetch(PROJECTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus({
        type: "success",
        message: "Project saved successfully ✅",
      });
      setForm({
        name: "",
        slug: "",
        url: "",
        shortDescription: "",
        tags: "",
        categories: "",
        heroImageUrl: "",
        galleryImageUrls: "",
        caseStudyNotes: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to save project. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold font-['Mont']">
        Add / Edit Projects
      </h2>
      <p className="text-sm text-neutral-300 font-['Lexend'] max-w-2xl">
        Use this form to add projects that feed into the Projects page and
        individual case study pages.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Project Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
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
              onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Brand Identity, Website Designs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1 font-semibold font-['Mont']">
            Hero Image URL
          </label>
          <input
            name="heroImageUrl"
            value={form.heroImageUrl}
            onChange={handleChange}
            className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
            placeholder="https://cdn.../hero.png"
          />
        </div>

        <div>
          <label className="block text-xs mb-1 font-semibold font-['Mont']">
            Gallery Image URLs (one per line)
          </label>
          <textarea
            name="galleryImageUrls"
            value={form.galleryImageUrls}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
            placeholder={"https://cdn.../img1.png\nhttps://cdn.../img2.png"}
          />
        </div>

        <div>
          <label className="block text-xs mb-1 font-semibold font-['Mont']">
            Case Study Notes (optional)
          </label>
          <textarea
            name="caseStudyNotes"
            value={form.caseStudyNotes}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
            placeholder="Notes about steps, process, etc. You can later map this into caseStudySteps."
          />
        </div>

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
          {status.type === "loading" ? "Saving..." : "Save Project"}
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
    </div>
  );
};

export default ProjectsTab;
