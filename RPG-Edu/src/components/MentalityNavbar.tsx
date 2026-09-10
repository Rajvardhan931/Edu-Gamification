import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function MentalityNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    "service",
    "patient resources",
    "about us",
    "education center"
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 md:py-10 bg-gradient-to-b from-[#f1f1f1]/80 to-transparent backdrop-blur-[2px]">
      <div className="grid grid-cols-12 max-w-7xl mx-auto px-4 md:px-8 items-center">
        {/* Left: Brand */}
        <div className="col-span-8 md:col-span-3 flex items-center space-x-2">
          {/* Geometric Clover SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C9.23858 2 7 4.23858 7 7C7 8.01255 7.30154 8.95475 7.82079 9.74235C6.18522 9.07659 4.19539 9.47954 3.01168 11.0287C1.65702 12.8021 1.99611 15.3418 3.76957 16.6965C4.78904 17.4751 6.13612 17.6534 7.31168 17.2797C6.73235 18.8252 7.0782 20.6729 8.3517 21.8485C9.89725 23.2758 12.3551 23.1812 13.8447 21.6366C14.7796 20.6675 15.1102 19.3093 14.7876 18.0673C16.3114 18.7303 18.2721 18.3752 19.4678 16.8906C20.8927 15.1213 20.6128 12.5332 18.8436 11.1084C17.756 10.232 16.2952 10.0215 15.0396 10.4578C15.6514 8.92482 15.334 7.08639 14.0536 5.89531C12.5401 4.48834 10.1585 4.54924 8.72124 6.03102" fill="#1a1a1a"/>
            <circle cx="12" cy="12" r="4" fill="#1a1a1a" />
          </svg>
          <span className="font-display font-semibold text-2xl tracking-tight text-[#1a1a1a]">mėntality</span>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex col-span-5 justify-center space-x-6">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-xs font-medium lowercase text-zinc-600 hover:text-black transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex col-span-4 justify-end items-center space-x-6">
          <a href="#" className="text-sm font-medium text-[#1a1a1a] hover:opacity-70 transition-opacity">
            find help
          </a>
          <Link href="/dashboard" className="bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 transition-colors flex items-center space-x-1">
            <span>get started</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden col-span-4 flex justify-end">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-[#1a1a1a] focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#f1f1f1]/95 backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col items-center py-6 space-y-4">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-sm font-medium lowercase text-[#1a1a1a]">
                  {link}
                </a>
              ))}
              <div className="w-full h-px bg-black/10 my-4" />
              <a href="#" className="text-sm font-medium text-[#1a1a1a]">find help</a>
              <Link href="/dashboard" className="bg-[#1a1a1a] text-white px-6 py-3 rounded-full text-sm font-medium">
                get started &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
