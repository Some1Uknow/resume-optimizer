import { FileText, Target, Zap, Mail, Home } from "lucide-react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

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

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          {/* Expanded state: Show logo on left, trigger on right */}
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Home className="h-6 w-6" />
            <span className="font-semibold text-lg">
              Resume Optimizer
            </span>
          </div>

          <SidebarTrigger className="group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md p-1 transition-colors">
            <Home className="h-6 w-6" />
          </SidebarTrigger>

          {/* Collapsed state: Show logo by default, trigger on hover */}
          <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full">
            <Home className="h-6 w-6 group-hover:hidden" />
            <SidebarTrigger className="hidden group-hover:flex hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md p-1 transition-colors">
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
                  <SidebarMenuButton asChild tooltip={item.title}>
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

      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          © 2025 Resume Optimizer
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
