import { Link } from "react-router-dom";
import { FiArrowLeft, FiShield, FiCheckCircle, FiHeart } from "react-icons/fi";
import "../css/Signin.css";

const logo = "/ZarooratTransparent.png";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="auth-page">
      {/* Brand panel */}
      <aside className="auth-brand">
        <div className="auth-brand-bg" aria-hidden="true">
          <span className="auth-blob auth-blob-1" />
          <span className="auth-blob auth-blob-2" />
        </div>
        <div className="auth-brand-inner">
          <Link to="/" className="auth-logo">
            <img src={logo} alt="Zaroorat" />
          </Link>
          <div className="auth-brand-copy">
            <h2>Giving that Pakistan can trust.</h2>
            <p>Join a growing community of donors and campaigners making real, verified impact.</p>
            <ul className="auth-points">
              <li><FiShield /> Every campaign reviewed before it goes live</li>
              <li><FiCheckCircle /> Every donation manually verified</li>
              <li><FiHeart /> 100% of your intention reaches the cause</li>
            </ul>
          </div>
          <div className="auth-brand-stat">
            <strong>PKR 14M+</strong>
            <span>raised for verified causes across Pakistan</span>
          </div>
        </div>
      </aside>

      {/* Form panel */}
      <main className="auth-main">
        <Link to="/" className="auth-back">
          <FiArrowLeft /> Back to home
        </Link>
        <div className="auth-card">
          <h1 className="auth-title">{title}</h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
