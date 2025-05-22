import React from 'react';

interface ExamplePromptProps {
  prompt: {
    title: string;
    description: string;
    category: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export function ExamplePrompt({ prompt, isSelected, onClick }: ExamplePromptProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all ${isSelected
          ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500'
          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
        }`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-almarai text-gray-900">
            {prompt.title}
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai bg-purple-100 text-purple-800">
            {prompt.category}
          </span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-3">
          {prompt.description}
        </p>
      </div>
    </button>
  );
}