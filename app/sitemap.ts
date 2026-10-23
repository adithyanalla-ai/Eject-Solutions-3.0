import type { MetadataRoute } from "next";
import { blogPosts, getAll, lastmod, newsItems } from "@/lib/content";
import { SITE_URL, staticLastmod } from "@/lib/site";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${SITE_URL}${p}`;
  const latest = (list: { date: string; updated?: string }[], fb: string) =>
    list.reduce((m, e) => ((e.updated ?? e.date) > m ? (e.updated ?? e.date) : m), fb);
  const blog = blogPosts();
  const news = newsItems();
  const statics = Object.entries(staticLastmod).map(([p, d]) => ({
    url: u(p),
    lastModified: p === "/blog" ? latest(blog, d) : d,
    priority: p === "/" ? 1 : 0.7,
  }));
  const cats = ["ai", "cybersecurity", "software", "hiring", "compliance"];
  return [
    ...statics,
    { url: u("/blog"), lastModified: latest(blog, "2026-10-23"), priority: 0.8 },
    { url: u("/news"), lastModified: latest(news, "2026-10-23"), priority: 0.7 },
    ...cats.map((c) => ({ url: u(`/blog/category/${c}`), lastModified: latest(blog.filter((p) => p.category?.toLowerCase() === c), "2026-10-23"), priority: 0.5 })),
    ...getAll("services").map((e) => ({ url: u(`/services/${e.slug}`), lastModified: lastmod(e), priority: 0.9 })),
    ...getAll("industries").map((e) => ({ url: u(`/industries/${e.slug}`), lastModified: lastmod(e), priority: 0.7 })),
    ...getAll("case-studies").filter((e) => !e.placeholder).map((e) => ({ url: u(`/case-studies/${e.slug}`), lastModified: lastmod(e), priority: 0.6 })),
    ...getAll("authors").map((e) => ({ url: u(`/authors/${e.slug}`), lastModified: lastmod(e), priority: 0.4 })),
    ...blog.map((e) => ({ url: u(`/blog/${e.slug}`), lastModified: lastmod(e), priority: 0.8 })),
    ...news.map((e) => ({ url: u(`/news/${e.slug}`), lastModified: lastmod(e), priority: 0.5 })),
  ];
}
