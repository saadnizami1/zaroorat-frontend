import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiCheck, FiCreditCard, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhoneInput from "../components/PhoneInput";
import { CampaignContext } from "../store/campaignStore";
import { toLocalPkPhone, fullPkPhone, isValidPkMobile } from "../utils/pakistan";
import "../css/Profile.css";

const Profile = () => {
  const defaultProfile = "/UserProfile.jpg";
  const { user, setUser, apiURL } = useContext(CampaignContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ fullName: "", phone: "", cityName: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(defaultProfile);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!user) return navigate("/signin");
    (async () => {
      try {
        const res = await axios.get(`${apiURL}/api/user/profile`, { withCredentials: true });
        const u = res.data.user;
        setUser(u);
        localStorage.setItem("user", JSON.stringify(u));
        setUpdatedUser({
          fullName: u.fullName || "",
          phone: toLocalPkPhone(u.phone || ""),
          cityName: u.cityName || "",
        });
        setPreviewImage(u.profilePhoto || defaultProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiURL]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (updatedUser.phone && !isValidPkMobile(updatedUser.phone)) {
      return toast.error("Enter a valid Pakistani mobile number.");
    }
    try {
      const formData = new FormData();
      formData.append("fullName", updatedUser.fullName);
      formData.append("phone", updatedUser.phone ? fullPkPhone(updatedUser.phone) : "");
      formData.append("cityName", updatedUser.cityName);
      if (selectedFile) formData.append("cnicImage", selectedFile);

      setIsSending(true);
      const res = await axios.put(`${apiURL}/api/user/update-profile`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.user) {
        setEditMode(false);
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDeactivateAccount = async () => {
    if (!window.confirm("Request account deactivation? An admin will review your request.")) return;
    try {
      await axios.post(`${apiURL}/api/user/account-deletion/request`, {}, { withCredentials: true });
      toast.success("Deactivation request sent successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.msg || error.message);
    }
  };

  if (!user) return null;

  return (
    <div className="page">
      <Navbar />
      <main className="profile-page">
        <div className="container profile-grid">
          {/* Identity card */}
          <aside className="profile-identity">
            <div className="profile-cover" />
            <div className="profile-avatar">
              <img src={previewImage} alt={user.fullName} />
            </div>
            <h1 className="profile-name">{user.fullName}</h1>
            <span className={`badge ${user.role === "admin" ? "badge-gold" : "badge-green"}`}>
              {user.role === "admin" ? "Administrator" : "Verified Member"}
            </span>
            <div className="profile-meta">
              <div><FiMail /> {user.email}</div>
              <div><FiCreditCard /> CNIC: {user.cnicImage ? "On file" : "Not provided"}</div>
            </div>
          </aside>

          {/* Details */}
          <section className="profile-details">
            <div className="profile-details-head">
              <h2>Account details</h2>
              {editMode ? (
                <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSending}>
                  {isSending ? "Saving…" : <><FiCheck /> Save changes</>}
                </button>
              ) : (
                <button className="btn btn-ghost btn-sm" onClick={() => setEditMode(true)}>
                  <FiEdit2 /> Edit
                </button>
              )}
            </div>

            <div className="profile-fields">
              <div className="profile-field">
                <span className="pf-label">Full name</span>
                {editMode ? (
                  <input className="input" value={updatedUser.fullName} onChange={(e) => setUpdatedUser((p) => ({ ...p, fullName: e.target.value }))} />
                ) : (
                  <p className="pf-value">{user.fullName}</p>
                )}
              </div>

              <div className="profile-field">
                <span className="pf-label"><FiPhone /> Mobile number</span>
                {editMode ? (
                  <PhoneInput
                    value={updatedUser.phone}
                    onChange={(v) => setUpdatedUser((p) => ({ ...p, phone: v }))}
                    invalid={updatedUser.phone.length > 0 && !isValidPkMobile(updatedUser.phone)}
                  />
                ) : (
                  <p className="pf-value">{user.phone || "Not provided"}</p>
                )}
              </div>

              <div className="profile-field">
                <span className="pf-label"><FiMapPin /> City</span>
                {editMode ? (
                  <input className="input" value={updatedUser.cityName} onChange={(e) => setUpdatedUser((p) => ({ ...p, cityName: e.target.value }))} placeholder="e.g. Lahore" />
                ) : (
                  <p className="pf-value">{user.cityName || "Not provided"}</p>
                )}
              </div>

              {editMode && (
                <div className="profile-field">
                  <span className="pf-label">CNIC image</span>
                  <label className="upload-zone">
                    <FiCreditCard />
                    <span>{selectedFile?.name || "Upload your CNIC image"}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                </div>
              )}
            </div>

            <div className="profile-danger">
              <div>
                <strong>Deactivate account</strong>
                <p>Submit a request to deactivate your Zaroorat account.</p>
              </div>
              <button className="btn btn-ghost danger-btn" onClick={handleDeactivateAccount}>
                Deactivate
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
