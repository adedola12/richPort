// src/main.jsx or src/index.jsx
import React from "react";
import ReactDom from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

import Projects from "./pages/Projects.jsx";
import RateDetails from "./pages/RateDetails.jsx";
import ProjectPage from "./components/ProjectPage.jsx";
import GraphicDesignPage from "./pages/GraphicDesignPage";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AdminAuthPage from "./pages/admin/AdminAuthPage.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import UIProjectPage from "./components/UIProjectPage.jsx";
import WebsiteDesignPage from "./pages/WebsiteDesignPage.jsx";
import YDpayPage from "./pages/YDpayPage.jsx";
import Contact from "./pages/Contact.jsx";

// Redirect component that preserves slug params
const RedirectWithSlug = ({ basePath }) => {
  const { slug } = useParams();
  return <Navigate to={slug ? `${basePath}/${slug}` : basePath} replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },

      { path: "projects", element: <Projects /> },
      { path: "graphic-design", element: <GraphicDesignPage /> },
      { path: "website-design", element: <WebsiteDesignPage /> },
      { path: "rate-details", element: <RateDetails /> },
      { path: "contact", element: <Contact /> },
      { path: "projects/:slug", element: <ProjectPage /> },

      // ✅ UI Projects (plural) — matches your navigate(`/ui-projects/${slug}`)
      { path: "ui-projects", element: <UIProjectPage /> },
      { path: "ui-projects/ydpay-mobile-redesign", element: <YDpayPage /> },
      { path: "ui-projects/:slug", element: <UIProjectPage /> },

      // keep old links working by redirecting (preserving slug)
      { path: "ui-project", element: <Navigate to="/ui-projects" replace /> },
      {
        path: "ui-project/:slug",
        element: <RedirectWithSlug basePath="/ui-projects" />,
      },

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

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
