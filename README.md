# Eject Solutions Pvt Ltd: website

Next.js 15 (App Router) + TypeScript + Tailwind CSS. Content is MDX in `/content`, statically generated, with hourly ISR for blog and news. Deploys to Vercel (or Cloudflare Pages).

> Software, security and AI under one roof: *Build it, secure it, automate it.*

## Architecture

```
app/                 routes (App Router). Pages are static; only /api/* are dynamic
  services/[slug]    9 service pages (MDX in content/services)
  industries/[slug]  4 industry pages
  blog/ news/        index + [slug] (+ blog/category/[category]), ISR revalidate 1h
  case-studies/      template (placeholder is noindex + excluded from sitemap)
  authors/[slug]     author pages (Person schema)
  api/contact        validated form → Resend (honeypot, time trap, rate limit, optional Turnstile)
  api/newsletter     double opt-in: signed confirmation link → /api/newsletter/confirm
  sitemap.ts robots.ts rss.xml/ search-index.json/ opengraph-image.tsx
components/          UI. Client JS is limited to: theme toggle, command palette (lazy), cookie banner (lazy), forms, reveal/counters
content/             *.mdx with frontmatter, sources.json (news feeds), calendar.json (60 planned items)
lib/                 content loader, JSON-LD builders, SEO metadata helper, mail + token utils
scripts/             check-content, generate-drafts, make-covers, audit-seo, lighthouse, smoke, render-calendar
.github/workflows/   ci.yml, content-drafts.yml (cron → draft PRs)
docs/                seo-checklist.md, lighthouse-report.md, content-calendar.md
redirects.json       301 map for old URLs
```

Design: **light skeuomorphism + frosted touch in yellow, white and black**. Light (white + black ink + yellow accents) is the default; "Frosted Night" is the black-and-yellow variant using the same tokens (`[data-theme="dark"]`, toggled by a hardware-style switch). All tokens live in `app/globals.css`: raised ceramic `.panel`, recessed `.panel-inset`/`.input`, true frosted `.frost` (backdrop-filter, with an opaque `@supports` fallback), `.keycap` icon tiles, pill buttons that sink on press, `.segmented` control, embossed dividers, and a pointer-following sheen (`.lift`, fine pointers only). The backdrop is three pre-blurred gradient orbs (soft yellow, white, pale amber) drifting with transform-only animation plus a ~1 KB SVG grain. Backdrop-filter is limited to about 4 surfaces on screen (navbar, hero console, security pulse, palette/drawer/cookie banner); everything else is a cheap raised panel. Everything animates transform/opacity only, and all motion is disabled under `prefers-reduced-motion`. Headings use self-hosted Space Grotesk; body uses the system UI stack (zero download); mono accents use a 21 KB self-hosted subset.

New home-page elements: hero news console (rotates the highlighted headline, all items readable without JS), bento services with keycap icons, Security Pulse dial (needle animates once; value = news notes in the last 30 days vs a 12/month cadence, i.e. real data, not an invented score), animated process timeline, trust pills (`content/trust.json`) and testimonial carousel (`content/testimonials.json`), both **hidden until you add verified items**, two-column blog/news cards, newsletter inset card, footer map card. Blog posts get a reading-progress bar and a frosted sticky table of contents. A floating "Book a consultation" pill sits on every page except `/contact`.

## Quick start

```bash
npm install
cp .env.example .env.local      # fill in what you have; everything degrades gracefully when empty
npm run dev                     # http://localhost:3000
npm run build && npm start      # production build (runs content checks first)
```

Requires Node 20+ (CI uses 22).

## Environment variables

See `.env.example` (commented). Summary:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (default `https://ejectsolutions.com`) |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_WHATSAPP_NUMBER` | NAP + WhatsApp links. Phone is omitted everywhere until set |
| `NEXT_PUBLIC_GA4_ID` | Enables GA4 **and** the cookie banner. GA4 loads only after "Accept" |
| `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION` | Search engine verification meta tags |
| `RESEND_API_KEY`, `MAIL_FROM`, `CONTACT_TO_EMAIL` | Contact form + newsletter emails (verify the sending domain in Resend) |
| `RESEND_AUDIENCE_ID` | Optional: confirmed subscribers are added to this Resend audience; otherwise the confirmed address is emailed to `CONTACT_TO_EMAIL` |
| `NEWSLETTER_SECRET` | Signs confirmation links (required for the newsletter) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Optional Cloudflare Turnstile on the contact form |
| `ANTHROPIC_API_KEY` (secret), `ANTHROPIC_MODEL` (variable) | Optional, GitHub Actions only: LLM-written first drafts |

Without `RESEND_API_KEY` the contact API returns a friendly error in production (and logs in dev). Without `NEWSLETTER_SECRET` the newsletter reports "not configured".

## Deploy

### Vercel (recommended)
1. Import the repo → framework auto-detected (Next.js). Build command `npm run build`.
2. Add the environment variables above (Production + Preview).
3. Add domain `ejectsolutions.com` and `www` (redirect www → apex). Vercel serves HTTP/2, brotli and HSTS.
4. Redirects from `redirects.json` ship with the build (explicit 301).
5. Make sure `NEXT_PUBLIC_SITE_URL` matches the final domain **before** the first production build (it feeds canonicals, sitemap and schema).
6. Set up email DNS (SPF, DKIM from Resend, DMARC) so leads are not spam-foldered.

### Cloudflare Pages
Use the `@cloudflare/next-on-pages` adapter and set the API routes to `runtime = "edge"` or keep Node with Workers compat (`nodemailer` is not used, so edge is fine). Static pages work as-is. Vercel is the tested path.

### Rate limiting note
The in-memory limiter in `lib/mail.ts` is per server instance (best effort on serverless). Pair it with Turnstile (recommended) or move the counter to Upstash/Redis if you see abuse.

## Adding content (no CMS, no admin)

1. Create `content/blog/my-post.mdx` (or `news/`, `services/`, `industries/`, `case-studies/`).
2. Add frontmatter, write the body in Markdown (use `##` headings; the template renders the H1):

