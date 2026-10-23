// Renders content/calendar.json into docs/content-calendar.md
import fs from "node:fs";
const cal = JSON.parse(fs.readFileSync("content/calendar.json", "utf8"));
let md = `# Content calendar\n\n> Generated from \`content/calendar.json\` by \`npm run calendar\`. Edit the JSON, not this file.\n\n**Cadence:** news 3 draft PRs per week (Mon/Wed/Fri), blog 1 draft PR per week (Tue). Nothing publishes without human review.\n\n## 30 blog topics (evergreen guides, 1,200-2,000 words)\n\n| # | Status | Title | Target keyword | Category |\n|---|---|---|---|---|\n`;
for (const b of cal.blog) md += `| ${b.id} | ${b.status} | ${b.title} | ${b.keyword} | ${b.category} |\n`;
md += `\n## 30 news angles (150-300 words, original commentary + source link)\n\n| # | Angle | Target keyword | Category |\n|---|---|---|---|\n`;
for (const n of cal.news) md += `| ${n.id} | ${n.angle} | ${n.keyword} | ${n.category} |\n`;
md += `\n## Keyword coverage\n\nTarget keywords from the brief mapped to a service page and at least one calendar item: cybersecurity company Hyderabad (n01, n30), VAPT services Hyderabad (b01), penetration testing Hyderabad (b06), AI development company Hyderabad (b24), AI agent development India (b12), RAG chatbot development (b02, b15, b16), LLM security testing (b11), AI governance consulting India (b13), ISO 27001 consultants Hyderabad (b18), SOC 2 readiness India (b20), DPDP Act compliance (b03, b22, b23), IT recruitment Hyderabad (b04, b27), AI recruitment tools (b28), custom software development Hyderabad (b05, b25).\n`;
fs.writeFileSync("docs/content-calendar.md", md);
console.log("wrote docs/content-calendar.md");
