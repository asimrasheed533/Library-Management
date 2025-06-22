// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  webpack: (config: any) => {
    // Handle Canvas for react-pdf
    config.externals = config.externals || [];
    config.externals.push({
      canvas: "canvas",
    });

    // Copy PDF.js worker to public directory
    config.resolve.alias = {
      ...config.resolve.alias,
      "pdfjs-dist/build/pdf.worker.entry":
        "pdfjs-dist/build/pdf.worker.min.mjs",
    };

    return config;
  },
  // Ensure static files are served properly
  async rewrites() {
    return [
      {
        source: "/pdf.worker.min.mjs",
        destination: "/pdf.worker.min.mjs",
      },
    ];
  },
};

export default nextConfig;
