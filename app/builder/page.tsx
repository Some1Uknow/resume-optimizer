import { auth } from "@/auth";
import BuilderPage from "./Builder";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function page() {
  const session = await auth();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <BuilderPage session={session} />
    </SidebarProvider>
  );
}