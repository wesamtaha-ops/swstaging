import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function CTASection() {
  const { t } = useTranslation();

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
          <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-white sm:text-4xl">
            {t('ctaSection.title')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {t('ctaSection.description')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/signup"
              className="rounded-md bg-white px-4 py-2.5 text-sm font-almarai text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('ctaSection.cta')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
