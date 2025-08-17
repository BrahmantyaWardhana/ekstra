"use client"

import { usePathname } from 'next/navigation';
import DomainDisplay from './DomainDisplay';
import Link from 'next/link';

interface CreatorPageData {
  name: string,
  profileImage: string | null,
  description: string | null,
  pageHandle: string,
}

export default function CreatorDashboardHeader( {creatorData} : { creatorData: CreatorPageData[] | null } ) {
  
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
          <p className="text-sm text-gray-800 mt-1"><DomainDisplay />/{creatorData?.[0]?.pageHandle}</p>
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
