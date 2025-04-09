import { Plus } from "lucide-react";
import { useMemo } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { SignOut } from "./sign-out";
import Link from "next/link";
import { Button } from "./ui/button";
import { v4 as uuidv4 } from "uuid";

export function AppSidebar({
  chats,
}: {
  chats: { id: string; title: string }[];
}) {
  const chatId = useMemo(() => uuidv4(), []);

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between px-4">
        ResumeMax <ModeToggle />
      </SidebarHeader>
      <SidebarContent>
        <div className="px-2 w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href={`/builder/${chatId}`}>
              <Button variant="default">
                New Chat <Plus />
              </Button>
            </Link>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/builder/${chat.id}`}>
                      <span>{chat.title || "Untitled"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-2">
          <SignOut />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
