import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import BrandIdentity from "./pages/BrandIdentity.jsx";
import Projects from "./pages/Projects.jsx";
import RateDetails from "./pages/RateDetails.jsx";
import AdminAddPage from "./pages/AdminAddPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "brand-identity", element: <BrandIdentity /> },
      { path: "projects", element: <Projects /> },
      { path: "rate-details", element: <RateDetails /> },
      {
        path: "admin/add",
        element: <AdminAddPage />,
      },
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
