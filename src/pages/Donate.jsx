import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiShare2,
  FiHeart,
  FiShield,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonateModal from "../components/DonationPayment";
import { CampaignContext } from "../store/campaignStore";
import { formatPKR, progressPercent } from "../utils/format";
import { formatCategory } from "../utils/categories";
import "../css/Donate.css";

const Donate = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [fund, setFund] = useState(null);
  const [reports, setReports] = useState([]);
  const [supporters, setSupporters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  const [showReportForm, setShowReportForm] = useState(false);
  const [newReportDesc, setNewReportDesc] = useState("");
  const [newReportImage, setNewReportImage] = useState(null);

  const { id: fundId } = useParams();
  const { apiURL, user } = useContext(CampaignContext);
  const navigate = useNavigate();
  const shareUrl = window.location.href;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${apiURL}/api/fund/fund-list/${fundId}`);
        if (res.data) {
          const ownerId = res.data.fund?.userId?._id;
          if (user?._id && ownerId && user._id === ownerId) setIsAuthor(true);
          setFund(res.data.fund);
          setReports(res.data.reports || []);
        }
      } catch (error) {
        toast.error("Failed to load campaign details");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiURL, fundId, user]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${apiURL}/api/fund/donar-by-fundId/${fundId}`);
        setSupporters(res.data?.donars || res.data?.donations || res.data?.supporters || []);
      } catch {
        /* supporters are optional */
      }
    })();
  }, [apiURL, fundId]);

  const handleDonate = async (paymentData) => {
    try {
      setIsProcessing(true);
      const res = await axios.post(`${apiURL}/api/donar/donate`, paymentData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res) {
        toast.success(
          "Thank you for your donation! Your contribution will be reflected once our team verifies the payment.",
          { duration: 5000 }
        );
        setModalOpen(false);
        setTimeout(() => navigate("/"), 4000);
      }
    } catch (error) {
      toast.error("Donation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: fund?.fundraiseTitle,
      text: `Support "${fund?.fundraiseTitle}" on Zaroorat — Pakistan's trusted crowdfunding platform.`,
      url: shareUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fundId", fundId);
    formData.append("description", newReportDesc);
    formData.append("image", newReportImage);
    setIsProcessing(true);
    try {
      const res = await axios.post(`${apiURL}/api/fund/fund-report`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data) {
        toast.success("Update posted!");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to post update.");
    } finally {
      setIsProcessing(false);
      setNewReportDesc("");
      setNewReportImage(null);
      setShowReportForm(false);
    }
  };

  const raised = fund?.donationAmount || 0;
  const goal = fund?.totalAmountRaised || 0;
  const pct = progressPercent(raised, goal);
  const organizer = fund?.userId;

  if (isLoading) {
    return (
      <div className="page">
        <Navbar />
        <div className="loading-screen"><div className="spinner" /></div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <main className="donate">
        <div className="container donate-grid">
          {/* ---------- Main column ---------- */}
          <article className="donate-main">
            <div className="donate-cover-wrap">
              <img src={fund?.coverImage} alt={fund?.fundraiseTitle} className="donate-cover" />
              {fund?.fundCategory && (
                <span className="donate-cat">{formatCategory(fund.fundCategory)}</span>
              )}
            </div>

            <div className="donate-head">
              {(fund?.cityName || fund?.country) && (
                <span className="donate-loc">
                  <FiMapPin /> {[fund?.cityName, fund?.country].filter(Boolean).join(", ")}
                </span>
              )}
              <h1 className="donate-title">{fund?.fundraiseTitle}</h1>
              {organizer?.fullName && (
                <div className="donate-organizer">
                  <span className="org-avatar">
                    {organizer.profilePhoto ? (
                      <img src={organizer.profilePhoto} alt={organizer.fullName} />
                    ) : (
                      organizer.fullName.charAt(0)
                    )}
                  </span>
                  <span>
                    Organised by <strong>{organizer.fullName}</strong>
                    {organizer.cityName ? ` · ${organizer.cityName}` : ""}
                  </span>
                </div>
              )}
            </div>

            <div className="donate-story">
              <h2>About this fundraiser</h2>
              <p>{fund?.fundraiseStory}</p>
            </div>

            {/* Author: post an update */}
            {isAuthor && (
              <div className="donate-author-box">
                <div className="author-box-head">
                  <h3><FiFileText /> Campaign owner tools</h3>
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowReportForm((s) => !s)}>
                    {showReportForm ? "Cancel" : "Post an update"}
                  </button>
                </div>
                {showReportForm && (
                  <form className="report-form" onSubmit={handleReportSubmit}>
                    <textarea
                      className="textarea"
                      required
                      placeholder="Share progress with your donors…"
                      value={newReportDesc}
                      onChange={(e) => setNewReportDesc(e.target.value)}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="file-pretty"
                      onChange={(e) => setNewReportImage(e.target.files[0])}
                    />
                    <button type="submit" className="btn btn-primary" disabled={isProcessing}>
                      {isProcessing ? "Posting…" : "Publish update"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Updates / reports */}
            {reports.length > 0 && (
              <div className="donate-updates">
                <h2>Updates from the organizer</h2>
                <div className="updates-list">
                  {reports.map((r, i) => (
                    <div key={i} className="update-item">
                      <div className="update-dot" />
                      <div className="update-body">
                        <p>{r.description}</p>
                        {r.image && <img src={r.image} alt="Update" loading="lazy" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Supporters */}
            {supporters.length > 0 && (
              <div className="donate-supporters">
                <h2><FiUsers /> Recent supporters</h2>
                <div className="supporters-list">
                  {supporters.slice(0, 8).map((s, i) => (
                    <div className="supporter-row" key={i}>
                      <span className="supporter-avatar">{(s.fullName || "A").charAt(0)}</span>
                      <span className="supporter-name">{s.fullName || "Anonymous"}</span>
                      {s.amount != null && (
                        <span className="supporter-amount">{formatPKR(s.amount)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ---------- Sticky donation aside ---------- */}
          <aside className="donate-aside">
            <div className="donate-card">
              <div className="donate-raised">{formatPKR(raised)}</div>
              <div className="donate-of">
                raised of {formatPKR(goal)} goal
              </div>
              <div className="progress donate-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="donate-stats">
                <span><strong>{pct}%</strong> funded</span>
                {typeof fund?.donationCount === "number" && (
                  <span><strong>{fund.donationCount}</strong> donations</span>
                )}
              </div>

              <button className="btn btn-primary btn-block btn-lg donate-primary" onClick={() => setModalOpen(true)}>
                <FiHeart /> Donate Now
              </button>
              <button className="btn btn-ghost btn-block donate-share" onClick={handleShare}>
                <FiShare2 /> Share this campaign
              </button>

              <div className="donate-assurance">
                <FiShield /> Donations are verified by the Zaroorat team before they're counted.
              </div>
            </div>

            <div className="donate-trust">
              <div className="trust-row"><FiCheckCircle /> Reviewed & approved campaign</div>
              <div className="trust-row"><FiClock /> Funds released after verification</div>
              <div className="trust-row"><FiUsers /> Backed by {supporters.length || fund?.donationCount || 0}+ supporters</div>
            </div>
          </aside>
        </div>
      </main>

      <DonateModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDonate={handleDonate}
        fund={fund}
        isProcessing={isProcessing}
      />
      <Footer />
    </div>
  );
};

export default Donate;
