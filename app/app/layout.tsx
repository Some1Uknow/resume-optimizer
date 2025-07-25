import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function AppLayout({
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
        defaultTheme="light"
        //    enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar session={session} />
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarProvider>
      </ThemeProvider>
    </main>
  );
}
