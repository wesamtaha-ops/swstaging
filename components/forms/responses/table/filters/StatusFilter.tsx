import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check, Filter } from 'lucide-react';

interface StatusFilterProps {
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
}

const statuses = [
  { value: 'complete', label: 'Complete', color: 'bg-green-100 text-green-800' },
  { value: 'partial', label: 'Partial', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'invalid', label: 'Invalid', color: 'bg-red-100 text-red-800' }
];

export function StatusFilter({ selectedStatus, onStatusChange }: StatusFilterProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-almarai rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Filter className="h-4 w-4 mr-2" />
          {selectedStatus ? `Status: ${selectedStatus}` : 'Filter by Status'}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
            onSelect={() => onStatusChange(null)}
          >
            All Statuses
            {selectedStatus === null && <Check className="h-4 w-4" />}
          </DropdownMenu.Item>

          {statuses.map((status) => (
            <DropdownMenu.Item
              key={status.value}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
              onSelect={() => onStatusChange(status.value)}
            >
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai ${status.color}`}>
                  {status.label}
                </span>
              </div>
              {selectedStatus === status.value && <Check className="h-4 w-4" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}