import { Bracket, Box, Cloud, Gear, Link, Magnifier, Megaphone, Node, P, Padlock, Person, Plane, Platform, Shadow, Shield, Svg, pts, type SceneProps, type Tone } from "./parts";

const T = (x: number, y: number, z: number, ox: number, oy: number) => { const [a, b] = P(x, y, z); return [a + ox, b + oy] as const; };

/** Window standing on a platform with a screen on its left face. */
function Window({ x, y, w, h, lines = true }: { x: number; y: number; w: number; h: number; lines?: boolean }) {
  const d = 0.4;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={h} tone="w" />
      <Plane p={[[x + 0.25, y + d, 0.3], [x + w - 0.25, y + d, 0.3], [x + w - 0.25, y + d, h - 0.55], [x + 0.25, y + d, h - 0.55]]} fill="var(--il-k2)" />
      {[0, 1, 2].map((i) => {
        const [cx, cy] = P(x + 0.5 + i * 0.32, y + d, h - 0.3);
        return <circle key={i} cx={cx} cy={cy} r="3.4" fill={["var(--il-y2)", "var(--il-w1)", "var(--il-c2)"][i]} />;
      })}
      {lines && [[0.5, 1.9, 1.15, "y"], [0.9, 2.4, 1.6, "c"], [0.9, 1.6, 2.05, "w"], [0.5, 2.2, 2.5, "v"]].map(([a, b, v, t], i) => (
        <Plane key={i} p={[[x + (a as number), y + d, h - (v as number) - 0.08], [x + (b as number), y + d, h - (v as number) - 0.08], [x + (b as number), y + d, h - (v as number) + 0.08], [x + (a as number), y + d, h - (v as number) + 0.08]]} fill={`var(--il-${t}2)`} />
      ))}
    </g>
  );
}

/* ---------- HERO ---------- */
export function HeroScene({ title, desc, className }: SceneProps) {
  const [sx, sy] = T(6.4, 5.6, 0.2, 260, 170);
  return (
    <Svg w={520} h={420} id="il-hero" title={title} desc={desc} className={className}>
      <g transform="translate(260 170)">
        <Platform w={8} d={8} />
        <Box x={5.2} y={0.8} w={1.1} d={1.1} h={1.1} tone="y" />
        <Box x={5.4} y={0.9} z={1.1} w={0.9} d={0.9} h={0.8} tone="k" />
        <Box x={0.8} y={5.4} w={1} d={1} h={0.8} tone="c" />
        <Window x={2.2} y={2.4} w={3.6} h={3.6} />
        <Plane p={[[2.2, 2.8, 3.6], [5.8, 2.8, 3.6], [5.8, 2.8, 3.8], [2.2, 2.8, 3.8]]} fill="var(--il-y2)" />
      </g>
      <Shield cx={sx + 60} cy={sy + 4} s={1.15} />
      <Padlock cx={sx - 8} cy={sy + 28} s={0.9} />
      <Bracket cx={110} cy={112} s={1.25} />
      <Bracket cx={420} cy={78} s={0.8} tone="y" />
      <Node x={86} y={236} r={9} tone="c" />
      <Node x={438} y={188} r={8} tone="v" delay={1.2} />
      <Node x={250} y={52} r={7} tone="y" delay={0.6} />
      <Node x={196} y={96} r={5} tone="m" delay={1.8} />
      <Link d="M110 112 196 96 250 52 420 78" />
      <Link d="M86 236 130 190" />
    </Svg>
  );
}

