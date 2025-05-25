import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";

export default async function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect if not authenticated
  if (!session?.user?.id) {
    redirect("/signin");
  }

  return (
    <main suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </main>
  );
}
