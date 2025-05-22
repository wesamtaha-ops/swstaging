import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, ChevronRight } from 'lucide-react';
import { useCookieConsent } from './CookieConsentProvider';

export function CookieConsentBanner() {
  const {
    isVisible,
    acceptAll,
    rejectAll,
    openPreferences,
    dismiss
  } = useCookieConsent();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Cookie className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-base text-gray-900">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                </p>
                <button
                  onClick={openPreferences}
                  className="inline-flex items-center mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Cookie Settings
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <button
                onClick={rejectAll}
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Accept All
              </button>
            </div>
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 md:static md:ml-4"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}