// Runs after `vite build`. The SPA serves one empty index.html for every URL,
// so crawlers that don't execute JavaScript (most AI crawlers) saw a blank
// page titled "Zaroorat". This writes dist/<route>/index.html for each public
// page — with its own <title>, description, canonical, structured data and
// readable text inside #root (React replaces it on load) — plus one page per
// live campaign, and regenerates sitemap.xml. Vercel serves these files
// before falling back to the index.html rewrite.
//
// Campaigns come from the public API; if it's unreachable the build still
// succeeds with the static pages only.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, SITE_NAME, ORGANIZATION, PAGES } from "../src/data/seo.js";
import { FAQ_GROUPS, ALL_FAQS } from "../src/data/faqs.js";
import { formatCategory } from "../src/utils/categories.js";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const API = "https://api.zaroorat.xyz/api/fund/fund-list?search=";
const TEMPLATE = readFileSync(join(DIST, "index.html"), "utf8");
// Untouched shell for every route without its own page (vercel.json rewrites
// to it), so e.g. /profile doesn't briefly show the homepage text.
writeFileSync(join(DIST, "app.html"), TEMPLATE);

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const absUrl = (src) => (!src ? `${SITE}/ZarooratLogo.jpg` : src.startsWith("http") ? src : SITE + src);
const pkr = (n) => `PKR ${Math.round(Number(n) || 0).toLocaleString("en-PK")}`;
const clip = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)) + "…");

// Plain, readable fallback shown until React mounts (and all a non-JS crawler sees).
const STYLE = "max-width:760px;margin:0 auto;padding:32px 20px;font-family:system-ui,sans-serif;line-height:1.6;color:#1c2b24";
const NAV = [
  ["/", "Home"], ["/fundraisers", "Fundraisers"], ["/zakat", "Zakat calculator"],
  ["/about/payment_work", "How donating works"], ["/faq", "FAQ"], ["/contact", "Contact"],
];
const navHtml = `<nav><p>${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join(" · ")}</p></nav>`;

function render({ path, title, description, image, heading, html, schema, noindex }) {
  const url = SITE + (path === "/" ? "/" : path);
  const head = [
    `<title>${esc(title)}</title>`,
    `<link rel="canonical" href="${url}" />`,
    noindex ? `<meta name="robots" content="noindex" />` : "",
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="en_PK" />`,
    jsonLd({ "@context": "https://schema.org", "@graph": [ORGANIZATION, ...(schema || [])] }),
  ].join("\n    ");

  let out = TEMPLATE
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, "")
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace("</head>", `    ${head}\n  </head>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root"><main style="${STYLE}">${navHtml}<h1>${esc(heading)}</h1>${html}</main></div>`
    );
  if (image) {
    out = out
      .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/, `$1${esc(image)}$2`)
      .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/, `$1${esc(image)}$2`);
  }
  return out;
}

