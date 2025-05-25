"use server";

import { signIn } from "@/auth";
import { v4 as uuidv4 } from "uuid";

export async function handleGoogleSignIn() {
  const id = uuidv4();
  await signIn("google", { redirectTo: `/builder/${id}` });
}
