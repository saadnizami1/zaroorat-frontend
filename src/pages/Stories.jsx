import { Link } from "react-router-dom";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import "../css/Pages.css";

const STORIES = [
  {
    img: "/CFund_4.jpg",
    cat: "Medical",
    title: "A second chance at life for Ahmed",
    text: "Diagnosed with a serious heart condition, Ahmed's family turned to Zaroorat. In nine days, 31 verified donors funded his surgery in full.",
    raised: "PKR 240,000 raised",
    city: "Lahore",
  },
  {
    img: "/CFund_5.jpg",
    cat: "Education",
    title: "22 children, one full year of school",
    text: "A community campaign covered tuition, uniforms and books for 22 students in a low-income neighbourhood — keeping them in classrooms.",
    raised: "PKR 165,000 raised",
    city: "Karachi",
  },
  {
    img: "/CFund_6.jpg",
    cat: "Emergencies",
    title: "Rebuilding after the floods",
    text: "When monsoon floods displaced several families, donors rallied to provide shelter, clean water and essential supplies within days.",
    raised: "PKR 210,000 raised",
    city: "Sindh",
  },
  {
    img: "/CFund_7.jpg",
    cat: "Family",
    title: "Keeping a family on their feet",
    text: "After losing their sole earner, a family received support for rent and groceries while they got back on their feet with dignity.",
    raised: "PKR 95,000 raised",
    city: "Rawalpindi",
  },
  {
    img: "/Home_2.jpg",
    cat: "Islamic Causes",
    title: "A clean-water well that serves hundreds",
    text: "Sadaqah-e-Jariyah in action — a hand pump and filtration system now provides safe drinking water to an entire village.",
    raised: "PKR 70,000 raised",
    city: "Multan",
  },
  {
    img: "/Home_3.jpg",
    cat: "Medical",
    title: "Eyesight restored for Bibi Zainab",
    text: "A simple cataract operation that her family couldn't afford was funded in 48 hours, restoring her independence.",
    raised: "PKR 45,000 raised",
    city: "Peshawar",
  },
];

const Stories = () => {
  return (
    <div className="page">
      <Navbar />
      <PageHero
        eyebrow="Success stories"
        title="Real people. Real impact."
        subtitle="Behind every campaign is a life changed. These are just a few of the causes our community has made possible."
      />

      <section className="content">
        <div className="container">
          <div className="stories-grid">
            {STORIES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) + 1}>
                <article className="story-card">
                  <div className="story-media">
                    <img src={s.img} alt={s.title} loading="lazy" />
                    <span className="story-raised">{s.raised}</span>
                  </div>
                  <div className="story-body">
                    <span className="story-cat">{s.cat}</span>
                    <h3 className="story-title">{s.title}</h3>
                    <p className="story-text">{s.text}</p>
                    <div className="story-foot">
                      <FiMapPin /> {s.city}
                      <span className="badge badge-green">Funded</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/campaign" className="btn btn-primary btn-lg">
              Start your own story <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Stories;
