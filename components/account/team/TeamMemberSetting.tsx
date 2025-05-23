import { useAuth } from "@/components/providers/AuthProvider";
import { AppDispatch } from "@/src/app/store";
import {
  GetTeamByIdComapny,
  selectCompanySelected,
  selectGetTeamByIdComapny,
} from "@/src/features/company/companySlice";
import {
  DeleteById,
  selectdeleteUserStatus,
  selectSuccessStatus,
  UpdatePermission,
  UPDATEROLE,
} from "@/src/features/users/userSlice";
import {
  GetTeamByIdworkspace,
  selectWorkspaceTeam,
} from "@/src/features/workspace/workspaceSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DEFAULT_ROLES, Role } from "@/types/permissions";
import toast from "react-hot-toast";

interface WorkspaceSettingsModalProps {
  workspace: {
    _id: string;
    name: string;
    members: number;
    team?: [];
    forms: number;
    surveyCount?: number;
  };
  onClose: () => void;
  onOpen: () => void;
}

function TeamMemberSetting({
  workspace,
  onClose,
  onOpen,
}: WorkspaceSettingsModalProps) {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [loadingRoleUpdates, setLoadingRoleUpdates] = useState<
    Record<string, boolean>
  >({});
  const [roleChangeConfirmation, setRoleChangeConfirmation] = useState<{
    isOpen: boolean;
    memberId: string;
    newRole: string;
    previousOwner: any;
    newRoleForOwner: string | null;
  }>({
    isOpen: false,
    memberId: "",
    newRole: "",
    previousOwner: null,
    newRoleForOwner: null,
  });

  const dispatch = useDispatch<AppDispatch>();
  const deleteUserStatus = useSelector(selectdeleteUserStatus);
  const workspaces = useSelector(selectWorkspaceTeam);
  const { user, isRolePermission } = useAuth();
  const WorkspaceId = user?.workspaceId?.id || "";

  const selectedCompany = useSelector(selectCompanySelected);
  const companyId = selectedCompany?._id || "";

  const teamWorkspace = workspaces[workspace._id] || [];
  const Team3RolesMin = workspaces[WorkspaceId] || [];

  const team =
    user?.role === "companyOwner" ||
      (user?.role === "accountOwner" && window.location.pathname === "/forms")
      ? teamWorkspace
      : Team3RolesMin;

  const successUpdateRole = useSelector(selectSuccessStatus);

  // Determine entity type based on user role and current path
  const isCompanyView =
    user?.role === "accountOwner" && window.location.pathname === "/account";
  const entityType = isCompanyView ? "Company" : "Workspace";
  const ownerRole = isCompanyView ? "companyOwner" : "workspaceOwner";
  const entityId = isCompanyView ? companyId : workspace._id;

  // Define available roles based on user's current role
  const ROLE_OPTIONS: Record<string, string[]> = {
    accountOwner: ["workspaceOwner", "editor", "viewer"],
    companyOwner: ["workspaceOwner", "editor", "viewer"],
    workspaceOwner: ["editor", "viewer"],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (isCompanyView) {
          response = await dispatch(GetTeamByIdComapny(companyId)).unwrap();
        } else if (user?.role === "companyOwner") {
          response = await dispatch(
            GetTeamByIdworkspace(workspace._id)
          ).unwrap();
        } else {
          response = await dispatch(
            GetTeamByIdworkspace(workspace._id)
          ).unwrap();
        }

        setIsDataFetched(true);
      } catch (error) {
        console.error("Error fetching team data:", error);
        setIsDataFetched(true); // Set to true even on error to avoid infinite loading
      }
    };

    fetchData();
  }, [
    companyId,
    dispatch,
    successUpdateRole,
    deleteUserStatus,
    WorkspaceId,
    workspace._id,
    isCompanyView,
  ]);

  const handleUpdatePermission = (member: any) => {
    if (user) {
      dispatch(UpdatePermission(member._id));
    }
  };

  // Placeholder function for avatar if no image is available
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Function to check if current user can manage a specific member
  const canManageMember = (memberRole: string) => {
    // Higher roles can manage lower roles
    if (user?.role === "accountOwner") return true;
    if (user?.role === "companyOwner" && memberRole !== "accountOwner")
      return true;
    if (
      user?.role === "workspaceOwner" &&
      ["editor", "viewer"].includes(memberRole)
    )
      return true;

    // Users with manage permission can manage editors and viewers
    if (
      isRolePermission("btn_manage") &&
      ["editor", "viewer"].includes(memberRole)
    )
      return true;

    return false;
  };

  // Get the available roles based on user permissions
  const getAvailableRoles = () => {
    if (!user) return [];

    return DEFAULT_ROLES.filter((role) =>
      ROLE_OPTIONS[user.role]?.includes(role.id)
    );
  };

  // Handle role change
  const handleRoleChange = async (member: any, newRole: string) => {
    // If the role hasn't changed, do nothing
    if (newRole === member.role) return;

    // Case 1: Trying to update the role of the sole owner
    if (member.role === ownerRole && newRole !== ownerRole) {
      const otherOwners = team.filter(
        (m) => m.role === ownerRole && m._id !== member._id
      );

      if (otherOwners.length === 0) {
        onClose();
        Swal.fire({
          title: "Permission Denied",
          text: `Unable to change the role of the sole ${entityType} owner. Another member must be assigned as ${entityType} owner first.`,
          icon: "warning",
          confirmButtonText: "Okay",
          customClass: { popup: "custom-swal" },
        }).then((result) => {
          if (result.isConfirmed) {
            onOpen(); // Reopens the modal after clicking "Okay"
          }
        });
        return;
      }
    }

    // Case 2: Trying to make someone an owner when there's already an owner
    if (newRole === ownerRole && member.role !== ownerRole) {
      const existingOwner = team.find(
        (m) => m.role === ownerRole && m._id !== member._id
      );

      if (existingOwner) {
        setRoleChangeConfirmation({
          isOpen: true,
          memberId: member._id,
          newRole: newRole,
          previousOwner: existingOwner,
          newRoleForOwner: null,
        });
        return;
      }
    }

    // If we passed all checks, proceed with role update
    updateRole(member._id, newRole);
  };

  // Update role function
  const updateRole = async (
    userId: string,
    newRole: string,
    confirmReassign?: string
  ) => {
    setLoadingRoleUpdates((prev) => ({ ...prev, [userId]: true }));

    try {
      await dispatch(
        UPDATEROLE({
          entityId,
          entityType,
          userId: userId,
          newRole: newRole,
          confirmReassign,
        })
      ).unwrap();

      toast.success("Role updated successfully");
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role. Please try again.");
    } finally {
      setLoadingRoleUpdates((prev) => ({ ...prev, [userId]: false }));
    }
  };

  // Confirm role change when there's a previous owner
  const confirmRoleChange = async () => {
    const { memberId, newRole, previousOwner, newRoleForOwner } =
      roleChangeConfirmation;

    if (!newRoleForOwner) {
      toast.error("Please select a new role for the current owner");
      return;
    }

    setLoadingRoleUpdates((prev) => ({
      ...prev,
      [memberId]: true,
      [previousOwner._id]: true,
    }));

    try {
      // First change the role of the previous owner
      await dispatch(
        UPDATEROLE({
          entityId,
          entityType,
          userId: previousOwner._id,
          newRole: newRoleForOwner,
          confirmReassign: memberId,
        })
      ).unwrap();

      // Then update the role of the selected member
      await updateRole(memberId, newRole);

      toast.success("Roles updated successfully");
      setRoleChangeConfirmation({
        isOpen: false,
        memberId: "",
        newRole: "",
        previousOwner: null,
        newRoleForOwner: null,
      });
    } catch (error) {
      toast.error("Failed to update roles. Please try again.");
    } finally {
      setLoadingRoleUpdates((prev) => ({
        ...prev,
        [memberId]: false,
        [previousOwner._id]: false,
      }));
    }
  };
  const [showTransferConfirmation, setShowTransferConfirmation] =
    useState(false);

  // Delete member - avec dialogue personnalisé intégré
  const handleDeleteMember = (member: any) => {
    const isOnlyOwner = team.length === 1 && member.role === ownerRole;
    const isOwner = member.role === ownerRole && team.length > 1;
    const isRegularMember = member.role !== ownerRole;

    if (isOnlyOwner) {
      onClose();
      Swal.fire({
        title: "Permission Denied",
        text: `You cannot delete this member without first assigning the ${ownerRole} role to another member. Invite a new member first.`,
        icon: "warning",
        confirmButtonText: "Okay",
        customClass: {
          popup: "custom-swal",
        },

      });
      return;
    }

    if (isOwner) {
      // Au lieu d'utiliser SweetAlert, on active directement notre dialogue de transfert
      setAdminToDelete(member._id);
      setShowTransferConfirmation(true); // Nouvelle state pour montrer le dialogue de confirmation
      return;
    }

    if (isRegularMember) {
      onClose();
      Swal.fire({
        title: "Are you sure?",
        text: "This action is irreversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        customClass: {
          popup: "custom-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(DeleteById(member._id));
        }
      });
    }
  };
  // Delete member
  // const handleDeleteMember = (member: any) => {
  //   const isOnlyOwner = team.length === 1 && member.role === ownerRole;
  //   const isOwner = member.role === ownerRole && team.length > 1;
  //   const isRegularMember = member.role !== ownerRole;

  //   if (isOnlyOwner) {
  //     Swal.fire({
  //       title: "Permission Denied",
  //       text: `You cannot delete this member without first assigning the ${ownerRole} role to another member. Invite a new member first.`,
  //       icon: "warning",
  //       confirmButtonText: "Okay",
  //       customClass: {
  //         popup: "custom-swal",
  //       },
  //     });
  //     return;
  //   }

  //   if (isOwner) {

  //     Swal.fire({
  //       title: `Transfer ${entityType} Owner Role?`,
  //       text: "You must transfer the role before deleting this member.",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, Transfer",
  //       cancelButtonText: "Cancel",
  //       customClass: {
  //         popup: "custom-swal",
  //       },
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // Store the ID of the admin to delete and open transfer dialog
  //         setAdminToDelete(member._id);
  //         setIsTransferDialogOpen(true);
  //       }
  //     });
  //     return;
  //   }

  //   if (isRegularMember) {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "This action is irreversible!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, delete",
  //       cancelButtonText: "Cancel",
  //       confirmButtonColor: "#d33",
  //       customClass: {
  //         popup: "custom-swal",
  //       },
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         dispatch(DeleteById(member._id));
  //       }
  //     });
  //   }
  // };

  const handleTransferAdmin = async () => {
    if (!selectedAdminId || !adminToDelete) return;

    try {
      await axios.put("https://swbackstg.onrender.com/user/update-role", {
        userId: selectedAdminId,
        role: ownerRole,
      });
      await dispatch(DeleteById(adminToDelete));
      setIsTransferDialogOpen(false);
      setAdminToDelete(null);
      setSelectedAdminId(null);

      Swal.fire({
        icon: "success",
        title: "Role transferred and user deleted.",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire("Error", "Role transfer failed.", "error");
    }
  };


  return (
    <>
      <div className="font-almarai h-full w-full">
        {!isDataFetched ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : team.length > 0 ? (
          <>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-almarai text-gray-700 mb-4">
                Members
              </h3>
              <div className="space-y-4">
                {team?.map((member: any) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between py-3 border-b border-gray-100"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-almarai">
                        {getInitials(member.username)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-almarai text-gray-900">
                          {member.username}
                        </p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>

                    <div className="p-4 w-48">
                      {canManageMember(member.role) ? (
                        <div className="relative">
                          <select
                            value={member.role}
                            onChange={(e) =>
                              handleRoleChange(member, e.target.value)
                            }
                            disabled={loadingRoleUpdates[member._id]}
                            className="block w-full pl-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            {getAvailableRoles().map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                          {loadingRoleUpdates[member._id] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="flex flex-row items-center text-gray-500 pl-3 py-2">
                          {member?.role}
                        </p>
                      )}

                      {/* Show permission button only for workspaceOwners when viewed by companyOwner or accountOwner */}
                      {(user?.role === "companyOwner" ||
                        (user?.role === "accountOwner" &&
                          window.location.pathname === "/forms")) &&
                        member.role === "workspaceOwner" && (
                          <button
                            onClick={() => handleUpdatePermission(member)}
                            className={`mt-2 flex-shrink-0 text-sm text-white p-1 flex items-center justify-center rounded-lg ${member.isPermission
                              ? "bg-gradient-to-br from-red-100 to-red-600"
                              : "bg-gradient-to-br from-blue-100 to-blue-600"
                              }`}
                          >
                            {member.isPermission
                              ? "Revoke Permission"
                              : "Grant Permission"}
                          </button>
                        )}
                    </div>

                    {/* Actions column */}
                    <div className="p-4">
                      {/* Show Actions dropdown only for members the current user can manage */}
                      {canManageMember(member.role) && (
                        <button
                          onClick={() => handleDeleteMember(member)}
                          className="cursor-pointer flex items-center text-gray-500 gap-2 p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Delete member
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <label className="text-gray-400 cursor-pointer w-full">
            <div className="flex flex-col items-center justify-center w-full h-full mt-8 p-10 transition-all duration-300 ease-in-out peer-checked:border-indigo-500 peer-checked:from-indigo-900/50 peer-checked:to-gray-900 peer-checked:translate-y-[-0.5rem]">
              <p className="text-md text-red-500 mt-5 transition-opacity duration-300">
                {entityType} does not have any team members yet
              </p>
              <div className="h-1 w-0 bg-indigo-500 rounded-full mx-auto group-hover:w-[500px] peer-checked:w-full transition-all duration-300"></div>
            </div>
          </label>
        )}
        {showTransferConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-gray-500 opacity-75 fixed inset-0"></div>
            <div className="relative bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-almarai text-gray-900 mb-2">
                Transfer {entityType} Owner Role?
              </h3>
              <p className="text-gray-600 mb-4">
                You must transfer the role before deleting this member.
              </p>
              <div className="flex mt-4 gap-2 justify-end">
                <button
                  onClick={() => setShowTransferConfirmation(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowTransferConfirmation(false);
                    setIsTransferDialogOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Yes, Transfer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transfer admin role dialog */}
        {isTransferDialogOpen && (
          <div
            id="transfer_role"
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[60]"
          >
            <div className="bg-white md:w-[500px] p-6 rounded-lg shadow-lg">
              <h2 className="text-md font-almarai mb-4">
                Select a New {entityType} Owner
              </h2>
              <select
                className="my-5 block w-full pl-3 p-3 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={(e) => setSelectedAdminId(e.target.value)}
                value={selectedAdminId || ""}
              >
                <option value="">
                  Select user who will receive the {entityType}Owner role
                </option>
                {team
                  .filter(
                    (m: any) =>
                      m?.role !== ownerRole && m?._id !== adminToDelete
                  )
                  .map((m: any) => (
                    <option key={m?._id} value={m?._id}>
                      {m?.username} - {m?.role}
                    </option>
                  ))}
              </select>

              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setIsTransferDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                  onClick={handleTransferAdmin}
                  disabled={!selectedAdminId}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Role Change Confirmation Modal */}
        {roleChangeConfirmation.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-gray-500 opacity-75 fixed inset-0"></div>
            <div className="relative bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-almarai text-gray-900 mb-2">
                Reassign Owner Role
              </h3>

              <p className="text-gray-600 mb-4">
                {`There is already a member with ${ownerRole} role (${roleChangeConfirmation.previousOwner?.email}). Please select a new role for the current owner.`}
              </p>

              <div className="mt-4">
                <label className="block text-sm font-almarai text-gray-600">
                  {`New role for the current ${entityType} owner`}
                </label>
                <select
                  className="block w-full p-3 my-5 border rounded-md"
                  value={roleChangeConfirmation.newRoleForOwner || ""}
                  onChange={(e) =>
                    setRoleChangeConfirmation({
                      ...roleChangeConfirmation,
                      newRoleForOwner: e.target.value,
                    })
                  }
                >
                  <option value="" disabled hidden>
                    Select a role
                  </option>
                  {DEFAULT_ROLES.filter(
                    (role) =>
                      user &&
                      ROLE_OPTIONS[user.role]?.includes(role.id) &&
                      role.id !== ownerRole
                  ).map((role) => (
                    <option
                      key={role.id}
                      value={role.id}
                      className="text-sm text-gray-800"
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex mt-4 gap-2 justify-end">
                <button
                  onClick={() =>
                    setRoleChangeConfirmation({
                      isOpen: false,
                      memberId: "",
                      newRole: "",
                      previousOwner: null,
                      newRoleForOwner: null,
                    })
                  }
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRoleChange}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                  disabled={
                    !roleChangeConfirmation.newRoleForOwner ||
                    loadingRoleUpdates[roleChangeConfirmation.memberId]
                  }
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TeamMemberSetting;
