import { Link } from "react-router-dom";
import { FiInfo, FiArrowRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import "../css/Pages.css";

const STEPS = [
  { title: "Choose an amount", desc: "Open a campaign, tap Donate, and pick a preset or enter a custom amount in PKR." },
  { title: "Transfer manually", desc: "We show you the verified Zaroorat bank account. Send the amount using your banking app, ATM, or online banking." },
  { title: "Submit your proof", desc: "Enter your name, email and +92 mobile number, then upload a screenshot of your transaction slip." },
  { title: "We verify & disburse", desc: "Our team manually verifies the payment, credits the campaign, and disburses funds to the campaign owner." },
];

const Partners = () => {
  return (
    <div className="page">
      <Navbar />
      <PageHero
        eyebrow="How it works"
        title="Secure, transparent giving — step by step"
        subtitle="Zaroorat runs on direct bank transfer with manual verification. Here's exactly what happens when you donate."
      />

      <section className="content">
        <div className="container">
          <div className="steps-flow">
            {STEPS.map((s, i) => (
              <Reveal className="step-row" key={s.title} delay={(i % 4) + 1}>
                <span className="step-num">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="fee-note">
            <FiInfo />
            <p>
              <strong>Platform fee:</strong> Zaroorat applies a small platform fee on donations to keep the
              service running, maintained, and secure. The rest goes directly to the campaign. We never take
              your card details — payment is always a direct bank transfer you control.
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/fundraisers" className="btn btn-primary btn-lg">
              Browse campaigns <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Partners;
