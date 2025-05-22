import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Clock, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Response } from './types';

interface EngagementTabProps {
  responses: Response[];
}

export function EngagementTab({ responses }: EngagementTabProps) {
  // Calculate engagement metrics
  const engagementMetrics = {
    averageTimeSpent: '2m 34s',
    bounceRate: '23%',
    completionRate: '76%',
    returnRate: '15%'
  };

  // Mock data for time spent distribution
  const timeSpentData = [
    { time: '0-1m', count: 25 },
    { time: '1-2m', count: 45 },
    { time: '2-3m', count: 60 },
    { time: '3-4m', count: 40 },
    { time: '4-5m', count: 20 },
    { time: '5m+', count: 10 }
  ];

  // Mock data for daily engagement
  const dailyEngagement = [
    { date: '2024-02-14', visits: 120, completions: 92 },
    { date: '2024-02-15', visits: 145, completions: 108 },
    { date: '2024-02-16', visits: 132, completions: 98 },
    { date: '2024-02-17', visits: 165, completions: 125 },
    { date: '2024-02-18', visits: 189, completions: 142 },
    { date: '2024-02-19', visits: 176, completions: 138 },
    { date: '2024-02-20', visits: 198, completions: 156 }
  ];

  return (
    <div className="space-y-6">
      {/* Engagement Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Average Time Spent',
            value: engagementMetrics.averageTimeSpent,
            icon: Clock,
            change: '+12.3%',
            trend: 'up'
          },
          {
            title: 'Bounce Rate',
            value: engagementMetrics.bounceRate,
            icon: Users,
            change: '-5.2%',
            trend: 'down'
          },
          {
            title: 'Completion Rate',
            value: engagementMetrics.completionRate,
            icon: ArrowUpRight,
            change: '+8.1%',
            trend: 'up'
          },
          {
            title: 'Return Rate',
            value: engagementMetrics.returnRate,
            icon: ArrowDownRight,
            change: '+2.4%',
            trend: 'up'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <metric.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-almarai text-gray-500">{metric.title}</p>
                  <p className="text-xl font-almarai text-gray-900">{metric.value}</p>
                </div>
              </div>
              <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span className="ml-1 text-sm">{metric.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Time Spent Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-almarai text-gray-900 mb-4">Time Spent Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeSpentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Daily Engagement Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-almarai text-gray-900 mb-4">Daily Engagement Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyEngagement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#6366F1"
                strokeWidth={2}
                name="Total Visits"
              />
              <Line
                type="monotone"
                dataKey="completions"
                stroke="#10B981"
                strokeWidth={2}
                name="Completions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Engagement Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg text-white"
      >
        <h3 className="text-lg font-almarai mb-4">Engagement Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-almarai text-white/90 mb-2">Peak Engagement Times</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Highest completion rates between 2-4 PM
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Most engaged users on weekdays
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-almarai text-white/90 mb-2">Improvement Areas</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Mobile completion rate needs attention
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Consider optimizing form length
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}