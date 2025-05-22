import React from 'react';
import { motion } from 'framer-motion';
import { Response } from './types';

interface NPSScoreProps {
  responses: Response[];
}

export function NPSScore({ responses }: NPSScoreProps) {
  const generateNPSScore = () => {
    const promoters = responses.filter(r => r.answers.recommendation >= 9).length;
    const detractors = responses.filter(r => r.answers.recommendation <= 6).length;
    const total = responses.length;
    return total === 0 ? 0 : ((promoters - detractors) / total) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-lg font-almarai text-gray-900 mb-4">Net Promoter Score</h3>
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-5xl   font-bold font-almarai font-almarai  font-almarai text-indigo-600 mb-2">
            {generateNPSScore().toFixed(1)}
          </div>
          <p className="text-sm text-gray-500">NPS Score</p>
        </div>
      </div>
    </motion.div>
  );
}