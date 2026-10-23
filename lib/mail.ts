import crypto from "node:crypto";

export async function sendMail(opts: { to: string; subject: string; text: string; html?: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM ?? "Eject Solutions <no-reply@ejectsolutions.com>";
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[mail:dev] RESEND_API_KEY not set. Would send:", opts.subject, "→", opts.to);
      return { ok: true as const, dev: true };
    }
    return { ok: false as const, error: "Email delivery is not configured" };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [opts.to], subject: opts.subject, text: opts.text, html: opts.html, reply_to: opts.replyTo }),
  });
  if (!res.ok) return { ok: false as const, error: `Resend ${res.status}` };
  return { ok: true as const };
}

// --- Best-effort in-memory rate limiter (per server instance). Pair with Turnstile in production. ---
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return arr.length > max;
}

export async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: skip
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const j = (await res.json().catch(() => ({}))) as { success?: boolean };
  return Boolean(j.success);
}

// --- Stateless signed tokens for newsletter double opt-in ---
const secret = () => process.env.NEWSLETTER_SECRET ?? (process.env.NODE_ENV === "production" ? "" : "dev-secret");

export function signToken(email: string, ttlMs = 1000 * 60 * 60 * 48) {
  const s = secret();
  if (!s) throw new Error("NEWSLETTER_SECRET is not set");
  const payload = Buffer.from(JSON.stringify({ e: email, x: Date.now() + ttlMs })).toString("base64url");
  const sig = crypto.createHmac("sha256", s).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string): string | null {
  const s = secret();
  if (!s) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = crypto.createHmac("sha256", s).update(payload).digest("base64url");
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return Date.now() < x ? e : null;
  } catch { return null; }
}

export const clientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "unknown";

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
