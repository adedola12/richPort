import GraphicProject from "../models/GraphicProjectModel.js";
import cloudinary from "../cloudinary.js";
import streamifier from "streamifier";

const GRAPHIC_PROJECT_FOLDER = "richard_portfolio/graphic-projects";

// ✅ max size guard
const MAX_GFX_IMAGE_MB = Number(process.env.GFX_IMAGE_MAX_MB || 10);
const MAX_GFX_IMAGE_BYTES = MAX_GFX_IMAGE_MB * 1024 * 1024;

/* ------------------------- utils ------------------------- */
const safeArr = (v) => (Array.isArray(v) ? v : []);
const safeStr = (v) => (v == null ? "" : String(v));
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

const slugLower = (v) => safeStr(v).toLowerCase().trim();

const oneOf = (v, allowed, fallback) => (allowed.includes(v) ? v : fallback);

function boolVal(v, fallback = false) {
  if (v === undefined || v === null) return fallback;
  if (typeof v === "boolean") return v;
  const s = String(v).toLowerCase();
  return s === "true" || s === "1" || s === "yes" || s === "on";
}

/** Cloudinary URL -> public_id (same logic as UIProject) */
const extractPublicIdFromUrl = (url, folder) => {
  try {
    const u = new URL(url);
    const needle = `/${folder}/`;
    const idx = u.pathname.indexOf(needle);
    if (idx === -1) return null;

    let publicIdWithExt = u.pathname.substring(idx + 1); // drop leading "/"
    const lastDot = publicIdWithExt.lastIndexOf(".");
    if (lastDot !== -1) publicIdWithExt = publicIdWithExt.substring(0, lastDot);
    return publicIdWithExt;
  } catch {
    return null;
  }
};

const normalizeCloudImage = (imgRaw) => {
  const img = isObj(imgRaw) ? imgRaw : {};
  const url = safeStr(img.url).trim();
  const publicId = safeStr(img.publicId).trim();
  if (!url || !publicId) return null;

  return {
    url,
    publicId,
    width: img.width == null ? null : Number(img.width),
    height: img.height == null ? null : Number(img.height),
  };
};

const normalizeCloudImages = (arrRaw) =>
  safeArr(arrRaw).map(normalizeCloudImage).filter(Boolean);

const buildMainImage = (payload) =>
  payload?.headline?.image?.url || payload?.otherImages?.[0]?.url || null;

/* --------------------------- PUBLIC --------------------------- */
export const getAllGraphicProjects = async (_req, res) => {
  try {
    const items = await GraphicProject.find({ status: "published" }).sort({
      createdAt: -1,
    });
    return res.json(items);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Failed to fetch graphic projects." });
  }
};

export const getGraphicProjectById = async (req, res) => {
  try {
    const item = await GraphicProject.findById(req.params.id);
    if (!item || item.status !== "published")
      return res.status(404).json({ message: "Graphic project not found." });
    return res.json(item);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Failed to fetch graphic project." });
  }
};

/* --------------------------- ADMIN --------------------------- */
export const getAllGraphicProjectsAdmin = async (_req, res) => {
  try {
    const items = await GraphicProject.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Failed to fetch graphic projects." });
  }
};

export const createGraphicProject = async (req, res) => {
  try {
    const raw = isObj(req.body) ? req.body : {};

    const payload = {
      projectType: "graphic",
      projectName: safeStr(raw.projectName).trim(),
      subtitle: safeStr(raw.subtitle).trim(),
      status: oneOf(raw.status, ["draft", "published"], "published"),

      headline: {
        enabled: boolVal(raw?.headline?.enabled, true),
        text: safeStr(raw?.headline?.text).trim(),
        image: normalizeCloudImage(raw?.headline?.image),
      },

      body: {
        enabled: boolVal(raw?.body?.enabled, true),
        text: safeStr(raw?.body?.text),
      },

      otherImages: normalizeCloudImages(raw.otherImages),
    };

    // ✅ required validations
    if (!payload.projectName) {
      return res.status(400).json({ message: "Project name is required." });
    }

    // headline must have text + image if enabled (per your requirement)
    if (payload.headline.enabled) {
      if (!payload.headline.text) {
        return res.status(400).json({ message: "Headline text is required." });
      }
      if (!payload.headline.image?.url || !payload.headline.image?.publicId) {
        return res.status(400).json({ message: "Headline image is required." });
      }
    }

    // other images must be 16-50
    if (payload.otherImages.length < 16 || payload.otherImages.length > 50) {
      return res.status(400).json({
        message: `Other images must be between 16 and 50. You provided ${payload.otherImages.length}.`,
      });
    }

    payload.mainImage = buildMainImage(payload);

    const created = await GraphicProject.create(payload);
    return res.status(201).json(created);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Failed to create graphic project." });
  }
};

