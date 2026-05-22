// controllers/uiProjectController.js
import UIProject from "../models/UIProjectModel.js";
import cloudinary from "../cloudinary.js";
import streamifier from "streamifier";

const UI_PROJECT_FOLDER = "richard_portfolio/ui-projects";

// ✅ server-side max size guard (set UI_IMAGE_MAX_MB in env to match client MAX_IMAGE_MB)
const MAX_UI_IMAGE_MB = Number(process.env.UI_IMAGE_MAX_MB || 10);
const MAX_UI_IMAGE_BYTES = MAX_UI_IMAGE_MB * 1024 * 1024;

/* ------------------------- small utils ------------------------- */
const safeLines = (value) => {
  if (!value) return [];
  if (Array.isArray(value))
    return value
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean);

  if (typeof value === "string")
    return value
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);

  return [];
};

const safeArr = (v) => (Array.isArray(v) ? v : []);
const safeStr = (v) => (v == null ? "" : String(v));
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

const slugLower = (v) => safeStr(v).toLowerCase().trim();

const dateOrNull = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

const oneOf = (v, allowed, fallback) => (allowed.includes(v) ? v : fallback);

/** Cloudinary URL -> public_id */
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

/* --------------------- BLOCK-ONLY NORMALIZERS --------------------- */
const normalizeHero = (heroRaw) => {
  const hero = isObj(heroRaw) ? heroRaw : {};
  return {
    title: safeStr(hero.title).trim(),
    subtitle: safeStr(hero.subtitle).trim(),
    dateLabel: safeStr(hero.dateLabel).trim(),
    roleTitle: safeStr(hero.roleTitle).trim(),
    roleDescription: safeStr(hero.roleDescription),
    roleBullets: safeLines(hero.roleBullets),
    timelineLabel: safeStr(hero.timelineLabel).trim(),
  };
};

const normalizeBlocks = (blocksRaw) => {
  const allowedLayouts = ["wide", "half", "grid"];
  const allowedSides = ["left", "right"];
  const allowedWideVariants = ["full", "narrow"];
  const allowedPlacements = ["beforePersonas", "afterPersonas"];

  return safeArr(blocksRaw)
    .map((b) => (isObj(b) ? b : {}))
    .map((b) => {
      const images = safeArr(b.images)
        .map(String)
        .map((x) => x.trim())
        .filter(Boolean);

      const computedLayout =
        images.length > 1 ? "grid" : oneOf(b.layout, allowedLayouts, "wide");

      return {
        id: safeStr(b.id).trim(),
        enabled: b.enabled !== false,

        // ✅ independent sub toggles
        headlineEnabled: b.headlineEnabled !== false,
        bodyEnabled: b.bodyEnabled !== false,
        imagesEnabled: b.imagesEnabled !== false,

        // ✅ NEW: placement (defaults safely for legacy records)
        placement: oneOf(b.placement, allowedPlacements, "beforePersonas"),

        headline: safeStr(b.headline),
        body: safeStr(b.body),
        images,
        layout: computedLayout,
        textSide: oneOf(b.textSide, allowedSides, "left"),
        wideVariant: oneOf(b.wideVariant, allowedWideVariants, "full"),
      };
    })
    .filter((b) => b.headline.trim() || b.body.trim() || b.images.length);
};


const normalizeIdealUsersCards = (cardsRaw) => {
  return safeArr(cardsRaw)
    .map((c) => (isObj(c) ? c : {}))
    .map((c) => ({
      enabled: c.enabled !== false,
      name: safeStr(c.name).trim(),
      subtitle: safeStr(c.subtitle).trim(),
      about: safeStr(c.about).trim(),
      img: safeStr(c.img).trim(),
      pos: safeStr(c.pos).trim(),
    }))
    .filter((c) => c.name || c.subtitle || c.about || c.img);
};

const normalizeWriteUp = (writeUpRaw) => {
  const w = isObj(writeUpRaw) ? writeUpRaw : {};
  const blocks = normalizeBlocks(w.blocks);
  const cards = normalizeIdealUsersCards(w?.idealUsers?.cards);

  return {
    blocks,
    idealUsers: { cards },
  };
};

