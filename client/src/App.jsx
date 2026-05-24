// src/App.jsx
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import FontScaler from "./components/common/FontScaler.jsx";
import CustomCursor from "./components/common/CustomCursor.jsx";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white w-full max-w-full">
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
