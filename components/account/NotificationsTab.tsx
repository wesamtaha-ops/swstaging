import React from 'react';
import { useTranslation } from 'react-i18next';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function NotificationsTab() {
  const { t } = useTranslation();
  const [settings, setSettings] = React.useState<NotificationSetting[]>([
    {
      id: 'form-submissions',
      title: t('notifications.formSubmissions.title'),
      description: t('notifications.formSubmissions.description'),
      enabled: true
    },
    {
      id: 'team-activity',
      title: t('notifications.teamActivity.title'),
      description: t('notifications.teamActivity.description'),
      enabled: false
    },
    {
      id: 'form-comments',
      title: t('notifications.formComments.title'),
      description: t('notifications.formComments.description'),
      enabled: true
    },
    {
      id: 'marketing-updates',
      title: t('notifications.marketingUpdates.title'),
      description: t('notifications.marketingUpdates.description'),
      enabled: false
    }
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="space-y-6">
        <h3 className="text-lg font-almarai text-gray-900">{t('notifications.title')}</h3>
        <div className="space-y-4">
          {settings.map(setting => (
            <div key={setting.id} className="flex items-center justify-between py-4 border-b">
              <div>
                <h4 className="text-sm font-almarai text-gray-900">{t(setting.title)}</h4>
                <p className="text-sm text-gray-500">{t(setting.description)}</p>
              </div>
              <div className="ml-4">
                <button
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${setting.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  onClick={() => toggleSetting(setting.id)}
                >
                  <span
                    className={`${setting.enabled ? 'translate-x-5' : 'translate-x-0'
                      } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}