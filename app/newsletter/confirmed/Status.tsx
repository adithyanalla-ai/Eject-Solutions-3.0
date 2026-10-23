"use client";
import { useSearchParams } from "next/navigation";

const copy: Record<string, { h: string; p: string }> = {
  ok: { h: "You're subscribed.", p: "Thanks for confirming. Expect short, sourced notes on security, AI and hiring." },
  invalid: { h: "That link has expired or is invalid.", p: "Please subscribe again from the footer and use the newest email we send." },
  error: { h: "We couldn't complete your subscription.", p: "Something failed on our side. Please try again in a few minutes." },
};

export default function Status() {
  const c = copy[useSearchParams().get("status") ?? "invalid"] ?? copy.invalid;
  return (
    <>
      <h1 className="text-4xl">{c.h}</h1>
      <p className="mt-4 text-muted">{c.p}</p>
    </>
  );
}
