import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import Cta from "@/components/Cta";
import { blogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;
const cats: Record<string, { name: string; blurb: string }> = {
  ai: { name: "AI", blurb: "RAG assistants, agents and how to ship AI features that survive contact with real users." },
  cybersecurity: { name: "Cybersecurity", blurb: "VAPT, secure code review, monitoring and incident readiness explained without the jargon fog." },
  software: { name: "Software", blurb: "Scoping, architecture and delivery practices for custom software that stays maintainable." },
  hiring: { name: "Hiring", blurb: "IT recruitment, assessment and onboarding for Hyderabad’s competitive talent market." },
  compliance: { name: "Compliance", blurb: "ISO 27001, SOC 2 and India’s DPDP Act, translated into work you can plan." },
};
export const generateStaticParams = () => Object.keys(cats).map((category) => ({ category }));

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const c = cats[(await params).category];
  return c
    ? buildMetadata({ title: `${c.name} Guides`, description: c.blurb, path: `/blog/category/${(await params).category}` })
    : {};
}

export default async function Category({ params }: { params: Promise<{ category: string }> }) {
  const key = (await params).category;
  const c = cats[key];
  if (!c) notFound();
  const posts = blogPosts().filter((p) => p.category === c.name);
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: c.name, path: `/blog/category/${key}` }]} />
        <h1 className="text-4xl sm:text-5xl">{c.name} guides</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{c.blurb}</p>
        {posts.length === 0 ? (
          <p className="mt-10 text-muted">New {c.name.toLowerCase()} guides are on the way.</p>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => (<PostCard key={p.slug} post={p} kind="blog" />))}</div>
        )}
      </div>
      <Cta />
    </>
  );
}
