import { blogPosts, getAll, newsItems, services } from "@/lib/content";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const pages = [
    { t: "Contact / Book a consultation", u: "/contact", k: "Page", d: "Talk to Eject Solutions in Hyderabad." },
    { t: "About Eject Solutions", u: "/about", k: "Page", d: "Company details, registration and how we work." },
    { t: "Careers & talent", u: "/careers", k: "Page", d: "Work with us or hire through us." },
    { t: "Case studies", u: "/case-studies", k: "Page", d: "Project write-ups." },
  ];
  const items = [
    ...services().map((s) => ({ t: s.title, u: `/services/${s.slug}`, k: "Service", d: s.description })),
    ...getAll("industries").map((s) => ({ t: s.title, u: `/industries/${s.slug}`, k: "Industry", d: s.description })),
    ...blogPosts().map((s) => ({ t: s.title, u: `/blog/${s.slug}`, k: `Guide · ${s.category}`, d: s.description })),
    ...newsItems().map((s) => ({ t: s.title, u: `/news/${s.slug}`, k: "News", d: s.description })),
    ...pages,
  ];
  return Response.json(items);
}
