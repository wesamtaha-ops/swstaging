import React from 'react';
import { RefreshCw, Download, Search, Settings } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Checkbox from '@radix-ui/react-checkbox';
import { ResponseColumn } from './types';
import { utils, writeFile } from 'xlsx';
import { Check } from './icons/Check';
import { StatusFilter } from './filters/StatusFilter';

interface TableToolbarProps {
  columns: ResponseColumn[];
  visibleColumns: string[];
  onColumnToggle: (columnId: string) => void;
  onRefresh: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  data: any[];
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
}

export function TableToolbar({
  columns,
  visibleColumns,
  onColumnToggle,
  onRefresh,
  searchTerm,
  onSearchChange,
  data,
  selectedStatus,
  onStatusChange
}: TableToolbarProps) {
  const handleDownload = () => {
    // Prepare data for export - only include visible columns
    const exportData = data.map(row => {
      const exportRow: any = {};
      visibleColumns.forEach(colId => {
        const column = columns.find(c => c.id === colId);
        if (column) {
          if (column.key.includes('.')) {
            const [obj, key] = column.key.split('.');
            exportRow[column.label] = row[obj]?.[key] || '';
          } else {
            exportRow[column.label] = row[column.key] || '';
          }
        }
      });
      return exportRow;
    });

    const worksheet = utils.json_to_sheet(exportData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Responses');
    writeFile(workbook, 'form_responses.xlsx');
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-white flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative min-w-[200px] max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search responses..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        {/* <StatusFilter 
          selectedStatus={selectedStatus}
          onStatusChange={onStatusChange}
        /> */}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onRefresh}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          title="Refresh"
        >
          <RefreshCw className="h-5 w-5" />
        </button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              title="Show/Hide Columns"
            >
              <Settings className="h-5 w-5" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              sideOffset={5}
              align="end"
            >
              <div className="px-3 py-2 text-sm font-almarai text-gray-900 border-b border-gray-200">
                Show/Hide Columns
              </div>
              {columns.map((column) => (
                <DropdownMenu.Item
                  key={column.id}
                  className="focus:outline-none"
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="px-3 py-2 flex items-center space-x-2">
                    <Checkbox.Root
                      className="h-4 w-4 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      checked={visibleColumns.includes(column.id)}
                      onCheckedChange={() => onColumnToggle(column.id)}
                      id={`column-${column.id}`}
                    >
                      <Checkbox.Indicator>
                        <Check className="h-3 w-3 text-white" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label
                      htmlFor={`column-${column.id}`}
                      className="text-sm text-gray-700 select-none cursor-pointer"
                    >
                      {column.label}
                    </label>
                  </div>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <button
          onClick={handleDownload}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          title="Download as Excel"
        >
          <Download className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}