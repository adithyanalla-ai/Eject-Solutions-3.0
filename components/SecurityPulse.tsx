import Link from "next/link";
import Gauge from "./Gauge";
import { fmtDate, newsItems } from "@/lib/content";

/** Gauge value is derived from real content: news notes published in the last 30 days vs. a 12/month target cadence. */
export default function SecurityPulse() {
  const items = newsItems();
  const cutoff = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  const recent = items.filter((n) => n.date >= cutoff).length;
  const latest = items.find((n) => n.category === "Cybersecurity") ?? items[0];
  return (
    <section aria-labelledby="pulse-h" className="frost p-5 sm:p-6">
      <p className="eyebrow">Security pulse</p>
      <h2 id="pulse-h" className="mt-1 text-xl">What we are watching</h2>
      <div className="mt-2"><Gauge value={recent} max={12} label="advisories and updates this month" caption="Count of news notes published in the last 30 days against a target of 12" /></div>
      {latest && (
        <div className="panel-inset mt-3 p-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">Latest advisory note · {fmtDate(latest.date)}</p>
          <Link href={`/news/${latest.slug}`} className="mt-1 block font-display leading-snug text-primary underline-offset-4 hover:underline">{latest.title}</Link>
        </div>
      )}
    </section>
  );
}
