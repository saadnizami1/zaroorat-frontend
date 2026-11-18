import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { CampaignContext } from "../store/campaignStore";
import { formatCategory } from "../utils/categories";
import { formatPKR, optimizedImage, progressPercent } from "../utils/format";
import { readCache, writeCache } from "../utils/sessionCache";
import "../css/Pages.css";

// Same key as the Fundraisers page, so the list is shared between them.
const CACHE_KEY = "funds:";
const SHOWN = 6;

const pickRandom = (list, n) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
};

const excerpt = (fund) => {
  const text = fund.teamCase?.summary || fund.fundraiseStory || "";
  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}…` : text;
};

const Stories = () => {
  const { apiURL } = useContext(CampaignContext);
  const [stories, setStories] = useState(() => pickRandom(readCache(CACHE_KEY) || [], SHOWN));
  const [isLoading, setIsLoading] = useState(stories.length === 0);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${apiURL}/api/fund/fund-list?search=`);
        if (!Array.isArray(res.data?.funds)) throw new Error("Unexpected response");
        writeCache(CACHE_KEY, res.data.funds);
        // Keep the cached pick if there was one, so cards don't reshuffle mid-view.
        setStories((prev) => (prev.length ? prev : pickRandom(res.data.funds, SHOWN)));
      } catch (error) {
        console.error("Error fetching stories: ", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiURL]);

  return (
    <div className="page">
      <Navbar />
      <PageHero
        eyebrow="Stories"
        title="Real people. Real impact."
        subtitle="Behind every campaign is a family our team has visited. Here are a few of the people you can help today."
      />

      <section className="content">
        <div className="container">
          {isLoading ? (
            <p style={{ textAlign: "center" }}>Loading stories…</p>
          ) : stories.length === 0 ? (
            <p style={{ textAlign: "center" }}>No stories to show right now. Please check back soon.</p>
          ) : (
            <div className="stories-grid">
              {stories.map((f, i) => {
                const pct = progressPercent(f.donationAmount, f.totalAmountRaised);
                return (
                  <Reveal key={f._id} delay={(i % 3) + 1}>
                    <Link to={`/donate/${f._id}`} className="story-card" style={{ display: "block", color: "inherit" }}>
                      <div className="story-media">
                        <img src={optimizedImage(f.coverImage, 700)} alt={f.fundraiseTitle} loading="lazy" />
                        <span className="story-raised">{formatPKR(f.donationAmount)} raised</span>
                      </div>
                      <div className="story-body">
                        <span className="story-cat">{formatCategory(f.fundCategory)}</span>
                        <h3 className="story-title">{f.fundraiseTitle}</h3>
                        <p className="story-text">{excerpt(f)}</p>
                        <div className="story-foot">
                          <FiMapPin /> {f.cityName}
                          <span className="badge badge-green">{pct >= 100 ? "Funded" : `${pct}% funded`}</span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/fundraisers" className="btn btn-primary btn-lg">
              See all campaigns <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Stories;
