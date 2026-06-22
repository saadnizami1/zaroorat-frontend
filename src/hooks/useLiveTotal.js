import { useEffect, useRef, useState } from "react";

/**
 * Simulates a "live" running total that ticks upward over time — used for the
 * homepage live-raised counter. Starts at `base`, then every `interval` ms adds
 * a small random increment so the number feels alive without a backend feed.
 */
export default function useLiveTotal({ base = 0, min = 500, max = 4500, interval = 2600 } = {}) {
  const [total, setTotal] = useState(base);
  const [bumped, setBumped] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTotal((t) => t + Math.floor(min + Math.random() * (max - min)));
      setBumped(true);
      setTimeout(() => setBumped(false), 700);
    }, interval);
    return () => clearInterval(timer.current);
  }, [min, max, interval]);

  return { total, bumped };
}
