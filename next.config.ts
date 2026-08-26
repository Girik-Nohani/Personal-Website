import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
  // Some of Sanity Studio's dependencies (e.g. @sanity/sdk-react) ship
  // dist output containing untranspiled JSX. Turbopack handles this
  // automatically; classic webpack skips transpiling node_modules by
  // default for build speed, so it needs to be told explicitly which
  // packages to make an exception for.
  transpilePackages: ["@sanity/sdk-react"],
};

export default nextConfig;