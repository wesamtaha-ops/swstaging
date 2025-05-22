import React from 'react';
import { ResponseDetails } from '@/types';

interface ResponseAnswersProps {
  response: ResponseDetails;
}

export function ResponseAnswers({ response }: ResponseAnswersProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-almarai text-gray-900">Answers</h3>
      <div className="space-y-4">
        {Object.entries(response.answers).map(([question, answer], index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-almarai text-gray-700 mb-2">{question}</p>
            <p className="text-sm text-gray-900">
              {typeof answer === 'object' ? JSON.stringify(answer) : String(answer)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}