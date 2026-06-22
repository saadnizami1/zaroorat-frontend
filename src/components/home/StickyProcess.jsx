import { useEffect, useRef, useState } from "react";
import { FiSearch, FiUploadCloud, FiShield } from "react-icons/fi";

const STEPS = [
  {
    icon: <FiSearch />,
    title: "Start or find a cause",
    desc: "Launch your own fundraiser in minutes, or browse hundreds of verified campaigns for the cause closest to your heart.",
  },
  {
    icon: <FiUploadCloud />,
    title: "Give & upload your receipt",
    desc: "Transfer to our secure, verified Zaroorat account and upload your payment screenshot. No cards, no middlemen.",
  },
  {
    icon: <FiShield />,
    title: "We verify & deliver",
    desc: "Our team manually verifies every payment before it counts, then funds reach the campaigner — fully transparent.",
  },
];

const StickyProcess = () => {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.idx));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section sticky-process">
      <div className="container sproc-grid">
        {/* Sticky left */}
        <div className="sproc-pin">
          <span className="eyebrow">How it works</span>
          <div className="sproc-stage">
            <span className="sproc-index gradient-text" key={active}>0{active + 1}</span>
            <div className="sproc-stage-icon">{STEPS[active].icon}</div>
            <h2 className="sproc-stage-title">{STEPS[active].title}</h2>
          </div>
          <div className="sproc-dots">
            {STEPS.map((_, i) => (
              <span key={i} className={`sproc-dot ${i === active ? "on" : ""} ${i < active ? "done" : ""}`} />
            ))}
          </div>
        </div>

        {/* Scrolling steps */}
        <div className="sproc-steps">
          {STEPS.map((s, i) => (
            <div
              key={i}
              data-idx={i}
              ref={(el) => (stepRefs.current[i] = el)}
              className={`sproc-step ${i === active ? "active" : ""}`}
            >
              <span className="sproc-step-num">0{i + 1}</span>
              <div className="sproc-step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StickyProcess;
