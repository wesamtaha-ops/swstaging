import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { ResponseDetails } from '@/types';

interface ResponseHeaderProps {
  response: ResponseDetails;
}

export function ResponseHeader({ response }: ResponseHeaderProps) {
  const getStatusStyles = () => {
    switch (response.status) {
      case 'complete':
        return {
          bg: 'bg-green-50',
          text: 'text-green-800',
          icon: <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
        };
      case 'partial':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-800',
          icon: <Clock className="h-5 w-5 text-yellow-500 mr-2" />
        };
      case 'invalid':
        return {
          bg: 'bg-red-50',
          text: 'text-red-800',
          icon: <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-800',
          icon: null
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className={`mb-6 p-4 rounded-lg ${styles.bg}`}>
      <div className="flex items-center">
        {styles.icon}
        <div className="ml-3">
          <h3 className={`text-sm font-almarai ${styles.text}`}>
            {response.status.charAt(0).toUpperCase() + response.status.slice(1)} Response
          </h3>
          <p className="text-sm text-gray-600">
            Completion Rate: {response.metadata.completionRate}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Submitted: {format(new Date(response.submissionStarted), 'PPpp')}
          </p>
        </div>
      </div>
    </div>
  );
}