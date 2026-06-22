import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import { CampaignContext } from "../store/campaignStore";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { apiURL } = useContext(CampaignContext);
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${apiURL}/api/auth/reset-password/${resetToken}`, { newPassword: password });
      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/signin"), 2200);
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.msg || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Set a new password" subtitle="Choose a strong password you’ll remember.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="field-label">New password</label>
          <input className="input" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <div className="field">
          <label className="field-label">Confirm new password</label>
          <input className="input" type="password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={isLoading}>
          {isLoading ? "Resetting…" : "Reset password"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
