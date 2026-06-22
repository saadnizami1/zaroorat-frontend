import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import CampaignCard from "../components/CampaignCard";
import Reveal from "../components/Reveal";
import { CampaignContext } from "../store/campaignStore";
import "../css/Fundraisers.css";

const MyFunds = () => {
  const [funds, setFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { apiURL, user } = useContext(CampaignContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/signin");
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${apiURL}/api/user/my-funds`, { withCredentials: true });
        if (res.data) setFunds(res.data.createdFunds || []);
      } catch (err) {
        console.error("Error fetching my funds:", err);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteFund = async (fundId) => {
    try {
      const res = await axios.delete(`${apiURL}/api/fund/fund-list/${fundId}`, { withCredentials: true });
      if (res.data) setFunds((prev) => prev.filter((f) => f._id !== fundId));
    } catch (error) {
      console.log("Cannot delete due to error : ", error);
    }
  };

  const closeFund = async (fundId) => {
    try {
      const res = await axios.put(`${apiURL}/api/fund/fund-list/${fundId}/close`, {}, { withCredentials: true });
      if (res.data?.fund) setFunds((prev) => prev.map((f) => (f._id === fundId ? res.data.fund : f)));
    } catch (error) {
      console.log("Cannot close due to error : ", error);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <PageHero
        eyebrow="Your dashboard"
        title="My Fundraisers"
        subtitle="Track, update, and manage every campaign you've created."
      >
        <Link to="/campaign" className="btn btn-primary"><FiPlus /> Start a Fundraiser</Link>
      </PageHero>

      <main className="listing">
        <div className="container">
          {isLoading ? (
            <div className="loading-screen"><div className="spinner" /></div>
          ) : funds.length === 0 ? (
            <div className="empty-state">
              <h3>You haven't created any fundraisers yet</h3>
              <p>Launch your first campaign and start gathering support today.</p>
              <Link to="/campaign" className="btn btn-primary" style={{ marginTop: "1.4rem" }}>
                Start a Fundraiser
              </Link>
            </div>
          ) : (
            <div className="campaign-grid">
              {funds.map((f, i) => {
                const status = f.status || (f.isApproved ? "active" : "pending");
                return (
                  <Reveal key={f._id} delay={(i % 4) + 1}>
                    <CampaignCard
                      fund={f}
                      topRight={
                        <button
                          className="card-delete-btn"
                          aria-label="Delete campaign"
                          onClick={() => {
                            if (window.confirm(`Delete "${f.fundraiseTitle}"? This cannot be undone.`))
                              deleteFund(f._id);
                          }}
                        >
                          <AiFillDelete />
                        </button>
                      }
                      footer={
                        <>
                          <span className={`status-badge status-${status}`}>{status}</span>
                          {status !== "closed" && (
                            <button
                              className="close-fund-btn"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Close "${f.fundraiseTitle}"? It will stop accepting donations and be removed from public listings.`
                                  )
                                )
                                  closeFund(f._id);
                              }}
                            >
                              Close
                            </button>
                          )}
                        </>
                      }
                    />
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyFunds;
