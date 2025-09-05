/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", 
  experimental: {
    turbo: false, // ปิด Turbopack
  },
};

module.exports = nextConfig;
