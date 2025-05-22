import React, { useState, useEffect } from 'react';
import { Model } from 'survey-core';
import { ThemePreviewWrapper } from './ThemePreviewWrapper';
import { ThemeAccordion } from './ThemeAccordion';
import { ThemesList } from './ThemesList';
import { ThemePreviewControls } from './ThemePreviewControls';
import { ThemeImportExport } from './ThemeImportExport';
import { predefinedThemes } from './predefinedThemes';
import { defaultTheme } from './defaultTheme';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface ThemeEditorProps {
  survey: Model | null;
  onThemeChange: (theme: any) => void;
}

export function ThemeEditor({ survey, onThemeChange }: ThemeEditorProps) {
  const [currentView, setCurrentView] = useState<'current' | 'all'>('current');
  const [selectedTheme, setSelectedTheme] = useState(predefinedThemes[0].theme);
  const [isCustomizing, setIsCustomizing] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    // Apply the first theme on mount
    handleThemeSelect(predefinedThemes[0].theme);
  }, []);

  const handleThemeSelect = (theme: any) => {
    const themeClone = JSON.parse(JSON.stringify(theme));
    setSelectedTheme(themeClone);
    onThemeChange(themeClone);
    toast.success('Theme applied successfully!');
  };

  const handleThemeUpdate = (updates: any) => {
    const updatedTheme = {
      ...selectedTheme,
      ...updates,
      cssVariables: {
        ...selectedTheme.cssVariables,
        ...updates.cssVariables
      }
    };
    handleThemeSelect(updatedTheme);
  };

  const handlePreviewRefresh = () => {
    setPreviewKey(prev => prev + 1);
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Theme Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4">
          {/* View Toggle */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setCurrentView('current')}
              className={`flex-1 px-4 py-2 text-sm font-almarai rounded-md transition-colors duration-200 ${currentView === 'current'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Current Theme
            </button>
            <button
              onClick={() => setCurrentView('all')}
              className={`flex-1 px-4 py-2 text-sm font-almarai rounded-md transition-colors duration-200 ${currentView === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              All Themes
            </button>
          </div>

          {/* Theme Content */}
          {currentView === 'current' ? (
            <div className="space-y-4">

              {isCustomizing && (
                <ThemeAccordion
                  theme={selectedTheme}
                  onThemeChange={handleThemeUpdate}
                  expandAll={true}
                />
              )}
              <ThemeImportExport
                theme={selectedTheme}
                onImport={handleThemeSelect}
              />
            </div>
          ) : (
            <ThemesList
              themes={predefinedThemes}
              onSelect={handleThemeSelect}
              selectedTheme={selectedTheme}
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Preview Controls */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-almarai text-gray-900">
              Theme Preview
            </h2>
            <ThemePreviewControls
              showPreview={showPreview}
              onTogglePreview={() => setShowPreview(!showPreview)}
              onRefresh={handlePreviewRefresh}
            />
          </div>

          {/* Preview */}
          <ThemePreviewWrapper
            key={previewKey}
            survey={survey}
            theme={selectedTheme}
            showPreview={showPreview}
          />
        </div>
      </div>
    </div>
  );
}