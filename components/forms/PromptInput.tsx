import React from 'react';
import { Sparkles, Loader } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  onSkip: () => void;
  isGenerating: boolean;
}

export function PromptInput({ value, onChange, onGenerate, onSkip, isGenerating }: PromptInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-almarai text-gray-700">
          Describe your form
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Select an example prompt above or write your own description
        </p>
        <div className="mt-2 relative">
          <textarea
            id="prompt"
            rows={6}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
            placeholder="Enter your form description..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute top-4 right-2 p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="sr-only">Clear input</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !value.trim()}
          className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isGenerating ? (
            <>
              <Loader className="animate-spin h-5 w-5 mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Generate
            </>
          )}
        </button>
        <button
          onClick={onSkip}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
        >
          Skip
        </button>
      </div>
    </div>
  );
}