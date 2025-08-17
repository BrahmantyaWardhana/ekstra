"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

interface CreatorPageData {
  name: string;
  profileImage: string | null;
  description: string | null;
  pageHandle: string;
}

export default function CreatorDashboardHeader({
  creatorData,
}: {
  creatorData: CreatorPageData[] | null;
}) {
  const pathname = usePathname();
  const handle = creatorData?.[0]?.pageHandle || "";

  // Build base path once; memoize to avoid re-renders
  const base = useMemo(
    () => (handle ? `/creatorpage/${handle}` : ""),
    [handle]
  );

  const navItems = useMemo(
    () =>
      handle
        ? [
            { name: "Home", href: `${base}` },
            { name: "Membership", href: `${base}/membership` },
            { name: "Shop", href: `${base}/shop` },
          ]
        : [],
    [base, handle]
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="bg-neutral-300 pb-6">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Profile Avatar & Name */}
        <div className="flex flex-col items-center pt-12">
          <img
            className="h-20 w-20 rounded-md shadow"
            src={
              creatorData?.[0]?.profileImage ||
              "https://www.gravatar.com/avatar/?d=mp"
            }
            referrerPolicy="no-referrer"
            alt={creatorData?.[0]?.name || "Creator avatar"}
          />
          <h1 className="mt-4 text-2xl font-semibold text-black">
            {creatorData?.[0]?.name || "—"}
          </h1>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-6 flex justify-center gap-6 text-sm font-medium text-gray-700">
          {navItems.length === 0 ? (
            // Optional: skeleton while we don't have a handle
            <span className="opacity-60">Loading…</span>
          ) : (
            navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`pb-1 transition-colors hover:text-black ${
                  isActive(item.href)
                    ? "border-b-2 border-black font-semibold text-black"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))
          )}
        </nav>
      </div>
    </div>
  );
}
