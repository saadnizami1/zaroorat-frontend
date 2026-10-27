import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { CampaignContext } from "../store/campaignStore";
import CampaignCard from "./CampaignCard";
import { readCache, writeCache } from "../utils/sessionCache";
import "../css/Trending.css";

const Trending = () => {
  const [funds, setFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const { apiURL } = useContext(CampaignContext);

  useEffect(() => {
    const cached = readCache("funds:trending");
    if (cached) {
      setFunds(cached);
      setIsLoading(false);
    }
    setFailed(false);
    (async () => {
      try {
        const res = await axios.get(`${apiURL}/api/fund/trending`, { withCredentials: true });
        if (!Array.isArray(res.data?.trendingFunds)) throw new Error("Unexpected response");
        const fresh = res.data.trendingFunds;
        setFunds(fresh);
        writeCache("funds:trending", fresh);
      } catch (err) {
        console.error("Error fetching trending funds:", err);
        if (!cached) setFailed(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiURL, reloadKey]);

  return (
    <section className="section trending-section">
      <div className="container">
        <div className="trending-head">
          <div className="section-head">
            <span className="eyebrow">Trending now</span>
            <h2 className="section-title">Causes the community is rallying behind</h2>
          </div>
          <Link to="/fundraisers" className="btn btn-ghost btn-sm trending-all">
            View all <FiArrowRight />
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="container">
          <div className="trending-rail">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="rail-item" key={i}>
                <div className="ccard">
                  <div className="skeleton" style={{ aspectRatio: "16/11" }} />
                  <div className="ccard-body">
                    <div className="skeleton" style={{ height: 18, width: "85%" }} />
                    <div className="skeleton" style={{ height: 4, width: "100%", marginTop: 16 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : failed ? (
        <div className="container">
          <p className="no-funds">
            Campaigns couldn't load just now.{" "}
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setReloadKey((k) => k + 1)}>
              Try again
            </button>
          </p>
        </div>
      ) : funds.length === 0 ? (
        <div className="container"><p className="no-funds">No trending campaigns yet — be the first to start one.</p></div>
      ) : (
        <div className="trending-rail-wrap">
          <div className="trending-rail">
            {funds.slice(0, 10).map((f) => (
              <div className="rail-item" key={f._id}>
                <CampaignCard fund={f} />
              </div>
            ))}
            <Link to="/fundraisers" className="rail-item rail-cta">
              <span>View all<br />fundraisers</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Trending;
