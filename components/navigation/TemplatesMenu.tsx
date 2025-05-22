import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FileText, ClipboardCheck, BrainCircuit, Users,
  Building2, GraduationCap, ChevronRight, Briefcase,
  Search, TrendingUp
} from 'lucide-react';

export function TemplatesMenu() {
  const { t } = useTranslation();

  const categories = [
    {
      key: 'customer_feedback',
      icon: Users,
      color: 'text-blue-600',
      bg: 'from-blue-50 to-blue-100',
      bgHover: 'from-blue-100 to-blue-200',
      count: 24,
      path: '/templates/customer-feedback',
    },
    {
      key: 'business_operations',
      icon: Building2,
      color: 'text-purple-600',
      bg: 'from-purple-50 to-purple-100',
      bgHover: 'from-purple-100 to-purple-200',
      count: 18,
      path: '/templates/business',
    },
    {
      key: 'education',
      icon: GraduationCap,
      color: 'text-green-600',
      bg: 'from-green-50 to-green-100',
      bgHover: 'from-green-100 to-green-200',
      count: 15,
      path: '/templates/education',
    },
  ];

  const popularTemplates = [
    {
      key: 'customer_satisfaction',
      category: 'customer_feedback',
      uses: '2.3k',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      key: 'job_application',
      category: 'hr',
      uses: '1.8k',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      key: 'event_registration',
      category: 'events',
      uses: '1.5k',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <>
      <div className="col-span-4">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('templates.search_placeholder')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <h3 className="text-xs font-almarai text-gray-500 uppercase tracking-wide mb-4">
          {t('templates.popular_categories')}
        </h3>
        <div className="space-y-5">
          {categories.map((category) => (
            <Link key={category.key} to={category.path} className="group block">
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${category.bg} group-hover:${category.bgHover}`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-almarai text-gray-900 group-hover:text-indigo-600">
                      {t(`templates.categories.${category.key}.title`)}
                    </p>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {t(`templates.categories.${category.key}.description`)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-5">
        <h3 className="text-xs font-almarai text-gray-500 uppercase tracking-wide mb-4">
          {t('templates.most_used')}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {popularTemplates.map((template) => (
            <Link
              key={template.key}
              to={`/templates/${template.key}`}
              className="group block"
            >
              <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-3">
                <img
                  src={template.image}
                  alt={t(`templates.popular.${template.key}.title`)}
                  className="object-cover transform group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-almarai bg-white/20 text-white">
                    {t(`templates.popular.${template.key}.category`)}
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-almarai text-gray-900 group-hover:text-indigo-600">
                {t(`templates.popular.${template.key}.title`)}
              </h4>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                {template.uses} {t('templates.uses')}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link
            to="/templates"
            className="inline-flex items-center text-sm font-almarai text-indigo-600 hover:text-indigo-500"
          >
            {t('templates.browse_all')}
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="col-span-3">
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-lg p-6">
          <h3 className="text-base font-almarai text-gray-900 mb-4">
            {t('templates.create.title')}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {t('templates.create.description')}
          </p>
          <div className="space-y-3">
            <Link to="/templates/create" className="block group">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-white/60 group-hover:bg-white">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-almarai text-gray-900 group-hover:text-indigo-600">
                    {t('templates.create.from_scratch')}
                  </p>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link to="/templates/ai-create" className="block group">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-white/60 group-hover:bg-white">
                  <BrainCircuit className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-almarai text-gray-900 group-hover:text-purple-600">
                    {t('templates.create.ai_generator')}
                  </p>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
