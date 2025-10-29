"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!gaId) return;
    const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;
    // Send a page_view on client-side route changes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag?.("config", gaId, { page_path: url });
  }, [pathname, searchParams, gaId]);

  return null;
}

