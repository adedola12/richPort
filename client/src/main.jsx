// src/main.jsx or src/index.jsx
import React from "react";
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
import About from "./pages/About.jsx";

import Projects from "./pages/Projects.jsx";
import RateDetails from "./pages/RateDetails.jsx";
import GraphicDesignPage from "./pages/GraphicDesignPage";
import WebsiteDesignPage from "./pages/WebsiteDesignPage.jsx";
import YDpayPage from "./pages/YDpayPage.jsx";
import SavedupProject from "./pages/SavedupProject.jsx";
import SnotesProject from "./pages/SnotesProject.jsx";
import QuivProject from "./pages/QuivProject.jsx";
import TabStudioProject from "./pages/TabStudioProject.jsx";
import VerdeLuxeProject from "./pages/VerdeLuxeProject.jsx";
import CleansteadProject from "./pages/CleansteadProject.jsx";
import BookRionProject from "./pages/BookRionProject.jsx";
import ADLMStudioPage from "./pages/ADLMStudioPage.jsx";
import NiqsUIProject from "./pages/NiqsUIProject.jsx";
import YDpayBrandPage from "./pages/YDpayBrandPage.jsx";
import WhitespacePage from "./pages/WhitespacePage.jsx";
import YDpayDesignPage from "./pages/YDpayDesignPage.jsx";
import Contact from "./pages/Contact.jsx";
import PresentationDesignPage from "./pages/PresentationDesignPage.jsx";
import BookPlan from "./pages/BookPlan.jsx";
import TestimonialPage from "./pages/TestimonialPage.jsx";
import BookFlyer from "./pages/BookFlyer.jsx";
import BookWebsite from "./pages/BookWebsite.jsx";
import OfferPage from "./pages/OfferPage.jsx";

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
      // Every case study now has its own route above. Anything else that used
      // to be served from the database falls back to the projects index.
      { path: "projects/:slug", element: <Navigate to="/projects" replace /> },

      // ✅ UI Projects (plural) — matches your navigate(`/ui-projects/${slug}`)
      { path: "ui-projects", element: <Navigate to="/projects" replace /> },
      { path: "ui-projects/ydpay-mobile-redesign", element: <YDpayPage /> },
      { path: "ui-projects/savedup", element: <SavedupProject /> },
      { path: "ui-projects/niqs", element: <NiqsUIProject /> },
      { path: "ui-projects/snotes", element: <SnotesProject /> },
      // Quiv deactivated until real screens exist — redirect to the projects index
      { path: "ui-projects/quiv", element: <Navigate to="/ui-projects" replace /> },
      { path: "ui-projects/:slug", element: <Navigate to="/projects" replace /> },

      // keep old links working by redirecting (preserving slug)
      { path: "ui-project", element: <Navigate to="/ui-projects" replace /> },
      {
        path: "ui-project/:slug",
        element: <RedirectWithSlug basePath="/ui-projects" />,
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
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
);
