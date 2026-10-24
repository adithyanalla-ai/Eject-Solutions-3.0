import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Mdx from "@/components/Mdx";
import Toc from "@/components/Toc";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import Illustration from "@/components/illustrations/Illustration";
import ServiceCard from "@/components/ServiceCard";
import { getOne, industries, pillars, postsForService, services, slugs, subServices } from "@/lib/content";
import { serviceLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => slugs("services").map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getOne("services", (await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.description, path: `/services/${s.slug}`, ownImage: true });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getOne("services", slug);
  if (!s) notFound();
  const posts = postsForService(slug, 3);
  const inds = industries().filter((i) => i.services.includes(slug));
  const others = pillars().filter((x) => x.slug !== slug && x.slug !== s.parent).slice(0, 5);
  const parent = s.parent ? getOne("services", s.parent) : undefined;
  const subs = subServices(slug);
  const art = (s.illustration ?? "code") as never;
  return (
    <>
      <JsonLd data={serviceLd(s)} />
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Services", path: "/services" }, ...(parent ? [{ name: parent.cardTitle ?? parent.title, path: `/services/${parent.slug}` }] : []), { name: s.cardTitle ?? s.title, path: `/services/${s.slug}` }]} />
        <header className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div>
          <p className="eyebrow">{s.kicker ?? "Service"}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{s.title}</h1>
          <p className="mt-5 text-lg text-muted">{s.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary" data-track="cta_click" data-track-label={`service-${s.slug}-book`}>Book a consultation <Icon name="arrow" size={18} /></Link>
            <a href={whatsappHref(`Hi, I'm interested in ${s.title}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-track="cta_click" data-track-label={`service-${s.slug}-whatsapp`}><Icon name="whatsapp" size={18} /> WhatsApp</a>
          </div>
          </div>
          <Illustration name={art} className="mx-auto h-auto w-full max-w-[420px]" />
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_18rem]">
          <article>
            <Mdx source={s.body} />
            <Faq items={s.faq} />
          </article>
          <aside className="space-y-6 lg:sticky lg:top-24 self-start">
            <Toc items={s.toc} />
            {inds.length > 0 && (
              <div className="panel p-5 text-sm">
                <p className="font-display font-medium mb-3">Industries we apply this in</p>
                <ul className="space-y-2">
                  {inds.map((i) => (<li key={i.slug}><Link className="text-primary hover:underline" href={`/industries/${i.slug}`}>{i.title}</Link></li>))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {subs.length > 0 && (
          <section className="mt-16" aria-labelledby="subs-h">
            <h2 id="subs-h" className="mb-6 text-2xl sm:text-3xl">Sub-services under {s.cardTitle ?? s.title}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{subs.map((x) => (<ServiceCard key={x.slug} s={{ ...x, number: undefined }} />))}</div>
          </section>
        )}

        {posts.length > 0 && (
          <section className="mt-16" aria-labelledby="rel-h">
            <h2 id="rel-h" className="text-2xl sm:text-3xl mb-6">Related reading</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {posts.map((p) => (<PostCard key={p.slug} post={p} kind={p.source ? "news" : "blog"} />))}
            </div>
          </section>
        )}

        <section className="mt-16" aria-labelledby="more-h">
          <h2 id="more-h" className="text-2xl mb-4">Other services</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((o) => (<li key={o.slug}><Link href={`/services/${o.slug}`} className="pill-link">{o.cardTitle ?? o.short ?? o.title}</Link></li>))}
            <li><Link href="/services" className="pill-link">All services →</Link></li>
          </ul>
        </section>
      </div>
      <Cta source={`service-${s.slug}`} />
    </>
  );
}
