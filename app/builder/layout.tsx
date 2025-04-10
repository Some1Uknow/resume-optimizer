import { auth } from "@/auth";
import db from "@/prisma/prisma";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

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

  // Fetch the chat list ONLY here in the layout
  const chats = await db.chat.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
    },
  });

  return (
    <main suppressHydrationWarning>
      <SidebarProvider>
        <AppSidebar chats={chats} />
        <main className="bg-black p-2">
          <SidebarTrigger />
        </main>
        {children}
      </SidebarProvider>
    </main>
  );
}
