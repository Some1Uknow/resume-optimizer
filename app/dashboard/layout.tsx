"use client";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed inset-y-0 z-10">
        <Sidebar />
      </div>
      <main className="flex-1 ml-72 overflow-y-auto">
        <div className="container mx-auto py-6 px-4">
          {children}
        </div>
      </main>
    </div>
  );
}