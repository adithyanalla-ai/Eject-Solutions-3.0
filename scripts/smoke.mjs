// Browser smoke test: console errors, no-JS rendering, reduced motion, palette, theme toggle.
// Usage: npm start (other terminal); node scripts/smoke.mjs http://localhost:3000
import { chromium } from "playwright-core";
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const exe = process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch({ executablePath: exe, args: ["--no-sandbox"] });
let bad = 0;
const check = (ok, msg) => { console.log(`${ok ? "✓" : "✗"} ${msg}`); if (!ok) bad++; };

// 1. console errors across key pages (JS on)
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const errors = [];
  for (const p of ["/", "/services/vapt-penetration-testing", "/blog/rag-chatbot-development-guide", "/news/nist-ai-rmf-practical-starting-points", "/contact", "/404-nope"]) {
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && !/404/.test(m.text()) && errors.push(`${p}: ${m.text()}`));
    page.on("pageerror", (e) => errors.push(`${p}: ${e.message}`));
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.close();
  }
  check(errors.length === 0, `no console/page errors${errors.length ? ": " + errors.join(" | ") : ""}`);

  // Palette + theme on desktop
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Control+k");
  await page.waitForSelector("dialog[open] input");
  await page.fill("dialog[open] input", "vapt");
  await page.waitForTimeout(300);
  await page.keyboard.press("Enter");
  await page.waitForURL(/\/services\/vapt/, { timeout: 5000 }).then(() => check(true, "Ctrl+K palette navigates to VAPT page"), () => check(false, "palette navigation"));
  const before = await page.getAttribute("html", "data-theme");
  await page.click('button[aria-label="Toggle light and dark theme"]');
  const after = await page.getAttribute("html", "data-theme");
  check(before === "dark" && after === "light", `theme toggle ${before} → ${after}`);
  await page.screenshot({ path: process.env.SHOT_DIR ? `${process.env.SHOT_DIR}/service-light.png` : "/dev/null" }).catch(() => {});
  await ctx.close();
}

// 2. JavaScript disabled: everything readable
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "load" });
  const hidden = await page.$$eval(".reveal", (els) => els.filter((e) => getComputedStyle(e).opacity === "0").length);
  check(hidden === 0, `no-JS: no reveal elements hidden (${hidden})`);
  check(await page.isVisible("h1"), "no-JS: H1 visible");
  const counters = await page.$$eval("dd", (els) => els.map((e) => e.textContent).join(","));
  check(counters === "9,3,4,1", `no-JS: counters show final values (${counters})`);
  await ctx.close();
}

// 3. Reduced motion
{
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const anim = await page.$eval(".orbit-a", (e) => getComputedStyle(e).animationName);
  const hidden = await page.$$eval(".reveal", (els) => els.filter((e) => getComputedStyle(e).opacity === "0").length);
  check(anim === "none" && hidden === 0, `reduced motion: hero animation=${anim}, hidden reveals=${hidden}`);
  await ctx.close();
}
await browser.close();
process.exit(bad ? 1 : 0);
