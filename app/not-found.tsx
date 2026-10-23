import Link from "next/link";
import { services } from "@/lib/content";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container-page py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">That page has been ejected.</h1>
      <p className="mt-4 max-w-xl text-muted">The link may be old or mistyped. Try one of these instead, or press Ctrl/Cmd + K to search.</p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {services().slice(0, 6).map((s) => (<li key={s.slug}><Link className="rounded-full border border-line px-4 py-1.5 text-sm hover:border-primary hover:text-primary" href={`/services/${s.slug}`}>{s.short ?? s.title}</Link></li>))}
        <li><Link className="btn btn-primary" href="/">Go home</Link></li>
      </ul>
    </div>
  );
}
