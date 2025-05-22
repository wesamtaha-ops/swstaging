import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Book, Users, Phone, GraduationCap, FileText,
  Newspaper, ChevronRight, PlayCircle, Download
} from 'lucide-react';

export function ResourcesMenu() {
  const { t } = useTranslation();

  const resources = [
    {
      key: 'docs',
      icon: Book,
      color: 'text-indigo-600',
      bg: 'from-indigo-50 to-indigo-100',
      bgHover: 'from-indigo-100 to-indigo-200',
      path: '/docs',
    },
    {
      key: 'contact',
      icon: Phone,
      color: 'text-green-600',
      bg: 'from-green-50 to-green-100',
      bgHover: 'from-green-100 to-green-200',
      path: '/contact',
    },
    {
      key: 'help',
      icon: GraduationCap,
      color: 'text-purple-600',
      bg: 'from-purple-50 to-purple-100',
      bgHover: 'from-purple-100 to-purple-200',
      path: '/help',
    },
  ];

  return (
    <>
      <div className="col-span-4">
        <h3 className="text-xs font-almarai text-gray-500 uppercase tracking-wide mb-4">
          {t('resources.learn_connect')}
        </h3>
        <div className="space-y-5">
          {resources.map((item) => (
            <Link key={item.key} to={item.path} className="group block">
              <div className="flex items-center">
                <div
                  className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${item.bg} group-hover:${item.bgHover}`}
                >
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-base font-almarai text-gray-900 group-hover:text-indigo-600">
                    {t(`resources.${item.key}.title`)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {t(`resources.${item.key}.description`)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-4">
        <h3 className="text-xs font-almarai text-gray-500 uppercase tracking-wide mb-4">
          {t('resources.featured')}
        </h3>
        <div className="grid grid-cols-1">
          <div className="relative group">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=225&q=80"
                alt={t('resources.webinar.title')}
                className="object-cover transform group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm font-almarai text-white">
                  {t('resources.webinar.title')}
                </p>
                <p className="mt-1 text-xs text-gray-300">
                  {t('resources.webinar.description')}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-4">
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-lg p-6">
          <h3 className="text-base font-almarai text-gray-900 mb-4">
            {t('resources.need_help')}
          </h3>
          <div className="space-y-4">
            <Link to="/contact" className="block group">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-white/60 group-hover:bg-white">
                  <Phone className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-almarai text-gray-900 group-hover:text-indigo-600">
                    {t('resources.contact_support')}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {t('resources.contact_description')}
                  </p>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
