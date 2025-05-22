import React from 'react';
import { User } from 'lucide-react';

interface CreatorFilterProps {
  selected: string[];
  onChange: (creators: string[]) => void;
}

const creators = [
  { id: '1', name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
  { id: '2', name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
  { id: '3', name: 'Mike Johnson', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson' }
];

export function CreatorFilter({ selected, onChange }: CreatorFilterProps) {
  const toggleCreator = (creatorId: string) => {
    const newSelected = selected.includes(creatorId)
      ? selected.filter(c => c !== creatorId)
      : [...selected, creatorId];
    onChange(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {creators.map((creator) => (
        <button
          key={creator.id}
          onClick={() => toggleCreator(creator.id)}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-almarai ${selected.includes(creator.id)
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
        >
          {creator.avatar ? (
            <img
              src={creator.avatar}
              alt={creator.name}
              className="h-4 w-4 rounded-full mr-2"
            />
          ) : (
            <User className="h-4 w-4 mr-2" />
          )}
          {creator.name}
        </button>
      ))}
    </div>
  );
}