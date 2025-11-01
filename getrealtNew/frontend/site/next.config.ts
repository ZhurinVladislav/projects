// import type { NextConfig } from 'next';

// // const isProd = process.env.NODE_ENV === 'production';
// import path from 'path';

// const nextConfig: NextConfig = {
//   pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
//   reactStrictMode: true,

//   images: {
//     domains: ['localhost', '127.0.0.1', 'api.тест.рф', 'xn--80aab0ad2a7b.xn--p1ai'],
//   },

//   env: {
//     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
//     NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
//   },

//   // ⚙️ Новый способ: настройка Turbopack напрямую
//   // turbopack: {
//   //   rules: {
//   //     '*.svg': {
//   //       loaders: [
//   //         {
//   //           loader: '@svgr/webpack',
//   //           options: {
//   //             icon: true,
//   //           },
//   //         },
//   //       ],
//   //       as: '*.js',
//   //     },
//   //   },
//   // },

//   // experimental: {
//   //   turbo: {
//   //     resolveAlias: {
//   //       '@': path.resolve(__dirname, 'src'),
//   //     },
//   //   },
//   // },
//   // webpack(config) {
//   //   // Handle SVGs with @svgr/webpack
//   //   config.module.rules.push({
//   //     test: /\.svg$/i,
//   //     // Apply to all SVG imports (remove issuer restriction for now)
//   //     use: [
//   //       {
//   //         loader: '@svgr/webpack',
//   //         options: {
//   //           icon: true,
//   //           svgo: true,
//   //           svgoConfig: {
//   //             plugins: [
//   //               {
//   //                 name: 'preset-default',
//   //                 params: {
//   //                   overrides: {
//   //                     removeViewBox: false,
//   //                   },
//   //                 },
//   //               },
//   //             ],
//   //           },
//   //         },
//   //       },
//   //     ],
//   //   });

//   //   // Add alias for '@' to src directory
//   //   config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');

//   //   return config;
//   // },
// };

// export default nextConfig;

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
