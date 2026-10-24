import Link from "next/link";
import { Logo } from "./Header";
import Icon from "./Icon";
import NewsletterForm from "./NewsletterForm";
import CookieSettings from "./CookieSettings";
import { addressLine, site, whatsappHref } from "@/lib/site";
import { industries, pillars, subServices } from "@/lib/content";

export default function Footer() {
  const svc = pillars();
  const ind = industries();
  return (
    <footer className="mt-8">
      <hr className="emboss-rule mx-auto max-w-page" />
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-muted">Software, security and AI under one roof. Built in Hyderabad for teams in India and beyond.</p>
          <address className="mt-4 not-italic text-sm text-muted space-y-1">
            <p className="text-fg font-medium">{site.legalName}</p>
            <p>{addressLine}</p>
            <p>CIN: {site.cin}</p>
            <p><a className="hover:text-primary underline-offset-4 hover:underline" href={`mailto:${site.email}`}>{site.email}</a></p>
            {site.phone && <p><a className="hover:text-primary" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></p>}
            <p><a className="hover:text-primary underline-offset-4 hover:underline" href={whatsappHref()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></p>
          </address>
          <div className="mt-6 max-w-sm">
            <p className="font-display font-medium mb-2">Weekly digest</p>
            <NewsletterForm compact />
          </div>
        </div>
        <nav aria-label="Services" className="lg:col-span-1">
          <p className="font-display font-medium mb-3">Services</p>
          <ul className="space-y-2 text-sm text-muted">
            {svc.map((s) => (
              <li key={s.slug}>
                <Link className="hover:text-primary" href={`/services/${s.slug}`}>{s.cardTitle ?? s.title}</Link>
                {subServices(s.slug).length > 0 && (
                  <ul className="mt-1 space-y-1 border-l border-line pl-3">
                    {subServices(s.slug).map((x) => (<li key={x.slug}><Link className="text-xs hover:text-primary" href={`/services/${x.slug}`}>{x.cardTitle ?? x.title}</Link></li>))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Industries and company" className="lg:col-span-2 grid grid-cols-2 gap-8">
          <div>
            <p className="font-display font-medium mb-3">Industries</p>
            <ul className="space-y-2 text-sm text-muted">
              {ind.map((i) => (<li key={i.slug}><Link className="hover:text-primary" href={`/industries/${i.slug}`}>{i.title}</Link></li>))}
            </ul>
            <p className="font-display font-medium mt-6 mb-3">Insights</p>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link className="hover:text-primary" href="/blog">Blog guides</Link></li>
              <li><Link className="hover:text-primary" href="/news">News &amp; commentary</Link></li>
              <li><a className="hover:text-primary" href="/rss.xml">RSS feed</a></li>
            </ul>
          </div>
          <div>
            <p className="font-display font-medium mb-3">Company</p>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link className="hover:text-primary" href="/about">About</Link></li>
              <li><Link className="hover:text-primary" href="/case-studies">Case studies</Link></li>
              <li><Link className="hover:text-primary" href="/careers">Careers &amp; talent</Link></li>
              <li><Link className="hover:text-primary" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-primary" href="/privacy">Privacy</Link></li>
              <li><Link className="hover:text-primary" href="/terms">Terms</Link></li>
              <li><CookieSettings enabled={Boolean(site.ga4)} /></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container-page pb-10">
        <div className="panel panel-lg lift grid items-center gap-6 p-6 md:grid-cols-[auto_1fr_auto]">
          <span className="keycap !h-14 !w-14"><Icon name="pin" size={26} /></span>
          <div>
            <p className="font-display text-lg font-medium">Visit us in Kukatpally, Hyderabad</p>
            <p className="text-muted">{addressLine}</p>
          </div>
          <a className="btn btn-ghost" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`} target="_blank" rel="noopener noreferrer">Open in Google Maps <Icon name="arrow" size={16} /></a>
        </div>
      </div>
      <div className="pb-24 text-center text-sm text-muted">
        © {new Date().getFullYear()} {site.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
