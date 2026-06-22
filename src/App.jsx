import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";
import CustomCursor from "./components/CustomCursor";

// Eager: the landing page (first paint should be instant).
import Home from "./pages/HomePage";

// Lazy: every other route ships as its own chunk → fast initial load.
const Signin = lazy(() => import("./pages/Signin"));
const Search = lazy(() => import("./pages/Search"));
const Donate = lazy(() => import("./pages/Donate"));
const Discover = lazy(() => import("./pages/Category"));
const StartFund = lazy(() => import("./pages/StartFund"));
const Profile = lazy(() => import("./pages/Profile"));
const Fundraisers = lazy(() => import("./pages/Fundraisers"));
const MyFunds = lazy(() => import("./pages/MyFunds"));
const Dashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminCampaignPreview = lazy(() => import("./pages/AdminPreviewPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Mission = lazy(() => import("./pages/Mission"));
const Partners = lazy(() => import("./pages/Partners"));
const Contact = lazy(() => import("./pages/Contact"));
const OurTeam = lazy(() => import("./pages/OurTeam"));
const Faq = lazy(() => import("./pages/Faq"));
const Impact = lazy(() => import("./pages/Impact"));
const Stories = lazy(() => import("./pages/Stories"));
const Zakat = lazy(() => import("./pages/Zakat"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <div className="grain" aria-hidden="true" />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#ffffff",
            background: "#153126",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: "0",
            boxShadow: "0 24px 60px -24px rgba(21, 49, 38, 0.6)",
            padding: "14px 18px",
            maxWidth: "440px",
          },
          success: { iconTheme: { primary: "#7be3b0", secondary: "#0d2218" } },
          error: { iconTheme: { primary: "#ff7a68", secondary: "#0d2218" } },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/search" element={<Search />} />
          <Route path="/donate/:id" element={<Donate />} />
          <Route path="/fundraisers/:category?" element={<Fundraisers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myfunds" element={<MyFunds />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/campaign" element={<StartFund />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/about/our-team" element={<OurTeam />} />
          <Route path="/about/mission" element={<Mission />} />
          <Route path="/about/payment_work" element={<Partners />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/admin/preview/:fundId" element={<AdminCampaignPreview />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/zakat" element={<Zakat />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
