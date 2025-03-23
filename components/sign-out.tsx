"use server";
import { signOut } from "@/auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
export async function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button
        type="submit"
        variant="ghost"
        className="w-full justify-start text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-100/50 dark:hover:bg-red-900/20 transition-colors duration-200 group"
      >
        <LogOut className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          Sign Out
        </span>
      </Button>
    </form>
  );
}


export async function logout() {
  "use server"; // Ensure this is a server action
  await signOut({ redirectTo: "/" });
}
