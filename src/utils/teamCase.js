// Cases our field team visited and wrote up carry a `teamCase` object on the
// fund document (set when the case is added, not by the create-fundraiser
// form):
//   verifiedOn        ISO date of the home visit
//   verificationNote  what the team saw ("Our field team visited … and saw …")
//   costBreakdown     [{ label, amount }] adding up to the goal
//   organizer         name shown as "Organised by" (the fund's owner is the admin account)
//   photo             { title, creator, license, licenseUrl, sourceUrl } for
//                     the representative cover image
export const isTeamCase = (fund) => Boolean(fund?.teamCase?.verifiedOn);

export const TEAM_CASE_STORY_NOTE =
  "This story was written by our team from the family's own words, as many of the families we help cannot read or write.";


export const formatVerifiedDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
