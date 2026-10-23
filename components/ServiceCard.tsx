import Link from "next/link";
import Icon from "./Icon";
import type { Entry } from "@/lib/content";

export default function ServiceCard({ s, large = false }: { s: Entry; large?: boolean }) {
  return (
    <article className={`glass glass-hover relative p-6 flex flex-col reveal ${large ? "sm:col-span-2" : ""}`}>
      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg/60 text-primary">
        <Icon name={s.icon ?? "code"} />
      </span>
      <h3 className="text-xl">
        <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 hover:text-primary">{s.title}</Link>
      </h3>
      <p className="mt-2 text-muted text-[0.95rem] flex-1">{s.description}</p>
      <p className="mt-4 font-mono text-xs text-primary inline-flex items-center gap-1">Explore <Icon name="arrow" size={14} /></p>
    </article>
  );
}
