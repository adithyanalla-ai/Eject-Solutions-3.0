"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Item = { t: string; u: string; k: string; d: string };

export default function CommandPalette({ signal }: { signal: number }) {
  const ref = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [items, setItems] = useState<Item[] | null>(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!signal) return;
    const d = ref.current;
    if (d && !d.open) d.showModal();
    setTimeout(() => input.current?.focus(), 0);
    if (!items) fetch("/search-index.json").then((r) => r.json()).then(setItems).catch(() => setItems([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signal]);

  const results = useMemo(() => {
    const list = items ?? [];
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return list.slice(0, 8);
    return list
      .map((i) => {
        const hay = `${i.t} ${i.k} ${i.d}`.toLowerCase();
        if (!terms.every((t) => hay.includes(t))) return null;
        const score = terms.reduce((s, t) => s + (i.t.toLowerCase().includes(t) ? 3 : 0) + (i.k.toLowerCase().includes(t) ? 1 : 0), 0);
        return { i, score };
      })
      .filter(Boolean)
      .sort((a, b) => b!.score - a!.score)
      .slice(0, 8)
      .map((x) => x!.i);
  }, [items, q]);

  const go = (u: string) => {
    ref.current?.close();
    setQ("");
    router.push(u);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && results[active]) { e.preventDefault(); go(results[active].u); }
  };

  return (
    <dialog
      ref={ref}
      aria-label="Site search"
      className="frost m-auto mt-[12vh] w-[min(92vw,38rem)] !rounded-3xl p-0 text-fg backdrop:bg-slate-900/40"
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
    >
      <div className="p-3 border-b border-line">
        <input
          ref={input}
          value={q}
          onChange={(e) => { setQ(e.target.value); setActive(0); }}
          onKeyDown={onKey}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[active] ? `pal-${active}` : undefined}
          aria-label="Search services, guides and news"
          placeholder="Search services, guides, news…"
          className="input w-full text-lg"
        />
      </div>
      <ul id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
        {items === null && <li className="px-3 py-3 text-muted">Loading…</li>}
        {items && results.length === 0 && <li className="px-3 py-3 text-muted">No matches. Try “VAPT”, “RAG” or “DPDP”.</li>}
        {results.map((r, i) => (
          <li
            key={r.u}
            id={`pal-${i}`}
            role="option"
            aria-selected={i === active}
            onMouseEnter={() => setActive(i)}
            onClick={() => go(r.u)}
            className={`cursor-pointer rounded-lg px-3 py-2.5 ${i === active ? "bg-primary/10 shadow-[inset_2px_2px_6px_rgba(15,23,42,.10)] outline outline-1 outline-primary/40" : ""}`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-medium">{r.t}</span>
              <span className="font-mono text-xs text-muted shrink-0">{r.k}</span>
            </div>
            <div className="text-sm text-muted line-clamp-1">{r.d}</div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between border-t border-line px-4 py-2 font-mono text-xs text-muted">
        <span>↑↓ navigate · ↵ open</span>
        <span>esc close</span>
      </div>
    </dialog>
  );
}
