import fs from "node:fs";
import path from "node:path";

type Item = { label: string; href?: string };

export default function TrustStrip() {
  const { items } = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/trust.json"), "utf8")) as { items: Item[] };
  if (!items.length) return null;
  return (
    <section aria-label="Certifications and partners" className="container-page pb-12">
      <ul className="flex flex-wrap items-center justify-center gap-3">
        {items.map((i) => (
          <li key={i.label} className="frost !rounded-full px-5 py-2 text-sm font-medium">
            {i.href ? <a href={i.href} className="hover:text-primary" target="_blank" rel="noopener noreferrer">{i.label}</a> : i.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
