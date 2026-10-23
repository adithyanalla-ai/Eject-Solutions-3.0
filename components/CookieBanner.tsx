"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const KEY = "consent-analytics";

/** Shown only when GA4 is configured. GA4 is loaded exclusively after the visitor accepts. */
export default function CookieBanner({ ga4 }: { ga4: string }) {
  const [choice, setChoice] = useState<"yes" | "no" | null | undefined>(undefined);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      setChoice(v === "yes" || v === "no" ? v : null);
    } catch { setChoice(null); }
    const reopen = () => setChoice(null);
    window.addEventListener("open-consent", reopen);
    return () => window.removeEventListener("open-consent", reopen);
  }, []);

  const save = (v: "yes" | "no") => {
    try { localStorage.setItem(KEY, v); } catch {}
    setChoice(v);
  };

  return (
    <>
      {choice === "yes" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="lazyOnload" />
          <Script id="ga4-init" strategy="lazyOnload">{`
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);}
            window.gtag=gtag;
            gtag('js',new Date());
            gtag('config','${ga4}',{anonymize_ip:true});
          `}</Script>
        </>
      )}
      {choice === null && (
        <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-surface p-4 shadow-2xl sm:inset-x-auto sm:right-4 sm:bottom-4">
          <p className="text-sm text-fg/90">
            We use analytics cookies only if you agree, to see which pages help visitors. No ads, no selling data.{" "}
            <Link href="/privacy#cookies" className="text-primary underline underline-offset-4">Details</Link>
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="btn btn-primary !min-h-[40px]" onClick={() => save("yes")}>Accept analytics</button>
            <button type="button" className="btn btn-ghost !min-h-[40px]" onClick={() => save("no")}>Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
