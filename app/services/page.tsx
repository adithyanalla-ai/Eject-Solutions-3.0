import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceCard from "@/components/ServiceCard";
import Cta from "@/components/Cta";
import { services } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services: Software, Cybersecurity & AI Hyderabad",
  description: "Nine specific services: custom software, VAPT, AI agents and RAG, AI security, threat monitoring, compliance, recruitment and training.",
  path: "/services",
});

export default function ServicesIndex() {
  const list = services();
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
        <p className="eyebrow">What we do</p>
        <h1 className="mt-3 text-4xl sm:text-5xl max-w-3xl">Services for teams that build, defend and automate</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Each service is scoped around a concrete deliverable. Pick one, or combine them: most of our engagements pair a build or AI project with security testing and compliance.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (<ServiceCard key={s.slug} s={s} />))}
        </div>
      </div>
      <Cta />
    </>
  );
}
