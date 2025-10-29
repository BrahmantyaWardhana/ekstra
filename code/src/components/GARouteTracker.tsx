"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GARouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;

    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.gtag === "function") {
      w.gtag("config", gaId, { page_path: pagePath });
    }
  }, [pathname, searchParams]);

  return null;
}

