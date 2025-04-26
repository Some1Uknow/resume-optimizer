import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
        <SidebarProvider>
          <AppSidebar session={session} />
          <section className="bg-gray-50 dark:bg-gray-950">
            <SidebarTrigger />
          </section>
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </main>
  );
}
