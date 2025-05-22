import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  Users,
  ArrowRight,
  CheckCircle,
  Brain,
  LineChart,
  PenTool,
  FileText
} from 'lucide-react';

export default function Education() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('education.features.0.title'),
      description: t('education.features.0.description'),
      icon: ClipboardList,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: t('education.features.1.title'),
      description: t('education.features.1.description'),
      icon: Brain,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: t('education.features.2.title'),
      description: t('education.features.2.description'),
      icon: FileText,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: t('education.features.3.title'),
      description: t('education.features.3.description'),
      icon: LineChart,
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  const useCases = [
    {
      title: t('education.useCases.0.title'),
      description: t('education.useCases.0.description'),
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: t('education.useCases.1.title'),
      description: t('education.useCases.1.description'),
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: t('education.useCases.2.title'),
      description: t('education.useCases.2.description'),
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const benefits = [
    {
      title: t('education.benefits.0.title'),
      description: t('education.benefits.0.description'),
      icon: CheckCircle,
    },
    {
      title: t('education.benefits.1.title'),
      description: t('education.benefits.1.description'),
      icon: LineChart,
    },
    {
      title: t('education.benefits.2.title'),
      description: t('education.benefits.2.description'),
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center px-4 py-1 rounded-full text-sm font-almarai bg-indigo-500/20 text-white mb-6">
                <GraduationCap className="h-4 w-4 mr-2" />
                {t('education.hero.badge')}
              </div>
              <h1 className="text-4xl md:text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6">{t('education.hero.title')}</h1>
              <p className="text-xl mb-8 text-indigo-100">{t('education.hero.description')}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150">
                  {t('education.hero.ctaPrimary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/templates/education" className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10 transition duration-150">
                  {t('education.hero.ctaSecondary')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">{t('education.featuresTitle')}</h2>
            <p className="text-xl text-gray-600">{t('education.featuresSubtitle')}</p>
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

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-6">{t('education.benefitsTitle')}</h2>
              <div className="space-y-6">
                {benefits.map((item) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-indigo-100 rounded-lg">
                        <item.icon className="h-6 w-6 text-indigo-600" />
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
              <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Education Benefits" className="rounded-lg shadow-xl" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">{t('education.useCasesTitle')}</h2>
            <p className="text-xl text-gray-600">{t('education.useCasesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div key={useCase.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white">
                  <img src={useCase.image} alt={useCase.title} className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-almarai text-white mb-2">{useCase.title}</h3>
                    <p className="text-white/80">{useCase.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-white mb-4">{t('education.cta.title')}</h2>
            <p className="text-xl text-indigo-100 mb-8">{t('education.cta.subtitle')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150">
                {t('education.cta.ctaPrimary')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10 transition duration-150">
                {t('education.cta.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
