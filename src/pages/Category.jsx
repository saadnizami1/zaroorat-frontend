import { Link } from "react-router-dom";
import {
  MdOutlineHealthAndSafety,
  MdOutlineCastForEducation,
  MdOutlineSafetyCheck,
} from "react-icons/md";
import { AiOutlineSafety, AiOutlineEnvironment, AiOutlineAppstore } from "react-icons/ai";
import { PiDogFill } from "react-icons/pi";
import { RiCommunityLine } from "react-icons/ri";
import { GiTrophyCup, GiTombstone, GiCakeSlice, GiMountainCave } from "react-icons/gi";
import {
  FaBriefcase, FaPaintBrush, FaUsers, FaMoneyBillWave, FaRing,
  FaFootballBall, FaPlane, FaHandsHelping, FaHandHoldingHeart, FaMosque, FaDove,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { CATEGORY_LABELS } from "../utils/categories";
import "../css/Discover.css";

const ICONS = {
  medical: <MdOutlineHealthAndSafety />,
  emergencies: <MdOutlineSafetyCheck />,
  education: <MdOutlineCastForEducation />,
  family: <FaUsers />,
  monthly_bills: <FaMoneyBillWave />,
  funerals_memorials: <GiTombstone />,
  Islamic_causes: <FaMosque />,
  faith: <AiOutlineSafety />,
  community: <RiCommunityLine />,
  environment: <AiOutlineEnvironment />,
  animal: <PiDogFill />,
  business: <FaBriefcase />,
  creative: <FaPaintBrush />,
  sports: <FaFootballBall />,
  events: <AiOutlineAppstore />,
  newly_weds: <FaRing />,
  travel: <FaPlane />,
  competition: <GiTrophyCup />,
  volunteer: <FaHandsHelping />,
  wishes: <GiCakeSlice />,
  gaza: <FaHandHoldingHeart />,
  kashmir: <GiMountainCave />,
  ukraine_relief: <FaDove />,
  other: <AiOutlineAppstore />,
};

const ORDER = [
  "medical", "emergencies", "education", "family", "monthly_bills", "funerals_memorials",
  "Islamic_causes", "faith", "community", "environment", "animal", "business", "creative",
  "sports", "events", "newly_weds", "travel", "competition", "volunteer", "wishes",
  "gaza", "kashmir", "other",
];

export default function Discover() {
  return (
    <div className="page">
      <Navbar />
      <PageHero
        eyebrow="Explore"
        title="Discover campaigns by cause"
        subtitle="From medical emergencies to education and faith — find the category that speaks to you, or start your own."
      />

      <main className="discover-page">
        <div className="container">
          <div className="discover-grid">
            {ORDER.map((key, i) => (
              <Reveal key={key} delay={(i % 4) + 1} className="discover-reveal">
                <Link to={`/fundraisers/${key}`} className="discover-card">
                  <span className="discover-icon">{ICONS[key]}</span>
                  <span className="discover-label">{CATEGORY_LABELS[key]}</span>
                  <FiArrowUpRight className="discover-arrow" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
