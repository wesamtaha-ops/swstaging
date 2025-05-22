import React from 'react';
import { Circle } from 'lucide-react';

interface StatusFilterProps {
  selected: string[];
  onChange: (statuses: string[]) => void;
}

const statuses = [
  { id: 'draft', label: 'Draft', color: 'text-yellow-500' },
  { id: 'live', label: 'Live', color: 'text-green-500' },
  { id: 'paused', label: 'Paused', color: 'text-orange-500' },
  { id: 'ended', label: 'Ended', color: 'text-gray-500' }
];

export function StatusFilter({ selected, onChange }: StatusFilterProps) {
  const toggleStatus = (status: string) => {
    const newSelected = selected.includes(status)
      ? selected.filter(s => s !== status)
      : [...selected, status];
    onChange(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status.id}
          onClick={() => toggleStatus(status.id)}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-almarai ${selected.includes(status.id)
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
        >
          <Circle className={`h-3 w-3 mr-2 ${status.color}`} />
          {status.label}
        </button>
      ))}
    </div>
  );
}