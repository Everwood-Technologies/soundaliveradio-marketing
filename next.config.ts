import type { NextConfig } from "next";

// For GitHub Pages project sites: site is at https://<user>.github.io/<repo>/
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
