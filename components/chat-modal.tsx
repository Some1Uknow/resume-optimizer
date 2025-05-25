"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  Edit2,
  MessageSquare,
  Loader2,
  Search,

  ExternalLink,
  Trash2,
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

interface Chat {
  id: string;
  title: string;
  updatedAt: string;
}

// Helper function to group chats by timeframe
const groupChatsByTimeframe = (chats: Chat[]) => {
  const now = new Date();
  const lastWeek = new Date(now);
  lastWeek.setDate(now.getDate() - 7);

  const lastYear = new Date(now);
  lastYear.setFullYear(now.getFullYear() - 1);

  return {
    last7Days: chats.filter((chat) => new Date(chat.updatedAt) > lastWeek),
    thisYear: chats.filter(
      (chat) => {
        const updatedAt = new Date(chat.updatedAt);
        return updatedAt <= lastWeek && updatedAt > lastYear;
      }
    ),
    older: chats.filter((chat) => new Date(chat.updatedAt) <= lastYear),
  };
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
};

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Extract chat ID from the URL path

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
          // Add sample dates for demo if they don't exist
          const chatsWithDates = data.chats.map((chat) => ({
            ...chat,
            updatedAt: chat.updatedAt || new Date().toISOString(),
          }));
          setChats(chatsWithDates);
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
  const startEditing = (chat: Chat) => {
    setEditingChatId(chat.id);
    setEditValue(chat.title);
  };
  const handleChatRename = async () => {
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update chat title");
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

  const cancelEditing = () => {
    setEditingChatId(null);
    setEditValue("");
  };
  const handleChatDelete = async (chatId: string) => {
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete chat");
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

  const handleChatSelect = (chatId: string) => {
    router.push(`/builder/${chatId}`);
    onClose();
  };

  const filteredChats = searchQuery
    ? chats.filter((chat) =>
        chat.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chats;

  const groupedChats = groupChatsByTimeframe(filteredChats);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-6 bg-[#121212] border-zinc-800 text-white overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Your Chats
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-transparent text-white border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[420px] pr-4">
            <div className="space-y-6">
              {isLoading && chats.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                  <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
                  <p className="text-sm text-zinc-400 font-medium">
                    Loading your chats...
                  </p>
                </div>
              ) : chats.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                  <div className="p-4 rounded-full bg-zinc-800/50">
                    <MessageSquare className="h-8 w-8 text-zinc-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">No chats yet</p>
                    <p className="text-xs text-zinc-400">
                      Start a conversation to see your chats here
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {groupedChats.last7Days.length > 0 && (
                    <div>
                      <h3 className="text-sm text-zinc-400 mb-3 font-medium">
                        Last 7 Days
                      </h3>                      <div className="space-y-2">
                        {groupedChats.last7Days.map((chat) => (
                          <div
                            key={chat.id}
                            className="flex justify-between items-center p-3 rounded-md hover:bg-zinc-800/50 cursor-pointer group"
                            onClick={() => {
                              if (editingChatId !== chat.id) {
                                handleChatSelect(chat.id);
                              }
                            }}
                          >
                            <div className="flex-1">
                              {editingChatId === chat.id ? (
                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                  <Input
                                    ref={editInputRef}
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        handleChatRename();
                                      } else if (e.key === "Escape") {
                                        cancelEditing();
                                      }
                                    }}
                                    className="text-white bg-zinc-800 border-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="Enter chat name"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={handleChatRename}
                                    disabled={isLoading}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={cancelEditing}
                                    className="hover:bg-zinc-700"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-white font-medium">
                                  {chat.title || "Untitled Chat"}
                                </span>
                              )}
                            </div>
                            {editingChatId !== chat.id && (
                              <div className="flex items-center gap-2 invisible group-hover:visible">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-zinc-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/builder/${chat.id}`);
                                    onClose();
                                  }}
                                >
                                  <ExternalLink className="h-4 w-4 text-zinc-400" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-zinc-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEditing(chat);
                                  }}
                                >
                                  <Edit2 className="h-4 w-4 text-zinc-400" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-zinc-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleChatDelete(chat.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 text-zinc-400" />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {groupedChats.thisYear.length > 0 && (
                    <div>
                      <h3 className="text-sm text-zinc-400 mb-3 font-medium">
                        This Year
                      </h3>                      <div className="space-y-2">
                        {groupedChats.thisYear.map((chat) => (
                          <div
                            key={chat.id}
                            className="flex justify-between items-center p-3 rounded-md hover:bg-zinc-800/50 cursor-pointer group"
                            onClick={() => {
                              if (editingChatId !== chat.id) {
                                handleChatSelect(chat.id);
                              }
                            }}
                          >
                            <div className="flex-1">
                              {editingChatId === chat.id ? (
                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                  <Input
                                    ref={editInputRef}
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        handleChatRename();
                                      } else if (e.key === "Escape") {
                                        cancelEditing();
                                      }
                                    }}
                                    className="text-white bg-zinc-800 border-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="Enter chat name"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={handleChatRename}
                                    disabled={isLoading}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={cancelEditing}
                                    className="hover:bg-zinc-700"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-white font-medium">
                                  {chat.title || "Untitled Chat"}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              {editingChatId !== chat.id && (
                                <span className="text-sm text-zinc-500">
                                  {formatDate(chat.updatedAt)}
                                </span>
                              )}
                              {editingChatId !== chat.id && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:bg-zinc-700"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="bg-zinc-900 border-zinc-800 text-white"
                                  >
                                    <DropdownMenuItem
                                      className="cursor-pointer text-white focus:bg-zinc-800 focus:text-white"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        startEditing(chat);
                                      }}
                                    >
                                      <Edit2 className="h-4 w-4 mr-2" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="cursor-pointer text-white focus:bg-zinc-800 focus:text-white"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleChatDelete(chat.id);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {groupedChats.older.length > 0 && (
                    <div>
                      <h3 className="text-sm text-zinc-400 mb-3 font-medium">
                        Older
                      </h3>
                      <div className="space-y-2">
                        {groupedChats.older.map((chat) => (                          <div
                            key={chat.id}
                            className="flex justify-between items-center p-3 rounded-md hover:bg-zinc-800/50 cursor-pointer group"
                            onClick={() => {
                              if (editingChatId !== chat.id) {
                                handleChatSelect(chat.id);
                              }
                            }}
                          >
                            <div className="flex-1">
                              {editingChatId === chat.id ? (
                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                  <Input
                                    ref={editInputRef}
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        handleChatRename();
                                      } else if (e.key === "Escape") {
                                        cancelEditing();
                                      }
                                    }}
                                    className="text-white bg-zinc-800 border-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="Enter chat name"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={handleChatRename}
                                    disabled={isLoading}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={cancelEditing}
                                    className="hover:bg-zinc-700"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-white font-medium">
                                  {chat.title || "Untitled Chat"}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              {editingChatId !== chat.id && (
                                <span className="text-sm text-zinc-500">
                                  {formatDate(chat.updatedAt)}
                                </span>
                              )}
                              {editingChatId !== chat.id && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:bg-zinc-700"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="bg-zinc-900 border-zinc-800 text-white"
                                  >
                                    <DropdownMenuItem
                                      className="cursor-pointer text-white focus:bg-zinc-800 focus:text-white"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        startEditing(chat);
                                      }}
                                    >
                                      <Edit2 className="h-4 w-4 mr-2" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="cursor-pointer text-white focus:bg-zinc-800 focus:text-white"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleChatDelete(chat.id);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
