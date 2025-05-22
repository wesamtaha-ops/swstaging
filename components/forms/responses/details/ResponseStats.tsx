import React from 'react';
import { ResponseDetails } from '@/types';

interface ResponseStatsProps {
  response: ResponseDetails;
}

export function ResponseStats({ response }: ResponseStatsProps) {
  const stats = [
    {
      label: 'Time Spent',
      value: response.metadata.timeSpent
    },
    {
      label: 'Pages Visited',
      value: response.metadata.pagesVisited
    },
    {
      label: 'Completion Rate',
      value: `${response.metadata.completionRate}%`
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-almarai text-gray-900 mb-4">Response Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-almarai text-gray-500">{stat.label}</p>
            <p className="text-lg font-almarai text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}