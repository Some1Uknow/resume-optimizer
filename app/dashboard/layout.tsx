"use client";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="container mx-auto py-6 px-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}