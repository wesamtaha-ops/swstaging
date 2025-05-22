import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-almarai transition-colors duration-200 ${view === 'grid'
            ? 'bg-indigo-600 text-white'
            : 'text-gray-600 hover:text-gray-900'
          }`}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        {/* Grid */}
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-almarai transition-colors duration-200 ${view === 'list'
            ? 'bg-indigo-600 text-white'
            : 'text-gray-600 hover:text-gray-900'
          }`}
      >
        <List className="h-4 w-4 mr-2" />
        {/* List */}
      </button>
    </div>
  );
}