import React, { useState } from 'react';
import { Calendar, Tag, User, Flag, Save, X } from 'lucide-react';
import { DateRangePicker } from './DateRangePicker';
import { CategoryFilter } from './CategoryFilter';
import { StatusFilter } from './StatusFilter';
import { CreatorFilter } from './CreatorFilter';
import { PriorityFilter } from './PriorityFilter';

interface FilterPreset {
  id: string;
  name: string;
  filters: FilterState;
}

interface FilterState {
  dateRange: { start: Date | null; end: Date | null };
  categories: string[];
  statuses: string[];
  creators: string[];
  priorities: string[];
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export function FilterPanel({ isOpen, onClose, onApplyFilters }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: null, end: null },
    categories: [],
    statuses: [],
    creators: [],
    priorities: []
  });

  const [savedPresets, setSavedPresets] = useState<FilterPreset[]>([]);
  const [presetName, setPresetName] = useState('');

  const handleSavePreset = () => {
    if (!presetName) return;

    const newPreset: FilterPreset = {
      id: Date.now().toString(),
      name: presetName,
      filters: { ...filters }
    };

    setSavedPresets([...savedPresets, newPreset]);
    setPresetName('');
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: { start: null, end: null },
      categories: [],
      statuses: [],
      creators: [],
      priorities: []
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-almarai text-gray-900">Advanced Filters</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-almarai text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline-block mr-2" />
                  Date Range
                </label>
                <DateRangePicker
                  startDate={filters.dateRange.start}
                  endDate={filters.dateRange.end}
                  onChange={(range) => setFilters({ ...filters, dateRange: range })}
                />
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700 mb-2">
                  <Tag className="h-4 w-4 inline-block mr-2" />
                  Categories
                </label>
                <CategoryFilter
                  selected={filters.categories}
                  onChange={(categories) => setFilters({ ...filters, categories })}
                />
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700 mb-2">
                  <User className="h-4 w-4 inline-block mr-2" />
                  Creators
                </label>
                <CreatorFilter
                  selected={filters.creators}
                  onChange={(creators) => setFilters({ ...filters, creators })}
                />
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700 mb-2">
                  <Flag className="h-4 w-4 inline-block mr-2" />
                  Priority
                </label>
                <PriorityFilter
                  selected={filters.priorities}
                  onChange={(priorities) => setFilters({ ...filters, priorities })}
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Preset name"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    onClick={handleSavePreset}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-almarai rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Preset
                  </button>
                </div>
              </div>

              {savedPresets.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-almarai text-gray-700 mb-2">Saved Presets</h4>
                  <div className="space-y-2">
                    {savedPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setFilters(preset.filters)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={handleApplyFilters}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-almarai text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-almarai text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}