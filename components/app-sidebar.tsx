"use client";
import { FileText, Target, Zap, Mail, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";
import {
  MoreVertical,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Menu items for the sidebar
const uuid = uuidv4(); // Generate a unique ID for the sidebar

const items = [
  {
    title: "Builder",
    url: `/app/builder/${uuid}`,
    icon: FileText,
    description: "Build your resume",
  },
  {
    title: "Tracker",
    url: "/app/tracker",
    icon: Target,
    description: "Track applications",
  },
  {
    title: "Optimizer",
    url: "/app/optimizer",
    icon: Zap,
    description: "Optimize your resume",
  },
  {
    title: "Cover Letter",
    url: "/app/cover-letter",
    icon: Mail,
    description: "Create cover letters",
  },
];

export function AppSidebar({ session }: { session: Session }) {
  const pathname = usePathname();
  const handleSignOut = () => {
    signOut({ redirectTo: "/" });
  };
  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="bg-gray-200 border-0 text-gray-900"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          {/* Expanded state: Show logo on left, trigger on right */}
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Home className="h-6 w-6" />
            <span className="font-semibold text-lg">JobMax</span>
          </div>

          <SidebarTrigger className="group-data-[collapsible=icon]:hidden hover:bg-blue-100 hover:text-blue-600 rounded-md p-1 transition-colors">
            <Home className="h-6 w-6" />
          </SidebarTrigger>

          {/* Collapsed state: Show logo by default, trigger on hover */}
          <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full">
            <Home className="h-6 w-6 group-hover:hidden" />
            <SidebarTrigger className="hidden group-hover:flex hover:bg-blue-100 hover:text-blue-600 rounded-md p-1 transition-colors">
              <Home className="h-6 w-6" />
            </SidebarTrigger>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`hover:bg-blue-100 hover:text-blue-600 ${
                      pathname.startsWith(item.url)
                        ? "bg-blue-100 text-blue-600"
                        : ""
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-10 group-data-[collapsible=icon]:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 h-12 px-3 hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                <Image
                  src={session?.user.image || "/default-avatar.png"}
                  height={28}
                  width={28}
                  className="w-7 h-7 rounded-full object-cover"
                  alt="User Avatar"
                />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-sm font-semibold text-gray-900">
                  {session?.user.name}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-32">
                  {session?.user.email}
                </p>
              </div>
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white border border-gray-200 shadow-lg rounded-[32px] p-2"
          >
            <DropdownMenuItem className="rounded-lg m-1 hover:bg-gray-100 transition-colors duration-150 text-gray-700">
              <Settings className="h-4 w-4 mr-3 text-gray-500" />
              <span className="font-medium text-[14px]">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSignOut}
              className="rounded-lg m-1 text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span className="font-medium text-[14px]">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
