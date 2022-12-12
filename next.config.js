/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["e7.pngegg.com", "mosaic.scdn.co", "i.scdn.co"],
  },
};

module.exports = nextConfig;
