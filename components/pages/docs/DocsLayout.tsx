import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Book, FileText, Settings, Database, Code,
  Zap, Users, Lock, Globe, Search
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DocSection {
  title: string;
  icon: React.ElementType;
  items: {
    id: string;
    title: string;
    href: string;
  }[];
}

const DocsLayoutSections = (t: any): DocSection[] => [
  {
    title: t('docs.sections.getting_started.title'),
    icon: Book,
    items: [
      { id: 'introduction', title: t('docs.sections.getting_started.introduction'), href: '/docs/introduction' },
      { id: 'quickstart', title: t('docs.sections.getting_started.quickstart'), href: '/docs/quickstart' },
      { id: 'concepts', title: t('docs.sections.getting_started.concepts'), href: '/docs/concepts' }
    ],
  },
  {
    title: t('docs.sections.form_building.title'),
    icon: FileText,
    items: [
      { id: 'form-basics', title: t('docs.sections.form_building.form_basics'), href: '/docs/form-basics' },
      { id: 'question-types', title: t('docs.sections.form_building.question_types'), href: '/docs/question-types' },
      { id: 'logic-rules', title: t('docs.sections.form_building.logic_rules'), href: '/docs/logic-rules' },
      { id: 'validation', title: t('docs.sections.form_building.validation'), href: '/docs/validation' }
    ],
  },
  {
    title: t('docs.sections.ai.title'),
    icon: Zap,
    items: [
      { id: 'ai-forms', title: t('docs.sections.ai.ai_forms'), href: '/docs/ai-forms' },
      { id: 'ai-analysis', title: t('docs.sections.ai.ai_analysis'), href: '/docs/ai-analysis' },
      { id: 'ai-insights', title: t('docs.sections.ai.ai_insights'), href: '/docs/ai-insights' }
    ],
  },
  {
    title: t('docs.sections.data.title'),
    icon: Database,
    items: [
      { id: 'responses', title: t('docs.sections.data.responses'), href: '/docs/responses' },
      { id: 'analytics', title: t('docs.sections.data.analytics'), href: '/docs/analytics' },
      { id: 'exports', title: t('docs.sections.data.exports'), href: '/docs/exports' }
    ],
  },
  {
    title: t('docs.sections.integration.title'),
    icon: Code,
    items: [
      { id: 'api', title: t('docs.sections.integration.api'), href: '/docs/api' },
      { id: 'webhooks', title: t('docs.sections.integration.webhooks'), href: '/docs/webhooks' },
      { id: 'embed', title: t('docs.sections.integration.embed'), href: '/docs/embed' }
    ],
  },
  {
    title: t('docs.sections.security.title'),
    icon: Lock,
    items: [
      { id: 'security', title: t('docs.sections.security.security'), href: '/docs/security' },
      { id: 'privacy', title: t('docs.sections.security.privacy'), href: '/docs/privacy' },
      { id: 'compliance', title: t('docs.sections.security.compliance'), href: '/docs/compliance' }
    ],
  },
];

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const sections = DocsLayoutSections(t);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Search Header */}
      <div className='sticky top-0 z-10 bg-white border-b border-gray-200'>
        <div className='max-w-8xl mx-auto'>
          <div className='py-4 px-4 sm:px-6 lg:px-8'>
            <div className='relative max-w-md mx-auto'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
              <input
                type='text'
                placeholder={t('docs.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex'>
          {/* Sidebar */}
          <div className='hidden lg:block fixed lg:flex-shrink-0'>
            <div className='h-[calc(100vh-4rem)] w-64 overflow-y-auto py-6 pr-8'>
              <nav className='space-y-8'>
                {sections.map((section) => (
                  <div key={section.title}>
                    <div className='flex items-center mb-3'>
                      <section.icon className='h-5 w-5 text-gray-400' />
                      <h5 className='ml-2 text-sm font-almarai text-gray-900'>
                        {section.title}
                      </h5>
                    </div>
                    <ul className='space-y-2'>
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={item.href}
                            className={`block px-3 py-2 text-sm rounded-md ${location.pathname === item.href
                              ? 'bg-indigo-50 text-indigo-600'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:pl-72'>
            <div className='max-w-3xl mx-auto pt-10 pb-16'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
