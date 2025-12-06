// src/main.jsx or src/index.jsx
import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

import Projects from "./pages/Projects.jsx";
import RateDetails from "./pages/RateDetails.jsx";
import ProjectPage from "./components/ProjectPage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AdminAuthPage from "./pages/admin/AdminAuthPage.jsx";

// 🔹 import AuthProvider
import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },

      { path: "projects", element: <Projects /> },
      { path: "rate-details", element: <RateDetails /> },
      { path: "projects/:slug", element: <ProjectPage /> },

      {
        path: "admin-auth",
        element: <AdminAuthPage />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 🔥 wrap the whole router with AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
