import { z } from "zod";
import { NextResponse } from "next/server";
import { clientIp, escapeHtml, rateLimited, sendMail, verifyTurnstile } from "@/lib/mail";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  company: z.string().trim().max(150).optional().default(""),
  interest: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Please tell us a little more (10+ characters)").max(5000),
  website: z.string().optional(), // honeypot
  elapsed: z.number().optional(),
  "cf-turnstile-response": z.string().optional(),
});

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ message: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }
  const raw = await req.json().catch(() => null);
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return NextResponse.json({ message: "Please fix the highlighted fields.", errors }, { status: 400 });
  }
  const d = parsed.data;
  // Honeypot filled or form submitted implausibly fast: pretend success so bots learn nothing.
  if (d.website || (typeof d.elapsed === "number" && d.elapsed < 2500)) return NextResponse.json({ ok: true });
  if (!(await verifyTurnstile(d["cf-turnstile-response"], ip))) {
    return NextResponse.json({ message: "Spam check failed. Please reload and try again." }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "hello@ejectsolutions.com";
  const text = `New website enquiry\n\nName: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company}\nInterest: ${d.interest}\n\n${d.message}\n\nIP: ${ip}`;
  const html = `<h2>New website enquiry</h2><p><b>Name:</b> ${escapeHtml(d.name)}<br><b>Email:</b> ${escapeHtml(d.email)}<br><b>Company:</b> ${escapeHtml(d.company)}<br><b>Interest:</b> ${escapeHtml(d.interest)}</p><p style="white-space:pre-wrap">${escapeHtml(d.message)}</p>`;
  const sent = await sendMail({ to, subject: `Website enquiry: ${d.interest || "General"} (${d.name})`, text, html, replyTo: d.email });
  if (!sent.ok) {
    console.error("contact mail failed", sent.error);
    return NextResponse.json({ message: "We could not send your message right now. Please email us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
