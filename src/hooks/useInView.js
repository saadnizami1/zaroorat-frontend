import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view. Cheap (IntersectionObserver,
 * no scroll listeners) so it scales to dozens of reveal targets per page.
 */
export default function useInView({ threshold = 0.18, rootMargin = "0px 0px -8% 0px", once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
