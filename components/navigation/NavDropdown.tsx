import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface NavDropdownProps {
  title: string;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

export function NavDropdown({ title, isOpen, onMouseEnter, onMouseLeave, children }: NavDropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="group inline-flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-indigo-600">
        <span className="font-almarai">{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 group-hover:text-indigo-600 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/5 z-40"
              style={{ top: '64px' }} // Height of navbar
            />

            {/* Mega menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 w-screen bg-white border-t border-gray-100 shadow-xl z-50"
              style={{
                position: 'fixed',
                left: 0,
                right: 0,
                top: '64px' // Height of navbar
              }}
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-12 gap-8 py-8 px-4">
                  {children}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}