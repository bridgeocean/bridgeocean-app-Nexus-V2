/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove any static export settings that might be causing issues
  // output: 'export', // ← Remove this if present
  // trailingSlash: true, // ← Remove this if present
}

export default nextConfig
