import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Users, Clock, TrendingUp } from 'lucide-react';

interface StatsBannerProps {
  stats: {
    totalForms: number;
    totalResponses: number;
    avgCompletionRate: number;
    activeCollaborators: number;
  };
}

export function StatsBanner({ stats }: StatsBannerProps) {
  const statItems = [
    {
      name: 'Total Forms',
      value: stats.totalForms,
      icon: BarChart2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Total Responses',
      value: stats.totalResponses,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Avg. Completion Rate',
      value: `${stats.avgCompletionRate}%`,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Active Collaborators',
      value: stats.activeCollaborators,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center">
            <div className={`${item.bgColor} rounded-lg p-3`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-almarai text-gray-500">{item.name}</p>
              <p className="mt-1 text-xl font-almarai text-gray-900">{item.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}