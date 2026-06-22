import { useEffect, useRef } from "react";

/**
 * Premium trailing cursor: a precise dot + a lagging ring that grows over
 * interactive elements. Fine-pointer + motion-OK only; otherwise renders nothing
 * and leaves the native cursor untouched.
 */
const INTERACTIVE = 'a, button, [role="button"], .magnetic, input, textarea, select, [data-cursor]';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    document.body.classList.add("has-custom-cursor");
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      const hovering = e.target.closest?.(INTERACTIVE);
      ring.classList.toggle("hover", !!hovering);
    };
    const onDown = () => ring.classList.add("down");
    const onUp = () => ring.classList.remove("down");
    const onLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onEnter = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
