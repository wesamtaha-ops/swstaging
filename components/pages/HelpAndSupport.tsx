import React, { useState } from 'react';
import {
  Search, Book, MessageCircle, Phone,
  ChevronRight, ExternalLink, Mail,
  Zap, Shield, Brain, Sparkles, Code,
  Database, Globe, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const HelpAndSupport = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const translateCategory = (category: string) => {
    switch (category) {
      case 'Getting Started':
        return t('help.categories.getting_started');
      case 'Data Export':
        return t('help.categories.export');
      case 'Sharing':
        return t('help.categories.share');
      default:
        return category;
    }
  };

  const guides = [
    {
      title: t('help.guides.getting_started.title'),
      description: t('help.guides.getting_started.desc'),
      icon: Book,
      link: '/docs/getting-started',
      category: 'Basics'
    },
    {
      title: t('help.guides.form_logic.title'),
      description: t('help.guides.form_logic.desc'),
      icon: Brain,
      link: '/docs/form-logic',
      category: 'Advanced'
    },
    {
      title: t('help.guides.analytics.title'),
      description: t('help.guides.analytics.desc'),
      icon: Database,
      link: '/docs/analytics',
      category: 'Analytics'
    },
    {
      title: t('help.guides.ai_features.title'),
      description: t('help.guides.ai_features.desc'),
      icon: Sparkles,
      link: '/docs/ai-features',
      category: 'Advanced'
    },
    {
      title: t('help.guides.api.title'),
      description: t('help.guides.api.desc'),
      icon: Code,
      link: '/docs/api',
      category: 'Development'
    },
    {
      title: t('help.guides.collaboration.title'),
      description: t('help.guides.collaboration.desc'),
      icon: Users,
      link: '/docs/collaboration',
      category: 'Teams'
    }
  ];

  const faqs = [
    {
      question: t('help.faqs.first.question'),
      answer: t('help.faqs.first.answer'),
      category: 'Getting Started'
    },
    {
      question: t('help.faqs.export.question'),
      answer: t('help.faqs.export.answer'),
      category: 'Data Export'
    },
    {
      question: t('help.faqs.share.question'),
      answer: t('help.faqs.share.answer'),
      category: 'Sharing'
    }
  ];

  const filteredGuides = guides.filter(
    (g) =>
      (selectedCategory === 'all' || g.category === selectedCategory) &&
      (g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFaqs = faqs.filter(
    (f) =>
      (selectedCategory === 'all' || f.category === selectedCategory) &&
      (f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-lg mb-4">
            <Zap className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-4xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">{t('help.hero.title')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('help.hero.subtitle')}</p>
        </motion.div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('help.search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Quick Links */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              title: t('help.quick_links.documentation.title'),
              description: t('help.quick_links.documentation.desc'),
              icon: Book,
              action: t('help.quick_links.documentation.action'),
              link: '/docs',
              color: 'bg-blue-50 text-blue-600'
            },
            {
              title: t('help.quick_links.chat.title'),
              description: t('help.quick_links.chat.desc'),
              icon: MessageCircle,
              action: t('help.quick_links.chat.action'),
              onClick: () => console.log('Start chat'),
              color: 'bg-green-50 text-green-600'
            },
            {
              title: t('help.quick_links.support.title'),
              description: t('help.quick_links.support.desc'),
              icon: Shield,
              action: t('help.quick_links.support.action'),
              onClick: () => console.log('Contact support'),
              color: 'bg-purple-50 text-purple-600'
            }
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="ml-4 text-xl font-almarai text-gray-900">{item.title}</h2>
              </div>
              <p className="text-gray-600 mb-6">{item.description}</p>
              {item.link ? (
                <a href={item.link} className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-almarai">
                  {item.action}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              ) : (
                <button onClick={item.onClick} className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-almarai">
                  {item.action}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Popular Guides */}
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className="mb-16">
          <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-8">{t('help.popular_guides')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <motion.a key={guide.title} href={guide.link} variants={fadeInUp}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <guide.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="ml-4 text-lg font-almarai text-gray-900">{guide.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <div className="flex items-center text-indigo-600 font-almarai">
                  {t('help.learn_more')}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className="mb-16">
          <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-8">{t('help.faq_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFaqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-almarai text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 mb-4">{faq.answer}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-almarai bg-indigo-50 text-indigo-600">
                  {translateCategory(faq.category)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeInUp}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai mb-6">{t('help.contact.title')}</h2>
            <p className="text-xl mb-10 text-white/90">{t('help.contact.desc')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="mailto:support@formify.com" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-indigo-600 font-almarai hover:bg-opacity-90 transition-colors duration-200">
                <Mail className="h-5 w-5 mr-2" />
                {t('help.contact.email')}
              </a>
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-500 text-white font-almarai hover:bg-indigo-400 transition-colors duration-200">
                <MessageCircle className="h-5 w-5 mr-2" />
                {t('help.contact.chat')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
