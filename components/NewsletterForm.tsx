"use client";
import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { SuccessMark } from "./illustrations/scenes";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<{ s: "idle" | "sending" | "ok" | "error"; m?: string }>({ s: "idle" });
  const started = useRef(Date.now());

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState({ s: "sending" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), website: fd.get("website"), elapsed: Date.now() - started.current }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok) { track("form_submit", { form: "newsletter" }); setState({ s: "ok" }); }
      else setState({ s: "error", m: j.message ?? "Could not subscribe." });
    } catch { setState({ s: "error", m: "Network error. Please try again." }); }
  }

  if (state.s === "ok")
    return (<div role="status" className="flex items-center gap-4"><SuccessMark className="h-16 w-16 shrink-0" /><p className="text-fg">Almost done. Check your inbox and click the confirmation link to finish subscribing.</p></div>);

  return (
    <form onSubmit={submit} noValidate>
      <div className={`flex gap-2 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}>
        <label htmlFor={compact ? "nl-email-c" : "nl-email"} className="sr-only">Email address</label>
        <input id={compact ? "nl-email-c" : "nl-email"} name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="input flex-1" />
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><input name="website" tabIndex={-1} autoComplete="off" /></div>
        <button className="btn btn-primary" disabled={state.s === "sending"}>{state.s === "sending" ? "Subscribing…" : "Subscribe"}</button>
      </div>
      {state.s === "error" && <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-400">{state.m}</p>}
      <p className="mt-2 text-xs text-muted">One email per week at most. We ask you to confirm by email first. Unsubscribe any time.</p>
    </form>
  );
}
