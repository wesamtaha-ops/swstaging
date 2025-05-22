import React from 'react';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';

interface StatusChange {
  id: string;
  formId: string;
  status: string;
  changedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: Date;
}

interface StatusChangeHistoryProps {
  changes: StatusChange[];
}

export function StatusChangeHistory({ changes }: StatusChangeHistoryProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {changes.map((change, idx) => (
          <li key={change.id}>
            <div className="relative pb-8">
              {idx !== changes.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center ring-8 ring-white">
                    <Activity className="h-5 w-5 text-indigo-600" />
                  </span>
                </div>
                <div classN