const normalizeImages = (imagesRaw) => {
  const images = isObj(imagesRaw) ? imagesRaw : {};
  const hero = images.hero ? safeStr(images.hero).trim() : null;
  const gallery = safeArr(images.gallery)
    .map(String)
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    hero: hero || null,
    gallery,
  };
};

const normalizeWorkExperienceMeta = (metaRaw) => {
  const m = isObj(metaRaw) ? metaRaw : {};
  return {
    clientName: safeStr(m.clientName).trim(),
    myRole: safeStr(m.myRole).trim(),
    startDate: dateOrNull(m.startDate),
    endDate: dateOrNull(m.endDate),
  };
};

const buildMainImage = (payload) => {
  const hero = payload?.images?.hero;
  const firstGallery = payload?.images?.gallery?.[0];
  return payload?.mainImage || hero || firstGallery || null;
};

const validateRequired = (payload) => {
  if (!payload?.name) return "Project Name is required.";
  if (!payload?.slug) return "Slug is required.";
  if (!payload?.hero?.title) return "Hero title is required.";
  return "";
};

/* --------------------------- PUBLIC --------------------------- */
export const getAllUIProjects = async (_req, res) => {
  try {
    const items = await UIProject.find({ status: "published" }).sort({
      createdAt: -1,
    });
    return res.json(items);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to fetch UI projects." });
  }
};

export const getDefaultUIProject = async (_req, res) => {
  try {
    let item = await UIProject.findOne({
      isDefault: true,
      status: "published",
    });

    if (!item) {
      item = await UIProject.findOne({ status: "published" }).sort({
        createdAt: -1,
      });
    }

    if (!item) return res.status(404).json({ message: "No UI project found." });
    return res.json(item);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Failed to fetch default UI project." });
  }
};

export const getUIProjectBySlug = async (req, res) => {
  try {
    const slug = slugLower(req.params.slug);
    const item = await UIProject.findOne({ slug, status: "published" });
    if (!item)
      return res.status(404).json({ message: "UI project not found." });
    return res.json(item);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to fetch UI project." });
  }
};

/* --------------------------- ADMIN --------------------------- */
export const getAllUIProjectsAdmin = async (_req, res) => {
  try {
    const items = await UIProject.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to fetch UI projects." });
  }
};

export const createUIProject = async (req, res) => {
  try {
    const raw = isObj(req.body) ? req.body : {};

    const payload = {
      projectType: "uiux",
      name: safeStr(raw.name).trim(),
      slug: slugLower(raw.slug),
      status: oneOf(raw.status, ["draft", "published"], "published"),
      isDefault: !!raw.isDefault,

      hero: normalizeHero(raw.hero),
      writeUp: normalizeWriteUp(raw.writeUp),
      images: normalizeImages(raw.images),

      mainImage: raw.mainImage ? safeStr(raw.mainImage).trim() : null,

      showInWorkExperience: !!raw.showInWorkExperience,
      workExperience: safeLines(raw.workExperience),
      workExperienceMeta: normalizeWorkExperienceMeta(raw.workExperienceMeta),
    };

    payload.mainImage = buildMainImage(payload);

    const msg = validateRequired(payload);
    if (msg) return res.status(400).json({ message: msg });

    const existing = await UIProject.findOne({ slug: payload.slug });
    if (existing)
      return res.status(409).json({ message: "Slug already exists." });

    const created = await UIProject.create(payload);

    if (created.isDefault) {
      await UIProject.updateMany(
        { _id: { $ne: created._id } },
        { $set: { isDefault: false } },
      );
    }

    return res.status(201).json(created);
  } catch (e) {
    if (e?.code === 11000 && e?.keyPattern?.slug) {
      return res.status(409).json({ message: "Slug already exists." });
    }
    console.error(e);
    return res.status(500).json({ message: "Failed to create UI project." });
  }
};

