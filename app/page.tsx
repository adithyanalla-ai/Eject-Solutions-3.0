import Link from "next/link";
import type { Metadata } from "next";
import HeroConsole from "@/components/HeroConsole";
import SecurityPulse from "@/components/SecurityPulse";
import ProcessTimeline from "@/components/ProcessTimeline";
import TrustStrip from "@/components/TrustStrip";
import Testimonials from "@/components/Testimonials";
import Divider from "@/components/Divider";
import ServiceCard from "@/components/ServiceCard";
import PostCard from "@/components/PostCard";
import Counter from "@/components/Counter";
import Cta from "@/components/Cta";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import NewsletterForm from "@/components/NewsletterForm";
import { blogPosts, fmtDate, industries, newsItems, services } from "@/lib/content";
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
  { k: "Build", t: "Product engineering", d: "Web, mobile, APIs and cloud, shipped by engineers who also think like attackers.", href: "/services/custom-software-development", icon: "code" },
  { k: "Secure", t: "Security you can verify", d: "VAPT, secure code review, AI/LLM testing and monitoring, with reproducible evidence.", href: "/services/vapt-penetration-testing", icon: "shield" },
  { k: "Automate", t: "AI that does real work", d: "RAG assistants and agents wired into your systems, with guardrails and evaluation.", href: "/services/ai-agents-rag-assistants", icon: "bot" },
];

export default function Home() {
  const svc = services();
  const posts = blogPosts().slice(0, 3);
  const news = newsItems().slice(0, 3);
  const ind = industries();
  const headlines = news.map((n) => ({ title: n.title, href: `/news/${n.slug}`, category: n.category ?? "News", date: fmtDate(n.date) }));
  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd(), localBusinessLd()]} />

      <section className="relative">
        <div className="container-page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="eyebrow">Hyderabad · Software · Security · AI</p>
            <h1 className="mt-4 text-4xl font-bold sm:text-6xl">
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
          <HeroConsole items={headlines} />
        </div>
      </section>

      <section aria-label="At a glance" className="container-page pb-6">
        <dl className="panel panel-lg grid grid-cols-2 gap-4 p-5 text-center md:grid-cols-4">
          {[
            { n: 9, l: "service lines" },
            { n: 3, l: "disciplines in one team" },
            { n: 4, l: "industry focus areas" },
            { n: 1, l: "accountable partner" },
          ].map((m) => (
            <div key={m.l} className="panel-inset px-3 py-4">
              <dd className="font-display text-4xl font-bold tabular-nums text-primary"><Counter to={m.n} /></dd>
              <dt className="mt-1 text-sm text-muted">{m.l}</dt>
            </div>
          ))}
        </dl>
        {/* [[CONFIRM: add verified delivery metrics (projects, retention, years) here once documented]] */}
      </section>

      <TrustStrip />
      {/* [[CONFIRM: trust pills (certifications/partners) appear once added to content/trust.json]] */}

      <section className="section" aria-labelledby="pillars-h">
        <div className="container-page">
          <p className="eyebrow">One roof</p>
          <h2 id="pillars-h" className="mt-3 max-w-2xl text-3xl sm:text-4xl">Three disciplines that usually live in three different vendors</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <article key={p.k} className="panel lift reveal p-6">
                <span className="keycap mb-4"><Icon name={p.icon} /></span>
                <p className="font-mono text-sm text-primary">{p.k}</p>
                <h3 className="mt-1 text-2xl"><Link href={p.href} className="after:absolute after:inset-0 after:rounded-2xl">{p.t}</Link></h3>
                <p className="mt-3 text-muted">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="section" aria-labelledby="services-h">
        <div className="container-page">
          <p className="eyebrow">Services</p>
          <h2 id="services-h" className="mt-3 max-w-2xl text-3xl sm:text-4xl">Specific services, not a vague “IT solutions” menu</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {svc.map((s, i) => (<ServiceCard key={s.slug} s={s} large={i === 0 || i === 3} />))}
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="process-h">
        <div className="container-page">
          <p className="eyebrow">Process</p>
          <h2 id="process-h" className="mt-3 mb-10 max-w-2xl text-3xl sm:text-4xl">Discover, build, secure, automate</h2>
          <ProcessTimeline />
        </div>
      </section>

      <Divider />

      <section className="section" aria-labelledby="local-h">
        <div className="container-page grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
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
              {ind.map((i) => (<li key={i.slug}><Link href={`/industries/${i.slug}`} className="pill-link">{i.title}</Link></li>))}
            </ul>
          </div>
          <SecurityPulse />
        </div>
      </section>

      <Testimonials />

      <section className="section pt-0" aria-labelledby="insights-h">
        <div className="container-page">
          <p className="eyebrow">Insights</p>
          <h2 id="insights-h" className="mt-3 text-3xl sm:text-4xl">Latest from the blog and news</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-baseline justify-between"><h3 className="text-xl">Guides</h3><Link href="/blog" className="text-sm text-primary underline underline-offset-4">All guides</Link></div>
              <div className="space-y-5">{posts.map((p) => (<PostCard key={p.slug} post={p} kind="blog" />))}</div>
            </div>
            <div>
              <div className="mb-4 flex items-baseline justify-between"><h3 className="text-xl">News and commentary</h3><Link href="/news" className="text-sm text-primary underline underline-offset-4">All news</Link></div>
              <div className="space-y-5">{news.map((p) => (<PostCard key={p.slug} post={p} kind="news" />))}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="nl-h">
        <div className="container-page">
          <div className="panel panel-lg grid items-center gap-6 p-8 sm:p-10 md:grid-cols-2">
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
