import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PricingOverview() {
  const { t } = useTranslation();

  const tiers = [
    {
      name: t('pricing123.tiers.free.name'),
      price: 0,
      description: t('pricing123.tiers.free.description'),
      features: t('pricing123.tiers.free.features', { returnObjects: true }) as string[],
      cta: t('pricing123.tiers.free.cta'),
      href: '/signup'
    },
    {
      name: t('pricing123.tiers.pro.name'),
      price: 29,
      description: t('pricing123.tiers.pro.description'),
      features: t('pricing123.tiers.pro.features', { returnObjects: true }) as string[],
      cta: t('pricing123.tiers.pro.cta'),
      href: '/signup?plan=pro',
      mostPopular: true
    },
    {
      name: t('pricing123.tiers.enterprise.name'),
      price: 99,
      description: t('pricing123.tiers.enterprise.description'),
      features: t('pricing123.tiers.enterprise.features', { returnObjects: true }) as string[],
      cta: t('pricing123.tiers.enterprise.cta'),
      href: '/contact'
    }
  ];

  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-gray-900 sm:text-4xl">
            {t('pricing123.title')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('pricing123.description')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.name}
              className={`p-8 ${tierIdx === 1
                ? 'bg-gray-900 sm:px-10 lg:flex-auto'
                : 'bg-white lg:flex-auto'
                } ${tierIdx === 0 ? 'rounded-t-3xl lg:rounded-l-3xl' : ''} ${tierIdx === tiers.length - 1 ? 'rounded-b-3xl lg:rounded-r-3xl' : ''
                }`}
            >
              <h3
                className={`text-2xl   font-bold font-almarai font-almarai  font-almarai tracking-tight ${tierIdx === 1 ? 'text-white' : 'text-gray-900'
                  }`}
              >
                {tier.name}
              </h3>
              <p
                className={`mt-6 text-base leading-7 ${tierIdx === 1 ? 'text-gray-300' : 'text-gray-600'
                  }`}
              >
                {tier.description}
              </p>
              <div className="mt-8 flex items-baseline gap-x-2">
                <span
                  className={`text-4xl   font-bold font-almarai font-almarai  font-almarai tracking-tight ${tierIdx === 1 ? 'text-white' : 'text-gray-900'
                    }`}
                >
                  ${tier.price}
                </span>
                {tier.price > 0 && (
                  <span
                    className={
                      tierIdx === 1 ? 'text-gray-300' : 'text-gray-600'
                    }
                  >
                    {t('pricing123.perMonth')}
                  </span>
                )}
              </div>
              <Link
                to={tier.href}
                className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-almarai leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tierIdx === 1
                  ? 'bg-white text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline-white'
                  : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
                  }`}
              >
                {tier.cta}
              </Link>
              <ul
                className={`mt-8 space-y-3 text-sm leading-6 ${tierIdx === 1 ? 'text-gray-300' : 'text-gray-600'
                  }`}
              >
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check
                      className={`h-6 w-5 flex-none ${tierIdx === 1 ? 'text-white' : 'text-indigo-600'
                        }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
