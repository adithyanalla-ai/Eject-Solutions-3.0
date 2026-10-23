const paths: Record<string, string> = {
  code: "M8 8 3 12l5 4M16 8l5 4-5 4M14 5l-4 14",
  shield: "M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Zm-3 9 2.2 2.2L15.5 10",
  bot: "M12 3v3M6 8h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Zm3 5v1m6-1v1M9 17h6M2 12v3m20-3v3",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm6 4v2",
  radar: "M12 12 18 6M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 12h.01",
  badge: "M12 3l2.4 1.8 3-.2 1 2.8 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-1 2.8-3-.2L12 21l-2.4-1.8-3 .2-1-2.8L3.2 14.8l.9-2.9-.9-2.9 2.4-1.8 1-2.8 3 .2L12 3Zm-3 9 2.2 2.2L15.5 10",
  users: "M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 20v-1a4 4 0 0 0-3-3.9M15.5 4.2a3.5 3.5 0 0 1 0 6.6",
  megaphone: "M3 11v3a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Zm13-2a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12",
  cap: "M2 9l10-5 10 5-10 5L2 9Zm4 2.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9v6",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  search: "m21 21-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-14v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4",
  moon: "M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  whatsapp: "M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.5L3 21Zm6-12c0 3.5 2.5 6 6 6l1.2-1.4-2-1-.9.7c-.8-.3-1.9-1.4-2.2-2.2l.7-.9-1-2L9 9Z",
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2 8 6 8-6",
  pin: "M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  check: "m5 12 5 5 9-10",
};

export default function Icon({ name, size = 22, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} focusable="false">
      <path d={paths[name] ?? paths.code} />
    </svg>
  );
}
