// src/main.jsx or src/index.jsx
import React, { lazy } from "react";
import ReactDom from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

/* Route-level code splitting — each page ships as its own chunk instead of
   riding along in the initial bundle. Home stays eager: it's the landing
   route, so lazy-loading it would only add a round trip before first paint.
   App renders these inside a Suspense boundary. */
const About = lazy(() => import("./pages/About.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const RateDetails = lazy(() => import("./pages/RateDetails.jsx"));
const ProjectPage = lazy(() => import("./components/ProjectPage.jsx"));
const GraphicDesignPage = lazy(() => import("./pages/GraphicDesignPage.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AdminAuthPage = lazy(() => import("./pages/admin/AdminAuthPage.jsx"));
const UIProjectPage = lazy(() => import("./components/UIProjectPage.jsx"));
const WebsiteDesignPage = lazy(() => import("./pages/WebsiteDesignPage.jsx"));
const YDpayPage = lazy(() => import("./pages/YDpayPage.jsx"));
const SavedupProject = lazy(() => import("./pages/SavedupProject.jsx"));
const SnotesProject = lazy(() => import("./pages/SnotesProject.jsx"));
const TabStudioProject = lazy(() => import("./pages/TabStudioProject.jsx"));
const VerdeLuxeProject = lazy(() => import("./pages/VerdeLuxeProject.jsx"));
const CleansteadProject = lazy(() => import("./pages/CleansteadProject.jsx"));
const BookRionProject = lazy(() => import("./pages/BookRionProject.jsx"));
const ADLMStudioPage = lazy(() => import("./pages/ADLMStudioPage.jsx"));
const NiqsUIProject = lazy(() => import("./pages/NiqsUIProject.jsx"));
const YDpayBrandPage = lazy(() => import("./pages/YDpayBrandPage.jsx"));
const WhitespacePage = lazy(() => import("./pages/WhitespacePage.jsx"));
const YDpayDesignPage = lazy(() => import("./pages/YDpayDesignPage.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const PresentationDesignPage = lazy(() => import("./pages/PresentationDesignPage.jsx"));
const BookPlan = lazy(() => import("./pages/BookPlan.jsx"));
const TestimonialPage = lazy(() => import("./pages/TestimonialPage.jsx"));
const BookFlyer = lazy(() => import("./pages/BookFlyer.jsx"));
const BookWebsite = lazy(() => import("./pages/BookWebsite.jsx"));
const OfferPage = lazy(() => import("./pages/OfferPage.jsx"));

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
      { path: "projects/niqs", element: <Navigate to="/ui-projects/niqs" replace /> },
      { path: "projects/tabstudio", element: <TabStudioProject /> },
      { path: "projects/verde-luxe", element: <VerdeLuxeProject /> },
      { path: "projects/cleanstead", element: <CleansteadProject /> },
      { path: "projects/book-rion", element: <BookRionProject /> },
      { path: "projects/ydpay-brand", element: <YDpayBrandPage /> },
      { path: "graphic-design", element: <GraphicDesignPage /> },
      { path: "adlm-studio-designs", element: <ADLMStudioPage /> },
      { path: "whitespace-designs", element: <WhitespacePage /> },
      { path: "ydpay-designs", element: <YDpayDesignPage /> },
      { path: "website-design", element: <WebsiteDesignPage /> },
      { path: "rate-details", element: <RateDetails /> },
      { path: "book", element: <BookPlan /> },
      { path: "book-flyer", element: <BookFlyer /> },
      { path: "book-website", element: <BookWebsite /> },
      { path: "offer/:token", element: <OfferPage /> },
      { path: "contact", element: <Contact /> },
      { path: "testimonial", element: <TestimonialPage /> },
      { path: "presentation-design", element: <PresentationDesignPage /> },
      { path: "projects/:slug", element: <ProjectPage /> },

      // ✅ UI Projects (plural) — matches your navigate(`/ui-projects/${slug}`)
      { path: "ui-projects", element: <UIProjectPage /> },
      { path: "ui-projects/ydpay-mobile-redesign", element: <YDpayPage /> },
      { path: "ui-projects/savedup", element: <SavedupProject /> },
      { path: "ui-projects/niqs", element: <NiqsUIProject /> },
      { path: "ui-projects/snotes", element: <SnotesProject /> },
      // Quiv deactivated until real screens exist — redirect to the projects index
      { path: "ui-projects/quiv", element: <Navigate to="/ui-projects" replace /> },
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
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
