import React, { useState, useCallback } from 'react';
import { Calendar } from 'lucide-react';
import { ResponseTableHeader } from './ResponseTableHeader';
import { ResponseTableRow } from './ResponseTableRow';
import { ResponseTablePagination } from './ResponseTablePagination';
import { TableToolbar } from './TableToolbar';
import { useResponseTableState } from './hooks/useResponseTableState';
import { useResponseTableSelection } from './hooks/useResponseTableSelection';
import type { ResponseColumn, ResponseData } from './types';
import { mockResponses } from './mockData';
import { DropOffTab } from './DropOffTab';
import './styles/ResponseTable.css';

interface ResponseTableProps {
  responses?: ResponseData[];
  questions?: Array<{ id: string; title: string }>;
  onViewDetails: (response: ResponseData) => void;
}

export function ResponseTable({ 
  responses = mockResponses, 
  questions = [], 
  onViewDetails 
}: ResponseTableProps) {
  const generateColumns = useCallback((): ResponseColumn[] => {
    const baseColumns: ResponseColumn[] = [
      { id: 'lastUpdated', key: 'lastUpdated', label: 'Last updated', sortable: true, width: 180, type: 'date' },
      { id: 'status', key: 'status', label: 'Status', sortable: true, width: 120, type: 'status' },
      { id: 'fullName', key: 'answers.fullName', label: 'What is your full name?', sortable: true, width: 200 },
      { id: 'email', key: 'answers.email', label: 'What is your email address?', sortable: true, width: 200, type: 'email' },
      { id: 'phone', key: 'answers.phone', label: 'What is your phone number?', sortable: true, width: 180 },
      { id: 'address', key: 'answers.address', label: 'Where is your Address', sortable: true, width: 250 },
      { id: 'city', key: 'answers.city', label: 'Your City', sortable: true, width: 150 },
      { id: 'state', key: 'answers.state', label: 'State/Province', sortable: true, width: 200 },
      { id: 'satisfied', key: 'answers.satisfied', label: 'Are you Satisfied', sortable: true, width: 200 },
    ];

    return [...baseColumns];
  }, [questions]);

  const [columns, setColumns] = useState<ResponseColumn[]>(() => generateColumns());
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    () => columns.map(col => col.id)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const { 
    sortedResponses, 
    sortConfig, 
    handleSort, 
    filters, 
    setFilters,
    page,
    setPage,
    pageSize,
    setPageSize
  } = useResponseTableState(responses);

  const {
    selectedRows,
    toggleRowSelection,
    selectAllRows,
    isAllSelected
  } = useResponseTableSelection(responses);

  const handleColumnResize = (columnId: string, width: number) => {
    setColumns(prev => 
      prev.map(col => 
        col.id === columnId ? { ...col, width } : col
      )
    );
  };

  const handleColumnToggle = (columnId: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  const handleRefresh = () => {
  
  };

  const visibleColumnsList = columns.filter(col => visibleColumns.includes(col.id));

  const filteredResponses = sortedResponses.filter(response => {
    const matchesSearch = Object.values(response.answers).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = !selectedStatus || response.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white shadow-sm rounded-lg -mt-6 border border-gray-200">
      <TableToolbar
        columns={columns}
        visibleColumns={visibleColumns}
        onColumnToggle={handleColumnToggle}
        onRefresh={handleRefresh}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        data={filteredResponses}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <ResponseTableHeader
            columns={visibleColumnsList}
            sortConfig={sortConfig}
            onSort={handleSort}
            onColumnResize={handleColumnResize}
            isAllSelected={isAllSelected}
            onSelectAll={selectAllRows}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResponses.map((response) => (
              <ResponseTableRow
                key={response.id}
                columns={visibleColumnsList}
                data={response}
                onView={() => onViewDetails(response)}
                isSelected={selectedRows.includes(response.id)}
                onToggleSelect={() => toggleRowSelection(response.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <ResponseTablePagination
        page={page}
        pageSize={pageSize}
        total={filteredResponses.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}