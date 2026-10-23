"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Skeuomorphic dial: recessed bezel, tinted arc, needle with glass-cover reflection.
 * Only the needle animates (transform), once, when scrolled into view. Server renders the final state.
 */
export default function Gauge({ value, max, label, caption }: { value: number; max: number; label: string; caption: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const frac = Math.max(0, Math.min(value / max, 1));
  const final = -90 + frac * 180;
  const [angle, setAngle] = useState(final);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    setAngle(-90);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); requestAnimationFrame(() => setAngle(final)); }
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [final]);

  // arc from 180° to 0° (left to right); filled portion shown with dasharray on a 100-length path
  const arc = "M 20 100 A 80 80 0 0 1 180 100";
  return (
    <figure className="text-center">
      <svg ref={ref} viewBox="0 0 200 118" width="220" height="130" role="img" aria-label={`${label}: ${value} of ${max}. ${caption}`} className="mx-auto h-auto w-full max-w-[240px]">
        <defs>
          <linearGradient id="g-arc" x1="0" x2="1"><stop offset="0" stopColor="#facc15" /><stop offset="1" stopColor="#eab308" /></linearGradient>
          <linearGradient id="g-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset=".55" stopColor="#fff" stopOpacity=".08" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        </defs>
        <path d={arc} fill="none" stroke="rgb(var(--line))" strokeOpacity=".7" strokeWidth="16" strokeLinecap="round" />
        <path d={arc} fill="none" stroke="url(#g-arc)" strokeWidth="16" strokeLinecap="round" pathLength="100" strokeDasharray={`${frac * 100} 100`} />
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const a = Math.PI * (1 - t);
          return <line key={t} x1={100 + 66 * Math.cos(a)} y1={100 - 66 * Math.sin(a)} x2={100 + 58 * Math.cos(a)} y2={100 - 58 * Math.sin(a)} stroke="rgb(var(--muted))" strokeWidth="2" strokeLinecap="round" />;
        })}
        <g className="needle" style={{ transform: `rotate(${angle}deg)` }}>
          <line x1="100" y1="100" x2="100" y2="38" stroke="rgb(var(--fg))" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="100" cy="100" r="9" fill="rgb(var(--surface))" stroke="rgb(var(--line))" strokeWidth="2" />
        <circle cx="100" cy="100" r="3" fill="#facc15" />
        {/* glass cover reflection */}
        <path d="M 14 100 A 86 86 0 0 1 186 100 L 186 60 Q 100 20 14 60 Z" fill="url(#g-glass)" opacity=".7" />
      </svg>
      <figcaption className="-mt-1">
        <span className="font-display text-3xl font-bold tabular-nums">{value}</span>
        <span className="text-muted"> / {max}</span>
        <span className="mt-0.5 block text-sm text-muted">{label}</span>
      </figcaption>
    </figure>
  );
}
