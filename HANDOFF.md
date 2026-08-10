# HANDOFF.md

Complete handoff document for the RichPort codebase. Written for a designer inheriting the project.

---

## 1. PROJECT OVERVIEW

### What this is

**RichPort** is a personal portfolio website. It showcases four categories of work:
- **Projects** — brand/identity case studies with full write-ups
- **UI/UX Projects** — product design work with personas, flows, and detailed write-ups
- **Graphic Design** — image-heavy gallery projects
- **Rate Details** — service pricing tiers with an enquiry form

There is also an admin dashboard (password-protected) for creating, editing, and deleting all content without touching code.

### Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Routing | React Router v7 |
| Backend framework | Express 5 |
| Database | MongoDB (via Mongoose 9) |
| Authentication | JWT (stored in localStorage + httpOnly cookie) |
| Image storage | Cloudinary |
| Client hosting | Vercel (`richardenoch.vercel.app`) |
| Server hosting | AWS ECS Express Mode, Fargate, eu-west-3 (`https://ri-b99dc6d19c814e1b834b686310f73be9.ecs.eu-west-3.on.aws`) |

### Repo structure

```
richPort-main/
├── client/           # React/Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json
├── server/           # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── cloudinary.js
│   ├── db.js
│   ├── index.js
│   └── package.json
├── .claude/          # Claude Code local settings
│   └── settings.local.json
├── CLAUDE.md
└── HANDOFF.md
```

---

## 2. CLIENT (frontend)

### Framework + build tool

**package.json** (abridged):
```json
{
  "name": "client",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.23.25",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.6"
  }
}
```

**vite.config.js**:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

No proxy is configured. All API calls go directly to the URL set in `VITE_AUTH_ENDPOINT`.

### Routing model