/* ---------- SERVICES (400 x 320) ---------- */
export function CodeScene(p: SceneProps) {
  return (
    <Svg w={400} h={320} id="il-code" {...p}>
      <g transform="translate(200 120)">
        <Platform w={6} d={6} />
        <Window x={0.5} y={0.6} w={3.4} h={3.4} />
        <Shadow x={4} y={1} w={1.1} d={1.1} />
        <Box x={4} y={1} w={1.1} d={1.1} h={1} tone="y" />
        <Box x={4.05} y={1.05} z={1} w={1} d={1} h={0.8} tone="k" />
        <Box x={4.2} y={2.7} w={1} d={1} h={1.2} tone="c" />
        <Box x={1.2} y={4.3} w={1} d={1} h={0.9} tone="v" />
        <Box x={2.8} y={4.6} w={0.9} d={0.9} h={0.6} tone="m" />
      </g>
      <Link d="M118 120 238 160 266 132" />
      <Bracket cx={92} cy={88} s={1.1} />
      <Node x={318} y={78} r={8} tone="c" />
      <Node x={330} y={226} r={6} tone="v" delay={1} />
    </Svg>
  );
}

export function PhoneScene(p: SceneProps) {
  const x = 2, y = 1.8, w = 1.9, d = 0.3, h = 3.8;
  return (
    <Svg w={400} h={320} id="il-phone" {...p}>
      <g transform="translate(200 120)">
        <Platform w={6} d={6} />
        <Shadow x={x} y={y} w={w} d={d} />
        <Box x={x} y={y} w={w} d={d} h={h} tone="k" />
        <Plane p={[[x + 0.15, y + d, 0.25], [x + w - 0.15, y + d, 0.25], [x + w - 0.15, y + d, h - 0.25], [x + 0.15, y + d, h - 0.25]]} fill="var(--il-w1)" />
        {[0, 1].flatMap((r) => [0, 1].map((c) => (
          <Plane key={`${r}${c}`} p={[[x + 0.3 + c * 0.7, y + d, h - 0.7 - r * 0.7], [x + 0.85 + c * 0.7, y + d, h - 0.7 - r * 0.7], [x + 0.85 + c * 0.7, y + d, h - 1.25 - r * 0.7], [x + 0.3 + c * 0.7, y + d, h - 1.25 - r * 0.7]]} fill={["var(--il-y2)", "var(--il-c2)", "var(--il-v2)", "var(--il-m2)"][r * 2 + c]} />
        )))}
        <Plane p={[[x + 0.3, y + d, 1.1], [x + w - 0.3, y + d, 1.1], [x + w - 0.3, y + d, 0.6], [x + 0.3, y + d, 0.6]]} fill="var(--il-y2)" />
        <Box x={4.2} y={3.6} w={1} d={1} h={0.5} tone="y" />
        <Box x={0.7} y={4} w={1} d={1} h={0.7} tone="c" />
      </g>
      <Node x={110} y={96} r={8} tone="y" />
      <Node x={308} y={78} r={7} tone="v" delay={1} />
      <Node x={338} y={190} r={5} tone="c" delay={0.4} />
      <Link d="M110 96 200 60 308 78" />
    </Svg>
  );
}

export function CloudApiScene(p: SceneProps) {
  return (
    <Svg w={400} h={320} id="il-cloudapi" {...p}>
      <g transform="translate(200 150)">
        <Platform w={6} d={6} />
        {[[0.6, 0.8, "y"], [2.4, 0.6, "k"], [4.1, 1.0, "c"], [1.2, 3.0, "v"], [3.2, 3.4, "y"]].map(([x, y, t], i) => (
          <g key={i}><Shadow x={x as number} y={y as number} w={1.1} d={1.1} /><Box x={x as number} y={y as number} w={1.1} d={1.1} h={0.9 + (i % 3) * 0.35} tone={t as Tone} /></g>
        ))}
      </g>
      <Cloud cx={200} cy={78} s={1.5} />
      <Link d="M200 100 130 190M200 100 215 168M200 100 272 186" />
      <Node x={86} y={120} r={7} tone="c" />
      <Node x={326} y={110} r={8} tone="v" delay={1.1} />
    </Svg>
  );
}

