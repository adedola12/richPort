// src/components/common/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // jump to the top on every route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // you can change to "smooth" if you like
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
