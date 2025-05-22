import { Search } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';


interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
}: SearchAndFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t('searchFilters.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center rounded-md">
        {/* Ajoutez un filtre de statut */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)} // Mise à jour de l'état avec la valeur sélectionnée
          className="block w-full sm:w-auto pl-3 pr-10 py-2 sm:py-3 text-gray-500 font-almarai border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="all">{t('searchFilters.allStatus')}</option>
          <option value="live">{t('searchFilters.live')}</option>
          <option value="closed">{t('searchFilters.closed')}</option>
        </select>

        {/* Sélection du tri */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="block w-full sm:w-auto pl-3 pr-10 py-2 sm:py-3 text-gray-500 font-almarai border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="all">{t('searchFilters.allStatus')}</option>
          <option value="lastUpdated">{t('searchFilters.lastUpdated')}</option>
          <option value="responses">{t('searchFilters.mostResponses')}</option>
          <option value="completionRate">{t('searchFilters.completionRate')}</option>
        </select>
      </div>
    </div>
  );
}
