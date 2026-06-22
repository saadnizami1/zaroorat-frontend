import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const { setUser } = useContext(CampaignContext);
  const location = useLocation();

  useEffect(() => {
    const params = new window.URLSearchParams(location.search);
    const googleUser = {
      fullName: params.get("name"),
      email: params.get("email"),
      role: params.get("role"),
    };
    if (googleUser.fullName && googleUser.email) {
      setUser(googleUser);
      localStorage.setItem("user", JSON.stringify(googleUser));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
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
