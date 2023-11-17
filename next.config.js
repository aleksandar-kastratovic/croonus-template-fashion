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
  },
  images: {
    domains: [
      "api.Croonusshop.croonus.com",
      "192.168.1.174",
      "192.168.1.83",
      "api.staging.croonus.com",
      "scontent.cdninstagram.com",
      "api.fashiondemo.croonus.com",
      "video.cdninstagram.com",
      "scontent-frx5-1.cdninstagram.com",
      "scontent-frt3-2.cdninstagram.com",
      "scontent-frt3-1.cdninstagram.com",
      "scontent-vie1-1.cdninstagram.com",
      "scontent-atl3-1.cdninstagram.com",
      "scontent-cgk1-1.cdninstagram.com",
      "scontent-fco2-1.cdninstagram.com",
    ],
  },
};

module.exports = nextConfig;
