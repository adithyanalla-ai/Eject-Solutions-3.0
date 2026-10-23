import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

export type Faq = { q: string; a: string };

export type Meta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  reviewed?: string;
  author?: string;
  category?: string;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  faq: Faq[];
  services: string[];
  industries: string[];
  draft: boolean;
  placeholder: boolean;
  // service-specific
  order: number;
  icon?: string;
  short?: string;
  kicker?: string;
  hyderabadHeading?: string;
  keywords: string[];
  // news-specific
  source?: { name: string; url: string };
  // author-specific
  role?: string;
  sameAs: string[];
  // case-study / industry
  sector?: string;
};

export type Entry = Meta & { body: string; words: number; minutes: number; toc: { id: string; text: string }[] };

export type Collection = "services" | "industries" | "blog" | "news" | "case-studies" | "authors";

const ROOT = path.join(process.cwd(), "content");
const cache = new Map<string, Entry[]>();

function toc(body: string) {
  const slugger = new GithubSlugger();
  const out: { id: string; text: string }[] = [];
  let fence = false;
  for (const line of body.split("\n")) {
    if (line.startsWith("```")) fence = !fence;
    if (fence) continue;
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      const text = m[1].replace(/[*_`]/g, "");
      out.push({ id: slugger.slug(text), text });
    }
  }
  return out;
}

const iso = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v) : undefined);

function load(collection: Collection): Entry[] {
  const hit = cache.get(collection);
  if (hit) return hit;
  const dir = path.join(ROOT, collection);
  if (!fs.existsSync(dir)) return [];
  const showDrafts = process.env.SHOW_DRAFTS === "1";
  const today = new Date().toISOString().slice(0, 10);
  const entries: Entry[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!/\.mdx?$/.test(file)) continue;
    const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
    const slug = file.replace(/\.mdx?$/, "");
    const e: Entry = {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: iso(data.date) ?? "2026-01-01",
      updated: iso(data.updated),
      reviewed: iso(data.reviewed),
      author: data.author,
      category: data.category,
      tags: data.tags ?? [],
      cover: data.cover,
      coverAlt: data.coverAlt,
      faq: data.faq ?? [],
      services: data.services ?? [],
      industries: data.industries ?? [],
      draft: Boolean(data.draft),
      placeholder: Boolean(data.placeholder),
      order: data.order ?? 99,
      icon: data.icon,
      short: data.short,
      kicker: data.kicker,
      hyderabadHeading: data.hyderabadHeading,
      keywords: data.keywords ?? [],
      source: data.source,
      role: data.role,
      sameAs: data.sameAs ?? [],
      sector: data.sector,
      body: content,
      words: content.split(/\s+/).filter(Boolean).length,
      minutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
      toc: toc(content),
    };
    if (e.draft && !showDrafts) continue;
    // Scheduled publishing: future-dated posts stay hidden until their date (ISR picks them up).
    if (["blog", "news"].includes(collection) && e.date > today && !showDrafts) continue;
    entries.push(e);
  }
  entries.sort((a, b) =>
    collection === "services" || collection === "industries"
      ? a.order - b.order
      : b.date.localeCompare(a.date),
  );
  cache.set(collection, entries);
  return entries;
}

export const getAll = (c: Collection) => load(c);
export const getOne = (c: Collection, slug: string) => load(c).find((e) => e.slug === slug);
export const slugs = (c: Collection) => load(c).map((e) => e.slug);
export const lastmod = (e: Meta) => e.updated ?? e.date;

export const blogPosts = () => load("blog");
export const newsItems = () => load("news");
export const services = () => load("services");
export const industries = () => load("industries");

export function relatedPosts(e: Entry, limit = 3): Entry[] {
  return blogPosts()
    .filter((p) => p.slug !== e.slug)
    .map((p) => {
      let score = 0;
      if (p.category && p.category === e.category) score += 2;
      score += p.tags.filter((t) => e.tags.includes(t)).length;
      score += p.services.filter((s) => e.services.includes(s) || s === e.slug).length * 3;
      score += p.industries.filter((s) => e.industries.includes(s) || s === e.slug).length * 3;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map((x) => x.p);
}

export const postsForService = (slug: string, limit = 3) =>
  [...blogPosts(), ...newsItems()].filter((p) => p.services.includes(slug)).slice(0, limit);

export const servicesFor = (slugsList: string[]) => services().filter((s) => slugsList.includes(s.slug));

export const fmtDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
