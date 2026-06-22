import Reveal from "../Reveal";

// Two rows that scroll in opposite directions.
const ROW_A = ["Shaukat Khanum", "Akhuwat Foundation", "Edhi Foundation", "Indus Hospital", "Saylani Welfare", "Alkhidmat"];
const ROW_B = ["The Citizens Foundation", "SIUT", "JDC Foundation", "Chhipa Welfare", "LRBT", "Fatimid Foundation"];

const Row = ({ items, reverse }) => (
  <div className="affil-row">
    <div className={`affil-track ${reverse ? "affil-rev" : ""}`}>
      {[...items, ...items].map((name, i) => (
        <span className="affil-chip" key={i}>{name}</span>
      ))}
    </div>
  </div>
);

const Affiliations = () => {
  return (
    <section className="affiliations section-paper">
      <div className="container">
        <Reveal className="affil-head">
          <span className="eyebrow">In good company</span>
          <h2 className="affil-heading">
            Built in the spirit of Pakistan's most trusted institutions
          </h2>
        </Reveal>
      </div>
      <div className="affil-marquee" aria-hidden="true">
        <Row items={ROW_A} />
        <Row items={ROW_B} reverse />
      </div>
    </section>
  );
};

export default Affiliations;
