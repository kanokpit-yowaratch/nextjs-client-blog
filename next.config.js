/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// TODO: Handle when file miss match or no existing file
		// formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: process.env.NEXT_PUBLIC_PROTOCOL,
				hostname: process.env.NEXT_PUBLIC_HOST_NAME,
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
