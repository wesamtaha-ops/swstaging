import React from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';

interface ThemePreviewControlsProps {
  onRefresh: () => void;
  showPreview: boolean;
  onTogglePreview: () => void;
}

export function ThemePreviewControls({ onRefresh, showPreview, onTogglePreview }: ThemePreviewControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onRefresh}
        className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200"
        title="Refresh Preview"
      >
        <RefreshCw className="h-5 w-5" />
      </button>
      <button
        onClick={onTogglePreview}
        className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200"
        title={showPreview ? 'Hide Preview' : 'Show Preview'}
      >
        {showPreview ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}