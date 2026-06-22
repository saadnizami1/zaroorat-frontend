import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowRight as FiR } from "react-icons/fi";
import useScrollProgress from "../../hooks/useScrollProgress";

const PANELS = [
  { kind: "intro", eyebrow: "The Zaroorat difference", title: "Giving, made certain.", body: "Scroll across the reasons Pakistanis trust us with what matters most." },
  { kind: "stat", value: "PKR 14M", label: "Raised for verified causes", note: "Every rupee tracked, every case reviewed." },
  { kind: "stat", value: "60+", label: "Families directly helped", note: "Real people, personally verified — not a statistic." },
  { kind: "stat", value: "55+", label: "Verified campaigns funded", note: "Each one reviewed by our team before it goes live." },
  { kind: "stat", value: "100%", label: "Payments manually verified", note: "No donation counts until our team confirms it." },
  { kind: "outro", title: "This is Zaroorat.", body: "Transparent by design. Built for Pakistan.", cta: true },
];

const HorizontalShowcase = () => {
  const [pinRef, progress] = useScrollProgress();
  const trackRef = useRef(null);
  const [maxX, setMaxX] = useState(0);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setMaxX(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  const x = pinned ? -(progress * maxX) : 0;

  return (
    <section
      className="hshow"
      ref={pinRef}
      style={pinned ? { height: `${maxX + window.innerHeight}px` } : undefined}
    >
      <div className="hshow-sticky">
        <div
          className={`hshow-track ${pinned ? "pinned" : "swipe"}`}
          ref={trackRef}
          style={pinned ? { transform: `translate3d(${x}px,0,0)` } : undefined}
        >
          {PANELS.map((p, i) => (
            <article key={i} className={`hpanel hpanel-${p.kind}`}>
              {p.kind === "intro" && (
                <>
                  <span className="eyebrow">{p.eyebrow}</span>
                  <h2 className="hpanel-title">{p.title}</h2>
                  <p className="hpanel-body">{p.body}</p>
                  <span className="hpanel-hint">Scroll <FiR /></span>
                </>
              )}
              {p.kind === "stat" && (
                <>
                  <span className="hpanel-index">0{i}</span>
                  <div className="hpanel-value gradient-text">{p.value}</div>
                  <div className="hpanel-label">{p.label}</div>
                  <p className="hpanel-note">{p.note}</p>
                </>
              )}
              {p.kind === "outro" && (
                <>
                  <h2 className="hpanel-title gradient-text">{p.title}</h2>
                  <p className="hpanel-body">{p.body}</p>
                  {p.cta && (
                    <Link to="/fundraisers" className="btn btn-primary btn-lg">
                      Explore Causes <FiArrowRight />
                    </Link>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalShowcase;
