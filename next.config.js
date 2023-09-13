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
        domains: ["api.pazarishop.croonus.com", "192.168.1.174", 'scontent.cdninstagram.com'],
    },
}

module.exports = nextConfig
