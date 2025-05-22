import React from 'react';

interface CategoryFilterProps {
  selected: string[];
  onChange: (categories: string[]) => void;
}

const categories = [
  'Survey',
  'Quiz',
  'Registration',
  'Feedback',
  'Application',
  'Contact',
  'Event',
  'Other'
];

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const toggleCategory = (category: string) => {
    const newSelected = selected.includes(category)
      ? selected.filter(c => c !== category)
      : [...selected, category];
    onChange(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => toggleCategory(category)}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-almarai ${selected.includes(category)
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}