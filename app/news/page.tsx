import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import Cta from "@/components/Cta";
import { newsItems } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "News: AI, Cybersecurity & Hyderabad Tech Updates",
  description: "Short, sourced updates on AI, cybersecurity and the Hyderabad tech ecosystem, each with our own commentary for Indian businesses.",
  path: "/news",
});

export default function NewsIndex() {
  const items = newsItems();
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "News", path: "/news" }]} />
        <p className="eyebrow">News &amp; commentary</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">What changed, and why it matters in India</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">Short notes with our own take and a link to the original source. We summarise in our words and never republish source text. Prefer a feed? <a className="text-primary underline underline-offset-4" href="/rss.xml">Subscribe via RSS</a>.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map((p) => (<PostCard key={p.slug} post={p} kind="news" />))}</div>
      </div>
      <Cta />
    </>
  );
}
