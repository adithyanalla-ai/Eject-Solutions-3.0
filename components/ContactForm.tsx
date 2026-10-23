"use client";
import { useRef, useState } from "react";
import Script from "next/script";
import { track } from "@/lib/analytics";

type State = { status: "idle" | "sending" | "ok" | "error"; message?: string; errors?: Record<string, string> };

const interests = [
  "Custom software / product engineering",
  "VAPT / penetration testing",
  "AI agents & RAG assistants",
  "AI security & governance",
  "Managed threat monitoring",
  "Compliance (ISO 27001 / SOC 2 / DPDP)",
  "Recruitment & IT staffing",
  "AI marketing automation",
  "Training & internships",
  "Something else",
];

export default function ContactForm({ turnstileKey }: { turnstileKey: string }) {
  const [state, setState] = useState<State>({ status: "idle" });
  const started = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - started.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        track("form_submit", { form: "contact", interest: String(data.interest ?? "") });
        setState({ status: "ok" });
        form.reset();
      } else {
        setState({ status: "error", message: json.message ?? "Something went wrong.", errors: json.errors });
      }
    } catch {
      setState({ status: "error", message: "Network error. Please try again or email us directly." });
    }
  }

  if (state.status === "ok") {
    return (
      <div role="status" className="glass p-8">
        <h2 className="text-2xl">Thanks, message received.</h2>
        <p className="mt-3 text-muted">We read every enquiry and reply within one working day. If it is urgent, message us on WhatsApp.</p>
      </div>
    );
  }

  const err = (k: string) => state.errors?.[k];

  return (
    <form onSubmit={onSubmit} noValidate className="glass p-6 sm:p-8 space-y-5" aria-describedby={state.status === "error" ? "form-error" : undefined}>
      {turnstileKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={err("name")}>
          <input id="name" name="name" required autoComplete="name" className="input" aria-invalid={!!err("name")} />
        </Field>
        <Field id="email" label="Work email" error={err("email")}>
          <input id="email" name="email" type="email" required autoComplete="email" className="input" aria-invalid={!!err("email")} />
        </Field>
        <Field id="company" label="Company (optional)">
          <input id="company" name="company" autoComplete="organization" className="input" />
        </Field>
        <Field id="interest" label="I'm interested in">
          <select id="interest" name="interest" className="input" defaultValue={interests[0]}>
            {interests.map((i) => <option key={i}>{i}</option>)}
          </select>
        </Field>
      </div>
      <Field id="message" label="What are you trying to achieve?" error={err("message")}>
        <textarea id="message" name="message" required rows={6} className="input" aria-invalid={!!err("message")} />
      </Field>
      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {turnstileKey && <div className="cf-turnstile" data-sitekey={turnstileKey} data-theme="auto" />}
      <p className="text-sm text-muted">
        By sending this you agree to us contacting you about your enquiry. See our <a className="text-primary underline underline-offset-4" href="/privacy">privacy policy</a>.
      </p>
      {state.status === "error" && <p id="form-error" role="alert" className="text-red-500 font-medium">{state.message}</p>}
      <button type="submit" className="btn btn-primary" disabled={state.status === "sending"} data-track="cta_click" data-track-label="contact-submit">
        {state.status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
    </div>
  );
}
