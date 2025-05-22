import React from 'react';
import { format } from 'date-fns';
import { Activity } from '@/types';

interface TeamActivityLogProps {
  activities: Activity[];
}

export function TeamActivityLog({ activities }: TeamActivityLogProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, activityIdx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.type === 'create'
                          ? 'bg-green-500'
                          : activity.type === 'update'
                            ? 'bg-blue-500'
                            : activity.type === 'delete'
                              ? 'bg-red-500'
                              : 'bg-gray-500'
                        }`}
                    >
                      {activity.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          {activity.content}{' '}
                          <a href="#" className="font-almarai text-gray-900">
                            {activity.user}
                          </a>
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={activity.date}>
                          {format(new Date(activity.date), 'MMM d, yyyy HH:mm')}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}