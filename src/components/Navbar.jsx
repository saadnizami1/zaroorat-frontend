import { useContext, useEffect, useRef, useState } from "react";
import { CiSearch, CiLogin } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import "../css/Navbar.css";
import { CampaignContext } from "../store/campaignStore";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

import logo from "../../public/ZarooratTransparent.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user, apiURL } = useContext(CampaignContext);

  const sidebarRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handleLogout = () => {
    const logoutUser = async () => {
      try {
        const res = await axios.post(
          `${apiURL}/api/auth/logout`,
          {},
          { withCredentials: true }
        );

        if (res) {
          toast.success(res.data.message || "Logout successful");
          localStorage.removeItem("user");
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1500); // Slight delay so user sees the toast
        }
      } catch (error) {
        console.log("Error Occurred:", error);
        const errMsg =
          error.response?.data?.message ||
          error.response?.data?.msg ||
          error.message;
        toast.error(errMsg || "Logout failed");
      }
    };

    logoutUser();
  };

  return (
    <nav className={`navbar ${isScrolled ? "shadow" : ""}`}>
      <Toaster />
      {/* Toggle icon for mobile */}
      <button
        ref={toggleBtnRef}
        className="navbar-toggle"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu />
      </button>

      {/* Desktop Menu */}
      <ul className="navbarLinks desktop">
        <li id="nav-li">
          <CiSearch />
          <a href="/search">Search</a>
        </li>
        <li id="nav-li" className="dropdown-container">
          <a href="#">About</a>
          <IoMdArrowDropdown className="dropdown-container-icon" />
          <ul className="dropdown-menu">
            <li>
              <a href="/about/mission">Mission</a>
            </li>
            <li>
              <a href="/about/payment_work">How payment work</a>
            </li>
            <li>
              <a href="/about/our-team">Our Team</a> {/* ✅ ADDED */}
            </li>
          </ul>
        </li>
        <li id="nav-li" className="dropdown-container">
          <a href="#">Donation</a>
          <IoMdArrowDropdown className="dropdown-container-icon" />
          <ul className="dropdown-menu">
            <li>
              <a href="/fundraisers">Fundraisers</a>
            </li>
            <li>
              <a href="/discover">Categories</a>
            </li>
          </ul>
        </li>
        <li id="nav-li">
          <a href="/">
            <img src={logo} style={{ width: "8rem" }} />
          </a>
        </li>
        {user?.email ? (
          <li id="nav-li" className="dropdown-container">
            <a href="#">{user.fullName}</a>
            <IoMdArrowDropdown className="dropdown-container-icon" />
            <ul className="dropdown-menu">
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li>
                <a href="/myfunds">My Funds</a>
              </li>
              {user?.role === "admin" && (
                <li>
                  <a href="/admin-dashboard">Admin Dashboard</a>
                </li>
              )}
              <li>
                <a>
                  <span onClick={handleLogout}>Logout</span>
                </a>
              </li>
            </ul>
          </li>
        ) : (
          <li id="nav-li">
            <a href="/signin">Sign in</a>
            <CiLogin />
          </li>
        )}
        <li id="nav-li">
          <a href="/contact">Contact</a>
        </li>
        <li id="nav-li" className="start-fund">
          <a href="/campaign">Start Fund</a>
        </li>
      </ul>

      <ul
        ref={sidebarRef}
        className={`navbarLinks sidebar ${isSidebarOpen ? "open" : ""}`}
      >
        <button className="sidebar-close" onClick={toggleSidebar}>
          <IoMdClose />
        </button>

        <li>
          <a href="/">
            <img src={logo} style={{ width: "8rem" }} />
          </a>
        </li>
        <li>
          <a href="/search">
            <CiSearch /> Search
          </a>
        </li>
        {user?.role === "admin" && (
          <li>
            <a href="/admin-dashboard">Admin Dashboard</a>
          </li>
        )}
        <li>
          <a href="/about/mission">Mission</a>
        </li>
        <li>
          <a href="/about/payment_work">How payment work</a>
        </li>
        <li>
          <a href="/about/our-team">Our Team</a> {/* ✅ ADDED */}
        </li>
        <li>
          <a href="/fundraisers">Fundraisers</a>
        </li>
        <li>
          <a href="/discover">Categories</a>
        </li>
        {user?.email ? (
          <>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/myfunds">My Funds</a>
            </li>
            <li>
              <a>
                <span onClick={handleLogout}>Logout</span>
              </a>
            </li>
          </>
        ) : (
          <li>
            <a href="/signin">
              Sign in <CiLogin />
            </a>
          </li>
        )}

        <li>
          <a href="/contact">Contact</a>
        </li>
        <li className="start-fund">
          <a href="/campaign">Start Fund</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