export function ShieldScene(p: SceneProps) {
  const [cx, cy] = T(3, 3, 0, 200, 120);
  return (
    <Svg w={400} h={320} id="il-shield" {...p}>
      <g transform="translate(200 120)">
        <Platform w={6} d={6} />
        <Box x={0.6} y={0.7} w={1} d={1} h={0.8} tone="k" />
        <Box x={4.3} y={4.2} w={1} d={1} h={0.6} tone="y" />
      </g>
      <Shield cx={cx} cy={cy - 22} s={1.9} />
      <g className="il-scan"><polygon points="140,150 260,150 280,172 120,172" fill="var(--il-c2)" opacity=".55" /><line x1="124" y1="171" x2="276" y2="171" stroke="var(--il-c3)" strokeWidth="2" strokeLinecap="round" /></g>
      <Padlock cx={cx + 74} cy={cy + 40} s={1.2} />
      <Node x={96} y={90} r={7} tone="c" />
      <Node x={318} y={84} r={8} tone="v" delay={1} />
      <circle cx="326" cy="196" r="5" fill="var(--il-y2)" className="il-pulse" />
      <circle cx="82" cy="200" r="5" fill="var(--il-c2)" className="il-pulse" style={{ animationDelay: ".8s" }} />
    </Svg>
  );
}

export function PeopleScene(p: SceneProps) {
  return (
    <Svg w={400} h={320} id="il-people" {...p}>
      <g transform="translate(200 120)">
        <Platform w={6} d={6} />
        <Window x={1.3} y={3.2} w={3.2} h={2.4} lines={false} />
        <Plane p={[[1.6, 3.6, 0.5], [2.4, 3.6, 0.5], [2.4, 3.6, 1.5], [1.6, 3.6, 1.5]]} fill="var(--il-y2)" />
        <Plane p={[[2.6, 3.6, 0.5], [3.4, 3.6, 0.5], [3.4, 3.6, 1.0], [2.6, 3.6, 1.0]]} fill="var(--il-c2)" />
        <Plane p={[[3.6, 3.6, 0.5], [4.2, 3.6, 0.5], [4.2, 3.6, 1.3], [3.6, 3.6, 1.3]]} fill="var(--il-v2)" />
      </g>
      <Person cx={110} cy={110} s={1.15} tone="y" />
      <Person cx={200} cy={70} s={1.3} tone="c" />
      <Person cx={292} cy={112} s={1.15} tone="v" />
      <Link d="M110 110 200 70 292 112M110 110 200 206M200 70 200 206M292 112 200 206" />
      <Node x={200} y={206} r={6} tone="y" />
    </Svg>
  );
}

export function ContentScene(p: SceneProps) {
  return (
    <Svg w={400} h={320} id="il-content" {...p}>
      <g transform="translate(200 130)">
        <Platform w={6} d={6} />
        <Shadow x={0.6} y={3.2} w={1} d={1} />
        <Box x={0.6} y={3.4} w={0.9} d={0.9} h={1.2} tone="y" />
        <Box x={1.8} y={3.4} w={0.9} d={0.9} h={2} tone="k" />
        <Box x={3.0} y={3.4} w={0.9} d={0.9} h={2.9} tone="c" />
        <Box x={4.2} y={0.6} w={1.2} d={0.3} h={1.6} tone="w" />
        <Box x={4.2} y={1.2} w={1.2} d={0.3} h={1.2} tone="w" />
        <Plane p={[[4.35, 0.9, 0.5], [5.25, 0.9, 0.5], [5.25, 0.9, 1.9], [4.35, 0.9, 1.9]]} fill="var(--il-y2)" />
      </g>
      <Megaphone cx={118} cy={92} s={1.25} />
      <Node x={318} y={86} r={7} tone="v" />
      <Node x={86} y={216} r={6} tone="m" delay={1} />
    </Svg>
  );
}

