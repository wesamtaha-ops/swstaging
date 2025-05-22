import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface StatusToggleProps {
  status: 'live' | 'draft' | 'closed';
  onStatusChange: (status: 'live' | 'draft' | 'closed') => void;
}

export function StatusToggle({ status, onStatusChange }: StatusToggleProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
          <StatusBadge status={status} />
          <ChevronDown className="h-4 w-4 text-gray-500" />
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
              <span className="flex-1">
                <StatusBadge status={option} />
              </span>
              {status === option && (
                <Check className="h-4 w-4 text-indigo-600" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}