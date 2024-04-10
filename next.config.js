/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    NAME: process.env.NAME,
    ADDRESS: process.env.ADDRESS,
    PIB: process.env.PIB,
    EMAIL: process.env.EMAIL,
    TELEPHONE: process.env.TELEPHONE,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
    INSTAGRAM: process.env.INSTAGRAM,
  },
  images: {
    domains: [
      "api.Croonusshop.croonus.com",
      "192.168.1.174",
      "192.168.1.83",
      "api. .croonus.com",
      "scontent.cdninstagram.com",
      "api.fashiondemo.croonus.com",
      "video.cdninstagram.com",
    ],
    minimumCacheTTL: 60 * 60 * 24 * 90,
  },
};

module.exports = nextConfig;
