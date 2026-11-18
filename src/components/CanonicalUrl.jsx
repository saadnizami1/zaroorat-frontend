import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE, PAGES, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "../data/seo";

/**
 * Keeps <link rel="canonical"> pointing at the current page on the real
 * domain, and sets the page's title and description from data/seo.js. The
 * SPA serves one index.html for every route, so fixed tags would tell search
 * engines that every page is the homepage. Campaign pages (/donate/:id) set
 * their own title in Donate.jsx.
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

    if (pathname.startsWith("/donate/")) return;
    const page = PAGES[pathname.replace(/(.)\/$/, "$1")];
    document.title = page?.title || DEFAULT_TITLE;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", page?.description || DEFAULT_DESCRIPTION);
  }, [pathname]);

  return null;
};

export default CanonicalUrl;
