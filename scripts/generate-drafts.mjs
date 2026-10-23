#!/usr/bin/env node
/**
 * Draft generator for the news and blog pipeline. NOTHING here publishes.
 * Every file is written with `draft: true`; the GitHub Action opens a pull request
 * and a human edits, fact-checks, and removes `draft: true` to publish.
 *
 *   node scripts/generate-drafts.mjs news [--dry-run] [--limit=3]
 *   node scripts/generate-drafts.mjs blog [--dry-run]
 *
 * LLM drafting is optional: set ANTHROPIC_API_KEY and ANTHROPIC_MODEL. Without them the script
 * writes an editor skeleton (headings + prompts) and never copies source text.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const [, , kind = "news", ...flags] = process.argv;
const dry = flags.includes("--dry-run");
const limit = Number((flags.find((f) => f.startsWith("--limit=")) ?? "").split("=")[1]) || undefined;
const root = process.cwd();
const content = (p) => path.join(root, "content", p);
const today = new Date().toISOString().slice(0, 10);
const sources = JSON.parse(fs.readFileSync(process.env.SOURCES_FILE ?? content("sources.json"), "utf8"));
const calendar = JSON.parse(fs.readFileSync(content("calendar.json"), "utf8"));
const serviceSlugs = fs.readdirSync(content("services")).map((f) => f.replace(/\.mdx$/, ""));

const slugify = (s) => {
  const full = s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return full.length <= 70 ? full : full.slice(0, 70).replace(/-[^-]*$/, "");
};
const yamlStr = (s) => JSON.stringify(String(s));

// ---------- LLM (optional) ----------
const llmReady = Boolean(process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_MODEL);
async function llm(system, user, maxTokens) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL, max_tokens: maxTokens, system, messages: [{ role: "user", content: user }] }),
  });
  if (!res.ok) throw new Error(`LLM ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const j = await res.json();
  return j.content?.map((c) => c.text ?? "").join("") ?? "";
}
const parseJson = (t) => {
  const m = /\{[\s\S]*\}/.exec(t);
  if (!m) throw new Error("no JSON in LLM output");
  return JSON.parse(m[0]);
};
const VOICE = `You write for Eject Solutions, a Hyderabad software, cybersecurity and AI company. Voice: specific, plain, practical, no hype, no filler. Never invent facts, statistics, quotes, client names, awards or certifications. Never copy sentences from sources; paraphrase and add original analysis. Use only facts present in the material you are given. If a fact is uncertain, say so.`;

// ---------- RSS ----------
const decode = (s = "") => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const tag = (block, name) => decode(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i").exec(block)?.[1] ?? "");
function parseFeed(xml, feed) {
  const items = [];
  for (const m of xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/gi)) {
    const b = m[0];
    const link = /<link[^>]*href="([^"]+)"/i.exec(b)?.[1] ?? tag(b, "link");
    const date = new Date(tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || tag(b, "dc:date"));
    items.push({ title: tag(b, "title"), link, date: isNaN(date) ? null : date, summary: (tag(b, "description") || tag(b, "summary") || tag(b, "content")).slice(0, 600), source: feed.name, weight: feed.weight ?? 1 });
  }
  return items;
}
async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, { signal: AbortSignal.timeout(15000), headers: { "user-agent": "EjectContentBot/1.0 (+https://ejectsolutions.com)" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return parseFeed(await res.text(), feed);
  } catch (e) {
    console.warn(`  skip ${feed.name}: ${e.message}`);
    return [];
  }
}
function score(item) {
  const text = `${item.title} ${item.summary}`.toLowerCase();
  let s = 0;
  for (const [k, w] of Object.entries(sources.keywords)) if (text.includes(k)) s += w;
  const ageDays = item.date ? (Date.now() - item.date) / 864e5 : 7;
  return (s + 0.5) * item.weight * Math.exp(-ageDays / 5);
}
const existingSourceUrls = () => {
  const set = new Set();
  for (const dir of ["news"]) for (const f of fs.readdirSync(content(dir))) {
    const { data } = matter(fs.readFileSync(path.join(content(dir), f), "utf8"));
    if (data.source?.url) set.add(data.source.url.replace(/\/$/, ""));
  }
  return set;
};

const reviewerChecklist = `<!-- EDITOR CHECKLIST (delete before publishing)
- [ ] Facts verified against the source; no claim without a source
- [ ] Wording is ours; nothing lifted from the source
- [ ] Commentary adds something a reader cannot get from the source
- [ ] Title < 60 chars, description < 155 chars
- [ ] services:/tags:/category: correct; links work
- [ ] Remove \`draft: true\` (and set \`reviewed:\` for blog) to publish
-->`;

// ---------- NEWS ----------
async function news() {
  const max = limit ?? sources.newsPerRun ?? 3;
  console.log(`Fetching ${sources.feeds.length} feeds…`);
  const all = (await Promise.all(sources.feeds.map(fetchFeed))).flat();
  const seen = existingSourceUrls();
  const cutoff = Date.now() - (sources.maxAgeDays ?? 7) * 864e5;
  const ranked = all
    .filter((i) => i.title && i.link && (!i.date || i.date >= cutoff) && !seen.has(i.link.replace(/\/$/, "")))
    .map((i) => ({ ...i, score: score(i) }))
    .filter((i) => i.score > 1)
    .sort((a, b) => b.score - a.score);
  // de-dup near-identical titles from different feeds
  const picked = [];
  for (const r of ranked) {
    const key = slugify(r.title).split("-").slice(0, 6).join("-");
    if (!picked.some((p) => slugify(p.title).split("-").slice(0, 6).join("-") === key)) picked.push(r);
    if (picked.length >= max) break;
  }
  console.log(`Ranked ${ranked.length}, drafting ${picked.length}`);
  const written = [];
  for (const item of picked) {
    let fm = { title: item.title, description: "", category: "Cybersecurity", tags: [], services: [] };
    let body;
    if (llmReady) {
      try {
        const out = parseJson(await llm(
          `${VOICE}\nReturn ONLY JSON: {"title": string (<60 chars, our own headline), "description": string (<155 chars), "category": "AI"|"Cybersecurity"|"Software"|"Hiring"|"Compliance", "tags": string[] (max 4), "services": string[] (subset of: ${serviceSlugs.join(", ")}), "body": string}. Body is markdown, 150-250 words, in four short parts in this order: a plain summary in our own words (no direct quotes), a paragraph starting "**Why it matters for Indian businesses.**", a paragraph starting "**Our take.**", and a paragraph starting "**What to do this week.**". No H1/H2 headings. Do not mention you are an AI.`,
          `Source: ${item.source}\nHeadline: ${item.title}\nPublished: ${item.date?.toISOString().slice(0, 10) ?? "unknown"}\nExcerpt (for understanding only, do not copy): ${item.summary}\nURL: ${item.link}`,
          1200));
        fm = { ...fm, ...out };
        body = out.body;
      } catch (e) {
        console.warn(`  LLM failed for "${item.title}": ${e.message}; writing skeleton`);
      }
    }
    if (!body) {
      fm.description = "[[EDITOR: write a <155 char description]]";
      body = `[[EDITOR: summarise the story in your own words, 2-3 sentences. Source headline: "${item.title}". Do not reuse the source's phrasing.]]

**Why it matters for Indian businesses.** [[EDITOR]]

**Our take.** [[EDITOR: original analysis; what would a mid-size Hyderabad company get wrong here?]]

**What to do this week.** [[EDITOR: 2-3 concrete actions; link a relevant service page]]`;
    }
    const slug = slugify(fm.title);
    const file = content(`news/${slug}.mdx`);
    const front = [
      "---",
      `title: ${yamlStr(fm.title)}`,
      `description: ${yamlStr(fm.description)}`,
      `date: ${today}`,
      "author: eject-editorial",
      `category: ${fm.category}`,
      `tags: ${JSON.stringify(fm.tags ?? [])}`,
      `services: ${JSON.stringify((fm.services ?? []).filter((s) => serviceSlugs.includes(s)))}`,
      "draft: true",
      "source:",
      `  name: ${yamlStr(item.source)}`,
      `  url: ${yamlStr(item.link)}`,
      "---",
    ].join("\n");
    const text = `${front}\n${reviewerChecklist}\n\n${body}\n\n*We summarise in our own words. Read the original at the source link.*\n`;
    console.log(`${dry ? "[dry] " : ""}news/${slug}.mdx  (score ${item.score.toFixed(1)}, ${item.source})`);
    if (!dry) { fs.writeFileSync(file, text); written.push(file); }
  }
  return written;
}

// ---------- BLOG ----------
async function blog() {
  const item = calendar.blog.find((b) => b.status === "planned");
  if (!item) return console.log("No planned blog topics left. Add more to content/calendar.json");
  const slug = slugify(item.title);
  const outline = (item.outline ?? []).map((o) => `- ${o}`).join("\n");
  let body;
  let description = "[[EDITOR: write a <155 char description]]";
  if (llmReady) {
    try {
      const out = parseJson(await llm(
        `${VOICE}\nReturn ONLY JSON: {"description": string (<155 chars), "faq": [{"q": string, "a": string}] (4 items), "body": string}. Body: 1,300-1,800 words of markdown using ## and ### headings only (no H1), with a short intro, practical sections following the outline, at least one table or checklist, a section on common mistakes, and a closing section with next steps. Where you reference our services, link like [text](/services/<slug>) using only these slugs: ${serviceSlugs.join(", ")}. Mark any regulation-specific claim you are not certain of with [[VERIFY]]. Do not invent statistics, prices, client examples or case studies.`,
        `Title: ${item.title}\nTarget keyword: ${item.keyword}\nCategory: ${item.category}\nOutline:\n${outline}`,
        6000));
      body = out.body;
      description = out.description;
      item.faq = out.faq;
    } catch (e) {
      console.warn(`LLM failed: ${e.message}; writing skeleton`);
    }
  }
  if (!body) {
    body = `[[EDITOR: write a 100-word intro that states who this is for and what they will be able to do afterwards. Target keyword: "${item.keyword}".]]\n\n${(item.outline ?? []).map((o) => `## ${o}\n\n[[EDITOR: 200-300 words]]`).join("\n\n")}\n\n## Common mistakes\n\n[[EDITOR]]\n\n## Next steps\n\n[[EDITOR: link the relevant service page and /contact]]`;
  }
  const front = [
    "---",
    `title: ${yamlStr(item.title)}`,
    `description: ${yamlStr(description)}`,
    `date: ${today}`,
    "author: eject-editorial",
    `category: ${item.category}`,
    `tags: ${JSON.stringify([item.keyword])}`,
    `services: ${JSON.stringify(item.services ?? [])}`,
    "draft: true",
    ...(item.faq ? ["faq:", ...item.faq.flatMap((f) => [`  - q: ${yamlStr(f.q)}`, `    a: ${yamlStr(f.a)}`])] : []),
    "---",
  ].join("\n");
  console.log(`${dry ? "[dry] " : ""}blog/${slug}.mdx  (${item.keyword})`);
  if (dry) return;
  fs.writeFileSync(content(`blog/${slug}.mdx`), `${front}\n${reviewerChecklist}\n\n${body}\n`);
  item.status = "drafted";
  item.slug = slug;
  fs.writeFileSync(content("calendar.json"), JSON.stringify(calendar, null, 2) + "\n");
}

if (kind === "news") await news();
else if (kind === "blog") await blog();
else { console.error("usage: generate-drafts.mjs news|blog [--dry-run]"); process.exit(1); }
