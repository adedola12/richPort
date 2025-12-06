// controllers/projectController.js
import Project from "../models/ProjectModel.js";
import cloudinary from "../cloudinary.js";
import streamifier from "streamifier";

/** Folder used when uploading project images */
const PROJECT_FOLDER = "richard_portfolio/projects";

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
    const pathname = u.pathname; // "/<cloud>/image/upload/v.../richard_portfolio/projects/filename.jpg"
    const needle = `/${PROJECT_FOLDER}/`;
    const idx = pathname.indexOf(needle);
    if (idx === -1) return null;

    // Get "richard_portfolio/projects/filename.jpg"
    let publicIdWithExt = pathname.substring(idx + 1); // drop leading "/"

    // Remove file extension
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

    const project = await Project.create({
      ...req.body,
      slug: slug.toLowerCase(),
      pageImg: req.body.images?.main || req.body.pageImg || null,
      galleryImages: req.body.images?.gallery || req.body.galleryImages || [],
      caseStudyImage:
        req.body.images?.inline || req.body.caseStudyImage || null,
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
    const updates = { ...req.body };

    if (updates.slug) {
      updates.slug = updates.slug.toLowerCase();
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
            folder: "richard_portfolio/projects",
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

    // result = { result: 'ok' | 'not found' | 'error', ... }
    if (result.result !== "ok" && result.result !== "not found") {
      console.error("Cloudinary destroy error:", result);
      return res.status(500).json({ message: "Failed to delete image." });
    }

    return res.json({
      message: "Project image deleted.",
      publicId,
      cloudinary: result,
    });
  } catch (err) {
    console.error("deleteProjectImage error:", err);
    return res.status(500).json({ message: "Failed to delete image." });
  }
};


