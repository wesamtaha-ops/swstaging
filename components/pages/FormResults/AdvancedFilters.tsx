import React from 'react';
import { Filter } from 'lucide-react';

interface AdvancedFiltersProps {
  filters: {
    demographics: string;
    location: string;
    sentiment: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

export function AdvancedFilters({ filters, onFilterChange }: AdvancedFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-almarai text-gray-700">Demographics</label>
          <select
            value={filters.demographics}
            onChange={(e) => onFilterChange('demographics', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">All Ages</option>
            <option value="18-24">18-24</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45+">45+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-almarai text-gray-700">Location</label>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">All Locations</option>
            <option value="us">United States</option>
            <option value="eu">Europe</option>
            <option value="asia">Asia</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-almarai text-gray-700">Sentiment</label>
          <select
            value={filters.sentiment}
            onChange={(e) => onFilterChange('sentiment', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>
      </div>
    </div>
  );
}