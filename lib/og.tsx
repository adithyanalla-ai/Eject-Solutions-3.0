import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOg(title: string, kicker: string) {
  const size = title.length > 70 ? 54 : title.length > 45 ? 64 : 76;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 72, color: "#e8eefa",
          backgroundColor: "#050914",
          backgroundImage: "radial-gradient(circle at 85% 10%, rgba(139,92,246,0.45), transparent 55%), radial-gradient(circle at 5% 90%, rgba(34,211,238,0.30), transparent 50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, letterSpacing: 6, color: "#22d3ee", textTransform: "uppercase" }}>
          <div style={{ width: 22, height: 22, borderRadius: 22, background: "#22d3ee", display: "flex" }} />
          {kicker}
        </div>
        <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, display: "flex" }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#a0afc8" }}>
          <span>Eject Solutions</span>
          <span>Build it. Secure it. Automate it.</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
