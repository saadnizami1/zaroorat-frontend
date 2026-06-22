import { FiPhone, FiMail, FiMapPin, FiMap, FiCheckCircle } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import PhoneInput from "../components/PhoneInput";
import Reveal from "../components/Reveal";
import { useState } from "react";
import "../css/Pages.css";

const Contact = () => {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSentEmail((data.get("email") || "").toString());
    setSent(true);
    setPhone("");
  };

  return (
    <div className="page">
      <Navbar />
      <PageHero
        eyebrow="Get in touch"
        title="We'd love to hear from you"
        subtitle="Questions, feedback, or help with a campaign? Our Pakistan-based team supports you in Urdu and English."
      />

      <section className="content">
        <div className="container contact-grid">
          <Reveal className="contact-cards">
            <a className="contact-card" href="tel:+923214012041">
              <span className="contact-card-icon"><FiPhone /></span>
              <div><h3>Phone</h3><p>+92 321 4012041</p></div>
            </a>
            <a className="contact-card" href="mailto:contactzaroorat@gmail.com">
              <span className="contact-card-icon"><FiMail /></span>
              <div><h3>Email</h3><p>contactzaroorat@gmail.com</p></div>
            </a>
            <div className="contact-card">
              <span className="contact-card-icon"><FiMapPin /></span>
              <div><h3>Office</h3><p>48 FF, Phase 4, DHA, Lahore</p></div>
            </div>
            <a
              className="contact-card"
              href="https://www.google.com/maps/place/DHA+Phase+4+Dha+Phase+4,+Lahore,+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-card-icon"><FiMap /></span>
              <div><h3>Directions</h3><p>Open in Google Maps</p></div>
            </a>
          </Reveal>

          <Reveal className="contact-form-card" delay={1}>
            {sent ? (
              <div className="contact-sent">
                <span className="contact-sent-icon"><FiCheckCircle /></span>
                <h2>Message received</h2>
                <p>
                  Thanks for reaching out{sentEmail ? <> — we'll reply to <strong>{sentEmail}</strong></> : ""}.
                  Our Pakistan-based team typically responds within 1–2 business days.
                </p>
                <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2>Send us a message</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="two">
                    <div className="field">
                      <label className="field-label">Full name</label>
                      <input className="input" name="fullName" required placeholder="Your name" />
                    </div>
                    <div className="field">
                      <label className="field-label">Email</label>
                      <input className="input" name="email" type="email" required placeholder="you@email.com" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Mobile number</label>
                    <PhoneInput value={phone} onChange={setPhone} />
                  </div>
                  <div className="field">
                    <label className="field-label">Message</label>
                    <textarea className="textarea" name="message" required placeholder="How can we help?" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg">Send message</button>
                </form>
              </>
            )}
          </Reveal>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
