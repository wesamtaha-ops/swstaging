import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, TrendingUp, Target, AlertTriangle,
  Zap, LineChart, Network, Lock
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import type { Response } from './types';

interface AdvancedAnalyticsProps {
  responses: Response[];
  isPremium?: boolean;
}

export function AdvancedAnalytics({ responses, isPremium: initialIsPremium = false }: AdvancedAnalyticsProps) {
  const [isPremium, setIsPremium] = useState(initialIsPremium);

  // Mock data for predictive analysis
  const predictionData = [
    { date: '2024-03', actual: 150, predicted: 160 },
    { date: '2024-04', actual: 180, predicted: 185 },
    { date: '2024-05', actual: null, predicted: 210 },
    { date: '2024-06', actual: null, predicted: 245 },
  ];

  // Mock sentiment analysis data
  const sentimentTrends = [
    { date: '2024-01', positive: 75, neutral: 20, negative: 5 },
    { date: '2024-02', positive: 80, neutral: 15, negative: 5 },
    { date: '2024-03', positive: 85, neutral: 10, negative: 5 },
  ];

  const premiumFeatures = [
    {
      title: 'Predictive Analytics',
      description: 'AI-powered response prediction and trend forecasting',
      icon: Brain,
      component: (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#4F46E5"
                strokeWidth={2}
                name="Actual Responses"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#E11D48"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted Responses"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      )
    },
    {
      title: 'Sentiment Analysis',
      description: 'Deep learning-based text analysis and emotion detection',
      icon: TrendingUp,
      component: (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sentimentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="positive"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                name="Positive"
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stackId="1"
                stroke="#6B7280"
                fill="#6B7280"
                name="Neutral"
              />
              <Area
                type="monotone"
                dataKey="negative"
                stackId="1"
                stroke="#EF4444"
                fill="#EF4444"
                name="Negative"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )
    },
    {
      title: 'Response Pattern Analysis',
      description: 'Advanced statistical analysis of response patterns and anomalies',
      icon: Network,
      component: (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-almarai text-gray-600">Pattern Confidence</span>
              <span className="text-sm   font-bold font-almarai font-almarai  font-almarai text-indigo-600">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm font-almarai text-gray-600">Identified Patterns</div>
                <div className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-indigo-600">7</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm font-almarai text-gray-600">Anomalies</div>
                <div className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-red-600">2</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Correlation Analysis',
      description: 'Identify relationships between different response variables',
      icon: Target,
      component: (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-sm font-almarai text-gray-900 mb-2">Strong Correlations</h4>
              <div className="space-y-2">
                {[
                  { vars: 'Age × Purchase Frequency', strength: 0.85 },
                  { vars: 'Satisfaction × Recommendation', strength: 0.92 },
                ].map((corr, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{corr.vars}</span>
                    <span className="text-sm font-almarai text-indigo-600">
                      {corr.strength.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleUpgrade = () => {
    // In a real app, this would open a payment flow
    // For demo purposes, we'll just unlock the features
    setIsPremium(true);
  };

  if (!isPremium) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-lg p-8 text-center"
      >
        <Lock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h3 className="text-lg font-almarai text-gray-900 mb-2">
          Premium Analytics
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Unlock advanced analytics features including predictive analysis,
          sentiment tracking, and deep statistical insights.
        </p>
        <button
          onClick={handleUpgrade}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
        >
          <Zap className="h-4 w-4 mr-2" />
          Upgrade to Premium
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {premiumFeatures.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <feature.icon className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-almarai text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">
                {feature.description}
              </p>
            </div>
          </div>
          {feature.component}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white"
      >
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <h3 className="text-lg font-almarai">Anomaly Detection</h3>
        </div>
        <p className="text-sm opacity-90 mb-4">
          Our AI has detected unusual patterns in recent responses that may require attention.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Confidence', value: '92%' },
            { label: 'Impact Level', value: 'Medium' },
            { label: 'Affected Responses', value: '23' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-75">{stat.label}</div>
              <div className="text-lg font-almarai">{stat.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}