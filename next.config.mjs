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
  // Disable all build optimizations that cause stack overflow
  experimental: {
    outputFileTracingRoot: undefined,
    outputFileTracing: false,
    // Disable other experimental features that might cause issues
    serverComponentsExternalPackages: [],
  },
  // Force standalone output to avoid tracing issues
  output: 'standalone',
  // Disable webpack optimizations
  webpack: (config, { isServer }) => {
    // Disable file system caching
    config.cache = false;
    
    // Reduce optimization level
    if (config.optimization) {
      config.optimization.minimize = false;
      config.optimization.splitChunks = false;
    }
    
    return config;
  },
  // Disable SWC minification
  swcMinify: false,
  // Disable static optimization
  trailingSlash: false,
  // Disable build-time optimizations
  compiler: {
    removeConsole: false,
  },
}

export default nextConfig
