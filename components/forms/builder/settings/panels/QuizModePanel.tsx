import React from 'react';
import { HelpCircle } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';

export function QuizModePanel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">Quiz mode</h2>
          <p className="mt-1 text-sm text-gray-500">
            Make your form a scorable quiz. Useful for educational tests, lead quizzes, sharing content and more.
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-almarai text-gray-900">
              Quiz mode enabled
            </h3>
            <p className="text-sm text-gray-500">
              Turn your form into an interactive quiz with scoring
            </p>
          </div>
          <Switch.Root
            className="w-11 h-6 bg-gray-200 rounded-full data-[state=checked]:bg-indigo-600"
          >
            <Switch.Thumb
              className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6"
            />
          </Switch.Root>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-almarai text-gray-900 mb-4">Quiz Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-almarai text-gray-700">
              Passing Score (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="70"
            />
          </div>
          <div>
            <label className="block text-sm font-almarai text-gray-700">
              Success Message
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Congratulations! You passed the quiz."
            />
          </div>
          <div>
            <label className="block text-sm font-almarai text-gray-700">
              Failure Message
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Please try again to achieve a passing score."
            />
          </div>
        </div>
      </div>
    </div>
  );
}