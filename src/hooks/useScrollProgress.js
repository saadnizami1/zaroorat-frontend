import { useEffect, useRef, useState } from "react";

/**
 * Tracks how far a tall "pin wrapper" has been scrolled through the viewport.
 * Returns progress 0→1 while the element's top travels from 0 down to
 * (elementHeight - viewportHeight). Drives pinned horizontal/sticky sections.
 * rAF-throttled, passive listener — cheap.
 */
export default function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return [ref, progress];
}
