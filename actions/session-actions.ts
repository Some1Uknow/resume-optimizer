"use server";

import { auth } from "@/auth";

export async function checkSession() {
  const session = await auth();
  return !!session?.user;
}
