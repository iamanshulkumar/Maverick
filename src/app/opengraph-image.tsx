import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0b 0%, #18181b 50%, #09090b 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            }}
          />
          <span style={{ fontSize: 36, fontWeight: 700, color: "#fafafa", fontFamily: "system-ui" }}>
            {siteConfig.name}
          </span>
        </div>
        <span
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.4,
            fontFamily: "system-ui",
          }}
        >
          {siteConfig.title}
        </span>
      </div>
    ),
    { ...size },
  );
}
