/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
};

module.exports = nextConfig;
