import JsonLd from "./JsonLd";
import { faqLd } from "@/lib/schema";
import type { Faq as FaqT } from "@/lib/content";

export default function Faq({ items, heading = "Frequently asked questions" }: { items: FaqT[]; heading?: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq-h" className="mt-16">
      <JsonLd data={faqLd(items)} />
      <h2 id="faq-h" className="text-2xl sm:text-3xl mb-6">{heading}</h2>
      <div className="space-y-3">
        {items.map((f) => (
          <details key={f.q} className="glass group p-5 open:border-primary/50">
            <summary className="cursor-pointer list-none font-display text-lg font-medium flex justify-between gap-4">
              <span>{f.q}</span>
              <span aria-hidden="true" className="text-primary transition group-open:rotate-45 text-2xl leading-none">+</span>
            </summary>
            <p className="mt-3 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
