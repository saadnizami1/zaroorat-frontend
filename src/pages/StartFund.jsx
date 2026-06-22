import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiMapPin,
  FiEdit3,
  FiImage,
  FiCreditCard,
  FiShield,
  FiHome,
} from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { CampaignContext } from "../store/campaignStore";
import { PROVINCE_NAMES, citiesFor } from "../utils/pakistan";
import { CATEGORY_OPTIONS, formatCategory } from "../utils/categories";
import { formatPKR } from "../utils/format";
import "../css/StartFund.css";

const STEPS = [
  { n: 1, label: "Location", icon: <FiMapPin /> },
  { n: 2, label: "Your cause", icon: <FiEdit3 /> },
  { n: 3, label: "Story", icon: <FiImage /> },
  { n: 4, label: "Payout", icon: <FiCreditCard /> },
  { n: 5, label: "Review", icon: <FiCheck /> },
];

export default function StartFund() {
  const { apiURL, user, isValidZip } = useContext(CampaignContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({
    province: "",
    cityName: "",
    postcode: "",
    fundraiseTitle: "",
    fundCategory: "",
    totalAmountRaised: "",
    fundraiseStory: "",
    coverImage: null,
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
  });

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  const cities = useMemo(() => citiesFor(form.province), [form.province]);

  // One object URL per chosen file, revoked when it changes/unmounts (no leak).
  const coverPreview = useMemo(
    () => (form.coverImage ? URL.createObjectURL(form.coverImage) : null),
    [form.coverImage]
  );
  useEffect(() => {
    return () => { if (coverPreview) URL.revokeObjectURL(coverPreview); };
  }, [coverPreview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "province") {
      setForm((f) => ({ ...f, province: value, cityName: "" }));
    } else {
      setForm((f) => ({ ...f, [name]: files ? files[0] : value }));
    }
  };

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const zipOk = form.postcode ? isValidZip(form.postcode, "Pakistan") : false;

  const stepValid = {
    1: form.province && form.cityName && zipOk,
    2: form.fundraiseTitle && form.fundCategory && form.totalAmountRaised > 0,
    3: form.fundraiseStory && form.coverImage,
    4: form.accountHolderName && form.accountNumber && form.bankName && form.ifscCode,
  };

  const handleSubmit = () => {
    setIsSending(true);
    const fd = new FormData();
    fd.append("country", "Pakistan");
    fd.append("province", form.province);
    fd.append("cityName", form.cityName);
    fd.append("postcode", form.postcode);
    fd.append("fundraiseTitle", form.fundraiseTitle);
    fd.append("fundCategory", form.fundCategory);
    fd.append("totalAmountRaised", form.totalAmountRaised);
    fd.append("fundraiseStory", form.fundraiseStory);
    fd.append("coverImage", form.coverImage);
    fd.append("accountHolderName", form.accountHolderName);
    fd.append("accountNumber", form.accountNumber);
    fd.append("bankName", form.bankName);
    fd.append("ifscCode", form.ifscCode);

    axios
      .post(`${apiURL}/api/fund/create-fundraise`, fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Fundraiser submitted for review!");
        setTimeout(() => navigate("/myfunds"), 2500);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.response?.data?.msg;
        toast.error(msg || "Please complete your profile before starting a fundraiser.");
        setIsSending(false);
      });
  };

  return (
    <div className="sf-page">
      <div className="sf-shell">
        {/* Left rail */}
        <aside className="sf-rail">
          <Link to="/" className="sf-logo">
            <img src="/ZarooratTransparent.png" alt="Zaroorat" />
          </Link>
          <div className="sf-rail-head">
            <h1>Start a Fundraiser</h1>
            <p>It only takes a few minutes. Your campaign goes live once our team reviews it.</p>
          </div>
          <ol className="sf-steps">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className={`sf-step ${step === s.n ? "active" : ""} ${step > s.n ? "done" : ""}`}
              >
                <span className="sf-step-icon">{step > s.n ? <FiCheck /> : s.icon}</span>
                <span className="sf-step-label">
                  <em>Step {s.n}</em>
                  {s.label}
                </span>
              </li>
            ))}
          </ol>
          <div className="sf-rail-trust">
            <FiShield />
            <span>Only verified, Pakistan-based campaigns are approved.</span>
          </div>
        </aside>

        {/* Form */}
        <main className="sf-main">
          <Link to="/" className="sf-home">
            <FiHome /> Home
          </Link>

          <div className="sf-progress-mobile">
            <div className="progress"><div className="progress-fill" style={{ width: `${(step / 5) * 100}%` }} /></div>
            <span>Step {step} of 5 · {STEPS[step - 1].label}</span>
          </div>

          <div className="sf-card">
            {step === 1 && (
              <div className="sf-content">
                <h2>Where is this campaign based?</h2>
                <p className="sf-help">Zaroorat is built for Pakistan — choose your province and city.</p>
                <div className="sf-fields two">
                  <div className="field">
                    <label className="field-label">Province</label>
                    <select className="select" name="province" value={form.province} onChange={handleChange} required>
                      <option value="">Select province</option>
                      {PROVINCE_NAMES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label className="field-label">City</label>
                    <select className="select" name="cityName" value={form.cityName} onChange={handleChange} required disabled={!form.province}>
                      <option value="">{form.province ? "Select city" : "Select province first"}</option>
                      {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="field-label">Postal / ZIP code</label>
                  <input className="input" name="postcode" value={form.postcode} onChange={handleChange} placeholder="e.g. 54000" required />
                  {form.postcode && !zipOk && (
                    <span className="sf-error">Enter a valid 5-digit Pakistani postal code.</span>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="sf-content">
                <h2>Tell us about your cause</h2>
                <p className="sf-help">A clear title and goal help donors connect instantly.</p>
                <div className="field">
                  <label className="field-label">Campaign title</label>
                  <input className="input" name="fundraiseTitle" value={form.fundraiseTitle} onChange={handleChange} placeholder="e.g. Help Ahmed beat cancer" required />
                </div>
                <div className="sf-fields two">
                  <div className="field">
                    <label className="field-label">Category</label>
                    <select className="select" name="fundCategory" value={form.fundCategory} onChange={handleChange} required>
                      <option value="">Select category</option>
                      {CATEGORY_OPTIONS.map((k) => <option key={k} value={k}>{formatCategory(k)}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label className="field-label">Goal amount (PKR)</label>
                    <input className="input" type="number" min="1" name="totalAmountRaised" value={form.totalAmountRaised} onChange={handleChange} placeholder="500000" required />
                  </div>
                </div>
                {form.totalAmountRaised > 0 && (
                  <p className="sf-goal-preview">You're aiming to raise <strong>{formatPKR(form.totalAmountRaised)}</strong>.</p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="sf-content">
                <h2>Share the story</h2>
                <p className="sf-help">Explain who this is for and how donations will help. Honesty builds trust.</p>
                <div className="field">
                  <label className="field-label">Description</label>
                  <textarea className="textarea" name="fundraiseStory" value={form.fundraiseStory} onChange={handleChange} placeholder="Tell donors the full story…" required />
                </div>
                <div className="field">
                  <label className="field-label">Cover image</label>
                  <label className="sf-upload">
                    {form.coverImage ? (
                      <img src={coverPreview} alt="Cover preview" className="sf-upload-preview" />
                    ) : (
                      <span className="sf-upload-empty">
                        <FiImage /> Click to upload a cover photo
                      </span>
                    )}
                    <input type="file" name="coverImage" accept="image/*" onChange={handleChange} hidden />
                  </label>
                  {form.coverImage && <span className="sf-file-name">{form.coverImage.name}</span>}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="sf-content">
                <h2>Where should we send the funds?</h2>
                <p className="sf-help">After donations are verified, Zaroorat disburses them to this account.</p>
                <div className="field">
                  <label className="field-label">Account holder name</label>
                  <input className="input" name="accountHolderName" value={form.accountHolderName} onChange={handleChange} required />
                </div>
                <div className="sf-fields two">
                  <div className="field">
                    <label className="field-label">Account number</label>
                    <input className="input" name="accountNumber" value={form.accountNumber} onChange={handleChange} required />
                  </div>
                  <div className="field">
                    <label className="field-label">Bank name</label>
                    <input className="input" name="bankName" value={form.bankName} onChange={handleChange} placeholder="e.g. Meezan Bank" required />
                  </div>
                </div>
                <div className="field">
                  <label className="field-label">IBAN / Bank code</label>
                  <input className="input" name="ifscCode" value={form.ifscCode} onChange={handleChange} placeholder="PKxx..." required />
                </div>
                <div className="sf-secure-note">
                  <FiShield /> Your payout details are kept private and used only to release verified funds.
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="sf-content">
                <h2>Review your campaign</h2>
                <p className="sf-help">Check everything looks right, then submit for review.</p>
                {form.coverImage && (
                  <img src={coverPreview} alt="Preview" className="sf-review-img" />
                )}
                <dl className="sf-review">
                  <div><dt>Title</dt><dd>{form.fundraiseTitle}</dd></div>
                  <div><dt>Category</dt><dd>{formatCategory(form.fundCategory)}</dd></div>
                  <div><dt>Goal</dt><dd>{formatPKR(form.totalAmountRaised || 0)}</dd></div>
                  <div><dt>Location</dt><dd>{form.cityName}, {form.province} ({form.postcode})</dd></div>
                  <div><dt>Payout to</dt><dd>{form.accountHolderName} · {form.bankName}</dd></div>
                  <div className="sf-review-full"><dt>Story</dt><dd>{form.fundraiseStory}</dd></div>
                </dl>
              </div>
            )}

            <div className="sf-actions">
              {step > 1 ? (
                <button type="button" className="btn btn-ghost" onClick={back}>
                  <FiArrowLeft /> Back
                </button>
              ) : <span />}
              {step < 5 ? (
                <button type="button" className="btn btn-primary" onClick={next} disabled={!stepValid[step]}>
                  Continue <FiArrowRight />
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={isSending}>
                  {isSending ? "Submitting…" : "Submit for review"}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
