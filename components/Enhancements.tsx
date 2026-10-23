"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Scroll reveal + delegated CTA click tracking. Everything degrades gracefully without JS. */
export default function Enhancements() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );
      els.forEach((e) => io.observe(e));
      var cleanup = () => io.disconnect();
    }
    const onClick = (ev: MouseEvent) => {
      const t = (ev.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (!t) return;
      track(t.dataset.track!, { label: t.dataset.trackLabel, page: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cleanup?.();
    };
  });
  return null;
}
