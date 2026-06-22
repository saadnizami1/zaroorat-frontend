import { FiStar } from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";
import Reveal from "../Reveal";

const QUOTES = [
  {
    text: "When my father needed urgent heart surgery, Zaroorat's community raised PKR 1.8 million in just nine days. The verification process gave every donor the confidence to give.",
    name: "Bilal Ahmed",
    city: "Lahore",
    initial: "B",
  },
  {
    text: "As a regular donor, I finally trust where my money goes. Every payment is checked, and I actually receive updates from the families I've helped. That changes everything.",
    name: "Ayesha Siddiqui",
    city: "Karachi",
    initial: "A",
  },
  {
    text: "We funded a full year of school fees for 40 children through one campaign. Zaroorat made it effortless to share and impossible for anyone to doubt where the money went.",
    name: "Imran Khalid",
    city: "Islamabad",
    initial: "I",
  },
];

const Testimonials = () => {
  return (
    <section className="section testi-section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow center">Stories of trust</span>
          <h2 className="section-title">Loved by donors and campaigners alike</h2>
        </Reveal>

        <div className="testi-grid">
          {QUOTES.map((q, i) => (
            <Reveal className="testi-card" key={q.name} delay={i + 1}>
              <RiDoubleQuotesL className="testi-mark" />
              <div className="testi-stars">
                <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
              </div>
              <p className="testi-text">{q.text}</p>
              <div className="testi-author">
                <span className="testi-avatar">{q.initial}</span>
                <span>
                  <strong>{q.name}</strong>
                  <span className="testi-city">{q.city}, Pakistan</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
