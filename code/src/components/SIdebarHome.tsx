'use client';

import { useState, useRef, useEffect, type SetStateAction } from 'react';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import MobileSidebarHome from './MobileSidebarHome';

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
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside both the dropdown and the button
      if (isAccountDropdownOpen && 
          dropdownRef.current && 
          !dropdownRef.current.contains(event.target as Node) && 
          buttonRef.current && 
          !buttonRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountDropdownOpen]);

  const menuItems = [
    {
      name: "Home",
      icon: (
        <svg
          className="size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      href: "#"
    },
    {
      name: "Calendar",
      icon: (
        <svg
          className="size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M16 14h.01" />
          <path d="M8 18h.01" />
          <path d="M12 18h.01" />
          <path d="M16 18h.01" />
        </svg>
      ),
      href: "#"
    },
    {
      name: "Documentation",
      icon: (
        <svg
          className="size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      href: "#"
    }
  ];

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
                      className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 ${
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
            <div className="relative">
              <button 
                ref={buttonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAccountDropdownOpen(!isAccountDropdownOpen);
                }}
                className="w-full flex items-center gap-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200 hover:cursor-pointer"
                aria-expanded={isAccountDropdownOpen}
                aria-label="Account menu"
              >
                <img 
                  className="w-8 h-8 rounded-full" 
                  src={userImage} 
                  alt="User avatar"
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">{userName}</p>
                </div>
                <svg 
                  className={`ml-auto h-4 w-4 text-gray-500 dark:text-neutral-400 transition-transform duration-200 ${
                    isAccountDropdownOpen ? 'rotate-180' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m7 15 5 5 5-5"/>
                  <path d="m7 9 5-5 5 5"/>
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isAccountDropdownOpen && (
                <div ref={dropdownRef} className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden z-10">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  >
                    Profile
                  </a>
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  >
                    Settings
                  </a>

                  <a
                    onClick={() => signOut({ redirectTo: "/" })}
                    className="block px-4 py-2 text-sm text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 hover:cursor-pointer"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </footer>
        </div>
      </aside>
    </>
  );
}