import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Cta from "@/components/Cta";
import { getAll } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies | Eject Solutions",
  description: "Project write-ups from Eject Solutions. Real, client-approved case studies will appear here as they are published.",
  path: "/case-studies",
  noindex: getAll("case-studies").every((c) => c.placeholder),
});

export default function CaseStudies() {
  const list = getAll("case-studies");
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Case studies", path: "/case-studies" }]} />
        <p className="eyebrow">Case studies</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Work we can talk about</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">We publish a case study only with the client’s written approval and only with numbers we can back up. Until then, the entries below are labelled templates.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {list.map((c) => (
            <article key={c.slug} className="glass glass-hover relative p-6">
              {c.placeholder && <p className="placeholder-flag inline-block">[[PLACEHOLDER: not a real project]]</p>}
              <h2 className="mt-3 text-2xl"><Link href={`/case-studies/${c.slug}`} className="after:absolute after:inset-0">{c.title}</Link></h2>
              <p className="mt-2 text-muted">{c.description}</p>
            </article>
          ))}
        </div>
      </div>
      <Cta />
    </>
  );
}
