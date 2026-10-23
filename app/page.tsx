import Link from "next/link";
import type { Metadata } from "next";
import HeroVisual from "@/components/HeroVisual";
import ServiceCard from "@/components/ServiceCard";
import PostCard from "@/components/PostCard";
import Counter from "@/components/Counter";
import Cta from "@/components/Cta";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import NewsletterForm from "@/components/NewsletterForm";
import { blogPosts, industries, newsItems, services } from "@/lib/content";
import { localBusinessLd, organizationLd, websiteLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Software, Cybersecurity & AI Company in Hyderabad",
  description:
    "Eject Solutions builds custom software, runs VAPT and AI security testing, ships AI agents and RAG assistants, and helps teams hire, from Hyderabad.",
  path: "/",
});

const pillars = [
  { k: "Build", t: "Product engineering", d: "Web, mobile, APIs and cloud, shipped by engineers who also think like attackers.", href: "/services/custom-software-development" },
  { k: "Secure", t: "Security you can verify", d: "VAPT, secure code review, AI/LLM testing and monitoring, with reproducible evidence.", href: "/services/vapt-penetration-testing" },
  { k: "Automate", t: "AI that does real work", d: "RAG assistants and agents wired into your systems, with guardrails and evaluation.", href: "/services/ai-agents-rag-assistants" },
];

export default function Home() {
  const svc = services();
  const posts = blogPosts().slice(0, 3);
  const news = newsItems().slice(0, 3);
  const ind = industries();
  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd(), localBusinessLd()]} />

      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-page grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">Hyderabad · Software · Security · AI</p>
            <h1 className="mt-4 text-4xl sm:text-6xl font-bold">
              Build it. Secure it. <span className="gradient-text">Automate it.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Eject Solutions is a Hyderabad technology company that puts software engineering, cybersecurity and applied AI in one team,
              so the product you ship is also the product you can defend and scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary" data-track="cta_click" data-track-label="hero-book">Book a consultation <Icon name="arrow" size={18} /></Link>
              <Link href="/services" className="btn btn-ghost">Explore services</Link>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-track="cta_click" data-track-label="hero-whatsapp"><Icon name="whatsapp" size={18} /> WhatsApp</a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[420px] text-muted" aria-hidden={false}>
            <HeroVisual />
          </div>
        </div>
      </section>

      <section aria-label="At a glance" className="border-y border-line/60 bg-surface/40">
        <dl className="container-page grid grid-cols-2 gap-6 py-8 text-center md:grid-cols-4">
          {[
            { n: 9, l: "service lines", s: "" },
            { n: 3, l: "disciplines in one team", s: "" },
            { n: 4, l: "industry focus areas", s: "" },
            { n: 1, l: "accountable partner", s: "" },
          ].map((m) => (
            <div key={m.l}>
              <dd className="font-display text-4xl font-bold gradient-text tabular-nums"><Counter to={m.n} suffix={m.s} /></dd>
              <dt className="mt-1 text-sm text-muted">{m.l}</dt>
            </div>
          ))}
        </dl>
        {/* [[CONFIRM: add verified delivery metrics (projects, retention, years) here once documented]] */}
      </section>

      <section className="section" aria-labelledby="pillars-h">
        <div className="container-page">
          <p className="eyebrow">One roof</p>
          <h2 id="pillars-h" className="mt-3 text-3xl sm:text-4xl max-w-2xl">Three disciplines that usually live in three different vendors</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <article key={p.k} className="glass glass-hover relative p-6 reveal">
                <p className="font-mono text-sm text-primary">{p.k}</p>
                <h3 className="mt-2 text-2xl"><Link href={p.href} className="after:absolute after:inset-0">{p.t}</Link></h3>
                <p className="mt-3 text-muted">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="services-h">
        <div className="container-page">
          <p className="eyebrow">Services</p>
          <h2 id="services-h" className="mt-3 text-3xl sm:text-4xl max-w-2xl">Specific services, not a vague “IT solutions” menu</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {svc.map((s, i) => (<ServiceCard key={s.slug} s={s} large={i === 0 || i === 3} />))}
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="local-h">
        <div className="container-page grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <p className="eyebrow">Hyderabad, Kukatpally</p>
            <h2 id="local-h" className="mt-3 text-3xl sm:text-4xl">A cybersecurity and AI development company in Hyderabad</h2>
            <p className="mt-4 text-muted">
              We work with startups, mid-market firms and global capability centres across Hyderabad, Bengaluru and beyond.
              Being local means a security tester can sit in your sprint review, a recruiter can meet your candidate in person, and a
              kickoff does not need three time zones. Looking for a <Link className="text-primary underline underline-offset-4" href="/services/vapt-penetration-testing">VAPT services provider in Hyderabad</Link>,
              an <Link className="text-primary underline underline-offset-4" href="/services/ai-agents-rag-assistants">AI development company in Hyderabad</Link> or
              {" "}<Link className="text-primary underline underline-offset-4" href="/services/custom-software-development">custom software development in Hyderabad</Link>? Start there.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ind.map((i) => (<li key={i.slug}><Link href={`/industries/${i.slug}`} className="rounded-full border border-line px-4 py-1.5 text-sm hover:border-primary hover:text-primary">{i.title}</Link></li>))}
            </ul>
          </div>
          <div className="glass p-6">
            <h3 className="text-xl">How an engagement starts</h3>
            <ol className="mt-4 space-y-4">
              {["A 30-minute call to understand the system, the risk and the deadline.", "A written scope with deliverables, assumptions and a fixed or capped price.", "Weekly visible progress, findings or demos, never a black box.", "Handover with documentation, retest or support, so the work keeps paying off."].map((t, i) => (
                <li key={i} className="flex gap-3"><span className="font-mono text-primary">0{i + 1}</span><span className="text-muted">{t}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="insights-h">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Insights</p>
              <h2 id="insights-h" className="mt-3 text-3xl sm:text-4xl">Guides and commentary, reviewed by people</h2>
            </div>
            <Link href="/blog" className="hidden sm:inline text-primary underline underline-offset-4">All guides</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.map((p) => (<PostCard key={p.slug} post={p} kind="blog" />))}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {news.map((p) => (<PostCard key={p.slug} post={p} kind="news" />))}
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="nl-h">
        <div className="container-page">
          <div className="glass p-8 sm:p-10 grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h2 id="nl-h" className="text-2xl sm:text-3xl">Get the weekly security, AI and hiring digest</h2>
              <p className="mt-2 text-muted">Short, sourced notes on what changed and what it means for Indian businesses. Double opt-in, no spam.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
