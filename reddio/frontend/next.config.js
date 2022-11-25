/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  images: {
    domains: ['ethvn.brolab.io'],
  },
};

module.exports = nextConfig;
