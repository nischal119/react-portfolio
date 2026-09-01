"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { recordPageView } from "@/lib/firebase";

/**
 * Records a page view to Firestore analytics.
 * Only fires on public routes (not /admin).
 */
export function usePageView() {
  const pathname = usePathname();
  const recorded = useRef(false);

  useEffect(() => {
    // Skip admin pages and double-fires
    if (pathname?.startsWith("/admin") || recorded.current) return;
    recorded.current = true;

    const now = new Date();
    const date = now.toISOString().slice(0, 10); // YYYY-MM-DD

    recordPageView({
      path: pathname || "/",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      date,
    }).catch(() => {
      // Silently fail — analytics should never break the page
    });
  }, [pathname]);
}