export const updateUIProject = async (req, res) => {
  try {
    const { id } = req.params;

    const current = await UIProject.findById(id);
    if (!current)
      return res.status(404).json({ message: "UI project not found." });

    const raw = isObj(req.body) ? req.body : {};

    const updates = {};

    if ("name" in raw) updates.name = safeStr(raw.name).trim();
    if ("slug" in raw) updates.slug = slugLower(raw.slug);
    if ("status" in raw)
      updates.status = oneOf(
        raw.status,
        ["draft", "published"],
        current.status,
      );
    if ("isDefault" in raw) updates.isDefault = !!raw.isDefault;

    if ("hero" in raw) updates.hero = normalizeHero(raw.hero);
    if ("writeUp" in raw) updates.writeUp = normalizeWriteUp(raw.writeUp);
    if ("images" in raw) updates.images = normalizeImages(raw.images);

    if ("mainImage" in raw)
      updates.mainImage = raw.mainImage ? safeStr(raw.mainImage).trim() : null;

    if ("showInWorkExperience" in raw)
      updates.showInWorkExperience = !!raw.showInWorkExperience;
    if ("workExperience" in raw)
      updates.workExperience = safeLines(raw.workExperience);
    if ("workExperienceMeta" in raw)
      updates.workExperienceMeta = normalizeWorkExperienceMeta(
        raw.workExperienceMeta,
      );

    if (updates.slug && updates.slug !== current.slug) {
      const exists = await UIProject.findOne({
        slug: updates.slug,
        _id: { $ne: id },
      });
      if (exists)
        return res.status(409).json({ message: "Slug already exists." });
    }

    const mergedForMain = {
      ...current.toObject(),
      ...updates,
      hero: updates.hero ?? current.hero,
      images: updates.images ?? current.images,
    };
    updates.mainImage = buildMainImage(mergedForMain);

    const msg = validateRequired({
      name: updates.name ?? current.name,
      slug: updates.slug ?? current.slug,
      hero: updates.hero ?? current.hero,
    });
    if (msg) return res.status(400).json({ message: msg });

    const saved = await UIProject.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (saved?.isDefault) {
      await UIProject.updateMany(
        { _id: { $ne: saved._id } },
        { $set: { isDefault: false } },
      );
    }

    return res.json(saved);
  } catch (e) {
    if (e?.code === 11000 && e?.keyPattern?.slug) {
      return res.status(409).json({ message: "Slug already exists." });
    }
    console.error(e);
    return res.status(500).json({ message: "Failed to update UI project." });
  }
};

export const deleteUIProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UIProject.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "UI project not found." });
    return res.json({ message: "UI project deleted." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to delete UI project." });
  }
};

export const uploadUIProjectImage = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image file provided." });

    if (!req.file.mimetype?.startsWith("image/")) {
      return res.status(400).json({ message: "Only image files are allowed." });
    }

    if (req.file.size > MAX_UI_IMAGE_BYTES) {
      return res.status(413).json({
        message: `Image too large. Max ${MAX_UI_IMAGE_MB}MB.`,
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: UI_PROJECT_FOLDER, resource_type: "image" },
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

export const deleteUIProjectImage = async (req, res) => {
  try {
    const { url } = req.body || {};
    if (!url)
      return res.status(400).json({ message: "Image URL is required." });

    const publicId = extractPublicIdFromUrl(url, UI_PROJECT_FOLDER);
    if (!publicId) {
      return res
        .status(400)
        .json({ message: "Could not derive Cloudinary public_id from URL." });
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(500).json({ message: "Failed to delete image." });
    }

    return res.json({
      message: "Image deleted.",
      publicId,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to delete image." });
  }
};

export const getUIProjectMainImages = async (_req, res) => {
  try {
    const projects = await UIProject.find(
      { status: "published" },
      { name: 1, slug: 1, "images.hero": 1, mainImage: 1, createdAt: 1 },
    ).sort({ createdAt: -1 });

    const payload = projects.map((p) => ({
      id: p._id,
      name: p.name,
      slug: p.slug,
      mainImage: p.images?.hero || p.mainImage || null,
    }));

    return res.json(payload);
  } catch (err) {
    console.error("getUIProjectMainImages error:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch UI project images." });
  }
};

export const getWorkExperienceUIProjects = async (_req, res) => {
  try {
    const items = await UIProject.find({
      status: "published",
      showInWorkExperience: true,
      workExperience: { $exists: true, $not: { $size: 0 } },
    })
      .select(
        "name slug hero workExperience workExperienceMeta showInWorkExperience createdAt",
      )
      .sort({ "workExperienceMeta.startDate": -1, createdAt: -1 })
      .limit(20);

    return res.json(items);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Failed to load work experience UI projects" });
  }
};
