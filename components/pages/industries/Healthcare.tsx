import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HeartPulse,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  Lock,
  UserCheck,
  ArrowRight,
} from 'lucide-react';

export default function Healthcare() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('healthcare.features.0.title'),
      description: t('healthcare.features.0.description'),
      icon: ShieldCheck,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: t('healthcare.features.1.title'),
      description: t('healthcare.features.1.description'),
      icon: FileText,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: t('healthcare.features.2.title'),
      description: t('healthcare.features.2.description'),
      icon: ClipboardCheck,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: t('healthcare.features.3.title'),
      description: t('healthcare.features.3.description'),
      icon: HeartPulse,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const security = [
    {
      title: t('healthcare.security.0.title'),
      description: t('healthcare.security.0.description'),
      icon: ShieldCheck,
    },
    {
      title: t('healthcare.security.1.title'),
      description: t('healthcare.security.1.description'),
      icon: Lock,
    },
    {
      title: t('healthcare.security.2.title'),
      description: t('healthcare.security.2.description'),
      icon: UserCheck,
    },
  ];

  const useCases = [
    {
      title: t('healthcare.useCases.0.title'),
      description: t('healthcare.useCases.0.description'),
    },
    {
      title: t('healthcare.useCases.1.title'),
      description: t('healthcare.useCases.1.description'),
    },
    {
      title: t('healthcare.useCases.2.title'),
      description: t('healthcare.useCases.2.description'),
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-almarai bg-white/10 text-white mb-6">
            {t('healthcare.hero.badge')}
          </div>
          <h1 className="text-4xl md:text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6">{t('healthcare.hero.title')}</h1>
          <p className="text-xl mb-8 text-white/90">{t('healthcare.hero.description')}</p>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50">
              {t('healthcare.hero.ctaPrimary')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/templates/healthcare" className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10">
              {t('healthcare.hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>

      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">{t('healthcare.featuresTitle')}</h2>
            <p className="text-xl text-gray-600">{t('healthcare.featuresSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md">
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

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">{t('healthcare.securityTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {security.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-almarai text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">{t('healthcare.useCasesTitle')}</h2>
            <p className="text-xl text-gray-600">{t('healthcare.useCasesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-almarai text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-white sm:text-4xl">{t('healthcare.cta.title')}</h2>
                <p className="mt-4 text-lg text-blue-100">{t('healthcare.cta.subtitle')}</p>
              </div>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <Link to="/signup" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md text-blue-600 bg-white hover:bg-blue-50 transition duration-150">
                    {t('healthcare.cta.ctaPrimary')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="ml-4 inline-flex rounded-md shadow">
                  <Link to="/contact" className="inline-flex items-center px-6 py-3 border border-white text-base font-almarai rounded-md text-white bg-transparent hover:bg-white/10 transition duration-150">
                    {t('healthcare.cta.ctaSecondary')}
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
