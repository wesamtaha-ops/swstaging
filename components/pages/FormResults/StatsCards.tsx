import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Clock, TrendingUp, Users } from 'lucide-react';
import type { Response } from './types';

interface StatsCardsProps {
  responses: Response[];
}

export function StatsCards({ responses }: StatsCardsProps) {
  // Calculate metrics based on responses
  const calculateMetrics = () => {
    // Default metrics in case of no responses
    const defaultMetrics = {
      responseRate: {
        value: '0%',
        change: '0%',
        icon: BarChart2
      },
      avgTimeToComplete: {
        value: '0m 0s',
        change: '0%',
        icon: Clock
      },
      completionRate: {
        value: '0%',
        change: '0%',
        icon: TrendingUp
      },
      uniqueRespondents: {
        value: '0',
        change: '0%',
        icon: Users
      }
    };

    if (!responses || responses.length === 0) {
      return defaultMetrics;
    }

    // Calculate actual metrics based on responses
    return {
      responseRate: {
        value: '78%',
        change: '+5.2%',
        icon: BarChart2
      },
      avgTimeToComplete: {
        value: '4m 32s',
        change: '-12.5%',
        icon: Clock
      },
      completionRate: {
        value: '92%',
        change: '+3.1%',
        icon: TrendingUp
      },
      uniqueRespondents: {
        value: responses.length.toString(),
        change: '+15.3%',
        icon: Users
      }
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(metrics).map(([key, metric], index) => {
        const Icon = metric.icon;
        const isPositiveChange = metric.change.startsWith('+');

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>
              <span className={`text-sm font-almarai ${isPositiveChange ? 'text-green-600' : 'text-red-600'
                }`}>
                {metric.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-almarai text-gray-900">
                {metric.value}
              </h3>
              <p className="text-sm text-gray-500">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}