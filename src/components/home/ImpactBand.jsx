import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import AnimatedCounter from "../AnimatedCounter";
import Reveal from "../Reveal";

const STATS = [
  { prefix: "₨", value: 14, suffix: "M", format: "plain", label: "Raised for verified causes" },
  { value: 850, suffix: "+", format: "plain", label: "Donors who gave with confidence" },
  { value: 60, suffix: "+", format: "plain", label: "Families directly helped" },
  { value: 100, suffix: "%", format: "plain", label: "Payments manually verified" },
];

const ImpactBand = () => {
  return (
    <section className="impact-band">
      <div className="container impact-inner">
        <Reveal className="impact-head">
          <span className="eyebrow">By the numbers</span>
          <h2 className="impact-title">
            Impact you can <span className="impact-em">actually</span> count.
          </h2>
        </Reveal>

        <div className="impact-grid">
          {STATS.map((s, i) => (
            <Reveal className="impact-cell" key={i} delay={(i % 4) + 1}>
              <AnimatedCounter
                className="impact-num"
                value={s.value}
                prefix={s.prefix || ""}
                suffix={s.suffix || ""}
                decimals={s.decimals || 0}
                format={s.format}
                duration={2000}
              />
              <p className="impact-label">{s.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="impact-foot">
          <p>Every campaign is reviewed by our team before it goes live, and every payment is verified by hand.</p>
          <Link to="/impact" className="impact-link">
            See full transparency report <FiArrowUpRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default ImpactBand;
