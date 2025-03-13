"use client";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Icons } from "./icons";

export default function GoogleSignIn() {
  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={() => signIn("google", { redirectTo: "/dashboard" })}
    >
      <Icons.google className="mr-2 h-4 w-4" />
      Google
    </Button>
  );
}
