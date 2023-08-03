/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spellbound-storage-7811eef0192809-dev.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/public/**',
      },
    ],
  },
}

module.exports = nextConfig
