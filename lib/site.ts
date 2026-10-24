export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ejectsolutions.com").replace(/\/$/, "");

export const site = {
  name: "Eject Solutions",
  legalName: "Eject Solutions Pvt Ltd",
  cin: "U62099TS2023PTC175197",
  tagline: "Build it, secure it, automate it.",
  description:
    "Software, cybersecurity and AI under one roof. Eject Solutions builds products, tests and defends them, and automates the work around them, from Hyderabad.",
  url: SITE_URL,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@ejectsolutions.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  address: {
    street: "Kukatpally",
    locality: "Hyderabad",
    region: "Telangana",
    postalCode: "500072",
    country: "IN",
  },
  // Approximate centroid for Kukatpally. [[CONFIRM]] exact office pin from Google Business Profile.
  geo: { lat: 17.4849, lng: 78.4138 },
  // [[CONFIRM]] actual opening hours
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "18:30" },
  mapsQuery: "Eject Solutions Kukatpally Hyderabad 500072",
  sameAs: [] as string[], // add LinkedIn / GitHub / X profile URLs once confirmed
  // [[CONFIRM]] what "OPEN COLABS" should link to. Set NEXT_PUBLIC_COLABS_URL; defaults to the contact page.
  colabs: process.env.NEXT_PUBLIC_COLABS_URL ?? "/contact",
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  bingVerification: process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
};

export const addressLine = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, India`;

export function whatsappHref(text = "Hi Eject Solutions, I'd like to discuss a project.") {
  const base = site.whatsapp ? `https://wa.me/${site.whatsapp}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
];

/** lastmod for hand-written pages (ISO dates). Bump when copy changes. */
export const staticLastmod: Record<string, string> = {
  "/": "2026-10-23",
  "/about": "2026-10-23",
  "/contact": "2026-10-23",
  "/services": "2026-10-23",
  "/industries": "2026-10-23",
  "/case-studies": "2026-10-23",
  "/careers": "2026-10-23",
  "/privacy": "2026-10-23",
  "/terms": "2026-10-23",
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
