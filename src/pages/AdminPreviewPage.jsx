import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheck, FiX, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CampaignContext } from "../store/campaignStore";
import { formatPKR, progressPercent } from "../utils/format";
import { formatCategory } from "../utils/categories";
import "../css/Dashboard.css";

const AdminCampaignPreview = () => {
  const { apiURL, user } = useContext(CampaignContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const campaign = state?.campaign;
  const [processing, setProcessing] = useState(false);

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }
  if (!campaign) {
    return (
      <div className="page">
        <Navbar />
        <div className="loading-screen">No campaign data passed. Open a campaign from the dashboard.</div>
        <Footer />
      </div>
    );
  }

  const {
    _id: id, fundraiseTitle, userId, coverImage, fundraiseStory, fundCategory,
    donationAmount = 0, totalAmountRaised = 0, accountHolderName, accountNumber, bankName, ifscCode,
    cityName, country,
  } = campaign;
  const { fullName, email, phone, cityName: userCity, cnicImage } = userId || {};
  const pct = progressPercent(donationAmount, totalAmountRaised);

  const handleDecision = async (approve) => {
    setProcessing(true);
    try {
      if (approve) {
        await axios.put(`${apiURL}/api/admin/fund-raise/approve-fund/${id}`, {}, { withCredentials: true });
        toast.success("Campaign approved!");
      } else {
        await axios.delete(`${apiURL}/api/admin/fund-raise/reject-fund/${id}`, { withCredentials: true });
        toast.success("Campaign rejected.");
      }
      setTimeout(() => navigate("/admin-dashboard"), 800);
    } catch (err) {
      toast.error("Action failed.");
      setProcessing(false);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <main className="preview-page">
        <div className="container">
          <button className="auth-back" onClick={() => navigate("/admin-dashboard")} style={{ position: "static", marginBottom: "1.5rem" }}>
            <FiArrowLeft /> Back to dashboard
          </button>

          <div className="preview-grid">
            <div className="preview-main">
              <div className="preview-cover">
                <img src={coverImage} alt={fundraiseTitle} />
                {fundCategory && <span className="donate-cat">{formatCategory(fundCategory)}</span>}
              </div>
              <h1 className="preview-title">{fundraiseTitle}</h1>
              {(cityName || country) && (
                <p className="preview-loc">{[cityName, country].filter(Boolean).join(", ")}</p>
              )}
              <p className="preview-story">{fundraiseStory}</p>
            </div>

            <aside className="preview-aside">
              <div className="preview-card">
                <div className="preview-raised">{formatPKR(donationAmount)}</div>
                <div className="donate-of">goal {formatPKR(totalAmountRaised)}</div>
                <div className="progress" style={{ margin: "0.8rem 0" }}>
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>

                <h3 className="preview-h3">Fundraiser</h3>
                <ul className="preview-list">
                  <li><span>Name</span><strong>{fullName}</strong></li>
                  <li><span>Email</span><strong>{email}</strong></li>
                  {phone && <li><span>Phone</span><strong>{phone}</strong></li>}
                  {(userCity || cityName) && <li><span>City</span><strong>{userCity || cityName}</strong></li>}
                </ul>

                <h3 className="preview-h3">Payout details</h3>
                <ul className="preview-list">
                  <li><span>Holder</span><strong>{accountHolderName}</strong></li>
                  <li><span>Account</span><strong>{accountNumber}</strong></li>
                  <li><span>Bank</span><strong>{bankName}</strong></li>
                  <li><span>IBAN</span><strong>{ifscCode}</strong></li>
                </ul>

                {cnicImage && (
                  <>
                    <h3 className="preview-h3">CNIC</h3>
                    <img src={cnicImage} alt="CNIC" className="preview-cnic" />
                  </>
                )}

                <div className="preview-actions">
                  <button className="btn btn-primary" disabled={processing} onClick={() => handleDecision(true)}>
                    <FiCheck /> Approve
                  </button>
                  <button className="btn btn-ghost danger-btn" disabled={processing} onClick={() => handleDecision(false)}>
                    <FiX /> Reject
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminCampaignPreview;
