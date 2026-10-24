import Link from "next/link";
import Illustration from "@/components/illustrations/Illustration";
import { pillars } from "@/lib/content";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container-page grid items-center gap-8 py-20 lg:grid-cols-2">
      <div>
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">That page has been ejected.</h1>
      <p className="mt-4 max-w-xl text-muted">The link may be old or mistyped. Try one of these instead, or press Ctrl/Cmd + K to search.</p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {pillars().map((s) => (<li key={s.slug}><Link className="pill-link" href={`/services/${s.slug}`}>{s.cardTitle ?? s.title}</Link></li>))}
        <li><Link className="btn btn-primary" href="/">Go home</Link></li>
      </ul>
      </div>
      <Illustration name="not-found" className="mx-auto h-auto w-full max-w-[420px]" />
    </div>
  );
}
