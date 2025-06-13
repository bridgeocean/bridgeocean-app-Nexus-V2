/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Reduce build complexity
  experimental: {
    // Disable features that might cause stack overflows
    optimizeCss: false,
    optimizePackageImports: false,
    turbotrace: {
      // Reduce tracing complexity
      memoryLimit: 4 * 1024, // 4GB
    },
  },
  // Increase memory limit for builds
  env: {
    NODE_OPTIONS: '--max-old-space-size=4096',
  },
  // Exclude problematic paths from trace
  output: 'standalone',
  outputFileTracing: true,
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
      'node_modules/@next/swc-linux-x64-gnu',
      'node_modules/@next/swc-linux-x64-musl',
    ],
  },
}

module.exports = nextConfig
