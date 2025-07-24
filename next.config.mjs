/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    "puppeteer-core",
    "@sparticuz/chromium",
    "pdf-parse",
  ],

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "cdn.dribbble.com",
      },
    ],
  },
};

export default nextConfig;
