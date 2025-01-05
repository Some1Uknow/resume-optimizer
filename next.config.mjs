/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  typescript:{
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
