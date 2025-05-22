import React, { useState } from 'react';
import { SettingsNav } from './SettingsNav';
import { NotificationsPanel } from './panels/NotificationsPanel';
import { UrlParametersPanel } from './panels/UrlParametersPanel';
import { FormBehaviorPanel } from './panels/FormBehaviorPanel';
import { AccessPanel } from './panels/AccessPanel';
import { QuizModePanel } from './panels/QuizModePanel';
import { CustomCodePanel } from './panels/CustomCodePanel';
import { ConversionKitPanel } from './panels/ConversionKitPanel';

interface SettingsTabProps {
  formId: string;
}

export function SettingsTab({ formId }: SettingsTabProps) {
  const [activeTab, setActiveTab] = useState('notifications');

  const [isClosed, setIsClosed] = useState(false);

  const renderPanel = () => {
    switch (activeTab) {
      case 'notifications':
        return <NotificationsPanel />;
      case 'url-parameters':
        return <UrlParametersPanel />;
      case 'form-behavior':
        return <FormBehaviorPanel />;
      case 'access':
        return <AccessPanel
        isClosed={isClosed}
        onChangeIsClosed={setIsClosed}
        />;

  
      default:
        return null;
    }
  };

      // case 'quiz-mode':
      //   return <QuizModePanel />;
      // case 'custom-code':
      //   return <CustomCodePanel />;
      // case 'conversion-kit':
      //   return <ConversionKitPanel />;

  return (
    <div className="flex h-full bg-gray-50">
      <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {renderPanel()}
        </div>
      </div>
    </div>
  );
}