/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      // ✅ Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // ✅ Unsplash (DEFAULT_IMAGE чинь эндээс ирж байгаа)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
