"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  MoreVertical,
  Check,
  X,
  Edit2,
  MessageSquare,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
      <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-md border-border/50 shadow-2xl">
        <DialogHeader className="space-y-3 pb-2">
          <DialogTitle className="flex items-center gap-3 text-xl font-semibold tracking-tight">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            Your Chats
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <ScrollArea className="h-[420px] w-full">
            <div className="space-y-3 pr-4">
              {isLoading && chats.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
                  <p className="text-sm text-muted-foreground font-medium">
                    Loading your chats...
                  </p>
                </div>
              ) : chats.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                  <div className="p-4 rounded-full bg-muted/30">
                    <MessageSquare className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">No chats yet</p>
                    <p className="text-xs text-muted-foreground">
                      Start a conversation to see your chats here
                    </p>
                  </div>
                </div>
              ) : (
                chats.map((chat, index) => (
                  <div
                    key={chat.id}
                    className={`group relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ease-out hover:shadow-md ${
                      selectedChat === chat.id
                        ? "bg-primary/5 border-primary/20 shadow-sm ring-1 ring-primary/10"
                        : "bg-background/60 border-border/30 hover:bg-muted/30 hover:border-border/60"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isOpen ? 'slideInUp 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    {editingChatId === chat.id ? (
                      <div className="flex items-center gap-3 w-full">
                        <Input
                          ref={editInputRef}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="h-9 flex-1 bg-background/80 border-border/60 focus:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all duration-200"
                          disabled={isLoading}
                          placeholder="Enter chat name..."
                        />
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={saveEditing}
                            disabled={isLoading}
                            className="h-9 w-9 hover:bg-green-500/10 hover:text-green-600 transition-all duration-200"
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={cancelEditing}
                            disabled={isLoading}
                            className="h-9 w-9 hover:bg-red-500/10 hover:text-red-600 transition-all duration-200"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          onClick={() => handleChatSelect(chat.id)}
                          className="flex-1 cursor-pointer group/text"
                        >
                          <div className={`text-sm font-medium transition-all duration-200 group-hover/text:text-primary ${
                            selectedChat === chat.id ? "text-primary" : "text-foreground"
                          }`}>
                            {chat.title || "Untitled Chat"}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Click to open
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isLoading}
                              className="h-9 w-9 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-muted/60 hover:scale-105"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="end" 
                            className="w-52 bg-background/95 backdrop-blur-md border-border/50 shadow-xl"
                          >
                            <DropdownMenuItem
                              onClick={() => startEditing(chat)}
                              className="hover:bg-primary/5 focus:bg-primary/5 transition-colors duration-150"
                            >
                              <Edit2 className="h-4 w-4 mr-3 text-primary/70" /> 
                              <span className="font-medium">Rename</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleChatDelete(chat.id)}
                              className="text-destructive focus:text-destructive hover:bg-destructive/5 focus:bg-destructive/5 transition-colors duration-150"
                            >
                              <X className="h-4 w-4 mr-3" /> 
                              <span className="font-medium">Delete</span>
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
        
        <style jsx>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
