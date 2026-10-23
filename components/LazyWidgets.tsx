"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });
const CookieBanner = dynamic(() => import("./CookieBanner"), { ssr: false });

/** Loads non-critical widgets after hydration so they never compete with LCP. */
export default function LazyWidgets({ ga4 }: { ga4: string }) {
  const [paletteLoaded, setPaletteLoaded] = useState(false);
  const [signal, setSignal] = useState(0);
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    const open = () => { setPaletteLoaded(true); setSignal((s) => s + 1); };
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); }
    };
    window.addEventListener("open-palette", open);
    window.addEventListener("keydown", key);
    const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 2500));
    const id = idle(() => setBanner(true));
    return () => {
      window.removeEventListener("open-palette", open);
      window.removeEventListener("keydown", key);
      (window as any).cancelIdleCallback?.(id);
    };
  }, []);

  return (
    <>
      {paletteLoaded && <CommandPalette signal={signal} />}
      {banner && ga4 && <CookieBanner ga4={ga4} />}
    </>
  );
}
