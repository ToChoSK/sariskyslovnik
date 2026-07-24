/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/sitemaps/:id.xml',
        destination: '/sitemaps/:id',
      },
    ]
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
