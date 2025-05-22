import React from 'react';
import { format } from 'date-fns';
import { Activity } from '@/types';
import { AlertTriangle, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';

interface AuditLogProps {
  activities: Activity[];
}

export function AuditLog({ activities }: AuditLogProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'update':
        return <RefreshCw className="h-5 w-5 text-blue-500" />;
      case 'delete':
        return <Trash2 className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <li key={activity.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-almarai text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-500">{activity.content}</p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <p className="text-sm text-gray-500">
                    {format(new Date(activity.date), 'MMM d, yyyy HH:mm')}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}