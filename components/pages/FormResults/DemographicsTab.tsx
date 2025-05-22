import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, Globe, Laptop, Smartphone, Tablet, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Response } from './types';

interface DemographicsTabProps {
  responses: Response[];
}

interface CountryData {
  country: string;
  responses: number;
  completionRate: number;
  avgTimeSpent: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  flag: string;
}

export function DemographicsTab({ responses }: DemographicsTabProps) {
  // Age distribution data
  const ageData = [
    { name: '18-24', value: 15, color: '#6366F1' },
    { name: '25-34', value: 30, color: '#8B5CF6' },
    { name: '35-44', value: 25, color: '#EC4899' },
    { name: '45-54', value: 20, color: '#10B981' },
    { name: '55+', value: 10, color: '#F59E0B' }
  ];

  // Mock country data with flags
  const countryData: CountryData[] = [
    {
      country: 'United States',
      responses: 450,
      completionRate: 85,
      avgTimeSpent: '4m 30s',
      trend: 'up',
      trendValue: '+12%',
      flag: '🇺🇸'
    },
    {
      country: 'United Kingdom',
      responses: 280,
      completionRate: 82,
      avgTimeSpent: '4m 15s',
      trend: 'up',
      trendValue: '+8%',
      flag: '🇬🇧'
    },
    {
      country: 'Germany',
      responses: 220,
      completionRate: 79,
      avgTimeSpent: '4m 45s',
      trend: 'down',
      trendValue: '-3%',
      flag: '🇩🇪'
    },
    {
      country: 'France',
      responses: 180,
      completionRate: 81,
      avgTimeSpent: '4m 20s',
      trend: 'up',
      trendValue: '+5%',
      flag: '🇫🇷'
    },
    {
      country: 'Canada',
      responses: 150,
      completionRate: 84,
      avgTimeSpent: '4m 10s',
      trend: 'stable',
      trendValue: '0%',
      flag: '🇨🇦'
    },
    {
      country: 'Australia',
      responses: 120,
      completionRate: 83,
      avgTimeSpent: '4m 25s',
      trend: 'up',
      trendValue: '+7%',
      flag: '🇦🇺'
    },
    {
      country: 'Japan',
      responses: 110,
      completionRate: 88,
      avgTimeSpent: '3m 55s',
      trend: 'up',
      trendValue: '+15%',
      flag: '🇯🇵'
    },
    {
      country: 'Brazil',
      responses: 90,
      completionRate: 76,
      avgTimeSpent: '4m 50s',
      trend: 'down',
      trendValue: '-2%',
      flag: '🇧🇷'
    }
  ];

  // Device usage data
  const deviceData = [
    { name: 'Desktop', value: 55, color: '#6366F1' },
    { name: 'Mobile', value: 35, color: '#10B981' },
    { name: 'Tablet', value: 10, color: '#F59E0B' }
  ];

  // Sort countries by number of responses
  const sortedCountryData = [...countryData].sort((a, b) => b.responses - a.responses);

  return (
    <div className="space-y-6">
      {/* Demographics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-almarai text-gray-500">Total Respondents</p>
              <p className="text-2xl font-almarai text-gray-900">{responses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-almarai text-gray-500">Countries</p>
              <p className="text-2xl font-almarai text-gray-900">{countryData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-almarai text-gray-500">Global Growth</p>
              <p className="text-2xl font-almarai text-gray-900">+24%</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Country Response Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-almarai text-gray-900">Responses by Country</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider">
                  Responses
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider">
                  Avg. Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCountryData.map((country) => (
                <tr key={country.country} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{country.flag}</span>
                      <span className="text-sm font-almarai text-gray-900">{country.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{country.responses.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 w-24">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{ width: `${country.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{country.completionRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{country.avgTimeSpent}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {country.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : country.trend === 'down' ? (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      ) : (
                        <span className="h-4 w-4 text-gray-400 mr-1">→</span>
                      )}
                      <span className={`text-sm ${country.trend === 'up'
                        ? 'text-green-600'
                        : country.trend === 'down'
                          ? 'text-red-600'
                          : 'text-gray-600'
                        }`}>
                        {country.trendValue}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-almarai text-gray-900 mb-6">Age Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Device Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-almarai text-gray-900 mb-6">Device Usage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {deviceData.map((device) => (
                <div key={device.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {device.name === 'Desktop' && <Laptop className="h-5 w-5 text-indigo-600 mr-2" />}
                    {device.name === 'Mobile' && <Smartphone className="h-5 w-5 text-green-600 mr-2" />}
                    {device.name === 'Tablet' && <Tablet className="h-5 w-5 text-yellow-600 mr-2" />}
                    <span className="text-sm font-almarai text-gray-900">{device.name}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${device.value}%`,
                          backgroundColor: device.color
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{device.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Demographics Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg text-white"
      >
        <h3 className="text-lg font-almarai mb-4">Demographics Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-almarai text-white/90 mb-2">Key Observations</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Highest engagement from 25-34 age group
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                US leads with 30% of total responses
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Desktop remains primary platform (55%)
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-almarai text-white/90 mb-2">Recommendations</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Optimize mobile experience
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Expand marketing in emerging markets
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Consider regional targeting strategies
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}