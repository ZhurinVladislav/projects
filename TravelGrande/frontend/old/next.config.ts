import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,

  images: {
    domains: ['api.builder.io'],
  },
  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },
};

export default nextConfig;
