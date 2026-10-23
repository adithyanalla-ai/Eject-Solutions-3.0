# SEO checklist

Legend: ✅ implemented in code · 🧑 you must do this · ⚠️ needs your input.

## 1. Technical SEO (implemented)

| Item | Status | Where |
|---|---|---|
| Unique `<title>` < 60 chars, meta description < 155 per page | ✅ | `lib/seo.ts` (`buildMetadata`), enforced by `scripts/check-content.mjs` and `scripts/audit-seo.mjs` |
| Canonical URLs | ✅ | every page, via `buildMetadata` |
| Open Graph + Twitter cards | ✅ | `lib/seo.ts` |
| Generated OG/Twitter images (`next/og`) | ✅ | `app/opengraph-image.tsx`, `app/**/[slug]/opengraph-image.tsx` + `twitter-image.tsx` |
| Semantic HTML, one H1, ordered headings, alt text | ✅ | templates; verified by audit script |
| `sitemap.xml` with `lastmod` for every page | ✅ | `app/sitemap.ts` (placeholder case studies excluded) |
| `robots.txt` | ✅ | `app/robots.ts` (blocks `/api/`, `/search`, `/newsletter/`) |
| RSS | ✅ | `/rss.xml` (blog + news, latest 40) |
| Breadcrumbs + `BreadcrumbList` JSON-LD | ✅ | `components/Breadcrumbs.tsx` |
| JSON-LD: `Organization`, `WebSite` + `SearchAction`, `ProfessionalService` (address, geo, hours) | ✅ | home + contact; `lib/schema.ts` |
| JSON-LD: `Service` on every service page | ✅ | `app/services/[slug]` |
| JSON-LD: `BlogPosting` / `NewsArticle`, `Person` for authors, `FAQPage` where FAQs exist | ✅ | blog/news/author/service/industry pages |
| 301 redirect map | ✅ | `redirects.json` (explicit 301 status) |
| Scheduled publishing (future-dated posts stay hidden) + hourly ISR on blog/news | ✅ | `lib/content.ts`, `revalidate = 3600` |
| Internal linking: service ↔ posts ↔ industries; blog category hubs | ✅ | related blocks on every template |
| Minimal JS, no render-blocking third-party scripts, font preload, consent-gated GA4 | ✅ | see `docs/lighthouse-report.md` |
| Local copy ("… in Hyderabad" sections), lazy Google Map | ✅ | service pages, home, contact |
| Verification meta tags for GSC and Bing | ✅ | set `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION` |
| Event tracking for CTA clicks and form submits (consent-aware) | ✅ | `data-track` attributes + `lib/analytics.ts` |
| Placeholder pages `noindex` and out of sitemap | ✅ | case-study template |

