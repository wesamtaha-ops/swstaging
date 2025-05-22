import React, { useState, useEffect } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { ThemeControls } from './ThemeEditor/ThemeControls';
import { ThemeVariables } from './ThemeEditor/ThemeVariables';
import { predefinedThemes } from './ThemeEditor/predefinedThemes';

interface ThemeEditorProps {
  survey: Model | null;
  onThemeChange: (theme: any) => void;
}

export function ThemeEditor({ survey, onThemeChange }: ThemeEditorProps) {
  const [previewSurvey, setPreviewSurvey] = useState<Model | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [activeColorPicker, setActiveColorPicker] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(predefinedThemes[0].theme);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    if (survey) {
      const newSurvey = new Model(survey.toJSON());
      newSurvey.applyTheme(selectedTheme);
      setPreviewSurvey(newSurvey);
    }
  }, [survey, selectedTheme]);

  const handleThemeSelect = (theme: any) => {
    setSelectedTheme(theme);
    onThemeChange(theme);
  };

  const handleRefreshPreview = () => {
    if (survey) {
      const newSurvey = new Model(survey.toJSON());
      newSurvey.applyTheme(selectedTheme);
      setPreviewSurvey(newSurvey);
    }
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Theme Selection Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4">
          {/* View Toggle */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setIsCustomizing(false)}
              className={`flex-1 px-4 py-2 text-sm font-almarai rounded-md transition-colors duration-200 ${!isCustomizing
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Themes
            </button>
            <button
              onClick={() => setIsCustomizing(true)}
              className={`flex-1 px-4 py-2 text-sm font-almarai rounded-md transition-colors duration-200 ${isCustomizing
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Customize
            </button>
          </div>

          {/* Theme Content */}
          <div className="space-y-6">
            {!isCustomizing ? (
              <div className="space-y-4">
                {predefinedThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeSelect(theme.theme)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <h3 className="text-sm font-almarai text-gray-900">{theme.name}</h3>
                    <div className="mt-2 h-20 rounded-md overflow-hidden">
                      <div
                        className="w-full h-full p-2"
                        style={{
                          backgroundColor: theme.theme.cssVariables['--sjs-general-backcolor'],
                          color: theme.theme.cssVariables['--sjs-general-forecolor'],
                        }}
                      >
                        <div
                          className="w-full h-2 rounded mb-2"
                          style={{
                            backgroundColor: theme.theme.cssVariables['--sjs-primary-backcolor'],
                          }}
                        />
                        <div
                          className="w-3/4 h-2 rounded"
                          style={{
                            backgroundColor: theme.theme.cssVariables['--sjs-primary-backcolor-light'],
                          }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                <ThemeControls
                  theme={selectedTheme}
                  onThemeChange={handleThemeSelect}
                />
                <ThemeVariables
                  theme={selectedTheme}
                  onThemeChange={handleThemeSelect}
                  activeColorPicker={activeColorPicker}
                  setActiveColorPicker={setActiveColorPicker}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-almarai text-gray-900">Theme Preview</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRefreshPreview}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                title="Refresh Preview"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                title={showPreview ? 'Hide Preview' : 'Show Preview'}
              >
                {showPreview ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {showPreview && previewSurvey && (
            <div className="border border-gray-200 rounded-lg p-4">
              <Survey
                model={previewSurvey}
                css={{
                  root: 'survey-preview',
                  container: 'survey-preview-container',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}