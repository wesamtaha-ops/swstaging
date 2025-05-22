import React, { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Settings, Users, Trash2, X, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/app/store";
import TeamMemberSetting from "../account/team/TeamMemberSetting";
import { DEFAULT_ROLES, Role } from "@/types/permissions";
import {
  deleteWorkspace,
  GetTeamByIdworkspace,
  selectAddWorkspaceStatus,
  selectWorkspaceTeam,
  updateWorkspace,
} from "@/src/features/workspace/workspaceSlice";
import Swal from "sweetalert2";
import { useAuth } from "../providers/AuthProvider";
import { useSelector } from "react-redux";
import {
  GetTeamByIdComapny,
  selectAddCompanyStatus,
  selectCompanySelected,
  selectGetCompanyByOwner,
  selectGetTeamByIdComapny,
} from "@/src/features/company/companySlice";
import {
  resetInvitationState,
  selectInvitError,
  selectSendInvitStatus,
  SendInvit,
} from "@/src/features/invitations/invitationSlice";

interface WorkspaceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  workspace: {
    _id: string;
    name: string;
    members: number;
    team?: [];
    forms: number;
    surveyCount?: number;
  };
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export function WorkspaceSettingsModal({
  isOpen,
  onClose,
  workspace,
  onOpen,
}: WorkspaceSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"general" | "members">("general");
  const [workspaceName, setWorkspaceName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const InvitError = useSelector(selectInvitError);
  const sendInvitt = useSelector(selectSendInvitStatus);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  // Mock members data

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.removeAttribute("aria-hidden");
      modalRef.current.focus();
    }
    if (isOpen && workspace) {
      setWorkspaceName(workspace.name);
    }
  }, [isOpen, workspace]);

  const handleUpdateWorkspace = async (id: string) => {
    await dispatch(updateWorkspace({ id, name: workspaceName }));
    onClose();
  };

  const handleDeleteWorkspace = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deleteWorkspace(workspace._id));
      setIsDeleting(false);

      onClose();
    } catch (error) {
      console.error("Error deleting workspace:", error);
      setIsDeleting(false);
    }
  };

  const ROLE_OPTIONS: Record<string, string[]> = {
    accountOwner: ["workspaceOwner", "editor", "viewer"],
    companyOwner: ["workspaceOwner", "editor", "viewer"],
    workspaceOwner: ["editor", "viewer"],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let invitData = {
      email,
      role: selectedRole?.id ?? "",
      sender: user && user._id,
      workspace: {
        _id: workspace._id,
      },
    };

    dispatch(SendInvit(invitData));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (sendInvitt === "success") {
      setEmail("");
      setSelectedRole(null);
      setIsSubmitting(false);
      dispatch(resetInvitationState());
    } else if (sendInvitt === "failure" && InvitError) {
      setIsSubmitting(false);
      setTimeout(() => {
        dispatch(resetInvitationState());
      }, 500);
    }
  }, [sendInvitt, InvitError, dispatch]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content
          ref={modalRef}
          className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white shadow-lg focus:outline-none overflow-hidden"
        >
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 p-4 border-r border-gray-200">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-almarai ${activeTab === "general"
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <Settings className="h-4 w-4 inline-block mr-2" />
                  General
                </button>
                <button
                  onClick={() => setActiveTab("members")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-almarai ${activeTab === "members"
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <Users className="h-4 w-4 inline-block mr-2" />
                  Members
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-md   font-bold font-almarai font-almarai  font-almarai text-gray-800">
                    Workspace Settings
                  </Dialog.Title>
                  <Dialog.Close className="text-gray-400 hover:text-gray-500">
                    <X className="h-5 w-5" />
                  </Dialog.Close>
                </div>

                {activeTab === "general" ? (
                  <>
                    <div className="space-y-4">
                      <label
                        htmlFor="workspace-name"
                        className="block text-sm font-almarai text-gray-600"
                      >
                        Workspace name:
                      </label>
                      <input
                        type="text"
                        id="workspace-name"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="mt-3 p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                        placeholder="Enter workspace name"
                        required
                      />
                    </div>
                    <div className="space-y-4 mt-5">
                      <h3 className="block text-sm font-almarai text-gray-600">
                        Workspace Statistics
                      </h3>
                      <dl className="mt-3 grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <dt className="text-sm text-gray-500">
                            Total Forms:
                          </dt>
                          <dd className="text-2xl font-almarai text-gray-900">
                            {workspace?.surveyCount || 0}
                          </dd>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <dt className="text-sm text-gray-500">Members:</dt>
                          <dd className="text-2xl font-almarai text-gray-900">
                            {workspace?.team?.length || 0}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="mt-10 flex justify-end space-x-3">
                      <button
                        disabled={isDeleting}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteWorkspace();
                        }}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md text-white ${isDeleting
                          ? "bg-red-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                          }`}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {isDeleting ? "Deleting..." : "Delete Workspace"}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateWorkspace(workspace._id);
                        }}
                        className="px-4 py-2 text-sm font-almarai text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-almarai text-gray-700 mb-2"
                        >
                          Invite Members
                        </label>

                        <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-3 md:space-y-0">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="flex-1 py-2  px-4 min-w-0 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />

                          <select
                            className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={selectedRole ? selectedRole.id : ""}
                            required
                            onChange={(e) => {
                              const role = DEFAULT_ROLES.find(
                                (r) => r.id === e.target.value
                              );
                              setSelectedRole(role || null);
                            }}
                          >
                            <option value="" disabled hidden>
                              Invite as
                            </option>
                            {DEFAULT_ROLES.filter(
                              (role) =>
                                user &&
                                ROLE_OPTIONS[user.role]?.includes(role.id)
                            ).map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>

                          {/* Bouton Invite */}
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            {sendInvitt === "loading" ? "Sending..." : "Invit"}
                          </button>
                        </div>
                      </div>
                    </form>

                    <TeamMemberSetting
                      workspace={workspace}
                      // isOpen={isOpen}
                      onClose={onClose}
                      onOpen={onOpen}
                    />

                    {/* <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-almarai text-gray-700 mb-4">
                        Members
                      </h3>
                      <div className="space-y-4">
                        {team?.map((member:any) => (
                          <div
                            key={member._id}
                            className="flex items-center justify-between py-3 border-b border-gray-100"
                          >
                            <div className="flex items-center">
                              <img
                                src={member.avatar}
                                alt={member.username}
                                className="h-8 w-8 rounded-full"
                              />
                              <div className="ml-3">
                                <p className="text-sm font-almarai text-gray-900">
                                  {member.username}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {member.email}
                                </p>
                              </div>
                            </div>
                            <select
                              value={member.role}
                              onChange={(e) =>
                                console.log("Role changed:", e.target.value)
                              }
                              className="ml-4 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                              <option>Admin</option>
                              <option>Editor</option>
                              <option>Viewer</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                     */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
