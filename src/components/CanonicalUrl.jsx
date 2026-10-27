import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://zaroorat.xyz";

/**
 * Keeps <link rel="canonical"> pointing at the current page on the real
 * domain. The SPA serves one index.html for every route, so a fixed tag would
 * tell search engines that every page is the homepage.
 */
const CanonicalUrl = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = SITE + pathname;
  }, [pathname]);

  return null;
};

export default CanonicalUrl;
