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
  // Fix webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Disable caching
    config.cache = false;
    
    // Properly configure optimization as an object
    config.optimization = {
      minimize: false,
      splitChunks: false,
      runtimeChunk: false,
      sideEffects: false,
      usedExports: false,
      providedExports: false,
    };
    
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
