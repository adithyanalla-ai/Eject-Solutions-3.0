import { absoluteUrl } from "@/lib/site";

export default function Share({ path, title }: { path: string; title: string }) {
  const u = encodeURIComponent(absoluteUrl(path));
  const t = encodeURIComponent(title);
  const links = [
    { n: "LinkedIn", h: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { n: "X", h: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { n: "WhatsApp", h: `https://wa.me/?text=${t}%20${u}` },
    { n: "Email", h: `mailto:?subject=${t}&body=${u}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-muted">Share:</span>
      {links.map((l) => (
        <a key={l.n} href={l.h} target="_blank" rel="noopener noreferrer" className="pill-link !px-3 !py-1" aria-label={`Share on ${l.n}`}>{l.n}</a>
      ))}
    </div>
  );
}
