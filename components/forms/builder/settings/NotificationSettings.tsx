import React, { useState } from 'react';
import { Bell, Slack } from 'lucide-react';

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [slackChannel, setSlackChannel] = useState('#form-submissions');

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-5 w-5 text-indigo-600" />
        <h2 className="text-xl font-almarai text-gray-900">Notifications</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-almarai text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-500">Receive email notifications for new responses</p>
          </div>
          <button
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            onClick={() => setEmailNotifications(!emailNotifications)}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${emailNotifications ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
          </button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Slack className="h-5 w-5 text-gray-400" />
                <h3 className="text-sm font-almarai text-gray-900">Slack Notifications</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">Send notifications to a Slack channel</p>
            </div>
            <button
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${slackNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              onClick={() => setSlackNotifications(!slackNotifications)}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${slackNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>

          {slackNotifications && (
            <div className="mt-4">
              <label htmlFor="slackChannel" className="block text-sm font-almarai text-gray-700">
                Slack Channel
              </label>
              <input
                type="text"
                id="slackChannel"
                value={slackChannel}
                onChange={(e) => setSlackChannel(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}