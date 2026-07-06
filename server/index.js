import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import journeyRoutes from "./routes/journeyRoutes.js";
import rateRoutes from "./routes/rateRoutes.js";
import uiProjectRoutes from "./routes/uiProjectRoutes.js";
import graphicProjectRoutes from "./routes/graphicProjectRoutes.js";
import questionnaireRoutes from "./routes/questionnaireRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import flyerRoutes from "./routes/flyerRoutes.js";

import { connectToDatabase } from "./db.js";

const app = express();
app.set("trust proxy", 1);

/* -------------------- CORS FIRST -------------------- */
const whitelist = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const allowedOrigins = new Set(whitelist);
allowedOrigins.add("https://rich-port.vercel.app"); // safety pin

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (/^http:\/\/localhost:\d+$/.test(origin)) return true;

  try {
    const u = new URL(origin);
    if (u.hostname === "rich-port.vercel.app" || u.hostname.endsWith("-rich-port.vercel.app")) return true;
    if (allowedOrigins.has(origin)) return true;
    return false;
  } catch {
    return false;
  }
}

const corsOptions = {
  origin(origin, cb) {
    if (isAllowedOrigin(origin)) return cb(null, true);
    return cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 204,
};

// Ensure caches don’t mix origins
app.use((req, res, next) => {
  res.setHeader("Vary", "Origin");
  next();
});

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

/* -------------------- debug (dev only) -------------------- */
if (process.env.NODE_ENV !== "production") {
  app.get("/__debug/db", (_req, res) => {
    const c = mongoose?.connection || {};
    res.json({ dbName: c.name, host: c.host, ok: c.readyState === 1 });
  });
}

/* -------------------- security / logs / parsing -------------------- */
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("dev"));
app.use(cookieParser());

const JSON_LIMIT = process.env.JSON_LIMIT || "2mb";
app.use(express.json({ limit: JSON_LIMIT }));
app.use(express.urlencoded({ extended: false, limit: JSON_LIMIT }));

/* -------------------- routes -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/ui-projects", uiProjectRoutes);
app.use("/api/journey", journeyRoutes);
app.use("/api/rates", rateRoutes);
app.use("/api/graphic-projects", graphicProjectRoutes);
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/flyer-requests", flyerRoutes);


app.get("/", (_req, res) => res.json({ status: "ok" }));

/* -------------------- errors -------------------- */
app.use((err, _req, res, next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({
      error:
        'Invalid JSON body. Send application/json like {"email":"you@example.com","password":"..."}',
    });
  }

  if (err?.type === "entity.too.large") {
    return res.status(413).json({
      error: `Request entity too large. Increase JSON_LIMIT (current: ${JSON_LIMIT}).`,
    });
  }

  if (err && /Not allowed by CORS/.test(err.message)) {
    return res.status(403).json({ error: err.message });
  }

  return next(err);
});

app.use(express.static("client/dist"));
app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

/* -------------------- boot -------------------- */
const port = process.env.PORT || 4000;

try {
  await connectToDatabase(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Server running on :${port}`));
} catch (err) {
  console.error("DB error", err);
  process.exit(1);
}
