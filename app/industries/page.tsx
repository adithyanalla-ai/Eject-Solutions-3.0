import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Cta from "@/components/Cta";
import { industries } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve: SaaS, Fintech, Health, GCCs",
  description: "How Eject Solutions applies software, security and AI work in SaaS, fintech and BFSI, healthcare and life sciences, and IT services and GCCs.",
  path: "/industries",
});

export default function IndustriesIndex() {
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Industries", path: "/industries" }]} />
        <p className="eyebrow">Industries</p>
        <h1 className="mt-3 text-4xl sm:text-5xl max-w-3xl">Where we focus, and why</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">Hyderabad’s economy leans on software, pharma, financial services and global capability centres. These are the four areas we shape our delivery around.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {industries().map((i) => (
            <article key={i.slug} className="glass glass-hover relative p-6 reveal">
              <h2 className="text-2xl"><Link href={`/industries/${i.slug}`} className="after:absolute after:inset-0">{i.title}</Link></h2>
              <p className="mt-3 text-muted">{i.description}</p>
            </article>
          ))}
        </div>
      </div>
      <Cta />
    </>
  );
}
