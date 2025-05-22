import React, { useState } from 'react';
import { Link, Plus } from 'lucide-react';

interface UrlParam {
  id: string;
  name: string;
  value: string;
}

export function UrlParameters() {
  const [params, setParams] = useState<UrlParam[]>([]);

  const addParam = () => {
    const newParam = {
      id: Date.now().toString(),
      name: '',
      value: ''
    };
    setParams([...params, newParam]);
  };

  const updateParam = (id: string, field: 'name' | 'value', value: string) => {
    setParams(params.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const removeParam = (id: string) => {
    setParams(params.filter(p => p.id !== id));
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-almarai text-gray-900">URL Parameters</h2>
        </div>
        <button
          onClick={addParam}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Parameter
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Pre-fill form fields using URL parameters. Add parameters to customize the form for each respondent.
      </p>

      <div className="space-y-4">
        {params.map((param) => (
          <div
            key={param.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
          >
            <div className="flex-1">
              <input
                type="text"
                value={param.name}
                onChange={(e) => updateParam(param.id, 'name', e.target.value)}
                placeholder="Parameter name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={param.value}
                onChange={(e) => updateParam(param.id, 'value', e.target.value)}
                placeholder="Default value"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              onClick={() => removeParam(param.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}

        {params.length === 0 && (
          <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-sm text-gray-500">No parameters added yet</p>
            <button
              onClick={addParam}
              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-almarai rounded-md text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add your first parameter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}