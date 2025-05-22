import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Phone,
  MessageSquare,
  Calendar,
  Briefcase,
  ShoppingCart,
  BookOpen
} from 'lucide-react';

export function UseCases() {
  const { t } = useTranslation();

  const useCases = [
    {
      title: t('useCases.items.contact.title'),
      description: t('useCases.items.contact.desc'),
      icon: Phone,
    },
    {
      title: t('useCases.items.feedback.title'),
      description: t('useCases.items.feedback.desc'),
      icon: MessageSquare,
    },
    {
      title: t('useCases.items.registration.title'),
      description: t('useCases.items.registration.desc'),
      icon: Calendar,
    },
    {
      title: t('useCases.items.application.title'),
      description: t('useCases.items.application.desc'),
      icon: Briefcase,
    },
    {
      title: t('useCases.items.order.title'),
      description: t('useCases.items.order.desc'),
      icon: ShoppingCart,
    },
    {
      title: t('useCases.items.education.title'),
      description: t('useCases.items.education.desc'),
      icon: BookOpen,
    },
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-gray-900 sm:text-4xl">
            {t('useCases.title')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('useCases.description')}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="rounded-md bg-indigo-600/10 p-2 ring-1 ring-inset ring-indigo-600/20">
                <useCase.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-almarai leading-8 tracking-tight text-gray-900">
                {useCase.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
