import React from 'react';
import {
  Bell, Link, Settings, Lock,
  GraduationCap, Code, ArrowUpRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';


interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: {
    text: string;
    variant: 'business' | 'addon';
  };
}

interface SettingsNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'url-parameters', label: t('settings.urlParameters'), icon: Link },
    { id: 'form-behavior', label: t('settings.formBehavior'), icon: Settings },
    { id: 'access', label: t('settings.access'), icon: Lock },
    // { id: 'quiz-mode', label: 'Quiz mode', icon: GraduationCap },
    // { 
    //   id: 'custom-code', 
    //   label: 'Custom code', 
    //   icon: Code,
    //   badge: { text: 'Business', variant: 'business' }
    // },
    // { 
    //   id: 'conversion-kit', 
    //   label: 'Conversion kit', 
    //   icon: ArrowUpRight,
    //   badge: { text: 'Add-on', variant: 'addon' }
    // }
  ];

  return (
    <div className="w-64 border-r border-gray-200 bg-white">
      <nav className="space-y-1 p-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              w-full flex items-center px-3 py-2 text-sm font-almarai rounded-md
              ${activeTab === item.id
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <item.icon
              className={`mr-3 h-5 w-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-gray-400'
                }`}
            />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className={`
                ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-almarai
                ${item.badge.variant === 'business'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-green-100 text-green-800'
                }
              `}>
                {item.badge.text}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          <ArrowUpRight className="h-4 w-4 mr-2" />
          {t('settings.upgrade')}
        </button>
      </div>
    </div>
  );
}