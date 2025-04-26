"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Plus,
  MoreVertical,
  Check,
  X,
  Edit2,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { v4 as uuidv4 } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { toast } from "sonner";
import Image from "next/image";

export function AppSidebar({ session }) {
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

    fetchChats();
  }, []);

  // Focus the input when editing starts
  useEffect(() => {
    if (editingChatId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingChatId]);

  // const handleChatSelect = (chatId) => {
  //   setSelectedChat(chatId);
  // };

  const handleNewChat = () => {
    const newChatId = uuidv4();
    router.push(`/builder/${newChatId}`);
  };

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
      window.location.reload();
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

      // if (selectedChat === chatId) {
      //   // If the current selected chat was deleted, redirect to home
      //   router.push("/");
      // }

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

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="flex flex-row justify-between items-center px-6 py-4 border-b">
        <span className="font-semibold text-xl tracking-tight">ResumeMax</span>
        <ModeToggle />
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-[calc(100vh-4rem)] px-3 pt-4">
        <Button
          variant="default"
          onClick={handleNewChat}
          className="w-full mb-6 flex items-center justify-center gap-2 h-10 shadow-sm"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs uppercase font-medium text-muted-foreground mb-2">
            Chats
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            {isLoading && chats.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                Loading chats...
              </div>
            ) : chats.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No chats yet. Create a new one!
              </div>
            ) : (
              <SidebarMenu>
                {chats.map((chat) => (
                  <SidebarMenuItem
                    key={chat.id}
                    className={`flex justify-between items-center transition-all duration-200 ${
                      selectedChat === chat.id
                        ? "bg-secondary"
                        : "hover:bg-secondary/40"
                    } rounded-md group px-2`}
                  >
                    {editingChatId === chat.id ? (
                      <div className="flex items-center gap-2 w-full pr-2">
                        <Input
                          ref={editInputRef}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="h-8 focus-visible:ring-1"
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
                        <Link
                          href={`/builder/${chat.id}`}
                          className="flex-1 px-2 py-1.5 text-sm rounded-md hover:no-underline"
                        >
                          {chat.title || "Untitled"}
                        </Link>
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
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto border-t">
          <div className="px-4 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 hover:bg-secondary/80"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Image
                        src={session?.user.image}
                        height={100}
                        width={100}
                        className="w-4 h-4"
                        alt="User Avatar"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{session?.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {session?.user.email}
                      </p>
                    </div>
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut({ redirectTo: "/" })}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
