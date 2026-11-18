// Per-page titles, descriptions and crawler-readable text.
// Used in two places: the browser tab title (components/CanonicalUrl.jsx) and
// scripts/prerender.mjs, which writes a static HTML page per route at build
// time so search engines and AI crawlers that don't run JavaScript still see
// real content. Plain data only — this file is also imported by Node.

export const SITE = "https://zaroorat.xyz";
export const SITE_NAME = "Zaroorat";

export const DEFAULT_TITLE = "Zaroorat — Verified Crowdfunding & Donations in Pakistan";
export const DEFAULT_DESCRIPTION =
  "Zaroorat (ضرورت) is a Pakistani crowdfunding platform. Donate to verified medical, education and emergency causes, give Zakat, or start a free fundraiser — every campaign reviewed and every donation verified by hand.";

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: SITE_NAME,
  alternateName: ["ضرورت", "Zaroorat.xyz", "Zaroorat Pakistan"],
  url: `${SITE}/`,
  logo: `${SITE}/ZarooratLogo.jpg`,
  email: "contactzaroorat@gmail.com",
  telephone: "+92-321-4012041",
  address: {
    "@type": "PostalAddress",
    streetAddress: "48 FF, Phase 4, DHA",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: { "@type": "Country", name: "Pakistan" },
  description:
    "Zaroorat is a Pakistani crowdfunding and donation platform. Field volunteers verify families in need, every campaign is reviewed before it goes live, and every donation is checked against a payment receipt before it is counted.",
  knowsAbout: ["Crowdfunding", "Charity in Pakistan", "Zakat", "Medical fundraising", "Education fundraising"],
};

// Text every crawler-facing page shares — what Zaroorat is, in plain words.
const ABOUT = [
  "Zaroorat (ضرورت, Urdu for “need”) is a crowdfunding and donation platform for Pakistan, based in Lahore.",
  "People in Pakistan use Zaroorat to raise money for medical treatment, school and university fees, emergencies, funerals, monthly bills and other urgent needs. Donors in Pakistan and overseas use it to give directly to verified families.",
  "How it works: every fundraiser is reviewed and approved by the Zaroorat team before it goes live. Many cases are found and verified in person by Zaroorat field volunteers, who visit the family, check documents such as hospital papers, bills and fee slips, and write up the story. Donors transfer money to one verified Zaroorat bank account and upload a screenshot of the transfer; the team matches each payment to its receipt before it is added to the campaign, then pays the funds out to the campaign.",
  "Starting a fundraiser is free. There is no card or payment gateway — giving runs on direct bank transfer with manual verification.",
];

