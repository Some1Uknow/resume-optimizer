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
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            ResumeMax
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            onClick={onNewChat}
            className="flex items-center gap-2 h-9 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">New Chat</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={onToggleChatModal}
            className="flex items-center gap-2 h-9 bg-card border-border hover:bg-muted text-foreground rounded-lg"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="font-medium">Chats</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-card rounded-lg border border-border">
          <ModeToggle />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 h-12 px-3 bg-card hover:bg-muted border border-border rounded-lg text-foreground"
            >
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border">
                <Image
                  src={session?.user.image || "/default-avatar.png"}
                  height={28}
                  width={28}
                  className="w-7 h-7 rounded-full object-cover"
                  alt="User Avatar"
                />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-sm font-semibold text-foreground">
                  {session?.user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-32">
                  {session?.user.email}
                </p>
              </div>
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 bg-card border border-border shadow-xl rounded-lg"
          >
            <DropdownMenuItem className="rounded-lg m-1 hover:bg-muted transition-colors duration-150 text-foreground">
              <Settings className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="font-medium">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSignOut}
              className="rounded-lg m-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span className="font-medium">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
