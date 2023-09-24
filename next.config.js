/** @type {import('next').NextConfig} */
const repo = "boilerplate-nextjs";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const nextConfig = {
  experimental: {
    appDir: true,
  },
  trailingSlash: true,

  basePath: basePath,
  assetPrefix: assetPrefix,

  env: {
    API_URL: process.env.API_URL,
    NAME: process.env.NAME,
    ADDRESS: process.env.ADDRESS,
    PIB: process.env.PIB,
    EMAIL: process.env.EMAIL,
    TELEPHONE: process.env.TELEPHONE,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
  },
  images: {
    domains: ["api.pazarishop.croonus.com", "192.168.1.174", "scontent.cdninstagram.com", "api.fashiondemo.croonus.com"],
  },
};

module.exports = nextConfig;
