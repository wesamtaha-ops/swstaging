import React from 'react';
import { Eye, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import type { ResponseColumn, ResponseData } from './types';
import { format } from 'date-fns';

interface ResponseTableRowProps {
  columns: ResponseColumn[];
  data: ResponseData;
  onView: () => void;
  isSelected: boolean;
  onToggleSelect: () => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'complete':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: <CheckCircle className='h-4 w-4 text-green-500 mr-1' />,
        };
      case 'partial':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: <Clock className='h-4 w-4 text-yellow-500 mr-1' />,
        };
      case 'invalid':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: <AlertTriangle className='h-4 w-4 text-red-500 mr-1' />,
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: null,
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai ${styles.bg} ${styles.text}`}>
      {styles.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export function ResponseTableRow({
  columns,
  data,
  onView,
  isSelected,
  onToggleSelect,
}: ResponseTableRowProps) {


  const getCellContent = (column: ResponseColumn) => {

    if (column.type === 'status') {
      return <StatusBadge status={data.status} />;
    }
    if (column.type === 'date') {
      return format(new Date(data.lastUpdated), 'MMM d, yyyy HH:mm');
    }
    if (column.key.startsWith('answers.')) {
      const key = column.key.split('.')[1];
      return data.answers?.[key] || '-';
    }
    return data[column.key as keyof ResponseData] || '-';
  };

  return (
    <tr className='hover:bg-gray-50'>
      <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>
        <div className='flex items-center space-x-4'>
          <button
            onClick={onView}
            className='inline-flex items-center px-3 py-1  duration-200'>
            <Eye className='h-4 w-4 mr-2' />
            View
          </button>
        </div>
      </td>
      {columns.map((column) => (
        <td
          key={column.id}
          className='px-6 py-2 whitespace-nowrap text-xs text-gray-900'
          style={{ width: column.width ? `${column.width}px` : undefined }}>
          {getCellContent(column)}
        </td>
      ))}
    </tr>
  );
}
