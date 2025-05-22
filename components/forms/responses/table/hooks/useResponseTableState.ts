import { useState, useMemo } from 'react';
import { ResponseDetails } from '@/types';
import { SortConfig, TableFilters } from '../types';

export function useResponseTableState(responses: ResponseDetails[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    columnId: 'lastUpdated',
    direction: 'desc'
  });

  const [filters, setFilters] = useState<TableFilters>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const sortedResponses = useMemo(() => {
    let result = [...responses];

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(response => 
        Object.values(response.answers).some(answer => 
          String(answer).toLowerCase().includes(searchLower)
        )
      );
    }

    if (filters.dateRange) {
      result = result.filter(response => {
        const date = new Date(response.lastUpdated);
        return date >= filters.dateRange!.start && date <= filters.dateRange!.end;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue = a.answers[sortConfig.columnId] || a.lastUpdated;
      let bValue = b.answers[sortConfig.columnId] || b.lastUpdated;
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [responses, sortConfig, filters]);

  const handleSort = (columnId: string) => {
    setSortConfig(prev => ({
      columnId,
      direction: prev.columnId === columnId && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return {
    sortedResponses,
    sortConfig,
    handleSort,
    filters,
    setFilters,
    page,
    setPage,
    pageSize,
    setPageSize
  };
}