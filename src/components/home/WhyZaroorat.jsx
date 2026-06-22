import {
  FiShield,
  FiEye,
  FiZap,
  FiHeart,
  FiCreditCard,
  FiHeadphones,
} from "react-icons/fi";
import Reveal from "../Reveal";

const PILLARS = [
  {
    icon: <FiShield />,
    title: "Every campaign verified",
    desc: "No fundraiser goes live until our team has reviewed it. You only ever see causes we trust.",
    span: "feat",
    tag: "Human-reviewed · 100%",
  },
  {
    icon: <FiEye />,
    title: "Complete transparency",
    desc: "Donations are manually verified against payment proof — progress shows exactly where money goes.",
    span: "wide",
  },
  {
    icon: <FiCreditCard />,
    title: "Built for Pakistan",
    desc: "Pay by simple bank transfer to a verified account — no foreign cards or hidden gateways.",
  },
  {
    icon: <FiZap />,
    title: "Live in minutes",
    desc: "Create a polished, shareable fundraiser in a few steps.",
  },
  {
    icon: <FiHeart />,
    title: "Zakat-friendly giving",
    desc: "Identify Zakat-eligible causes and give your obligation with confidence and clarity.",
    span: "wide",
  },
  {
    icon: <FiHeadphones />,
    title: "Real human support",
    desc: "A Pakistan-based team you can actually reach — guiding campaigners and donors at every step.",
    span: "wide",
  },
];

const onSpot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const WhyZaroorat = () => {
  return (
    <section className="section why-section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow center">Why Zaroorat</span>
          <h2 className="section-title">Trust isn't a feature. It's the foundation.</h2>
          <p className="section-lead">
            We built Zaroorat for a simple reason: giving in Pakistan should feel safe,
            personal, and completely transparent.
          </p>
        </Reveal>

        <div className="why-grid">
          {PILLARS.map((p, i) => (
            <Reveal
              className={`why-card ${p.span ? `why-${p.span}` : ""}`}
              key={p.title}
              delay={(i % 3) + 1}
              onMouseMove={onSpot}
            >
              <span className="why-icon">{p.icon}</span>
              <div className="why-body">
                <h3 className="why-title">{p.title}</h3>
                <p className="why-desc">{p.desc}</p>
              </div>
              {p.tag && <span className="why-tag">{p.tag}</span>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyZaroorat;
