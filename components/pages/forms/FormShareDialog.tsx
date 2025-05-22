import React from "react";
import { X, Copy, Mail } from "lucide-react";
import type { Form, TeamMember } from "@/types";

interface FormShareDialogProps {
  form: Form;
  teamMembers: TeamMember[];
  onClose: () => void;
}

export function FormShareDialog({
  form,
  teamMembers,
  onClose,
}: FormShareDialogProps) {
  const formUrl = `https://forms.example.com/${form._id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formUrl);
  };

  const handlePermissionChange = (memberId: string, permission: string) => {
    console.log(`Changed ${memberId}'s permission to ${permission}`);
  };

  return (
    <div className="mt-4 bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-almarai text-gray-900">Share Form</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Share Link */}
        <div>
          <label className="block text-sm font-almarai text-gray-700 mb-2">
            Share Link
          </label>
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              value={formUrl}
              readOnly
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
            />
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-almarai text-gray-700 hover:bg-gray-100"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </button>
          </div>
        </div>

        {/* Email Invite */}
        <div>
          <label className="block text-sm font-almarai text-gray-700 mb-2">
            Invite by Email
          </label>
          <div className="flex rounded-md shadow-sm">
            <input
              type="email"
              placeholder="Enter email address"
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button className="inline-flex items-center px-4 py-2 border border-l-0 border-transparent rounded-r-md bg-indigo-600 text-sm font-almarai text-white hover:bg-indigo-700">
              <Mail className="h-4 w-4 mr-2" />
              Send
            </button>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h4 className="text-sm font-almarai text-gray-900 mb-4">
            Team Members
          </h4>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-almarai text-gray-900">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <select
                  value={
                    form.collaborators.find((c) => c.memberId === member.id)
                      ?.permission || "none"
                  }
                  onChange={(e) =>
                    handlePermissionChange(member.id, e.target.value)
                  }
                  className="ml-4 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="none">No Access</option>
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
