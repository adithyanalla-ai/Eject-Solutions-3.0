// Runs mobile Lighthouse against a running server and writes reports/lighthouse-summary.json
// Usage: npm run build && npm start; node scripts/lighthouse.mjs http://localhost:3000
import fs from "node:fs";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const pages = ["/", "/services", "/services/hr-solutions", "/blog/vapt-services-hyderabad-what-to-expect", "/contact"];
const chromePath = process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"] });
const out = [];
fs.mkdirSync("reports", { recursive: true });
for (const p of pages) {
  const { lhr } = await lighthouse(base + p, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] });
  const s = Object.fromEntries(Object.entries(lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
  const a = lhr.audits;
  const row = { page: p, scores: s, lcp: a["largest-contentful-paint"].displayValue, cls: a["cumulative-layout-shift"].displayValue, tbt: a["total-blocking-time"].displayValue, fcp: a["first-contentful-paint"].displayValue,
    failing: Object.values(a).filter((x) => x.score !== null && x.score < 1 && x.scoreDisplayMode === "binary").map((x) => x.id) };
  out.push(row);
  console.log(JSON.stringify(row));
}
fs.writeFileSync("reports/lighthouse-summary.json", JSON.stringify(out, null, 2));
await chrome.kill();
