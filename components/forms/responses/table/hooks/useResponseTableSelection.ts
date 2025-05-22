import { useState } from 'react';
import { ResponseDetails } from '@/types';

export function useResponseTableSelection(responses: ResponseDetails[]) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRowSelection = (responseId: string) => {
    setSelectedRows(prev => 
      prev.includes(responseId)
        ? prev.filter(id => id !== responseId)
        : [...prev, responseId]
    );
  };

  const selectAllRows = () => {
    setSelectedRows(prev => 
      prev.length === responses.length
        ? []
        : responses.map(r => r.id)
    );
  };

  const isAllSelected = responses.length > 0 && selectedRows.length === responses.length;

  return {
    selectedRows,
    toggleRowSelection,
    selectAllRows,
    isAllSelected
  };
}