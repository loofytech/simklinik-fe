/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'x-loofy-header',
            value: 'Loofytech header',
          },
          {
            key: 'x-loofy-klinik-header',
            value: 'Loofytech klinik header',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
