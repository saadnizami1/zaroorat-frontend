import useInView from "../../hooks/useInView";

const ROW_A = ["Verified", "Transparent", "Dignified", "Accountable"];
const ROW_B = ["Medical", "Education", "Emergency", "Community"];

const Manifesto = () => {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <section className="manifesto section-paper">
      <div className="marquee-giant" aria-hidden="true">
        <div className="marquee-giant-track">
          {[...ROW_A, ...ROW_A].map((w, i) => (
            <span key={i} className={`mq-word ${i % 2 ? "outline" : ""}`}>{w}</span>
          ))}
        </div>
      </div>
      <div className="marquee-giant manifesto-reverse" aria-hidden="true">
        <div className="marquee-giant-track" style={{ animationDirection: "reverse" }}>
          {[...ROW_B, ...ROW_B].map((w, i) => (
            <span key={i} className={`mq-word ${i % 2 ? "" : "outline"}`}>{w}</span>
          ))}
        </div>
      </div>

      <div className="container">
        <p ref={ref} className={`manifesto-statement word-reveal ${inView ? "in" : ""}`}>
          {"We believe giving should be".split(" ").map((w, i) => (
            <span key={i} className="w" style={{ transitionDelay: `${i * 0.05}s` }}>{w}{" "}</span>
          ))}
          <span className="w manifesto-em" style={{ transitionDelay: "0.3s" }}>certain.</span>
          <br />
          {"Every campaign reviewed. Every rupee traced.".split(" ").map((w, i) => (
            <span key={i} className="w manifesto-soft" style={{ transitionDelay: `${0.35 + i * 0.04}s` }}>{w}{" "}</span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
