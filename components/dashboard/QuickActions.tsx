import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Copy, FileText, Settings, HelpCircle } from 'lucide-react';

const actions = [
  {
    name: 'Create new form',
    description: 'Start from scratch or use AI',
    to: '/forms/create',
    icon: PlusCircle,
    color: 'text-indigo-600',
  },
  {
    name: 'Use template',
    description: 'Choose from templates',
    to: '/templates',
    icon: Copy,
    color: 'text-green-600',
  },
  {
    name: 'View forms',
    description: 'Manage your forms',
    to: '/forms',
    icon: FileText,
    color: 'text-blue-600',
  },
  {
    name: 'Settings',
    description: 'Manage your account',
    to: '/account',
    icon: Settings,
    color: 'text-gray-600',
  },
  {
    name: 'Help & Support',
    description: 'Get assistance',
    to: '/help',
    icon: HelpCircle,
    color: 'text-purple-600',
  },
];

export function QuickActions() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h2 className="text-lg font-almarai text-gray-900">Quick Actions</h2>
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {actions.map((action) => (
              <li key={action.name}>
                <Link
                  to={action.to}
                  className="block py-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-almarai text-gray-900 truncate">
                        {action.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}