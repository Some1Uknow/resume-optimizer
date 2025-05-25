"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  MoreVertical,
  Check,
  X,
  Edit2,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const editInputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Extract chat ID from the URL path
  useEffect(() => {
    if (pathname.startsWith("/builder/")) {
      const chatId = pathname.split("/builder/")[1];
      setSelectedChat(chatId);
    }
  }, [pathname]);

  useEffect(() => {
    async function fetchChats() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/chat");
        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }
        const data = await response.json();
        if (Array.isArray(data.chats)) {
          setChats(data.chats);
        } else {
          console.error("Expected an array but received:", data);
          setChats([]);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        toast.error("Error fetching chats", {
          description: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (isOpen) {
      fetchChats();
    }
  }, [isOpen]);

  // Focus the input when editing starts
  useEffect(() => {
    if (editingChatId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingChatId]);

  const startEditing = (chat) => {
    setEditingChatId(chat.id);
    setEditValue(chat.title);
  };

  const cancelEditing = () => {
    setEditingChatId(null);
    setEditValue("");
  };

  const saveEditing = async () => {
    if (!editValue.trim()) {
      toast.error("Chat name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: editingChatId,
          newName: editValue.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update chat title");
      }

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === editingChatId
            ? { ...chat, title: editValue.trim() }
            : chat
        )
      );

      toast.success("Chat name updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update chat name");
    } finally {
      setEditingChatId(null);
      setEditValue("");
      setIsLoading(false);
    }
  };

  const handleChatDelete = async (chatId) => {
    if (!confirm("Are you sure you want to delete this chat?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }

      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      toast.success("Chat deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat", {
        action: {
          label: "Try Again",
          onClick: () => handleChatDelete(chatId),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEditing();
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  const handleChatSelect = (chatId) => {
    router.push(`/builder/${chatId}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Your Chats
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <ScrollArea className="h-[400px] w-full">
            <div className="space-y-2 pr-4">
              {isLoading && chats.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Loading chats...
                </div>
              ) : chats.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No chats yet. Create a new one!
                </div>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex justify-between items-center p-3 rounded-lg transition-all duration-200 ${
                      selectedChat === chat.id
                        ? "bg-secondary"
                        : "hover:bg-secondary/40"
                    } group`}
                  >
                    {editingChatId === chat.id ? (
                      <div className="flex items-center gap-2 w-full">
                        <Input
                          ref={editInputRef}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="h-8 flex-1 focus-visible:ring-1"
                          disabled={isLoading}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={saveEditing}
                          disabled={isLoading}
                          className="h-8 w-8 hover:bg-secondary"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={cancelEditing}
                          disabled={isLoading}
                          className="h-8 w-8 hover:bg-secondary"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div
                          onClick={() => handleChatSelect(chat.id)}
                          className="flex-1 cursor-pointer text-sm hover:no-underline"
                        >
                          {chat.title || "Untitled"}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isLoading}
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary/80"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => startEditing(chat)}
                              className="hover:bg-secondary/60"
                            >
                              <Edit2 className="h-4 w-4 mr-2" /> Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleChatDelete(chat.id)}
                              className="text-destructive focus:text-destructive hover:bg-destructive/10"
                            >
                              <X className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
