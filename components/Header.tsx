import Link from "next/link";
import { nav } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";
import PaletteButton from "./PaletteButton";
import Icon from "./Icon";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight" aria-label="Eject Solutions home">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#lg)" />
        <path d="M9 11h14M9 16h9M9 21h14" stroke="#050914" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <span>Eject<span className="text-primary">.</span></span>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/85 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="rounded-lg px-3 py-2 text-[0.95rem] text-muted hover:text-fg hover:bg-surface/70">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <PaletteButton />
          <ThemeToggle />
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex" data-track="cta_click" data-track-label="header-book">Book a consultation</Link>
          {/* No-JS mobile menu */}
          <details className="relative lg:hidden group">
            <summary className="btn btn-ghost !px-3 list-none cursor-pointer" aria-label="Menu">
              <Icon name="menu" className="group-open:hidden" />
              <Icon name="close" className="hidden group-open:inline" />
            </summary>
            <nav aria-label="Mobile" className="glass absolute right-0 mt-2 w-64 p-2 !bg-surface">
              <ul>
                {nav.map((n) => (
                  <li key={n.href}><Link href={n.href} className="block rounded-lg px-3 py-3 hover:bg-primary/10">{n.label}</Link></li>
                ))}
                <li><Link href="/contact" className="btn btn-primary mt-2 w-full" data-track="cta_click" data-track-label="mobile-menu-book">Book a consultation</Link></li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
