import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShieldCheck, Settings, Users, BarChart, ArrowRight } from 'lucide-react';

export default function Enterprise() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('enterprise.features.0.title'),
      description: t('enterprise.features.0.description'),
      icon: ShieldCheck,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: t('enterprise.features.1.title'),
      description: t('enterprise.features.1.description'),
      icon: Settings,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: t('enterprise.features.2.title'),
      description: t('enterprise.features.2.description'),
      icon: Users,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: t('enterprise.features.3.title'),
      description: t('enterprise.features.3.description'),
      icon: BarChart,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-24 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-almarai bg-white/10 mb-6">
            {t('enterprise.hero.badge')}
          </div>
          <h1 className="text-4xl md:text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6">{t('enterprise.hero.title')}</h1>
          <p className="text-xl mb-8 text-white/90">{t('enterprise.hero.description')}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50">
              {t('enterprise.hero.ctaPrimary')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10">
              {t('enterprise.hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">{t('enterprise.featuresTitle')}</h2>
            <p className="text-xl text-gray-600">{t('enterprise.featuresSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

      <div className="bg-indigo-50 py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">{t('enterprise.cta.title')}</h2>
          <p className="text-xl text-gray-600 mb-8">{t('enterprise.cta.subtitle')}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              {t('enterprise.cta.ctaPrimary')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center px-6 py-3 border border-indigo-600 text-base font-almarai rounded-md text-indigo-600 hover:bg-indigo-100">
              {t('enterprise.cta.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
