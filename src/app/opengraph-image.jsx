import { ImageResponse } from "next/og";

export const alt = "Nischal Dhungel — Full Stack Developer & Co-Founder";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "#0c0b10",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(91, 75, 255, 0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
          }}
        />

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #5b4bff, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              N
            </div>
            <span style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
              Nischal Dhungel
            </span>
          </div>

          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              padding: "8px 18px",
              borderRadius: "999px",
              background: "rgba(91, 75, 255, 0.15)",
              color: "#8b7bff",
              border: "1px solid rgba(91, 75, 255, 0.3)",
            }}
          >
            Available for Projects
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Full Stack Developer</span>
            <span
              style={{
                background: "linear-gradient(90deg, #5b4bff, #a855f7, #ec4899)",
                backgroundClip: "text",
                color: "#a855f7",
              }}
            >
              & Tech Co-Founder
            </span>
          </div>
          <p
            style={{
              fontSize: "22px",
              color: "#a0a0b2",
              maxWidth: "850px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Co-Founder at Garud Labs & Babal Cloud. Building fast, scalable, and high-performance web experiences with React, Next.js, and Node.js.
          </p>
        </div>

        {/* Bottom tags */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {["React", "Next.js", "Node.js", "Firebase", "Tailwind CSS", "Cloud Infrastructure"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#e2e2ea",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
