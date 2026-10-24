import Link from "next/link";
import Icon from "./Icon";
import { CornerAccent } from "./illustrations/scenes";
import type { Entry } from "@/lib/content";

/** Card pattern: number, keycap icon, bold title, description, frosted tag pills, "View full breakdown ↗". */
export default function ServiceCard({ s, subs = [], large = false, as: H = "h3" }: { s: Entry; subs?: Entry[]; large?: boolean; as?: "h2" | "h3" }) {
  const n = s.number ? String(s.number).padStart(2, "0") : "";
  const title = s.cardTitle ?? s.title;
  return (
    <article className={`panel lift reveal flex flex-col p-6 ${large ? "lg:col-span-2" : ""}`}>
      <CornerAccent className="pointer-events-none absolute bottom-1 right-2 h-[72px] w-[72px] opacity-70" />
      <div className="flex items-start justify-between">
        <span className="keycap"><Icon name={s.icon ?? "code"} /></span>
        {n && <span aria-hidden="true" className="font-display text-4xl font-bold text-fg/20">{n}</span>}
      </div>
      <H className="mt-5 text-2xl font-bold">
        <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 after:rounded-2xl hover:underline hover:decoration-[#facc15] hover:decoration-2 hover:underline-offset-4">
          {n && <span className="sr-only">{n}. </span>}{title}
        </Link>
      </H>
      <p className="mt-2 text-[0.95rem] text-muted">{s.card ?? s.description}</p>
      {s.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies and focus areas">
          {s.tags.map((t) => (<li key={t} className="tag">{t}</li>))}
        </ul>
      )}
      {subs.length > 0 && (
        <p className="relative z-10 mt-4 text-sm text-muted">
          Includes:{" "}
          {subs.map((x, i) => (
            <span key={x.slug}>{i > 0 && " · "}<Link href={`/services/${x.slug}`} className="text-fg underline decoration-[#facc15] decoration-2 underline-offset-4 hover:bg-[#facc15]/30">{x.cardTitle ?? x.title}</Link></span>
          ))}
        </p>
      )}
      <p className="breakdown mt-auto pt-5 text-primary">View full breakdown <span aria-hidden="true">↗</span></p>
    </article>
  );
}
