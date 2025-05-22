import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormInput, FileText, BrainCircuit, ClipboardCheck, BarChart2, Zap, Settings } from 'lucide-react';

export function ProductsMenu() {
  const { t } = useTranslation();

  return (
    <>
      <div className="col-span-4">
        <h3 className="text-xs font-almarai text-gray-500 uppercase tracking-wide mb-4">
          {t("products2.core_products")}
        </h3>
        <div className="space-y-5">
          <Link to="/products/form-builder" className="group block">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 group-hover:from-indigo-100 group-hover:to-indigo-200">
                <FormInput className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-almarai text-gray-900 group-hover:text-indigo-600">
                  {t("products2.form_builder.title")}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {t("products2.form_builder.description")}
                </p>
              </div>
            </div>
          </Link>

          <Link to="/products/survey-maker" className="group block">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-almarai text-gray-900 group-hover:text-green-600">
                  {t("products2.survey_maker.title")}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {t("products2.survey_maker.description")}
                </p>
              </div>
            </div>
          </Link>

          <Link to="/products/ai-forms" className="group block">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200">
                <BrainCircuit className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-almarai text-gray-900 group-hover:text-purple-600">
                  {t("products2.ai_forms.title")}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {t("products2.ai_forms.description")}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="col-span-4">
        <h3 className="text-xs font-almarai text-gray-500 uppercase tracking-wide mb-4">
          {t("products2.features")}
        </h3>
        <div className="grid grid-cols-2 gap-5">
          {[
            {
              key: "analytics",
              icon: BarChart2,
              color: 'text-blue-600',
              bg: 'from-blue-50 to-blue-100',
              bgHover: 'from-blue-100 to-blue-200',
            },
            {
              key: "automations",
              icon: Zap,
              color: 'text-amber-600',
              bg: 'from-amber-50 to-amber-100',
              bgHover: 'from-amber-100 to-amber-200',
            },
            {
              key: "integrations",
              icon: Settings,
              color: 'text-rose-600',
              bg: 'from-rose-50 to-rose-100',
              bgHover: 'from-rose-100 to-rose-200',
            },
            {
              key: "templates",
              icon: ClipboardCheck,
              color: 'text-teal-600',
              bg: 'from-teal-50 to-teal-100',
              bgHover: 'from-teal-100 to-teal-200',
            },
          ].map((feature, index) => (
            <Link key={index} to={`/features/${feature.key}`} className="group block">
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br ${feature.bg} group-hover:${feature.bgHover}`}>
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-almarai text-gray-900 group-hover:text-indigo-600">
                    {t(`products2.${feature.key}.title`)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {t(`products2.${feature.key}.description`)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-4">
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-lg p-6">
          <h3 className="text-base font-almarai text-gray-900 mb-4">{t("products2.whats_new.title")}</h3>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute -left-4 top-1">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
              </div>
              <Link to="/whats-new/ai-forms" className="block group">
                <p className="text-sm font-almarai text-gray-900 group-hover:text-indigo-600">
                  {t("products2.whats_new.ai_forms.title")}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {t("products2.whats_new.ai_forms.description")}
                </p>
              </Link>
            </div>

            <Link to="/product-updates" className="block group">
              <p className="text-sm font-almarai text-gray-900 group-hover:text-indigo-600">
                {t("products2.whats_new.analytics.title")}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {t("products2.whats_new.analytics.description")}
              </p>
            </Link>

            <div className="mt-6">
              <Link
                to="/product-updates"
                className="inline-flex items-center text-sm font-almarai text-indigo-600 hover:text-indigo-500"
              >
                {t("products2.whats_new.view_all")}
                <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