function write(path, html) {
  const file = path === "/" ? join(DIST, "index.html") : join(DIST, ...path.split("/").filter(Boolean), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

async function fetchCampaigns() {
  try {
    // Render's free tier can take ~50 s to wake up.
    const res = await fetch(API, { signal: AbortSignal.timeout(120_000) });
    const json = await res.json();
    return Array.isArray(json.funds) ? json.funds : [];
  } catch (err) {
    console.warn(`prerender: campaigns skipped (${err.message})`);
    return [];
  }
}

const paras = (list) => list.map((p) => `<p>${esc(p)}</p>`).join("");
const campaignLink = (f) =>
  `<li><a href="/donate/${f._id}">${esc(f.fundraiseTitle)}</a> — ${esc(formatCategory(f.fundCategory))}, ${esc(f.cityName || "Pakistan")}</li>`;

const campaigns = await fetchCampaigns();
const today = new Date().toISOString().slice(0, 10);
const sitemap = [];

// Static pages
for (const [path, page] of Object.entries(PAGES)) {
  let html = paras(page.body);
  const schema = [];

  if (path === "/") {
    schema.push({
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: SITE_NAME,
      inLanguage: "en-PK",
      publisher: { "@id": `${SITE}/#organization` },
    });
  }
  if (page.faq) {
    html += FAQ_GROUPS.map(
      (g) => `<h2>${esc(g.group)}</h2>` + g.items.map((i) => `<h3>${esc(i.q)}</h3><p>${esc(i.a)}</p>`).join("")
    ).join("");
    schema.push({
      "@type": "FAQPage",
      mainEntity: ALL_FAQS.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    });
  }
  // Category pages list their campaigns; the home and fundraisers pages list all.
  const cat = path.startsWith("/fundraisers/") ? path.split("/")[2].toLowerCase() : null;
  const listed =
    path === "/" || path === "/fundraisers" || path === "/stories"
      ? campaigns
      : cat
        ? campaigns.filter((f) => (f.fundCategory || "").toLowerCase() === cat)
        : [];
  if (listed.length) html += `<h2>Live fundraisers</h2><ul>${listed.map(campaignLink).join("")}</ul>`;

  write(path, render({ path, ...page, html, schema }));
  if (!page.noindex) sitemap.push({ loc: SITE + path, priority: path === "/" ? "1.0" : "0.7" });
}

// Campaign pages
for (const f of campaigns) {
  const path = `/donate/${f._id}`;
  const story = (f.fundraiseStory || "").trim();
  const place = f.cityName ? `${f.cityName}, Pakistan` : "Pakistan";
  const raised = Number(f.donationAmount) || 0;
  const goal = Number(f.totalAmountRaised) || 0;
  const tc = f.teamCase;

  let html = `<p><strong>${esc(formatCategory(f.fundCategory))}</strong> · ${esc(place)}</p>`;
  html += `<p>${pkr(raised)} raised of ${pkr(goal)} goal from ${Number(f.donationCount) || 0} verified donations (as of ${today}).</p>`;
  if (tc?.verifiedOn) html += `<p>Verified in person by the Zaroorat field team${tc.organizer ? ` (${esc(tc.organizer)})` : ""}.</p>`;
  html += story.split(/\n+/).map((p) => `<p>${esc(p)}</p>`).join("");
  if (Array.isArray(tc?.costBreakdown) && tc.costBreakdown.length) {
    html += `<h2>Where the money goes</h2><ul>${tc.costBreakdown.map((c) => `<li>${esc(c.label)}: ${pkr(c.amount)}</li>`).join("")}</ul>`;
  }
  html += `<p><a href="${path}">Donate to this fundraiser</a> by bank transfer to the verified Zaroorat account, then upload your receipt.</p>`;

  const description = clip(`${place}. ${story.replace(/\s+/g, " ")}`, 155);
  const image = absUrl(f.coverImage);
  write(path, render({
    path,
    title: `${f.fundraiseTitle} | Zaroorat`,
    description,
    image,
    heading: f.fundraiseTitle,
    html,
    schema: [{
      "@type": "WebPage",
      url: SITE + path,
      name: f.fundraiseTitle,
      description,
      image,
      inLanguage: "en-PK",
      dateModified: f.updatedAt,
      isPartOf: { "@type": "WebSite", url: `${SITE}/`, name: SITE_NAME },
      about: { "@type": "Thing", name: `${formatCategory(f.fundCategory)} fundraiser in ${place}` },
    }],
  }));
  sitemap.push({ loc: SITE + path, priority: "0.8", lastmod: (f.updatedAt || "").slice(0, 10) || today });
}

writeFileSync(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    sitemap.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod || today}</lastmod><priority>${u.priority}</priority></url>`).join("\n") +
    `\n</urlset>\n`
);

// llms.txt — a plain-text summary for AI assistants, with the live campaign list.
const llms = readFileSync(join(DIST, "llms.txt"), "utf8").replace(
  "{{CAMPAIGNS}}",
  campaigns.length
    ? campaigns.map((f) => `- [${f.fundraiseTitle}](${SITE}/donate/${f._id}): ${formatCategory(f.fundCategory)}, ${f.cityName || "Pakistan"}`).join("\n")
    : `- See ${SITE}/fundraisers`
);
writeFileSync(join(DIST, "llms.txt"), llms);

console.log(`prerender: ${Object.keys(PAGES).length} pages, ${campaigns.length} campaigns, ${sitemap.length} sitemap URLs`);
