// components/client-chat-actions.tsx
"use client";

import { Edit, Trash } from "lucide-react";
import { useChatActions } from "@/hooks/useChatActions";

export function ChatActions({ chatId }: { chatId: string }) {
  const { editTitle, deleteById } = useChatActions();
  
  return (
    <div className="flex gap-1">
      <button
        onClick={() => editTitle(chatId)}
        aria-label="Edit"
      >
        <Edit className="h-4 w-4 text-muted hover:text-white" />
      </button>
      <button
        onClick={() => deleteById(chatId)}
        aria-label="Delete"
      >
        <Trash className="h-4 w-4 text-muted hover:text-red-500" />
      </button>
    </div>
  );
}