"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function AccountDropdown() {
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const creatorId = session?.user?.creatorId;
  const userImage =
    session?.user?.image ?? "https://www.gravatar.com/avatar/?d=mp";

  const dropDownItemStyle =
    "block px-4 py-2 text-sm text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer";
    
  return (
    <Menu>
      {({ open }) => ( // Get the open state from Menu render prop
        <div className="relative inline-block w-full">
          <MenuButton 
            className={`flex group w-full items-center gap-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-150 hover:cursor-pointer ${
              open ? "bg-gray-100 dark:bg-neutral-700" : ""
            }`}
          >
            <>
              <img
                className="w-8 h-8 rounded-full"
                src={userImage}
                alt="User avatar"
              />
              <div className="text-left flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {userName}
                </p>
              </div>
              <ChevronDownIcon
                className={`size-5 text-gray-500 dark:text-neutral-400 ${
                  open ? "rotate-180" : ""
                } transition-transform duration-150`}
              />
            </>
          </MenuButton>

          <MenuItems
            modal={false}
            transition
            className="
            absolute left-0 bottom-full mb-2 min-w-full 
            bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 z-50
            origin-bottom duration-150 ease-out data-closed:translate-y-2 data-closed:opacity-0 data-closed:scale-98"
          >
            {/* Options depending on user creator status */}
            {!creatorId && (
              <MenuItem as="a" href="/creator/setup" className={dropDownItemStyle}>
                Create on Ekstra
              </MenuItem>
            )}
            {creatorId && (
              <MenuItem 
                as="a" 
                href={`/creator/${creatorId}/dashboard`} 
                className={dropDownItemStyle}
              >
                Creator Dashboard
              </MenuItem>
            )}

            <MenuItem as="a" href="#" className={dropDownItemStyle}>
              Profile
            </MenuItem>
            <MenuItem as="a" href="#" className={dropDownItemStyle}>
              Settings
            </MenuItem>
            <MenuItem
              as="a"
              onClick={() => signOut({ redirectTo: "/" })}
              className={dropDownItemStyle}
            >
              Sign out
            </MenuItem>
          </MenuItems>
        </div>
      )}
    </Menu>
  );
}