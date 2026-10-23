import fs from "node:fs";
import path from "node:path";

type T = { quote: string; name: string; role?: string; company?: string };

/** Scroll-snap carousel, no JS. Renders nothing until real testimonials exist. */
export default function Testimonials() {
  const { items } = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/testimonials.json"), "utf8")) as { items: T[] };
  if (!items.length) return null;
  return (
    <section className="section pt-0" aria-labelledby="t-h">
      <div className="container-page">
        <h2 id="t-h" className="text-3xl sm:text-4xl">What clients say</h2>
        <ul className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4" tabIndex={0} aria-label="Testimonials">
          {items.map((t) => (
            <li key={t.name + t.quote.slice(0, 12)} className="frost w-[min(88vw,26rem)] shrink-0 snap-center p-6">
              <blockquote className="text-lg">“{t.quote}”</blockquote>
              <p className="mt-4 font-medium">{t.name}</p>
              <p className="text-sm text-muted">{[t.role, t.company].filter(Boolean).join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
