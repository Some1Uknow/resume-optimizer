import { auth } from "@/auth";
import BuilderPage from "../Builder";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import db from "@/prisma/prisma";

export default async function page({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session?.user?.id) return null;

  const [chats, chat] = await Promise.all([
    db.chat.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
      },
    }),
    db.chat.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        messages: true,
        resumeData: true,
        resumeTemplate: true,
      },
    }),
  ]);

  return (
    <SidebarProvider>
      <AppSidebar chats={chats} />
      <SidebarTrigger />
      <BuilderPage session={session} params={params} chats={chat} />
    </SidebarProvider>
  );
}
