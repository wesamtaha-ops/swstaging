import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { X, Cookie, Shield, BarChart2, Megaphone } from 'lucide-react';
import { useCookieConsent } from './CookieConsentProvider';

export function CookiePreferencesDialog() {
  const {
    isPreferencesOpen,
    closePreferences,
    preferences,
    updatePreference,
    savePreferences
  } = useCookieConsent();

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential',
      description: 'Required for the website to function properly. Cannot be disabled.',
      icon: Shield,
      required: true
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Help us understand how visitors interact with our website.',
      icon: BarChart2
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Used to deliver personalized advertisements.',
      icon: Megaphone
    }
  ];

  return (
    <Dialog.Root open={isPreferencesOpen} onOpenChange={closePreferences}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Cookie className="h-6 w-6 text-indigo-600" />
              <Dialog.Title className="text-xl font-almarai text-gray-900">
                Cookie Preferences
              </Dialog.Title>
            </div>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-gray-500">
              Manage your cookie preferences. Essential cookies cannot be disabled as they are required for the website to function properly.
            </p>

            <div className="space-y-4">
              {cookieTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-start justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <type.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-almarai text-gray-900">{type.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                    </div>
                  </div>
                  <Switch.Root
                    checked={preferences[type.id]}
                    onCheckedChange={(checked) => updatePreference(type.id, checked)}
                    disabled={type.required}
                    className={`${preferences[type.id] ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                  >
                    <Switch.Thumb
                      className={`${preferences[type.id] ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch.Root>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={closePreferences}
              className="px-4 py-2 text-sm font-almarai text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={savePreferences}
              className="px-4 py-2 text-sm font-almarai text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Preferences
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}