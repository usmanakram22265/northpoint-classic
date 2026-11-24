import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root: sibling client projects have their own lockfiles.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Development only: lets a phone on the same Wi-Fi open the dev server by
  // the Mac's network address. Without this, Next.js blocks its dev scripts
  // for any origin other than localhost.
  allowedDevOrigins: ["192.168.*.*", "172.20.10.*"],
  images: {
    // WebP only, at quality 85 (PHOTO_QUALITY in components/ui/Photo.tsx).
    formats: ["image/webp"],
    qualities: [85],
  },
};

export default nextConfig;
