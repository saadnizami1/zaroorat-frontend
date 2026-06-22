import { Link } from "react-router-dom";
import {
  MdOutlineHealthAndSafety,
  MdOutlineCastForEducation,
  MdOutlineSafetyCheck,
} from "react-icons/md";
import { FaHandHoldingHeart, FaMosque, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { AiOutlineEnvironment } from "react-icons/ai";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "../Reveal";

const CATS = [
  { key: "medical", label: "Medical", icon: <MdOutlineHealthAndSafety />, blurb: "Surgeries, treatment & care" },
  { key: "education", label: "Education", icon: <MdOutlineCastForEducation />, blurb: "Fees, books & scholarships" },
  { key: "emergencies", label: "Emergencies", icon: <MdOutlineSafetyCheck />, blurb: "Urgent relief & disasters" },
  { key: "Islamic_causes", label: "Islamic Causes", icon: <FaMosque />, blurb: "Zakat, Sadaqah & masajid" },
  { key: "family", label: "Family", icon: <FaUsers />, blurb: "Support for households" },
  { key: "monthly_bills", label: "Monthly Bills", icon: <FaMoneyBillWave />, blurb: "Rent, utilities & essentials" },
  { key: "environment", label: "Environment", icon: <AiOutlineEnvironment />, blurb: "Clean water & climate" },
  { key: "gaza", label: "Relief Funds", icon: <FaHandHoldingHeart />, blurb: "Gaza, Kashmir & beyond" },
];

const CategoriesShowcase = () => {
  return (
    <section className="section cats-section">
      <div className="container">
        <div className="cats-head">
          <Reveal className="section-head">
            <span className="eyebrow">Browse by cause</span>
            <h2 className="section-title">Find the cause that moves you</h2>
          </Reveal>
          <Link to="/discover" className="btn btn-ghost btn-sm cats-all">
            View all categories
          </Link>
        </div>

        <div className="cats-grid">
          {CATS.map((c, i) => (
            <Reveal key={c.key} delay={(i % 4) + 1} className="cat-reveal">
              <Link to={`/fundraisers/${c.key}`} className="cat-tile">
                <span className="cat-icon">{c.icon}</span>
                <span className="cat-text">
                  <strong>{c.label}</strong>
                  <span>{c.blurb}</span>
                </span>
                <FiArrowUpRight className="cat-arrow" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;
