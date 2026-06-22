import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiArrowUpRight, FiShield, FiHeart, FiZap } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import useInView from "../hooks/useInView";
import "../css/OurTeam.css";

const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const DEPARTMENTS = [
  { name: "Customer Support", head: "Ahmad Adnan", members: ["Usman Nizai", "Irtaza Khan", "Danyal Zaka"] },
  { name: "Public Engagement", head: "Hassan Ali", members: ["Musa Raza", "Azan Khurram", "Danyyal Niazi"] },
  { name: "Web Operations", head: "Saad Nizami", members: ["Salaar Farrukh", "Ibrahim Malik"] },
];

const VALUES = [
  { icon: <FiShield />, title: "Verify everything", body: "No payment counts until a human on our team confirms the proof. Trust is earned line by line." },
  { icon: <FiHeart />, title: "Dignity first", body: "Every campaigner is treated with respect — we tell real stories, never reduce people to a statistic." },
  { icon: <FiZap />, title: "Move for people", body: "When a family is in crisis, speed matters. We build and respond with urgency, not bureaucracy." },
];

const OurTeam = () => {
  const aetherRef = useRef(null);
  const [titleRef, titleIn] = useInView({ threshold: 0.3 });

  useEffect(() => {
    const el = aetherRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--px", (e.clientX / window.innerWidth - 0.5).toFixed(3));
        el.style.setProperty("--py", (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="page">
      <Navbar />

      {/* ---------- Editorial hero ---------- */}
      <section className="team-hero">
        <div className="team-hero-aether" ref={aetherRef} aria-hidden="true">
          <span className="bgword team-bgword">team</span>
        </div>
        <div className="container team-hero-inner">
          <span className="eyebrow">Our team · Pakistan</span>
          <h1 ref={titleRef} className={`team-title word-reveal ${titleIn ? "in" : ""}`}>
            {"The people behind every".split(" ").map((w, i) => (
              <span key={i} className="w" style={{ transitionDelay: `${i * 0.06}s` }}>{w}{" "}</span>
            ))}
            <span className="w team-accent" style={{ transitionDelay: "0.3s" }}>verified rupee.</span>
          </h1>
          <p className="team-lead-text">
            Zaroorat is built by a small, relentless Pakistani team who check every proof, answer every
            message, and obsess over getting help to the right hands.
          </p>
          <div className="team-stats">
            <div className="team-stat"><strong>15+</strong><span>People</span></div>
            <div className="team-stat"><strong>3</strong><span>Departments</span></div>
            <div className="team-stat"><strong>100%</strong><span>Pakistan-based</span></div>
          </div>
        </div>
      </section>

      {/* ---------- Founder spread ---------- */}
      <section className="section founder-section">
        <div className="container founder-grid">
          <Reveal className="founder-panel">
            <span className="founder-monogram">SN</span>
            <div className="founder-socials">
              <a href="mailto:saadnizami114@gmail.com" aria-label="Email Saad"><FaEnvelope /></a>
              <a href="https://www.instagram.com/saadnizami__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/saad-nizami-250ab0374/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </Reveal>
          <Reveal className="founder-body" delay={1}>
            <span className="eyebrow">Founder &amp; CEO</span>
            <h2 className="founder-name">Saad Nizami</h2>
            <p className="founder-quote">
              “I started Zaroorat because I watched good people give to causes that never reached anyone.
              We built the opposite — a platform where every rupee is proven, every story is real, and
              giving finally feels <em>certain</em>.”
            </p>
            <p className="founder-meta">Leading product, operations &amp; verification.</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Department ledger ---------- */}
      <section className="section ledger-section section-paper">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Departments</span>
            <h2 className="section-title">Working together for Pakistan</h2>
          </Reveal>

          <div className="ledger">
            {DEPARTMENTS.map((d, i) => (
              <Reveal as="div" className="ledger-row" key={d.name} delay={(i % 3) + 1}>
                <span className="ledger-index">0{i + 1}</span>
                <div className="ledger-main">
                  <h3 className="ledger-name">{d.name}</h3>
                  <span className="ledger-head">Led by {d.head}</span>
                </div>
                <div className="ledger-members">
                  {d.members.map((m) => (
                    <span className="ledger-chip" key={m}>
                      <span className="ledger-mini">{initials(m)}</span>{m}
                    </span>
                  ))}
                </div>
                <FiArrowUpRight className="ledger-arrow" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Culture ---------- */}
      <section className="section culture-section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">How we work</span>
            <h2 className="section-title">Three things we never compromise</h2>
          </Reveal>
          <div className="culture-grid">
            {VALUES.map((v, i) => (
              <Reveal className="culture-card" key={v.title} delay={(i % 3) + 1}>
                <span className="culture-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Join CTA ---------- */}
      <section className="cta-section">
        <div className="container">
          <Reveal className="cta-band">
            <span className="cta-glow" aria-hidden="true" />
            <div className="cta-content">
              <h2 className="cta-title">Want to build this with us?</h2>
              <p className="cta-sub">
                We’re always looking for people who care about doing things the honest way.
              </p>
              <div className="cta-actions">
                <Magnetic strength={0.4}>
                  <Link to="/contact" className="btn btn-light btn-lg">Get in touch <FiArrowUpRight /></Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurTeam;
