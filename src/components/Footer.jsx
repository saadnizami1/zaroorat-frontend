import { Link } from "react-router-dom";
import { FiArrowRight, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";
import "../css/Footer.css";

const logo = "/ZarooratTransparent.png";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="Zaroorat" className="footer-logo" />
            <p className="footer-tag">
              Pakistan's trusted crowdfunding platform — connecting generous hearts to
              verified causes across the country.
            </p>
            <div className="footer-trust">
              <FiShield />
              <span>Every campaign reviewed &middot; Every donation verified</span>
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4>Give</h4>
              <Link to="/fundraisers">All Fundraisers</Link>
              <Link to="/discover">Categories</Link>
              <Link to="/zakat">Zakat Hub</Link>
              <Link to="/stories">Success Stories</Link>
              <Link to="/campaign">Start a Fundraiser</Link>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <Link to="/about/mission">Our Mission</Link>
              <Link to="/about/our-team">Our Team</Link>
              <Link to="/impact">Impact & Transparency</Link>
              <Link to="/about/payment_work">How It Works</Link>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <Link to="/faq">Help Center</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/about/payment_work">Trust & Safety</Link>
              <Link to="/signin">Sign in</Link>
            </div>
          </div>

          <div className="footer-news">
            <h4>Stay in the loop</h4>
            <p>Stories of impact and new causes, straight to your inbox.</p>
            <form
              className="news-form"
              onSubmit={(e) => {
                e.preventDefault();
                e.currentTarget.reset();
                toast.success("You're subscribed — thank you for joining us.");
              }}
            >
              <input type="email" placeholder="you@email.com" aria-label="Email address" required />
              <button type="submit" aria-label="Subscribe">
                <FiArrowRight />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Zaroorat. All rights reserved.</p>
          <p className="footer-made">Designed &amp; built in Pakistan</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
