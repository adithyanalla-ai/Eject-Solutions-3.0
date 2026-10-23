import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Mdx from "@/components/Mdx";
import Cta from "@/components/Cta";
import { getOne, servicesFor, slugs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => slugs("case-studies").map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getOne("case-studies", (await params).slug);
  return c ? buildMetadata({ title: c.title, description: c.description, path: `/case-studies/${c.slug}`, noindex: c.placeholder }) : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const c = getOne("case-studies", (await params).slug);
  if (!c) notFound();
  const svcs = servicesFor(c.services);
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Case studies", path: "/case-studies" }, { name: c.title, path: `/case-studies/${c.slug}` }]} />
        {c.placeholder && (
          <p role="note" className="glass mb-6 p-4 border-amber-400/50">
            <span className="placeholder-flag">[[PLACEHOLDER]]</span> This page is a layout template with invented structure only. It describes no real client or result and is excluded from search engines.
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl max-w-3xl">{c.title}</h1>
        <p className="mt-4 text-lg text-muted max-w-2xl">{c.description}</p>
        <div className="mt-10"><Mdx source={c.body} /></div>
        {svcs.length > 0 && (
          <p className="mt-10 text-muted">Services involved: {svcs.map((s, i) => (<span key={s.slug}>{i > 0 && ", "}<Link className="text-primary underline underline-offset-4" href={`/services/${s.slug}`}>{s.title}</Link></span>))}.</p>
        )}
      </div>
      <Cta source={`case-${c.slug}`} />
    </>
  );
}
