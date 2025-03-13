"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";

export function ConditionalHeader() {
  const pathname = usePathname();
  const isDashboardPath = pathname?.startsWith("/dashboard");

  if (isDashboardPath) {
    return null;
  }

  return <Header />;
}
