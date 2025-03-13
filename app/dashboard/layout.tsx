import { Sidebar } from "@/components/sidebar";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
    return toast("User is not signed in");
  }

  return (
    <div
      className="flex flex-row bg-background h-screen"
      suppressHydrationWarning
    >
      <div className="sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-6 px-4">{children}</div>
        <Toaster />
      </main>
    </div>
  );
}
