import React, { useEffect, useState } from 'react';
import { Model } from 'survey-core';
import { ThemePreview } from './ThemePreview';

interface ThemePreviewWrapperProps {
  survey: Model | null;
  theme: any;
  showPreview: boolean;
}

export function ThemePreviewWrapper({ survey, theme, showPreview }: ThemePreviewWrapperProps) {
  const [previewKey, setPreviewKey] = useState(0);

  // Force preview refresh when theme changes
  useEffect(() => {
    setPreviewKey(prev => prev + 1);
  }, [theme]);

  if (!showPreview) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="max-w-4xl mx-auto">
        <ThemePreview 
          key={previewKey}
          survey={survey} 
          theme={theme}
        />
      </div>
    </div>
  );
}