import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Code, Layout, Zap, Database, Share2 } from 'lucide-react';

export function Benefits() {
  const { t } = useTranslation();

  const benefits = [
    {
      title: t('benefits.items.saveTime.title'),
      description: t('benefits.items.saveTime.desc'),
      icon: Clock,
    },
    {
      title: t('benefits.items.noCoding.title'),
      description: t('benefits.items.noCoding.desc'),
      icon: Code,
    },
    {
      title: t('benefits.items.design.title'),
      description: t('benefits.items.design.desc'),
      icon: Layout,
    },
    {
      title: t('benefits.items.ux.title'),
      description: t('benefits.items.ux.desc'),
      icon: Zap,
    },
    {
      title: t('benefits.items.data.title'),
      description: t('benefits.items.data.desc'),
      icon: Database,
    },
    {
      title: t('benefits.items.integration.title'),
      description: t('benefits.items.integration.desc'),
      icon: Share2,
    },
  ];

  return (
    <div className="py-24 bg-gray-50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-almarai leading-7 text-indigo-600">
            {t('benefits.title')}
          </h2>
          <p className="mt-2 text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-gray-900 sm:text-4xl">
            {t('benefits.headline')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('benefits.description')}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-indigo-500/25 to-purple-500/25 opacity-0 blur transition duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col items-start">
                  <div className="rounded-lg bg-white p-2 ring-1 ring-gray-900/10">
                    <benefit.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-almarai leading-8 tracking-tight text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
