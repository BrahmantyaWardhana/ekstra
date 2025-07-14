"use client";

import { useState, type ReactElement, type ReactNode, type SetStateAction } from "react";
import MobileSidebar from "./MobileSidebar";

interface MenuItem {
    name: string;
    icon: ReactElement;
    href: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  accountDropdown?: ReactNode;
}

export default function Sidebar({ menuItems, accountDropdown } : SidebarProps) {
  const [activeItem, setActiveItem] = useState(menuItems[0]?.name || "");

  const handleItemClick = (itemName: SetStateAction<string>) => {
    setActiveItem(itemName);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <MobileSidebar 
        menuItems={menuItems}
        accountDropdown={accountDropdown}
      />

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white border-e border-gray-200 
                  dark:bg-neutral-800 dark:border-neutral-700 z-50"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full">
          <header className="p-4 mt-1 ml-1 flex justify-between items-center gap-x-2">
            <a
              className="flex-none font-semibold text-xl text-black dark:text-white"
              href="#"
              aria-label="Brand"
            >
              Ekstra
            </a>
          </header>

          <nav className="flex-1 overflow-y-auto">
            <div className="p-2 w-full flex flex-col flex-wrap">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a
                      className={`w-full flex items-center gap-x-3.5 p-2.5 text-base rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 ${
                        activeItem === item.name
                          ? "bg-gray-100 dark:bg-neutral-700"
                          : ""
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
            {accountDropdown}
          </footer>
        </div>
      </aside>
    </>
  );
}