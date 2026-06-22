import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import FaqAccordion from "../components/FaqAccordion";
import Reveal from "../components/Reveal";
import { FAQ_GROUPS } from "../data/faqs";
import "../css/Pages.css";

const Faq = () => {
  return (
    <div className="page">
      <Navbar />
      <PageHero
        eyebrow="Help center"
        title="Frequently asked questions"
        subtitle="Everything you need to know about donating, fundraising, and how Zaroorat keeps giving safe."
      />

      <section className="content">
        <div className="container" style={{ maxWidth: 820 }}>
          {FAQ_GROUPS.map((group, i) => (
            <Reveal key={group.group} delay={1} className="faq-group">
              <h2 className="faq-group-title">{group.group}</h2>
              <FaqAccordion items={group.items} allowMultiple />
            </Reveal>
          ))}

          <div className="faq-cta">
            <h3>Still have questions?</h3>
            <p>Our team is here to help in Urdu and English.</p>
            <Link to="/contact" className="btn btn-primary">
              Contact us <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Faq;
