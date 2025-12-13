// src/components/admin/ProjectsTab.jsx
import React, { useEffect, useState } from "react";
import { uploadImage, MAX_IMAGE_MB } from "../../utils/uploadImage";
import { useAuth } from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa";

const PROJECTS_API = import.meta.env.VITE_AUTH_ENDPOINT || "";

// simple slug helper
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

const emptyGallery = ["", "", "", "", "", "", ""];

const ProjectsTab = () => {
  const { authFetch } = useAuth();
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [existingProjects, setExistingProjects] = useState([]);

  const [form, setForm] = useState({
    // basic meta
    name: "",
    slug: "",
    url: "",
    shortDescription: "",
    tags: "",
    categories: "",
    caseStudyNotes: "",

    // HERO / DETAILS
    clientName: "",
    heroCategories: "",
    heroDeliverables: "",
    heroTimeline: "",
    heroTeamInitials: "",

    // PROCESS STEPS (Discover / Ideate / Design / Test)
    discoverTitle: "",
    discoverBody: "",
    ideateTitle: "",
    ideateBody: "",
    designTitle: "",
    designBody: "",
    testTitle: "",
    testBody: "",

    // CONCLUSION SECTION
    conclusionTitle: "",
    conclusionBody: "",
    conclusionCtaLabel: "",
    conclusionCtaUrl: "",

    // IMAGES
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
        setExistingProjects([]);
        return;
      }

      try {
        const res = await authFetch(`${PROJECTS_API}/api/projects/admin`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setExistingProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, [authFetch]);

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

    // show empty bar immediately
    setUploadProgress((prev) => ({ ...prev, [progressKey]: 0 }));

    uploadImage(
      file,
      (p) =>
        setUploadProgress((prev) => ({
          ...prev,
          [progressKey]: p,
        }))
      // endpoint left as default: /api/projects/admin/upload
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
          message: err.message || "Image upload failed. Please try again.",
        });
        setUploadProgress((prev) => {
          const copy = { ...prev };
          delete copy[progressKey];
          return copy;
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Saving project..." });

    const heroCategoriesArray = form.heroCategories
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const teamInitialsArray = form.heroTeamInitials
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const caseStudyStepsRaw = [
      {
        id: "discover",
        pillLabel: "Discover",
        title: form.discoverTitle.trim(),
        body: form.discoverBody.trim(),
      },
      {
        id: "ideate",
        pillLabel: "Ideate",
        title: form.ideateTitle.trim(),
        body: form.ideateBody.trim(),
      },
      {
        id: "design",
        pillLabel: "Design",
        title: form.designTitle.trim(),
        body: form.designBody.trim(),
      },
      {
        id: "test",
        pillLabel: "Test & Refine",
        title: form.testTitle.trim(),
        body: form.testBody.trim(),
      },
    ];

    const caseStudySteps = caseStudyStepsRaw.filter((s) => s.title || s.body);

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

      clientName: form.clientName.trim() || "",
      heroMeta: {
        categories: heroCategoriesArray,
        deliverables: form.heroDeliverables.trim(),
        timeline: form.heroTimeline.trim(),
        teamInitials: teamInitialsArray,
      },

      caseStudySteps,
      caseStudyNotes: form.caseStudyNotes.trim(),

      conclusionTitle: form.conclusionTitle.trim(),
      conclusionBody: form.conclusionBody.trim(),
      conclusionCtaLabel: form.conclusionCtaLabel.trim(),
      conclusionCtaUrl: form.conclusionCtaUrl.trim(),

      images: {
        main: form.mainImageUrl || null,
        mid: form.midImageUrl || null,
        conclusion: form.conclusionImageUrl || null,
        inline: form.inlineImageUrl || null,
        gallery: (form.galleryImageUrls || []).filter(Boolean),
      },

      pageImg: form.mainImageUrl || null,
      galleryImages: (form.galleryImageUrls || []).filter(Boolean),
      caseStudyImage: form.inlineImageUrl || null,
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
      const url = editingId
        ? `${PROJECTS_API}/api/projects/admin/${editingId}`
        : `${PROJECTS_API}/api/projects/admin`;

      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus({
        type: "success",
        message: "Project saved successfully ✅",
      });

      const listRes = await authFetch(`${PROJECTS_API}/api/projects/admin`);
      const listData = await listRes.json();
      setExistingProjects(Array.isArray(listData) ? listData : []);

      if (!editingId) {
        setForm({
          name: "",
          slug: "",
          url: "",
          shortDescription: "",
          tags: "",
          categories: "",
          caseStudyNotes: "",

          clientName: "",
          heroCategories: "",
          heroDeliverables: "",
          heroTimeline: "",
          heroTeamInitials: "",

          discoverTitle: "",
          discoverBody: "",
          ideateTitle: "",
          ideateBody: "",
          designTitle: "",
          designBody: "",
          testTitle: "",
          testBody: "",

          conclusionTitle: "",
          conclusionBody: "",
          conclusionCtaLabel: "",
          conclusionCtaUrl: "",

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

  const handleDeleteProject = async (projectId) => {
    if (!PROJECTS_API) return;

    const id = projectId;
    const confirm = window.confirm("Delete this project?");
    if (!confirm) return;

    try {
      const res = await authFetch(`${PROJECTS_API}/api/projects/admin/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");

      setExistingProjects((prev) => prev.filter((p) => (p.id || p._id) !== id));

      if (editingId === id) {
        setEditingId(null);
        setForm({
          name: "",
          slug: "",
          url: "",
          shortDescription: "",
          tags: "",
          categories: "",
          caseStudyNotes: "",

          clientName: "",
          heroCategories: "",
          heroDeliverables: "",
          heroTimeline: "",
          heroTeamInitials: "",

          discoverTitle: "",
          discoverBody: "",
          ideateTitle: "",
          ideateBody: "",
          designTitle: "",
          designBody: "",
          testTitle: "",
          testBody: "",

          conclusionTitle: "",
          conclusionBody: "",
          conclusionCtaLabel: "",
          conclusionCtaUrl: "",

          mainImageUrl: "",
          midImageUrl: "",
          conclusionImageUrl: "",
          inlineImageUrl: "",
          galleryImageUrls: emptyGallery,
        });
      }

      setStatus({
        type: "success",
        message: "Project deleted ✅",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to delete project. Please try again.",
      });
    }
  };

  const startEditing = (project) => {
    const gallery = project.images?.gallery || project.galleryImages || [];
    const paddedGallery =
      gallery.length >= 7
        ? gallery.slice(0, 7)
        : [...gallery, ...Array(7 - gallery.length).fill("")];

    const heroMeta = project.heroMeta || {};
    const heroCats =
      heroMeta.categories ||
      (Array.isArray(project.categories) ? project.categories : []);

    const heroTeamInitials = heroMeta.teamInitials || [];

    const steps = Array.isArray(project.caseStudySteps)
      ? project.caseStudySteps
      : [];

    const getStep = (id, indexFallback) =>
      steps.find((s) => s.id === id) || steps[indexFallback] || {};

    const discover = getStep("discover", 0);
    const ideate = getStep("ideate", 1);
    const design = getStep("design", 2);
    const test = getStep("test", 3);

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

      clientName: project.clientName || "",
      heroCategories: Array.isArray(heroCats) ? heroCats.join(", ") : "",
      heroDeliverables: heroMeta.deliverables || "",
      heroTimeline: heroMeta.timeline || "",
      heroTeamInitials: Array.isArray(heroTeamInitials)
        ? heroTeamInitials.join(", ")
        : "",

      discoverTitle: discover.title || "",
      discoverBody: discover.body || "",
      ideateTitle: ideate.title || "",
      ideateBody: ideate.body || "",
      designTitle: design.title || "",
      designBody: design.body || "",
      testTitle: test.title || "",
      testBody: test.body || "",

      conclusionTitle: project.conclusionTitle || "",
      conclusionBody: project.conclusionBody || "",
      conclusionCtaLabel: project.conclusionCtaLabel || "",
      conclusionCtaUrl: project.conclusionCtaUrl || "",

      mainImageUrl:
        project.images?.main || project.pageImg || project.heroImageUrl || "",
      midImageUrl: project.images?.mid || project.midImgUrl || "",
      conclusionImageUrl:
        project.images?.conclusion || project.conclusionImage || "",
      inlineImageUrl: project.images?.inline || project.caseStudyImage || "",
      galleryImageUrls: paddedGallery,
    });

    setStatus({ type: "idle", message: "" });
    setUploadProgress({});
  };

  // Delete image from Cloudinary and clear it from the form
  const handleRemoveImage = async (fieldKey, galleryIndex = null) => {
    let imageUrl = "";

    if (fieldKey === "mainImage") imageUrl = form.mainImageUrl;
    if (fieldKey === "midImage") imageUrl = form.midImageUrl;
    if (fieldKey === "conclusionImage") imageUrl = form.conclusionImageUrl;
    if (fieldKey === "inlineImage") imageUrl = form.inlineImageUrl;
    if (fieldKey === "gallery" && galleryIndex !== null) {
      imageUrl = form.galleryImageUrls?.[galleryIndex] || "";
    }

    if (!imageUrl) return;

    const confirmDelete = window.confirm(
      "Remove this image? It will also be deleted from Cloudinary."
    );
    if (!confirmDelete) return;

    // Try to delete from backend / Cloudinary
    if (PROJECTS_API) {
      try {
        await authFetch(`${PROJECTS_API}/api/projects/admin/delete-image`, {
          method: "POST", // or DELETE if you prefer
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: imageUrl }),
        });
      } catch (err) {
        console.error(err);
        setStatus({
          type: "error",
          message:
            "Could not delete image from server. Local reference was removed.",
        });
      }
    }

    // Clear from form state
    setForm((prev) => {
      const next = { ...prev };

      if (fieldKey === "mainImage") next.mainImageUrl = "";
      if (fieldKey === "midImage") next.midImageUrl = "";
      if (fieldKey === "conclusionImage") next.conclusionImageUrl = "";
      if (fieldKey === "inlineImage") next.inlineImageUrl = "";
      if (fieldKey === "gallery" && galleryIndex !== null) {
        const gallery = [...(prev.galleryImageUrls || emptyGallery)];
        gallery[galleryIndex] = "";
        next.galleryImageUrls = gallery;
      }

      return next;
    });

    // Clear any upload progress for that field
    const progressKey =
      galleryIndex !== null ? `${fieldKey}-${galleryIndex}` : fieldKey;
    setUploadProgress((prev) => {
      const copy = { ...prev };
      delete copy[progressKey];
      return copy;
    });
  };

  // ✅ show bar whenever we have a value for this key
  const renderProgressBar = (progressKey) => {
    const value = uploadProgress[progressKey];
    if (value == null) return null;

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

        {/* HERO DETAILS SECTION */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h3 className="text-sm font-semibold font-['Mont']">
            Project details (hero section)
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Client Name
              </label>
              <input
                name="clientName"
                value={form.clientName}
                onChange={handleTextChange}
                className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                placeholder="Book Rion"
              />
            </div>

            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Timeline
              </label>
              <input
                name="heroTimeline"
                value={form.heroTimeline}
                onChange={handleTextChange}
                className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                placeholder="4 weeks"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Categories shown in hero (comma separated)
              </label>
              <input
                name="heroCategories"
                value={form.heroCategories}
                onChange={handleTextChange}
                className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                placeholder="Brand Identity Design, UI/UX Design, Graphic Design, Website Design"
              />
            </div>
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Deliverables (hero row)
              </label>
              <textarea
                name="heroDeliverables"
                value={form.heroDeliverables}
                onChange={handleTextChange}
                rows={2}
                className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
                placeholder="Art Direction, User Interface, Branding Strategy, Print Design, 3D Render"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Team members initials (comma separated)
            </label>
            <input
              name="heroTeamInitials"
              value={form.heroTeamInitials}
              onChange={handleTextChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="AQ, JS, MK, ..."
            />
          </div>
        </div>

        {/* PROCESS STEPS SECTION */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h3 className="text-sm font-semibold font-['Mont']">
            Process steps (Discover / Ideate / Design / Test)
          </h3>

          {/* Discover */}
          <div className="space-y-2">
            <p className="text-[11px] font-['Mont'] text-neutral-300 uppercase tracking-[0.18em]">
              Discover
            </p>
            <input
              name="discoverTitle"
              value={form.discoverTitle}
              onChange={handleTextChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Understanding the Problem"
            />
            <textarea
              name="discoverBody"
              value={form.discoverBody}
              onChange={handleTextChange}
              rows={3}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
              placeholder="Body text for the Discover step..."
            />
          </div>

          {/* Ideate */}
          <div className="space-y-2">
            <p className="text-[11px] font-['Mont'] text-neutral-300 uppercase tracking-[0.18em]">
              Ideate
            </p>
            <input
              name="ideateTitle"
              value={form.ideateTitle}
              onChange={handleTextChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Exploring Concepts"
            />
            <textarea
              name="ideateBody"
              value={form.ideateBody}
              onChange={handleTextChange}
              rows={3}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
              placeholder="Body text for the Ideate step..."
            />
          </div>

          {/* Design */}
          <div className="space-y-2">
            <p className="text-[11px] font-['Mont'] text-neutral-300 uppercase tracking-[0.18em]">
              Design
            </p>
            <input
              name="designTitle"
              value={form.designTitle}
              onChange={handleTextChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Bringing the Concept to Life"
            />
            <textarea
              name="designBody"
              value={form.designBody}
              onChange={handleTextChange}
              rows={3}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
              placeholder="Body text for the Design step..."
            />
          </div>

          {/* Test & Refine */}
          <div className="space-y-2">
            <p className="text-[11px] font-['Mont'] text-neutral-300 uppercase tracking-[0.18em]">
              Test &amp; Refine
            </p>
            <input
              name="testTitle"
              value={form.testTitle}
              onChange={handleTextChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Perfecting the Details"
            />
            <textarea
              name="testBody"
              value={form.testBody}
              onChange={handleTextChange}
              rows={3}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
              placeholder="Body text for the Test & Refine step..."
            />
          </div>
        </div>

        {/* IMAGES SECTION */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-semibold font-['Mont']">Images</h3>

          {/* Main / mid / conclusion / inline */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Main image */}
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Main Image (Hero)
                <span className="ml-1 text-[10px] font-normal text-neutral-400">
                  (max {MAX_IMAGE_MB}MB)
                </span>
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
                <div className="mt-2 relative inline-block">
                  <img
                    src={form.mainImageUrl}
                    alt="Main"
                    className="h-32 w-full max-w-xs rounded-md object-cover border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("mainImage")}
                    className="
        absolute -top-2 -right-2 rounded-full
        bg-black/80 p-1 text-red-400
        hover:bg-red-600 hover:text-white transition
      "
                    title="Delete image"
                  >
                    <FaTrash className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Mid image */}
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Mid Section Image
                <span className="ml-1 text-[10px] font-normal text-neutral-400">
                  (max {MAX_IMAGE_MB}MB)
                </span>
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
                <div className="mt-2 relative inline-block">
                  <img
                    src={form.midImageUrl}
                    alt="Mid"
                    className="h-32 w-full max-w-xs rounded-md object-cover border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("midImage")}
                    className="
        absolute -top-2 -right-2 rounded-full
        bg-black/80 p-1 text-red-400
        hover:bg-red-600 hover:text-white transition
      "
                    title="Delete image"
                  >
                    <FaTrash className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Conclusion image */}
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Conclusion Image
                <span className="ml-1 text-[10px] font-normal text-neutral-400">
                  (max {MAX_IMAGE_MB}MB)
                </span>
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
                <div className="mt-2 relative inline-block">
                  <img
                    src={form.conclusionImageUrl}
                    alt="Conclusion"
                    className="h-32 w-full max-w-xs rounded-md object-cover border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("conclusionImage")}
                    className="
        absolute -top-2 -right-2 rounded-full
        bg-black/80 p-1 text-red-400
        hover:bg-red-600 hover:text-white transition
      "
                    title="Delete image"
                  >
                    <FaTrash className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Inline / case-study image */}
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                In-text / Process Image
                <span className="ml-1 text-[10px] font-normal text-neutral-400">
                  (max {MAX_IMAGE_MB}MB)
                </span>
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
                <div className="mt-2 relative inline-block">
                  <img
                    src={form.inlineImageUrl}
                    alt="Inline"
                    className="h-32 w-full max-w-xs rounded-md object-cover border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("inlineImage")}
                    className="
        absolute -top-2 -right-2 rounded-full
        bg-black/80 p-1 text-red-400
        hover:bg-red-600 hover:text-white transition
      "
                    title="Delete image"
                  >
                    <FaTrash className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bento gallery images */}
          <div className="space-y-2">
            <p className="text-xs font-semibold font-['Mont']">
              Bento Gallery Images (5–7)
              <span className="ml-1 text-[10px] font-normal text-neutral-400">
                These map to the bento grid in the case study page. Upload 5, 6
                or 7 images – they will appear in slots #1–#
                {form.galleryImageUrls.length}.
              </span>
            </p>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {form.galleryImageUrls.map((url, index) => {
                const key = `gallery-${index}`;
                return (
                  <div key={key} className="space-y-1">
                    <label className="block text-[10px] mb-0.5 font-semibold font-['Mont']">
                      Bento Image #{index + 1}
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
                      <div className="relative mt-1">
                        <img
                          src={url}
                          alt={`Gallery ${index + 1}`}
                          className="h-20 w-full rounded-md object-cover border border-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage("gallery", index)}
                          className="
                  absolute -top-2 -right-2 rounded-full
                  bg-black/80 p-1 text-red-400
                  hover:bg-red-600 hover:text-white transition
                "
                          title="Delete gallery image"
                        >
                          <FaTrash className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CONCLUSION FIELDS */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h3 className="text-sm font-semibold font-['Mont']">
            Conclusion section
          </h3>

          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Conclusion Heading
            </label>
            <input
              name="conclusionTitle"
              value={form.conclusionTitle}
              onChange={handleTextChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Conclusion"
            />
          </div>

          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Conclusion Body
            </label>
            <textarea
              name="conclusionBody"
              value={form.conclusionBody}
              onChange={handleTextChange}
              rows={4}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
              placeholder="Final summary of results and impact..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                CTA Label
              </label>
              <input
                name="conclusionCtaLabel"
                value={form.conclusionCtaLabel}
                onChange={handleTextChange}
                className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                placeholder="View product case study"
              />
            </div>
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                CTA URL
              </label>
              <input
                name="conclusionCtaUrl"
                value={form.conclusionCtaUrl}
                onChange={handleTextChange}
                className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Case study notes */}
        <div className="pt-4 border-t border-white/10">
          <label className="block text-xs mb-1 font-semibold font-['Mont']">
            Case Study Notes (optional)
          </label>
          <textarea
            name="caseStudyNotes"
            value={form.caseStudyNotes}
            onChange={handleTextChange}
            rows={4}
            className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
            placeholder="Internal notes about steps, process, etc. (not necessarily shown on the public page)."
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
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEditing(p)}
                          className="text-[11px] px-3 py-1 rounded-md bg-white/10 border border-white/20 hover:bg-white/20"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteProject(p.id || p._id)}
                          className="p-1.5 rounded-md border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                          title="Delete"
                        >
                          <FaTrash className="h-3 w-3" />
                        </button>
                      </div>
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