**Validate yourself (cannot be done from the build sandbox):**
- 🧑 Run each page type through Google's [Rich Results Test](https://search.google.com/test/rich-results): home, a service, a blog post, a news item, an author page. JSON-LD parses as valid JSON on all 40 URLs (`audit-seo.mjs`), but only Google's tool confirms eligibility.
- 🧑 Run the [Schema Markup Validator](https://validator.schema.org/) on the home page (`ProfessionalService` and `Organization`).
- 🧑 Run PageSpeed Insights on production after launch for field data.

## 2. Content and E-E-A-T

| Item | Status |
|---|---|
| Company registration (CIN U62099TS2023PTC175197), address, email on About, Contact, footer | ✅ |
| Privacy policy and terms | ✅ draft. ⚠️ **have counsel review**, and name the grievance officer |
| Sources cited on every news item, our own commentary, no copied text | ✅ enforced by `check-content` (source URL required) |
| Author pages with `Person` schema | ✅ but ⚠️ **replace the team profile with real, named people** |
| No fabricated stats, clients, certifications or testimonials | ✅ all unknowns are `[[CONFIRM: …]]` or `[[PLACEHOLDER]]` markers |
| Blog "last reviewed" date | ⚠️ seed posts have none. Add `reviewed:` after a human signs off (check script warns) |

Find every unresolved marker: `grep -rn "CONFIRM\|PLACEHOLDER" app content lib docs`.

## 3. Launch tasks you must do manually

### Search Console and Bing
1. 🧑 Add `https://ejectsolutions.com` as a **Domain property** in Google Search Console (DNS TXT verification is best) or paste the meta token into `NEXT_PUBLIC_GSC_VERIFICATION`.
2. 🧑 Submit `https://ejectsolutions.com/sitemap.xml`. Use URL Inspection → Request indexing on the home page, each service page and the 5 blog posts.
3. 🧑 Bing Webmaster Tools: import from Search Console, or paste `NEXT_PUBLIC_BING_VERIFICATION`. Submit the sitemap.
4. 🧑 After launch, check the **Redirects**: crawl the old site's URL list (from Search Console → Pages, or the old sitemap) and add every old URL to `redirects.json` that is not already covered.
5. 🧑 Keep the old domain's redirects live for at least 12 months.

### Analytics
6. 🧑 Create a GA4 property, set `NEXT_PUBLIC_GA4_ID`. Link GA4 ↔ Search Console. Mark `form_submit` as a key event. `cta_click` events carry a `label` parameter (register it as a custom dimension).

### Google Business Profile (GBP) checklist
- 🧑 Claim/verify the profile for **Eject Solutions Pvt Ltd**, Kukatpally, Hyderabad 500072 (video or postcard verification).
- 🧑 Primary category: *Software company* (or *IT services*); add secondary: *Computer security service*, *Employment agency* (only if you want recruitment leads shown locally), *Marketing agency*, *Training centre* as truthful.
- 🧑 Name must match the legal/brand name exactly. NAP (name, address, phone) must match the site footer, contact page and schema. ⚠️ **Set `NEXT_PUBLIC_PHONE`** (not provided).
- 🧑 Set hours (site schema says Mon to Fri 09:30 to 18:30: ⚠️ confirm) and service area (Hyderabad, Secunderabad, India).
- 🧑 Add services with descriptions that mirror the 9 service pages, link to each service URL.
- 🧑 Upload real photos: office exterior and interior, team, logo, cover.
- 🧑 Add the website URL with UTM (`?utm_source=gbp&utm_medium=organic`), WhatsApp / messaging, and the booking link `/contact`.
- 🧑 Post an update weekly (reuse blog and news items); answer Q&A; ask real clients for reviews with a direct review link, **never buy reviews**.
- 🧑 Update `site.geo` in `lib/site.ts` with the exact pin from your profile.

### Citations and directories (NAP consistency)
- 🧑 LinkedIn company page, Clutch, GoodFirms, Crunchbase, Justdial, Sulekha, IndiaMART (if relevant), Telangana startup or industry bodies, NASSCOM or HYSEA if you are a member. Add profile URLs to `site.sameAs` in `lib/site.ts`; they flow into `Organization` schema.

### Backlinks (earned, not bought)
- 🧑 Publish your own research: e.g. an anonymised "what we found in 50 web pen tests" piece **only when real data exists**.
- 🧑 Guest posts and talks at Hyderabad meetups (OWASP Hyderabad, cloud/AI user groups), speaker pages link back.
- 🧑 Contribute open-source tools or checklists; host them on GitHub with a link to the matching guide.
- 🧑 Get listed in relevant partner or vendor directories (cloud providers' partner listings if you qualify).
- 🧑 Pitch commentary to Indian tech and security outlets using the news items as hooks.
- 🧑 Never buy links or use link farms (Google spam policies).

## 4. Ongoing

- Weekly: review the drafts PR, publish only what a human has verified.
- Monthly: Search Console → Performance for queries ranking 8 to 20 → refresh those posts (set `updated:` in frontmatter so `lastmod` changes).
- Quarterly: re-run `npm run lighthouse`, `scripts/audit-seo.mjs`, and review Core Web Vitals field data.
- Keep the old-site claims out (**"120+ projects, 98% retention, 5+ years"**) until you can document them. When you can, add them in `app/page.tsx` (the `[[CONFIRM]]` comment marks the spot) and in Organization schema if appropriate.

## 5. Trust elements waiting on your confirmation

- `content/trust.json`: certification/partner pills on the home page render **only** when you add verified items (with a proof link). Empty today: `[[CONFIRM]]`.
- `content/testimonials.json`: testimonial carousel renders only when real, permissioned quotes exist. Empty today: `[[CONFIRM]]`.
- `app/page.tsx`: the stat strip shows only structural facts (9 service lines, 3 disciplines, 4 industries, 1 partner). Replace or extend with verified delivery metrics when documented.
