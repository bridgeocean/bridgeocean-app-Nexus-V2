/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Reduce build complexity
  experimental: {
    // Configure turbotrace correctly
    turbotrace: {
      memoryLimit: 4 * 1024, // 4GB
    }
  },
  // Use standalone output
  output: 'standalone',
  // Enable file tracing
  outputFileTracing: true,
  // Exclude large platform-specific modules from tracing
  transpilePackages: [
    '@swc/core-linux-x64-gnu',
    '@swc/core-linux-x64-musl',
    '@esbuild/linux-x64',
    '@next/swc-linux-x64-gnu',
    '@next/swc-linux-x64-musl'
  ]
}

module.exports = nextConfig
