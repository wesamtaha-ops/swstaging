import React from 'react';

interface ThemeControlsProps {
  theme: any;
  onThemeChange: (updates: any) => void;
}

export function ThemeControls({ theme, onThemeChange }: ThemeControlsProps) {
  const handleThemePropertyChange = (property: string, value: any) => {
    onThemeChange({
      ...theme,
      [property]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Theme Name */}
      <div>
        <label className="block text-sm font-almarai text-gray-700">Theme Name</label>
        <input
          type="text"
          value={theme.themeName}
          onChange={(e) => handleThemePropertyChange('themeName', e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Color Palette */}
      <div>
        <label className="block text-sm font-almarai text-gray-700">Color Palette</label>
        <select
          value={theme.colorPalette}
          onChange={(e) => handleThemePropertyChange('colorPalette', e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Panel Style */}
      <div>
        <label className="block text-sm font-almarai text-gray-700">Panel Style</label>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={theme.isPanelless}
              onChange={(e) => handleThemePropertyChange('isPanelless', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">Panelless Design</span>
          </label>
        </div>
      </div>

      {/* Background Image */}
      <div>
        <label className="block text-sm font-almarai text-gray-700">Background Image</label>
        <input
          type="text"
          value={theme.backgroundImage}
          onChange={(e) => handleThemePropertyChange('backgroundImage', e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter image URL"
        />
      </div>

      {/* Background Opacity */}
      <div>
        <label className="block text-sm font-almarai text-gray-700">Background Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={theme.backgroundOpacity}
          onChange={(e) => handleThemePropertyChange('backgroundOpacity', parseFloat(e.target.value))}
          className="mt-1 block w-full"
        />
        <div className="mt-1 text-sm text-gray-500">{theme.backgroundOpacity}</div>
      </div>

      {/* Background Image Attachment */}
      <div>
        <label className="block text-sm font-almarai text-gray-700">Background Attachment</label>
        <select
          value={theme.backgroundImageAttachment}
          onChange={(e) => handleThemePropertyChange('backgroundImageAttachment', e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="scroll">Scroll</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>

      {/* Background Image Fit */}
      <div>
        <label className="block text-sm font-almarai text-gray-700">Background Fit</label>
        <select
          value={theme.backgroundImageFit}
          onChange={(e) => handleThemePropertyChange('backgroundImageFit', e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
        </select>
      </div>

      {/* Header View */}
      <div>
        <label className="block text-sm font-almarai text-gray-700">Header View</label>
        <select
          value={theme.headerView}
          onChange={(e) => handleThemePropertyChange('headerView', e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
}