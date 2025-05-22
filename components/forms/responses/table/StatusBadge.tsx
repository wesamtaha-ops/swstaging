import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'complete' | 'partial' | 'invalid';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'complete':
        return {
          icon: CheckCircle,
          bg: 'bg-green-100',
          text: 'text-green-800',
          iconColor: 'text-green-500'
        };
      case 'partial':
        return {
          icon: Clock,
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          iconColor: 'text-yellow-500'
        };
      case 'invalid':
        return {
          icon: AlertTriangle,
          bg: 'bg-red-100',
          text: 'text-red-800',
          iconColor: 'text-red-500'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai ${config.bg} ${config.text}`}>
      <Icon className={`h-4 w-4 mr-1 ${config.iconColor}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}