import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Clock, TrendingUp, Users, Target, ArrowUp, ArrowDown } from 'lucide-react';
import type { Response } from './types';

interface MetricsGridProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  responses: Response[];
}

export function MetricsGrid({ activeTab, onTabChange, responses }: MetricsGridProps) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'completion', label: 'Completion' },
    { id: 'demographics', label: 'Demographics' }
  ];

  // Calculate metrics based on responses
  const calculateMetrics = () => {
    return {
      responseRate: {
        value: '78%',
        trend: 'up',
        change: '+5.2%'
      },
      completionRate: {
        value: '92%',
        trend: 'up',
        change: '+3.1%'
      },
      bounceRate: {
        value: '24%',
        trend: 'down',
        change: '-2.3%'
      }
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-almarai rounded-md ${activeTab === tab.id
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Response Rate',
            value: metrics.responseRate.value,
            change: metrics.responseRate.change,
            trend: metrics.responseRate.trend,
            icon: BarChart2,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50'
          },
          {
            title: 'Completion Rate',
            value: metrics.completionRate.value,
            change: metrics.completionRate.change,
            trend: metrics.completionRate.trend,
            icon: Target,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
          },
          {
            title: 'Bounce Rate',
            value: metrics.bounceRate.value,
            change: metrics.bounceRate.change,
            trend: metrics.bounceRate.trend,
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className={`${metric.bgColor} p-3 rounded-lg`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span className="ml-1 text-sm">{metric.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-almarai text-gray-900">
                {metric.value}
              </h3>
              <p className="text-sm text-gray-500">
                {metric.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}