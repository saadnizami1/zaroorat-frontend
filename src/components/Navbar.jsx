import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiChevronDown, FiMenu, FiX, FiUser, FiHeart } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { CampaignContext } from "../store/campaignStore";
import "../css/Navbar.css";

const logo = "/ZarooratTransparent.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, apiURL } = useContext(CampaignContext);
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", drawerOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [drawerOpen]);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${apiURL}/api/auth/logout`, {}, { withCredentials: true });
      toast.success(res?.data?.message || "Logged out");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setDrawerOpen(false);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 900);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const initials = (user?.fullName || "U").trim().charAt(0).toUpperCase();

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      {/* Slim trust strip */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-trust">
            <span className="topbar-dot" />
            Pakistan's trusted, fully-verified giving platform
          </span>
          <nav className="topbar-links">
            <Link to="/impact">Impact</Link>
            <span className="topbar-sep" />
            <Link to="/faq">Help</Link>
            <span className="topbar-sep" />
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>

      {/* Main nav */}
      <div className="navbar">
        <div className="container nav-inner">
          <Link to="/" className="brand" aria-label="Zaroorat home">
            <img src={logo} alt="Zaroorat" />
          </Link>

          <nav className="nav-links">
            <div className="nav-item has-menu">
              <button className="nav-link">
                Donate <FiChevronDown />
              </button>
              <div className="nav-menu">
                <Link to="/fundraisers">
                  <strong>All Fundraisers</strong>
                  <span>Browse every active campaign</span>
                </Link>
                <Link to="/discover">
                  <strong>Categories</strong>
                  <span>Medical, education, emergencies & more</span>
                </Link>
                <Link to="/zakat">
                  <strong>Zakat Hub</strong>
                  <span>Calculate & give your Zakat</span>
                </Link>
                <Link to="/stories">
                  <strong>Success Stories</strong>
                  <span>See the impact you create</span>
                </Link>
              </div>
            </div>

            <div className="nav-item has-menu">
              <button className="nav-link">
                About <FiChevronDown />
              </button>
              <div className="nav-menu">
                <Link to="/about/mission">
                  <strong>Our Mission</strong>
                  <span>Why Zaroorat exists</span>
                </Link>
                <Link to="/about/payment_work">
                  <strong>How It Works</strong>
                  <span>From donation to verified impact</span>
                </Link>
                <Link to="/impact">
                  <strong>Impact & Transparency</strong>
                  <span>Where every rupee goes</span>
                </Link>
                <Link to="/about/our-team">
                  <strong>Our Team</strong>
                  <span>The people behind Zaroorat</span>
                </Link>
              </div>
            </div>

            <NavLink to="/stories" className="nav-link">Stories</NavLink>
            <NavLink to="/search" className="nav-link nav-link-search">
              <FiSearch /> Search
            </NavLink>
          </nav>

          <div className="nav-actions">
            {user?.email ? (
              <div className="nav-item has-menu account">
                <button className="account-btn">
                  <span className="avatar">{initials}</span>
                  <span className="account-name">{user.fullName?.split(" ")[0]}</span>
                  <FiChevronDown />
                </button>
                <div className="nav-menu account-menu">
                  <Link to="/profile"><FiUser /> Profile</Link>
                  <Link to="/myfunds"><FiHeart /> My Fundraisers</Link>
                  {user?.role === "admin" && <Link to="/admin-dashboard">Admin Dashboard</Link>}
                  <button onClick={handleLogout} className="menu-logout">Log out</button>
                </div>
              </div>
            ) : (
              <Link to="/signin" className="nav-signin">Sign in</Link>
            )}
            <Link to="/campaign" className="btn btn-primary btn-sm nav-cta">
              Start a Fundraiser
            </Link>
            <button
              className="hamburger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`drawer-overlay ${drawerOpen ? "open" : ""}`} onClick={() => setDrawerOpen(false)} />
      <aside ref={drawerRef} className={`drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-head">
          <Link to="/" onClick={() => setDrawerOpen(false)} className="brand">
            <img src={logo} alt="Zaroorat" />
          </Link>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <FiX />
          </button>
        </div>

        <div className="drawer-body" onClick={() => setDrawerOpen(false)}>
          <Link to="/search" className="drawer-link"><FiSearch /> Search campaigns</Link>
          <p className="drawer-group">Give</p>
          <Link to="/fundraisers" className="drawer-link">All Fundraisers</Link>
          <Link to="/discover" className="drawer-link">Categories</Link>
          <Link to="/zakat" className="drawer-link">Zakat Hub</Link>
          <Link to="/stories" className="drawer-link">Success Stories</Link>
          <p className="drawer-group">About</p>
          <Link to="/about/mission" className="drawer-link">Our Mission</Link>
          <Link to="/about/payment_work" className="drawer-link">How It Works</Link>
          <Link to="/impact" className="drawer-link">Impact & Transparency</Link>
          <Link to="/about/our-team" className="drawer-link">Our Team</Link>
          <Link to="/faq" className="drawer-link">Help / FAQ</Link>
          <Link to="/contact" className="drawer-link">Contact</Link>

          {user?.email ? (
            <>
              <p className="drawer-group">Account</p>
              <Link to="/profile" className="drawer-link">Profile</Link>
              <Link to="/myfunds" className="drawer-link">My Fundraisers</Link>
              {user?.role === "admin" && (
                <Link to="/admin-dashboard" className="drawer-link">Admin Dashboard</Link>
              )}
              <button onClick={handleLogout} className="drawer-link as-button">Log out</button>
            </>
          ) : (
            <Link to="/signin" className="drawer-link">Sign in</Link>
          )}
        </div>

        <div className="drawer-foot">
          <Link to="/campaign" className="btn btn-primary btn-block" onClick={() => setDrawerOpen(false)}>
            Start a Fundraiser
          </Link>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
