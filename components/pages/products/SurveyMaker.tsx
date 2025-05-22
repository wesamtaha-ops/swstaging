import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BarChart2,
  Sparkles,
  Globe,
  Shield,
  Users,
  ArrowRight,
  Layout,
  PieChart,
  FileText,
} from 'lucide-react';

export default function SurveyMaker() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('surveyMaker.featuresSection.features.0.title'),
      description: t('surveyMaker.featuresSection.features.0.description'),
      icon: Sparkles,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: t('surveyMaker.featuresSection.features.1.title'),
      description: t('surveyMaker.featuresSection.features.1.description'),
      icon: BarChart2,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: t('surveyMaker.featuresSection.features.2.title'),
      description: t('surveyMaker.featuresSection.features.2.description'),
      icon: Globe,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: t('surveyMaker.featuresSection.features.3.title'),
      description: t('surveyMaker.featuresSection.features.3.description'),
      icon: Shield,
      color: 'bg-red-100 text-red-600',
    },
  ];

  const steps = [
    {
      title: t('surveyMaker.stepsSection.steps.0.title'),
      description: t('surveyMaker.stepsSection.steps.0.description'),
      icon: Layout,
    },
    {
      title: t('surveyMaker.stepsSection.steps.1.title'),
      description: t('surveyMaker.stepsSection.steps.1.description'),
      icon: FileText,
    },
    {
      title: t('surveyMaker.stepsSection.steps.2.title'),
      description: t('surveyMaker.stepsSection.steps.2.description'),
      icon: Users,
    },
    {
      title: t('surveyMaker.stepsSection.steps.3.title'),
      description: t('surveyMaker.stepsSection.steps.3.description'),
      icon: PieChart,
    },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]' />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className='text-4xl md:text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6'>{t('surveyMaker.hero.title')}</h1>
              <p className='text-xl mb-8 text-white/90'>{t('surveyMaker.hero.description')}</p>
              <div className='flex flex-wrap gap-4'>
                <Link to='/signup' className='inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150'>
                  {t('surveyMaker.hero.ctaPrimary')} <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
                <Link to='/templates' className='inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10 transition duration-150'>
                  {t('surveyMaker.hero.ctaSecondary')}
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className='relative'>
              <div className='bg-white/10 backdrop-blur-xl rounded-xl p-8 shadow-2xl'>
                <img src='https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' alt='Survey Creator Interface' className='rounded-lg shadow-lg' />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='py-24 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4'>{t('surveyMaker.featuresSection.title')}</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>{t('surveyMaker.featuresSection.subtitle')}</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className='bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'>
                <div className={`${feature.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                  <feature.icon className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-almarai text-gray-900 mb-2'>{feature.title}</h3>
                <p className='text-gray-600'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className='py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4'>{t('surveyMaker.stepsSection.title')}</h2>
            <p className='text-xl text-gray-600'>{t('surveyMaker.stepsSection.subtitle')}</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {steps.map((step, index) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className='relative'>
                <div className='bg-white rounded-xl p-8 shadow-sm relative z-10'>
                  <div className='bg-indigo-50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4'>
                    <step.icon className='h-6 w-6 text-indigo-600' />
                  </div>
                  <h3 className='text-xl font-almarai text-gray-900 mb-2'>{step.title}</h3>
                  <p className='text-gray-600'>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-indigo-600 py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-white mb-4'>{t('surveyMaker.ctaSection.title')}</h2>
            <p className='text-xl text-indigo-100 mb-8'>{t('surveyMaker.ctaSection.subtitle')}</p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Link to='/signup' className='inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150'>
                {t('surveyMaker.ctaSection.ctaPrimary')}
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
              <Link to='/contact' className='inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10 transition duration-150'>
                {t('surveyMaker.ctaSection.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
