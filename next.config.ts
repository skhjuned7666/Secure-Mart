import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
<<<<<<< HEAD
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
=======
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
>>>>>>> 17e6cd4d44f3f2bca007a407e6ab0c8e00f6d84a
    ],
  },
};

export default nextConfig;
