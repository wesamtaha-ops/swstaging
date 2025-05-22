import React from 'react';
import { ChromePicker } from 'react-color';
import { X } from 'lucide-react';

interface ThemeVariablesProps {
  theme: any;
  onThemeChange: (updates: any) => void;
  activeColorPicker: string;
  setActiveColorPicker: (variable: string) => void;
}

export function ThemeVariables({
  theme,
  onThemeChange,
  activeColorPicker,
  setActiveColorPicker
}: ThemeVariablesProps) {
  const colorVariables = [
    {
      label: 'Container Background',
      variable: '--sjs-general-backcolor',
      description: 'Main container background color'
    },
    {
      label: 'Background',
      variable: '--sjs-general-backcolor-dim',
      description: 'Page background color'
    },
    {
      label: 'Text',
      variable: '--sjs-general-forecolor',
      description: 'Main text color'
    },
    {
      label: 'Primary',
      variable: '--sjs-primary-backcolor',
      description: 'Primary action color'
    },
    {
      label: 'Secondary',
      variable: '--sjs-secondary-backcolor',
      description: 'Secondary elements color'
    }
  ];

  const sizeVariables = [
    { label: 'Corner Radius', variable: '--sjs-corner-radius', min: 0, max: 16, step: 1 },
    { label: 'Base Unit', variable: '--sjs-base-unit', min: 4, max: 16, step: 1 },
    { label: 'Font Size', variable: '--sjs-font-size', min: 12, max: 24, step: 1 }
  ];

  const shadowVariables = [
    { label: 'Small Shadow', variable: '--sjs-shadow-small' },
    { label: 'Medium Shadow', variable: '--sjs-shadow-medium' },
    { label: 'Large Shadow', variable: '--sjs-shadow-large' }
  ];

  const handleColorChange = (color: any, variable: string) => {
    onThemeChange({
      ...theme,
      cssVariables: {
        ...theme.cssVariables,
        [variable]: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      },
    });
  };

  const handleSizeChange = (value: string, variable: string) => {
    onThemeChange({
      ...theme,
      cssVariables: {
        ...theme.cssVariables,
        [variable]: `${value}px`,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Colors Section */}
      <div>
        <h3 className="text-lg font-almarai text-gray-900 mb-4">Colors</h3>
        <div className="grid grid-cols-1 gap-4">
          {colorVariables.map((variable) => (
            <div key={variable.variable} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-almarai text-gray-700">
                  {variable.label}
                  <span className="ml-2 text-xs text-gray-500">
                    {variable.description}
                  </span>
                </label>
              </div>
              <div className="relative">
                <button
                  onClick={() => setActiveColorPicker(variable.variable)}
                  className="w-full h-10 rounded-md border border-gray-300 flex items-center justify-between px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="text-sm text-gray-500">
                    {theme.cssVariables[variable.variable]}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{
                      backgroundColor: theme.cssVariables[variable.variable],
                    }}
                  />
                </button>
                {activeColorPicker === variable.variable && (
                  <div className="absolute z-50 mt-2">
                    <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setActiveColorPicker('')} />
                    <div className="relative">
                      <ChromePicker
                        color={theme.cssVariables[variable.variable]}
                        onChange={(color) => handleColorChange(color, variable.variable)}
                      />
                      <button
                        onClick={() => setActiveColorPicker('')}
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes Section */}
      <div>
        <h3 className="text-lg font-almarai text-gray-900 mb-4">Sizes & Spacing</h3>
        <div className="space-y-4">
          {sizeVariables.map((variable) => (
            <div key={variable.variable}>
              <label className="block text-sm font-almarai text-gray-700">
                {variable.label}
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="range"
                  min={variable.min}
                  max={variable.max}
                  step={variable.step}
                  value={parseInt(theme.cssVariables[variable.variable] || '0')}
                  onChange={(e) => handleSizeChange(e.target.value, variable.variable)}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500 w-16">
                  {theme.cssVariables[variable.variable] || '0px'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shadows Section */}
      <div>
        <h3 className="text-lg font-almarai text-gray-900 mb-4">Shadows</h3>
        <div className="space-y-4">
          {shadowVariables.map((variable) => (
            <div key={variable.variable}>
              <label className="block text-sm font-almarai text-gray-700">
                {variable.label}
              </label>
              <input
                type="text"
                value={theme.cssVariables[variable.variable] || ''}
                onChange={(e) => {
                  onThemeChange({
                    ...theme,
                    cssVariables: {
                      ...theme.cssVariables,
                      [variable.variable]: e.target.value,
                    },
                  });
                }}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. 0px 2px 4px rgba(0,0,0,0.1)"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Font Settings */}
      <div>
        <h3 className="text-lg font-almarai text-gray-900 mb-4">Typography</h3>
        <div className="space-y-4">
          {['xx-large', 'x-large', 'large', 'medium', 'default'].map((size) => (
            <div key={size} className="space-y-2">
              <label className="block text-sm font-almarai text-gray-700">
                {size.charAt(0).toUpperCase() + size.slice(1)} Text
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={theme.cssVariables[`--sjs-article-font-${size}-fontWeight`] || ''}
                  onChange={(e) => {
                    onThemeChange({
                      ...theme,
                      cssVariables: {
                        ...theme.cssVariables,
                        [`--sjs-article-font-${size}-fontWeight`]: e.target.value,
                      },
                    });
                  }}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Font Weight (e.g. 400)"
                />
                <input
                  type="text"
                  value={theme.cssVariables[`--sjs-article-font-${size}-lineHeight`] || ''}
                  onChange={(e) => {
                    onThemeChange({
                      ...theme,
                      cssVariables: {
                        ...theme.cssVariables,
                        [`--sjs-article-font-${size}-lineHeight`]: e.target.value,
                      },
                    });
                  }}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Line Height (e.g. 1.5)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}