```mdx
---
title: "Under 60 characters"
description: "Under 155 characters."
date: 2026-11-02            # future dates stay hidden until that day (ISR, within the hour)
updated: 2026-11-02         # moves sitemap lastmod
reviewed: 2026-11-02        # blog: human sign-off date, shown on the page
author: eject-editorial     # a file name in content/authors/
category: AI                # AI | Cybersecurity | Software | Hiring | Compliance
tags: ["RAG", "LLM"]
services: ["ai-agents-rag-assistants"]   # drives related links both ways
cover: /covers/my-post.svg  # optional; `npm run covers` generates abstract SVGs
coverAlt: "Describe the image"
faq:
  - q: "A real question?"
    a: "A real answer."
source:                      # news only (required)
  name: "Publisher"
  url: "https://…"
---
```

3. `npm run check:content` (also runs before every build). Rules: services ≥ 700 words and ≥ 5 FAQs; blog 1,200 to 2,000 words and ≥ 3 FAQs; news 150 to 300 words with a source; titles < 60, descriptions < 155; no broken internal links.
4. Commit and push. Vercel rebuilds. Sitemap, RSS, search index, schema and OG image update automatically.

MDX extras: `<Callout title="…">…</Callout>`, GFM tables. Drafts: `draft: true` hides a file in production (`SHOW_DRAFTS=1 npm run dev` shows them locally).

## Automated draft pipeline (human review required)

`.github/workflows/content-drafts.yml` runs on a schedule (news Mon/Wed/Fri, blog Tuesday) or manually:

1. `scripts/generate-drafts.mjs news` reads feeds from `content/sources.json`, ranks by keyword relevance, source weight and recency, skips URLs already covered, and writes `content/news/*.mdx` with `draft: true`, a summary, "Why it matters for Indian businesses", "Our take", "What to do this week" and the source citation.
2. `generate-drafts.mjs blog` picks the next `planned` topic from `content/calendar.json` and writes a draft (or an editor skeleton with the outline).
3. If `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL` are set, the model writes the text under strict rules (original wording, no invented facts). If not, you get an **editor skeleton** with `[[EDITOR]]` prompts and never any copied source text.
4. The workflow runs a full build (drafts are excluded) and opens a **pull request** labelled `needs-human-review` with a reviewer checklist.
5. A person edits, verifies facts, removes `draft: true` (and adds `reviewed:` for blog) and merges. **Nothing auto-publishes.**

Setup: Settings → Actions → General → allow Actions to create pull requests. Test locally: `node scripts/generate-drafts.mjs news --dry-run`. Feed URLs in `sources.json` could not be verified from the build sandbox. Run the dry run once from your machine and prune dead ones (failing feeds are skipped, never fatal).

Content plan: `content/calendar.json` → `docs/content-calendar.md` (30 blog topics, 30 news angles, mapped to your target keywords). `npm run calendar` regenerates the markdown.

## Quality gates

| Command | What it does |
|---|---|
| `npm run lint` | TypeScript type check |
| `npm run check:content` | Content rules above (runs as `prebuild`) |
| `node scripts/audit-seo.mjs http://localhost:3000` | Crawls every sitemap URL: status, H1 count, title/description length, canonical, og:image, alt/size, JSON-LD parse, broken internal links |
| `node scripts/smoke.mjs http://localhost:3000` | Headless browser: console errors, palette, theme, no-JS, reduced motion |
| `npm run lighthouse` | Mobile Lighthouse on 4 pages (set `CHROME_PATH` if needed) |

CI (`.github/workflows/ci.yml`) runs type check, content check, build and the SEO audit on every PR.

## Lead capture

- **Contact form** (`/contact`, `components/ContactForm.tsx`): zod validation server-side, honeypot, minimum-time trap, per-IP rate limit, optional Turnstile, email via Resend with reply-to set to the sender, success state. Every page has a "Book a consultation" CTA and a WhatsApp link (floating button + CTA block).
- **Newsletter** (footer, home, blog): double opt-in with HMAC-signed 48-hour links, no database needed.
- **Analytics events:** `cta_click` (with `label`) and `form_submit` via `data-track` attributes, sent only after consent.

## Docs

- `docs/seo-checklist.md`: implemented vs manual (Search Console, Google Business Profile, backlinks)
- `docs/lighthouse-report.md`: scores, fixes applied, accessibility notes
- `docs/content-calendar.md`: 30 + 30 plan
