import React from 'react';
import { HelpCircle, Zap } from 'lucide-react';

export function ConversionKitPanel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">Conversion kit</h2>
          <p className="mt-1 text-sm text-gray-500">
            Boost your form's conversion rate with advanced features and optimizations.
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
        <Zap className="h-8 w-8 mb-4" />
        <h3 className="text-xl   font-bold font-almarai font-almarai  font-almarai mb-2">Unlock Conversion Kit</h3>
        <p className="text-white/90 mb-6">
          Get access to advanced features like A/B testing, smart fields,
          exit-intent popups, and more to maximize your form's performance.
        </p>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
          Learn More
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-almarai text-gray-900 mb-4">
          Features included:
        </h3>
        <ul className="space-y-3">
          {[
            'A/B Testing',
            'Smart Fields',
            'Exit-Intent Popups',
            'Progress Saving',
            'Custom Branding',
            'Advanced Analytics'
          ].map((feature) => (
            <li key={feature} className="flex items-center text-sm text-gray-600">
              <Zap className="h-4 w-4 text-indigo-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}