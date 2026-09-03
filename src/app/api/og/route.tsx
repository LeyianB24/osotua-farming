import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get("title") || "Osotua Farming"
    const subtitle = searchParams.get("subtitle") || "Purebred Livestock & Artisanal Barn Store • Kajiado, Kenya"

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#1C1208",
            padding: "80px",
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(196, 136, 42, 0.25) 0%, transparent 60%)",
          }}
        >
          {/* Top Logo Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#C4882A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1C1208",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              O
            </div>
            <span
              style={{
                color: "#C4882A",
                fontSize: "20px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                fontWeight: 700,
                fontFamily: "sans-serif",
              }}
            >
              OSOTUA FARMING
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
            <div
              style={{
                color: "#FBF7F0",
                fontSize: "56px",
                lineHeight: 1.1,
                fontWeight: 400,
                fontFamily: "serif",
              }}
            >
              {title}
            </div>
            <div
              style={{
                color: "#D4C9B8",
                fontSize: "24px",
                lineHeight: 1.4,
                fontFamily: "sans-serif",
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Bottom Badge strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(196, 136, 42, 0.3)",
              width: "100%",
              color: "#C4882A",
              fontSize: "14px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            <span>Boran Cattle &bull; Boer Goats &bull; Sahiwal Dairy</span>
            <span style={{ marginLeft: "auto" }}>osotuafarming.co.ke</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    console.error("Failed to generate OG image", e)
    return new Response("Failed to generate the image", {
      status: 500,
    })
  }
}
