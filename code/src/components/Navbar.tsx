'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Getting Started', href: '#gettingstarted' },
    { name: 'Login', href: '/login' },
  ];

  return (
    <nav className="bg-black shadow-lg absolute w-full top-0 z-50 h-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-white">Ekstra</a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-white 
                       border-2 border-white hover:bg-white hover:text-black 
                       transition-all duration-300 transform hover:scale-105"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button - updated to match dark theme */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full 
                         text-white hover:bg-white hover:text-black
                         focus:outline-none transition-all duration-300"
            >
              {isOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - updated to match desktop styles */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-600">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-full text-base font-medium text-white 
                          border-2 border-white hover:bg-white hover:text-black
                          transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;