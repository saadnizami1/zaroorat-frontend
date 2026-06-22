import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import useLiveTotal from "../../hooks/useLiveTotal";
import useInView from "../../hooks/useInView";
import Magnetic from "../Magnetic";
import { formatPKR } from "../../utils/format";

const GOAL = 18_000_000;

const TITLE = [
  { t: "Every" },
  { t: "zaroorat", accent: true },
  { t: "deserves" },
  { t: "a" },
  { t: "chance.", break: true },
];

const Hero = () => {
  const { total, bumped } = useLiveTotal({ base: 13_900_000, min: 400, max: 1600, interval: 4000 });
  const pct = Math.min(100, Math.round((total / GOAL) * 100));
  const [titleRef, titleIn] = useInView({ threshold: 0.3 });
  const aetherRef = useRef(null);

  // mouse-reactive parallax depth
  useEffect(() => {
    const el = aetherRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="hero">
      <div className="hero-aether" ref={aetherRef} aria-hidden="true">
        <span className="bgword hero-bgword">zaroorat</span>
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
        <span className="hero-grid" />
      </div>

      <div className="container hero-inner">
        <span className="eyebrow center hero-eyebrow">Pakistan · Crowdfunding, reimagined</span>

        <h1 ref={titleRef} className={`hero-title word-reveal ${titleIn ? "in" : ""}`}>
          {TITLE.map((w, i) => (
            <span key={i} className="w" style={{ transitionDelay: `${i * 0.07}s` }}>
              {w.break ? <br className="hero-br" /> : null}
              <span className={w.accent ? "hero-accent" : undefined}>{w.t}</span>{" "}
            </span>
          ))}
        </h1>

        <p className="hero-lead">
          A radically transparent platform where every campaign is verified and every rupee is
          accounted for. Raise funds, or give to medical, education and emergency causes across Pakistan.
        </p>

        <div className="hero-cta">
          <Magnetic strength={0.4}>
            <Link to="/campaign" className="btn btn-primary btn-lg">
              Start a Fundraiser <FiArrowRight />
            </Link>
          </Magnetic>
          <Magnetic strength={0.4}>
            <Link to="/fundraisers" className="btn btn-ghost btn-lg">
              Explore Causes
            </Link>
          </Magnetic>
        </div>

        <div className={`hero-console glass ${bumped ? "bump" : ""}`}>
          <div className="console-line" style={{ width: `${pct}%` }} />
          <div className="console-cell console-live">
            <span className="console-label">
              <span className="live-dot" /> Raised to date
            </span>
            <span className="console-value">{formatPKR(total)}</span>
          </div>
          <div className="console-cell">
            <span className="console-label">Donors</span>
            <span className="console-value">850+</span>
          </div>
          <div className="console-cell">
            <span className="console-label">Families helped</span>
            <span className="console-value">60+</span>
          </div>
          <div className="console-cell">
            <span className="console-label">Cases verified</span>
            <span className="console-value">100%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
