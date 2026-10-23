// Content QA gate. Run automatically before `npm run build` (prebuild). Exits 1 on errors.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content");
const rules = {
  services: { min: 700, faq: 5 },
  blog: { min: 1200, max: 2000, faq: 3 },
  news: { min: 150, max: 300, source: true },
};
let errors = 0, warnings = 0;
const err = (f, m) => { errors++; console.error(`  ✗ ${f}: ${m}`); };
const warn = (f, m) => { warnings++; console.warn(`  ! ${f}: ${m}`); };
const wc = (s) => s.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
const slugs = {};

for (const col of fs.readdirSync(root)) {
  const dir = path.join(root, col);
  if (!fs.statSync(dir).isDirectory()) continue;
  slugs[col] = new Set();
  for (const file of fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
    const id = `${col}/${file}`;
    const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
    if (data.draft) { console.log(`  · ${id}: draft, skipped (not published)`); continue; }
    slugs[col].add(file.replace(/\.mdx?$/, ""));
    const t = String(data.title ?? "");
    if (!t) err(id, "missing title");
    if (!data.description) err(id, "missing description");
    if (String(data.description ?? "").length >= 155) err(id, `description ${data.description.length} chars (must be < 155)`);
    // Page <title> adds " | Eject Solutions" only when it fits under 60 chars, so the title itself must be < 60.
    if (["services", "blog", "news", "industries"].includes(col) && t.length >= 60) err(id, `title ${t.length} chars (must be < 60)`);
    const r = rules[col];
    const words = wc(content);
    if (r) {
      if (r.min && words < r.min) err(id, `${words} words (min ${r.min})`);
      if (r.max && words > r.max) err(id, `${words} words (max ${r.max})`);
      if (r.faq && (data.faq?.length ?? 0) < r.faq) err(id, `needs ${r.faq}+ FAQ items (has ${data.faq?.length ?? 0})`);
      if (r.source && !data.source?.url) err(id, "news item must cite a source url");
    }
    if (col === "blog" && !data.reviewed) warn(id, "no `reviewed:` date. Add it once a human editor has signed off");
    if (/^#\s/m.test(content)) err(id, "body contains an H1; the template renders the H1");
    if (/\[\[CONFIRM|PLACEHOLDER/.test(content) && !data.placeholder && col !== "authors") warn(id, "contains unresolved [[CONFIRM/PLACEHOLDER]] marker");
    // internal link check (done after all slugs known)
    data.__links = [...content.matchAll(/\]\((\/[^)#\s]+)/g)].map((m) => m[1]);
    data.__id = id;
    (global.__all ??= []).push(data);
  }
}
const valid = (p) => {
  const [, a, b] = p.split("/");
  if (!a) return true;
  const map = { services: "services", blog: "blog", news: "news", industries: "industries", "case-studies": "case-studies", authors: "authors" };
  if (map[a] && b && b !== "category") return slugs[map[a]]?.has(b);
  return true;
};
for (const d of global.__all) for (const l of d.__links) if (!valid(l)) err(d.__id, `broken internal link ${l}`);

console.log(`\nContent check: ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
