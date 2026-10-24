import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceCard from "@/components/ServiceCard";
import Illustration from "@/components/illustrations/Illustration";
import Cta from "@/components/Cta";
import { pillars, subServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services: Software, Security, HR, Marketing & AI",
  description: "Six service pillars with specialist sub-services: custom development, cyber security, HR solutions, content marketing, AI solutions, training.",
  path: "/services",
});

export default function ServicesIndex() {
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">What we do</p>
            <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">Six pillars. One accountable team.</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Each pillar has its own page with the problem, approach, deliverables and FAQs, and several have specialist sub-services. Combine them: most engagements pair a build or AI project with security testing and compliance.
            </p>
          </div>
          <Illustration name="hero" className="mx-auto h-auto w-full max-w-[460px]" />
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars().map((s, i) => (<ServiceCard as="h2" key={s.slug} s={s} subs={subServices(s.slug)} large={i === 0 || i === 3 || i === 5} />))}
        </div>
      </div>
      <Cta />
    </>
  );
}
