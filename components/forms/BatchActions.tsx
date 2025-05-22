import React from 'react';
import { Check, Trash2, Archive } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface BatchActionsProps {
  selectedForms: string[];
  onStatusChange: (status: string) => void;
  onDelete: () => void;
  onArchive: () => void;
}

export function BatchActions({ selectedForms, onStatusChange, onDelete, onArchive }: BatchActionsProps) {
  if (selectedForms.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3 flex items-center space-x-4">
      <span className="text-sm text-gray-600">
        {selectedForms.length} form{selectedForms.length > 1 ? 's' : ''} selected
      </span>

      <div className="h-6 w-px bg-gray-200" />

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50">
            <Check className="h-4 w-4 mr-2" />
            Change Status
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px]">
            {['draft', 'live', 'paused', 'ended'].map((status) => (
              <DropdownMenu.Item
                key={status}
                onSelect={() => onStatusChange(status)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <button
        onClick={onArchive}
        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50"
      >
        <Archive className="h-4 w-4 mr-2" />
        Archive
      </button>

      <button
        onClick={onDelete}
        className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-almarai text-red-700 bg-white hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </button>
    </div>
  );
}