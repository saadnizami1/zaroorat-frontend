import useInView from "../hooks/useInView";

/**
 * Wraps children in a scroll-reveal. Uses the global `.reveal`/`.in` classes
 * from Theme.css. `delay` 1–5 staggers grids.
 */
const Reveal = ({ children, as: Tag = "div", delay, className = "", ...rest }) => {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      data-delay={delay}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
