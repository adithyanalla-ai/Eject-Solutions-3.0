"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Thin reading-progress bar for long-form pages. Transform-only animation. */
export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const active = path.startsWith("/blog/") && !path.startsWith("/blog/category");
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.current?.style.setProperty("transform", `scaleX(${max > 0 ? Math.min(h.scrollTop / max, 1) : 0})`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [active, path]);
  if (!active) return null;
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-1">
      <div ref={bar} className="h-full origin-left" style={{ transform: "scaleX(0)", background: "linear-gradient(90deg,#2563eb,#06b6d4)" }} />
    </div>
  );
}
