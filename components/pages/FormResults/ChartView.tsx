import React from 'react';
import {
  BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Response } from './types';

interface ChartViewProps {
  responses: Response[];
  view: 'individual' | 'aggregate';
  setView: (view: 'individual' | 'aggregate') => void;
}

export function ChartView({ responses, view, setView }: ChartViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-almarai text-gray-900">Satisfaction Distribution</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('individual')}
            className={`p-2 rounded-md ${view === 'individual' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'
              }`}
          >
            <BarChart2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setView('aggregate')}
            className={`p-2 rounded-md ${view === 'aggregate' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'
              }`}
          >
            <PieChartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {view === 'individual' ? (
          <BarChart data={responses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="answers.satisfaction" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="answers.satisfaction" fill="#6366F1" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={responses}
              dataKey="answers.satisfaction"
              nameKey="id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#6366F1"
            >
              {responses.map((entry, index) => (
                <Cell key={index} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
}