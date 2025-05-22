import React from 'react';
import { Download, Upload } from 'lucide-react';

interface ThemeImportExportProps {
  theme: any;
  onImport: (theme: any) => void;
}

export function ThemeImportExport({ theme, onImport }: ThemeImportExportProps) {
  const handleExport = () => {
    const themeString = JSON.stringify(theme, null, 2);
    const blob = new Blob([themeString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'survey-theme.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTheme = JSON.parse(e.target?.result as string);
          onImport(importedTheme);
        } catch (error) {
          console.error('Error importing theme:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleExport}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50"
      >
        <Download className="h-4 w-4 mr-2" />
        Export Theme
      </button>
      <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
        <Upload className="h-4 w-4 mr-2" />
        Import Theme
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}