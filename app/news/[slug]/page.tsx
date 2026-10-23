import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Mdx from "@/components/Mdx";
import Cta from "@/components/Cta";
import Share from "@/components/Share";
import JsonLd from "@/components/JsonLd";
import { fmtDate, getOne, servicesFor, slugs } from "@/lib/content";
import { articleLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;
export const generateStaticParams = () => slugs("news").map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = getOne("news", (await params).slug);
  if (!n) return {};
  const author = n.author ? getOne("authors", n.author) : undefined;
  return buildMetadata({
    title: n.title, description: n.description, path: `/news/${n.slug}`, type: "article", ownImage: true,
    publishedTime: n.date, modifiedTime: n.updated ?? n.date, authors: author ? [author.title] : undefined, tags: n.tags,
  });
}

export default async function NewsItem({ params }: { params: Promise<{ slug: string }> }) {
  const n = getOne("news", (await params).slug);
  if (!n) notFound();
  const author = n.author ? getOne("authors", n.author) : undefined;
  const svcs = servicesFor(n.services);
  return (
    <>
      <JsonLd data={articleLd(n, "news", author)} />
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "News", path: "/news" }, { name: n.title, path: `/news/${n.slug}` }]} />
        <article className="max-w-3xl">
          <header>
            <p className="eyebrow">{n.category ?? "News"}</p>
            <h1 className="mt-3 text-3xl sm:text-5xl">{n.title}</h1>
            <p className="mt-4 text-sm text-muted">
              By {author ? <Link className="text-fg underline underline-offset-4 hover:text-primary" href={`/authors/${author.slug}`}>{author.title}</Link> : "Eject Solutions"}
              {" · "}<time dateTime={n.date}>{fmtDate(n.date)}</time>
            </p>
          </header>
          <div className="mt-8"><Mdx source={n.body} /></div>
          {n.source && (
            <aside className="glass mt-8 p-5" aria-label="Source">
              <p className="font-mono text-xs uppercase tracking-wider text-primary">Source</p>
              <p className="mt-2">
                Original reporting or document: <a href={n.source.url} target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline underline-offset-4">{n.source.name}</a>.
                The summary and commentary above are our own.
              </p>
            </aside>
          )}
          {svcs.length > 0 && (
            <p className="mt-8 text-muted">Related services: {svcs.map((s, i) => (<span key={s.slug}>{i > 0 && ", "}<Link className="text-primary underline underline-offset-4" href={`/services/${s.slug}`}>{s.title}</Link></span>))}.</p>
          )}
          <div className="mt-10 border-t border-line pt-6"><Share path={`/news/${n.slug}`} title={n.title} /></div>
        </article>
      </div>
      <Cta source={`news-${n.slug}`} />
    </>
  );
}
