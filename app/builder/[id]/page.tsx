import { auth } from "@/auth";
import BuilderPage from "../Builder";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import db from "@/prisma/prisma";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) return null; 
  
  const chats = await db.chat.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
    },
  });

  const chatId = await params;
  const chat = await db.chat.findUnique({
    where: { id: chatId.id },
    select: {
      id: true,
      title: true,
      messages: true,
      resumeData: true,
      resumeTemplate: true,
    },
  });
 // console.log("MESSAGES", chat.messages);
  return (
    <SidebarProvider>
      <AppSidebar chats={chats} />
      <SidebarTrigger />
      <BuilderPage session={session} params={params} chats={chat} />
    </SidebarProvider>
  );
}
