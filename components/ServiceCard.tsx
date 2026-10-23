import Link from "next/link";
import Icon from "./Icon";
import type { Entry } from "@/lib/content";

export default function ServiceCard({ s, large = false }: { s: Entry; large?: boolean }) {
  return (
    <article className={`panel lift reveal flex flex-col p-6 ${large ? "sm:col-span-2" : ""}`}>
      <span className="keycap mb-4"><Icon name={s.icon ?? "code"} /></span>
      <h3 className="text-xl">
        <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 after:rounded-2xl hover:text-primary">{s.title}</Link>
      </h3>
      <p className="mt-2 flex-1 text-[0.95rem] text-muted">{s.description}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">Explore <Icon name="arrow" size={15} /></p>
    </article>
  );
}
