/** Pure SVG + CSS animation. No JS, no network. Animation is disabled via prefers-reduced-motion in globals.css. */
export default function HeroVisual() {
  const nodes = [
    { a: 20, r: 150, c: "#22d3ee" }, { a: 95, r: 150, c: "#a78bfa" }, { a: 200, r: 150, c: "#22d3ee" }, { a: 290, r: 150, c: "#a78bfa" },
  ];
  const inner = [{ a: 50, r: 90, c: "#a78bfa" }, { a: 170, r: 90, c: "#22d3ee" }, { a: 270, r: 90, c: "#a78bfa" }];
  const pos = (a: number, r: number) => ({ x: 200 + r * Math.cos((a * Math.PI) / 180), y: 200 + r * Math.sin((a * Math.PI) / 180) });
  return (
    <svg viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="Abstract orbit diagram: software, security and AI connected around one core" className="h-auto w-full max-w-[420px]">
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#22d3ee" stopOpacity=".9" /><stop offset=".6" stopColor="#8b5cf6" stopOpacity=".5" /><stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#core)" opacity=".18" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeOpacity=".25" strokeDasharray="2 6" />
      <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeOpacity=".3" />
      <g className="orbit-a">
        {nodes.map((n, i) => { const p = pos(n.a, n.r); return (<g key={i}><line x1="200" y1="200" x2={p.x} y2={p.y} stroke={n.c} strokeOpacity=".25" /><circle className="node" style={{ animationDelay: `${i * 0.7}s` }} cx={p.x} cy={p.y} r="8" fill={n.c} /></g>); })}
      </g>
      <g className="orbit-b">
        {inner.map((n, i) => { const p = pos(n.a, n.r); return (<circle key={i} className="node" style={{ animationDelay: `${i * 1.1}s` }} cx={p.x} cy={p.y} r="6" fill={n.c} />); })}
      </g>
      <circle cx="200" cy="200" r="34" fill="url(#core)" />
      <circle cx="200" cy="200" r="12" fill="#e8eefa" />
    </svg>
  );
}
