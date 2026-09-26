import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Alan Figueredo · Portfolio", short_name: "Alan Figueredo", description: "Full-stack developer portfolio", start_url: "/es", display: "standalone", background_color: "#f2efe7", theme_color: "#194cff", icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }] };
}
