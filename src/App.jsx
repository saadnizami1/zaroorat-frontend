import Home from "./pages/HomePage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PageNotFound from "./pages/PageNotFound";
import Signin from "./pages/Signin";
import Search from "./pages/Search";
import Donate from "./pages/Donate";
import Discover from "./pages/Category";
import StartFund from "./pages/StartFund";
import Profile from "./pages/Profile";
import Fundraisers from "./pages/Fundraisers";
import Dashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Mission from "./pages/Mission";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import MyFunds from "./pages/MyFunds";
import AdminCampaignPreview from "./pages/AdminPreviewPage";
import OurTeam from "./pages/OurTeam"; // ✅ ADD THIS

const App = ()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/donate/:id" element={<Donate/>} />
        <Route path="/fundraisers/:category?" element={<Fundraisers/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/myfunds" element={<MyFunds/>} />
        <Route path="/discover" element={<Discover/>} />
        <Route path="/campaign" element={<StartFund/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword/>} />
        <Route path="/about/our-team" element={<OurTeam/>} />
        <Route path="/admin-dashboard" element={<Dashboard/>} />
        <Route path="/admin/preview/:fundId" element={<AdminCampaignPreview/>} />
        <Route path="/about/mission" element={<Mission/>} />
        <Route path="/about/payment_work" element={<Partners/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
