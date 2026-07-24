// src/components/common/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // When the URL carries a hash (e.g. /about#work-experience), scroll to that
    // section instead of the top. Retry briefly while the page/images settle.
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const go = () => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 16;
          if (window.__lenis) window.__lenis.scrollTo(y, { force: true });
          else window.scrollTo({ top: y, left: 0, behavior: "smooth" });
          return true;
        }
        return false;
      };
      const iv = setInterval(() => {
        tries += 1;
        if (go() || tries > 25) clearInterval(iv);
      }, 60);
      return () => clearInterval(iv);
    }

    // jump to the top on every route change — through Lenis when active,
    // so its internal scroll target resets along with the viewport
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
