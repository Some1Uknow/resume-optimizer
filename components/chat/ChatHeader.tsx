"use client";

import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";
import { Plus, MessageSquare } from "lucide-react";

interface ChatHeaderProps {
  session: Session;
  onNewChat: () => void;
  onToggleChatModal: () => void;
}

export const ChatHeader = ({
  onNewChat,
  onToggleChatModal,
}: ChatHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Resume Builder
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            onClick={onNewChat}
            className="flex items-center gap-2 h-9 bg-gradient-to-br from-[#a855f7] to-[#7c3aed] hover:from-[#9333ea] hover:to-[#6d28d9] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium text-[14px]"
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">New Chat</span>
          </Button>

          <Button
            variant="outline"
            onClick={onToggleChatModal}
            className="flex items-center gap-2 h-9 bg-white border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all font-medium text-[14px]"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="font-medium">Chats</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
