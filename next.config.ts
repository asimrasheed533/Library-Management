// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com", "utfs.io"],
  },
};

export default nextConfig;
