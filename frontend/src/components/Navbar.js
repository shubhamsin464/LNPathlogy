"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Health Packages', path: '/packages' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[var(--primary)]">L.N.</span>
              <span className="text-2xl font-bold text-[var(--secondary)] ml-1">Pathology</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className="text-gray-700 hover:text-[var(--primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/reports" 
              className="text-sm font-medium text-[var(--primary)] border border-[var(--primary)] px-4 py-2 rounded-full hover:bg-[var(--primary)] hover:text-white transition-all"
            >
              Download Reports
            </Link>
            <a 
              href="tel:+918815832425" 
              className="flex items-center text-sm font-medium bg-[var(--secondary)] text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all shadow-md"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[var(--primary)] hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[var(--primary)] hover:bg-gray-50"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/reports"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[var(--primary)] hover:bg-blue-50"
              >
                Download Reports
              </Link>
              <a
                href="tel:+918815832425"
                className="block px-3 py-2 rounded-md text-base font-medium text-[var(--secondary)] hover:bg-green-50"
              >
                Call Now (+91 88158 32425)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
