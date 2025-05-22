import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ServerCog,
  Network,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Zap
} from 'lucide-react';

export function TechnicalSpecs() {
  const { t } = useTranslation();

  const specs = [
    {
      title: t('technicalSpecs.items.framework.title'),
      description: t('technicalSpecs.items.framework.desc'),
      icon: ServerCog
    },
    {
      title: t('technicalSpecs.items.api.title'),
      description: t('technicalSpecs.items.api.desc'),
      icon: Network
    },
    {
      title: t('technicalSpecs.items.compliance.title'),
      description: t('technicalSpecs.items.compliance.desc'),
      icon: ShieldCheck
    },
    {
      title: t('technicalSpecs.items.security.title'),
      description: t('technicalSpecs.items.security.desc'),
      icon: Cpu
    },
    {
      title: t('technicalSpecs.items.scalability.title'),
      description: t('technicalSpecs.items.scalability.desc'),
      icon: TrendingUp
    },
    {
      title: t('technicalSpecs.items.performance.title'),
      description: t('technicalSpecs.items.performance.desc'),
      icon: Zap
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-gray-900 sm:text-4xl">
            {t('technicalSpecs.title')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('technicalSpecs.description')}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mt-20 lg:max-w-none">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map((spec, index) => (
              <div key={index} className="flex flex-col items-start">
                <div className="rounded-md bg-indigo-600/10 p-2 ring-1 ring-inset ring-indigo-600/20">
                  <spec.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-almarai text-lg text-gray-900">
                  {spec.title}
                </dt>
                <dd className="mt-2 text-base text-gray-600">{spec.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
