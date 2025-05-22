import React from 'react';
import { defaultTheme } from './defaultTheme';

const presetThemes = [
  {
    name: 'Light',
    theme: defaultTheme,
  },
  {
    name: 'Dark',
    theme: {
      ...defaultTheme,
      cssVariables: {
        ...defaultTheme.cssVariables,
        '--sjs-general-backcolor': '#1a1a1a',
        '--sjs-general-forecolor': '#ffffff',
      },
    },
  },
  {
    name: 'Modern',
    theme: {
      ...defaultTheme,
      cssVariables: {
        ...defaultTheme.cssVariables,
        '--sjs-primary-backcolor': '#6366F1',
        '--sjs-primary-backcolor-light': '#818CF8',
        '--sjs-corner-radius': '8px',
      },
    },
  },
];

interface ThemesListProps {
  onSelect: (theme: any) => void;
}

export function ThemesList({ onSelect }: ThemesListProps) {
  return (
    <div className="space-y-4">
      {presetThemes.map((preset) => (
        <button
          key={preset.name}
          onClick={() => onSelect(preset.theme)}
          className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <h3 className="text-sm font-almarai text-gray-900 mb-2">{preset.name}</h3>
          <div className="aspect-video rounded-md overflow-hidden">
            <div
              className="w-full h-full p-2"
              style={{
                backgroundColor: preset.theme.cssVariables['--sjs-general-backcolor'],
                color: preset.theme.cssVariables['--sjs-general-forecolor'],
              }}
            >
              <div
                className="w-full h-2 rounded mb-2"
                style={{
                  backgroundColor: preset.theme.cssVariables['--sjs-primary-backcolor'],
                }}
              />
              <div
                className="w-3/4 h-2 rounded"
                style={{
                  backgroundColor: preset.theme.cssVariables['--sjs-secondary-backcolor'],
                }}
              />
            </div>
          </div>
        </button>
      ))}

      <button
        className="w-full p-4 border border-dashed border-gray-300 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <div className="text-center">
          <span className="text-sm font-almarai text-indigo-600">Create custom theme</span>
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-almarai bg-indigo-100 text-indigo-800">
            Premium
          </span>
        </div>
      </button>
    </div>
  );
}