# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RichPort** is a full-stack portfolio web application with a React/Vite frontend (`client/`) and Express/Node.js backend (`server/`). The backend is served on port 4000; the client falls back to `http://localhost:4000` if no `VITE_API_BASE` env var is set.

## Commands

### Client (`client/`)
```bash
npm run dev       # Vite dev server with HMR
npm run build     # Production build → client/dist/
npm run lint      # ESLint
npm run preview   # Preview production build
```

### Server (`server/`)
```bash
npm run dev   # nodemon index.js (auto-reload)
npm start     # node index.js (production)
```

Both packages use ES modules (`"type": "module"`).

## Architecture

### Frontend (`client/src/`)
- **Routing**: React Router v7 `createBrowserRouter` in `App.jsx`. Routes: `/`, `/about`, `/projects`, `/projects/:slug`, `/graphic-design`, `/ui-projects/:slug`, `/rate-details`, `/admin`.
- **State**: `context/AuthContext.jsx` — the only global store. Provides `user`, `isAuthenticated`, `authFetch()`, and `authJson()`. Token is in localStorage; JWT expiration is validated on app init.
- **API layer**: `api/http.js` exports `fetchJson()` which auto-injects the auth token and handles errors. Entity-specific modules (`graphicProjectsApi.js`, `uiProjects.js`) wrap it.
- **Styling**: Tailwind CSS v4, dark theme (`bg-[#0B0B0B]`, `text-white`), lime-400 accent. No custom theme extensions.
- **Animations**: Framer Motion for page transitions (opacity/blur/slide).
- **Protected routes**: `components/auth/ProtectedRoute.jsx` wraps admin routes.

### Backend (`server/`)
- **Entry**: `index.js` — mounts all routes, Helmet, Morgan, CORS, cookie-parser, static file serving from `client/dist`.
- **DB**: Mongoose singleton in `db.js`, URI from `MONGO_URI` env var.
- **Pattern**: Routes → Controllers → Models. Each domain (auth, project, uiProject, graphicProject, journey, rate, enquiry) has its own file in each layer.
- **Auth**: JWT Bearer tokens. Auth middleware in `middleware/`.
- **File uploads**: Multer + streamifier + Cloudinary (`cloudinary.js`).
- **CORS**: Dynamic origin whitelist from `CORS_ORIGINS` env var.

### Key env vars
| Var | Used by | Purpose |
|-----|---------|---------|
| `VITE_API_BASE` | client | Backend base URL |
| `MONGO_URI` | server | MongoDB connection string |
| `CORS_ORIGINS` | server | Comma-separated allowed origins |
| `PORT` | server | Server listen port (default 4000) |
