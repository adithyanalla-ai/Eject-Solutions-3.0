# Lighthouse and accessibility report

Run date: 23 Oct 2026. Lighthouse (mobile emulation, simulated slow-4G + 4x CPU throttle) against a **production build served locally** (`next build && next start`) in a shared cloud sandbox. Raw numbers: `docs/lighthouse-summary.json`. Re-run with `npm run lighthouse`.

## Scores (mobile)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home `/` | 98 | 100 | 100 | 100 | 2.2 s | 0 | 80 ms |
| Service `/services/vapt-penetration-testing` | 99 | 100 | 100 | 100 | 1.9 s | 0 | 110 ms |
| Blog post `/blog/vapt-services-hyderabad-what-to-expect` | 98 | 100 | 100 | 100 | 2.0 s | 0 | 100 ms |
| Contact `/contact` | 98 | 100 | 100 | 100 | 2.0 s | 0 | 120 ms |

Across ~5 runs the Performance score ranged 93 to 99 on these pages. Lab noise in a shared sandbox is about ±3 points and ±0.3 s LCP.

**All four categories are 95+ on every tested page. Targets met: CLS < 0.05 (0), Lighthouse 95+.**

**LCP is borderline against the < 2.0 s goal in the lab (1.9 to 2.3 s).** Lighthouse's simulated throttling is harsher than most real devices, and it is a *lab* number. The real Core Web Vitals target is judged on field data (CrUX) at the 75th percentile, which only exists after launch. Check Search Console → Core Web Vitals after ~28 days. INP cannot be measured in a lab run; the page ships ~103 kB shared JS, no third-party scripts and all handlers are tiny, so risk is low, but verify in field data.

## Fixes applied during the audit

| Finding | Fix |
|---|---|
| Home Performance 86, LCP 3.0 s on first run | Dropped the self-hosted Inter body font (48 kB) in favour of the system UI font stack. Headings keep self-hosted Space Grotesk (22 kB, preloaded, `font-display: swap`). |
| Mono font on the LCP critical path | Replaced the 40 kB variable JetBrains Mono with a 21 kB static 500-weight subset, `swap`, not preloaded. |
| Missing `og:image` on non-dynamic pages (found by `scripts/audit-seo.mjs`) | `buildMetadata` falls back to the site-wide generated OG image where a route has none of its own. |
| Author page title 74 chars | Shortened to `Author: <name>`. |
| `/newsletter/confirmed` rendered dynamically | Moved `searchParams` reading into a client component inside `<Suspense>`; page is now static. |
| `inlineCss` experiment | Tried Next's experimental CSS inlining: no measurable gain, larger HTML. Reverted. |

## What the numbers do not cover

- **Cookie banner and GA4** are only rendered when `NEXT_PUBLIC_GA4_ID` is set. The banner mounts after idle and is `position: fixed` so it cannot shift layout, but re-run Lighthouse after you configure GA4, since the gtag script loads (lazily, after consent) and can lower scores on pages where consent was granted.
- **Turnstile** (contact form) is lazy-loaded when a site key is configured. Re-test `/contact` with it enabled.
- **Google Maps iframe** on `/contact` is `loading="lazy"`. It is below the fold on mobile, but Lighthouse may flag third-party cookies from Google Maps on the contact page; that is the cost of an embedded map. If it hurts, replace it with a static map image linking to Google Maps.

## Accessibility (WCAG 2.2 AA)

Automated: Lighthouse (axe-core based) scores 100 on all four pages. Not automated, verified by design or by `scripts/smoke.mjs`:

- **Keyboard:** skip link, visible 3 px focus ring, native `<details>` mobile menu and FAQ, native `<dialog>` command palette with focus trap and Esc, arrow-key navigation inside the palette.
- **Contrast:** dark and light themes use separate colour tokens (light mode uses darker cyan and violet). Primary button text is navy on cyan (dark) and near-white on cyan-700 (light). Spot-check with a contrast tool after any palette change.
- **Targets:** buttons and inputs have a 44 px minimum height (WCAG 2.2 target size).
- **Motion:** `prefers-reduced-motion` disables hero orbit animation, counters and reveal transitions (verified in `scripts/smoke.mjs`).
- **No-JS:** content is visible without JavaScript; reveal hiding only applies after the inline script adds `html.js`; counters server-render final values.
- **Forms:** every input has a visible `<label>`, errors use `role="alert"`, honeypot is `aria-hidden` and `tabindex="-1"`.
- **Semantics:** one H1 per page, ordered headings, landmarks (`header`, `nav`, `main`, `footer`), breadcrumb `aria-current`.

**Still needs a human:** a screen-reader pass (NVDA or VoiceOver) on the contact form and command palette, and a 200% zoom / 320 px reflow check on long tables in blog posts (tables sit in a horizontal scroll wrapper).

## Other automated checks included

- `npm run check:content`: title < 60, description < 155, service ≥ 700 words and ≥ 5 FAQs, blog 1,200 to 2,000 words, news 150 to 300 words with a source URL, no H1 in bodies, no broken internal links.
- `node scripts/audit-seo.mjs <url>`: crawls every sitemap URL for status 200, one H1, title/description lengths, canonical, og:image, image alt/size attributes and valid JSON-LD. Result on this build: **40 of 40 URLs pass**.
- `node scripts/smoke.mjs <url>`: no console errors on 6 pages, palette navigation, theme toggle, no-JS, reduced motion. All pass.
