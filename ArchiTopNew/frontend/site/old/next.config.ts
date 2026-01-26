import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  images: {
    domains: [
      'localhost', // если работаешь локально
      'api.getrealt.ru', // домен API
      '127.0.0.1', // на случай локального теста
    ],
  },

  // Экспериментальные фичи
  experimental: {
    // ✅ Добавляем алиас для удобства импорта
    turbo: {
      resolveAlias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};

export default nextConfig;
