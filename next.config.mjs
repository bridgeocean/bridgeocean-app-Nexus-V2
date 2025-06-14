/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Go back to regular build but with minimal features
  swcMinify: false,
  experimental: {
    outputFileTracingRoot: process.cwd(),
    outputFileTracing: false,
  },
  // Disable problematic features
  webpack: (config, { dev, isServer }) => {
    config.cache = false;
    config.optimization = {
      minimize: false,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
        },
      },
    };
    return config;
  },
}

export default nextConfig
