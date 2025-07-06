'use client';

import { useState, useRef, useEffect, type SetStateAction } from 'react';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import MobileSidebarHome from './MobileSidebarHome';
import { menuItems } from '~/components/UserMenuItems';
import { useClickOutside } from '~/hooks/useClickOutside';
import AccountDropdown from './AccountDropdown';

export default function SidebarHome() {
  const [activeItem, setActiveItem] = useState("Home");
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // session user data
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const userImage = session?.user?.image ?? "https://www.gravatar.com/avatar/?d=mp";

  // Add effect to handle outside clicks
  useClickOutside({
    refs: [dropdownRef, buttonRef],
    handler: () => setIsAccountDropdownOpen(false),
    isActive: isAccountDropdownOpen,
    eventType: 'mousedown'
  });

  const handleItemClick = (itemName: SetStateAction<string>) => {
    setActiveItem(itemName);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      < MobileSidebarHome />

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white border-e border-gray-200 
                  dark:bg-neutral-800 dark:border-neutral-700 z-50"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full">
          <header className="p-4 flex justify-between items-center gap-x-2">
            <a className="flex-none font-semibold text-xl text-black dark:text-white" href="#" aria-label="Brand">
              Ekstra
            </a>
          </header>
          <nav className="flex-1 overflow-y-auto">
            <div className="pb-0 px-2 w-full flex flex-col flex-wrap">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a
                      className={`w-full flex items-center gap-x-3.5 py-2 mb-3 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 ${
                        activeItem === item.name ? "bg-gray-100 dark:bg-neutral-700" : ""
                      }`}
                      href={item.href}
                      onClick={() => handleItemClick(item.name)}
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          
          {/* Account Info Section */}
          <footer className="p-4 border-t border-gray-200 dark:border-neutral-700">
            <AccountDropdown />
          </footer>
        </div>
      </aside>
    </>
  );
}