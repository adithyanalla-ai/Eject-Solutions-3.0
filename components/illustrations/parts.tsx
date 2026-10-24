import type { ReactNode } from "react";

/**
 * Isometric toolkit. Light comes from the top-left: top faces are lightest (tone 1), left faces mid (2),
 * right faces darkest (3). All colours are CSS variables (--il-*) so scenes follow light and "Frosted Night".
 * Styling uses presentation attributes (not classes) so scenes can be flattened to static SVG at build time.
 */
export type Tone = "w" | "y" | "k" | "c" | "v" | "m" | "i";
export const S = 26;
const K = 0.866;
const f = (n: number) => Math.round(n * 10) / 10;
export const P = (x: number, y: number, z = 0): [number, number] => [(x - y) * K * S, (x + y) * 0.5 * S - z * S];
type V3 = [number, number, number];
export const pts = (a: V3[]) => a.map(([x, y, z]) => P(x, y, z).map(f).join(",")).join(" ");
const col = (t: Tone, n: 1 | 2 | 3) => `var(--il-${t}${n})`;
const STROKE = { stroke: "var(--il-stroke)", strokeWidth: 2, strokeLinejoin: "round" as const };
const HI = { stroke: "var(--il-hi)", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

/** Isometric box. x runs right-down, y runs left-down, z up. */
export function Box({ x, y, z = 0, w, d, h, tone = "w" }: { x: number; y: number; z?: number; w: number; d: number; h: number; tone?: Tone }) {
  return (
    <g>
      <polygon points={pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={col(tone, 2)} {...STROKE} />
      <polygon points={pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={col(tone, 3)} {...STROKE} />
      <polygon points={pts([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={col(tone, 1)} {...STROKE} />
      <polyline points={pts([[x, y + d, z + h], [x, y, z + h], [x + w, y, z + h]])} {...HI} />
    </g>
  );
}

/** Flat quad in 3D space (for screens, glass, inlays). */
export function Plane({ p, fill, opacity = 1, edge = false }: { p: V3[]; fill: string; opacity?: number; edge?: boolean }) {
  return <polygon points={pts(p)} fill={fill} opacity={opacity} stroke={edge ? "var(--il-glass-edge)" : "none"} strokeWidth={edge ? 1.4 : 0} strokeLinejoin="round" />;
}

/** Soft ground shadow (light from top-left, so it falls to the bottom-right). */
export function Shadow({ x, y, w, d, z = 0 }: { x: number; y: number; w: number; d: number; z?: number }) {
  return <polygon points={pts([[x + 0.5, y + 0.5, z], [x + w + 0.7, y + 0.5, z], [x + w + 0.7, y + d + 0.7, z], [x + 0.5, y + d + 0.7, z]])} fill="var(--il-shadow)" />;
}

export function Platform({ w = 8, d = 8, tone = "w" as Tone }) {
  return (
    <g>
      <Shadow x={0} y={0} w={w} d={d} z={-0.5} />
      <Box x={0} y={0} z={-0.5} w={w} d={d} h={0.5} tone={tone} />
      <Plane p={[[0.4, 0.4, 0], [w - 0.4, 0.4, 0], [w - 0.4, d - 0.4, 0], [0.4, d - 0.4, 0]]} fill="var(--il-glass)" edge />
    </g>
  );
}

export function Node({ x, y, r = 7, tone = "y", delay = 0 }: { x: number; y: number; r?: number; tone?: Tone; delay?: number }) {
  return (
    <g className="il-float" style={{ animationDelay: `${delay}s` }}>
      <circle cx={x} cy={y} r={r} fill={col(tone, 2)} {...STROKE} />
      <circle cx={x - r * 0.3} cy={y - r * 0.35} r={r * 0.28} fill="var(--il-hi)" />
    </g>
  );
}

export const Link = ({ d }: { d: string }) => <path d={d} fill="none" stroke="var(--il-stroke)" strokeWidth={1.6} strokeDasharray="2 5" strokeLinecap="round" opacity=".7" />;

export function Shield({ cx, cy, s = 1, check = true }: { cx: number; cy: number; s?: number; check?: boolean }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <path d="M0-40 30-29V4C30 26 13 38 0 45-13 38-30 26-30 4V-29Z" fill="var(--il-shadow)" transform="translate(5 6)" />
      <path d="M0-40 30-29V4C30 26 13 38 0 45-13 38-30 26-30 4V-29Z" fill="var(--il-y2)" {...STROKE} />
      <path d="M0-40V45C-13 38-30 26-30 4V-29Z" fill="var(--il-y1)" />
      <path d="M-24-25 0-34" {...HI} />
      {check && <path d="M-11 3 -3 11 13-7" fill="none" stroke="var(--il-ink)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />}
    </g>
  );
}

export function Bracket({ cx, cy, s = 1, tone = "k" as Tone }: { cx: number; cy: number; s?: number; tone?: Tone }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`} className="il-float" style={{ animationDelay: "1s" }}>
      <path d="M-13-12-26 0-13 12M13-12 26 0 13 12M5-16-5 16" fill="none" stroke="var(--il-shadow)" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" transform="translate(3 4)" />
      <path d="M-13-12-26 0-13 12M13-12 26 0 13 12M5-16-5 16" fill="none" stroke={tone === "k" ? "var(--il-ink)" : col(tone, 2)} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export function Padlock({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <path d="M-9-4V-12a9 9 0 0 1 18 0V-4" fill="none" stroke="var(--il-stroke)" strokeWidth={5} strokeLinecap="round" />
      <path d="M-9-4V-12a9 9 0 0 1 18 0V-4" fill="none" stroke="var(--il-w1)" strokeWidth={2.4} strokeLinecap="round" />
      <rect x="-15" y="-5" width="30" height="24" rx="7" fill="var(--il-k2)" {...STROKE} />
      <path d="M-11 0H11" {...HI} />
      <circle cx="0" cy="7" r="3.2" fill="var(--il-y2)" />
      <path d="M0 8V13" stroke="var(--il-y2)" strokeWidth={2.6} strokeLinecap="round" />
    </g>
  );
}

export function Person({ cx, cy, s = 1, tone = "y" as Tone }: { cx: number; cy: number; s?: number; tone?: Tone }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <ellipse cx="3" cy="31" rx="19" ry="6" fill="var(--il-shadow)" />
      <path d="M-17 30V19a17 17 0 0 1 34 0V30Z" fill={col(tone, 2)} {...STROKE} />
      <path d="M-17 30V19a17 17 0 0 1 17-17V30Z" fill={col(tone, 1)} opacity=".8" />
      <circle cx="0" cy="-12" r="11" fill="var(--il-w1)" {...STROKE} />
      <circle cx="-4" cy="-16" r="3" fill="var(--il-hi)" />
    </g>
  );
}

export function Cloud({ cx, cy, s = 1, tone = "w" as Tone }: { cx: number; cy: number; s?: number; tone?: Tone }) {
  const d = "M-34 14a16 16 0 0 1 4-31 24 24 0 0 1 46-4 19 19 0 0 1 8 35Z";
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`} className="il-float">
      <path d={d} fill="var(--il-shadow)" transform="translate(5 8)" />
      <path d={d} fill={col(tone, 1)} {...STROKE} />
      <path d="M-28-10a14 14 0 0 1 12-12" {...HI} />
    </g>
  );
}

export function Gear({ cx, cy, s = 1, tone = "y" as Tone }: { cx: number; cy: number; s?: number; tone?: Tone }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      {[0, 45, 90, 135].map((a) => (<rect key={a} x="-5" y="-22" width="10" height="44" rx="4" fill={col(tone, 2)} {...STROKE} transform={`rotate(${a})`} />))}
      <circle r="15" fill={col(tone, 1)} {...STROKE} />
      <circle r="6" fill="var(--il-w1)" {...STROKE} />
    </g>
  );
}

export function Megaphone({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <path d="M-26-12 14-34V34L-26 12Z" fill="var(--il-shadow)" transform="translate(5 7)" />
      <rect x="-34" y="-14" width="18" height="28" rx="7" fill="var(--il-k2)" {...STROKE} />
      <path d="M-18-12 18-34a4 4 0 0 1 6 3.4V31a4 4 0 0 1-6 3.4L-18 12Z" fill="var(--il-y2)" {...STROKE} />
      <path d="M-18-12 18-34a4 4 0 0 1 6 3.4V-4L-18 4Z" fill="var(--il-y1)" />
      <path d="M-12 12 -6 36" fill="none" stroke="var(--il-stroke)" strokeWidth={9} strokeLinecap="round" />
      <path d="M-12 12 -6 36" fill="none" stroke="var(--il-k2)" strokeWidth={5} strokeLinecap="round" />
      {[0, 1, 2].map((i) => (<path key={i} d={`M${34 + i * 11} ${-12 - i * 5}a${16 + i * 8} ${16 + i * 8} 0 0 1 0 ${24 + i * 10}`} fill="none" stroke="var(--il-c3)" strokeWidth={3} strokeLinecap="round" className="il-pulse" style={{ animationDelay: `${i * 0.5}s` }} />))}
    </g>
  );
}

export function Magnifier({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <path d="M12 12 30 30" stroke="var(--il-stroke)" strokeWidth={11} strokeLinecap="round" />
      <path d="M12 12 30 30" stroke="var(--il-k2)" strokeWidth={7} strokeLinecap="round" />
      <circle r="20" fill="var(--il-glass)" stroke="var(--il-stroke)" strokeWidth={8} />
      <circle r="20" fill="none" stroke="var(--il-y2)" strokeWidth={4.5} />
      <path d="M-11-8a14 14 0 0 1 9-8" {...HI} />
    </g>
  );
}

/** Wraps scene markup with consistent svg attributes, accessibility and sizing. */
export function Svg({ w, h, title, desc, id, children, className }: { w: number; h: number; title?: string; desc?: string; id: string; children: ReactNode; className?: string }) {
  const a11y = title
    ? { role: "img" as const, "aria-labelledby": `${id}-t${desc ? ` ${id}-d` : ""}` }
    : { "aria-hidden": true as const, focusable: "false" as const };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className={className} xmlns="http://www.w3.org/2000/svg" {...a11y}>
      {title && <title id={`${id}-t`}>{title}</title>}
      {desc && <desc id={`${id}-d`}>{desc}</desc>}
      {children}
    </svg>
  );
}

export type SceneProps = { title?: string; desc?: string; className?: string };
