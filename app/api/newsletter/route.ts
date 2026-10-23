import { z } from "zod";
import { NextResponse } from "next/server";
import { clientIp, rateLimited, sendMail, signToken } from "@/lib/mail";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

const schema = z.object({ email: z.string().trim().toLowerCase().email().max(200), website: z.string().optional(), elapsed: z.number().optional() });

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(`nl:${ip}`, 4, 10 * 60 * 1000)) return NextResponse.json({ message: "Too many attempts. Try again later." }, { status: 429 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  const { email, website, elapsed } = parsed.data;
  if (website || (typeof elapsed === "number" && elapsed < 1500)) return NextResponse.json({ ok: true });

  let token: string;
  try { token = signToken(email); } catch { return NextResponse.json({ message: "Newsletter is not configured yet." }, { status: 503 }); }
  const link = `${SITE_URL}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;
  const sent = await sendMail({
    to: email,
    subject: "Confirm your subscription to Eject Solutions updates",
    text: `Please confirm your subscription by opening this link (valid for 48 hours):\n\n${link}\n\nIf you did not request this, ignore this email and nothing will happen.\n\nEject Solutions Pvt Ltd, Kukatpally, Hyderabad`,
    html: `<p>Please confirm your subscription to Eject Solutions updates:</p><p><a href="${link}">Confirm subscription</a></p><p>This link is valid for 48 hours. If you did not request this, ignore this email and nothing will happen.</p>`,
  });
  if (!sent.ok) return NextResponse.json({ message: "Could not send the confirmation email. Please try again later." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
