// components/app-sidebar.tsx
import { Plus } from "lucide-react";
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
import { ChatActions } from "./client-chat-actions";

export function AppSidebar({ chats }) {
  return (
    <Sidebar>
      <SidebarHeader className="flex justify-between px-4">
        ResumeMax <ModeToggle />
      </SidebarHeader>

      <SidebarContent>
        <div className="px-2 w-full flex justify-between">
          <Link href={`/builder/${uuidv4()}`}>
            <Button variant="default">
              New Chat <Plus />
            </Button>
          </Link>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem
                  key={chat.id}
                  className="flex justify-between items-center"
                >
                  <SidebarMenuButton asChild>
                    <Link href={`/builder/${chat.id}`}>
                      {chat.title || "Untitled"}
                    </Link>
                  </SidebarMenuButton>
                  <ChatActions chatId={chat.id} />
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