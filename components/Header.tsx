import Link from "next/link";
import { nav } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";
import PaletteButton from "./PaletteButton";
import Icon from "./Icon";
import NavLinks from "./NavLinks";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight" aria-label="Eject Solutions home">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe566" /><stop offset="1" stopColor="#eab308" /></linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#lg)" />
        <path d="M9 11h14M9 16h9M9 21h14" stroke="#0a0a0a" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <span>Eject<span className="rounded-sm bg-[#facc15] px-[3px] ml-px text-[#0a0a0a]">.</span></span>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-3 z-40 px-3 sm:px-4" style={{ height: 64 }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <div className="nav-pill frost mx-auto flex h-16 max-w-page items-center justify-between gap-3 !rounded-full px-4 sm:px-5">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:block"><NavLinks items={nav} /></nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <PaletteButton />
          <ThemeToggle />
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex" data-track="cta_click" data-track-label="header-book">Book a consultation</Link>
          {/* No-JS frosted drawer */}
          <details className="group lg:hidden">
            <summary className="btn btn-ghost !px-3 list-none cursor-pointer" aria-label="Menu">
              <Icon name="menu" className="group-open:hidden" />
              <Icon name="close" className="hidden group-open:inline" />
            </summary>
            <nav aria-label="Mobile" className="frost absolute right-3 top-[72px] w-[min(18rem,calc(100vw-1.5rem))] p-2 !rounded-2xl">
              <NavLinks items={nav} mobile />
              <Link href="/contact" className="btn btn-primary mt-2 w-full" data-track="cta_click" data-track-label="mobile-menu-book">Book a consultation</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
