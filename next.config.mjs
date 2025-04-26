/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  },
  images: {
    dangerouslyAllowSVG: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
