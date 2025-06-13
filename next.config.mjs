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
  // Force export mode to completely bypass build tracing
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  // Disable all experimental features
  experimental: {},
  // Completely disable webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Disable all caching
    config.cache = false;
    
    // Disable optimization entirely
    config.optimization = {
      minimize: false,
      splitChunks: false,
      runtimeChunk: false,
    };
    
    // Disable file system watching
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
  // Disable static optimization
  generateBuildId: () => 'build',
}

export default nextConfig
