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
