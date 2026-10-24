# Illustration system

Original, hand-authored isometric SVG scenes: rounded ceramic blocks and frosted-glass planes, one light source (top-left), consistent 2 px rounded strokes. No stock art, no third-party characters or logos.

## Files

| File | Purpose |
|---|---|
| `parts.tsx` | Isometric toolkit (`P` projection, `Box`, `Plane`, `Shadow`, `Platform`) and reusable pieces (`Shield`, `Node`, `Person`, `Cloud`, `Gear`, `Megaphone`, …), plus the `Svg` wrapper that handles size and accessibility |
| `scenes.tsx` | Finished scenes: hero, 8 service signatures, process icons, accents, empty / 404 / mail / contact, success mark, category covers |
| `Illustration.tsx` | `<Illustration name="…" />` and the `registry` |
| `/design/illustrations` | Internal, `noindex` style guide listing every registered scene in the current theme |
| `scripts/build-illustrations.tsx` | `npm run illos`: size + a11y checks, SVGO measurement, flattens covers to `/public/covers/*.svg` for `next/og` |

## Using one

```tsx
<Illustration name="shield" className="h-auto w-full max-w-[420px]" />                 // decorative: aria-hidden
<Illustration name="shield" title="Shield with scan beam" desc="…" />                  // meaningful: role=img + <title>/<desc>
```

Above the fold (hero, service-page header) render normally. Below the fold add `className="lazy-art"` (CSS `content-visibility: auto`) and keep explicit `width`/`height` (the `Svg` wrapper always sets them) so layout never shifts.

## Adding a scene

1. In `scenes.tsx`, compose parts inside `<Svg w={400} h={320} id="il-yourname" {...p}>`. Place iso objects inside `<g transform="translate(ox oy)">` (cell units: x runs right-down, y left-down, z up; 1 unit = 26 px). Always start with `<Platform />` for consistency, then objects, then floating nodes and links.
2. Colour only with tokens: `var(--il-w1…3)` white, `y` yellow, `k` black, and the accent tones `c` cyan, `v` violet, `m` mint, `i` ice. Faces: 1 = top (lit), 2 = left, 3 = right (shadow). The tokens are defined for light and "Frosted Night" in `app/globals.css`. Never hard-code hex values in a scene.
3. Use presentation attributes (`stroke`, `fill`), not CSS classes, for anything visual. Classes are only for motion (`il-float`, `il-pulse`, `il-scan`, `il-pop`, `il-ring`), which animate `transform` and `opacity` only and switch off under `prefers-reduced-motion`.
4. Register it in `Illustration.tsx` and run `npm run illos`. It fails if a scene is 15 KB or larger or lacks `aria-hidden` / `role="img"` + `<title>`.
5. Open `/design/illustrations` in both themes and check it.

## Category covers

`CoverScene` is one template with a swappable glyph per category (AI, Cybersecurity, Software, Hiring, Compliance). The same component renders inline on posts and cards (themed) and, flattened with light-theme colours, into `/public/covers/<category>.svg`, which `lib/og.tsx` embeds in the generated OG images, so cards, posts and social previews match. To add a category, add a case to `Glyph` and an entry to `coverCategories`.
