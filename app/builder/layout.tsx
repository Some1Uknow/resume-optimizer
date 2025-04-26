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
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar session={session} />
          <main className="bg-gray-100 text-black dark:bg-black dark:text-white">
            <SidebarTrigger className="p-0" />
          </main>
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </main>
  );
}