export function AiScene(p: SceneProps) {
  const [cx, cy] = T(3, 3, 1.5, 200, 130);
  return (
    <Svg w={400} h={320} id="il-ai" {...p}>
      <g transform="translate(200 130)">
        <Platform w={6} d={6} />
        <Shadow x={1.5} y={1.5} w={3} d={3} />
        <Box x={1.5} y={1.5} w={3} d={3} h={1.2} tone="k" />
        <Plane p={[[1.9, 1.9, 1.2], [4.1, 1.9, 1.2], [4.1, 4.1, 1.2], [1.9, 4.1, 1.2]]} fill="var(--il-y2)" />
        <Plane p={[[2.5, 2.5, 1.22], [3.5, 2.5, 1.22], [3.5, 3.5, 1.22], [2.5, 3.5, 1.22]]} fill="var(--il-w1)" />
        {[[0.2, 2.0], [0.2, 2.8], [0.2, 3.6], [4.6, 2.0], [4.6, 2.8], [4.6, 3.6]].map(([x, y], i) => (<Box key={i} x={x} y={y} w={1.0} d={0.3} h={0.2} tone="y" />))}
      </g>
      <circle cx={cx} cy={cy - 30} r="30" fill="var(--il-y2)" opacity=".28" className="il-pulse" />
      <Node x={96} y={86} r={9} tone="c" />
      <Node x={308} y={70} r={9} tone="v" delay={0.8} />
      <Node x={340} y={190} r={8} tone="y" delay={1.4} />
      <Node x={70} y={196} r={7} tone="m" delay={0.4} />
      <Link d={`M96 86 ${cx} ${cy - 30}M308 70 ${cx} ${cy - 30}M340 190 ${cx} ${cy - 30}M70 196 ${cx} ${cy - 30}`} />
    </Svg>
  );
}

export function CapScene(p: SceneProps) {
  return (
    <Svg w={400} h={320} id="il-cap" {...p}>
      <g transform="translate(200 140)">
        <Platform w={6} d={6} />
        <Shadow x={1.6} y={1.6} w={2.8} d={2.8} />
        <Box x={2.1} y={2.1} w={1.8} d={1.8} h={1.2} tone="k" />
        <Box x={0.9} y={0.9} z={1.2} w={4.2} d={4.2} h={0.35} tone="k" />
        <path d={`M${P(3, 3, 1.58)[0]} ${P(3, 3, 1.58)[1]} L${P(5.1, 0.9, 1.58)[0]} ${P(5.1, 0.9, 1.58)[1]} L${P(5.1, 0.9, 0.2)[0]} ${P(5.1, 0.9, 0.2)[1]}`} fill="none" stroke="var(--il-y2)" strokeWidth="3" strokeLinecap="round" />
        <circle cx={P(5.1, 0.9, 0.2)[0]} cy={P(5.1, 0.9, 0.2)[1]} r="6" fill="var(--il-y2)" stroke="var(--il-stroke)" strokeWidth="2" />
        <path d={`M${P(0.7, 5, 0)[0]} ${P(0.7, 5, 0)[1]} l30 -10 l22 0 l0 -14`} fill="none" stroke="var(--il-c3)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={P(0.7, 5, 0)[0] + 52} cy={P(0.7, 5, 0)[1] - 24} r="4.5" fill="var(--il-c2)" stroke="var(--il-stroke)" strokeWidth="2" />
      </g>
      <Node x={92} y={96} r={8} tone="v" />
      <Node x={316} y={82} r={7} tone="c" delay={1} />
    </Svg>
  );
}

/* ---------- Mapping: service slug / illustration key → scene ---------- */
export const serviceScenes = { code: CodeScene, phone: PhoneScene, cloud: CloudApiScene, shield: ShieldScene, people: PeopleScene, content: ContentScene, ai: AiScene, cap: CapScene } as const;
export type ServiceSceneName = keyof typeof serviceScenes;

