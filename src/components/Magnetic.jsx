import { useRef } from "react";

/**
 * Wraps an element so it gently pulls toward the cursor (magnetic hover).
 * Disabled on touch / coarse pointers automatically (no mouse events fire).
 */
const Magnetic = ({ children, strength = 0.35, className = "", ...rest }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: "inline-flex", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Magnetic;
