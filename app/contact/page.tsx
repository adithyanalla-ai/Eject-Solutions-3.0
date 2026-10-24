import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import Illustration from "@/components/illustrations/Illustration";
import JsonLd from "@/components/JsonLd";
import { localBusinessLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { addressLine, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Eject Solutions, Kukatpally Hyderabad",
  description: "Book a consultation with Eject Solutions. Email, WhatsApp or visit us in Kukatpally, Hyderabad 500072. We reply within one working day.",
  path: "/contact",
});

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
  return (
    <div className="container-page pt-10 pb-20">
      <JsonLd data={localBusinessLd()} />
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <p className="eyebrow">Contact</p>
      <h1 className="mt-3 text-4xl sm:text-5xl max-w-3xl">Book a consultation</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">Describe the build, the risk or the hiring need. We reply within one working day, usually with questions rather than a brochure.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm turnstileKey={site.turnstileSiteKey} />
        <div className="space-y-6">
          <Illustration name="contact" className="mx-auto h-auto w-full max-w-[260px]" />
          <address className="panel p-6 not-italic space-y-3">
            <p className="font-display text-lg font-medium">{site.legalName}</p>
            <p className="flex gap-3 text-muted"><Icon name="pin" className="mt-1 shrink-0 text-primary" /> {addressLine}</p>
            <p className="flex gap-3"><Icon name="mail" className="mt-1 shrink-0 text-primary" /> <a className="text-primary underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></p>
            {site.phone && <p className="text-muted">Phone: <a className="text-primary" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></p>}
            <p className="flex gap-3"><Icon name="whatsapp" className="mt-1 shrink-0 text-primary" /> <a className="text-primary underline underline-offset-4" href={whatsappHref()} target="_blank" rel="noopener noreferrer" data-track="cta_click" data-track-label="contact-whatsapp">Message us on WhatsApp</a></p>
            <p className="text-sm text-muted">Hours: Monday to Friday, {site.hours.opens} to {site.hours.closes} IST.</p>
            <p className="text-sm text-muted">CIN: {site.cin}</p>
          </address>
          <iframe
            title="Map showing Eject Solutions in Kukatpally, Hyderabad"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            width="600"
            height="320"
            className="h-80 w-full rounded-3xl border border-white/70 shadow-[0_10px_30px_rgba(15,23,42,.08)]"
          />
        </div>
      </div>
    </div>
  );
}