/* ---------- Process icons (96 x 96) ---------- */
export function ProcessIcon({ name, ...p }: { name: "discover" | "build" | "secure" | "automate" } & SceneProps) {
  return (
    <Svg w={96} h={96} id={`il-proc-${name}`} {...p}>
      <g transform="translate(48 52) scale(.72)">
        {name === "discover" && (<><ellipse cx="0" cy="40" rx="42" ry="9" fill="var(--il-shadow)" /><Magnifier cx={-4} cy={-4} s={1.5} /></>)}
        {name === "build" && (<g transform="translate(0 -4)"><Box x={-1.4} y={-1.4} w={1.6} d={1.6} h={1.1} tone="y" /><Box x={0.2} y={-1.4} z={0} w={1.4} d={1.4} h={0.8} tone="k" /><Box x={-0.9} y={-0.8} z={1.1} w={1.2} d={1.2} h={0.9} tone="w" /></g>)}
        {name === "secure" && <Shield cx={0} cy={0} s={1.1} />}
        {name === "automate" && (<><Gear cx={-12} cy={6} s={1.25} /><Gear cx={26} cy={-20} s={0.7} tone="w" /></>)}
      </g>
    </Svg>
  );
}

/* ---------- Small decorative pieces ---------- */
export function CornerAccent({ className }: { className?: string }) {
  return (
    <Svg w={72} h={72} id="il-corner" className={className}>
      <g transform="translate(36 22) scale(.55)">
        <Box x={-0.8} y={-0.8} w={1.2} d={1.2} h={1.2} tone="y" />
        <Box x={0.6} y={-0.4} w={0.9} d={0.9} h={0.7} tone="w" />
        <Box x={-0.6} y={0.7} w={0.8} d={0.8} h={0.5} tone="k" />
      </g>
    </Svg>
  );
}

export function DividerGlyph({ className }: { className?: string }) {
  return (
    <Svg w={64} h={40} id="il-divider" className={className}>
      <g transform="translate(32 14) scale(.5)">
        <Box x={-1.2} y={-0.6} w={1.1} d={1.1} h={0.9} tone="y" />
        <Box x={0.1} y={-0.4} w={1} d={1} h={0.6} tone="w" />
      </g>
    </Svg>
  );
}

export function EmptyScene(p: SceneProps) {
  return (
    <Svg w={240} h={190} id="il-empty" {...p}>
      <g transform="translate(120 50) scale(.78)">
        <Platform w={5} d={5} />
        <Box x={1.2} y={1.2} w={2.6} d={2.6} h={0.1} tone="w" />
        <polyline points={pts([[1.2, 1.2, 1.6], [3.8, 1.2, 1.6], [3.8, 3.8, 1.6], [1.2, 3.8, 1.6], [1.2, 1.2, 1.6]])} fill="none" stroke="var(--il-stroke)" strokeWidth="1.6" strokeDasharray="3 5" />
        <polyline points={pts([[1.2, 3.8, 0.1], [1.2, 3.8, 1.6]])} stroke="var(--il-stroke)" strokeWidth="1.6" strokeDasharray="3 5" fill="none" />
      </g>
      <Node x={186} y={42} r={7} tone="y" />
      <Node x={52} y={70} r={5} tone="c" delay={1} />
    </Svg>
  );
}

export function NotFoundScene(p: SceneProps) {
  return (
    <Svg w={420} h={300} id="il-404" {...p}>
      <g transform="translate(210 110)">
        <Platform w={6} d={6} />
        <Box x={0.6} y={0.6} w={1.5} d={1.5} h={0.9} tone="y" />
        <Box x={3.8} y={3.2} w={1.3} d={1.3} h={0.5} tone="k" />
      </g>
      <g className="il-float"><g transform="translate(300 84) rotate(14)"><Box x={-0.8} y={-0.8} w={1.3} d={1.3} h={1.3} tone="c" /></g></g>
      <Magnifier cx={150} cy={120} s={1.4} />
      <path d="M206 98 252 84" stroke="var(--il-stroke)" strokeWidth="1.8" strokeDasharray="2 6" strokeLinecap="round" fill="none" />
      <Node x={86} y={64} r={7} tone="v" />
      <Node x={352} y={188} r={6} tone="y" delay={1} />
    </Svg>
  );
}

