// controllers/projectController.js
import Project from "../models/ProjectModel.js";
import cloudinary from "../cloudinary.js";
import streamifier from "streamifier";

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