import { blogPosts, newsItems } from "@/lib/content";
import { SITE_URL, site } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

export function GET() {
  const items = [
    ...blogPosts().map((p) => ({ ...p, kind: "blog" })),
    ...newsItems().map((p) => ({ ...p, kind: "news" })),
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 40);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(site.name)}: guides and news</title>
<link>${SITE_URL}</link>
<description>${esc(site.description)}</description>
<language>en-IN</language>
<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items.map((p) => `<item>
<title>${esc(p.title)}</title>
<link>${SITE_URL}/${p.kind}/${p.slug}</link>
<guid isPermaLink="true">${SITE_URL}/${p.kind}/${p.slug}</guid>
<pubDate>${new Date(`${p.date}T06:00:00Z`).toUTCString()}</pubDate>
<description>${esc(p.description)}</description>
${p.category ? `<category>${esc(p.category)}</category>` : ""}
</item>`).join("\n")}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
