import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart2,
  Users,
  Clock,
  TrendingUp,
  Zap,
  FileText,
  Settings,
  Bell,
  Calendar,
  Filter,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Award,
  Star,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import { useAuth } from '../providers/AuthProvider';
import { useTranslation } from 'react-i18next';

const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#10B981', '#F59E0B'];

export default function Dashboard() {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('responses');
  const { t } = useTranslation();
  // Vérifier si les données sont en cours de chargement ou si l'utilisateur n'est pas disponible
  const { user, isLoading } = useAuth();
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        {t("dashboard.loading")}
      </div>
    );
  }

  // Mock data for charts
  const responseData = [
    { date: t(`dashboard.days.Mon`), responses: 120, completionRate: 85 },
    { date: t(`dashboard.days.Tue`), responses: 145, completionRate: 88 },
    { date: t(`dashboard.days.Wed`), responses: 132, completionRate: 92 },
    { date: t(`dashboard.days.Thu`), responses: 165, completionRate: 87 },
    { date: t(`dashboard.days.Fri`), responses: 189, completionRate: 90 },
    { date: t(`dashboard.days.Sat`), responses: 176, completionRate: 89 },
    { date: t(`dashboard.days.Sun`), responses: 198, completionRate: 91 },
  ];

  const deviceData = [
    { name: t(`dashboard.devices.Desktop`), value: 55 },
    { name: t(`dashboard.devices.Mobile`), value: 35 },
    { name: t(`dashboard.devices.Tablet`), value: 10 },
  ];

  const formPerformance = [
    { name: t("dashboard.forms.Customer_Survey"), responses: 234, growth: 12.378 },
    { name: t("dashboard.forms.Employee_Feedback"), responses: 189, growth: 8.7 },
    { name: t("dashboard.forms.Product_Research"), responses: 156, growth: -2.4 },
    { name: t("dashboard.forms.Event_Registration"), responses: 145, growth: 15.2 },
  ];

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
          <div>
            <h1 className='text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900'>
              {t("dashboard.title")}
            </h1>
            <p className='mt-1 text-sm text-gray-500'>
              {t("dashboard.subtitle")}
            </p>
          </div>
          <div className='flex items-center space-x-3'>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className='rounded-lg border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500'>
              <option value='7d'>{t("dashboard.last7")}</option>
              <option value='30d'>{t("dashboard.last30")}</option>
              <option value='90d'>{t("dashboard.last90")}</option>
              <option value='1y'>{t("dashboard.lastYear")}</option>
            </select>
            <button className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-almarai rounded-lg text-gray-700 bg-white hover:bg-gray-50'>
              <Filter className='h-4 w-4 mr-2' />
              {t("dashboard.filters")}
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>
          {[
            {
              title: t("dashboard.stats.totalResponses"),
              value: '1,234',
              change: '+12.3%',
              trend: 'up',
              icon: BarChart2,
              color: 'bg-indigo-500',
            },
            {
              title: t("dashboard.stats.activeForms"),
              value: '12',
              change: '+2.4%',
              trend: 'up',
              icon: FileText,
              color: 'bg-purple-500',
            },
            {
              title: t("dashboard.stats.avgCompletionRate"),
              value: '89%',
              change: '-1.2%',
              trend: 'down',
              icon: Target,
              color: 'bg-pink-500',
            },
            {
              title: t("dashboard.stats.totalUsers"),
              value: '892',
              change: '+5.4%',
              trend: 'up',
              icon: Users,
              color: 'bg-emerald-500',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200'>
              <div className='flex items-center justify-between'>
                <div className={`${stat.color} bg-opacity-10 p-3 rounded-lg`}>
                  <stat.icon
                    className={`h-6 w-6 ${stat.color} bg-opacity-100 text-white`}
                  />
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai ${stat.trend === 'up'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className='h-4 w-4 mr-1' />
                  ) : (
                    <ArrowDownRight className='h-4 w-4 mr-1' />
                  )}
                  {stat.change}
                </span>
              </div>
              <div className='mt-4'>
                <h3 className='text-4xl   font-bold font-almarai font-almarai  font-almarai text-gray-900'>
                  {stat.value}
                </h3>
                <p className='mt-1 text-sm text-gray-500'>{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* Response Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-lg font-almarai text-gray-900'>
                {t("dashboard.charts.responseTrends")}
              </h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className='text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'>
                <option value='responses'>
                  {t("dashboard.stats.totalResponses")}
                </option>
                <option value='completionRate'>Completion Rate</option>
              </select>
            </div>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={responseData}>
                  <defs>
                    <linearGradient
                      id='colorResponses'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'>
                      <stop offset='5%' stopColor='#4F46E5' stopOpacity={0.1} />
                      <stop offset='95%' stopColor='#4F46E5' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type='monotone'
                    dataKey={
                      selectedMetric === 'responses'
                        ? 'responses'
                        : 'completionRate'
                    }
                    stroke='#4F46E5'
                    fillOpacity={1}
                    fill='url(#colorResponses)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Device Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
            <h3 className='text-lg font-almarai text-gray-900 mb-6'>
              {t("dashboard.charts.deviceDistribution")}
            </h3>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx='50%'
                    cy='50%'
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey='value'
                    label={({ name, value }) => `${name}: ${value}%`}>
                    {deviceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Form Performance & Recent Activity */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Form Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
            <h3 className='text-lg'>{t("dashboard.charts.formPerformance")}</h3>

            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                <thead>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider'>
                      {t("dashboard.charts.formName")}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider'>
                      {t("dashboard.charts.responses")}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider'>
                      {t("dashboard.charts.growth")}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider'>
                      {t("dashboard.charts.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {formPerformance.map((form, index) => (
                    <tr key={form.name} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-almarai text-gray-900'>
                          {form.name}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>
                          {form.responses}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai ${form.growth >= 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                          {form.growth >= 0 ? (
                            <ArrowUpRight className='h-4 w-4 mr-1' />
                          ) : (
                            <ArrowDownRight className='h-4 w-4 mr-1' />
                          )}
                          {Math.abs(form.growth)}%
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <Link
                          to={`/forms/${index + 1}/results`}
                          className='text-indigo-600 hover:text-indigo-900'>
                          {t("dashboard.charts.viewDetails")}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
            <h3 className='text-lg font-almarai text-gray-900 mb-6'>
              {t("dashboard.quickActions.title")}
            </h3>
            <div className='space-y-4'>
              {[
                {
                  name: t("dashboard.quickActions.createForm"),
                  description: t("dashboard.quickActions.createFormDesc"),
                  icon: Zap,
                  color: 'text-indigo-600',
                  bgColor: 'bg-indigo-50',
                  link: '/forms/create',
                },
                {
                  name: t("dashboard.quickActions.viewAnalytics"),
                  description: t("dashboard.quickActions.viewAnalyticsDesc"),
                  icon: BarChart2,
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-50',
                  link: '/forms',
                },
                {
                  name: t("dashboard.quickActions.recentResponses"),
                  description: t("dashboard.quickActions.recentResponsesDesc"),
                  icon: Clock,
                  color: 'text-pink-600',
                  bgColor: 'bg-pink-50',
                  link: '/forms',
                },
                {
                  name: t("dashboard.quickActions.settings"),
                  description: t("dashboard.quickActions.settingsDesc"),
                  icon: Settings,
                  color: 'text-emerald-600',
                  bgColor: 'bg-emerald-50',
                  link: '/settings',
                },
              ].map((action) => (
                <Link
                  key={action.name}
                  to={action.link}
                  className='block p-4 rounded-lg border border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 group'>
                  <div className='flex items-center'>
                    <div
                      className={`${action.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <div className='ml-4 flex-1'>
                      <p className='text-sm font-almarai text-gray-900'>
                        {action.name}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {action.description}
                      </p>
                    </div>
                    <ChevronRight className='h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform duration-200' />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
