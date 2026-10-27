import { FiPhone, FiMail, FiMapPin, FiMap, FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import PhoneInput from "../components/PhoneInput";
import Reveal from "../components/Reveal";
import { useContext, useState } from "react";
import { CampaignContext } from "../store/campaignStore";
import { fullPkPhone, isValidPkMobile } from "../utils/pakistan";
import { errorMessage } from "../utils/axios";
import "../css/Pages.css";

const TEAM_EMAIL = "contactzaroorat@gmail.com";

const Contact = () => {
  const { apiURL } = useContext(CampaignContext);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: (data.get("fullName") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      phone: phone ? fullPkPhone(phone) : "",
      message: (data.get("message") || "").toString().trim(),
      website: (data.get("website") || "").toString(), // spam trap, humans never see it
    };
    if (phone && !isValidPkMobile(phone)) {
      return toast.error("Enter a valid Pakistani mobile number, or leave it blank.");
    }

    setSending(true);
    setFallbackHref("");
    try {
      await axios.post(`${apiURL}/api/contact`, payload);
      setSentEmail(payload.email);
      setSent(true);
      setPhone("");
      form.reset();
    } catch (error) {
      toast.error(errorMessage(error, "Your message couldn't be sent."));
      // Offer the same message as a ready-to-send email instead.
      const body = `${payload.message}\n\n— ${payload.fullName}\n${payload.email}${payload.phone ? `\n${payload.phone}` : ""}`;
      setFallbackHref(
        `mailto:${TEAM_EMAIL}?subject=${encodeURIComponent(`Website enquiry from ${payload.fullName}`)}&body=${encodeURIComponent(body)}`
      );
    } finally {
      setSending(false);
    }
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
            <a className="contact-card" href={`mailto:${TEAM_EMAIL}`}>
              <span className="contact-card-icon"><FiMail /></span>
              <div><h3>Email</h3><p>{TEAM_EMAIL}</p></div>
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
                      <input className="input" name="fullName" required maxLength={100} placeholder="Your name" />
                    </div>
                    <div className="field">
                      <label className="field-label">Email</label>
                      <input className="input" name="email" type="email" required maxLength={200} placeholder="you@email.com" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Mobile number (optional)</label>
                    <PhoneInput value={phone} onChange={setPhone} invalid={phone.length > 0 && !isValidPkMobile(phone)} />
                  </div>
                  <div className="field">
                    <label className="field-label">Message</label>
                    <textarea className="textarea" name="message" required maxLength={5000} placeholder="How can we help?" />
                  </div>
                  <div
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
                  >
                    <label>
                      Leave this empty
                      <input name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={sending}>
                    {sending ? "Sending…" : "Send message"}
                  </button>
                  {fallbackHref && (
                    <p className="contact-fallback">
                      You can also <a href={fallbackHref}><strong>send it from your email app</strong></a>, or
                      write to us at {TEAM_EMAIL}.
                    </p>
                  )}
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
