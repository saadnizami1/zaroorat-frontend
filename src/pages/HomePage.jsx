import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import Trending from "../components/Trending";
import Hero from "../components/home/Hero";
import Affiliations from "../components/home/Affiliations";
import Manifesto from "../components/home/Manifesto";
import HorizontalShowcase from "../components/home/HorizontalShowcase";
import ImpactBand from "../components/home/ImpactBand";
import StickyProcess from "../components/home/StickyProcess";
import CategoriesShowcase from "../components/home/CategoriesShowcase";
import Recognition from "../components/home/Recognition";
import WhyZaroorat from "../components/home/WhyZaroorat";
import Testimonials from "../components/home/Testimonials";
import HomeFaq from "../components/home/HomeFaq";
import CtaBanner from "../components/home/CtaBanner";
import { CampaignContext } from "../store/campaignStore";
import "../css/Home.css";

const Home = () => {
  const { setUser, apiURL } = useContext(CampaignContext);
  const location = useLocation();

  // Google sign-in lands here as /?name=…&email=…&role=… with the session
  // cookie already set. Load the full profile (it carries the user's _id,
  // which owner-only UI relies on); fall back to the URL details if that fails.
  useEffect(() => {
    const params = new window.URLSearchParams(location.search);
    const googleUser = {
      fullName: params.get("name"),
      email: params.get("email"),
      role: params.get("role"),
    };
    if (!googleUser.fullName || !googleUser.email) return;
    window.history.replaceState({}, document.title, window.location.pathname);

    (async () => {
      let signedIn = googleUser;
      try {
        const res = await axios.get(`${apiURL}/api/user/profile`, { withCredentials: true });
        if (res.data?.user) signedIn = res.data.user;
      } catch (error) {
        // 401 = the session cookie never arrived, so they aren't really signed in.
        if (error.response?.status === 401) {
          toast.error("Google sign-in didn't complete. Please try again, or sign in with your email.");
          return;
        }
        /* otherwise keep the basic details from the redirect */
      }
      setUser(signedIn);
      localStorage.setItem("user", JSON.stringify(signedIn));
      toast.success(`Welcome, ${(signedIn.fullName || "").split(" ")[0] || "back"}!`);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <Navbar />
      <CookieConsent />
      <main>
        <Hero />
        <Affiliations />
        <Manifesto />
        <HorizontalShowcase />
        <ImpactBand />
        <StickyProcess />
        <Trending />
        <CategoriesShowcase />
        <Recognition />
        <WhyZaroorat />
        <Testimonials />
        <HomeFaq />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
