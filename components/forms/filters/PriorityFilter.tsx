import React from 'react';
import { Flag } from 'lucide-react';

interface PriorityFilterProps {
  selected: string[];
  onChange: (priorities: string[]) => void;
}

const priorities = [
  { id: 'high', label: 'High', color: 'text-red-500' },
  { id: 'medium', label: 'Medium', color: 'text-yellow-500' },
  { id: 'low', label: 'Low', color: 'text-green-500' }
];

export function PriorityFilter({ selected, onChange }: PriorityFilterProps) {
  const togglePriority = (priority: string) => {
    const newSelected = selected.includes(priority)
      ? selected.filter(p => p !== priority)
      : [...selected, priority];
    onChange(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {priorities.map((priority) => (
        <button
          key={priority.id}
          onClick={() => togglePriority(priority.id)}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-almarai ${selected.includes(priority.id)
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
        >
          <Flag className={`h-4 w-4 mr-2 ${priority.color}`} />
          {priority.label}
        </button>
      ))}
    </div>
  );
}