import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },
};

export default nextConfig;
