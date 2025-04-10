// src/hooks/useChatActions.ts
"use client";

import { useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { editChatTitle, deleteChat } from "@/actions/chat-actions";

export function useChatActions() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const editTitle = useCallback((id: string) => {
    const newTitle = prompt("New chat title:");
    if (newTitle) {
      startTransition(async () => {
        await editChatTitle(id, newTitle);
        router.refresh();
      });
    }
  }, [router]);

  const deleteById = useCallback((id: string) => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      startTransition(async () => {
        await deleteChat(id);
        router.refresh();
      });
    }
  }, [router]);

  return { editTitle, deleteById, isPending };
}