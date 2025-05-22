import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Brain,
  Sparkles,
  Zap,
  BarChart2,
  MessageSquare,
  Lightbulb,
  ArrowRight,
  Wand2,
  Target,
  LineChart,
  Bot,
  CheckCircle,
} from 'lucide-react';

export default function AIForms() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('aiForms.features.0.title'),
      description: t('aiForms.features.0.description'),
      icon: Brain,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: t('aiForms.features.1.title'),
      description: t('aiForms.features.1.description'),
      icon: Lightbulb,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      title: t('aiForms.features.2.title'),
      description: t('aiForms.features.2.description'),
      icon: BarChart2,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: t('aiForms.features.3.title'),
      description: t('aiForms.features.3.description'),
      icon: MessageSquare,
      color: 'bg-green-100 text-green-600',
    },
  ];

  const useCases = [
    {
      title: t('aiForms.useCases.0.title'),
      description: t('aiForms.useCases.0.description'),
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: t('aiForms.useCases.1.title'),
      description: t('aiForms.useCases.1.description'),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: t('aiForms.useCases.2.title'),
      description: t('aiForms.useCases.2.description'),
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  const aiAnalysis = [
    {
      title: t('aiForms.analysis.0.title'),
      description: t('aiForms.analysis.0.description'),
      icon: Target,
    },
    {
      title: t('aiForms.analysis.1.title'),
      description: t('aiForms.analysis.1.description'),
      icon: LineChart,
    },
    {
      title: t('aiForms.analysis.2.title'),
      description: t('aiForms.analysis.2.description'),
      icon: Lightbulb,
    },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAzNGgxMnYxMkgzNnpNMTIgMzRoMTJ2MTJIMTIiLz48L2c+PC9nPjwvc3ZnPg==")] opacity-30' />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className='inline-flex items-center px-3 py-1 rounded-full text-sm font-almarai bg-white/10 text-white mb-6'>
                <Sparkles className='h-4 w-4 mr-2' />
                {t('aiForms.hero.badge')}
              </div>
              <h1 className='text-4xl md:text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6'>{t('aiForms.hero.title')}</h1>
              <p className='text-xl mb-8 text-white/90'>{t('aiForms.hero.description')}</p>
              <div className='flex flex-wrap gap-4'>
                <Link to='/forms/ai-create' className='inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-violet-600 bg-white hover:bg-violet-50 transition duration-150'>
                  {t('aiForms.hero.ctaPrimary')} <Wand2 className='ml-2 h-5 w-5' />
                </Link>
                <Link to='/templates' className='inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10 transition duration-150'>
                  {t('aiForms.hero.ctaSecondary')}
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className='relative'>
              <div className='bg-white/10 backdrop-blur-xl rounded-xl p-8 shadow-2xl'>
                <div className='relative aspect-video rounded-lg overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20' />
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='space-y-4 w-full max-w-md p-6'>
                      <div className='flex items-center space-x-4'>
                        <Bot className='h-8 w-8 text-white' />
                        <div className='flex-1 bg-white/10 backdrop-blur rounded-lg p-4'>
                          <p className='text-sm text-white/90'>{t('aiForms.hero.example')}</p>
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <div className='h-2 bg-white/20 rounded-full w-3/4 animate-pulse' />
                        <div className='h-2 bg-white/20 rounded-full w-1/2 animate-pulse delay-75' />
                        <div className='h-2 bg-white/20 rounded-full w-5/6 animate-pulse delay-150' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='py-24 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4'>{t('aiForms.featuresTitle')}</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>{t('aiForms.featuresSubtitle')}</p>
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

      {/* Use Cases Section */}
      <div className='py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4'>{t('aiForms.useCasesTitle')}</h2>
            <p className='text-xl text-gray-600'>{t('aiForms.useCasesSubtitle')}</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {useCases.map((useCase, index) => (
              <motion.div key={useCase.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className='group relative'>
                <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white'>
                  <img src={useCase.image} alt={useCase.title} className='h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105' />
                  <div className='absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent' />
                  <div className='absolute bottom-0 left-0 right-0 p-6'>
                    <h3 className='text-xl font-almarai text-white mb-2'>{useCase.title}</h3>
                    <p className='text-white/80'>{useCase.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className='bg-gray-50 py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-6'>{t('aiForms.analysisTitle')}</h2>
              <div className='space-y-6'>
                {aiAnalysis.map((item) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className='flex items-start space-x-4'>
                    <div className='flex-shrink-0'>
                      <div className='p-3 bg-indigo-100 rounded-lg'>
                        <item.icon className='h-6 w-6 text-indigo-600' />
                      </div>
                    </div>
                    <div>
                      <h3 className='text-xl font-almarai text-gray-900 mb-1'>{item.title}</h3>
                      <p className='text-gray-600'>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className='relative'>
              <div className='bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-1'>
                <div className='bg-white rounded-xl p-8'>
                  <div className='space-y-6'>
                    <div className='flex items-center justify-between'>
                      <h4 className='text-lg font-almarai text-gray-900'>{t('aiForms.analysisCard.title')}</h4>
                      <span className='px-3 py-1 text-sm text-indigo-600 bg-indigo-50 rounded-full'>{t('aiForms.analysisCard.badge')}</span>
                    </div>
                    <div className='space-y-4'>
                      <div className='p-4 bg-gray-50 rounded-lg'>
                        <div className='flex items-center justify-between mb-2'>
                          <span className='text-sm font-almarai text-gray-700'>{t('aiForms.analysisCard.score')}</span>
                          <span className='text-sm font-almarai text-green-600'>85%</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2'>
                          <div className='bg-green-500 h-2 rounded-full' style={{ width: '85%' }} />
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                          <div className='text-2xl   font-bold font-almarai font-almarai  font-almarai text-indigo-600 mb-1'>127</div>
                          <div className='text-sm text-gray-600'>{t('aiForms.analysisCard.responses')}</div>
                        </div>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                          <div className='text-2xl   font-bold font-almarai font-almarai  font-almarai text-green-600 mb-1'>92%</div>
                          <div className='text-sm text-gray-600'>{t('aiForms.analysisCard.completion')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-white py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden'>
            <div className='px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between'>
              <div>
                <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-white sm:text-4xl'>{t('aiForms.cta.title')}</h2>
                <p className='mt-4 text-lg text-indigo-100'>{t('aiForms.cta.subtitle')}</p>
              </div>
              <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
                <div className='inline-flex rounded-md shadow'>
                  <Link to='/signup' className='inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150'>
                    {t('aiForms.cta.ctaPrimary')} <ArrowRight className='ml-2 h-5 w-5' />
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
