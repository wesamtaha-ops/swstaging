import React from 'react';
import { BarChart2, Users, FileText, TrendingUp } from 'lucide-react';

const stats = [
  { name: 'Total Responses', value: '1,234', change: '+12.3%', icon: BarChart2 },
  { name: 'Active Forms', value: '12', change: '+2.4%', icon: FileText },
  { name: 'Total Visitors', value: '3,456', change: '+8.7%', icon: Users },
  { name: 'Conversion Rate', value: '24.5%', change: '+5.2%', icon: TrendingUp },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-almarai text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-almarai text-gray-900">
                      {stat.value}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-almarai text-green-600">
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}