import React from 'react';
import { ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import type { ResponseColumn, SortConfig } from './types';

interface ResponseTableHeaderProps {
  columns: ResponseColumn[];
  sortConfig: SortConfig;
  onSort: (columnId: string) => void;
  onColumnResize: (columnId: string, width: number) => void;
}

export function ResponseTableHeader({ columns, sortConfig, onSort, onColumnResize }: ResponseTableHeaderProps) {
  const [resizingColumn, setResizingColumn] = React.useState<string | null>(null);
  const [startX, setStartX] = React.useState(0);
  const [startWidth, setStartWidth] = React.useState(0);

  const handleResizeStart = (e: React.MouseEvent, columnId: string, currentWidth: number) => {
    setResizingColumn(columnId);
    setStartX(e.pageX);
    setStartWidth(currentWidth);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizingColumn) return;

    const diff = e.pageX - startX;
    const newWidth = Math.max(100, startWidth + diff);
    onColumnResize(resizingColumn, newWidth);
  };

  const handleResizeEnd = () => {
    setResizingColumn(null);
  };

  React.useEffect(() => {
    if (resizingColumn) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizingColumn]);

  return (
    <thead className="bg-gray-50 text-gray-500 text-sm font-almarai select-none">
      <tr>
        {columns.map((column) => (
          <th
            key={column.id}
            className="relative bg-gray-50 px-6 py-3 text-left"
            style={{ width: column.width ? `${column.width}px` : undefined }}
          >
            <div className="flex items-center group">
              {column.sortable ? (
                <button
                  onClick={() => onSort(column.id)}
                  className="flex items-center text-xs h-10"
                >
                  {column.label}
                  <span className="ml-2">
                    {sortConfig.columnId === column.id ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : null}
                  </span>
                </button>
              ) : (
                <span>{column.label}</span>
              )}

              {/* Resize Handle */}
              <div
                className="absolute right-0 top-0 bottom-0 w-4 cursor-col-resize flex items-center justify-center opacity-0 group-hover:opacity-100"
                onMouseDown={(e) => handleResizeStart(e, column.id, column.width || 100)}
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </th>
        ))}
        <th className="relative bg-gray-50 px-6 py-3 text-left" />
      </tr>
    </thead>
  );
}