"use client";
import Icon from "./Icon";

/** Hardware-style switch: recessed track, raised knob. Light is default; dark = "Frosted Night". */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };
  return (
    <button type="button" onClick={toggle} className="switch" aria-label="Toggle Frosted Night (dark) theme" title="Toggle Frosted Night theme">
      <span className="switch-knob">
        <Icon name="sun" size={15} className="theme-sun-icon" />
        <Icon name="moon" size={15} className="theme-moon-icon" />
      </span>
    </button>
  );
}
