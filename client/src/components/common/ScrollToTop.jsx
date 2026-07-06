// src/components/common/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // jump to the top on every route change — through Lenis when active,
    // so its internal scroll target resets along with the viewport
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
