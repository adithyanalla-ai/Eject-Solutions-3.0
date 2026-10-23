"use client";
import Icon from "./Icon";

export default function PaletteButton() {
  return (
    <button
      type="button"
      className="btn btn-ghost !px-3 gap-2"
      aria-label="Search the site (Ctrl or Command K)"
      onClick={() => window.dispatchEvent(new Event("open-palette"))}
    >
      <Icon name="search" size={18} />
      <kbd className="hidden lg:inline font-mono text-xs text-muted">Ctrl K</kbd>
    </button>
  );
}
