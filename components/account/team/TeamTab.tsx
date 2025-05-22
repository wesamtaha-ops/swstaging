import React, { useState } from 'react';
import { TeamMemberList } from './TeamMemberList';
import { TeamActivityLog } from './TeamActivityLog';
import { RoleManagement } from './RoleManagement';
import { WorkspaceSettings } from './WorkspaceSettings';
import { InviteMemberDialog } from './InviteMemberDialog';
import { Plus, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTeam } from '@/hooks/useTeam';

type TabType = 'members' | 'activity' | 'roles' | 'workspace';

export function TeamTab() {
  const [activeTab, setActiveTab] = useState<TabType>('members');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const { teamMembers, activities, roles, workspace, loading, error } = useTeam();

  const tabs = [
    { id: 'members', label: 'Members' },
    { id: 'activity', label: 'Activity' },
    { id: 'roles', label: 'Roles' },
    { id: 'workspace', label: 'Settings' }
  ];

  const scrollTabs = (direction: 'left' | 'right') => {
    const tabsContainer = document.getElementById('tabs-container');
    if (tabsContainer) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'members':
        return <TeamMemberList members={teamMembers} />;
      case 'activity':
        return <TeamActivityLog activities={activities} />;
      case 'roles':
        return <RoleManagement roles={roles} />;
      case 'workspace':
        return <WorkspaceSettings workspace={workspace} />;
      default:
        return null;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white shadow rounded-lg font-almarai ">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-almarai text-gray-900">
              Team Management
            </h3>
          </div>
          <button
            onClick={() => setIsInviteDialogOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Invite Member
          </button>
        </div>

        {/* Mobile Tabs */}
        <div className="block sm:hidden mb-6">
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as TabType)}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Tabs with Scroll */}
        <div className="hidden sm:block relative">
          <div className="absolute left-0 top-0 bottom-0 flex items-center">
            <button
              onClick={() => scrollTabs("left")}
              className="p-1 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-hidden mx-8">
            <div
              id="tabs-container"
              className="border-b border-gray-200 flex overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex min-w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`
                      whitespace-nowrap py-3 px-6 text-sm font-almarai border-b-2 flex-shrink-0
                      ${activeTab === tab.id
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 flex items-center">
            <button
              onClick={() => scrollTabs("right")}
              className="p-1 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none"
            >
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">{renderTabContent()}</div>
      </div>

      <InviteMemberDialog
        isOpen={isInviteDialogOpen}
        onClose={() => setIsInviteDialogOpen(false)}
      />
    </div>
  );
}