import useInView from "../hooks/useInView";

/**
 * Splits a heading into words that blur/rise into place, staggered.
 * `text` is the plain string; `gradient` indexes (array) get the animated
 * colour-shifting gradient treatment.
 */
const WordReveal = ({ text = "", as: Tag = "h2", className = "", gradient = [], stagger = 0.06 }) => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`word-reveal ${inView ? "in" : ""} ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="w" style={{ transitionDelay: `${i * stagger}s` }}>
          <span className={gradient.includes(i) ? "gradient-text" : undefined}>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
};

export default WordReveal;
