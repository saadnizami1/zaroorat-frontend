import { FiAward } from "react-icons/fi";
import Reveal from "../Reveal";

const Recognition = () => {
  return (
    <section className="section recognition-section">
      <div className="container">
        <Reveal className="recognition-card">
          <div className="recognition-seal">
            <FiAward />
          </div>
          <div className="recognition-body">
            <span className="recognition-eyebrow">Official Recognition</span>
            <h2 className="recognition-title">
              Recognised by the Office of the Chief Minister of Punjab
            </h2>
            <p className="recognition-quote">
              “Done transparently, zakat is the most efficient redistribution our economy has.”
            </p>
            <div className="recognition-sign">
              <span className="recognition-name">Maryam Nawaz Sharif</span>
              <span className="recognition-role">Chief Minister, Government of Punjab</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Recognition;
