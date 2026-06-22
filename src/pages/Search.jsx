import { FiSearch } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Trending from "../components/Trending";
import CampaignCard from "../components/CampaignCard";
import Reveal from "../components/Reveal";
import { CampaignContext } from "../store/campaignStore";
import "../css/Search.css";

const Search = () => {
  const [funds, setFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { apiURL } = useContext(CampaignContext);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!query.trim()) {
        setFunds([]);
        return;
      }
      setIsLoading(true);
      try {
        const res = await axios.get(`${apiURL}/api/fund/fund-list?search=${query}`);
        if (res.data?.funds) setFunds(res.data.funds);
      } catch (error) {
        console.error("Error fetching fundraisers: ", error);
      } finally {
        setIsLoading(false);
      }
    }, 280);
    return () => clearTimeout(t);
  }, [query, apiURL]);

  return (
    <div className="page">
      <Navbar />
      <section className="search-hero">
        <div className="search-bg" aria-hidden="true"><span className="ph-blob" /></div>
        <div className="container search-hero-inner">
          <span className="eyebrow center">Find a cause</span>
          <h1>Search verified fundraisers</h1>
          <p>Connect with people across Pakistan and support the cause closest to your heart.</p>
          <div className="search-bar">
            <FiSearch className="search-bar-icon" />
            <input
              type="text"
              autoFocus
              placeholder="Try “medical”, “education”, “Lahore”…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <main className="listing">
        <div className="container">
          {query.trim() === "" ? (
            <p className="search-hint">Start typing to discover campaigns.</p>
          ) : isLoading ? (
            <div className="loading-screen"><div className="spinner" /></div>
          ) : funds.length === 0 ? (
            <div className="empty-state">
              <h3>No matches for “{query}”</h3>
              <p>Try a different keyword, city, or category.</p>
            </div>
          ) : (
            <>
              <p className="listing-count">
                {funds.length} result{funds.length !== 1 ? "s" : ""} for “{query}”
              </p>
              <div className="campaign-grid">
                {funds.map((f, i) => (
                  <Reveal key={f._id} delay={(i % 4) + 1}>
                    <CampaignCard fund={f} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {query.trim() === "" && <Trending />}
      <Footer />
    </div>
  );
};

export default Search;
