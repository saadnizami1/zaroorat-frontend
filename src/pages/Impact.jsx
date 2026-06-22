import { Link } from "react-router-dom";
import { FiShield, FiCheckCircle, FiUploadCloud, FiSend, FiArrowRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import AnimatedCounter from "../components/AnimatedCounter";
import Reveal from "../components/Reveal";
import "../css/Pages.css";

const TILES = [
  { value: 14, prefix: "PKR ", suffix: "M", format: "plain", label: "Raised for verified causes" },
  { value: 60, suffix: "+", format: "plain", label: "Families directly helped" },
  { value: 850, suffix: "+", format: "plain", label: "Donors who gave with confidence" },
  { value: 100, suffix: "%", format: "plain", label: "Payments manually verified" },
];

const ALLOCATION = [
  { label: "Direct to verified campaigns", pct: 93 },
  { label: "Payment & verification costs", pct: 4 },
  { label: "Platform operations & support", pct: 3 },
];

const PROCESS = [
  { icon: <FiCheckCircle />, title: "Campaign review", desc: "Every fundraiser is checked and approved by our team before it can receive a single rupee." },
  { icon: <FiUploadCloud />, title: "Proof of payment", desc: "Donors upload a receipt for every transfer — nothing is counted until it's verified." },
  { icon: <FiShield />, title: "Manual verification", desc: "Our admins match each payment to its proof, protecting donors from fraud." },
  { icon: <FiSend />, title: "Transparent disbursement", desc: "Verified funds are released to the campaigner, with progress updates shared publicly." },
];

const Impact = () => {
  return (
    <div className="page">
      <Navbar />
      <PageHero
        variant="navy"
        eyebrow="Impact & transparency"
        title="Where every rupee goes"
        subtitle="Trust is earned with openness. Every campaign is reviewed before it goes live and every payment verified by hand — here's the impact created so far, and exactly how we keep it accountable."
      />

      <section className="content">
        <div className="container">
          <div className="impact-tiles">
            {TILES.map((t, i) => (
              <Reveal className="impact-tile" key={t.label} delay={(i % 4) + 1}>
                <div className="big">
                  <AnimatedCounter value={t.value} prefix={t.prefix} suffix={t.suffix} decimals={t.decimals || 0} format={t.format || "comma"} />
                </div>
                <p>{t.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="content content-alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow center">Money flow</span>
            <h2 className="section-title">How donations are allocated</h2>
            <p className="section-lead">The vast majority of every donation goes straight to the cause.</p>
          </Reveal>
          <div className="allocation" style={{ marginTop: "2.5rem" }}>
            {ALLOCATION.map((a, i) => (
              <Reveal className="alloc-row" key={a.label} delay={i + 1}>
                <div className="alloc-head">
                  <strong>{a.label}</strong>
                  <span>{a.pct}%</span>
                </div>
                <div className="progress" style={{ height: 12 }}>
                  <div className="progress-fill" style={{ width: `${a.pct}%` }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow center">Accountability</span>
            <h2 className="section-title">Four checks behind every donation</h2>
          </Reveal>
          <div className="value-grid">
            {PROCESS.map((p, i) => (
              <Reveal className="value-card" key={p.title} delay={(i % 4) + 1}>
                <div className="value-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.6rem" }}>
            <Link to="/fundraisers" className="btn btn-primary btn-lg">
              Support a verified cause <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Impact;
