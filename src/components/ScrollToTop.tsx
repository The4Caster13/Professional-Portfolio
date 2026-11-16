import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Jumps to the top of the page whenever the route changes (e.g. Home -> Photography).
// Query-string changes (like the All Projects filter) and #hash links are left alone.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
