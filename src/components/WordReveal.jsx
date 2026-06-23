import { Fragment } from "react";
import useInView from "../hooks/useInView";

/**
 * Splits a heading into words that blur/rise into place, staggered.
 * `text` is the plain string; `gradient` indexes (array) get the animated
 * colour-shifting gradient treatment.
 *
 * The inter-word spaces live OUTSIDE the inline-block `.w` spans — an
 * inline-block trims its own trailing whitespace, which would otherwise
 * run the words together ("deservesa").
 */
const WordReveal = ({ text = "", as: Tag = "h2", className = "", gradient = [], stagger = 0.06 }) => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`word-reveal ${inView ? "in" : ""} ${className}`}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w" style={{ transitionDelay: `${i * stagger}s` }}>
            <span className={gradient.includes(i) ? "gradient-text" : undefined}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
};

export default WordReveal;
