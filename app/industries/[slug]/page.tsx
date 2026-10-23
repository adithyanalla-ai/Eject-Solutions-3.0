import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Mdx from "@/components/Mdx";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import PostCard from "@/components/PostCard";
import { getOne, relatedPosts, servicesFor, slugs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => slugs("industries").map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const i = getOne("industries", (await params).slug);
  return i ? buildMetadata({ title: i.title, description: i.description, path: `/industries/${i.slug}`, ownImage: true }) : {};
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const i = getOne("industries", (await params).slug);
  if (!i) notFound();
  const svcs = servicesFor(i.services);
  const posts = relatedPosts(i, 3);
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Industries", path: "/industries" }, { name: i.title, path: `/industries/${i.slug}` }]} />
        <header className="max-w-3xl">
          <p className="eyebrow">Industry</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{i.title}</h1>
          <p className="mt-5 text-lg text-muted">{i.description}</p>
        </header>
        <div className="mt-10"><Mdx source={i.body} /></div>
        <section className="mt-14" aria-labelledby="ind-svc">
          <h2 id="ind-svc" className="text-2xl sm:text-3xl mb-5">Services we bring to {i.title.toLowerCase()}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {svcs.map((s) => (
              <li key={s.slug} className="panel lift p-5">
                <Link href={`/services/${s.slug}`} className="font-display text-lg hover:text-primary">{s.title}</Link>
                <p className="mt-1 text-sm text-muted">{s.short ?? s.description}</p>
              </li>
            ))}
          </ul>
        </section>
        <Faq items={i.faq} />
        {posts.length > 0 && (
          <section className="mt-16" aria-labelledby="ind-rel">
            <h2 id="ind-rel" className="text-2xl sm:text-3xl mb-6">Related reading</h2>
            <div className="grid gap-5 md:grid-cols-3">{posts.map((p) => (<PostCard key={p.slug} post={p} kind="blog" />))}</div>
          </section>
        )}
      </div>
      <Cta source={`industry-${i.slug}`} />
    </>
  );
}