export function MailScene(p: SceneProps) {
  return (
    <Svg w={220} h={170} id="il-mail" {...p}>
      <g transform="translate(110 44) scale(.85)">
        <Platform w={4.4} d={4.4} />
        <Shadow x={0.8} y={0.8} w={2.8} d={2} />
        <Box x={0.8} y={1.2} w={2.8} d={2} h={0.6} tone="y" />
        <Plane p={[[0.8, 3.2, 0.6], [2.2, 2.2, 0.6], [3.6, 3.2, 0.6]]} fill="var(--il-w1)" edge />
        <polyline points={pts([[0.8, 3.2, 0.6], [2.2, 2.2, 0.6], [3.6, 3.2, 0.6]])} fill="none" stroke="var(--il-stroke)" strokeWidth="2" strokeLinejoin="round" />
      </g>
      <Node x={176} y={34} r={6} tone="c" />
      <Node x={40} y={56} r={5} tone="v" delay={1} />
    </Svg>
  );
}

export function ContactScene(p: SceneProps) {
  return (
    <Svg w={240} h={190} id="il-contact" {...p}>
      <g transform="translate(120 56) scale(.74)">
        <Platform w={5} d={5} />
        <Window x={1} y={2.6} w={3} h={2.2} lines={false} />
      </g>
      <g className="il-float"><rect x="52" y="28" width="62" height="38" rx="14" fill="var(--il-y2)" stroke="var(--il-stroke)" strokeWidth="2" /><path d="M70 66 66 80 86 66" fill="var(--il-y2)" stroke="var(--il-stroke)" strokeWidth="2" strokeLinejoin="round" /><circle cx="70" cy="47" r="3.4" fill="var(--il-ink)" /><circle cx="83" cy="47" r="3.4" fill="var(--il-ink)" /><circle cx="96" cy="47" r="3.4" fill="var(--il-ink)" /></g>
      <g className="il-float" style={{ animationDelay: "1.2s" }}><rect x="128" y="20" width="54" height="34" rx="12" fill="var(--il-w1)" stroke="var(--il-stroke)" strokeWidth="2" /><path d="M164 54 170 66 156 54" fill="var(--il-w1)" stroke="var(--il-stroke)" strokeWidth="2" strokeLinejoin="round" /><path d="M140 34H170M140 42H158" stroke="var(--il-stroke)" strokeWidth="2.4" strokeLinecap="round" /></g>
    </Svg>
  );
}

/** Animated success mark: ring pops and the check scales in (transform + opacity only). */
export function SuccessMark({ className }: { className?: string }) {
  return (
    <Svg w={96} h={96} id="il-success" title="Success" className={className}>
      <circle cx="48" cy="48" r="30" fill="var(--il-y2)" opacity=".5" className="il-ring" />
      <g className="il-pop">
        <circle cx="48" cy="48" r="30" fill="var(--il-y2)" stroke="var(--il-stroke)" strokeWidth="2" />
        <path d="M24 38a26 26 0 0 1 22-13" fill="none" stroke="var(--il-hi)" strokeWidth="2" strokeLinecap="round" />
        <path d="M35 49 44 58 62 39" fill="none" stroke="var(--il-ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Svg>
  );
}

/* ---------- Category covers (1200 x 630), one template + swappable glyph ---------- */
export type Category = "AI" | "Cybersecurity" | "Software" | "Hiring" | "Compliance";
export const coverCategories: Category[] = ["AI", "Cybersecurity", "Software", "Hiring", "Compliance"];

