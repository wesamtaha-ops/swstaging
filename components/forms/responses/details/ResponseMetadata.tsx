import React from 'react';
import { Monitor, Globe, Wifi, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ResponseDetails } from '@/types';

interface ResponseMetadataProps {
  response: ResponseDetails;
}

export function ResponseMetadata({ response }: ResponseMetadataProps) {
  const metadataItems = [
    {
      icon: Calendar,
      label: 'Submission Started',
      value: format(new Date(response.submissionStarted), 'PPpp')
    },
    {
      icon: Clock,
      label: 'Time Spent',
      value: response.metadata.timeSpent
    },
    {
      icon: Monitor,
      label: 'Browser & OS',
      value: `${response.browser} on ${response.os}`
    },
    {
      icon: Wifi,
      label: 'Network',
      value: response.network
    },
    {
      icon: Globe,
      label: 'IP Address',
      value: response.ipAddress
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {metadataItems.map((item, index) => (
        <div key={index} className="flex items-center">
          <item.icon className="h-5 w-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm font-almarai text-gray-500">{item.label}</p>
            <p className="text-sm text-gray-900">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}