Full router config from `client/src/main.jsx` (current as of May 2026):

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },

      // Hardcoded brand identity case studies (MUST come before :slug catch-all)
      { path: "projects/niqs", element: <NIQSProject /> },
      { path: "projects/tabstudio", element: <TabStudioProject /> },
      { path: "projects/verde-luxe", element: <VerdeLuxeProject /> },
      { path: "projects/cleanstead", element: <CleansteadProject /> },
      { path: "projects/book-rion", element: <BookRionProject /> },

      { path: "projects/:slug", element: <ProjectPage /> },   // dynamic catch-all
      { path: "graphic-design", element: <GraphicDesignPage /> },
      { path: "adlm-studio-designs", element: <ADLMStudioPage /> },
      { path: "whitespace-designs", element: <WhitespacePage /> },
      { path: "ydpay-designs", element: <YDpayDesignPage /> },
      { path: "website-design", element: <WebsiteDesignPage /> },
      { path: "presentation-design", element: <PresentationDesignPage /> },
      { path: "rate-details", element: <RateDetails /> },
      { path: "contact", element: <Contact /> },

      // Hardcoded UI/UX case studies (MUST come before :slug catch-all)
      { path: "ui-projects/ydpay-mobile-redesign", element: <YDpayPage /> },
      { path: "ui-projects/savedup", element: <SavedupProject /> },
      { path: "ui-projects/snotes", element: <SnotesProject /> },
      { path: "ui-projects/quiv", element: <QuivProject /> },
      { path: "ui-projects", element: <UIProjectPage /> },
      { path: "ui-projects/:slug", element: <UIProjectPage /> },

      // redirects for old URLs
      { path: "ui-project", element: <Navigate to="/ui-projects" replace /> },
      { path: "ui-project/:slug", element: <RedirectWithSlug basePath="/ui-projects" /> },

      { path: "admin-auth", element: <AdminAuthPage /> },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },

      // 404 catch-all
      {
        path: "*",
        element: (
          <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-2 text-neutral-400">Page not found</p>
            <a href="/" className="mt-4 text-lime-400 hover:underline">Go home</a>
          </div>
        ),
      },
    ],
  },
]);
```

**CRITICAL:** Specific hardcoded routes must come BEFORE their dynamic `:slug` catch-alls. Route order matters in React Router v7.

`App.jsx` wraps all routes in an `<AnimatePresence>` with Framer Motion page transitions (opacity + blur + slide). `<Nav />` and `<Footer />` are always visible.

### Folder structure under `src/`

```
src/
├── api/              # HTTP client wrappers for each data type
├── assets/           # Static images, icons, gallery images
├── components/       # Reusable UI components, grouped by feature
├── context/          # AuthContext — the only global state store
├── pages/            # Top-level page components used by the router
├── App.jsx           # Layout shell (Nav + Footer + Outlet + page transitions)
├── main.jsx          # Router config + React root mount
└── index.css         # Tailwind imports
```

### Page components

| File | What it renders |
|---|---|
| `pages/Home.jsx` | Landing page — hero, work grid, services, design process |
| `pages/About.jsx` | About page — bio, tools, journey timeline, work experience |
| `pages/Projects.jsx` | Grid of brand/identity case study cards |
| `pages/GraphicDesignPage.jsx` | Full-width graphic design gallery page |
| `pages/RateDetails.jsx` | Pricing tiers with plans, deliverables, and enquiry form |
| `pages/admin/AdminDashboard.jsx` | Protected admin panel with tabbed content editors |
| `pages/admin/AdminAuthPage.jsx` | Login form for admin access |
| `components/ProjectPage.jsx` | Single brand project case study (loaded by slug) |
| `components/UIProjectPage.jsx` | Single UI/UX project page (loaded by slug) |

### Reusable components

**Home/**
| File | Purpose |
|---|---|
| `Hero.jsx` | Main landing hero section |
| `ProjectGrid.jsx` | Grid of project cards on home page |
| `Services.jsx` | Services offered section |
| `DesignProcess.jsx` | Design process steps |
| `WorkExp.jsx` | Work experience section on home |
| `AboutMe.jsx` | Short about blurb on home |
| `BuildSection.jsx` | "What I build" section |
| `Partners.jsx` | Partner/client logos |
| `TransImg.jsx` / `WorkImg.jsx` | Image display utilities |

**About/**
| File | Purpose |
|---|---|
| `AboutHero.jsx` | Hero for the About page |
| `BriefInfo.jsx` | Short info block |
| `Journey.jsx` | Animated timeline of career milestones |
| `ShortIntro.jsx` | Short intro text |
| `Tools.jsx` | Tools/software grid |
| `WorkExp.jsx` | Work experience list on About page |

**Project/** & **ProjectPage/**
| File | Purpose |
|---|---|
| `ProjectHero.jsx` | Hero for a project detail page |
| `ProjectDetailsHero.jsx` | Detailed project metadata header |
| `ProjectWriteUp.jsx` | Case study text sections |
| `MainImg.jsx` | Primary project image |
| `DiscoverImg.jsx` / `ProjectImg.jsx` | In-body project images |
| `ProjectConc.jsx` | Conclusion section with CTA |
| `OtherProj.jsx` | Related projects at bottom |

**UIProjectPage/**
| File | Purpose |
|---|---|
| `ProjectHero.jsx` | Hero with role, timeline, date |
| `HeroImg.jsx` / `MainImg.jsx` / `FeatureImg.jsx` | Various image sections |
| `StrategyImg.jsx` / `FlowImg.jsx` / `UserImg.jsx` | Strategy/flow/user image sections |
| `ImgGal.jsx` | Image gallery |
| `WriteUp.jsx` | Full write-up renderer (blocks + personas) |

**GraphicDesignPage/**
| File | Purpose |
|---|---|
| `GraphicHero.jsx` | Hero for graphic design page |
| `GraphicOverview.jsx` | Overview text |
| `GraphicGallery.jsx` | Masonry/grid image gallery |

**Rate/**
| File | Purpose |
|---|---|
| `RateHero.jsx` | Hero section |
| `BrandIdentity.jsx` | Plan cards display |
| `PlanSelection.jsx` | Plan selector UI |
| `PlanDetails.jsx` | Deliverables table |
| `RateForm.jsx` | Contact/enquiry form |
| `RateCTA.jsx` | Call-to-action button |

**Admin/**
| File | Purpose |
|---|---|
| `ProjectsTab.jsx` | CRUD for brand projects |
| `UIProjectsTab.jsx` | CRUD for UI/UX projects |
| `BrandProjectsTab.jsx` | Alternate brand projects tab |
| `GraphicProjectsTab.jsx` | CRUD for graphic design projects |
| `JourneyTab.jsx` | CRUD for journey/timeline entries |
| `RatesTab.jsx` | CRUD for rate categories and plans |
| `CustomersTab.jsx` | View rate enquiry submissions |
| `PersonasEditor.jsx` | Editor for user persona cards |
| `WriteUpBlocksEditor.jsx` | Editor for write-up content blocks |

**Common/**
| File | Purpose |
|---|---|
| `ScrollToTop.jsx` | Scrolls to top on route change |
| `FontScaler.jsx` | Handles responsive font scaling |
| `SafeImage.jsx` | Image with fallback |
| `SectionReveal.jsx` | Scroll-triggered reveal animation |
| `TypingText.jsx` | Animated typing text effect |

**Root level:**
- `Nav.jsx` — top navigation bar
- `Footer.jsx` — site footer
- `components/auth/ProtectedRoute.jsx` — redirects unauthenticated users away from `/admin`

### State management

**Only React Context API** — no Redux, no Zustand.

The single global store is `context/AuthContext.jsx`. It provides:
- `user` — current user object (`{ id, email, userType }`)
- `isAuthenticated` — boolean
- `isLoading` — true while verifying token on app init
- `initialized` — true once the init check completes
- `authFetch(url, options)` — fetch wrapper that auto-injects the JWT Bearer token
- `authJson(url, options)` — same but auto-parses JSON response
- `signin({ email, password })` — logs in and stores token
- `signout()` — clears token and user

Token is persisted in `localStorage` under the key `"token"`. On app init, the context reads it, checks JWT expiry locally, then verifies with `GET /api/auth/me`. If the server returns 401 the user is logged out; if it returns a network error (cold-start on Render), the cached session is preserved.

All child components access auth via:
```js
import { useAuth } from "../context/AuthContext";
const { user, isAuthenticated, authJson } = useAuth();
```

### API client setup

**`client/src/api/http.js`** — the base fetch wrapper used by all API modules:

```js
const RAW_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";
const API_BASE = String(RAW_BASE).replace(/\/+$/, "");

export const buildUrl = (path) => {
  const p = String(path || "");
  const cleanPath = p.startsWith("/") ? p : `/${p}`;
  if (!API_BASE) return cleanPath;
  if (API_BASE.endsWith("/api") && cleanPath.startsWith("/api/")) {
    return `${API_BASE}${cleanPath.slice(4)}`;
  }
  return `${API_BASE}${cleanPath}`;
};

function getToken() {
  try {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken") ||
      ""
    );
  } catch { return ""; }
}

