import { FiSearch } from "react-icons/fi";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Trending from "../components/Trending";
import CampaignCard from "../components/CampaignCard";
import Reveal from "../components/Reveal";
import { CampaignContext } from "../store/campaignStore";
import { formatCategory } from "../utils/categories";
import { readCache, writeCache } from "../utils/sessionCache";
import { errorMessage } from "../utils/axios";
import "../css/Search.css";
import "../css/Fundraisers.css";

const CACHE_KEY = "funds:";

// Everything a visitor might type: title, category, city, organiser.
const haystack = (f) =>
  [f.fundraiseTitle, f.fundCategory, formatCategory(f.fundCategory), f.cityName, f.country, f.userId?.fullName]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const Search = () => {
  const [allFunds, setAllFunds] = useState(() => readCache(CACHE_KEY) || []);
  const [isLoading, setIsLoading] = useState(() => !readCache(CACHE_KEY));
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const { apiURL } = useContext(CampaignContext);

  // Load the live campaign list once, then search it locally — instant results
  // and it can match cities ("Lahore"), which the API search can't.
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${apiURL}/api/fund/fund-list?search=`);
        if (!Array.isArray(res.data?.funds)) throw new Error("Unexpected response");
        setAllFunds(res.data.funds);
        writeCache(CACHE_KEY, res.data.funds);
      } catch (error) {
        console.error("Error fetching fundraisers: ", error);
        setLoadError(errorMessage(error));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiURL]);

  const funds = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return allFunds.filter((f) => {
      const text = haystack(f);
      return words.every((w) => text.includes(w));
    });
  }, [allFunds, query]);

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
          ) : loadError && allFunds.length === 0 ? (
            <div className="empty-state">
              <h3>Search is unavailable right now</h3>
              <p>{loadError}</p>
            </div>
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
