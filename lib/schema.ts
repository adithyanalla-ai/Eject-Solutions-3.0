import { absoluteUrl, addressLine, site, SITE_URL } from "./site";
import type { Entry, Faq } from "./content";

const ORG_ID = `${SITE_URL}/#organization`;
const orgRef = { "@id": ORG_ID };

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  legalName: site.legalName,
  url: SITE_URL,
  logo: absoluteUrl("/icon.svg"),
  description: site.description,
  identifier: { "@type": "PropertyValue", propertyID: "CIN", value: site.cin },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      ...(site.phone ? { telephone: site.phone } : {}),
      areaServed: "IN",
      availableLanguage: ["en", "hi", "te"],
    },
  ],
  ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.name,
  publisher: orgRef,
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

export const localBusinessLd = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: site.legalName,
  url: SITE_URL,
  image: absoluteUrl("/opengraph-image"),
  description: site.description,
  ...(site.phone ? { telephone: site.phone } : {}),
  email: site.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: site.hours.days, opens: site.hours.opens, closes: site.hours.closes },
  ],
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "Country", name: "India" },
  ],
  parentOrganization: orgRef,
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`,
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const faqLd = (faq: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceLd = (s: Entry) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  serviceType: s.title,
  description: s.description,
  url: absoluteUrl(`/services/${s.slug}`),
  provider: orgRef,
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "Country", name: "India" },
  ],
  ...(s.keywords.length ? { keywords: s.keywords.join(", ") } : {}),
});

export const personLd = (a: Entry) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl(`/authors/${a.slug}#person`),
  name: a.title,
  jobTitle: a.role,
  description: a.description,
  url: absoluteUrl(`/authors/${a.slug}`),
  worksFor: orgRef,
  ...(a.sameAs.length ? { sameAs: a.sameAs } : {}),
});

export const articleLd = (e: Entry, kind: "blog" | "news", author?: Entry) => ({
  "@context": "https://schema.org",
  "@type": kind === "blog" ? "BlogPosting" : "NewsArticle",
  headline: e.title,
  description: e.description,
  datePublished: e.date,
  dateModified: e.updated ?? e.date,
  mainEntityOfPage: absoluteUrl(`/${kind}/${e.slug}`),
  url: absoluteUrl(`/${kind}/${e.slug}`),
  image: absoluteUrl(`/${kind}/${e.slug}/opengraph-image`),
  wordCount: e.words,
  articleSection: e.category,
  keywords: e.tags.join(", "),
  inLanguage: "en-IN",
  author: author ? { "@id": absoluteUrl(`/authors/${author.slug}#person`), "@type": "Person", name: author.title } : orgRef,
  publisher: orgRef,
  ...(e.source ? { citation: e.source.url, isBasedOn: e.source.url } : {}),
});

export { addressLine };
