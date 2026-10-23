// Crawls every URL in sitemap.xml on a running server and checks on-page SEO invariants.
// Usage: npm run build && npm start (other terminal) && node scripts/audit-seo.mjs http://localhost:3000
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const get = async (p) => (await fetch(base + p, { redirect: "manual" }));
const sm = await (await get("/sitemap.xml")).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
let bad = 0;
const fail = (u, m) => { bad++; console.log(`✗ ${u}: ${m}`); };
const seen = new Set(urls);
const toCheckLinks = new Set();

for (const u of urls) {
  const res = await get(u);
  if (res.status !== 200) { fail(u, `status ${res.status}`); continue; }
  const h = await res.text();
  const dec = (x) => x.replace(/&#x27;/g, "'").replace(/&quot;/g, "\"").replace(/&amp;/g, "&");
  const title = dec(/<title>([^<]*)<\/title>/.exec(h)?.[1] ?? "");
  const desc = dec(/<meta name="description" content="([^"]*)"/.exec(h)?.[1] ?? "");
  const canon = /<link rel="canonical" href="([^"]*)"/.exec(h)?.[1];
  const h1s = (h.match(/<h1[\s>]/g) ?? []).length;
  if (!title || title.length >= 60) fail(u, `title length ${title.length}: "${title}"`);
  if (!desc || desc.length >= 155) fail(u, `description length ${desc.length}`);
  if (!canon) fail(u, "missing canonical");
  if (h1s !== 1) fail(u, `${h1s} h1 elements`);
  if (!/property="og:image"/.test(h)) fail(u, "missing og:image");
  for (const m of h.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(m[0])) fail(u, "img without alt");
    if (!/\bwidth="/.test(m[0]) || !/\bheight="/.test(m[0])) fail(u, "img without width/height");
  }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail(u, "invalid JSON-LD"); }
  }
  for (const m of h.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) toCheckLinks.add(m[1] + "|" + u);
}
for (const entry of toCheckLinks) {
  const [l, from] = entry.split("|");
  if (seen.has(l) || /\.(xml|svg|png)$|^\/(rss\.xml|api)/.test(l)) continue;
  const r = await get(l);
  seen.add(l);
  if (![200, 301, 308].includes(r.status)) fail(from, `broken link ${l} (${r.status})`);
}
console.log(`\nAudited ${urls.length} sitemap URLs: ${bad ? bad + " problem(s)" : "all OK"}`);
process.exit(bad ? 1 : 0);
