import { Link } from "react-router-dom";
import { FiMapPin, FiUsers } from "react-icons/fi";
import { formatPKR, progressPercent } from "../utils/format";
import { formatCategory } from "../utils/categories";
import "../css/CampaignCard.css";

/**
 * Shared campaign card used on Trending, Fundraisers, Search, MyFunds.
 * Remember the field-name trap:
 *   totalAmountRaised = GOAL,  donationAmount = raised so far.
 */
const CampaignCard = ({ fund, topRight = null, footer = null, eager = false }) => {
  const raised = fund.donationAmount || 0;
  const goal = fund.totalAmountRaised || 0;
  const pct = progressPercent(raised, goal);
  const location = [fund.cityName, fund.country].filter(Boolean).join(", ");

  return (
    <article className="ccard">
      <div className="ccard-media-wrap">
        <Link to={`/donate/${fund._id}`} className="ccard-media" aria-label={fund.fundraiseTitle}>
          <img
            src={fund.coverImage}
            alt={fund.fundraiseTitle}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
          {fund.fundCategory && (
            <span className="ccard-cat">{formatCategory(fund.fundCategory)}</span>
          )}
        </Link>
        {topRight && <div className="ccard-top-right">{topRight}</div>}
      </div>

      <div className="ccard-body">
        <Link to={`/donate/${fund._id}`} className="ccard-title-link">
          <h3 className="ccard-title">{fund.fundraiseTitle}</h3>
        </Link>

        {location && (
          <p className="ccard-loc">
            <FiMapPin /> {location}
          </p>
        )}

        <div className="ccard-progress">
          <div className="progress">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="ccard-figures">
            <span className="ccard-raised">{formatPKR(raised)}</span>
            <span className="ccard-pct">{pct}%</span>
          </div>
          <div className="ccard-goal">
            <span>raised of {formatPKR(goal)}</span>
            {typeof fund.donationCount === "number" && (
              <span className="ccard-donors">
                <FiUsers /> {fund.donationCount}
              </span>
            )}
          </div>
        </div>

        {footer && <div className="ccard-footer">{footer}</div>}
      </div>
    </article>
  );
};

export default CampaignCard;
