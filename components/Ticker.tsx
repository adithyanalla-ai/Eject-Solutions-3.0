"use client";
import { useState } from "react";
import { whatsappHref } from "@/lib/site";

const phrases = ["Click to connect on WhatsApp", "Network with innovators", "Join our community"];

function Row() {
  return (
    <>
      {phrases.map((t) => (
        <span key={t} className="mx-6 inline-flex items-center gap-3 whitespace-nowrap text-sm font-medium">
          <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-[#facc15] shadow-[0_0_0_1px_rgba(10,10,10,.6)]" />
          {t} <span aria-hidden="true">↗</span>
        </span>
      ))}
    </>
  );
}

/**
 * Slim frosted announcement bar. The scrolling phrases are text only; one link covers the bar (all the way to the
 * pause button), so there are no moving, partly clipped or duplicated focus targets. Pausable via button, hover and
 * focus. Static and wrapped under prefers-reduced-motion.
 */
export default function Ticker() {
  const [paused, setPaused] = useState(false);
  return (
    <section aria-label="Announcements" className="ticker container-page pt-2" data-paused={paused}>
      <div className="frost relative flex h-9 items-center !rounded-full pl-2 pr-1">
        <div className="min-w-0 flex-1 overflow-hidden motion-reduce:overflow-visible" aria-hidden="true">
          <div className="ticker-track">
            <Row />
            <span className="ticker-dup contents"><Row /></span>
          </div>
        </div>
        <a
          href={whatsappHref("Hi Eject Solutions, I'd like to connect.")}
          target="_blank"
          rel="noopener noreferrer"
          data-track="cta_click"
          data-track-label="ticker-whatsapp"
          className="absolute inset-y-0 left-0 right-11 rounded-full hover:bg-[#facc15]/15"
        >
          <span className="sr-only">Click to connect on WhatsApp. Network with innovators. Join our community. Opens WhatsApp.</span>
        </a>
        <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? "Resume announcements" : "Pause announcements"}
          className="relative z-10 ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs motion-reduce:hidden" style={{ background: "rgb(var(--bg) / .7)", boxShadow: "var(--inset)" }}>
          <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
        </button>
      </div>
    </section>
  );
}
