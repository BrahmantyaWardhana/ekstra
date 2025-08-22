"use client"

import { usePathname } from 'next/navigation';
import DomainDisplay from './DomainDisplay';
import Link from 'next/link';
import { useState } from 'react';

interface CreatorPageData {
  name: string,
  profileImage: string | null,
  description: string | null,
  pageHandle: string,
}

export default function CreatorDashboardHeader( {creatorData} : { creatorData: CreatorPageData[] | null } ) {
  const pageHandle = creatorData?.[0]?.pageHandle ?? "";
  const [copied, setCopied] = useState(false);

  async function copyPublicLink() {
    if (!pageHandle) return;
    const url = `${window.location.origin}/creatorpage/${pageHandle}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {

    }
  }

  const navItems = [
    {name: 'Home', href: '/creator/dashboard'},
    {name: 'Membership', href: '/creator/dashboard/membership'},
    {name: 'Shop', href: '/creator/dashboard/shop'}
  ]

  const pathname = usePathname();
  const activeItem =
  navItems.find(item =>
    item.href === "/creator/dashboard"
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  )?.href || "/creator/dashboard";

  return (
    <div className="bg-neutral-300 pb-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Avatar & Name */}
        <div className="flex flex-col items-center pt-12">
          <img 
            className="w-20 h-20 rounded-md flex items-center justify-center shadow"
            src={creatorData?.[0]?.profileImage || "https://www.gravatar.com/avatar/?d=mp"}
            referrerPolicy="no-referrer" 
          />
          <h1 className="mt-4 text-2xl font-semibold text-black">{creatorData?.[0]?.name}</h1>
          {/* URL + Copy button */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-sm text-gray-800">
              <DomainDisplay />/creatorpage/{pageHandle}
            </span>
            <button
              type="button"
              onClick={copyPublicLink}
              disabled={!pageHandle}
              className="px-2 py-1 text-xs rounded-md border bg-black text-white disabled:opacity-50 cursor-pointer"
              aria-live="polite"
              title="Copy public link"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav className="mt-6 flex justify-center gap-6 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`hover:text-black pb-1 transition-colors ${
                activeItem === item.href
                ? 'text-black border-b-2 border-black font-semibold'
                : ''
              }`}
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
