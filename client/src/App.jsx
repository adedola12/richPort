// src/App.jsx
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import FontScaler from "./components/common/FontScaler.jsx";
import CustomCursor from "./components/common/CustomCursor.jsx";
import Preloader from "./components/common/Preloader.jsx";

const MIN_MS = 1800;
const MAX_MS = 3200;

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
            <Outlet />
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
