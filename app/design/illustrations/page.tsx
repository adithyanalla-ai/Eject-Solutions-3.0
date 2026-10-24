import type { Metadata } from "next";
import Illustration, { registry, type IllustrationName } from "@/components/illustrations/Illustration";

export const metadata: Metadata = {
  title: "Illustration style guide (internal)",
  robots: { index: false, follow: false },
};

const groups: { title: string; note: string; items: IllustrationName[] }[] = [
  { title: "Hero", note: "Above the fold. Inlined, no lazy rendering.", items: ["hero"] },
  { title: "Service signatures", note: "01 code · 01a phone · 01b cloud · 02 shield · 03 people · 04 content · 05 ai · 06 cap", items: ["code", "phone", "cloud", "shield", "people", "content", "ai", "cap"] },
  { title: "Process icons", note: "Discover, Build, Secure, Automate.", items: ["process-discover", "process-build", "process-secure", "process-automate"] },
  { title: "Category covers", note: "One template, swappable glyph. Also flattened to /public/covers/*.svg for OG images.", items: ["cover-ai", "cover-cybersecurity", "cover-software", "cover-hiring", "cover-compliance"] },
  { title: "Empty, 404, newsletter, contact, success", note: "Success animates once on mount.", items: ["empty", "not-found", "mail", "contact", "success"] },
  { title: "Accents", note: "Card corners and section-divider glyph.", items: ["corner", "divider"] },
];

export default function IllustrationGuide() {
  return (
    <div className="container-page py-12">
      <p className="eyebrow">Internal · noindex</p>
      <h1 className="mt-3 text-4xl">Illustration system</h1>
      <p className="mt-4 max-w-2xl text-muted">Isometric ceramic and frosted-glass scenes. Light source top-left. Colours come from <code>--il-*</code> tokens, so everything follows light and Frosted Night. Toggle the theme to check both. Motion is transform and opacity only and stops under reduced motion.</p>
      {groups.map((g) => (
        <section key={g.title} className="mt-12" aria-labelledby={g.title}>
          <h2 id={g.title} className="text-2xl">{g.title}</h2>
          <p className="mt-1 text-sm text-muted">{g.note}</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((n) => (
              <figure key={n} className={`panel p-4 ${g.title === "Hero" ? "sm:col-span-2" : ""}`}>
                <div className="panel-inset flex items-center justify-center p-3"><Illustration name={n} className="h-auto w-full" /></div>
                <figcaption className="mt-3 font-mono text-xs text-muted">{`<Illustration name="${n}" />`}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
      <section className="mt-14">
        <h2 className="text-2xl">Palette</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {(["w", "y", "k", "c", "v", "m", "i"] as const).map((t) => (
            <div key={t} className="panel p-3">
              <div className="flex h-10 overflow-hidden rounded-lg">{[1, 2, 3].map((n) => (<span key={n} className="flex-1" style={{ background: `var(--il-${t}${n})` }} />))}</div>
              <p className="mt-2 font-mono text-xs text-muted">--il-{t}1…3</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
