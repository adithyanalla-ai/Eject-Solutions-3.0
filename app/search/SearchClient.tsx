"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EmptyState from "@/components/EmptyState";

type Item = { t: string; u: string; k: string; d: string };

export default function SearchClient() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => { fetch("/search-index.json").then((r) => r.json()).then(setItems).catch(() => {}); }, []);
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length ? items.filter((i) => terms.every((t) => `${i.t} ${i.k} ${i.d}`.toLowerCase().includes(t))) : [];
  return (
    <div className="mt-6">
      <label htmlFor="q" className="sr-only">Search the site</label>
      <input id="q" value={q} onChange={(e) => setQ(e.target.value)} className="input max-w-xl" placeholder="Search services, guides, news…" type="search" />
      <ul className="mt-8 space-y-4" aria-live="polite">
        {results.map((r) => (
          <li key={r.u}>
            <Link href={r.u} className="font-display text-xl text-primary hover:underline">{r.t}</Link>
            <p className="font-mono text-xs text-muted">{r.k}</p>
            <p className="text-muted">{r.d}</p>
          </li>
        ))}
        
      </ul>
      {terms.length > 0 && results.length === 0 && <EmptyState title="No results">Nothing matched “{q}”. Try “VAPT”, “RAG” or “DPDP”.</EmptyState>}
    </div>
  );
}