// path → { title, description, heading, body[] }
export const PAGES = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    heading: "Zaroorat — verified crowdfunding and donations in Pakistan",
    body: ABOUT,
  },
  "/fundraisers": {
    title: "Donate to Verified Fundraisers in Pakistan | Zaroorat",
    description:
      "Browse live, verified fundraisers across Pakistan — medical treatment, education, emergencies and families in need. Every campaign on Zaroorat is reviewed before it goes live.",
    heading: "Live fundraisers on Zaroorat",
    body: [
      "Browse every live fundraiser on Zaroorat. Each campaign has been reviewed by our team, and many were verified in person by our field volunteers.",
    ],
  },
  "/fundraisers/medical": {
    title: "Medical Fundraisers in Pakistan — Donate for Treatment | Zaroorat",
    description:
      "Help pay for dialysis, surgery, cancer treatment and medicines for patients across Pakistan. Verified medical fundraisers on Zaroorat.",
    heading: "Medical fundraisers in Pakistan",
    body: [
      "Medical fundraisers help patients in Pakistan pay for dialysis, surgery, cancer treatment, medicines and hospital stays. Each case is reviewed against hospital documents before it goes live.",
    ],
  },
  "/fundraisers/education": {
    title: "Education Fundraisers — Pay School & University Fees in Pakistan | Zaroorat",
    description:
      "Help Pakistani students stay in school. Donate to verified education fundraisers for school fees, university fees, books and uniforms.",
    heading: "Education fundraisers in Pakistan",
    body: [
      "Education fundraisers on Zaroorat help children and young people in Pakistan pay school and university fees, buy books and uniforms, and stay in education. Fee slips are checked before a case goes live.",
    ],
  },
  "/fundraisers/emergencies": {
    title: "Emergency Appeals in Pakistan — Donate Now | Zaroorat",
    description:
      "Urgent appeals for families in Pakistan facing floods, accidents, eviction and sudden loss. Verified emergency fundraisers on Zaroorat.",
    heading: "Emergency fundraisers in Pakistan",
    body: [
      "Emergency fundraisers help families in Pakistan through sudden crises — floods, accidents, fires, eviction or the loss of a breadwinner.",
    ],
  },
  "/fundraisers/Islamic_causes": {
    title: "Islamic Causes — Sadaqah & Charity in Pakistan | Zaroorat",
    description:
      "Give Sadaqah and support Islamic causes in Pakistan through verified fundraisers on Zaroorat.",
    heading: "Islamic causes",
    body: ["Support mosques, madrasas, Sadaqah and other Islamic causes in Pakistan through verified fundraisers."],
  },
  "/discover": {
    title: "Discover Causes by Category | Zaroorat",
    description:
      "Find a cause to support in Pakistan by category — medical, education, emergencies, family, monthly bills, funerals, faith, community and more.",
    heading: "Discover causes on Zaroorat",
    body: [
      "Find fundraisers by category: medical, emergencies, education, family, monthly bills, funerals and memorials, Islamic causes, faith, community, environment, animals and more.",
    ],
  },
  "/zakat": {
    title: "Zakat Calculator Pakistan — Calculate & Give Zakat Online | Zaroorat",
    description:
      "Free Zakat calculator in PKR. Enter your gold, silver, cash, savings and debts to calculate the Zakat you owe, then give it to verified, eligible families in Pakistan.",
    heading: "Zakat calculator and Zakat Hub",
    body: [
      "Use the free Zakat calculator to work out the Zakat you owe in Pakistani rupees. Enter your cash and bank savings, gold and silver, investments and business stock, and money owed to you; your debts and liabilities are subtracted and the calculator shows 2.5% of what remains. Zakat is due on eligible wealth held for one lunar year above the nisab threshold.",
      "You can then give your Zakat to verified, eligible families in Pakistan through Zaroorat.",
    ],
  },
  "/stories": {
    title: "Stories of Families Helped | Zaroorat",
    description: "Real stories from families across Pakistan supported by Zaroorat donors.",
    heading: "Stories",
    body: ["Stories from families across Pakistan whose fundraisers are live on Zaroorat."],
  },
  "/impact": {
    title: "Our Impact & How Donations Are Verified | Zaroorat",
    description:
      "How Zaroorat keeps giving accountable: campaign review, proof of payment, manual verification and transparent disbursement.",
    heading: "Impact and accountability",
    body: [
      "Four checks sit behind every donation on Zaroorat:",
      "Campaign review — every fundraiser is checked and approved by our team before it can receive a single rupee.",
      "Proof of payment — donors upload a receipt for every transfer; nothing is counted until it is verified.",
      "Manual verification — our admins match each payment to its proof, protecting donors from fraud.",
      "Transparent disbursement — verified funds are released to the campaign, with progress shared publicly.",
    ],
  },
  "/about/mission": {
    title: "Our Mission | Zaroorat",
    description:
      "Zaroorat connects compassionate donors with causes across Pakistan, built on empowerment, transparency, trust and community.",
    heading: "Built on the Pakistani spirit of helping one another",
    body: [
      "Zaroorat connects compassionate donors across Pakistan with the causes that matter — making every contribution transparent, meaningful and impactful.",
      "Empowerment: enable Pakistani fundraisers to share their stories and reach supporters across every province and the diaspora.",
      "Transparency: clear progress tracking and regular updates, so donors always know how their contributions create change.",
      "Trust: every rupee reaches its intended purpose through rigorous verification and secure, manual review.",
      "Community: a caring network reflecting Pakistani values — where neighbours help neighbours.",
    ],
  },
  "/about/payment_work": {
    title: "How Donating Works — Bank Transfer & Verification | Zaroorat",
    description:
      "How to donate on Zaroorat: choose an amount, transfer to the verified Zaroorat bank account, upload your receipt, and our team verifies and disburses.",
    heading: "How donating works",
    body: [
      "1. Choose an amount — open a campaign, tap Donate, and pick a preset or enter a custom amount in PKR.",
      "2. Transfer manually — send the amount to the verified Zaroorat bank account using your banking app, ATM or online banking.",
      "3. Submit your proof — enter your name, email and mobile number, and upload a screenshot of the transaction.",
      "4. We verify and disburse — our team checks the payment, credits the campaign, and disburses funds to the campaign.",
    ],
  },
  "/about/our-team": {
    title: "Our Team | Zaroorat",
    description: "Meet the Lahore-based team and field volunteers behind Zaroorat.",
    heading: "Our team",
    body: ["Zaroorat is run by a small team in Lahore together with field volunteers and campaign analysts who visit and verify families across Pakistan."],
  },
  "/faq": {
    title: "FAQ — Donating, Fundraising & Safety | Zaroorat",
    description:
      "Answers about donating on Zaroorat, starting a fundraiser, fees, verification, Zakat and how we stop fake campaigns.",
    heading: "Frequently asked questions",
    body: [],
    faq: true,
  },
  "/contact": {
    title: "Contact Zaroorat",
    description: "Contact the Zaroorat team in Lahore by email at contactzaroorat@gmail.com or phone +92 321 4012041.",
    heading: "Contact us",
    body: [
      "Email: contactzaroorat@gmail.com",
      "Phone: +92 321 4012041",
      "Office: 48 FF, Phase 4, DHA, Lahore, Pakistan",
    ],
  },
  "/campaign": {
    title: "Start a Free Fundraiser in Pakistan | Zaroorat",
    description:
      "Start a fundraiser in Pakistan for free. Share your story, set a goal in PKR, add your bank payout details, and go live once our team approves it.",
    heading: "Start a fundraiser",
    body: [
      "Starting a fundraiser on Zaroorat is free. Sign in, choose your cause, set a goal in PKR, add a cover photo and your bank payout details, and submit. Your campaign goes live once our team has reviewed it.",
    ],
  },
  "/search": {
    title: "Search Fundraisers | Zaroorat",
    description: "Search live, verified fundraisers on Zaroorat by name, cause or city.",
    heading: "Search fundraisers",
    body: [],
  },
  "/privacy": { title: "Privacy Policy | Zaroorat", description: "How Zaroorat collects, uses and protects your information.", heading: "Privacy policy", body: [] },
  "/terms": { title: "Terms of Service | Zaroorat", description: "The terms for using Zaroorat.", heading: "Terms of service", body: [] },
  "/cookies": { title: "Cookie Policy | Zaroorat", description: "How Zaroorat uses cookies.", heading: "Cookie policy", body: [] },
  "/photo-credits": {
    title: "Photo Credits | Zaroorat",
    description: "Credits and licences for the photographs used on Zaroorat campaigns.",
    heading: "Photo credits",
    body: [],
  },
  "/signin": { title: "Sign In | Zaroorat", description: DEFAULT_DESCRIPTION, heading: "Sign in", body: [], noindex: true },
  "/forgot-password": { title: "Forgot Password | Zaroorat", description: DEFAULT_DESCRIPTION, heading: "Forgot password", body: [], noindex: true },
};
