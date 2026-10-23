import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import Cta from "@/components/Cta";
import NewsletterForm from "@/components/NewsletterForm";
import { blogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;
const categories = ["AI", "Cybersecurity", "Software", "Hiring", "Compliance"];
const catSlug = (c: string) => c.toLowerCase();

export const metadata: Metadata = buildMetadata({
  title: "Blog: Cybersecurity, AI, Software & Hiring Guides",
  description: "Long-form guides on VAPT, RAG chatbots, LLM security, DPDP compliance, IT hiring and custom software, reviewed by practitioners.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = blogPosts();
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
        <p className="eyebrow">Guides</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Practical guides for builders and buyers</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">Evergreen explainers, written to be useful before you ever talk to us. Every guide shows who wrote it and when it was last reviewed.</p>
        <nav className="segmented mt-8" aria-label="Categories">
          <Link href="/blog" aria-current="true">All</Link>
          {categories.map((c) => (<Link key={c} href={`/blog/category/${catSlug(c)}`}>{c}</Link>))}
        </nav>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (<PostCard key={p.slug} post={p} kind="blog" />))}
        </div>
        <div className="panel mt-14 p-8 grid gap-6 md:grid-cols-2 items-center">
          <div><h2 className="text-2xl">New guides, in your inbox</h2><p className="mt-2 text-muted">Double opt-in digest. Unsubscribe any time.</p></div>
          <NewsletterForm />
        </div>
      </div>
      <Cta />
    </>
  );
}
