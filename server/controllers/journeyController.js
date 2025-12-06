// server/controllers/journeyController.js
import Journey from "../models/JourneyModel.js";
import cloudinary from "../cloudinary.js";
import streamifier from "streamifier";

const JOURNEY_FOLDER = "richard_portfolio/journey";

const extractJourneyPublicIdFromUrl = (url) => {
  try {
    const u = new URL(url);
    const pathname = u.pathname; // "/.../upload/v.../richard_portfolio/journey/filename.jpg"
    const needle = `/${JOURNEY_FOLDER}/`;
    const idx = pathname.indexOf(needle);
    if (idx === -1) return null;

    let publicIdWithExt = pathname.substring(idx + 1); // "richard_portfolio/journey/filename.jpg"
    const lastDot = publicIdWithExt.lastIndexOf(".");
    if (lastDot !== -1) {
      publicIdWithExt = publicIdWithExt.substring(0, lastDot);
    }
    return publicIdWithExt;
  } catch (err) {
    console.error("extractJourneyPublicIdFromUrl error:", err);
    return null;
  }
};

/**
 * GET /api/journey
 * Public list of journey entries (sorted by year desc, then createdAt desc)
 */
export const getAllJourneyEntries = async (req, res) => {
  try {
    const entries = await Journey.find()
      .sort({ year: -1, createdAt: -1 })
      .lean();
    return res.json(entries);
  } catch (err) {
    console.error("getAllJourneyEntries error:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch journey entries." });
  }
};

/**
 * POST /api/journey/admin
 * Body: { year, title, description, imageUrl? }
 *  - description can be string (newline separated) or string[]
 */
export const createJourneyEntry = async (req, res) => {
  try {
    let { year, title, description, imageUrl } = req.body;

    // ---- validate year (number only) ----
    if (year === undefined || year === null || year === "") {
      return res.status(400).json({ message: "Year is required." });
    }

    const parsedYear = Number(year);
    if (!Number.isInteger(parsedYear)) {
      return res
        .status(400)
        .json({ message: "Year must be a whole number (e.g. 2024)." });
    }
    if (parsedYear < 1900 || parsedYear > 9999) {
      return res
        .status(400)
        .json({ message: "Year must be between 1900 and 9999." });
    }

    // ---- validate title ----
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required." });
    }

    // ---- normalize description to string[] ----
    let descriptionArray = [];
    if (Array.isArray(description)) {
      descriptionArray = description
        .map((d) => String(d).trim())
        .filter(Boolean);
    } else if (typeof description === "string") {
      descriptionArray = description
        .split(/\r?\n/)
        .map((d) => d.trim())
        .filter(Boolean);
    }

    const entry = await Journey.create({
      year: parsedYear,
      title: title.trim(),
      description: descriptionArray,
      imageUrl: imageUrl || null,
    });

    return res.status(201).json(entry);
  } catch (err) {
    console.error("createJourneyEntry error:", err);
    return res.status(500).json({ message: "Failed to create journey entry." });
  }
};

/**
 * PUT /api/journey/admin/:id
 * Body: partial or full { year, title, description, imageUrl }
 */
export const updateJourneyEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.year !== undefined) {
      const parsedYear = Number(updates.year);
      if (!Number.isInteger(parsedYear)) {
        return res
          .status(400)
          .json({ message: "Year must be a whole number (e.g. 2024)." });
      }
      if (parsedYear < 1900 || parsedYear > 9999) {
        return res
          .status(400)
          .json({ message: "Year must be between 1900 and 9999." });
      }
      updates.year = parsedYear;
    }

    if (updates.title) {
      updates.title = updates.title.trim();
    }

    if (updates.description !== undefined) {
      if (Array.isArray(updates.description)) {
        updates.description = updates.description
          .map((d) => String(d).trim())
          .filter(Boolean);
      } else if (typeof updates.description === "string") {
        updates.description = updates.description
          .split(/\r?\n/)
          .map((d) => d.trim())
          .filter(Boolean);
      } else {
        updates.description = [];
      }
    }

    const entry = await Journey.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!entry) {
      return res.status(404).json({ message: "Journey entry not found." });
    }

    return res.json(entry);
  } catch (err) {
    console.error("updateJourneyEntry error:", err);
    return res.status(500).json({ message: "Failed to update journey entry." });
  }
};

/**
 * DELETE /api/journey/admin/:id
 */
export const deleteJourneyEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Journey.findByIdAndDelete(id);
    if (!entry) {
      return res.status(404).json({ message: "Journey entry not found." });
    }
    return res.json({ message: "Journey entry deleted." });
  } catch (err) {
    console.error("deleteJourneyEntry error:", err);
    return res.status(500).json({ message: "Failed to delete journey entry." });
  }
};

/**
 * POST /api/journey/admin/upload
 * multipart/form-data with field "image"
 * Returns Cloudinary URL for the frontend to use.
 */
export const uploadJourneyImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "richard_portfolio/journey", // 👈 your folder name
            resource_type: "image",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
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
    console.error("uploadJourneyImage error:", err);
    return res.status(500).json({ message: "Image upload failed." });
  }
};

/**
 * POST /api/journey/admin/delete-image
 * Body: { url: string }
 * Deletes a journey image from Cloudinary.
 */
export const deleteJourneyImage = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "Image URL is required." });
    }

    const publicId = extractJourneyPublicIdFromUrl(url);
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
      message: "Journey image deleted.",
      publicId,
      cloudinary: result,
    });
  } catch (err) {
    console.error("deleteJourneyImage error:", err);
    return res.status(500).json({ message: "Failed to delete image." });
  }
};
