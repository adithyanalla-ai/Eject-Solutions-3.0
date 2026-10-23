import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Cta from "@/components/Cta";
import JsonLd from "@/components/JsonLd";
import { getAll } from "@/lib/content";
import { organizationLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { addressLine, site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About Eject Solutions Pvt Ltd, Hyderabad",
  description: "Eject Solutions Pvt Ltd (CIN U62099TS2023PTC175197) is a Hyderabad company building software, security and AI capability under one team.",
  path: "/about",
});

const principles = [
  { h: "Specific over impressive", p: "We name the deliverable, the method and the limits of what we will promise. If a claim cannot be checked, we do not make it." },
  { h: "Security is part of the build", p: "Threat modelling in design, review in pull requests and testing before launch is cheaper than a post-incident rebuild, so we do it in that order." },
  { h: "AI with evidence", p: "An assistant ships when it passes an evaluation set we agreed in advance, not when the demo looks good." },
  { h: "Humans stay accountable", p: "Our content, reports and recommendations are reviewed by a named person. Automation drafts; people decide." },
];

export default function About() {
  const authors = getAll("authors");
  return (
    <>
      <JsonLd data={organizationLd()} />
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
        <p className="eyebrow">About</p>
        <h1 className="mt-3 text-4xl sm:text-5xl max-w-3xl">A small, senior team for software, security and AI</h1>
        <div className="mt-6 max-w-3xl space-y-4 text-lg text-muted">
          <p>Eject Solutions Pvt Ltd is a technology company based in Kukatpally, Hyderabad. We started from a simple observation: companies buy software from one vendor, security testing from another, AI experiments from a third, and hiring from a fourth, and nobody owns the gaps between them.</p>
          <p>So we put those capabilities in one team. The engineers who build your product understand how it will be attacked. The security consultants who test it can read the code. The AI work is designed with data leakage and prompt injection in mind from the first sprint. And when you need more people, our recruitment practice already knows the stack.</p>
          <p className="text-base"><span className="placeholder-flag">[[CONFIRM: founders’ names, team size, founding story and any real milestones to add here]]</span></p>
        </div>

        <section className="mt-16" aria-labelledby="princ">
          <h2 id="princ" className="text-2xl sm:text-3xl mb-6">How we work</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.h} className="panel p-6 reveal"><h3 className="text-xl">{p.h}</h3><p className="mt-2 text-muted">{p.p}</p></div>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="reg">
          <h2 id="reg" className="text-2xl sm:text-3xl mb-6">Company registration and contact</h2>
          <dl className="panel grid gap-x-8 gap-y-4 p-6 sm:grid-cols-2">
            <div><dt className="text-sm text-muted">Registered name</dt><dd className="font-medium">{site.legalName}</dd></div>
            <div><dt className="text-sm text-muted">Corporate Identity Number (CIN)</dt><dd className="font-mono">{site.cin}</dd></div>
            <div><dt className="text-sm text-muted">Office</dt><dd>{addressLine}</dd></div>
            <div><dt className="text-sm text-muted">Email</dt><dd><a className="text-primary underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div><dt className="text-sm text-muted">GSTIN</dt><dd><span className="placeholder-flag">[[CONFIRM: GSTIN]]</span></dd></div>
            <div><dt className="text-sm text-muted">Registered office address</dt><dd><span className="placeholder-flag">[[CONFIRM: full registered address if different from office]]</span></dd></div>
          </dl>
          <p className="mt-3 text-sm text-muted">You can verify the CIN on the Ministry of Corporate Affairs company master data portal.</p>
        </section>

        <section className="mt-16" aria-labelledby="who">
          <h2 id="who" className="text-2xl sm:text-3xl mb-6">Who writes and reviews our content</h2>
          <ul className="grid gap-5 md:grid-cols-2">
            {authors.map((a) => (
              <li key={a.slug} className="panel p-6">
                <h3 className="text-xl"><Link className="hover:text-primary" href={`/authors/${a.slug}`}>{a.title}</Link></h3>
                <p className="font-mono text-sm text-primary">{a.role}</p>
                <p className="mt-2 text-muted">{a.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="cred">
          <h2 id="cred" className="text-2xl sm:text-3xl mb-4">Certifications and memberships</h2>
          <p className="max-w-3xl text-muted">We list a certification, partnership or membership here only after it has been verified and we can link to the evidence. <span className="placeholder-flag">[[CONFIRM: add confirmed certifications, e.g. individual practitioner certs or ISO status, with proof links]]</span></p>
        </section>
      </div>
      <Cta />
    </>
  );
}
