import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import type { ResponseDetails } from '@/types';

interface DeviceBreakdownProps {
  responses: ResponseDetails[];
}

const COLORS = ['#4F46E5', '#7C3AED', '#EC4899'];

export function DeviceBreakdown({ responses }: DeviceBreakdownProps) {
  const calculateDeviceBreakdown = () => {
    const devices = responses.reduce((acc, response) => {
      let device = 'desktop';

      // Determine device based on browser/OS info
      if (response.browser?.toLowerCase().includes('mobile') ||
        response.os?.toLowerCase().includes('ios') ||
        response.os?.toLowerCase().includes('android')) {
        device = 'mobile';
      } else if (response.browser?.toLowerCase().includes('tablet') ||
        response.os?.toLowerCase().includes('ipad')) {
        device = 'tablet';
      }

      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'Mobile', value: devices.mobile || 0, color: '#4F46E5' },
      { name: 'Tablet', value: devices.tablet || 0, color: '#7C3AED' },
      { name: 'Desktop', value: devices.desktop || 0, color: '#EC4899' }
    ];
  };

  const data = calculateDeviceBreakdown();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-almarai text-gray-900 mb-6">Device Breakdown</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value: string) => {
                return (
                  <span className="text-sm text-gray-700">
                    {value === 'Mobile' && <Smartphone className="inline-block h-4 w-4 mr-1" />}
                    {value === 'Tablet' && <Tablet className="inline-block h-4 w-4 mr-1" />}
                    {value === 'Desktop' && <Monitor className="inline-block h-4 w-4 mr-1" />}
                    {value}
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}