import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { addressLine, site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Eject Solutions",
  description: "How Eject Solutions Pvt Ltd collects, uses and protects personal data, including cookies, enquiries, newsletter and recruitment data.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <div className="container-page pt-10 pb-20">
      <Breadcrumbs items={[{ name: "Privacy", path: "/privacy" }]} />
      <h1 className="text-4xl sm:text-5xl">Privacy policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated: 23 October 2026. <span className="placeholder-flag">[[CONFIRM: have counsel review before launch]]</span></p>
      <div className="prose-eject mt-8">
        <h2 className="mt-10 mb-3 text-2xl">Who we are</h2>
        <p>{site.legalName} (CIN {site.cin}), {addressLine}, is the data fiduciary for personal data collected through this website. Contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <h2 className="mt-10 mb-3 text-2xl">What we collect and why</h2>
        <ul>
          <li><strong>Enquiry form:</strong> name, email, company, interest and your message, used to reply to you and to keep a record of the conversation.</li>
          <li><strong>Newsletter:</strong> your email address, only after you confirm via the link we send (double opt-in), used to send the digest. Every email has an unsubscribe link.</li>
          <li><strong>Recruitment:</strong> CVs and profile details you send us, used to match you to roles with your consent.</li>
          <li><strong>Technical data:</strong> standard server logs (IP address, user agent, pages requested) kept for security and troubleshooting.</li>
        </ul>
        <h2 id="cookies" className="mt-10 mb-3 text-2xl">Cookies and analytics</h2>
        <p>The site stores your light or dark theme preference and your cookie choice in your browser’s local storage. These are strictly functional. If analytics is enabled, Google Analytics 4 loads only after you click “Accept analytics”. It records pages viewed and button or form interactions. You can change your choice at any time using “Cookie settings” in the footer.</p>
        <h2 className="mt-10 mb-3 text-2xl">Who we share data with</h2>
        <p>We use service providers to run the site and email: our hosting provider, an email delivery provider (Resend) and, if enabled, Cloudflare Turnstile for spam protection and Google Analytics. We do not sell personal data.</p>
        <h2 className="mt-10 mb-3 text-2xl">How long we keep it</h2>
        <p>Enquiries are kept for as long as needed to respond and for a reasonable period afterwards for business records. Newsletter data is kept until you unsubscribe. Recruitment data is deleted on request or when it is no longer needed for the purpose you gave it.</p>
        <h2 className="mt-10 mb-3 text-2xl">Your rights</h2>
        <p>Under India’s Digital Personal Data Protection Act, 2023, you can ask us to access, correct or erase your personal data, withdraw consent and raise a grievance. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within a reasonable time. <span className="placeholder-flag">[[CONFIRM: named grievance officer and response SLA]]</span></p>
        <h2 className="mt-10 mb-3 text-2xl">Security</h2>
        <p>We use encryption in transit, access controls and server-side validation on all forms. No system is perfectly secure, and we will notify affected people and authorities as the law requires if a breach occurs.</p>
        <h2 className="mt-10 mb-3 text-2xl">Changes</h2>
        <p>We will update this page when our practices change and revise the date above.</p>
      </div>
    </div>
  );
}