export const updateGraphicProject = async (req, res) => {
  try {
    const { id } = req.params;
    const current = await GraphicProject.findById(id);
    if (!current)
      return res.status(404).json({ message: "Graphic project not found." });

    const raw = isObj(req.body) ? req.body : {};
    const updates = {};

    if ("projectName" in raw)
      updates.projectName = safeStr(raw.projectName).trim();
    if ("subtitle" in raw) updates.subtitle = safeStr(raw.subtitle).trim();
    if ("status" in raw)
      updates.status = oneOf(
        raw.status,
        ["draft", "published"],
        current.status,
      );

    if ("headline" in raw) {
      updates.headline = {
        enabled: boolVal(raw?.headline?.enabled, current.headline?.enabled),
        text: safeStr(raw?.headline?.text ?? current.headline?.text).trim(),
        image:
          normalizeCloudImage(raw?.headline?.image) ??
          current.headline?.image ??
          null,
      };
    }

    if ("body" in raw) {
      updates.body = {
        enabled: boolVal(raw?.body?.enabled, current.body?.enabled),
        text: safeStr(raw?.body?.text ?? current.body?.text),
      };
    }

    if ("otherImages" in raw) {
      updates.otherImages = normalizeCloudImages(raw.otherImages);
      if (updates.otherImages.length < 16 || updates.otherImages.length > 50) {
        return res.status(400).json({
          message: `Other images must be between 16 and 50. You provided ${updates.otherImages.length}.`,
        });
      }
    }

    const merged = {
      ...current.toObject(),
      ...updates,
      headline: updates.headline ?? current.headline,
      otherImages: updates.otherImages ?? current.otherImages,
    };

    // headline required if enabled
    if (merged.headline?.enabled) {
      if (!safeStr(merged.headline.text).trim()) {
        return res.status(400).json({ message: "Headline text is required." });
      }
      if (!merged.headline.image?.url || !merged.headline.image?.publicId) {
        return res.status(400).json({ message: "Headline image is required." });
      }
    }

    updates.mainImage = buildMainImage(merged);

    const saved = await GraphicProject.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return res.json(saved);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Failed to update graphic project." });
  }
};

export const deleteGraphicProject = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await GraphicProject.findById(id);
    if (!item)
      return res.status(404).json({ message: "Graphic project not found." });

    // ✅ best-effort Cloudinary cleanup
    const urls = [
      item.headline?.image?.url,
      ...safeArr(item.otherImages).map((x) => x?.url),
    ].filter(Boolean);

    await Promise.all(
      urls.map(async (url) => {
        const publicId = extractPublicIdFromUrl(url, GRAPHIC_PROJECT_FOLDER);
        if (!publicId) return;
        try {
          await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
          });
        } catch {
          // ignore
        }
      }),
    );

    await item.deleteOne();
    return res.json({ message: "Graphic project deleted." });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Failed to delete graphic project." });
  }
};

/* ------------------- Cloudinary image endpoints ------------------- */
export const uploadGraphicProjectImage = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image file provided." });

    if (!req.file.mimetype?.startsWith("image/")) {
      return res.status(400).json({ message: "Only image files are allowed." });
    }

    if (req.file.size > MAX_GFX_IMAGE_BYTES) {
      return res.status(413).json({
        message: `Image too large. Max ${MAX_GFX_IMAGE_MB}MB.`,
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: GRAPHIC_PROJECT_FOLDER, resource_type: "image" },
        (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        },
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    return res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Image upload failed." });
  }
};

export const deleteGraphicProjectImage = async (req, res) => {
  try {
    const { url, publicId } = req.body || {};

    let pid = publicId ? safeStr(publicId).trim() : null;

    if (!pid) {
      if (!url)
        return res.status(400).json({ message: "Image URL is required." });
      pid = extractPublicIdFromUrl(url, GRAPHIC_PROJECT_FOLDER);
    }

    if (!pid) {
      return res.status(400).json({
        message: "Could not derive Cloudinary public_id from URL.",
      });
    }

    const result = await cloudinary.uploader.destroy(pid, {
      resource_type: "image",
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(500).json({ message: "Failed to delete image." });
    }

    return res.json({
      message: "Image deleted.",
      publicId: pid,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to delete image." });
  }
};
