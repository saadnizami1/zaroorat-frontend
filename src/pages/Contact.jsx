 import '../css/Contact.css';
import { FiPhone, FiMail, FiMapPin, FiHome, FiMap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const Contact = () => {
  return (
    <section className="contact-section">
      <Link to="/" className="home-icon"><FiHome /></Link>
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-text">
          We'd love to hear from you! Reach out via phone, email, WhatsApp, or visit us at our office. Our team provides support in Urdu and English.
        </p>
        <div className="contact-info">
          <div className="info-card">
            <FiPhone className="info-icon" />
            <div>
              <h3>Phone</h3>
              <p>+92 321 4012041</p>
            </div>
          </div>
          <div className="info-card">
            <FiMail className="info-icon" />
            <div>
              <h3>Email</h3>
              <p>contactzaroorat@gmail.com</p>
            </div>
          </div>
          <div className="info-card">
            <FiMapPin className="info-icon" />
            <div>
              <h3>Location</h3>
              <p>48 FF, Phase 4, DHA, Lahore</p>
            </div>
          </div>
          <div className="info-card">
            <FiMap className="info-icon" />
            <div>
                <a
                  href="https://www.google.com/maps/place/DHA+Phase+4+Dha+Phase+4,+Lahore,+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  <h3>View Map</h3>
                  <p>Open in Google Maps</p>
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;