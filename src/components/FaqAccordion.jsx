import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import "../css/FaqAccordion.css";

const FaqAccordion = ({ items = [], allowMultiple = false }) => {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (i) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="faq-accordion">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div className={`faq-item ${isOpen ? "open" : ""}`} key={i}>
            <button
              className="faq-q"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <FiPlus className="faq-icon" />
            </button>
            <div className="faq-a-wrap">
              <div className="faq-a">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
