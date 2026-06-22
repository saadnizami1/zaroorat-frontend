import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "../Reveal";

const CtaBanner = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <Reveal className="cta-band">
          <div className="cta-glow" aria-hidden="true" />
          <div className="cta-content">
            <h2 className="cta-title">Your kindness can change a life today.</h2>
            <p className="cta-sub">
              Whether you're raising funds or giving to a cause, Zaroorat makes it safe,
              simple and transparent — every campaign verified, every rupee accounted for.
            </p>
            <div className="cta-actions">
              <Link to="/campaign" className="btn btn-primary btn-lg">
                Start a Fundraiser <FiArrowRight />
              </Link>
              <Link to="/fundraisers" className="btn btn-light btn-lg">
                Donate to a Cause
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaBanner;
