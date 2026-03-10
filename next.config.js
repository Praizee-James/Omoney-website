// next.config.js
/** @type {import('next').NextConfig} */
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'ui-avatars.com'],
  },
  webpack: (config) => {
    // enable '@/...' imports to resolve to the `src` directory
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
}

module.exports = nextConfig