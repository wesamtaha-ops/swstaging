import React, { useState } from 'react';
import { Settings } from 'lucide-react';

export function FormSettings() {
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [language, setLanguage] = useState('English');

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Korean'
  ];

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-indigo-600" />
        <h2 className="text-xl font-almarai text-gray-900">Form Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="formName" className="block text-sm font-almarai text-gray-700">
            Form Name
          </label>
          <input
            type="text"
            id="formName"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Enter form name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="formDescription" className="block text-sm font-almarai text-gray-700">
            Description
          </label>
          <textarea
            id="formDescription"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            rows={3}
            placeholder="Enter form description"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-almarai text-gray-700">
            Form Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}