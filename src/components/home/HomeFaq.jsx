import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import FaqAccordion from "../FaqAccordion";
import Reveal from "../Reveal";
import { HOME_FAQS } from "../../data/faqs";

const HomeFaq = () => {
  return (
    <section className="section home-faq-section">
      <div className="container home-faq-grid">
        <Reveal className="home-faq-intro">
          <span className="eyebrow">Questions, answered</span>
          <h2 className="section-title">Everything you need to feel confident</h2>
          <p className="section-lead">
            New to Zaroorat? Here are the things donors and campaigners ask us most.
          </p>
          <Link to="/faq" className="btn btn-ghost">
            Visit the Help Center <FiArrowRight />
          </Link>
        </Reveal>
        <Reveal className="home-faq-list" delay={1}>
          <FaqAccordion items={HOME_FAQS} />
        </Reveal>
      </div>
    </section>
  );
};

export default HomeFaq;
