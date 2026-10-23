import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Cta from "@/components/Cta";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Careers & Talent Solutions, Hyderabad",
  description: "Join Eject Solutions or hire through us: IT recruitment, staffing and internships in Hyderabad, with transparent, human-reviewed screening.",
  path: "/careers",
});

export default function Careers() {
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs items={[{ name: "Careers", path: "/careers" }]} />
        <p className="eyebrow">Careers &amp; talent</p>
        <h1 className="mt-3 text-4xl sm:text-5xl max-w-3xl">Build your career here, or hire through us</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <section className="panel p-6" aria-labelledby="c1">
            <h2 id="c1" className="text-xl">Work at Eject</h2>
            <p className="mt-2 text-muted">We hire engineers, security testers and AI practitioners who like owning problems end to end. Open roles are listed below as they open. <span className="placeholder-flag">[[CONFIRM: current openings]]</span></p>
            <p className="mt-4"><a className="text-primary underline underline-offset-4" href={`mailto:${site.email}?subject=Application`}>Send your CV and a few lines about what you have built</a></p>
          </section>
          <section className="panel p-6" aria-labelledby="c2">
            <h2 id="c2" className="text-xl">Employers: hire talent</h2>
            <p className="mt-2 text-muted">Contract, contract-to-hire and permanent IT hiring in Hyderabad, with technical screening done by practitioners and AI used only to speed up admin.</p>
            <p className="mt-4"><Link className="text-primary underline underline-offset-4" href="/services/ai-recruitment-it-staffing">How our recruitment works</Link></p>
          </section>
          <section className="panel p-6" aria-labelledby="c3">
            <h2 id="c3" className="text-xl">Candidates and students</h2>
            <p className="mt-2 text-muted">Looking for your next role or an internship with real projects? Our training and internship programme is built around shipped work, not slide decks.</p>
            <p className="mt-4"><Link className="text-primary underline underline-offset-4" href="/services/ai-upskilling-training-internships">AI upskilling and internships</Link></p>
          </section>
        </div>
        <section className="mt-14 max-w-3xl" aria-labelledby="how">
          <h2 id="how" className="text-2xl sm:text-3xl mb-4">How we treat candidates</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted">
            <li>We tell you the role, the salary band and the client type before sharing your CV with anyone.</li>
            <li>No candidate is rejected by an algorithm alone. A person reviews every AI-assisted shortlist.</li>
            <li>We only submit your profile with your consent, and we delete it on request. See our <Link className="text-primary underline underline-offset-4" href="/privacy">privacy policy</Link>.</li>
          </ul>
        </section>
      </div>
      <Cta title="Hiring, or looking to be hired?" text="Tell us the role or the skills you offer and we will take it from there." source="careers" />
    </>
  );
}
