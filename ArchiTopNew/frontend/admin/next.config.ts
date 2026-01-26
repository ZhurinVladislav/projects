// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
//   reactStrictMode: true,
//   env: {
//     NEXT_PUBLIC_API_URL: process.env.NEXT_ADMIN_URL,
//   },

//   images: {
//     domains: [
//       'localhost', // если работаешь локально
//       'api.getrealt.ru', // домен API
//       '127.0.0.1', // на случай локального теста
//     ],
//   },
//   experimental: {
//     optimizePackageImports: ['@material-ui/core'],
//     turbo: {
//       rules: {
//         '*.svg': {
//           loaders: ['@svgr/webpack'],
//           as: '*.js',
//         },
//       },
//     },
//   },

//   async rewrites() {
//     return [
//       // Локальная обработка /api/auth/update/:id
//       {
//         source: '/api/auth/update/:id',
//         destination: '/api/auth/update/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/pages-delete/:id
//       {
//         source: '/api/pages-delete/:id',
//         destination: '/api/pages-delete/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/show/:id
//       {
//         source: '/api/pages/show/:id',
//         destination: '/api/pages/show/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/update/:id
//       {
//         source: '/api/pages/update/:id',
//         destination: '/api/pages/update/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/categories-services/show/:id
//       {
//         source: '/api/categories-services/show/:id',
//         destination: '/api/categories-services/show/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/categories-services/update/:id
//       {
//         source: '/api/categories-services/update/:id',
//         destination: '/api/categories-services/update/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/categories-services/delete/:id
//       {
//         source: '/api/categories-services/delete/:id',
//         destination: '/api/categories-services/delete/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/services/delete/:id
//       {
//         source: '/api/services/show/:id',
//         destination: '/api/services/show/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/services/update/:id
//       {
//         source: '/api/services/update/:id',
//         destination: '/api/services/update/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/services/delete/:id
//       {
//         source: '/api/services/delete/:id',
//         destination: '/api/services/delete/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/companies/show/:id
//       {
//         source: '/api/companies/show/:id',
//         destination: '/api/companies/show/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/companies/update/:id
//       {
//         source: '/api/companies/update/:id',
//         destination: '/api/companies/update/:id', // Обрабатывается локальным route.ts
//       },
//       // Локальная обработка /api/companies/delete/:id
//       {
//         source: '/api/companies/delete/:id',
//         destination: '/api/companies/delete/:id', // Обрабатывается локальным route.ts
//       },
//       // Перенаправление остальных /api/* на NEXT_ADMIN_URL
//       {
//         source: '/api/:path*',
//         destination: `${process.env.NEXT_ADMIN_URL}/:path*`,
//       },
//     ];
//   },
// };

// export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_ADMIN_URL,
  },

  images: {
    domains: ['localhost', 'api.getrealt.ru', '127.0.0.1'],
  },

  // Исправлено: перемещено из experimental.turbo
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  experimental: {
    optimizePackageImports: ['@material-ui/core'],
  },

  async rewrites() {
    // Исправлено: проверяем наличие NEXT_ADMIN_URL
    const adminUrl = process.env.NEXT_ADMIN_URL;

    if (!adminUrl) {
      console.warn('NEXT_ADMIN_URL is not set, API rewrites will not work');
      return [];
    }

    return [
      // Локальная обработка /api/auth/update/:id
      {
        source: '/api/auth/update/:id',
        destination: '/api/auth/update/:id',
      },
      // Локальная обработка /api/pages-delete/:id
      {
        source: '/api/pages-delete/:id',
        destination: '/api/pages-delete/:id',
      },
      // Локальная обработка /api/pages/show/:id
      {
        source: '/api/pages/show/:id',
        destination: '/api/pages/show/:id',
      },
      // Локальная обработка /api/pages/update/:id
      {
        source: '/api/pages/update/:id',
        destination: '/api/pages/update/:id',
      },
      // Локальная обработка /api/categories-services/show/:id
      {
        source: '/api/categories-services/show/:id',
        destination: '/api/categories-services/show/:id',
      },
      // Локальная обработка /api/categories-services/update/:id
      {
        source: '/api/categories-services/update/:id',
        destination: '/api/categories-services/update/:id',
      },
      // Локальная обработка /api/categories-services/delete/:id
      {
        source: '/api/categories-services/delete/:id',
        destination: '/api/categories-services/delete/:id',
      },
      // Локальная обработка /api/services/show/:id
      {
        source: '/api/services/show/:id',
        destination: '/api/services/show/:id',
      },
      // Локальная обработка /api/services/update/:id
      {
        source: '/api/services/update/:id',
        destination: '/api/services/update/:id',
      },
      // Локальная обработка /api/services/delete/:id
      {
        source: '/api/services/delete/:id',
        destination: '/api/services/delete/:id',
      },
      // Локальная обработка /api/companies/show/:id
      {
        source: '/api/companies/show/:id',
        destination: '/api/companies/show/:id',
      },
      // Локальная обработка /api/companies/update/:id
      {
        source: '/api/companies/update/:id',
        destination: '/api/companies/update/:id',
      },
      // Локальная обработка /api/companies/delete/:id
      {
        source: '/api/companies/delete/:id',
        destination: '/api/companies/delete/:id',
      },
      // Перенаправление остальных /api/* на NEXT_ADMIN_URL
      {
        source: '/api/:path*',
        destination: `${adminUrl}/api/:path*`, // Исправлено: добавлен /api/ в destination
      },
    ];
  },
};

export default nextConfig;
