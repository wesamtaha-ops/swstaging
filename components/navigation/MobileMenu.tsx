import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, FormInput, FileText, BrainCircuit,
  BarChart2, Zap, Settings, Stethoscope, GraduationCap,
  Building2, BookOpen, Users, Phone, Search, TrendingUp,
  ClipboardCheck, Building, ShoppingBag, Globe, ArrowRight,
  Gift, Home, HelpCircle
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onLogout: () => void;
}

export function MobileMenu({ isOpen, onClose, user, onLogout }: MobileMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = {
    products: [
      { icon: FormInput, title: 'Form Builder', description: 'Create beautiful forms', path: '/products/form-builder' },
      { icon: FileText, title: 'Survey Maker', description: 'Design surveys', path: '/products/survey-maker' },
      { icon: BrainCircuit, title: 'AI Forms', description: 'AI-powered creation', path: '/products/ai-forms' },
    ],
    industries: [
      { icon: Stethoscope, title: 'Healthcare', description: 'HIPAA compliant forms', path: '/industries/healthcare' },
      { icon: GraduationCap, title: 'Education', description: 'Academic solutions', path: '/industries/education' },
      { icon: Building2, title: 'Enterprise', description: 'Large scale forms', path: '/industries/enterprise' },
      { icon: Building, title: 'Real Estate', description: 'Property management', path: '/industries/real-estate' },
      { icon: ShoppingBag, title: 'Retail', description: 'Customer feedback', path: '/industries/retail' },
      { icon: Globe, title: 'Non-Profit', description: 'Donation forms', path: '/industries/non-profit' },
    ],
    templates: [
      {
        icon: ClipboardCheck,
        title: 'Customer Feedback',
        description: 'Surveys and feedback forms',
        path: '/templates/customer-feedback',
        count: '2.3k uses'
      },
      {
        icon: Users,
        title: 'Job Applications',
        description: 'Hiring and recruitment',
        path: '/templates/job-applications',
        count: '1.8k uses'
      },
      {
        icon: Building2,
        title: 'Event Registration',
        description: 'Event management forms',
        path: '/templates/event-registration',
        count: '1.5k uses'
      },
      {
        icon: GraduationCap,
        title: 'Education Forms',
        description: 'Learning and assessment',
        path: '/templates/education',
        count: '1.2k uses'
      },
    ],
    resources: [
      { icon: BookOpen, title: 'Documentation', description: 'Learn how to use', path: '/docs' },
      { icon: Users, title: 'Community', description: 'Join the discussion', path: '/community' },
      { icon: Phone, title: 'Support', description: 'Get help', path: '/support' },
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center" onClick={onClose}>
                  <img
                    src="https://votly.app/public/web/wp-content/themes/Votly-logo-colored.png"
                    alt="Votly"
                    className="h-8"
                  />
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="px-4 py-6 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates, forms, resources..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* User Info (if logged in) */}
              {user && (
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-almarai text-lg">
                      W
                    </div>
                    <div>
                      <p className="text-sm font-almarai text-gray-900">{user.name || 'User'}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Expandable Sections */}
              {Object.entries(sections).map(([key, items]) => (
                <div key={key} className="space-y-2">
                  <button
                    onClick={() => setOpenSection(openSection === key ? null : key)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="text-base font-almarai text-gray-900 capitalize">
                      {key}
                    </span>
                    <ChevronRight
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${openSection === key ? 'rotate-90' : ''
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openSection === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pl-4">
                          {items.map((item) => (
                            <Link
                              key={item.title}
                              to={item.path}
                              onClick={onClose}
                              className="flex items-center py-3 group"
                            >
                              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-50 group-hover:bg-indigo-100">
                                <item.icon className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div className="ml-4 flex-1">
                                <p className="text-base font-almarai text-gray-900 group-hover:text-indigo-600">
                                  {item.title}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.description}
                                </p>
                                {'count' in item && (
                                  <div className="mt-1 flex items-center text-xs text-gray-500">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {item.count}
                                  </div>
                                )}
                              </div>
                              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                            </Link>
                          ))}
                          {key === 'templates' && (
                            <Link
                              to="/templates"
                              onClick={onClose}
                              className="flex items-center justify-between py-3 text-sm font-almarai text-indigo-600 hover:text-indigo-500"
                            >
                              View all templates
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Additional Links */}
              {user && (
                <>
                  <Link
                    to="/refer"
                    onClick={onClose}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Gift className="h-5 w-5 mr-3 text-indigo-600" />
                    Refer friends, get rewards
                    <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                  </Link>
                  <Link
                    to="/support"
                    onClick={onClose}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <HelpCircle className="h-5 w-5 mr-3 text-indigo-600" />
                    Support
                  </Link>
                  <Link
                    to="/"
                    onClick={onClose}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Home className="h-5 w-5 mr-3 text-indigo-600" />
                    Homepage
                  </Link>
                </>
              )}

              {/* Auth Actions */}
              <div className="pt-6 border-t border-gray-200">
                {user ? (
                  <div className="space-y-4">
                    <Link
                      to="/dashboard"
                      onClick={onClose}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Go to App
                    </Link>
                    <button
                      onClick={() => {
                        onLogout();
                        onClose();
                      }}
                      className="w-full text-center px-4 py-2 text-sm font-almarai text-gray-700 hover:text-indigo-600"
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      to="/signup"
                      onClick={onClose}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      onClick={onClose}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}