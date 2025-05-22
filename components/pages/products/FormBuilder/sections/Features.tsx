import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MousePointerClick,
  LayoutTemplate,
  GitFork,
  Shield,
  Smartphone,
  Upload,
  Layers,
  CreditCard,
} from 'lucide-react';

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('features.items.dragDrop.title'),
      description: t('features.items.dragDrop.desc'),
      icon: MousePointerClick,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: t('features.items.templates.title'),
      description: t('features.items.templates.desc'),
      icon: LayoutTemplate,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: t('features.items.logic.title'),
      description: t('features.items.logic.desc'),
      icon: GitFork,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: t('features.items.security.title'),
      description: t('features.items.security.desc'),
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: t('features.items.responsive.title'),
      description: t('features.items.responsive.desc'),
      icon: Smartphone,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: t('features.items.uploads.title'),
      description: t('features.items.uploads.desc'),
      icon: Upload,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
    },
    {
      title: t('features.items.multiPage.title'),
      description: t('features.items.multiPage.desc'),
      icon: Layers,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: t('features.items.payments.title'),
      description: t('features.items.payments.desc'),
      icon: CreditCard,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-almarai leading-7 text-indigo-600">
            {t('features.title')}
          </h2>
          <p className="mt-2 text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-gray-900 sm:text-4xl">
            {t('features.headline')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('features.description')}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="group relative transform hover:-translate-y-1 transition-all duration-300">
                <div
                  className={`absolute -inset-1 rounded-lg ${feature.bgColor} opacity-25 blur transition duration-300 group-hover:opacity-50`}
                />
                <div className="relative flex flex-col gap-6 rounded-lg bg-white p-6 shadow-sm ring-1 ring-inset ring-gray-200">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor} ${feature.color}`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-lg font-almarai leading-7 text-gray-900">
                      {feature.title}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {feature.description}
                    </dd>
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
