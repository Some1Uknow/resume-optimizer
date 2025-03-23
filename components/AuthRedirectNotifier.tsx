"use client";

import { useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthRedirectNotifier() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.has("redirected")) {
      toast.error("You must be logged in to access that page!");

      // Clean up the URL by removing the query param after showing the toast
      const newUrl = pathname; // Get the current path without query params
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return null; // This component doesn't render anything, just triggers the toast
}
