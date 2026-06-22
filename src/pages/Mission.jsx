import { Link } from "react-router-dom";
import { FiUsers, FiEye, FiShield, FiHeart } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import "../css/Pages.css";

const VALUES = [
  { icon: <FiHeart />, title: "Empowerment", desc: "Enable Pakistani fundraisers to share their stories and reach supporters across every province and the diaspora." },
  { icon: <FiEye />, title: "Transparency", desc: "Clear progress tracking and regular updates, so donors always know how their contributions create change." },
  { icon: <FiShield />, title: "Trust", desc: "Every rupee reaches its intended purpose through rigorous verification and secure, manual review." },
  { icon: <FiUsers />, title: "Community", desc: "A caring network reflecting Pakistani values — where neighbours help neighbours and communities uplift one another." },
];

const Mission = () => {
  return (
    <div className="page">
      <Navbar />
      <PageHero
        eyebrow="Our mission"
        title="Built on the Pakistani spirit of helping one another"
        subtitle="Zaroorat connects compassionate donors across Pakistan with the causes that matter — making every contribution transparent, meaningful, and impactful."
      >
        <Link to="/campaign" className="btn btn-primary">Start your Zaroorat</Link>
      </PageHero>

      <section className="content">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow center">What we stand for</span>
            <h2 className="section-title">The values that guide every campaign</h2>
          </Reveal>
          <div className="value-grid">
            {VALUES.map((v, i) => (
              <Reveal className="value-card" key={v.title} delay={(i % 4) + 1}>
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Mission;
