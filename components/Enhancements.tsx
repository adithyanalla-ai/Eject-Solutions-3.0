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

    // Frosted-touch sheen follows the pointer (fine pointers only, no reduced motion).
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onMove = (ev: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = (ev.target as HTMLElement).closest<HTMLElement>(".lift");
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        el.style.setProperty("--my", `${ev.clientY - r.top}px`);
      });
    };
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });

    // Navbar shrink state (CSS transform only, no layout shift).
    const onScroll = () => {
      if (window.scrollY > 24) document.documentElement.setAttribute("data-scrolled", "");
      else document.documentElement.removeAttribute("data-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cleanup?.();
    };
  });
  return null;
}