export async function fetchJson(path, options = {}) {
  const url = buildUrl(path);
  const method = (options.method || "GET").toUpperCase();
  const hasBody = options.body != null && method !== "GET" && method !== "HEAD";
  const headers = { ...(options.headers || {}) };

  const token = getToken();
  if (token && !headers.Authorization && !headers.authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (hasBody && !isFormData(options.body) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, { credentials: "include", ...options, headers });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const msg = data?.message || data?.error || `Request failed: ${res.status} ${res.statusText}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}
```

Entity-specific API modules wrap `fetchJson`:
- `api/graphicProjectsApi.js` — graphic project CRUD + Cloudinary upload/delete
- `api/uiProjects.js` — UI project read endpoints (public only; admin uses `authJson` from context directly)

### Design system — Tailwind config

**`client/tailwind.config.js`**:
```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**There are no custom tokens.** The design is implemented entirely with Tailwind utility classes and hardcoded values in JSX. Key recurring values used directly in components:
- Background: `bg-[#0B0B0B]`, `bg-[#050505]`
- Accent: `text-lime-400`, `border-lime-400`
- Text: `text-white`, `text-neutral-400`, `text-neutral-500`
- Font: system sans (no custom font configured)

### Client environment variables

```
VITE_AUTH_ENDPOINT=https://ri-b99dc6d19c814e1b834b686310f73be9.ecs.eu-west-3.on.aws
```

This is the only env var the client needs — `VITE_API_BASE` is no longer read anywhere (the unused `src/config.js` that referenced it has been removed). Set the value above in Vercel for production; note that `VITE_*` vars are inlined at build time, so changing it requires a redeploy to take effect.

Locally, `client/.env` points at `http://localhost:4000` so dev work never writes to the production database. Point it at `https://ri-b99dc6d19c814e1b834b686310f73be9.ecs.eu-west-3.on.aws` only when you deliberately want to work against live data.

---

## 3. SERVER (backend)

### Framework

Express 5 (`"express": "^5.2.1"`). ES modules (`"type": "module"`).

### Entry point — `server/index.js` (full)

```js
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

import { connectToDatabase } from "./db.js";

const app = express();
app.set("trust proxy", 1);

/* -------------------- CORS -------------------- */
const whitelist = (process.env.CORS_ORIGINS || "")
  .split(",").map((s) => s.trim()).filter(Boolean);

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
  } catch { return false; }
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

app.use((req, res, next) => { res.setHeader("Vary", "Origin"); next(); });
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

app.get("/", (_req, res) => res.json({ status: "ok" }));

/* -------------------- errors -------------------- */
app.use((err, _req, res, next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ error: `Request entity too large. Current limit: ${JSON_LIMIT}` });
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
```

### Database — `server/db.js` (full)

```js
import mongoose from "mongoose";

let connectPromise = null;

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose;
  if (connectPromise) return connectPromise;

  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) throw new Error("MONGO_URI is not defined in environment variables");

  mongoose.set("strictQuery", true);

  connectPromise = mongoose
    .connect(mongoURI, { serverSelectionTimeoutMS: 5000 })
    .then((m) => {
      console.log("Connected to MongoDB:", m.connection.name);
      return m;
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      connectPromise = null;
      throw err;
    });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
    connectPromise = null;
  });

  return connectPromise;
}
```

The database name is taken from the URI path — it is not hardcoded anywhere in the application code.

### Cloudinary integration — `server/cloudinary.js` (full)

```js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

Images are uploaded using `multer` (in-memory buffer) + `streamifier` to pipe the buffer into `cloudinary.uploader.upload_stream`. All images are stored under the folder `richard_portfolio/` with subfolders per content type:
- `richard_portfolio/projects`
- `richard_portfolio/ui-projects`
- `richard_portfolio/graphic-projects`
- `richard_portfolio/journey`

### Route endpoints

**`/api/auth`** (`authRoutes.js`)
| Method | Path | Auth required | What it does |
|---|---|---|---|
| POST | `/api/auth/signup` | ✅ Admin only | Create a new admin user |
| POST | `/api/auth/signin` | ❌ | Log in; returns JWT + sets cookie |
| POST | `/api/auth/signout` | ❌ | Clears the auth cookie |
| GET | `/api/auth/me` | ✅ | Returns the current user object |

> **Note:** `signup` requires an existing admin JWT. You cannot self-register without already being logged in as admin.

**`/api/projects`** (`projectRoutes.js`)
| Method | Path | Auth | What it does |
|---|---|---|---|
| GET | `/api/projects` | ❌ | All projects |
| GET | `/api/projects/main-images` | ❌ | Name + slug + main image only (for grids) |
| GET | `/api/projects/slug/:slug` | ❌ | Single project by slug |
| GET | `/api/projects/admin` | ✅ Admin | All projects (admin view) |
| POST | `/api/projects/admin` | ✅ Admin | Create a project |
| PUT | `/api/projects/admin/:id` | ✅ Admin | Update a project |
| POST | `/api/projects/admin/upload` | ✅ Admin | Upload image to Cloudinary |
| POST | `/api/projects/admin/delete-image` | ✅ Admin | Delete image from Cloudinary |

**`/api/ui-projects`** (`uiProjectRoutes.js`)
| Method | Path | Auth | What it does |
|---|---|---|---|
| GET | `/api/ui-projects` | ❌ | All published UI projects |
| GET | `/api/ui-projects/default` | ❌ | Project marked `isDefault: true` (or newest) |
| GET | `/api/ui-projects/slug/:slug` | ❌ | Single UI project by slug |
| GET | `/api/ui-projects/main-images` | ❌ | Name + slug + hero image only |
| GET | `/api/ui-projects/work-experience` | ❌ | Projects with `showInWorkExperience: true` |
| GET | `/api/ui-projects/admin` | ✅ Admin | All UI projects (admin view) |
| POST | `/api/ui-projects/admin` | ✅ Admin | Create a UI project |
| PUT | `/api/ui-projects/admin/:id` | ✅ Admin | Update a UI project |
| DELETE | `/api/ui-projects/admin/:id` | ✅ Admin | Delete a UI project |
| POST | `/api/ui-projects/admin/upload` | ✅ Admin | Upload image |
| POST | `/api/ui-projects/admin/delete-image` | ✅ Admin | Delete image |

**`/api/graphic-projects`** (`graphicProjectRoutes.js`)
| Method | Path | Auth | What it does |
|---|---|---|---|
| GET | `/api/graphic-projects` | ❌ | All published graphic projects |
| GET | `/api/graphic-projects/:id` | ❌ | Single graphic project by Mongo ID |
| GET | `/api/graphic-projects/admin/all` | ✅ Admin | All (including drafts) |
| POST | `/api/graphic-projects/admin` | ✅ Admin | Create |
| PUT | `/api/graphic-projects/admin/:id` | ✅ Admin | Update |
| DELETE | `/api/graphic-projects/admin/:id` | ✅ Admin | Delete (also cleans up Cloudinary) |
| POST | `/api/graphic-projects/admin/upload` | ✅ Admin | Upload image |
| POST | `/api/graphic-projects/admin/delete-image` | ✅ Admin | Delete image |

**`/api/journey`** (`journeyRoutes.js`)
| Method | Path | Auth | What it does |
|---|---|---|---|
| GET | `/api/journey` | ❌ | All journey entries, sorted by year desc |
| GET | `/api/journey/admin` | ✅ Admin | Same, behind auth |
| POST | `/api/journey/admin` | ✅ Admin | Create entry |
| PUT | `/api/journey/admin/:id` | ✅ Admin | Update entry |
| DELETE | `/api/journey/admin/:id` | ✅ Admin | Delete entry |
| POST | `/api/journey/admin/upload` | ✅ Admin | Upload image |
| POST | `/api/journey/admin/delete-image` | ✅ Admin | Delete image |

**`/api/rates`** (`rateRoutes.js`)
| Method | Path | Auth | What it does |
|---|---|---|---|
| GET | `/api/rates` | ❌ | All rate categories |
| GET | `/api/rates/category/:id` | ❌ | Single category by logical id (e.g. `brand-identity`) |
| GET | `/api/rates/admin` | ✅ Admin | Same, behind auth |
| POST | `/api/rates/admin` | ✅ Admin | Create rate category |
| PUT | `/api/rates/admin/:id` | ✅ Admin | Update by Mongo ObjectId |
| DELETE | `/api/rates/admin/:id` | ✅ Admin | Delete by Mongo ObjectId |
| POST | `/api/rates/enquiries` | ❌ | Submit contact enquiry from rate form |
| GET | `/api/rates/enquiries` | ✅ Admin | List all enquiry submissions |

### Controllers

| File | What it handles |
|---|---|
| `authController.js` | Signup, signin, signout, session check (`/me`) |
| `projectController.js` | Brand project CRUD, Cloudinary image upload/delete |
| `uiProjectController.js` | UI/UX project CRUD, image upload/delete, work experience query |
| `graphicProjectController.js` | Graphic project CRUD, image upload/delete |
| `journeyController.js` | Timeline entry CRUD, image upload/delete |
| `rateController.js` | Rate category CRUD, enquiry submission and listing |

### Models — schema definitions

**`server/models/User.js`**
```js
const UserSchema = new mongoose.Schema({
  email:        { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: String,
  userType:     { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true });
```

**`server/models/ProjectModel.js`**
```js
// Sub-schemas
const HeroMetaSchema = {
  categories: [String],
  deliverables: String,
  timeline: String,
  teamInitials: [String],
};

const CaseStudyStepSchema = {
  id: String,
  pillLabel: String,
  title: String,
  body: String,
  showOnMain: { type: Boolean, default: true },
};

const ImagesSchema = {
  main: String,       // primary project image
  mid: String,        // mid-page image
  conclusion: String, // conclusion section image
  inline: String,     // inline body image
  gallery: [String],  // gallery array
};

// Main schema
const ProjectSchema = {
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  url: String,
  description: String,
  tags: [String],
  categories: [String],
  showInWorkExperience: { type: Boolean, default: true },
  showOnProjectsPage:   { type: Boolean, default: true },
  workExperience: [String],
  myRole: String,
  clientName: String,
  heroMeta: HeroMetaSchema,
  projectStartDate: Date,
  projectEndDate: Date,
  caseStudySteps: [CaseStudyStepSchema],
  caseStudyNotes: String,
  conclusionTitle: String,
  conclusionBody: String,
  conclusionCtaLabel: String,
  conclusionCtaUrl: String,
  images: ImagesSchema,
  // backward-compat aliases
  pageImg: String,
  galleryImages: [String],
  caseStudyImage: String,
};
```

**`server/models/UIProjectModel.js`** (simplified)
```js
// Key fields
const UIProjectSchema = {
  projectType: { type: String, default: "uiux" },
  name:   { type: String, required: true },
  slug:   { type: String, required: true, unique: true, lowercase: true },
  isDefault: Boolean,
  status: { type: String, enum: ["draft", "published"], default: "published" },

  hero: {
    title: String,
    subtitle: String,
    dateLabel: String,
    roleTitle: String,
    roleDescription: String,
    roleBullets: [String],
    timelineLabel: String,
  },

  writeUp: {
    blocks: [{
      id: String,
      enabled: Boolean,
      headlineEnabled: Boolean,
      bodyEnabled: Boolean,
      imagesEnabled: Boolean,
      placement: { enum: ["beforePersonas", "afterPersonas"] },
      headline: String,
      body: String,
      images: [String],
      layout: { enum: ["wide", "half", "grid"] },
      textSide: { enum: ["left", "right"] },
      wideVariant: { enum: ["full", "narrow"] },
    }],
    idealUsers: {
      cards: [{
        enabled: Boolean,
        name: String,
        subtitle: String,
        about: String,
        img: String,
        pos: String,
      }],
    },
    // ...many more structured fields for overview, problem, research, etc.
  },

  images: { hero: String, gallery: [String] },
  mainImage: String,
  showInWorkExperience: Boolean,
  workExperience: [String],
  workExperienceMeta: { clientName: String, myRole: String, startDate: Date, endDate: Date },
};
```

**`server/models/GraphicProjectModel.js`**
```js
const CloudImageSchema = {
  url:      { type: String, required: true },
  publicId: { type: String, required: true },
  width:    Number,
  height:   Number,
};

const GraphicProjectSchema = {
  projectType: { type: String, default: "graphic" },
  projectName: { type: String, required: true },
  subtitle:    String,
  status:      { type: String, enum: ["draft", "published"], default: "published" },
  headline: {
    enabled: Boolean,
    text: String,
    image: CloudImageSchema,
  },
  body: {
    enabled: Boolean,
    text: String,
  },
  otherImages: {    // MINIMUM 16, MAXIMUM 50 — validated server-side
    type: [CloudImageSchema],
    validate: (arr) => arr.length >= 16 && arr.length <= 50,
  },
  mainImage: String,
};
```

**`server/models/JourneyModel.js`**
```js
const JourneySchema = {
  year:        { type: String, required: true },
  title:       { type: String, required: true },
  description: [String],   // array of paragraphs
  imageUrl:    String,
};
```

**`server/models/RateModel.js`**
```js
const PlanSchema = {
  id: String, name: String, price: Number, currency: String,
  description: String, isFeatured: Boolean,
};

const DeliverableSchema = {
  id: String, label: String,
  mode: { enum: ["boolean", "text"] },
  perPlan: { type: Map, of: Schema.Types.Mixed },
};

const RateCategorySchema = {
  id:           { type: String, required: true, unique: true, lowercase: true },
  label:        { type: String, required: true },
  heading:      { type: String, required: true },
  description:  String,
  tags:         [String],
  plans:        [PlanSchema],
  deliverables: [DeliverableSchema],
};
// toJSON adds: mongoId (alias for _id)
```

**`server/models/RateEnquiry.js`**
```js
const RateEnquirySchema = {
  fullName:    { type: String, required: true },
  email:       { type: String, required: true, lowercase: true },
  services:    [String],
  budget:      { type: Number, required: true },
  message:     String,
  submittedAt: { type: Date, required: true },
};
```

**`server/models/EnquiriesModel.js`**
```js
// Identical shape to RateEnquiry — marked in code comments as "unused — kept for reference"
// The active model is RateEnquiry.js. This file can be deleted.
```

### Middleware

**`server/middleware/authMiddleware.js`**

```js
export const requireAuth = (req, res, next) => {
  // Reads token from Authorization: Bearer <token> header, OR req.cookies.token
  // Verifies with JWT_SECRET
  // Attaches decoded payload to req.user = { userId, email, userType }
  // Returns 401 if missing/invalid/expired
};

export const requireAdmin = (req, res, next) => {
  // Checks req.user.userType === "admin"
  // Returns 403 if not admin
};
```

### Server environment variables (keys only)

```
MONGO_URI
JWT_SECRET
JWT_EXPIRES_IN          # optional, default "48h"
NODE_ENV                # "production" or "development"
PORT                    # optional, default 4000
CORS_ORIGINS            # comma-separated list of allowed origins
JSON_LIMIT              # optional, default "2mb"
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
GFX_IMAGE_MAX_MB        # optional, default 10
UI_IMAGE_MAX_MB         # optional, default 10
```

---

## 4. HOW THE TWO CONNECT

### In development

There is **no Vite proxy**. The client talks directly to the server via the `VITE_AUTH_ENDPOINT` environment variable.

The current `client/.env` is:
```
VITE_AUTH_ENDPOINT=http://localhost:4000
```

This points local dev at a **local** server, so nothing you create or delete touches live data. To work against the live API instead, change it to:
```
VITE_AUTH_ENDPOINT=https://ri-b99dc6d19c814e1b834b686310f73be9.ecs.eu-west-3.on.aws
```
Be aware that this writes to the production database.

The server's CORS config allows any `localhost:<port>` origin, so this works without changes.

### In production

The client (Vercel) and server (Render) are **separate deployments on separate domains**:
- Client: `https://richardenoch.vercel.app`
- Server: `https://ri-b99dc6d19c814e1b834b686310f73be9.ecs.eu-west-3.on.aws`

The client talks to the server via absolute URL. There are no rewrites or proxies in production — the browser makes cross-origin requests, and the server's CORS whitelist allows `richardenoch.vercel.app` (plus its `*-richardenoch.vercel.app` preview deploys) and the legacy `rich-port.vercel.app`.

`richardenoch.com` and `www.richardenoch.com` are **already whitelisted** in `server/index.js` ahead of the domain being registered, so no server change is needed at cutover — only `VITE_AUTH_ENDPOINT` on Vercel and the custom domain on Render.

The `client/vercel.json` only handles client-side routing (SPA fallback):
```json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build", "config": { "distDir": "dist" } }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### Auth model

1. User visits `/admin-auth` and submits email + password
2. `POST /api/auth/signin` returns a JWT token in the response body and also sets an httpOnly `token` cookie
3. Client stores the token in `localStorage` under the key `"token"`
4. All admin API calls send it as `Authorization: Bearer <token>`
5. Server middleware (`requireAuth`) accepts the token from either the header or the cookie
6. `requireAdmin` additionally checks `userType === "admin"` on the decoded payload
7. Tokens expire after 48 hours
8. On app init, the client checks expiry locally and verifies with `GET /api/auth/me`

**Creating admin accounts:** The `POST /api/auth/signup` endpoint requires an existing valid admin JWT. There is no open registration. To create the first admin account you would need to temporarily remove the `requireAuth, requireAdmin` middleware from that route, create the account, then put it back — or insert a user directly into MongoDB.

---

## 5. DEPLOYMENT

### `client/vercel.json` (full)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### Where things are deployed

| Part | Platform | URL |
|---|---|---|
| Frontend | Vercel | `https://richardenoch.vercel.app` |
| Backend | AWS ECS Express Mode (Fargate, eu-west-3) | `https://ri-b99dc6d19c814e1b834b686310f73be9.ecs.eu-west-3.on.aws` |
| Database | MongoDB Atlas (inferred from MONGO_URI) | — |
| Images | Cloudinary | folder: `richard_portfolio/` |

The Vercel project deploys from the `client/` subfolder. The Render service runs `node index.js` (or `npm start`) from the `server/` subfolder.

### Debug endpoint

In non-production environments, `GET https://ri-b99dc6d19c814e1b834b686310f73be9.ecs.eu-west-3.on.aws/__debug/db` returns:
```json
{ "dbName": "<db name>", "host": "<host>", "ok": true }
```

---

## 6. WHAT'S DONE vs. WHAT'S MISSING

### What's fully working (as of May 2026)

- Home page: hero, AboutMe (updated bio), ProjectGrid with View More pagination, all sections
- About, Contact, Rate Details pages
- Preloader: RE monogram + lime progress bar, gated by `window.onload` (MIN 1.8s / MAX 3.2s)
- **Hardcoded brand identity case studies:** NIQS, TabStudio, VerdeLuxe, Cleanstead, BookRion
- **Hardcoded UI/UX case studies:** YDpay (redesign), Savedup (retrospective), Quiv, Snotes (concept — all images are intentional placeholders)
- Graphic design pages: ADLMStudio, Whitespace, YDpay Designs, Website Design, Presentation Design
- Footer: all links enabled
- ProjectGrid: portrait `aspect-[4/5]` on mobile for both grid cards and DiscoverImg stacked gallery
- Admin dashboard: CRUD for all content types, Cloudinary upload/delete
- JWT auth with cookie + localStorage, rate enquiry form
- CORS, Helmet, Morgan, error handling configured

### Placeholder pages (intentional — Figma mockups pending)

| Page | What's missing |
|---|---|
| `SnotesProject.jsx` | All 13 images — Figma mockups not yet created |
| `QuivProject.jsx` | 9 screenshot slots — capture from `extra/Quiv/Quiv_Measure_v4.html` |
| `NIQSProject.jsx` | Brand guideline spread screenshots — capture from `extra/NIQS Brand Guideline.html` |

### Not yet built

- NIQS page structural rework (strategy documented in `SESSION_PROGRESS.html`)
- About page hero headline review
- "I built this portfolio" credit in footer or About page
- Load time optimisations: `loading="lazy"` sweep, Cloudinary `q_auto,f_auto` (route-level `React.lazy()` is now done: every page except `Home` is a separate chunk, loaded through the `Suspense` boundary in `App.jsx`)
- LinkedIn bio and CV summary line (copy direction is confirmed, just not written)

### Technical debt

- **`server/models/EnquiriesModel.js`** — unused, duplicate of `RateEnquiry.js`. Safe to delete.
- **Server tests / Client tests** — none exist
- **No seed scripts** — all content entered via admin dashboard
- **Console.log artifacts** in admin tab components (see section 8 below)

### Console.log statements left in code (debugging artifacts)

These are in the admin tab components and should be cleaned up before production:
- `client/src/components/Admin/BrandProjectsTab.jsx` — logs project payloads on submit
- `client/src/components/Admin/JourneyTab.jsx` — logs journey payloads on submit
- `client/src/components/Admin/RatesTab.jsx` — logs rate payloads on submit
- `client/src/components/Admin/UIProjectsTab.jsx` — logs UI project payloads on submit
- `client/src/components/Rate/RateForm.jsx` — logs rate form submission payload

### No TODO or FIXME comments found in the codebase

---

## 7. DESIGN SYSTEM & WORKING CONVENTIONS

### Visual system

| Token | Value |
|---|---|
| Background (site) | `#0B0B0B` |
| Background (preloader) | `#050505` |
| Background (docs) | `#07090C` |
| Accent | lime-400 `#a3e635` |
| Font | Outfit (Google Fonts), weights 300–800 |
| Border base | `rgba(255,255,255,0.07)` |
| Border lime | `rgba(163,230,53,0.25)` |

**No custom Tailwind extensions** — all values are arbitrary classes directly in JSX.

### Case study page accent constants

Each hardcoded case study page declares its accent at the top:
- YDpay, Savedup, Snotes: `const GR = "#a3e635"` (lime)
- Quiv: `const QB = "#3B8EF0"` (Quiv Blue)
- NIQS: `const NAVY = "#000066"`, `const GOLD = "#D9B650"`

### Case study page pattern (UI/UX pages)

All UI/UX case studies (Savedup, YDpay, Snotes, Quiv) follow the same structure:
- Animation primitives: `FadeUp`, `SlideIn`, `StaggerGrid`/`StaggerItem`
- Section components: `SLabel`, `H2`, `TiltFrame`, `PersonaSection`
- Image placeholders: `bg-white/[0.02]` dark block with centered muted caption text
- Footer: `<OtherProj currentSlug="..." currentKind="ui" />` then `<BuildSection />`

### Key components

| Component | Location | Notes |
|---|---|---|
| `ProjectGrid` | `components/Home/ProjectGrid.jsx` | Three static arrays merged; thumbnail SVGs in `public/` |
| `DiscoverImg` | `components/ProjectPage/DiscoverImg.jsx` | Stacked scroll gallery; `aspect-[4/5] sm:aspect-video` |
| `OtherProj` | `components/ProjectPage/OtherProj.jsx` | Always pass exact `currentSlug` string |
| `BuildSection` | `components/ProjectPage/BuildSection.jsx` | Footer of every case study |
| `Preloader` | `components/common/Preloader.jsx` | RE monogram + lime progress bar |

### Richard's working preferences (Claude Code)

- No `font-black` — use `font-bold` on all headlines
- Body text minimum 14px (13px reads tiny against bold headlines)
- No inline SVG data URIs in JS — put SVGs in `client/public/` as files
- No trailing summaries after edits — Richard can read the diff
- Concise responses — no preamble
- Always Read a file before Edit
- Do not commit unless explicitly asked
- Image placeholders are intentional — do not ask about them

### Positioning / copy direction

Richard is a **visual designer and product thinker** — 6 years across brand identity, UI/UX, and construction technology. Trained Quantity Surveyor turned designer. This QS-to-design crossover is the core differentiator.

**No longer:** "multidisciplinary designer"
**Now:** "visual designer and product thinker"

---

## 9. RUN COMMANDS

### Install

Run in two separate terminals (they are separate Node projects with separate `node_modules`):

```bash
# Terminal 1 — client
cd client
npm install

# Terminal 2 — server
cd server
npm install
```

### Run dev

```bash
# Terminal 1 — client (http://localhost:5173)
cd client
npm run dev

# Terminal 2 — server (http://localhost:4000)
cd server
npm run dev
```

Remember to set `VITE_AUTH_ENDPOINT=http://localhost:4000` in `client/.env` if you want dev to use the local server instead of production.

### Build for production

```bash
cd client
npm run build
# Output goes to client/dist/
```

### Seed / migration scripts

None exist. The database starts empty; all content is added through the admin dashboard at `/admin`.

---

## 8. DESIGN WORK LOG (session history)

This section tracks UI/design edits made across coding sessions. For full detail on May 2026 changes, see `SESSION_PROGRESS.html` in the project root.

### Session — May 2026

**Critical CSS bug fixed (affects all sticky/fixed positioning site-wide)**
- Root cause: `html { overflow-x: clip }` in `client/src/index.css` caused both axes to compute as `clip`, making `body` the scroll container. This broke `window.scrollY`, `position: sticky`, and `position: fixed` throughout the site.
- Fix: moved `overflow-x: clip` to `#root` (a plain div) which does NOT create a scroll container.
- File: `client/src/index.css`

**App.jsx page transitions**
- Removed `y` translate from page transition (transforms break sticky children).
- Added `onAnimationComplete` callback to clear `filter` from the motion.div after the enter animation completes. Reason: `filter: blur(0px)` in the `animate` state creates a containing block for `position: fixed` children, causing them to be positioned relative to the motion.div instead of the viewport.
- Note: with inline animations (not variants), `onAnimationComplete` does NOT receive a string — the `def === "animate"` guard never fires. The callback is unconditional.
- File: `client/src/App.jsx`

**Testimonials section (Home)**
- Implemented scroll-locked stacking cards animation. A 320vh outer section holds a `sticky top-0 h-screen` inner div. Five cards scale in from 0.12 to 1.0 as user scrolls. Section releases after all 5 cards have stacked.
- Uses Framer Motion `useScroll` with `target: wrapperRef, offset: ["start start", "end end"]`.
- CARD_RANGES end exactly at 1.0 — no dead scroll at the end.
- File: `client/src/components/Home/Testimonials.jsx`

**Nav — Projects dropdown**
- Added hover dropdown on desktop "Projects" nav link showing 4 category options.
- Added expandable sub-menu on mobile.
- Clicking a category navigates to `/projects?tab=<category>` using `encodeURIComponent`.
- File: `client/src/components/Nav.jsx`

**ProjectGrid — URL tab filtering**
- Reads `?tab=` search param on mount to set the initial active tab.
- Allows Nav dropdown to deep-link directly to a filtered project category.
- File: `client/src/components/Home/ProjectGrid.jsx`

**DesignProcess spacing fix**
- `py-2 lg:py-4` was critically too small — caused a blank gap between PickACard and AboutMe.
- Fixed to `py-16 lg:py-24`.
- File: `client/src/components/Home/DesignProcess.jsx`

**WorkExp (Home) first-item gap fix**
- Stray `mt-7` on the company name `<h3>` created an unexpected top gap on the first entry.
- Removed the margin class.
- File: `client/src/components/Home/WorkExp.jsx`

### Session — May 2026 (continuation — new pages & fixes)

**New pages built:**
- `NIQSProject.jsx` — brand identity case study, Navy/Gold accent, 12-chapter grid, `/projects/niqs`
- `QuivProject.jsx` — UI/UX case study, Quiv Blue `#3B8EF0` accent, 9 screenshot placeholders, `/ui-projects/quiv`
- `SnotesProject.jsx` — concept-stage UI/UX case study, all 13 images are placeholders, `/ui-projects/snotes`

**Copy & content updates:**
- `AboutMe.jsx` — removed TypingText chain (caused 3s forced wait); replaced with FadeUp animations; new bio copy ("visual designer and product thinker")
- `SavedupProject.jsx` — retrospective reframe: badge "· Retrospective", "What I'd Build Today" section, fixed `currentSlug="savedup"` in OtherProj
- `YDpayPage.jsx` — My Role updated, Delivery card reframed to "Design Delivered" with partial implementation note
- `BookRionProject.jsx`, `VerdeLuxeProject.jsx`, `TabStudioProject.jsx`, `CleansteadProject.jsx` — deliverables and My Role updated

**ProjectGrid fixes:**
- Thumbnails extracted from inline data URIs to `client/public/` SVGs (bundle size reduction)
- Snotes re-added to grid
- NIQS added via new `STATIC_BRAND_PROJECTS` array
- View More pagination fixed (was navigating to `/projects` instead of `setVisibleCount + 4`)
- Card height: `h-auto md:h-[533px]` (was fixed `h-[533px]` — broke mobile)
- Mobile image aspect: `aspect-[4/5]`

**DiscoverImg fix:**
- `aspect-video` → `aspect-[4/5] sm:aspect-video` — stacked gallery images now portrait on mobile

**Preloader added:**
- `Preloader.jsx` — RE monogram + lime progress bar
- `App.jsx` — gated by `window.onload` with MIN_MS=1800, MAX_MS=3200

**Footer fix:**
- Presentation Design link enabled (`to: "/presentation-design"`)

### What still needs design review (as of May 2026)

**Home page** — these sections have not been reviewed or polished:
- `Hero.jsx`
- `Services.jsx`
- `Partners.jsx`
- `BuildSection.jsx`
- `PickACard.jsx`
- `AboutMe.jsx`

**About page** — none reviewed:
- `AboutHero.jsx`, `BriefInfo.jsx`, `Journey.jsx`, `ShortIntro.jsx`, `Tools.jsx`, `WorkExp.jsx`

**Individual project detail pages** — none reviewed:
- `ProjectPage.jsx` and all sub-components in `components/ProjectPage/`
- `UIProjectPage.jsx` and all sub-components in `components/UIProjectPage/`

**Graphic Design page** — not reviewed:
- `GraphicHero.jsx`, `GraphicOverview.jsx`, `GraphicGallery.jsx`

**Rate Details page** — not reviewed:
- `RateHero.jsx`, `BrandIdentity.jsx`, `PlanSelection.jsx`, `PlanDetails.jsx`, `RateForm.jsx`, `RateCTA.jsx`

**No contact page exists.** The "Contact" button in the Nav links to `/contact` but there is no route or component for it. Needs to be built from scratch.

**Footer** — not reviewed.

**SEO** — no page titles, meta descriptions, or Open Graph tags are set anywhere.

---

## 10. KNOWN GOTCHAS

1. **Check which API `client/.env` points at.** It now ships pointing at `http://localhost:4000`, so local dev is isolated from live data by default. If you repoint it at `https://ri-b99dc6d19c814e1b834b686310f73be9.ecs.eu-west-3.on.aws`, remember that anything you create or delete goes straight to the production database.

2. **Render cold starts.** Render's free tier spins down after inactivity. The first request after sleep takes 30–60 seconds. The `AuthContext` handles this gracefully (keeps the cached session alive on network error), but it can make the site appear broken on first load.

3. **Graphic projects require 16–50 images minimum.** This is a hard validation in both the Mongoose schema and the controller. You cannot create or update a graphic project with fewer than 16 images. There is no way around this from the UI without uploading enough images first.

4. **Creating a new admin account requires an existing admin.** The `/api/auth/signup` endpoint is protected by `requireAuth + requireAdmin`. There is no open registration flow. The first account must be created either by temporarily unprotecting the route or by inserting a document directly into MongoDB.

5. **No Vite proxy.** Unlike many React+Express setups, there is no `server.proxy` in `vite.config.js`. If you change `VITE_AUTH_ENDPOINT` in `.env`, you must restart Vite for the change to take effect.

6. **`VITE_AUTH_ENDPOINT` must not have a trailing slash.** The `buildUrl` function in `http.js` strips it, but it's cleaner to not include one.

7. **Rate category updates use Mongo ObjectId, not the logical `id`.** The logical id (e.g. `"brand-identity"`) is used to look up categories publicly (`GET /api/rates/category/:id`), but admin update and delete routes (`PUT /api/rates/admin/:id`, `DELETE /api/rates/admin/:id`) expect the MongoDB `_id`. The API response includes this as `mongoId` (via `toJSON` transform). The admin UI handles this correctly; keep it in mind if you ever call the API directly.

8. **`EnquiriesModel.js` is dead code.** The file exists in `server/models/` but is not imported anywhere. All enquiry logic uses `RateEnquiry.js`. The dead file can cause confusion; it is safe to delete.
