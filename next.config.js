/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ["api.pazarishop.croonus.com", "192.168.1.174"],
  },
};

module.exports = nextConfig;
