import React from 'react';
import { HelpCircle } from 'lucide-react';

export function CustomCodePanel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">Custom code</h2>
          <p className="mt-1 text-sm text-gray-500">
            Add custom JavaScript and CSS to enhance your form's functionality and appearance.
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-almarai text-gray-700 mb-2">
            Custom JavaScript
          </label>
          <textarea
            rows={8}
            className="w-full font-mono text-sm bg-gray-50 p-4 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="// Add your custom JavaScript here"
          />
        </div>

        <div>
          <label className="block text-sm font-almarai text-gray-700 mb-2">
            Custom CSS
          </label>
          <textarea
            rows={8}
            className="w-full font-mono text-sm bg-gray-50 p-4 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="/* Add your custom CSS here */"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-500">
          Note: Custom code is only available on Business plans and above.
        </p>
      </div>
    </div>
  );
}