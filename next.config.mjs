/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  distDir: "build",
};

export default nextConfig;
