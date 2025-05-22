import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Circle } from 'lucide-react';

type StatusType = 'live' | 'draft' | 'closed';

interface StatusBadgeProps {
  status: StatusType;
  onStatusChange?: (status: StatusType) => void;
}

export function StatusBadge({ status, onStatusChange }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusDot = () => {
    switch (status) {
      case 'live':
        return 'bg-green-400';
      case 'draft':
        return 'bg-yellow-400';
      case 'closed':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  if (!onStatusChange) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai border ${getStatusStyles()}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot()} mr-1.5`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai border cursor-pointer hover:opacity-80 transition-opacity duration-200 ${getStatusStyles()}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot()} mr-1.5`} />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
          sideOffset={5}
        >
          {(['live', 'draft', 'closed'] as const).map((option) => (
            <DropdownMenu.Item
              key={option}
              className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer outline-none"
              onClick={() => onStatusChange(option)}
            >
              <Circle className={`h-4 w-4 mr-2 ${status === option ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className="flex-1">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </span>
              {status === option && (
                <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}