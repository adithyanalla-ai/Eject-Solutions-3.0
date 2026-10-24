import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

function coverUri(category?: string) {
  const file = path.join(process.cwd(), "public/covers", `${(category ?? "default").toLowerCase()}.svg`);
  const fallback = path.join(process.cwd(), "public/covers/default.svg");
  const svg = fs.readFileSync(fs.existsSync(file) ? file : fallback);
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

/** With a category, renders the light cover template (same illustration as the page) on the right. */
export function renderOg(title: string, kicker: string, category?: string) {
  if (category) {
    const sz = title.length > 70 ? 46 : title.length > 45 ? 54 : 64;
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: "#f7f6f1", color: "#0a0a0a", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverUri(category)} width={820} height={430} alt="" style={{ position: "absolute", right: -70, top: 150 }} />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: 700 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, letterSpacing: 5, textTransform: "uppercase" }}>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: "#facc15", border: "2px solid #0a0a0a", display: "flex" }} />
              {kicker}
            </div>
            <div style={{ fontSize: sz, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, display: "flex" }}>{title}</div>
            <div style={{ display: "flex", fontSize: 26, color: "#52525b" }}>EJECT. · Build it. Secure it. Automate it.</div>
          </div>
        </div>
      ),
      ogSize,
    );
  }
  const size = title.length > 70 ? 54 : title.length > 45 ? 64 : 76;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 72, color: "#fafaf5",
          backgroundColor: "#0a0a0a",
          backgroundImage: "radial-gradient(circle at 85% 10%, rgba(250,204,21,0.40), transparent 55%), radial-gradient(circle at 5% 90%, rgba(255,255,255,0.14), transparent 50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, letterSpacing: 6, color: "#facc15", textTransform: "uppercase" }}>
          <div style={{ width: 22, height: 22, borderRadius: 22, background: "#facc15", display: "flex" }} />
          {kicker}
        </div>
        <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, display: "flex" }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#b2b2aa" }}>
          <span>Eject Solutions</span>
          <span>Build it. Secure it. Automate it.</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
