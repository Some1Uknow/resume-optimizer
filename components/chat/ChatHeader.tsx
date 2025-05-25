"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import type { Session } from "next-auth";
import { Plus, MessageSquare, MoreVertical, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface ChatHeaderProps {
  session: Session;
  onNewChat: () => void;
  onToggleChatModal: () => void;
}

export const ChatHeader = ({ session, onNewChat, onToggleChatModal }: ChatHeaderProps) => {
  const handleSignOut = () => {
    signOut({ redirectTo: "/" });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-xl tracking-tight">ResumeMax</h1>
        <Button
          variant="default"
          onClick={onNewChat}
          className="flex items-center gap-2 h-9"
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
        <Button
          variant="outline"
          onClick={onToggleChatModal}
          className="flex items-center gap-2 h-9"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Chats</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-10 hover:bg-secondary/80"
            >
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Image
                  src={session?.user.image}
                  height={32}
                  width={32}
                  className="w-8 h-8 rounded-full"
                  alt="User Avatar"
                />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-sm font-medium">{session?.user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {session?.user.email}
                </p>
              </div>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
