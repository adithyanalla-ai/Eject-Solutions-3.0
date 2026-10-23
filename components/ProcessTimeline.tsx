const steps = [
  { n: 1, t: "Discover", d: "A scoping call, a written brief and the riskiest assumptions named up front." },
  { n: 2, t: "Build", d: "Thin vertical slices on real infrastructure, with a demo every sprint." },
  { n: 3, t: "Secure", d: "Threat model, code review and independent testing before anything ships." },
  { n: 4, t: "Automate", d: "Monitoring, AI assistants and workflows that keep paying off after launch." },
];

export default function ProcessTimeline() {
  return (
    <ol className="relative grid gap-6 md:grid-cols-4" aria-label="How we work">
      <span aria-hidden="true" className="absolute left-[27px] top-6 hidden h-[calc(100%-3rem)] w-[6px] rounded-full md:left-[10%] md:top-[27px] md:block md:h-[6px] md:w-[80%]" style={{ background: "rgb(var(--bg) / .7)", boxShadow: "var(--inset)" }} />
      {steps.map((s) => (
        <li key={s.n} className="reveal relative flex gap-4 md:block md:text-center">
          <span className="keycap relative !h-14 !w-14 shrink-0 rounded-full font-display text-xl font-bold md:mx-auto">{s.n}</span>
          <div className="md:mt-4">
            <h3 className="text-xl">{s.t}</h3>
            <p className="mt-1 text-[0.95rem] text-muted">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
