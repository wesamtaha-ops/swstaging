import React from 'react';
import { ChevronRight, PaintBucket, Share2, BarChart2, Settings, MessageSquare } from 'lucide-react';
import { useTranslation } from "react-i18next";
export type TabType = 'editor' | 'theme' | 'share' | 'results' | 'settings' | 'comments';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ElementType;
}

interface FormBuilderTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}



export function FormBuilderTabs({ activeTab, onTabChange }: FormBuilderTabsProps) {
  const { t } = useTranslation();

  const tabs: Tab[] = [
    { id: 'editor', label: t('tabs.editor'), icon: ChevronRight },
    { id: 'theme', label: t('tabs.theme'), icon: PaintBucket },
    { id: 'results', label: t('tabs.results'), icon: BarChart2 },
    { id: 'settings', label: t('tabs.settings'), icon: Settings }
  ];
  return (
    <div className="flex space-x-1 justify-center flex-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-2 inline-flex items-center text-sm font-almarai rounded-md
              ${activeTab === tab.id
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
            `}
          >
            <Icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}