import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import PhoneInput from "../components/PhoneInput";
import { CampaignContext } from "../store/campaignStore";
import { fullPkPhone, isValidPkMobile } from "../utils/pakistan";
import { errorMessage } from "../utils/axios";

const Signin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const { setUser, apiURL } = useContext(CampaignContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // The backend sends people back here as /signin?google=failed when Google
  // sign-in can't be completed.
  useEffect(() => {
    if (searchParams.get("google") !== "failed") return;
    toast.error("Google sign-in didn't work. Please try again, or use your email and password.");
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    if (isSignUp) {
      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match.");
        setIsSending(false);
        return;
      }
      if (!isValidPkMobile(form.phone)) {
        toast.error("Enter a valid Pakistani mobile number (+92 3XX XXXXXXX).");
        setIsSending(false);
        return;
      }
      try {
        await axios.post(`${apiURL}/api/auth/signup`, {
          fullName: form.name,
          email: form.email,
          phone: fullPkPhone(form.phone),
          password: form.password,
        });
        toast.success("Account created! Please sign in.");
        setForm({ name: "", email: "", password: "", confirmPassword: "", phone: "" });
        setIsSignUp(false);
      } catch (error) {
        toast.error(errorMessage(error));
      } finally {
        setIsSending(false);
      }
    } else {
      try {
        const res = await axios.post(
          `${apiURL}/api/auth/login`,
          { email: form.email, password: form.password },
          { withCredentials: true }
        );
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Welcome back!");
        setTimeout(() => navigate("/"), 1200);
      } catch (error) {
        toast.error(errorMessage(error));
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${apiURL}/api/auth/google`;
  };

  return (
    <AuthLayout
      title={isSignUp ? "Create your account" : "Welcome back"}
      subtitle={
        isSignUp
          ? "Start fundraising or give to causes you care about."
          : "Sign in to continue your journey of giving."
      }
    >
      {!isSignUp && (
        <>
          <button className="google-btn" onClick={handleGoogleLogin} type="button">
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>
          <div className="auth-divider"><span>or</span></div>
        </>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="field">
            <label className="field-label">Full name</label>
            <input className="input" name="name" value={form.name} required onChange={change} placeholder="e.g. Ayesha Khan" />
          </div>
        )}
        <div className="field">
          <label className="field-label">Email address</label>
          <input className="input" type="email" name="email" value={form.email} required onChange={change} placeholder="you@email.com" />
        </div>
        <div className="field">
          <label className="field-label">Password</label>
          <input className="input" type="password" name="password" value={form.password} required onChange={change} placeholder="••••••••" />
          {isSignUp && (
            <span className="auth-hint">
              6–18 characters, with an uppercase letter, a lowercase letter, a number and a symbol.
            </span>
          )}
        </div>

        {isSignUp && (
          <>
            <div className="field">
              <label className="field-label">Confirm password</label>
              <input className="input" type="password" name="confirmPassword" value={form.confirmPassword} required onChange={change} placeholder="••••••••" />
            </div>
            <div className="field">
              <label className="field-label">Mobile number</label>
              <PhoneInput
                value={form.phone}
                onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
                invalid={form.phone.length > 0 && !isValidPkMobile(form.phone)}
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={isSending}>
          {isSending ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="auth-toggle">
        {isSignUp ? "Already have an account? " : "New to Zaroorat? "}
        <button type="button" onClick={() => setIsSignUp((s) => !s)}>
          {isSignUp ? "Sign in" : "Create an account"}
        </button>
      </p>
      {!isSignUp && (
        <p className="auth-reset">
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
      )}
    </AuthLayout>
  );
};

export default Signin;
