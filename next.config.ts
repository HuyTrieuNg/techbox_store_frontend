import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/aiproxy/:path*',
        destination: `${process.env.AI_SERVICE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
