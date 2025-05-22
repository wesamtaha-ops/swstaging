import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe } from 'lucide-react';
import type { ResponseDetails } from '@/types';

interface GeographicDistributionProps {
  responses: ResponseDetails[];
}

export function GeographicDistribution({ responses }: GeographicDistributionProps) {
  const calculateGeographicData = () => {
    const locations = responses.reduce((acc, response) => {
      // In a real app, you would use IP geolocation or actual location data
      // For now, we'll use the network type as a proxy
      const location = response.network || 'Unknown';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(locations)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  const data = calculateGeographicData();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Globe className="h-5 w-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-almarai text-gray-900">Geographic Distribution</h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}