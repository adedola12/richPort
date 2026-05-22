// controllers/projectController.js
import Project from "../models/ProjectModel.js"; // or "../models/Project.js" in your setup
import cloudinary from "../cloudinary.js";
import streamifier from "streamifier";

/** Folder used when uploading project images */
const PROJECT_FOLDER = "richard_portfolio/projects";

/** Normalise workExperience to a clean string[] */
const normalizeWorkExperience = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
};

/**
 * Extract Cloudinary public_id from a secure URL
 * Example URL:
 *  https://res.cloudinary.com/<cloud>/image/upload/v1691234567/richard_portfolio/projects/filename.jpg
 * Returns:
 *  richard_portfolio/projects/filename
 */
const extractProjectPublicIdFromUrl = (url) => {
  try {
    const u = new URL(url);
    const pathname = u.pathname;
    const needle = `/${PROJECT_FOLDER}/`;
    const idx = pathname.indexOf(needle);
    if (idx === -1) return null;

    let publicIdWithExt = pathname.substring(idx + 1); // drop leading "/"

    const lastDot = publicIdWithExt.lastIndexOf(".");
    if (lastDot !== -1) {
      publicIdWithExt = publicIdWithExt.substring(0, lastDot);
    }

    return publicIdWithExt;
  } catch (err) {
    console.error("extractProjectPublicIdFromUrl error:", err);
    return null;
  }
};

/**
 * GET /api/projects
 * Public list of projects
 */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.json(projects);
  } catch (err) {
    console.error("getAllProjects error:", err);
    return res.status(500).json({ message: "Failed to fetch projects." });
  }
};

/**
 * GET /api/projects/slug/:slug
 * Public single project by slug
 */
export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug: slug.toLowerCase() });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    return res.json(project);
  } catch (err) {
    console.error("getProjectBySlug error:", err);
    return res.status(500).json({ message: "Failed to fetch project." });
  }
};

/**
 * POST /api/projects/admin
 * Body: payload from ProjectsTab
 */
export const createProject = async (req, res) => {
  try {
    const { slug, name } = req.body;

    if (!slug || !name) {
      return res.status(400).json({ message: "Name and slug are required." });
    }

    const existing = await Project.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Slug already exists." });
    }

    const { category, description, tag, workExperience, images, pageImg, galleryImages, caseStudyImage, caseStudySteps, showOnProjectsPage, status } = req.body;

    const project = await Project.create({
      name,
      slug: slug.toLowerCase(),
      category,
      description,
      tag,
      showOnProjectsPage,
      status,
      workExperience: normalizeWorkExperience(workExperience),
      ...(caseStudySteps && { caseStudySteps }),
      pageImg: images?.main || pageImg || null,
      galleryImages: images?.gallery || galleryImages || [],
      caseStudyImage: images?.inline || caseStudyImage || null,
    });

    return res.status(201).json(project);
  } catch (err) {
    console.error("createProject error:", err);
    return res.status(500).json({ message: "Failed to create project." });
  }
};

/**
 * PUT /api/projects/admin/:id
 * Body: same payload as create
 */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = ["name", "slug", "category", "description", "tag", "workExperience", "images", "pageImg", "galleryImages", "caseStudyImage", "caseStudySteps", "showOnProjectsPage", "status"];
    const updates = {};
    for (const key of allowedFields) {
      if (key in req.body) updates[key] = req.body[key];
    }

    if (updates.slug) {
      updates.slug = updates.slug.toLowerCase();
    }

    // normalise workExperience
    if ("workExperience" in updates) {
      updates.workExperience = normalizeWorkExperience(updates.workExperience);
    }

    // keep backwards-compatible fields in sync
    if (updates.images) {
      updates.pageImg = updates.images.main || updates.pageImg || null;
      updates.galleryImages =
        updates.images.gallery || updates.galleryImages || [];
      updates.caseStudyImage =
        updates.images.inline || updates.caseStudyImage || null;
    }

    const project = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    return res.json(project);
  } catch (err) {
    console.error("updateProject error:", err);
    return res.status(500).json({ message: "Failed to update project." });
  }
};

/**
 * POST /api/projects/admin/upload
 * multipart/form-data with field "image"
 * Returns Cloudinary URL for the frontend to use.
 */
export const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: PROJECT_FOLDER,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(error);
            }
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    return res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (err) {
    console.error("uploadProjectImage error:", err);
    return res.status(500).json({ message: "Image upload failed." });
  }
};

/**
 * POST /api/projects/admin/delete-image
 * Body: { url: string }
 * Deletes an image from Cloudinary using its URL.
 */
export const deleteProjectImage = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "Image URL is required." });
    }

    const publicId = extractProjectPublicIdFromUrl(url);
    if (!publicId) {
      return res.status(400).json({
        message: "Could not derive Cloudinary public_id from URL.",
      });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      console.error("Cloudinary destroy error:", result);
      return res.status(500).json({ message: "Failed to delete image." });
    }

    return res.json({
      message: "Project image deleted.",
      publicId,
    });
  } catch (err) {
    console.error("deleteProjectImage error:", err);
    return res.status(500).json({ message: "Failed to delete image." });
  }
};

/**
 * GET /api/projects/main-images
 * Public: return only basic meta + main image for each project
 */
export const getProjectMainImages = async (req, res) => {
  try {
    // Only select what we need: name, slug, images.main, pageImg
    const projects = await Project.find(
      {},
      { name: 1, slug: 1, "images.main": 1, pageImg: 1 }
    ).sort({ createdAt: -1 });

    const payload = projects.map((p) => ({
      id: p._id,
      name: p.name,
      slug: p.slug,
      mainImage: (p.images && p.images.main) || p.pageImg || null,
    }));

    return res.json(payload);
  } catch (err) {
    console.error("getProjectMainImages error:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch project main images." });
  }
};
