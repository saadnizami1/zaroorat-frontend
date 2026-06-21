import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Fundraisers.css";
import "../css/MyFunds.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { CampaignContext } from "../store/campaignStore";
import { AiFillDelete } from "react-icons/ai";

const MyFunds = () => {
  const [funds, setFunds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { apiURL, user } = useContext(CampaignContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/signin");
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${apiURL}/api/user/my-funds`, {
          withCredentials: true,
        });

        if (res.data) {
          // console.log(res.data);
          setFunds(res.data.createdFunds || []);
        }
      } catch (err) {
        console.error("Error fetching my funds:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
      setIsDeleting(true);
      const res = await axios.delete(`${apiURL}/api/fund/fund-list/${fundId}`, {
        withCredentials: true,
      });

      if (res.data) {
        setFunds((prev) => prev.filter((f) => f._id != fundId));
      }
    } catch (error) {
      console.log("Cannot delete due to error : ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const closeFund = async (fundId) => {
    try {
      const res = await axios.put(
        `${apiURL}/api/fund/fund-list/${fundId}/close`,
        {},
        { withCredentials: true }
      );

      if (res.data?.fund) {
        setFunds((prev) =>
          prev.map((f) => (f._id === fundId ? res.data.fund : f))
        );
      }
    } catch (error) {
      console.log("Cannot close due to error : ", error);
    }
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <p className="loading-screen">Loading...</p>
      ) : (
        <div className="fundraisers-page">
          <h1>My Fundraisers</h1>

          {funds.length === 0 ? (
            <p className="no-funds">You haven't created any fundraisers yet.</p>
          ) : (
            <>
              <div className="fundraiser-grid">
                {currentFunds.map((f) => (
                  <div key={f._id} className="fundraiser-card">
                    <AiFillDelete
                      className="delete-icon"
                      disabled={isDeleting}
                      onClick={() => {
                        const ok = window.confirm(
                          `Are you sure you want to delete the fundraiser "${f.fundraiseTitle}"? This action cannot be undone.`
                        );
                        if (ok) deleteFund(f._id);
                      }}
                    />

                    <Link to={`/donate/${f._id}`}>
                      <div
                        className="card-image"
                        style={{ backgroundImage: `url(${f.coverImage})` }}
                      />
                      <div className="card-title">{f.fundraiseTitle}</div>
                    </Link>

                    <div className="card-meta">
                      <span className={`status-badge status-${f.status || "pending"}`}>
                        {f.status || "pending"}
                      </span>
                      {f.status !== "closed" && (
                        <button
                          type="button"
                          className="close-fund-btn"
                          onClick={() => {
                            const ok = window.confirm(
                              `Close the fundraiser "${f.fundraiseTitle}"? It will stop accepting donations and be removed from public listings.`
                            );
                            if (ok) closeFund(f._id);
                          }}
                        >
                          Close
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      className={`page-button ${
                        currentPage === idx + 1 ? "active" : ""
                      }`}
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
      )}
      <Footer />
    </>
  );
};

export default MyFunds;
