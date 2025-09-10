import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Поддержка файлов .js, .jsx, .ts, .tsx, .mdx
	pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},

	// Экспериментальные фичи
	experimental: {
		optimizePackageImports: ['@material-ui/core'],
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.js',
				},
			},
		},
	},
};

export default nextConfig;
