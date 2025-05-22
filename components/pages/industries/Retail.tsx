import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShoppingBag,
  BarChart2,
  Users,
  ClipboardList,
  ArrowRight,
  Star,
  Truck,
  Store,
  Package,
  Smartphone,
  MessageSquare,
  Zap,
} from 'lucide-react';

export default function Retail() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('retail.features.0.title'),
      description: t('retail.features.0.description'),
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: t('retail.features.1.title'),
      description: t('retail.features.1.description'),
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: t('retail.features.2.title'),
      description: t('retail.features.2.description'),
      icon: ClipboardList,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: t('retail.features.3.title'),
      description: t('retail.features.3.description'),
      icon: Store,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const useCases = [
    {
      title: t('retail.useCases.0.title'),
      description: t('retail.useCases.0.description'),
      icon: Users,
      stats: t('retail.useCases.0.stats'),
    },
    {
      title: t('retail.useCases.1.title'),
      description: t('retail.useCases.1.description'),
      icon: Store,
      stats: t('retail.useCases.1.stats'),
    },
    {
      title: t('retail.useCases.2.title'),
      description: t('retail.useCases.2.description'),
      icon: Truck,
      stats: t('retail.useCases.2.stats'),
    },
  ];

  const mobileSolutions = [
    {
      title: t('retail.mobile.0.title'),
      description: t('retail.mobile.0.description'),
      icon: Smartphone,
    },
    {
      title: t('retail.mobile.1.title'),
      description: t('retail.mobile.1.description'),
      icon: MessageSquare,
    },
    {
      title: t('retail.mobile.2.title'),
      description: t('retail.mobile.2.description'),
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center px-4 py-1 rounded-full text-sm font-almarai bg-orange-500/20 text-white mb-6">
                <ShoppingBag className="h-4 w-4 mr-2" />
                {t('retail.hero.badge')}
              </div>
              <h1 className="text-4xl md:text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6">{t('retail.hero.title')}</h1>
              <p className="text-xl mb-8 text-orange-100">{t('retail.hero.description')}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-orange-600 bg-white hover:bg-orange-50 transition duration-150">
                  {t('retail.hero.ctaPrimary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/templates/retail" className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10 transition duration-150">
                  {t('retail.hero.ctaSecondary')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">{t('retail.featuresTitle')}</h2>
            <p className="text-xl text-gray-600">{t('retail.featuresSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className={`${feature.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-almarai text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Solutions */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-6">{t('retail.mobileTitle')}</h2>
              <div className="space-y-6">
                {mobileSolutions.map((item) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <item.icon className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-almarai text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Mobile Retail Solutions" className="rounded-lg shadow-xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">{t('retail.useCasesTitle')}</h2>
            <p className="text-xl text-gray-600">{t('retail.useCasesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div key={useCase.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <useCase.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-almarai text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="text-sm font-almarai text-orange-600">{useCase.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-white sm:text-4xl">{t('retail.analyticsTitle')}</h2>
                <p className="mt-4 text-lg text-orange-100">{t('retail.analyticsSubtitle')}</p>
              </div>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <Link to="/signup" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md text-orange-600 bg-white hover:bg-orange-50 transition duration-150">
                    {t('retail.analyticsCta')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
