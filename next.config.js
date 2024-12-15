/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true, // Comment to fix nextjs send double request
	images: {
		// TODO: Handle when file miss match or no existing file
		// formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.com',
				pathname: '**',
			},
		],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			// This is the asset module.
			type: 'asset/source',
		});
		return config;
	},
};

module.exports = nextConfig;
