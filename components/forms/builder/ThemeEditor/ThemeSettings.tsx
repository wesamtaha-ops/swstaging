import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { X } from 'lucide-react';

interface ThemeSettingsProps {
  theme: any;
  onSave: (theme: any) => void;
}

export function ThemeSettings({ theme, onSave }: ThemeSettingsProps) {
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [activeColor, setActiveColor] = useState('');

  useEffect(() => {
    // Close color picker when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (activeColor && !(event.target as Element).closest('.color-picker-container')) {
        setActiveColor('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeColor]);

  const handleColorChange = (color: any, variable: string) => {
    setCurrentTheme({
      ...currentTheme,
      cssVariables: {
        ...currentTheme.cssVariables,
        [variable]: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      },
    });
  };

  const colorSettings = [
    {
      label: 'Background',
      variable: '--sjs-general-backcolor',
    },
    {
      label: 'Text',
      variable: '--sjs-general-forecolor',
    },
    {
      label: 'Primary',
      variable: '--sjs-primary-backcolor',
    },
    {
      label: 'Secondary',
      variable: '--sjs-secondary-backcolor',
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-almarai text-gray-900">Theme Settings</h2>
          <button
            onClick={() => onSave(currentTheme)}
            className="px-4 py-2 text-sm font-almarai text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-almarai text-gray-900 mb-4">Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              {colorSettings.map((setting) => (
                <div key={setting.variable} className="relative color-picker-container">
                  <label className="block text-sm font-almarai text-gray-700 mb-1">
                    {setting.label}
                  </label>
                  <button
                    onClick={() => setActiveColor(activeColor === setting.variable ? '' : setting.variable)}
                    className="w-full h-10 rounded-md border border-gray-300 flex items-center justify-between px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <span className="text-sm text-gray-500">
                      {currentTheme.cssVariables[setting.variable]}
                    </span>
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{
                        backgroundColor: currentTheme.cssVariables[setting.variable],
                      }}
                    />
                  </button>
                  {activeColor === setting.variable && (
                    <div className="absolute z-50 mt-2">
                      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setActiveColor('')} />
                      <div className="relative">
                        <ChromePicker
                          color={currentTheme.cssVariables[setting.variable]}
                          onChange={(color) => handleColorChange(color, setting.variable)}
                        />
                        <button
                          onClick={() => setActiveColor('')}
                          className="absolute -top-2 -right-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-almarai text-gray-900 mb-4">Border Radius</h3>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="20"
                value={parseInt(currentTheme.cssVariables['--sjs-corner-radius'])}
                onChange={(e) =>
                  setCurrentTheme({
                    ...currentTheme,
                    cssVariables: {
                      ...currentTheme.cssVariables,
                      '--sjs-corner-radius': `${e.target.value}px`,
                    },
                  })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12">
                {currentTheme.cssVariables['--sjs-corner-radius']}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-almarai text-gray-900 mb-4">Spacing</h3>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="4"
                max="16"
                value={parseInt(currentTheme.cssVariables['--sjs-base-unit'])}
                onChange={(e) =>
                  setCurrentTheme({
                    ...currentTheme,
                    cssVariables: {
                      ...currentTheme.cssVariables,
                      '--sjs-base-unit': `${e.target.value}px`,
                    },
                  })
                }
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12">
                {currentTheme.cssVariables['--sjs-base-unit']}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-almarai text-gray-900 mb-4">Shadow Intensity</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Small Shadow</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={parseInt(currentTheme.cssVariables['--sjs-shadow-small'].split('px')[0])}
                  onChange={(e) =>
                    setCurrentTheme({
                      ...currentTheme,
                      cssVariables: {
                        ...currentTheme.cssVariables,
                        '--sjs-shadow-small': `${e.target.value}px ${e.target.value}px ${e.target.value * 2}px rgba(0, 0, 0, 0.1)`,
                      },
                    })
                  }
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Large Shadow</label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={parseInt(currentTheme.cssVariables['--sjs-shadow-large'].split('px')[0])}
                  onChange={(e) =>
                    setCurrentTheme({
                      ...currentTheme,
                      cssVariables: {
                        ...currentTheme.cssVariables,
                        '--sjs-shadow-large': `${e.target.value}px ${e.target.value}px ${e.target.value * 2}px rgba(0, 0, 0, 0.1)`,
                      },
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}