import { useContext, useEffect, useState } from "react";
import "../css/Dashboard.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { CampaignContext } from "../store/campaignStore";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [loadingApproveCampaigns, setLoadingApproveCampaigns] = useState([]);
  const [loadingRejectCampaigns, setLoadingRejectCampaigns] = useState([]);
  const [loadingApproveDeactivations, setLoadingApproveDeactivations] =
    useState([]);
  const [loadingRejectDeactivations, setLoadingRejectDeactivations] = useState(
    []
  );
  // ✅ ADD THESE 3 NEW STATES
  const [loadingVerifyDonations, setLoadingVerifyDonations] = useState([]);
  const [loadingRejectDonations, setLoadingRejectDonations] = useState([]);

  const { user, apiURL } = useContext(CampaignContext);
  const navigate = useNavigate();

  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [pendingDeactivations, setPendingDeactivations] = useState([]);
  const [pendingDonations, setPendingDonations] = useState([]); // ✅ ADD THIS

  //Fetching Data on Page Render
  useEffect(() => {
    if (!user || user?.role !== "admin") return navigate("/");

    //Fetching Pending Accounts Deactivation
    const fetchPendingDeactivations = async () => {
      try {
        const res = await axios.get(
          `${apiURL}/api/admin/account-deletion/pending-requests`,
          { withCredentials: true }
        );

        if (res.data) {
          // console.log(res.data);
          const requests = res.data.requests.filter(
            (c) => c.status === "pending"
          );
          setPendingDeactivations(requests);
        }
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
      }
    };

    fetchPendingDeactivations();

    //Fetching Pending Campaigns for Approval
    const fetchPendingCampaigns = async () => {
      try {
        const res = await axios.get(
          `${apiURL}/api/admin/fund-raise/pending-funds`,
          { withCredentials: true }
        );

        if (res.data) {
          console.log(res.data);
          const requests = res.data.pendingFunds.filter((c) => !c.isApproved);
          setPendingCampaigns(requests);
        }
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
      }
    };

    fetchPendingCampaigns();

    // ✅ ADD THIS NEW FUNCTION
    //Fetching Pending Donations for Verification
    const fetchPendingDonations = async () => {
      try {
        const res = await axios.get(
          `${apiURL}/api/admin/donations/pending`,
          { withCredentials: true }
        );

        if (res.data) {
          console.log(res.data);
          setPendingDonations(res.data.pendingDonations);
        }
      } catch (error) {
        console.log("Error fetching pending donations:", error);
      }
    };

    fetchPendingDonations(); // ✅ ADD THIS CALL
  }, []);

  //Handling Approval & Rejection of Campaigns
  const handleApproveCampaign = (acc) => {
    const approveCampaign = async () => {
      setLoadingApproveCampaigns((prev) => [...prev, acc._id]);
      try {
        const res = await axios.put(
          `${apiURL}/api/admin/fund-raise/approve-fund/${acc._id}`,
          {},
          { withCredentials: true }
        );

        if (res.data) {
          // console.log(res.data);
          setPendingCampaigns((cs) => cs.filter((c) => c._id !== acc._id));
          toast.success("Campaign approved!");
          // console.log('Approved campaign', acc._id);
        }
        setLoadingApproveCampaigns((prev) =>
          prev.filter((id) => id !== acc._id)
        );
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
        toast.error("Failed to approve campaign.");
      }
    };

    approveCampaign();
  };
  const handleRejectCampaign = (acc) => {
    const rejectCampaign = async () => {
      setLoadingRejectCampaigns((prev) => [...prev, acc._id]);
      try {
        const res = await axios.delete(
          `${apiURL}/api/admin/fund-raise/reject-fund/${acc._id}`,
          { withCredentials: true }
        );

        if (res.data) {
          // console.log(res.data);
          setPendingCampaigns((cs) => cs.filter((c) => c._id !== acc._id));
          toast.success("Campaign rejected.");
          // console.log('Rejected campaign', acc._id);
        }
        setLoadingRejectCampaigns((prev) =>
          prev.filter((id) => id !== acc._id)
        );
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
        toast.error("Failed to reject campaign.");
      }
    };

    rejectCampaign();
  };

  //Handling Approval & Rejection of Account Deactivations
  const handleApproveDeactivation = (acc) => {
    const approveDeactivation = async () => {
      setLoadingApproveDeactivations((prev) => [...prev, acc._id]);
      try {
        const res = await axios.put(
          `${apiURL}/api/admin/account-deletion/approve/${acc._id}`,
          {},
          { withCredentials: true }
        );

        if (res.data) {
          // console.log(res.data);
          setPendingDeactivations((ds) => ds.filter((d) => d._id !== acc._id));
          toast.success("Account deactivation approved!");
        }
        setLoadingApproveDeactivations((prev) =>
          prev.filter((id) => id !== acc._id)
        );
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
        toast.error("Failed to approve deactivation.");
      }
    };

    approveDeactivation();
    // console.log('Approved deactivation', acc._id);
  };
  const handleRejectDeactivation = (acc) => {
    const rejectDeactivation = async () => {
      setLoadingRejectDeactivations((prev) => [...prev, acc._id]);
      try {
        const res = await axios.put(
          `${apiURL}/api/admin/account-deletion/reject/${acc._id}`,
          {},
          { withCredentials: true }
        );

        if (res.data) {
          // console.log(res.data);
          setPendingDeactivations((ds) => ds.filter((d) => d._id !== acc._id));
          toast.success("Account deactivation rejected.");
        }
        setLoadingRejectDeactivations((prev) =>
          prev.filter((id) => id !== acc._id)
        );
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
        toast.error("Failed to reject deactivation.");
      }
    };

    rejectDeactivation();
    // console.log('Rejected deactivation', acc._id);
  };

  // ✅ ADD THESE 2 NEW HANDLER FUNCTIONS
  //Handling Verification & Rejection of Donations
  const handleVerifyDonation = (donation) => {
    const verifyDonation = async () => {
      setLoadingVerifyDonations((prev) => [...prev, donation._id]);
      try {
        const res = await axios.put(
          `${apiURL}/api/admin/donations/verify/${donation._id}`,
          {},
          { withCredentials: true }
        );

        if (res.data) {
          setPendingDonations((donations) =>
            donations.filter((d) => d._id !== donation._id)
          );
          toast.success("Donation verified successfully!");
        }
        setLoadingVerifyDonations((prev) =>
          prev.filter((id) => id !== donation._id)
        );
      } catch (error) {
        console.log("Error verifying donation:", error);
        toast.error("Failed to verify donation.");
        setLoadingVerifyDonations((prev) =>
          prev.filter((id) => id !== donation._id)
        );
      }
    };

    verifyDonation();
  };

  const handleRejectDonation = (donation) => {
    const rejectDonation = async () => {
      setLoadingRejectDonations((prev) => [...prev, donation._id]);
      try {
        const res = await axios.delete(
          `${apiURL}/api/admin/donations/reject/${donation._id}`,
          { withCredentials: true }
        );

        if (res.data) {
          setPendingDonations((donations) =>
            donations.filter((d) => d._id !== donation._id)
          );
          toast.success("Donation rejected.");
        }
        setLoadingRejectDonations((prev) =>
          prev.filter((id) => id !== donation._id)
        );
      } catch (error) {
        console.log("Error rejecting donation:", error);
        toast.error("Failed to reject donation.");
        setLoadingRejectDonations((prev) =>
          prev.filter((id) => id !== donation._id)
        );
      }
    };

    rejectDonation();
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="admin-page">
        <h1>Admin Dashboard</h1>

        <section className="admin-section">
          <h2>Pending Campaign Approvals</h2>
          <div className="admin-list">
            {pendingCampaigns.map((c) => (
              <div key={c._id} className="admin-card">
                <div
                  className="admin-card-details"
                  onClick={() =>
                    navigate(`/admin/preview/${c._id}`, {
                      state: { campaign: c },
                    })
                  }
                >
                  <p className="card-title">{c.fundraiseTitle}</p>
                  <p className="card-sub">By {c.userId?.fullName}</p>
                </div>
                <div className="card-actions">
                  <button
                    className="btn approve"
                    onClick={() => handleApproveCampaign(c)}
                    disabled={loadingApproveCampaigns.includes(c._id)}
                  >
                    {loadingApproveCampaigns.includes(c._id)
                      ? "Approving..."
                      : "Approve"}
                  </button>
                  <button
                    className="btn reject"
                    onClick={() => handleRejectCampaign(c)}
                    disabled={loadingRejectCampaigns.includes(c._id)}
                  >
                    {loadingRejectCampaigns.includes(c._id)
                      ? "Rejecting..."
                      : "Reject"}
                  </button>
                </div>
              </div>
            ))}
            {pendingCampaigns.length === 0 && (
              <p className="empty">No pending campaigns</p>
            )}
          </div>
        </section>

        {/* ✅ ADD THIS NEW SECTION */}
        <section className="admin-section">
          <h2>Pending Donations ({pendingDonations.length})</h2>
          <div className="admin-list">
            {pendingDonations.map((donation) => (
              <div key={donation._id} className="admin-card donation-card">
                <div className="donation-details">
                  <p className="card-title">{donation.fullName}</p>
                  <p className="card-sub">
                    <strong>Campaign:</strong> {donation.fundId?.fundraiseTitle}
                  </p>
                  <p className="card-sub">
                    <strong>Amount:</strong> PKR{" "}
                    {donation.amount?.toLocaleString()}
                  </p>
                  <p className="card-sub">
                    <strong>Email:</strong> {donation.email}
                  </p>
                  <p className="card-sub">
                    <strong>Contact:</strong> {donation.contactNumber}
                  </p>
                  <p className="card-sub">
                    <strong>Date:</strong>{" "}
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </p>

                  {donation.proofImage && (
                    <div className="proof-image">
                      <img
                        src={donation.proofImage}
                        alt="Payment Proof"
                        style={{
                          width: "100%",
                          maxWidth: "300px",
                          marginTop: "10px",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button
                    className="btn approve"
                    onClick={() => handleVerifyDonation(donation)}
                    disabled={loadingVerifyDonations.includes(donation._id)}
                  >
                    {loadingVerifyDonations.includes(donation._id)
                      ? "Verifying..."
                      : "Verify"}
                  </button>
                  <button
                    className="btn reject"
                    onClick={() => handleRejectDonation(donation)}
                    disabled={loadingRejectDonations.includes(donation._id)}
                  >
                    {loadingRejectDonations.includes(donation._id)
                      ? "Rejecting..."
                      : "Reject"}
                  </button>
                </div>
              </div>
            ))}
            {pendingDonations.length === 0 && (
              <p className="empty">No pending donations</p>
            )}
          </div>
        </section>

        <section className="admin-section">
          <h2>Pending Account Deactivations</h2>
          <div className="admin-list">
            {pendingDeactivations.map((d) => (
              <div key={d._id} className="admin-card">
                <div>
                  <p className="card-title">{d.fullName}</p>
                  <p className="card-sub">{d.email}</p>
                </div>
                <div className="card-actions">
                  <button
                    className="btn approve"
                    onClick={() => handleApproveDeactivation(d)}
                    disabled={loadingApproveDeactivations.includes(d._id)}
                  >
                    {loadingApproveDeactivations.includes(d._id)
                      ? "Approving..."
                      : "Approve"}
                  </button>

                  <button
                    className="btn reject"
                    onClick={() => handleRejectDeactivation(d)}
                    disabled={loadingRejectDeactivations.includes(d._id)}
                  >
                    {loadingRejectDeactivations.includes(d._id)
                      ? "Rejecting..."
                      : "Reject"}
                  </button>
                </div>
              </div>
            ))}
            {pendingDeactivations.length === 0 && (
              <p className="empty">No pending deactivations</p>
            )}
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
