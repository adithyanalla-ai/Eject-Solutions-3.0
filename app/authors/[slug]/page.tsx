import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Mdx from "@/components/Mdx";
import PostCard from "@/components/PostCard";
import JsonLd from "@/components/JsonLd";
import { blogPosts, getOne, newsItems, slugs } from "@/lib/content";
import { personLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => slugs("authors").map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getOne("authors", (await params).slug);
  return a ? buildMetadata({ title: `Author: ${a.title}`, description: a.description, path: `/authors/${a.slug}` }) : {};
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getOne("authors", (await params).slug);
  if (!a) notFound();
  const posts = [...blogPosts(), ...newsItems()].filter((p) => p.author === a.slug);
  return (
    <div className="container-page pt-10 pb-20">
      <JsonLd data={personLd(a)} />
      <Breadcrumbs items={[{ name: a.title, path: `/authors/${a.slug}` }]} />
      <h1 className="text-4xl sm:text-5xl">{a.title}</h1>
      <p className="mt-2 font-mono text-primary">{a.role}</p>
      <div className="mt-6"><Mdx source={a.body} /></div>
      <h2 className="mt-14 mb-6 text-2xl">Articles by {a.title}</h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (<PostCard key={p.slug} post={p} kind={p.source ? "news" : "blog"} />))}
      </div>
    </div>
  );
}
