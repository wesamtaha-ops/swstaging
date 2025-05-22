import React, { useState } from 'react';
import { Users, X, UserPlus } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'Editor' | 'Viewer';
  avatar: string;
}

export function Collaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Editor',
      avatar: 'JD'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Viewer',
      avatar: 'JS'
    }
  ]);

  const removeCollaborator = (id: string) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-almarai text-gray-900">Collaborators</h2>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Collaborator
        </button>
      </div>

      <div className="space-y-4">
        {collaborators.map((collaborator) => (
          <div
            key={collaborator.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-almarai">
                {collaborator.avatar}
              </div>
              <div>
                <h3 className="text-sm font-almarai text-gray-900">{collaborator.name}</h3>
                <p className="text-sm text-gray-500">{collaborator.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={collaborator.role}
                onChange={(e) => {
                  const newCollaborators = collaborators.map(c =>
                    c.id === collaborator.id
                      ? { ...c, role: e.target.value as 'Editor' | 'Viewer' }
                      : c
                  );
                  setCollaborators(newCollaborators);
                }}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
              <button
                onClick={() => removeCollaborator(collaborator.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}