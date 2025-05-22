import React, { useState } from 'react';
import { Settings, Shield, Database, Activity } from 'lucide-react';

export function AdvancedSettings() {
  const [captchaEnabled, setCaptchaEnabled] = useState(true);
  const [storeResponses, setStoreResponses] = useState(true);
  const [ipTracking, setIpTracking] = useState(false);
  const [rateLimit, setRateLimit] = useState('');
  const [customJs, setCustomJs] = useState('');
  const [customCss, setCustomCss] = useState('');

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-indigo-600" />
        <h2 className="text-xl font-almarai text-gray-900">Advanced Settings</h2>
      </div>

      <div className="space-y-6">
        {/* CAPTCHA Protection */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-400" />
              <h3 className="text-sm font-almarai text-gray-900">CAPTCHA Protection</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">Enable CAPTCHA to prevent spam submissions</p>
          </div>
          <button
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${captchaEnabled ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            onClick={() => setCaptchaEnabled(!captchaEnabled)}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${captchaEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
          </button>
        </div>

        {/* Store Responses */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-gray-400" />
                <h3 className="text-sm font-almarai text-gray-900">Store Responses</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">Save form responses in the database</p>
            </div>
            <button
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${storeResponses ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              onClick={() => setStoreResponses(!storeResponses)}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${storeResponses ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </div>

        {/* IP Tracking */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-gray-400" />
                <h3 className="text-sm font-almarai text-gray-900">IP Tracking</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">Track respondent IP addresses</p>
            </div>
            <button
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${ipTracking ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              onClick={() => setIpTracking(!ipTracking)}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${ipTracking ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Rate Limiting */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-almarai text-gray-900">Rate Limiting</h3>
              <p className="mt-1 text-sm text-gray-500">Limit submissions per IP address (per hour)</p>
            </div>
            <input
              type="number"
              value={rateLimit}
              onChange={(e) => setRateLimit(e.target.value)}
              placeholder="Unlimited"
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Custom Code */}
        <div className="pt-6 border-t border-gray-200 space-y-6">
          <div>
            <h3 className="text-sm font-almarai text-gray-900">Custom JavaScript</h3>
            <p className="mt-1 text-sm text-gray-500">Add custom JavaScript code to your form</p>
            <div className="mt-2">
              <textarea
                value={customJs}
                onChange={(e) => setCustomJs(e.target.value)}
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                placeholder="// Add your custom JavaScript here"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-almarai text-gray-900">Custom CSS</h3>
            <p className="mt-1 text-sm text-gray-500">Add custom CSS styles to your form</p>
            <div className="mt-2">
              <textarea
                value={customCss}
                onChange={(e) => setCustomCss(e.target.value)}
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                placeholder="/* Add your custom CSS here */"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}