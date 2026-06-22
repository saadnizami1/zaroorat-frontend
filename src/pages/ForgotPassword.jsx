import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import { CampaignContext } from "../store/campaignStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { apiURL } = useContext(CampaignContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${apiURL}/api/auth/forgot-password`, { email });
      toast.success("Reset link sent! Check your email.");
      setTimeout(() => navigate("/"), 2200);
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.msg || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we’ll send you a secure link to reset it."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="field-label">Email address</label>
          <input
            className="input"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={isLoading}>
          {isLoading ? "Sending…" : "Send reset link"}
        </button>
      </form>
      <p className="auth-reset">
        <Link to="/signin">Back to sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
