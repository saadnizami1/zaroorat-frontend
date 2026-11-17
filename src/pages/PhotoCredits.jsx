import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LegalLayout from "../components/LegalLayout";
import { CampaignContext } from "../store/campaignStore";
import { isTeamCase } from "../utils/teamCase";

/**
 * Attribution for the representative photos on field-team campaigns. Most are
 * Creative Commons licensed and must credit the photographer; listing the
 * credits here keeps the campaign pages clean while meeting that condition.
 */
const PhotoCredits = () => {
  const { apiURL } = useContext(CampaignContext);
  const [funds, setFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${apiURL}/api/fund/fund-list?search=`);
        const list = Array.isArray(res.data?.funds) ? res.data.funds : [];
        setFunds(list.filter((f) => isTeamCase(f) && f.teamCase.photo));
      } catch {
        /* the static text below still explains the policy */
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiURL]);

  return (
    <LegalLayout
      title="Photo Credits"
      subtitle="The photographers whose work illustrates our verified campaigns."
    >
      <p>
        To protect the privacy of the families we help, campaigns marked <strong>Verified</strong> use
        representative photos rather than pictures of the family. These photos are shared by their
        photographers under free licences, and we&rsquo;re grateful to them.
      </p>

      <h2>Credits</h2>
      {isLoading ? (
        <p>Loading…</p>
      ) : funds.length === 0 ? (
        <p>There are no verified campaigns live right now.</p>
      ) : (
        <ul className="photo-credits">
          {funds.map((f) => {
            const p = f.teamCase.photo;
            return (
              <li key={f._id}>
                <Link to={`/donate/${f._id}`}>{f.fundraiseTitle}</Link>
                <span>
                  {" — "}
                  {p.sourceUrl ? (
                    <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer">{p.title || "Photo"}</a>
                  ) : (
                    p.title || "Photo"
                  )}
                  {p.creator && ` by ${p.creator}`}
                  {p.license && (
                    <>
                      {", "}
                      {p.licenseUrl ? (
                        <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer">{p.license}</a>
                      ) : (
                        p.license
                      )}
                    </>
                  )}
                  . Resized and cropped for display.
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </LegalLayout>
  );
};

export default PhotoCredits;
