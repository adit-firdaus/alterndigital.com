import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

function r2ImageHostname(): string | null {
  try {
    const u = process.env.R2_PUBLIC_URL;
    if (!u) return null;
    return new URL(u).hostname;
  } catch {
    return null;
  }
}

const r2Host = r2ImageHostname();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      ...(r2Host
        ? [{ protocol: "https" as const, hostname: r2Host, pathname: "/**" }]
        : []),
    ],
  },
};

export default withPayload(nextConfig);
