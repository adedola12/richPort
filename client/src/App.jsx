// src/App.jsx
import { useState, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import FontScaler from "./components/common/FontScaler.jsx";
import CustomCursor from "./components/common/CustomCursor.jsx";
import Preloader from "./components/common/Preloader.jsx";

const MIN_MS = 1800;
const MAX_MS = 3200;

/* Shown while a route's lazy chunk downloads. Holds roughly a viewport of
   height so the footer doesn't jump up during the swap. */
const RouteFallback = () => (
  <div className="flex min-h-[70vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-lime-400" />
  </div>
);

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = Date.now();
    const finish = () => {
      const elapsed = Date.now() - start;
      const delay = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => setLoading(false), delay);
    };

    const fallback = setTimeout(() => setLoading(false), MAX_MS);

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("load", finish);
    };
  }, []);

  /* Buttery smooth scrolling — Lenis eases native scroll, so
     scroll-driven framer-motion sections keep working untouched. */
  useEffect(() => {
    const lenis = new Lenis({ duration: 0.9, smoothWheel: true, wheelMultiplier: 1.2 });
    // Exposed so route changes (ScrollToTop) can reset Lenis's internal
    // target — a bare window.scrollTo leaves it stale and the next wheel
    // input animates back from the old position (feels like a hang).
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white w-full max-w-full">
      <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>

      <Nav />
      <ScrollToTop />

      <main className="w-full px-[4px] pt-0 pb-8 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <FontScaler />
      <CustomCursor />
    </div>
  );
}

export default App;
