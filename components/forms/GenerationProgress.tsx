import React from 'react';
import { motion } from 'framer-motion';

interface GenerationProgressProps {
  currentStep: {
    title: string;
    description: string;
  };
  progress: number;
}

export function GenerationProgress({ currentStep, progress }: GenerationProgressProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="font-almarai text-gray-900">{currentStep.title}</p>
          <p className="text-gray-500">{currentStep.description}</p>
        </div>
        <span className="font-almarai text-purple-600">{progress}%</span>
      </div>

      <div className="relative">
        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-purple-100">
          <motion.div
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-purple-300"
              animate={{
                x: ['0%', '100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}