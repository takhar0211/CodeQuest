import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CodeQuest — Learn languages like a chieftain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#160844",
          backgroundImage: "linear-gradient(to bottom, #160844, #241407)",
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 20 }}>⚔</div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#ffd66b",
            textShadow: "0 4px 0 #241407",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          CodeQuest
        </h1>
        <p
          style={{
            fontSize: 36,
            color: "#fbf3dd",
            textAlign: "center",
            marginTop: 20,
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Learn a new programming language like a chieftain.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
