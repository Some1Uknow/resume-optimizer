import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://resumemax.vercel.app"),
  title: {
    default: "ResumeMax - AI-Powered Resume Builder",
    template: "%s | ResumeMax"
  },
  description: "Create perfect resumes with AI. Type naturally, watch your resume build in real-time. Our AI-powered platform optimizes your content for ATS systems and hiring managers.",
  keywords: ["resume builder", "AI resume", "resume optimization", "ATS optimization", "job application", "career tools"],
  authors: [{ name: "ResumeMax" }],
  creator: "ResumeMax",
  publisher: "ResumeMax",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resumemax.vercel.app',
    siteName: 'ResumeMax',
    title: 'ResumeMax - AI-Powered Resume Builder',
    description: 'Create perfect resumes with AI. Type naturally, watch your resume build in real-time.',
    images: [
      {
        url: 'https://resumemax.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'ResumeMax - AI Resume Builder',
      },
      {
        url: 'https://resumemax.vercel.app/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ResumeMax - AI Resume Builder',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeMax - AI-Powered Resume Builder',
    description: 'Create perfect resumes with AI. Type naturally, watch your resume build in real-time.',
    images: ['https://resumemax.vercel.app/twitter-image'],
    creator: '@resumemax',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
