import { useContext, useState } from "react";
import { FiX, FiCopy, FiCheck, FiShield, FiUploadCloud } from "react-icons/fi";
import toast from "react-hot-toast";
import { CampaignContext } from "../store/campaignStore";
import PhoneInput from "./PhoneInput";
import { fullPkPhone, isValidPkMobile } from "../utils/pakistan";
import { formatPKR } from "../utils/format";
import "../css/DonationModal.css";

const PRESETS = [500, 1000, 2000, 5000, 10000, 25000];

const DonateModal = ({ isOpen, onClose, onDonate, fund, isProcessing }) => {
  const { admin } = useContext(CampaignContext);
  const [selectedAmount, setSelectedAmount] = useState(PRESETS[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [donor, setDonor] = useState({ fullName: "", email: "", phone: "" });
  const [proofImage, setProofImage] = useState(null);
  const [proofName, setProofName] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const amount = customAmount ? Number(customAmount) : selectedAmount;

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(admin.accountNumber);
      setCopied(true);
      toast.success("Account number copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please copy manually");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount < 50) return toast.error("Please enter a valid amount (min PKR 50).");
    if (!isValidPkMobile(donor.phone)) return toast.error("Enter a valid Pakistani mobile number.");
    if (!proofImage) return toast.error("Please upload your payment screenshot.");

    const formData = new FormData();
    formData.append("fundId", fund._id);
    formData.append("amount", amount);
    formData.append("fullName", donor.fullName);
    formData.append("email", donor.email);
    formData.append("contactNumber", fullPkPhone(donor.phone));
    formData.append("proofImage", proofImage);
    onDonate(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        <div className="modal-head">
          <span className="eyebrow">Make a donation</span>
          <h2>Support “{fund?.fundraiseTitle}”</h2>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Amount */}
          <div className="modal-block">
            <label className="modal-label">Choose an amount</label>
            <div className="amount-grid">
              {PRESETS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`amount-btn ${!customAmount && selectedAmount === a ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedAmount(a);
                    setCustomAmount("");
                  }}
                >
                  {formatPKR(a)}
                </button>
              ))}
            </div>
            <div className="custom-amount">
              <span>PKR</span>
              <input
                type="number"
                min="50"
                placeholder="Enter a custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Verified account */}
          <div className="modal-block">
            <label className="modal-label">
              <FiShield className="label-icon" /> Transfer to this verified Zaroorat account
            </label>
            <div className="account-card">
              <div className="account-row">
                <span>Account Holder</span>
                <strong>{admin.accountHolderName}</strong>
              </div>
              <div className="account-row">
                <span>Account Number</span>
                <strong className="account-number">
                  {admin.accountNumber}
                  <button type="button" className="copy-btn" onClick={copyAccount}>
                    {copied ? <FiCheck /> : <FiCopy />}
                  </button>
                </strong>
              </div>
              <div className="account-row">
                <span>Bank</span>
                <strong>{admin.bankName}</strong>
              </div>
              <div className="account-row">
                <span>IBAN / Code</span>
                <strong>{admin.ifscCode}</strong>
              </div>
            </div>
            <p className="account-note">
              Transfer {amount ? formatPKR(amount) : "your amount"} to the account above, then
              upload your receipt below. Our team verifies every payment manually.
            </p>
          </div>

          {/* Donor details */}
          <div className="modal-block">
            <label className="modal-label">Your details</label>
            <div className="modal-fields">
              <div className="field">
                <span className="field-label">Full name</span>
                <input
                  className="input"
                  type="text"
                  value={donor.fullName}
                  onChange={(e) => setDonor((d) => ({ ...d, fullName: e.target.value }))}
                  required
                />
              </div>
              <div className="field">
                <span className="field-label">Email</span>
                <input
                  className="input"
                  type="email"
                  value={donor.email}
                  onChange={(e) => setDonor((d) => ({ ...d, email: e.target.value }))}
                  required
                />
              </div>
              <div className="field">
                <span className="field-label">Mobile number</span>
                <PhoneInput
                  value={donor.phone}
                  onChange={(v) => setDonor((d) => ({ ...d, phone: v }))}
                  invalid={donor.phone.length > 0 && !isValidPkMobile(donor.phone)}
                  required
                />
              </div>
              <div className="field">
                <span className="field-label">Payment proof (screenshot)</span>
                <label className="upload-zone">
                  <FiUploadCloud />
                  <span>{proofName || "Click to upload your receipt"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setProofImage(e.target.files[0]);
                      setProofName(e.target.files[0]?.name || "");
                    }}
                    required
                  />
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={isProcessing}>
            {isProcessing ? "Submitting…" : `Submit Donation${amount ? ` · ${formatPKR(amount)}` : ""}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateModal;
