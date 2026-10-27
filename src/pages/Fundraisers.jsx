import { Link, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import CampaignCard from "../components/CampaignCard";
import Reveal from "../components/Reveal";
import { CampaignContext } from "../store/campaignStore";
import { formatCategory } from "../utils/categories";
import { readCache, writeCache } from "../utils/sessionCache";
import { errorMessage } from "../utils/axios";
import "../css/Fundraisers.css";

const CACHE_KEY = "funds:";

const Fundraisers = () => {
  const [allFunds, setAllFunds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;
  const { apiURL, user } = useContext(CampaignContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const { category } = useParams();
  const query = category || "";

  // Fetch every live campaign once; categories are filtered locally so
  // switching between them is instant.
  useEffect(() => {
    const cached = readCache(CACHE_KEY);
    if (cached) {
      setAllFunds(cached);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    setLoadError("");
    (async () => {
      try {
        const res = await axios.get(`${apiURL}/api/fund/fund-list?search=`);
        // Anything but the JSON list (e.g. an HTML error page) counts as a failure.
        if (!Array.isArray(res.data?.funds)) throw new Error("Unexpected response");
        setAllFunds(res.data.funds);
        writeCache(CACHE_KEY, res.data.funds);
      } catch (error) {
        console.error("Error fetching fundraisers: ", error);
        if (!cached) setLoadError(errorMessage(error));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiURL, reloadKey]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Exact category match. (The search API also matches titles, so "other"
  // would pull in "Help my mother…".)
  const funds = useMemo(
    () =>
      query
        ? allFunds.filter((f) => (f.fundCategory || "").toLowerCase() === query.toLowerCase())
        : allFunds,
    [allFunds, query]
  );

  const totalPages = Math.ceil(funds.length / perPage);
  const startIdx = (currentPage - 1) * perPage;
  const currentFunds = funds.slice(startIdx, startIdx + perPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteFund = async (fundId) => {
    try {
      const res = await axios.delete(`${apiURL}/api/admin/fund-raise/${fundId}`, {
        withCredentials: true,
      });
      if (res.data) {
        const remaining = allFunds.filter((f) => f._id !== fundId);
        setAllFunds(remaining);
        writeCache(CACHE_KEY, remaining);
        toast.success("Campaign deleted.");
      }
    } catch (error) {
      toast.error(errorMessage(error, "Couldn't delete the campaign."));
    }
  };

  return (
    <div className="page">
      <Navbar />
      <PageHero
        eyebrow={query ? "Category" : "Browse"}
        title={query ? `${formatCategory(query)} Fundraisers` : "Active Fundraisers"}
        subtitle={
          query
            ? `Verified ${formatCategory(query).toLowerCase()} campaigns that need your support today.`
            : "Every campaign here has been reviewed and approved. Find a cause and make a difference."
        }
      />

      <main className="listing">
        <div className="container">
          {isLoading ? (
            <div className="campaign-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div className="ccard" key={i}>
                  <div className="skeleton" style={{ aspectRatio: "16/11" }} />
                  <div className="ccard-body">
                    <div className="skeleton" style={{ height: 18, width: "85%" }} />
                    <div className="skeleton" style={{ height: 9, width: "100%", marginTop: 14 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : loadError ? (
            <div className="empty-state">
              <h3>We couldn't load fundraisers</h3>
              <p>{loadError}</p>
              <button
                className="btn btn-primary"
                style={{ marginTop: "1.4rem" }}
                onClick={() => setReloadKey((k) => k + 1)}
              >
                Try again
              </button>
            </div>
          ) : funds.length === 0 ? (
            <div className="empty-state">
              <h3>No fundraisers here yet</h3>
              <p>There are no active campaigns in this view right now. Check back soon.</p>
              {query && (
                <Link to="/fundraisers" className="btn btn-ghost" style={{ marginTop: "1.4rem" }}>
                  Browse all fundraisers
                </Link>
              )}
            </div>
          ) : (
            <>
              <p className="listing-count">{funds.length} active campaign{funds.length !== 1 ? "s" : ""}</p>
              <div className="campaign-grid">
                {currentFunds.map((f, i) => (
                  <Reveal key={f._id} delay={(i % 4) + 1}>
                    <CampaignCard
                      fund={f}
                      topRight={
                        user?.role === "admin" ? (
                          <button
                            className="card-delete-btn"
                            aria-label="Delete campaign"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Delete the fundraiser "${f.fundraiseTitle}"? This cannot be undone.`
                                )
                              )
                                deleteFund(f._id);
                            }}
                          >
                            <AiFillDelete />
                          </button>
                        ) : null
                      }
                    />
                  </Reveal>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button className="page-button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      className={`page-button ${currentPage === idx + 1 ? "active" : ""}`}
                      onClick={() => goToPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    className="page-button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Fundraisers;
