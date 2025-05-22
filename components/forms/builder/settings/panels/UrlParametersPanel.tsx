import React, { useState } from 'react';
import { HelpCircle, Plus, X, Link as LinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface UrlParameter {
  id: string;
  name: string;
  defaultValue: string;
  description: string;
}

export function UrlParametersPanel() {
  const { t } = useTranslation();
  const [parameters, setParameters] = useState<UrlParameter[]>([]);
  const [newParam, setNewParam] = useState({
    name: '',
    defaultValue: '',
    description: ''
  });

  const handleAddParameter = () => {
    if (newParam.name) {
      setParameters([
        ...parameters,
        {
          id: Date.now().toString(),
          name: newParam.name,
          defaultValue: newParam.defaultValue,
          description: newParam.description
        }
      ]);
      setNewParam({ name: '', defaultValue: '', description: '' });
    }
  };

  const handleRemoveParameter = (id: string) => {
    setParameters(parameters.filter(param => param.id !== id));
  };

  const handleQuickAdd = (paramName: string) => {
    if (!parameters.some(p => p.name === paramName)) {
      setParameters([
        ...parameters,
        {
          id: Date.now().toString(),
          name: paramName,
          defaultValue: '',
          description: t('urlParams.quickDesc', { paramName })
        }
      ]);
    }
  };

  const generateExampleUrl = () => {
    const baseUrl = 'https://example.com/form';
    if (parameters.length === 0) return baseUrl;

    const params = parameters
      .map(p => `${p.name}=${p.defaultValue || '{value}'}`)
      .join('&');
    return `${baseUrl}?${params}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">{t('urlParams.title')}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {t('urlParams.description')}
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-almarai text-gray-700">
              {t('urlParams.name')}
            </label>
            <input
              type="text"
              value={newParam.name}
              onChange={e => setNewParam({ ...newParam, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={t('urlParams.namePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-almarai text-gray-700">
              {t('urlParams.default')}
            </label>
            <input
              type="text"
              value={newParam.defaultValue}
              onChange={e => setNewParam({ ...newParam, defaultValue: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={t('urlParams.defaultPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-almarai text-gray-700">
              {t('urlParams.desc')}
            </label>
            <input
              type="text"
              value={newParam.description}
              onChange={e => setNewParam({ ...newParam, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={t('urlParams.descPlaceholder')}
            />
          </div>

          <button
            onClick={handleAddParameter}
            disabled={!newParam.name}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('urlParams.add')}
          </button>
        </div>

        {parameters.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-almarai text-gray-900 mb-4">{t('urlParams.current')}</h3>
            <div className="space-y-4">
              {parameters.map(param => (
                <div key={param.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center">
                      <LinkIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-almarai text-gray-900">{param.name}</span>
                    </div>
                    {param.defaultValue && (
                      <p className="mt-1 text-sm text-gray-500">
                        {t('urlParams.default')}: {param.defaultValue}
                      </p>
                    )}
                    {param.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {param.description}
                      </p>
                    )}
                  </div>
                  <button onClick={() => handleRemoveParameter(param.id)} className="text-gray-400 hover:text-red-500">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-almarai text-gray-900 mb-2">{t('urlParams.example')}</h4>
              <code className="text-sm text-gray-600 break-all">
                {generateExampleUrl()}
              </code>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-almarai text-gray-900 mb-4">{t('urlParams.quick')}</h3>
          <div className="flex flex-wrap gap-2">
            {['name', 'email', 'company', 'phone', 'role'].map((param) => (
              <button
                key={param}
                onClick={() => handleQuickAdd(param)}
                className="inline-flex items-center px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              >
                {param}
                <Plus className="h-4 w-4 ml-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
