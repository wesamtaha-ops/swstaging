import React from 'react';
import { Search, Calendar } from 'lucide-react';
import { TableFilters } from './types';
import { DateRangePicker } from './DateRangePicker';

interface ResponseTableFiltersProps {
  filters: TableFilters;
  onFilterChange: (filters: TableFilters) => void;
}

export function ResponseTableFilters({ filters, onFilterChange }: ResponseTableFiltersProps) {
  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search responses..."
              value={filters.search || ''}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={filters.status?.[0] || ''}
              onChange={(e) => onFilterChange({ 
                ...filters, 
                status: e.target.value ? [e.target.value] : undefined 
              })}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Status</option>
              <option value="complete">Complete</option>
              <option value="partial">Partial</option>
              <option value="invalid">Invalid</option>
            </select>
          </div>

          <DateRangePicker
            startDate={filters.dateRange?.start}
            endDate={filters.dateRange?.end}
            onChange={(range) => onFilterChange({
              ...filters,
              dateRange: range.start && range.end ? range : undefined
            })}
          />
        </div>
      </div>
    </div>
  );
}