import { NextResponse } from "next/server";
import { sendMail, verifyToken } from "@/lib/mail";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const email = verifyToken(token);
  const dest = (state: string) => NextResponse.redirect(`${SITE_URL}/newsletter/confirmed?status=${state}`, 303);
  if (!email) return dest("invalid");

  const key = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (key && audience) {
    const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    if (!res.ok) return dest("error");
  } else {
    // No audience configured: hand the confirmed address to the team inbox instead.
    const r = await sendMail({ to: process.env.CONTACT_TO_EMAIL ?? "hello@ejectsolutions.com", subject: "Confirmed newsletter subscriber", text: `Confirmed (double opt-in): ${email}` });
    if (!r.ok) return dest("error");
  }
  return dest("ok");
}
