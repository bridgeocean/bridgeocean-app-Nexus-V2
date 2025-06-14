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
  // Use export mode to completely bypass server-side features and build tracing
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  // Disable all experimental features
  experimental: {},
  // Completely disable webpack optimizations that cause issues
  webpack: (config, { dev, isServer }) => {
    // Disable all caching and optimization
    config.cache = false;
    config.optimization = false;
    
    // Disable file watching
    config.watchOptions = {
      ignored: /node_modules/,
    };
    
    return config;
  },
  // Disable all Next.js optimizations
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
}

export default nextConfig
