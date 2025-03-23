
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AuthRedirectNotifier from "@/components/AuthRedirectNotifier";
import { Toaster } from "sonner";
import { Suspense } from "react";
export const metadata = {
  title: "ResumeAI - AI-Powered Resume Builder",
  description:
    "Create perfect resumes with AI. Type naturally, watch your resume build in real-time.",
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
          <Toaster />
          <Suspense fallback={<>Loading</>}>
            <AuthRedirectNotifier />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
