import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.habbo.com',
        port: '',
        pathname: '/habbo-imaging/**',
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;