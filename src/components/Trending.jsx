import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { CampaignContext } from "../store/campaignStore";
import CampaignCard from "./CampaignCard";
import "../css/Trending.css";

const Trending = () => {
  const [funds, setFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { apiURL } = useContext(CampaignContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${apiURL}/api/fund/trending`, { withCredentials: true });
        setFunds(res.data.trendingFunds || []);
      } catch (err) {
        console.error("Error fetching trending funds:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiURL]);

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
