import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import {
  X, Globe, Monitor, Cpu, Wifi, Hash, Clock, Calendar,
  CheckCircle, AlertTriangle, Smartphone, ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { ResponseDetails } from '@/types';
import { ResponseHeader } from './details/ResponseHeader';
import { ResponseMetadata } from './details/ResponseMetadata';
import { ResponseAnswers } from './details/ResponseAnswers';
import { ResponseStats } from './details/ResponseStats';
import { ResponseVisualizations } from './details/ResponseVisualizations';
import { ResponseComments } from './ResponseComments';

interface ResponseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  response: ResponseDetails | null;
}

const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#10B981', '#F59E0B'];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'complete':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'partial':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'invalid':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const SubmissionTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'web':
      return <Globe className="h-5 w-5 text-blue-500" />;
    case 'mobile':
      return <Smartphone className="h-5 w-5 text-purple-500" />;
    case 'api':
      return <Cpu className="h-5 w-5 text-indigo-500" />;
    default:
      return null;
  }
};

export function ResponseDetailsModal({ isOpen, onClose, response }: ResponseDetailsModalProps) {
  if (!response) return null;

  const pieData = Object.entries(response.answers)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      name: key,
      value: value
    }));

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-almarai text-gray-900">
              Response Details
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <Tabs.Root defaultValue="details" className="flex-1">
            <Tabs.List className="flex border-b border-gray-200 bg-white px-6">
              <Tabs.Trigger
                value="details"
                className="px-4 py-2 text-sm font-almarai text-gray-500 hover:text-gray-700 border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 focus:outline-none"
              >
                Details
              </Tabs.Trigger>
              <Tabs.Trigger
                value="comments"
                className="px-4 py-2 text-sm font-almarai text-gray-500 hover:text-gray-700 border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 focus:outline-none ml-8"
              >
                <div className="flex items-center">
                  Comments
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {response.comments?.length || 0}
                  </span>
                </div>
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="details" className="flex-1 p-6">
              <ResponseHeader response={response} />
              <ResponseMetadata response={response} />
              <ResponseVisualizations response={response} />
              <ResponseAnswers response={response} />
              <ResponseStats response={response} />
            </Tabs.Content>

            <Tabs.Content value="comments" className="flex-1 p-6">
              <ResponseComments
                responseId={response.id}
                collaborators={[
                  {
                    id: '1',
                    name: 'John Doe',
                    avatar: 'https://ui-avatars.com/api/?name=John+Doe'
                  },
                  {
                    id: '2',
                    name: 'Jane Smith',
                    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith'
                  }
                ]}
              />
            </Tabs.Content>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}