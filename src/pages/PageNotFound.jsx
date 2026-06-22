import { Link } from "react-router-dom";
import { FiHome, FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Pages.css";

const PageNotFound = () => {
  return (
    <div className="page">
      <Navbar />
      <main className="notfound">
        <div>
          <div className="notfound-code">404</div>
          <h2>This page took a detour</h2>
          <p>The page you're looking for doesn't exist or may have moved. Let's get you back to doing good.</p>
          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" className="btn btn-primary"><FiHome /> Back home</Link>
            <Link to="/fundraisers" className="btn btn-ghost"><FiSearch /> Browse campaigns</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageNotFound;
