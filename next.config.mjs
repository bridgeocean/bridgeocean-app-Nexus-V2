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
  // Completely disable output file tracing to avoid stack overflow
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
    outputFileTracing: false,
  },
  // Disable all optimizations that might cause issues
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
  // Disable static optimization for problematic pages
  async rewrites() {
    return []
  },
}

export default nextConfig
