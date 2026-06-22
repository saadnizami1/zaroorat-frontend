import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { formatPKR } from "../utils/format";
import "../css/Pages.css";

const FIELDS = [
  { key: "cash", label: "Cash & bank savings" },
  { key: "gold", label: "Gold & silver (value)" },
  { key: "investments", label: "Investments, shares & business stock" },
  { key: "receivables", label: "Money owed to you" },
];

const POINTS = [
  "Zakat is 2.5% of your eligible wealth held for one lunar year, above the nisab threshold.",
  "Eligible wealth includes cash, gold, silver, investments and money owed to you — minus your debts.",
  "Give your Zakat to verified, Zakat-eligible campaigns and see exactly where it goes.",
  "This calculator is a guide; consult a scholar for rulings specific to your situation.",
];

const Zakat = () => {
  const [values, setValues] = useState({ cash: "", gold: "", investments: "", receivables: "", liabilities: "" });

  const update = (k, v) => setValues((p) => ({ ...p, [k]: v.replace(/[^\d.]/g, "") }));

  const { zakatable, zakat } = useMemo(() => {
    const assets = FIELDS.reduce((sum, f) => sum + (parseFloat(values[f.key]) || 0), 0);
    const net = Math.max(0, assets - (parseFloat(values.liabilities) || 0));
    return { zakatable: net, zakat: net * 0.025 };
  }, [values]);

  return (
    <div className="page">
      <Navbar />
      <PageHero
        eyebrow="Zakat hub"
        title="Calculate & give your Zakat with confidence"
        subtitle="Work out your Zakat in seconds, then direct it to verified, Zakat-eligible causes across Pakistan."
      />

      <section className="content">
        <div className="container zakat-grid">
          {/* Calculator */}
          <Reveal className="zakat-calc">
            <h2>Zakat calculator</h2>
            <p className="sub">Enter your assets and liabilities in PKR.</p>
            <div className="contact-form">
              {FIELDS.map((f) => (
                <div className="field" key={f.key}>
                  <label className="field-label">{f.label}</label>
                  <input
                    className="input"
                    inputMode="decimal"
                    placeholder="0"
                    value={values[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                  />
                </div>
              ))}
              <div className="field">
                <label className="field-label">Debts & liabilities (subtracted)</label>
                <input
                  className="input"
                  inputMode="decimal"
                  placeholder="0"
                  value={values.liabilities}
                  onChange={(e) => update("liabilities", e.target.value)}
                />
              </div>
            </div>

            <div className="zakat-result">
              <span>Your Zakat (2.5% of {formatPKR(zakatable)})</span>
              <strong>{formatPKR(zakat)}</strong>
            </div>
            <Link to="/fundraisers/Islamic_causes" className="btn btn-primary btn-block btn-lg" style={{ marginTop: "1.2rem" }}>
              Give your Zakat <FiArrowRight />
            </Link>
          </Reveal>

          {/* Info */}
          <Reveal className="zakat-info" delay={1}>
            <h2>Giving that purifies your wealth</h2>
            <p style={{ color: "var(--text-soft)", lineHeight: 1.8 }}>
              Zakat is one of the five pillars of Islam — an act of worship and a right of the poor upon the
              wealthy. Zaroorat makes it simple to fulfil this obligation transparently, directing your Zakat
              to causes that truly qualify.
            </p>
            <ul className="zakat-points">
              {POINTS.map((p) => (
                <li key={p}><FiCheckCircle /> {p}</li>
              ))}
            </ul>
            <Link to="/discover" className="btn btn-ghost">Explore eligible causes</Link>
          </Reveal>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Zakat;
