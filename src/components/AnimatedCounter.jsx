import { useEffect, useRef, useState } from "react";
import useInView from "../hooks/useInView";
import { formatNumber, formatCompact } from "../utils/format";

/**
 * Counts up from 0 to `value` once it scrolls into view.
 * format: "comma" | "compact" | "plain"
 */
const AnimatedCounter = ({
  value = 0,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  format = "comma",
  className = "",
}) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(value * easeOutExpo(p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const render = (n) => {
    if (format === "compact") return formatCompact(n);
    if (format === "plain") return decimals ? n.toFixed(decimals) : String(Math.round(n));
    return decimals ? Number(n.toFixed(decimals)).toLocaleString("en-PK") : formatNumber(n);
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {render(display)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
