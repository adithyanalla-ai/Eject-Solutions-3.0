import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use | Eject Solutions",
  description: "Terms governing use of the Eject Solutions website, its content and enquiry forms. Client work is governed by separate signed agreements.",
  path: "/terms",
});

export default function Terms() {
  return (
    <div className="container-page pt-10 pb-20">
      <Breadcrumbs items={[{ name: "Terms", path: "/terms" }]} />
      <h1 className="text-4xl sm:text-5xl">Terms of use</h1>
      <p className="mt-3 text-sm text-muted">Last updated: 23 October 2026. <span className="placeholder-flag">[[CONFIRM: have counsel review before launch]]</span></p>
      <div className="prose-eject mt-8">
        <h2 className="mt-10 mb-3 text-2xl">About these terms</h2>
        <p>This website is operated by {site.legalName}. By using it you agree to these terms. Services we deliver to clients are governed by separate written agreements that take priority over anything on this site.</p>
        <h2 className="mt-10 mb-3 text-2xl">Information, not advice</h2>
        <p>Guides, news and commentary are general information. They are not legal, compliance or professional advice, and you should take advice specific to your situation, especially on regulation such as the DPDP Act.</p>
        <h2 className="mt-10 mb-3 text-2xl">Intellectual property</h2>
        <p>Site content, design and code are owned by us or our licensors. You may quote short extracts with attribution and a link. Do not republish full articles without written permission. Third-party names and marks belong to their owners.</p>
        <h2 className="mt-10 mb-3 text-2xl">Acceptable use</h2>
        <p>Do not attempt to probe, scan or attack this website without our written permission. If you find a security issue, email <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond and credit good-faith reports.</p>
        <h2 className="mt-10 mb-3 text-2xl">Links to other sites</h2>
        <p>News items link to third-party sources. We do not control or endorse those sites.</p>
        <h2 className="mt-10 mb-3 text-2xl">Liability</h2>
        <p>The site is provided as is. To the extent permitted by law, we are not liable for loss arising from your use of the site or reliance on its content.</p>
        <h2 className="mt-10 mb-3 text-2xl">Governing law</h2>
        <p>These terms are governed by the laws of India. Courts at Hyderabad, Telangana have jurisdiction.</p>
      </div>
    </div>
  );
}
