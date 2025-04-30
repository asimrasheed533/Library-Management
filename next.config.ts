import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com", "utfs.io"],
  },
};

module.exports = nextConfig;
export default nextConfig;
