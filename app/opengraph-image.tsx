import { ImageResponse } from "next/og";

export const alt = "Alan Figueredo — Full-stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f2efe7", color: "#151715" }}>
      <div style={{ display: "flex", fontSize: 32, color: "#194cff" }}>AF.</div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontFamily: "serif", fontSize: 92, lineHeight: 1 }}>Alan Figueredo</div><div style={{ fontSize: 32, marginTop: 22 }}>Full-stack developer · Málaga</div></div>
      <div style={{ display: "flex", width: "100%", height: 8, background: "#194cff" }} />
    </div>, { ...size },
  );
}
