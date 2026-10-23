// Generates small deterministic abstract SVG covers for blog posts that reference /covers/<slug>.svg.
// Usage: node scripts/make-covers.mjs   (safe to re-run; add to blog frontmatter: cover: /covers/<slug>.svg)
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/blog");
const out = path.join(process.cwd(), "public/covers");
fs.mkdirSync(out, { recursive: true });

function rng(seed) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)), ((h ^= h >>> 16) >>> 0) / 4294967296);
}

for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
  const slug = f.replace(/\.mdx$/, "");
  const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
  if (!String(data.cover ?? "").startsWith("/covers/")) continue;
  const r = rng(slug);
  const nodes = Array.from({ length: 14 }, () => ({ x: 80 + r() * 1040, y: 60 + r() * 510, r: 4 + r() * 9, c: r() > 0.5 ? "#06b6d4" : "#7c3aed" }));
  const lines = nodes.flatMap((a, i) => nodes.slice(i + 1).filter((b) => Math.hypot(a.x - b.x, a.y - b.y) < 260).map((b) => `<line x1="${a.x.toFixed(0)}" y1="${a.y.toFixed(0)}" x2="${b.x.toFixed(0)}" y2="${b.y.toFixed(0)}" stroke="#2563eb" stroke-opacity=".30"/>`));
  const dots = nodes.map((n) => `<circle cx="${n.x.toFixed(0)}" cy="${n.y.toFixed(0)}" r="${n.r.toFixed(1)}" fill="${n.c}"/>`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><defs><radialGradient id="a" cx="85%" cy="10%" r="70%"><stop offset="0" stop-color="#c4b5fd" stop-opacity=".85"/><stop offset="1" stop-color="#c4b5fd" stop-opacity="0"/></radialGradient><radialGradient id="b" cx="10%" cy="95%" r="70%"><stop offset="0" stop-color="#93c5fd" stop-opacity=".9"/><stop offset="1" stop-color="#93c5fd" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="#eef2f7"/><rect width="1200" height="630" fill="url(#a)"/><rect width="1200" height="630" fill="url(#b)"/>${lines.join("")}${dots.join("")}</svg>`;
  fs.writeFileSync(path.join(out, `${slug}.svg`), svg);
  console.log("cover:", slug);
}
