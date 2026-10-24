/**
 * Illustration build + QA (run with: npm run illos).
 *  1. Flattens each category cover to /public/covers/<category>.svg with literal light-theme colours
 *     (used by next/og, which cannot read CSS variables).
 *  2. Checks every registered illustration: < 15 KB, decorative = aria-hidden, meaningful = role=img + <title>.
 *  3. Runs SVGO over each as a measurement, to flag scenes with avoidable bloat.
 */
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { optimize } from "svgo";
import { createElement } from "react";
import { registry } from "../components/illustrations/Illustration";
import { CoverScene, coverCategories } from "../components/illustrations/scenes";

const root = process.cwd();
const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");
const light = css.slice(css.indexOf(":root, :root[data-theme=\"light\"] {", css.indexOf("Illustration tokens")));
const block = light.slice(0, light.indexOf("}"));
const vars = Object.fromEntries([...block.matchAll(/(--il-[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const flatten = (svg: string) => svg.replace(/var\((--il-[\w-]+)\)/g, (_, k) => vars[k] ?? "#000");

let failed = false;
console.log("illustration".padEnd(24), "bytes".padStart(7), "svgo saves", " a11y");
for (const [name, Scene] of Object.entries(registry)) {
  const svg = renderToStaticMarkup(createElement(Scene as never, name === "success" ? {} : {}));
  const bytes = Buffer.byteLength(svg);
  const opt = optimize(flatten(svg), { multipass: true });
  const saved = Math.max(0, Math.round((1 - Buffer.byteLength(opt.data) / Buffer.byteLength(flatten(svg))) * 100));
  const decorative = /aria-hidden="true"/.test(svg);
  const meaningful = /role="img"/.test(svg) && /<title/.test(svg);
  const ok = bytes < 15000 && (decorative || meaningful);
  if (!ok) failed = true;
  console.log(name.padEnd(24), String(bytes).padStart(7), `${saved}%`.padStart(9), ` ${decorative ? "decorative" : meaningful ? "meaningful" : "MISSING"}${bytes >= 15000 ? "  TOO BIG" : ""}`);
}

fs.mkdirSync(path.join(root, "public/covers"), { recursive: true });
for (const f of fs.readdirSync(path.join(root, "public/covers"))) fs.unlinkSync(path.join(root, "public/covers", f));
for (const c of coverCategories) {
  const svg = flatten(renderToStaticMarkup(createElement(CoverScene, { category: c })));
  fs.writeFileSync(path.join(root, "public/covers", `${c.toLowerCase()}.svg`), svg);
}
fs.writeFileSync(path.join(root, "public/covers", "default.svg"), flatten(renderToStaticMarkup(createElement(CoverScene, { category: "AI" }))));
console.log(`\nWrote ${coverCategories.length + 1} cover SVGs to public/covers`);
process.exit(failed ? 1 : 0);
