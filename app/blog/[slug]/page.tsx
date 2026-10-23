import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Mdx from "@/components/Mdx";
import Toc from "@/components/Toc";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Share from "@/components/Share";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import { fmtDate, getOne, relatedPosts, servicesFor, slugs } from "@/lib/content";
import { articleLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;
export const generateStaticParams = () => slugs("blog").map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getOne("blog", (await params).slug);
  if (!p) return {};
  const author = p.author ? getOne("authors", p.author) : undefined;
  return buildMetadata({
    title: p.title, description: p.description, path: `/blog/${p.slug}`, type: "article", ownImage: true,
    publishedTime: p.date, modifiedTime: p.updated ?? p.date, authors: author ? [author.title] : undefined, tags: p.tags,
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const p = getOne("blog", (await params).slug);
  if (!p) notFound();
  const author = p.author ? getOne("authors", p.author) : undefined;
  const related = relatedPosts(p, 3);
  const svcs = servicesFor(p.services);
  return (
    <>
      <JsonLd data={articleLd(p, "blog", author)} />
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }]} />
        <header className="max-w-3xl">
          <p className="eyebrow">{p.category}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{p.title}</h1>
          <p className="mt-5 text-lg text-muted">{p.description}</p>
          <p className="mt-5 text-sm text-muted">
            By {author ? <Link className="text-fg underline underline-offset-4 hover:text-primary" href={`/authors/${author.slug}`}>{author.title}</Link> : "Eject Solutions"}
            {" · "}Published <time dateTime={p.date}>{fmtDate(p.date)}</time>
            {p.reviewed && <>{" · "}Last reviewed <time dateTime={p.reviewed}>{fmtDate(p.reviewed)}</time></>}
            {" · "}{p.minutes} min read
          </p>
        </header>
        {p.cover && (
          <Image src={p.cover} alt={p.coverAlt ?? ""} width={1200} height={630} priority unoptimized className="mt-8 h-auto w-full max-w-3xl rounded-2xl border border-line" />
        )}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_18rem]">
          <article>
            <Mdx source={p.body} />
            <Faq items={p.faq} />
            <div className="mt-12 border-t border-line pt-6"><Share path={`/blog/${p.slug}`} title={p.title} /></div>
          </article>
          <aside className="space-y-6 lg:sticky lg:top-24 self-start">
            <Toc items={p.toc} />
            {svcs.length > 0 && (
              <div className="glass p-5 text-sm">
                <p className="font-display font-medium mb-3">Related services</p>
                <ul className="space-y-2">{svcs.map((s) => (<li key={s.slug}><Link className="text-primary hover:underline" href={`/services/${s.slug}`}>{s.title}</Link></li>))}</ul>
              </div>
            )}
          </aside>
        </div>
        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="rel-h">
            <h2 id="rel-h" className="text-2xl sm:text-3xl mb-6">Keep reading</h2>
            <div className="grid gap-5 md:grid-cols-3">{related.map((r) => (<PostCard key={r.slug} post={r} kind="blog" />))}</div>
          </section>
        )}
      </div>
      <Cta source={`blog-${p.slug}`} />
    </>
  );
}