function Glyph({ category }: { category: string }) {
  switch (category) {
    case "AI": {
      const [cx, cy] = T(3, 3, 1.3, 0, 0);
      return (<><Box x={2} y={2} w={2} d={2} h={1} tone="k" /><Plane p={[[2.3, 2.3, 1], [3.7, 2.3, 1], [3.7, 3.7, 1], [2.3, 3.7, 1]]} fill="var(--il-y2)" /><Plane p={[[2.7, 2.7, 1.02], [3.3, 2.7, 1.02], [3.3, 3.3, 1.02], [2.7, 3.3, 1.02]]} fill="var(--il-w1)" />{[[0.8, 2.4], [0.8, 3.0], [4.4, 2.4], [4.4, 3.0]].map(([x, y], i) => (<Box key={i} x={x} y={y} w={0.8} d={0.3} h={0.2} tone="y" />))}<Node x={cx - 150} y={cy - 70} r={9} tone="c" /><Node x={cx + 150} y={cy - 80} r={9} tone="v" /><Link d={`M${cx - 150} ${cy - 70} ${cx} ${cy - 40}M${cx + 150} ${cy - 80} ${cx} ${cy - 40}`} /></>);
    }
    case "Cybersecurity": {
      const [cx, cy] = T(3, 3, 0, 0, 0);
      return (<><Shield cx={cx} cy={cy - 40} s={2.4} /><Padlock cx={cx + 110} cy={cy + 30} s={1.4} /></>);
    }
    case "Software":
      return (<><Window x={0.6} y={1.2} w={4} h={3.8} /><Box x={4.6} y={3} w={1.1} d={1.1} h={1} tone="y" /><Box x={0.8} y={4.8} w={1} d={1} h={0.7} tone="c" /><Bracket cx={-160} cy={-60} s={1.5} /></>);
    case "Hiring": {
      return (<><Person cx={-130} cy={20} s={1.6} tone="y" /><Person cx={0} cy={-30} s={1.9} tone="c" /><Person cx={130} cy={20} s={1.6} tone="v" /><Link d="M-130 20 0 -30 130 20" /></>);
    }
    default: // Compliance
      return (<><Box x={1.4} y={1.4} w={3} d={0.5} h={4.2} tone="w" /><Plane p={[[1.6, 1.9, 0.5], [4.2, 1.9, 0.5], [4.2, 1.9, 4.9], [1.6, 1.9, 4.9]]} fill="var(--il-w1)" />{[0, 1, 2].map((i) => (<g key={i}><Plane p={[[1.9, 1.9, 3.9 - i * 1.2], [2.4, 1.9, 3.9 - i * 1.2], [2.4, 1.9, 3.4 - i * 1.2], [1.9, 1.9, 3.4 - i * 1.2]]} fill="var(--il-y2)" /><Plane p={[[2.8, 1.9, 3.7 - i * 1.2], [3.9, 1.9, 3.7 - i * 1.2], [3.9, 1.9, 3.5 - i * 1.2], [2.8, 1.9, 3.5 - i * 1.2]]} fill="var(--il-k2)" /></g>))}<Shield cx={150} cy={80} s={1.2} /></>);
  }
}

export function CoverScene({ category = "AI", title, desc, className }: { category?: string } & SceneProps) {
  const id = `il-cover-${category.toLowerCase()}`;
  return (
    <Svg w={1200} h={630} id={id} title={title} desc={desc} className={className}>
      <defs>
        <radialGradient id={`${id}-a`} cx="82%" cy="12%" r="70%"><stop offset="0" stopColor="var(--il-bg1)" /><stop offset="1" stopColor="var(--il-bg2)" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="1200" height="630" fill="var(--il-bg2)" />
      <rect width="1200" height="630" fill={`url(#${id}-a)`} />
      <circle cx="140" cy="560" r="220" fill="var(--il-y2)" opacity=".10" />
      <g transform="translate(600 238) scale(2.15)">
        <Platform w={6} d={6} />
        <Glyph category={category} />
      </g>
    </Svg>
  );
}
