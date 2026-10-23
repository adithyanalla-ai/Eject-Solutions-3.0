"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export type Headline = { title: string; href: string; category: string; date: string };

/** Frosted "console" showing the latest news. All items are visible without JS; JS rotates the highlighted one. */
export default function HeroConsole({ items }: { items: Headline[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || items.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [paused, items.length]);

  return (
    <section
      aria-labelledby="console-h"
      className="frost p-4 sm:p-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff6b6b] shadow-[inset_0_1px_1px_rgba(255,255,255,.5)]" />
          <span className="h-3 w-3 rounded-full bg-[#fbbf24] shadow-[inset_0_1px_1px_rgba(255,255,255,.5)]" />
          <span className="h-3 w-3 rounded-full bg-[#34d399] shadow-[inset_0_1px_1px_rgba(255,255,255,.5)]" />
        </div>
        <h2 id="console-h" className="font-mono text-xs uppercase tracking-[0.16em] text-muted">latest / news</h2>
        <Link href="/news" className="font-mono text-xs text-primary underline underline-offset-4">all</Link>
      </div>
      <ul className="space-y-2" aria-live="off">
        {items.map((h, idx) => (
          <li key={h.href}>
            <Link
              href={h.href}
              className={`block rounded-2xl p-3 transition-[box-shadow,transform] duration-200 ${idx === i ? "bg-white/50 shadow-[inset_2px_2px_6px_rgba(15,23,42,.10),inset_-2px_-2px_6px_rgba(255,255,255,.9)] dark:bg-white/5 dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,.4)]" : "hover:bg-white/30 dark:hover:bg-white/5"}`}
            >
              <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider text-primary">
                <span className={`h-1.5 w-1.5 rounded-full ${idx === i ? "bg-[#06b6d4]" : "bg-muted/50"}`} />{h.category}
                <span className="text-muted normal-case tracking-normal">{h.date}</span>
              </span>
              <span className="mt-1 block font-display text-[1.02rem] leading-snug">{h.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
