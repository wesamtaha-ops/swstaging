import { useState, useEffect } from 'react';
import { TeamMember, Activity, Role, Workspace ,Company} from '@/types';

export function useTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Mock data for team members
        setTeamMembers([
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'administrator',
            forms: 12,
            avatar: 'https://ui-avatars.com/api/?name=John+Doe',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'manager',
            forms: 5,
            avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
          },
          {
            id: '3',
            name: 'xxxxxxxxxxxxx Smith',
            email: 'jane@example.com',
            role: 'manager',
            forms: 5,
            avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
          },
        ]);

        // Mock data for activities
        setActivities([
          {
            id: '1',
            type: 'create',
            user: 'John Doe',
            content: 'Created new form template',
            date: '2024-02-20T10:30:00Z',
            icon: '📝',
          },
          {
            id: '2',
            type: 'update',
            user: 'Jane Smith',
            content: 'Updated team permissions',
            date: '2024-02-20T09:15:00Z',
            icon: '🔒',
          },
        ]);

        // Mock data for roles
        setRoles([
          {
            id: '1',
            name: 'Administrator',
            description: 'Full access to all features',
            permissions: [
              {
                id: 'create_forms',
                name: 'Create Forms',
                description: 'Can create new forms',
                enabled: true,
              },
              {
                id: 'manage_team',
                name: 'Manage Team',
                description: 'Can manage team members',
                enabled: true,
              },
            ],
          },
          {
            id: '2',
            name: 'Manager',
            description: 'Can manage forms and view analytics',
            permissions: [
              {
                id: 'create_forms',
                name: 'Create Forms',
                description: 'Can create new forms',
                enabled: true,
              },
              {
                id: 'view_analytics',
                name: 'View Analytics',
                description: 'Can view form analytics',
                enabled: true,
              },
              {
                id: 'manage_payments',
                name: 'Manage Payments',
                description: 'Can view paymnets',
                enabled: true,
              },
            ],
          },
        ]);

        // Mock data for workspace
        setWorkspace({
          id: '1',
          name: 'My Workspace',
          visibility: 'private',
          shareTemplates: true,
          shareThemes: true,
          allowMemberInvites: false,
        });

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };
            setCompanies([
          {
            id: '1',
            name: 'tradlyyy',
            description: 'ttttttttttttttttttttttttt',
        
          },
       
        ]);

    fetchTeamData();
  }, []);

  return {
    teamMembers,
    activities,
    roles,
    companies,
    workspace,
    loading,
    error,
  };
}
